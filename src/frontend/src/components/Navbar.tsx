import {
  ChevronDown,
  Flower2,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Page } from "../App";
import { useWishlistContext } from "../contexts/WishlistContext";
import { ADULT_SIZES, INFANT_MONTHS, KID_AGES } from "../data/products";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import SmartSearchBar from "./SmartSearchBar";

interface NavbarProps {
  currentPage: Page;
  navigate: (p: Page) => void;
}

const MEN_TOPWEAR = [
  "T-Shirts",
  "Casual Shirts",
  "Formal Shirts",
  "Sweatshirts",
  "Sweaters",
  "Jackets",
  "Blazers & Coats",
  "Suits",
  "Rain Jackets",
];

const MEN_FESTIVE = [
  "Kurtas & Kurta Sets",
  "Sherwanis",
  "Nehru Jackets",
  "Dhotis",
];

const WOMEN_BOTTOMWEAR = [
  "Jeans",
  "Casual Trousers",
  "Formal Trousers",
  "Shorts",
  "Track Pants & Joggers",
];

const WOMEN_WESTERNWEAR = [
  "Dresses",
  "Tops",
  "Tshirts",
  "Jeans",
  "Trousers & Capris",
  "Shorts & Skirts",
  "Co-ords",
  "Playsuits",
  "Jumpsuits",
  "Shrugs",
  "Sweaters & Sweatshirts",
  "Jackets & Coats",
  "Blazers & Waistcoats",
];

const BOYS_CATEGORIES = [
  "Sets & Suits",
  "T-Shirts",
  "Shorts",
  "Onesies & Rompers",
  "Shirts",
  "Jeans & Trousers",
  "Pajamas & Trackpants",
  "Diaper & Bootie Leggings",
  "Party Wear",
  "Ethnic Wear",
];

const GIRLS_CATEGORIES = [
  "Frocks & Dresses",
  "Sets & Suits",
  "Onesies & Rompers",
  "Tops & T-shirts",
  "Shorts & Skirts",
  "Jeans & Jeggings",
  "Pajamas & Leggings",
  "Party Wear",
  "Ethnic Wear",
  "Jumpsuits & Dungarees",
];

const BOY_BABY_CATEGORIES = [
  "Onesies & Rompers",
  "Sets & Suits",
  "T-Shirts & Tops",
  "Shorts & Pajamas",
  "Bodysuits",
  "Dungarees",
  "Ethnic Wear",
  "Party Wear",
  "Sleepwear",
  "Winterwear",
];

const GIRL_BABY_CATEGORIES = [
  "Onesies & Rompers",
  "Frocks & Dresses",
  "Sets & Suits",
  "Tops & Bodysuits",
  "Leggings & Pajamas",
  "Dungarees",
  "Ethnic Wear",
  "Party Wear",
  "Sleepwear",
  "Winterwear",
];

interface SearchGroup {
  count: number;
  size: string;
}

interface SearchState {
  keyword: string;
  male: SearchGroup;
  female: SearchGroup;
  kids: SearchGroup;
  infants: SearchGroup;
}

const DEFAULT_SEARCH: SearchState = {
  keyword: "",
  male: { count: 0, size: "M" },
  female: { count: 0, size: "M" },
  kids: { count: 0, size: "4" },
  infants: { count: 0, size: "0" },
};

type GroupKey = "male" | "female" | "kids" | "infants";

const GROUP_CONFIG: {
  key: GroupKey;
  label: string;
  icon: string;
  sizeLabel: string;
  sizes: string[];
}[] = [
  {
    key: "male",
    label: "Men",
    icon: "👨",
    sizeLabel: "Size",
    sizes: ADULT_SIZES,
  },
  {
    key: "female",
    label: "Women",
    icon: "👩",
    sizeLabel: "Size",
    sizes: ADULT_SIZES,
  },
  {
    key: "kids",
    label: "Kids",
    icon: "👦",
    sizeLabel: "Age",
    sizes: KID_AGES.map(String),
  },
  {
    key: "infants",
    label: "Baby",
    icon: "👶",
    sizeLabel: "Months",
    sizes: INFANT_MONTHS.map(String),
  },
];

export default function Navbar({ currentPage, navigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchState, setSearchState] = useState<SearchState>(DEFAULT_SEARCH);
  const [menOpen, setMenOpen] = useState(false);
  const [menMobileOpen, setMenMobileOpen] = useState(false);
  const [womenOpen, setWomenOpen] = useState(false);
  const [womenMobileOpen, setWomenMobileOpen] = useState(false);
  const [boysOpen, setBoysOpen] = useState(false);
  const [boysMobileOpen, setBoysMobileOpen] = useState(false);
  const [girlsOpen, setGirlsOpen] = useState(false);
  const [girlsMobileOpen, setGirlsMobileOpen] = useState(false);
  const [boyBabyOpen, setBoyBabyOpen] = useState(false);
  const [boyBabyMobileOpen, setBoyBabyMobileOpen] = useState(false);
  const [girlBabyOpen, setGirlBabyOpen] = useState(false);
  const [girlBabyMobileOpen, setGirlBabyMobileOpen] = useState(false);
  const { login, clear, identity, loginStatus } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const { count: wishlistCount } = useWishlistContext();

  const updateGroup = (
    key: GroupKey,
    field: keyof SearchGroup,
    value: string | number,
  ) => {
    setSearchState((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const incrementCount = (key: GroupKey) => {
    setSearchState((prev) => ({
      ...prev,
      [key]: { ...prev[key], count: Math.min(5, prev[key].count + 1) },
    }));
  };

  const decrementCount = (key: GroupKey) => {
    setSearchState((prev) => ({
      ...prev,
      [key]: { ...prev[key], count: Math.max(0, prev[key].count - 1) },
    }));
  };

  const handleSearch = () => {
    setSearchOpen(false);
    navigate("find");
  };

  const closeAllDropdowns = () => {
    setMenOpen(false);
    setWomenOpen(false);
    setBoysOpen(false);
    setGirlsOpen(false);
    setBoyBabyOpen(false);
    setGirlBabyOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full bg-secondary border-b border-border shadow-sm"
      data-ocid="navbar.panel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-1 group"
            onClick={() => navigate("home")}
            data-ocid="nav.home.link"
          >
            <img
              src="/assets/uploads/shireka_fashion-019d25b9-1fe6-7557-acd9-0d6c0a3cebcd-1.png"
              alt="Shireka Fashion"
              className="h-9 object-contain"
            />
            <Flower2 className="w-4 h-4 text-foreground/50 group-hover:text-foreground transition-colors" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5">
            {/* HOME */}
            <button
              type="button"
              onClick={() => navigate("home")}
              className={`text-xs font-semibold tracking-widest transition-colors hover:text-foreground/60 ${
                currentPage === "home"
                  ? "text-foreground"
                  : "text-foreground/80"
              }`}
              data-ocid="nav.home.link"
            >
              HOME
            </button>

            {/* MEN Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                closeAllDropdowns();
                setMenOpen(true);
              }}
              onMouseLeave={() => setMenOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 text-xs font-semibold tracking-widest transition-colors hover:text-foreground/60 ${
                  menOpen ? "text-foreground" : "text-foreground/80"
                }`}
                data-ocid="nav.men.button"
              >
                MEN
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${menOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {menOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full mt-2 w-56 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50"
                    data-ocid="nav.men.dropdown"
                  >
                    <div className="px-4 pt-4 pb-2">
                      <p className="text-[10px] font-extrabold tracking-widest uppercase text-foreground/50 mb-2">
                        Topwear
                      </p>
                      <div className="flex flex-col gap-0.5">
                        {MEN_TOPWEAR.map((item, i) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setMenOpen(false);
                              navigate("find");
                            }}
                            className="text-left text-sm font-medium py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground"
                            data-ocid={`nav.men.topwear.item.${i + 1}`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] font-extrabold tracking-widest uppercase text-foreground/50 mb-2 mt-3">
                        Indian & Festive Wear
                      </p>
                      <div className="flex flex-col gap-0.5">
                        {MEN_FESTIVE.map((item, i) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setMenOpen(false);
                              navigate("find");
                            }}
                            className="text-left text-sm font-medium py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground"
                            data-ocid={`nav.men.festive.item.${i + 1}`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="h-1 bg-[#F9A8C9]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* WOMEN Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                closeAllDropdowns();
                setWomenOpen(true);
              }}
              onMouseLeave={() => setWomenOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 text-xs font-semibold tracking-widest transition-colors hover:text-foreground/60 ${
                  womenOpen ? "text-foreground" : "text-foreground/80"
                }`}
                data-ocid="nav.women.button"
              >
                WOMEN
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${womenOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {womenOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full mt-2 w-96 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50"
                    data-ocid="nav.women.dropdown"
                  >
                    <div className="px-4 pt-4 pb-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-extrabold tracking-widest uppercase text-foreground/50 mb-2">
                          Bottomwear
                        </p>
                        <div className="flex flex-col gap-0.5">
                          {WOMEN_BOTTOMWEAR.map((item, i) => (
                            <button
                              key={item}
                              type="button"
                              onClick={() => {
                                setWomenOpen(false);
                                navigate("find");
                              }}
                              className="text-left text-sm font-medium py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground"
                              data-ocid={`nav.women.bottomwear.item.${i + 1}`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold tracking-widest uppercase text-foreground/50 mb-2">
                          Western Wear
                        </p>
                        <div className="flex flex-col gap-0.5">
                          {WOMEN_WESTERNWEAR.map((item, i) => (
                            <button
                              key={item}
                              type="button"
                              onClick={() => {
                                setWomenOpen(false);
                                navigate("find");
                              }}
                              className="text-left text-sm font-medium py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground"
                              data-ocid={`nav.women.westernwear.item.${i + 1}`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="h-1 bg-[#F9A8C9]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BOYS Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                closeAllDropdowns();
                setBoysOpen(true);
              }}
              onMouseLeave={() => setBoysOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 text-xs font-semibold tracking-widest transition-colors hover:text-foreground/60 ${
                  boysOpen ? "text-foreground" : "text-foreground/80"
                }`}
                data-ocid="nav.boys.button"
              >
                BOYS
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${boysOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {boysOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full mt-2 w-52 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50"
                    data-ocid="nav.boys.dropdown"
                  >
                    <div className="px-4 pt-4 pb-2">
                      <p className="text-[10px] font-extrabold tracking-widest uppercase text-foreground/50 mb-2">
                        Boys
                      </p>
                      <div className="flex flex-col gap-0.5">
                        {BOYS_CATEGORIES.map((item, i) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setBoysOpen(false);
                              navigate("find");
                            }}
                            className="text-left text-sm font-medium py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground"
                            data-ocid={`nav.boys.item.${i + 1}`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="h-1 bg-[#F9A8C9]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* GIRLS Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                closeAllDropdowns();
                setGirlsOpen(true);
              }}
              onMouseLeave={() => setGirlsOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 text-xs font-semibold tracking-widest transition-colors hover:text-foreground/60 ${
                  girlsOpen ? "text-foreground" : "text-foreground/80"
                }`}
                data-ocid="nav.girls.button"
              >
                GIRLS
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${girlsOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {girlsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full mt-2 w-52 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50"
                    data-ocid="nav.girls.dropdown"
                  >
                    <div className="px-4 pt-4 pb-2">
                      <p className="text-[10px] font-extrabold tracking-widest uppercase text-foreground/50 mb-2">
                        Girls
                      </p>
                      <div className="flex flex-col gap-0.5">
                        {GIRLS_CATEGORIES.map((item, i) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setGirlsOpen(false);
                              navigate("find");
                            }}
                            className="text-left text-sm font-medium py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground"
                            data-ocid={`nav.girls.item.${i + 1}`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="h-1 bg-[#F9A8C9]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BOY BABY Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                closeAllDropdowns();
                setBoyBabyOpen(true);
              }}
              onMouseLeave={() => setBoyBabyOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 text-xs font-semibold tracking-widest transition-colors hover:text-foreground/60 ${
                  boyBabyOpen ? "text-foreground" : "text-foreground/80"
                }`}
                data-ocid="nav.boy_baby.button"
              >
                BOY BABY
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${boyBabyOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {boyBabyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full mt-2 w-52 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50"
                    data-ocid="nav.boy_baby.dropdown"
                  >
                    <div className="px-4 pt-4 pb-2">
                      <p className="text-[10px] font-extrabold tracking-widest uppercase text-foreground/50 mb-2">
                        Boy Baby
                      </p>
                      <div className="flex flex-col gap-0.5">
                        {BOY_BABY_CATEGORIES.map((item, i) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setBoyBabyOpen(false);
                              navigate("find");
                            }}
                            className="text-left text-sm font-medium py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground"
                            data-ocid={`nav.boy_baby.item.${i + 1}`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="h-1 bg-[#F9A8C9]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* GIRL BABY Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                closeAllDropdowns();
                setGirlBabyOpen(true);
              }}
              onMouseLeave={() => setGirlBabyOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 text-xs font-semibold tracking-widest transition-colors hover:text-foreground/60 ${
                  girlBabyOpen ? "text-foreground" : "text-foreground/80"
                }`}
                data-ocid="nav.girl_baby.button"
              >
                GIRL BABY
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${girlBabyOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {girlBabyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full mt-2 w-52 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50"
                    data-ocid="nav.girl_baby.dropdown"
                  >
                    <div className="px-4 pt-4 pb-2">
                      <p className="text-[10px] font-extrabold tracking-widest uppercase text-foreground/50 mb-2">
                        Girl Baby
                      </p>
                      <div className="flex flex-col gap-0.5">
                        {GIRL_BABY_CATEGORIES.map((item, i) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setGirlBabyOpen(false);
                              navigate("find");
                            }}
                            className="text-left text-sm font-medium py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground"
                            data-ocid={`nav.girl_baby.item.${i + 1}`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="h-1 bg-[#F9A8C9]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Utility Icons */}
          <div className="flex items-center gap-1 md:gap-3">
            <button
              type="button"
              className="flex flex-col items-center p-2 hover:bg-background/60 rounded-md transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
              data-ocid="nav.search.button"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:block text-[9px] font-medium mt-0.5">
                Search
              </span>
            </button>
            <button
              type="button"
              className="flex flex-col items-center p-2 hover:bg-background/60 rounded-md transition-colors"
              onClick={() => {
                if (isLoggedIn) navigate("profile");
                else login();
              }}
              data-ocid="nav.account.button"
            >
              <User className="w-4 h-4" />
              <span className="hidden md:block text-[9px] font-medium mt-0.5">
                {isLoggedIn ? "Account" : "Login"}
              </span>
            </button>
            <button
              type="button"
              className="flex flex-col items-center p-2 hover:bg-background/60 rounded-md transition-colors"
              onClick={() => navigate("wishlist")}
              data-ocid="nav.wishlist.link"
            >
              <span className="relative">
                <Heart
                  className={`w-4 h-4 transition-colors ${wishlistCount > 0 ? "fill-red-500 text-red-500" : ""}`}
                />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center leading-none px-[2px]">
                    {wishlistCount}
                  </span>
                )}
              </span>
              <span className="hidden md:block text-[9px] font-medium mt-0.5">
                Wishlist
              </span>
            </button>
            <button
              type="button"
              className="flex flex-col items-center p-2 hover:bg-background/60 rounded-md transition-colors"
              data-ocid="nav.cart.button"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden md:block text-[9px] font-medium mt-0.5">
                Cart
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.menu.button"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Rich Search Panel */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="py-4 space-y-4">
                <SmartSearchBar
                  onSearch={() => handleSearch()}
                  placeholder="Search 'wedding couple outfits', 'kids twinning'..."
                  variant="navbar"
                  className="w-full"
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {GROUP_CONFIG.map((group) => {
                    const grp = searchState[group.key];
                    return (
                      <div
                        key={group.key}
                        className="bg-background border border-border rounded-lg p-3"
                        data-ocid={`search.${group.key}.panel`}
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="text-base">{group.icon}</span>
                          <span className="text-xs font-bold uppercase tracking-wider">
                            {group.label}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground">
                            Count
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => decrementCount(group.key)}
                              className="w-6 h-6 flex items-center justify-center rounded border border-border hover:bg-muted transition-colors"
                              data-ocid={`search.${group.key}.decrement.button`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold">
                              {grp.count}
                            </span>
                            <button
                              type="button"
                              onClick={() => incrementCount(group.key)}
                              className="w-6 h-6 flex items-center justify-center rounded border border-border hover:bg-muted transition-colors"
                              data-ocid={`search.${group.key}.increment.button`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        {grp.count > 0 && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              {group.sizeLabel}
                            </p>
                            <select
                              value={grp.size}
                              onChange={(e) =>
                                updateGroup(group.key, "size", e.target.value)
                              }
                              className="w-full text-xs bg-background border border-border rounded px-2 py-1.5 outline-none focus:ring-1 focus:ring-foreground"
                              data-ocid={`search.${group.key}.size.select`}
                            >
                              {group.sizes.map((s) => (
                                <option key={s} value={s}>
                                  {group.key === "kids"
                                    ? `Age ${s}`
                                    : group.key === "infants"
                                      ? `${s} months`
                                      : s}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={handleSearch}
                  className="w-full bg-primary text-primary-foreground rounded py-2.5 text-sm font-bold tracking-widest uppercase hover:opacity-90 transition-opacity"
                  data-ocid="nav.search.submit_button"
                >
                  Search Outfits
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-secondary border-t border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {/* HOME */}
              <button
                type="button"
                onClick={() => {
                  navigate("home");
                  setMobileOpen(false);
                }}
                className="text-left text-sm font-semibold tracking-widest py-2 hover:text-foreground/60 transition-colors"
              >
                HOME
              </button>

              {/* MEN accordion */}
              <button
                type="button"
                onClick={() => setMenMobileOpen((v) => !v)}
                className="flex items-center justify-between text-left text-sm font-semibold tracking-widest py-2 hover:text-foreground/60 transition-colors"
                data-ocid="nav.men.mobile.button"
              >
                MEN
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${menMobileOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {menMobileOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 flex flex-col gap-0.5 pb-2">
                      <p className="text-[10px] font-extrabold tracking-widest uppercase text-foreground/50 py-1">
                        Topwear
                      </p>
                      {MEN_TOPWEAR.map((item, i) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            navigate("find");
                            setMobileOpen(false);
                            setMenMobileOpen(false);
                          }}
                          className="text-left text-sm py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground/80"
                          data-ocid={`nav.men.topwear.mobile.item.${i + 1}`}
                        >
                          {item}
                        </button>
                      ))}
                      <p className="text-[10px] font-extrabold tracking-widest uppercase text-foreground/50 py-1 mt-2">
                        Indian & Festive Wear
                      </p>
                      {MEN_FESTIVE.map((item, i) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            navigate("find");
                            setMobileOpen(false);
                            setMenMobileOpen(false);
                          }}
                          className="text-left text-sm py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground/80"
                          data-ocid={`nav.men.festive.mobile.item.${i + 1}`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* WOMEN accordion */}
              <button
                type="button"
                onClick={() => setWomenMobileOpen((v) => !v)}
                className="flex items-center justify-between text-left text-sm font-semibold tracking-widest py-2 hover:text-foreground/60 transition-colors"
                data-ocid="nav.women.mobile.button"
              >
                WOMEN
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${womenMobileOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {womenMobileOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 flex flex-col gap-0.5 pb-2">
                      <p className="text-[10px] font-extrabold tracking-widest uppercase text-foreground/50 py-1">
                        Bottomwear
                      </p>
                      {WOMEN_BOTTOMWEAR.map((item, i) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            navigate("find");
                            setMobileOpen(false);
                            setWomenMobileOpen(false);
                          }}
                          className="text-left text-sm py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground/80"
                          data-ocid={`nav.women.bottomwear.mobile.item.${i + 1}`}
                        >
                          {item}
                        </button>
                      ))}
                      <p className="text-[10px] font-extrabold tracking-widest uppercase text-foreground/50 py-1 mt-2">
                        Western Wear
                      </p>
                      {WOMEN_WESTERNWEAR.map((item, i) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            navigate("find");
                            setMobileOpen(false);
                            setWomenMobileOpen(false);
                          }}
                          className="text-left text-sm py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground/80"
                          data-ocid={`nav.women.westernwear.mobile.item.${i + 1}`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* BOYS accordion */}
              <button
                type="button"
                onClick={() => setBoysMobileOpen((v) => !v)}
                className="flex items-center justify-between text-left text-sm font-semibold tracking-widest py-2 hover:text-foreground/60 transition-colors"
                data-ocid="nav.boys.mobile.button"
              >
                BOYS
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${boysMobileOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {boysMobileOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 flex flex-col gap-0.5 pb-2">
                      {BOYS_CATEGORIES.map((item, i) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            navigate("find");
                            setMobileOpen(false);
                            setBoysMobileOpen(false);
                          }}
                          className="text-left text-sm py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground/80"
                          data-ocid={`nav.boys.mobile.item.${i + 1}`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* GIRLS accordion */}
              <button
                type="button"
                onClick={() => setGirlsMobileOpen((v) => !v)}
                className="flex items-center justify-between text-left text-sm font-semibold tracking-widest py-2 hover:text-foreground/60 transition-colors"
                data-ocid="nav.girls.mobile.button"
              >
                GIRLS
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${girlsMobileOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {girlsMobileOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 flex flex-col gap-0.5 pb-2">
                      {GIRLS_CATEGORIES.map((item, i) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            navigate("find");
                            setMobileOpen(false);
                            setGirlsMobileOpen(false);
                          }}
                          className="text-left text-sm py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground/80"
                          data-ocid={`nav.girls.mobile.item.${i + 1}`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* BOY BABY accordion */}
              <button
                type="button"
                onClick={() => setBoyBabyMobileOpen((v) => !v)}
                className="flex items-center justify-between text-left text-sm font-semibold tracking-widest py-2 hover:text-foreground/60 transition-colors"
                data-ocid="nav.boy_baby.mobile.button"
              >
                BOY BABY
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${boyBabyMobileOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {boyBabyMobileOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 flex flex-col gap-0.5 pb-2">
                      {BOY_BABY_CATEGORIES.map((item, i) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            navigate("find");
                            setMobileOpen(false);
                            setBoyBabyMobileOpen(false);
                          }}
                          className="text-left text-sm py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground/80"
                          data-ocid={`nav.boy_baby.mobile.item.${i + 1}`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* GIRL BABY accordion */}
              <button
                type="button"
                onClick={() => setGirlBabyMobileOpen((v) => !v)}
                className="flex items-center justify-between text-left text-sm font-semibold tracking-widest py-2 hover:text-foreground/60 transition-colors"
                data-ocid="nav.girl_baby.mobile.button"
              >
                GIRL BABY
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${girlBabyMobileOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {girlBabyMobileOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 flex flex-col gap-0.5 pb-2">
                      {GIRL_BABY_CATEGORIES.map((item, i) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            navigate("find");
                            setMobileOpen(false);
                            setGirlBabyMobileOpen(false);
                          }}
                          className="text-left text-sm py-1.5 px-2 rounded-md hover:bg-muted transition-colors text-foreground/80"
                          data-ocid={`nav.girl_baby.mobile.item.${i + 1}`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isLoggedIn && (
                <button
                  type="button"
                  onClick={() => {
                    clear();
                    setMobileOpen(false);
                  }}
                  className="text-left text-sm font-semibold tracking-widest py-2 text-destructive"
                >
                  LOGOUT
                </button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
