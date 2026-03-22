import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProductFilter {
    color?: string;
    maxPrice?: number;
    occasion?: string;
    gender?: string;
    category?: string;
    minPrice?: number;
}
export interface Product {
    id: bigint;
    productUrl: string;
    name: string;
    color: string;
    minAge: bigint;
    platform: string;
    sizes: Array<string>;
    imageUrl: string;
    occasion: string;
    gender: string;
    category: string;
    maxAge: bigint;
    price: number;
}
export interface UserProfile {
    displayName: string;
    stylePreferences: Array<string>;
}
export interface WishlistItem {
    productUrl: string;
    name: string;
    productId: bigint;
    platform: string;
    imageUrl: string;
    forMember: string;
    category: string;
    price: number;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: Product): Promise<bigint>;
    addWishlistItem(item: WishlistItem): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProductById(productId: bigint): Promise<Product | null>;
    getProducts(filter: ProductFilter): Promise<Array<Product>>;
    getUserProducts(user: Principal): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWishlist(user: Principal): Promise<Array<WishlistItem>>;
    isCallerAdmin(): Promise<boolean>;
    removeWishlistItem(productId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
