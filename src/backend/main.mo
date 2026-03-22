import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import List "mo:core/List";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types
  public type UserProfile = {
    displayName : Text;
    stylePreferences : [Text];
  };

  public type Product = {
    id : Nat;
    name : Text;
    category : Text;
    gender : Text;
    platform : Text;
    price : Float;
    imageUrl : Text;
    productUrl : Text;
    color : Text;
    occasion : Text;
    sizes : [Text];
    minAge : Nat;
    maxAge : Nat;
  };

  public type WishlistItem = {
    productId : Nat;
    name : Text;
    platform : Text;
    price : Float;
    imageUrl : Text;
    productUrl : Text;
    category : Text;
    forMember : Text;
  };

  public type ProductFilter = {
    gender : ?Text;
    category : ?Text;
    color : ?Text;
    occasion : ?Text;
    minPrice : ?Float;
    maxPrice : ?Float;
  };

  // State
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var nextProductId = 1;
  let products = Map.empty<Nat, Product>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let wishlists = Map.empty<Principal, List.List<WishlistItem>>();

  // User Profile Functions
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Product Catalog Functions
  public shared ({ caller }) func addProduct(product : Product) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can add products");
    };
    let productId = nextProductId;
    nextProductId += 1;

    let newProduct : Product = {
      id = productId;
      name = product.name;
      category = product.category;
      gender = product.gender;
      platform = product.platform;
      price = product.price;
      imageUrl = product.imageUrl;
      productUrl = product.productUrl;
      color = product.color;
      occasion = product.occasion;
      sizes = product.sizes;
      minAge = product.minAge;
      maxAge = product.maxAge;
    };

    products.add(productId, newProduct);
    productId;
  };

  public query ({ caller }) func getProducts(filter : ProductFilter) : async [Product] {
    products.values().toArray().filter(func(p) {
      switch (filter.gender) {
        case (null) {};
        case (?g) {
          if (not Text.equal(p.gender, g)) { return false };
        };
      };
      switch (filter.category) {
        case (null) {};
        case (?c) {
          if (not Text.equal(p.category, c)) { return false };
        };
      };
      switch (filter.color) {
        case (null) {};
        case (?c) {
          if (not Text.equal(p.color, c)) { return false };
        };
      };
      switch (filter.occasion) {
        case (null) {};
        case (?o) {
          if (not Text.equal(p.occasion, o)) { return false };
        };
      };
      switch (filter.minPrice) {
        case (null) {};
        case (?min) {
          if (p.price < min) { return false };
        };
      };
      switch (filter.maxPrice) {
        case (null) {};
        case (?max) {
          if (p.price > max) { return false };
        };
      };
      true;
    });
  };

  public query ({ caller }) func getProductById(productId : Nat) : async ?Product {
    products.get(productId);
  };

  // Wishlist Functions
  public shared ({ caller }) func addWishlistItem(item : WishlistItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can modify wishlists");
    };
    let currentWishlist = switch (wishlists.get(caller)) {
      case (null) { List.empty<WishlistItem>() };
      case (?items) { items };
    };

    currentWishlist.add(item);
    wishlists.add(caller, currentWishlist);
  };

  public shared ({ caller }) func removeWishlistItem(productId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can modify wishlists");
    };
    let currentWishlist = switch (wishlists.get(caller)) {
      case (null) { List.empty<WishlistItem>() };
      case (?items) { items };
    };

    let filteredWishlist = currentWishlist.filter(
      func(item) { item.productId != productId }
    );
    wishlists.add(caller, filteredWishlist);
  };

  public query ({ caller }) func getWishlist(user : Principal) : async [WishlistItem] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own wishlist");
    };
    switch (wishlists.get(user)) {
      case (null) { [] };
      case (?items) { items.toArray() };
    };
  };

  public query ({ caller }) func getUserProducts(user : Principal) : async [Product] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own products");
    };

    switch (wishlists.get(user)) {
      case (null) { [] };
      case (?items) {
        let productIds = items.toArray().map(func(item) { item.productId });
        productIds.map(
          func(pid) {
            switch (products.get(pid)) {
              case (null) { Runtime.trap("Product not found") };
              case (?p) { p };
            };
          }
        );
      };
    };
  };
};
