import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  Heart,
  RotateCcw,
  SearchX,
  Share2,
  SlidersHorizontal,
  Sparkles,
  TrendingDown,
  X,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { MemberConfig, OutfitFinderState, Page } from "../App";
import TwinningLooksSuggestions, {
  type MemberType,
} from "../components/TwinningLooksSuggestions";
import { useWishlistContext } from "../contexts/WishlistContext";
import { useIsMobile } from "../hooks/use-mobile";

interface ResultsPageProps {
  navigate: (p: Page) => void;
  finderState: OutfitFinderState;
}

// ─────────────── PLATFORM CONFIG (order: Ajio, Amazon, Flipkart, Meesho, Myntra) ───────────────
const PLATFORMS = [
  { id: "Ajio", label: "Ajio", color: "#5A0064", bg: "#f8f0fa" },
  { id: "Amazon", label: "Amazon", color: "#FF9900", bg: "#fff8ec" },
  { id: "Flipkart", label: "Flipkart", color: "#2874F0", bg: "#eef4ff" },
  { id: "Meesho", label: "Meesho", color: "#9B1FE8", bg: "#f5eeff" },
  { id: "Myntra", label: "Myntra", color: "#FF3F6C", bg: "#fff0f4" },
];

const COLOR_HEX: Record<string, string> = {
  Black: "#111",
  White: "#F5F5F5",
  Blue: "#4169E1",
  Pink: "#FF69B4",
  Green: "#228B22",
  Red: "#DC143C",
  Multi: "linear-gradient(135deg,#FF6B6B,#FFD700,#4169E1)",
  "Navy Blue": "#001F5B",
  Grey: "#808080",
  Maroon: "#800000",
  Brown: "#8B4513",
  Yellow: "#FFD700",
  Beige: "#F5F5DC",
  Purple: "#800080",
  "Off White": "#FAF9F6",
  Peach: "#FFCBA4",
  Orange: "#FF8C00",
  Olive: "#808000",
  Mustard: "#FFDB58",
  Lavender: "#E6E6FA",
  Cream: "#FFFDD0",
  "Turquoise Blue": "#40E0D0",
  Teal: "#008080",
  "Sea Green": "#2E8B57",
  "Lime Green": "#32CD32",
  Burgundy: "#800020",
  Charcoal: "#36454F",
  Rust: "#B7410E",
  Coral: "#FF6B6B",
  Mauve: "#E0B0FF",
  Khaki: "#C3B091",
  "Coffee Brown": "#6F4E37",
  Rose: "#FF007F",
  Magenta: "#FF00FF",
  Gold: "#FFD700",
  Tan: "#D2B48C",
  Violet: "#EE82EE",
  Nude: "#E3BC9A",
  Silver: "#C0C0C0",
  "Rose Gold": "#B76E79",
  Copper: "#B87333",
  Bronze: "#CD7F32",
};

// ─────────────── GARMENT FALLBACK EMOJI ───────────────
function getGarmentEmoji(garment: string): string {
  const lower = garment.toLowerCase();
  if (
    lower.includes("saree") ||
    lower.includes("lehenga") ||
    lower.includes("churidar") ||
    lower.includes("kurti") ||
    lower.includes("dress") ||
    lower.includes("frock") ||
    lower.includes("top") ||
    lower.includes("skirt")
  )
    return "👗";
  if (
    lower.includes("sherwani") ||
    lower.includes("suit") ||
    lower.includes("blazer") ||
    lower.includes("formal shirt")
  )
    return "🤵";
  if (
    lower.includes("kurta") ||
    lower.includes("nehru") ||
    lower.includes("dhoti") ||
    lower.includes("ethnic")
  )
    return "👘";
  if (lower.includes("shirt") || lower.includes("t-shirt")) return "👔";
  if (
    lower.includes("jacket") ||
    lower.includes("coat") ||
    lower.includes("sweatshirt")
  )
    return "🧥";
  if (
    lower.includes("jeans") ||
    lower.includes("trouser") ||
    lower.includes("pant")
  )
    return "👖";
  if (lower.includes("onesie") || lower.includes("romper")) return "🍼";
  return "👕";
}

// ─────────────── STYLE CATEGORIES ───────────────
const STYLE_CATEGORIES: Record<string, string[]> = {
  "Fit Types": [
    "Regular Fit",
    "Slim Fit",
    "Relaxed Fit",
    "Oversized",
    "Tailored",
    "Straight Cut",
    "A-Line",
    "Flared",
    "Asymmetric",
    "Comfort Fit",
    "Athletic Fit",
    "Boxy Fit",
    "Cropped",
  ],
  "Prints & Patterns": [
    "Printed",
    "Floral",
    "Geometric",
    "Paisley",
    "Abstract",
    "Striped",
    "Checked",
    "Polka Dot",
    "Animal Print",
    "Tie-Dye",
    "Batik",
    "Block Print",
    "Ikat",
    "Chevron",
    "Camouflage",
    "Ombre",
    "Digital Print",
    "Kalamkari",
    "Ajrakh Print",
    "Dabu Print",
    "Madhubani",
  ],
  Occasion: [
    "Casual",
    "Formal",
    "Semi-Formal",
    "Party Wear",
    "Wedding",
    "Bridal",
    "Traditional",
    "Ethnic",
    "Contemporary",
    "Fusion",
    "Boho",
    "Minimalist",
    "Luxury",
    "Premium",
    "Indo-Western",
    "Resort Wear",
    "Cocktail",
    "Workwear",
    "Loungewear",
    "Athleisure",
    "Festive",
    "Designer",
    "Plain",
    "Embroidered",
  ],
  Fabric: [
    "Linen",
    "Silk",
    "Cotton",
    "Velvet",
    "Chiffon",
    "Georgette",
    "Chanderi",
    "Khadi",
    "Organza",
    "Satin",
    "Brocade",
    "Net Fabric",
    "Rayon",
    "Modal",
    "Crepe",
  ],
  Embellishments: [
    "Zari Work",
    "Mirror Work",
    "Thread Work",
    "Sequin",
    "Beaded",
    "Lacework",
    "Resham Work",
    "Kantha",
    "Gota Patti",
    "Cutdana",
    "Mukesh Work",
    "Chikankari",
    "Phulkari",
    "Bandhani",
    "Leheriya",
  ],
  "Regional Styles": [
    "Rajasthani",
    "Lucknowi",
    "Bengali",
    "Banarasi",
    "Kashmiri",
    "Hyderabadi",
    "Gujarati",
    "Maharashtrian",
    "Punjabi",
    "Kanjeevaram",
    "Paithani",
    "Patola",
  ],
};

const INDIAN_BRANDS = [
  "Manyavar",
  "Fabindia",
  "W for Woman",
  "Biba",
  "Global Desi",
  "Libas",
  "Jaipur Kurti",
  "Soch",
  "Aurelia",
  "Rangmanch",
  "Ethnix",
  "Tasva",
  "Mohey",
  "Meena Bazaar",
  "Anokhi",
  "FabAlley",
  "Vark",
  "Masaba",
  "Ritu Kumar",
  "AND",
  "Pantaloons",
  "Max Fashion",
  "Westside",
  "Taneira",
  "Nalli",
  "Vasansi",
  "Raw Mango",
  "Nimiyas",
  "Aks",
  "Vero Moda India",
];

// ─────────────── FASHION UNSPLASH PHOTO SEEDS ───────────────
const FASHION_PHOTO_SEEDS = [
  "ethnic-kurta-1",
  "ethnic-kurta-2",
  "saree-silk-1",
  "lehenga-bridal-1",
  "sherwani-men-1",
  "kurti-floral-1",
  "dress-casual-1",
  "salwar-suit-1",
  "anarkali-frock-1",
  "dhoti-kurta-1",
  "shirt-men-1",
  "top-women-1",
  "jeans-women-1",
  "blazer-men-1",
  "indo-western-1",
  "festive-wear-1",
  "cotton-kurta-1",
  "silk-saree-1",
  "georgette-top-1",
  "chiffon-dress-1",
  "velvet-suit-1",
  "banarasi-saree-1",
  "lucknowi-kurta-1",
  "phulkari-suit-1",
  "rajasthani-dress-1",
  "bandhani-saree-1",
  "kanjivaram-1",
  "patola-1",
  "paithani-1",
  "chaneri-1",
  "khadi-1",
  "organza-1",
];

function getProductImage(variantIndex: number, garment: string): string {
  const seed = FASHION_PHOTO_SEEDS[variantIndex % FASHION_PHOTO_SEEDS.length];
  return `https://picsum.photos/seed/${seed}-${garment
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 10)}-${variantIndex % 8}/400/500`;
}

function getBrand(variantIndex: number, garment: string): string {
  const hash = simpleHash(garment + String(variantIndex * 7));
  return INDIAN_BRANDS[hash % INDIAN_BRANDS.length];
}

// ─────────────── OUTFIT VARIANT STYLES (500 options) ───────────────
function generateOutfitStyleNames(): string[] {
  const bases = [
    "Regular Fit",
    "Slim Fit",
    "Relaxed Fit",
    "Oversized",
    "Tailored",
    "Straight Cut",
    "A-Line",
    "Flared",
    "Asymmetric",
    "Comfort Fit",
    "Athletic Fit",
    "Boxy Fit",
    "Cropped",
    "Embroidered",
    "Printed",
    "Plain",
    "Designer",
    "Festive",
    "Floral",
    "Geometric",
    "Paisley",
    "Abstract",
    "Striped",
    "Checked",
    "Polka Dot",
    "Animal Print",
    "Tie-Dye",
    "Batik",
    "Block Print",
    "Ikat",
    "Chevron",
    "Ombre",
    "Digital Print",
    "Kalamkari",
    "Ajrakh Print",
    "Dabu Print",
    "Madhubani",
    "Casual",
    "Formal",
    "Semi-Formal",
    "Party Wear",
    "Wedding",
    "Bridal",
    "Traditional",
    "Ethnic",
    "Contemporary",
    "Fusion",
    "Boho",
    "Minimalist",
    "Luxury",
    "Premium",
    "Indo-Western",
    "Resort Wear",
    "Cocktail",
    "Workwear",
    "Loungewear",
    "Athleisure",
    "Linen",
    "Silk",
    "Cotton",
    "Velvet",
    "Chiffon",
    "Georgette",
    "Chanderi",
    "Khadi",
    "Organza",
    "Satin",
    "Brocade",
    "Net Fabric",
    "Rayon",
    "Modal",
    "Crepe",
    "Zari Work",
    "Mirror Work",
    "Thread Work",
    "Sequin",
    "Beaded",
    "Lacework",
    "Resham Work",
    "Kantha",
    "Gota Patti",
    "Cutdana",
    "Mukesh Work",
    "Chikankari",
    "Phulkari",
    "Bandhani",
    "Leheriya",
    "Rajasthani",
    "Lucknowi",
    "Bengali",
    "Banarasi",
    "Kashmiri",
    "Hyderabadi",
    "Gujarati",
    "Maharashtrian",
    "Punjabi",
    "Kanjeevaram",
    "Paithani",
    "Patola",
  ];
  const modifiers = [
    "Classic",
    "Modern",
    "Heritage",
    "Signature",
    "Exclusive",
    "Limited Edition",
    "Artisan",
    "Handcrafted",
    "Premium",
    "Festive Special",
    "Bridal Collection",
    "Everyday",
    "Occasion",
    "Luxe",
    "Essential",
    "Vibrant",
    "Subtle",
    "Rich",
    "Delicate",
    "Statement",
    "Contemporary",
    "Vintage",
    "Seasonal",
    "Bestseller",
    "New Arrival",
    "Comfort",
    "Designer",
    "Elegant",
    "Trendy",
    "Timeless",
    "Handloom",
    "Organic",
    "Sustainable",
    "Durable",
    "Lightweight",
    "Breathable",
    "Soft Touch",
    "Smooth",
    "Textured",
    "Embossed",
    "Woven",
    "Knit",
    "Stretch",
    "Stiff",
    "Flowing",
  ];
  const styles: string[] = [...bases];
  let idx = 0;
  while (styles.length < 500) {
    const base = bases[idx % bases.length];
    const mod = modifiers[Math.floor(idx / bases.length) % modifiers.length];
    const candidate = `${mod} ${base}`;
    if (!styles.includes(candidate)) {
      styles.push(candidate);
    }
    idx++;
  }
  return styles.slice(0, 500);
}

const OUTFIT_STYLES = generateOutfitStyleNames();

// ─────────────── PRICE GENERATION ───────────────
const BASE_PRICES: Record<string, number> = {
  "Kurtas & Kurta Sets": 800,
  Sherwanis: 2800,
  "Nehru Jackets": 1200,
  Dhotis: 600,
  "T-Shirts": 500,
  "Casual Shirts": 700,
  "Formal Shirts": 900,
  Sweatshirts: 950,
  Sweaters: 1100,
  Jackets: 1800,
  "Blazers & Coats": 2200,
  Suits: 3200,
  Churidars: 750,
  Sarees: 1400,
  Kurtis: 650,
  Dresses: 1200,
  Tops: 550,
  Jeans: 900,
  "Trousers & Capris": 800,
  "Shorts & Skirts": 650,
  "Co-ords": 1400,
  Jumpsuits: 1300,
  "Blazers & Waistcoats": 2000,
  "Jackets & Coats": 1900,
  "Kurtas & Sets": 700,
  Shirts: 600,
  "Jeans & Trousers": 800,
  Shorts: 500,
  "Ethnic Wear": 900,
  "Party Wear": 1400,
  "Onesies & Rompers": 450,
  "Kurtis & Sets": 700,
  "Frocks & Dresses": 800,
  "Tops & T-shirts": 500,
  "Jeans & Jeggings": 750,
  "Jumpsuits & Dungarees": 900,
  "Sets & Suits": 600,
  "Kurta Sets": 700,
  Frocks: 650,
  "Tops & Shorts": 500,
};

const PLATFORM_MULTIPLIERS: Record<string, number> = {
  Ajio: 1.12,
  Amazon: 0.92,
  Flipkart: 0.95,
  Meesho: 0.78,
  Myntra: 1.0,
};

const PLATFORM_RATINGS: Record<string, number> = {
  Ajio: 4.2,
  Amazon: 4.1,
  Flipkart: 4.0,
  Meesho: 3.9,
  Myntra: 4.3,
};

// ─────────────── HASH UTILITY ───────────────
function simpleHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++)
    h = (h * 31 + s.charCodeAt(i)) & 0xffffffff;
  return Math.abs(h);
}

// ─────────────── VARIANT PLATFORM AVAILABILITY ───────────────
function getVariantPlatforms(
  garment: string,
  color: string,
  variantIndex: number,
): string[] {
  const hash = simpleHash(garment + color + String(variantIndex));
  const count = (hash % 3) + 2;
  const order = PLATFORMS.map((p, i) => ({
    id: p.id,
    sort: simpleHash(p.id + garment + color + String(variantIndex) + i),
  }))
    .sort((a, b) => a.sort - b.sort)
    .map((x) => x.id);
  return order.slice(0, count);
}

// ─────────────── OUTFIT VARIANT TYPE ───────────────
interface OutfitVariant {
  variantIndex: number;
  styleName: string;
  fullName: string;
  color: string;
  garment: string;
  brand: string;
  productImage: string;
  platforms: Array<{
    id: string;
    label: string;
    color: string;
    bg: string;
    price: number;
    rating: number;
    buyUrl: string;
  }>;
  lowestPrice: number;
  cheapestPlatform: string;
}

function generateOutfitVariants(member: MemberConfig): OutfitVariant[] {
  const base = BASE_PRICES[member.garment] ?? 800;
  const color = member.color;
  const outfitType = member.garment;

  return OUTFIT_STYLES.map((style, idx) => {
    const fullName = `${style} ${color} ${outfitType}`;
    const availablePlatformIds = getVariantPlatforms(outfitType, color, idx);
    const availablePlatforms = PLATFORMS.filter((p) =>
      availablePlatformIds.includes(p.id),
    );

    const variantBase = base * (0.9 + idx * 0.02);
    const searchQuery = encodeURIComponent(
      `${color} ${outfitType} ${member.label} ${member.size}`,
    );
    const outfitSlug = outfitType.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const colorSlug = color.toLowerCase().replace(/ /g, "+");

    const platforms = availablePlatforms.map((p) => {
      const price = Math.round(variantBase * PLATFORM_MULTIPLIERS[p.id]);
      const buyUrl = (() => {
        if (p.id === "Myntra")
          return `https://www.myntra.com/${outfitSlug}?q=${colorSlug}+${outfitSlug}`;
        if (p.id === "Amazon")
          return `https://www.amazon.in/s?k=${searchQuery}`;
        if (p.id === "Flipkart")
          return `https://www.flipkart.com/search?q=${searchQuery}`;
        if (p.id === "Ajio")
          return `https://www.ajio.com/search/?text=${colorSlug}+${outfitSlug}`;
        return `https://meesho.com/search?q=${searchQuery}`;
      })();
      return {
        id: p.id,
        label: p.label,
        color: p.color,
        bg: p.bg,
        price,
        rating: PLATFORM_RATINGS[p.id],
        buyUrl,
      };
    });

    const lowestPrice = Math.min(...platforms.map((p) => p.price));
    const cheapestPlatform =
      platforms.find((p) => p.price === lowestPrice)?.id ?? "";

    return {
      variantIndex: idx,
      styleName: style,
      fullName,
      color,
      garment: outfitType,
      brand: getBrand(idx, outfitType),
      productImage: getProductImage(idx, outfitType),
      platforms,
      lowestPrice,
      cheapestPlatform,
    };
  });
}

// ─────────────── MEMBER EMOJI ───────────────
const MEMBER_EMOJIS: Record<string, string> = {
  man: "👨",
  woman: "👩",
  boy: "👦",
  girl: "👧",
  infant_boy: "👶",
  infant_girl: "👶",
};

// ─────────────── FILTER STATE TYPE ───────────────
interface FilterState {
  selectedCategories: Set<string>;
  selectedPlatforms: Set<string>;
  maxPrice: number;
  sortBy: string;
}

const DEFAULT_FILTER: FilterState = {
  selectedCategories: new Set(),
  selectedPlatforms: new Set(),
  maxPrice: 5000,
  sortBy: "Recommended",
};

const SORT_OPTIONS = [
  "Recommended",
  "Price: Low to High",
  "Price: High to Low",
  "Top Rated",
];

// ─────────────── SORT & FILTER LOGIC ───────────────
function applyFiltersAndSort(
  variants: OutfitVariant[],
  filters: FilterState,
): OutfitVariant[] {
  let result = variants;

  // Category filter
  if (filters.selectedCategories.size > 0) {
    const allowedStyles = new Set<string>();
    for (const cat of filters.selectedCategories) {
      for (const style of STYLE_CATEGORIES[cat] ?? []) {
        allowedStyles.add(style);
      }
    }
    result = result.filter((v) => allowedStyles.has(v.styleName));
  }

  // Platform filter
  if (filters.selectedPlatforms.size > 0) {
    result = result.filter((v) =>
      v.platforms.some((p) => filters.selectedPlatforms.has(p.id)),
    );
  }

  // Max price filter
  result = result.filter((v) => v.lowestPrice <= filters.maxPrice);

  // Sort
  if (filters.sortBy === "Price: Low to High") {
    result = [...result].sort((a, b) => a.lowestPrice - b.lowestPrice);
  } else if (filters.sortBy === "Price: High to Low") {
    result = [...result].sort((a, b) => b.lowestPrice - a.lowestPrice);
  } else if (filters.sortBy === "Top Rated") {
    result = [...result].sort((a, b) => {
      const aRating = Math.max(...a.platforms.map((p) => p.rating));
      const bRating = Math.max(...b.platforms.map((p) => p.rating));
      return bRating - aRating;
    });
  }

  return result;
}

// ─────────────── SORT & FILTER BAR COMPONENT ───────────────
function SortFilterBar({
  filters,
  onChange,
  totalCount,
  filteredCount,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  totalCount: number;
  filteredCount: number;
}) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  const activeFilterCount =
    filters.selectedCategories.size +
    filters.selectedPlatforms.size +
    (filters.maxPrice < 5000 ? 1 : 0);

  const toggleCategory = (cat: string) => {
    const next = new Set(filters.selectedCategories);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    onChange({ ...filters, selectedCategories: next });
  };

  const togglePlatform = (pid: string) => {
    const next = new Set(filters.selectedPlatforms);
    if (next.has(pid)) next.delete(pid);
    else next.add(pid);
    onChange({ ...filters, selectedPlatforms: next });
  };

  const clearAll = () => {
    onChange({ ...DEFAULT_FILTER, sortBy: filters.sortBy });
  };

  return (
    <div className="mx-4 mt-3 mb-1">
      {/* Top bar */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Sort By */}
        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-foreground flex-shrink-0" />
          <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">
            Sort:
          </span>
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
            className="text-sm font-bold text-black bg-transparent outline-none cursor-pointer"
            data-ocid="sort_filter.select"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Filter toggle button */}
        <button
          type="button"
          onClick={() =>
            isMobile ? setSheetOpen(true) : setPanelOpen((o) => !o)
          }
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold border transition-colors ${
            panelOpen || sheetOpen || activeFilterCount > 0
              ? "bg-primary text-primary-foreground border-[#F9A8C9]"
              : "bg-gray-50 text-gray-700 border-gray-200 hover:border-[#F9A8C9]"
          }`}
          data-ocid="sort_filter.toggle"
        >
          <Filter className="w-3.5 h-3.5" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-0.5 bg-white text-black rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-extrabold">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Results count badge */}
        <span className="ml-auto text-xs font-semibold text-gray-500">
          <span className="font-extrabold text-black">{filteredCount}</span>
          <span> / {totalCount} styles</span>
        </span>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-red-500 font-semibold hover:underline flex items-center gap-1"
            data-ocid="sort_filter.clear_button"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {Array.from(filters.selectedCategories).map((cat) => (
            <span
              key={cat}
              className="flex items-center gap-1 bg-pink-100 text-foreground text-[11px] font-semibold px-2 py-0.5 rounded-full"
            >
              {cat}
              <button
                type="button"
                onClick={() => toggleCategory(cat)}
                className="hover:text-red-500"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
          {Array.from(filters.selectedPlatforms).map((pid) => {
            const plat = PLATFORMS.find((p) => p.id === pid);
            return (
              <span
                key={pid}
                className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: plat?.bg, color: plat?.color }}
              >
                {pid}
                <button
                  type="button"
                  onClick={() => togglePlatform(pid)}
                  className="opacity-70 hover:opacity-100"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            );
          })}
          {filters.maxPrice < 5000 && (
            <span
              className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: "var(--color-pink)",
                color: "var(--color-black)",
              }}
            >
              Max ₹{filters.maxPrice.toLocaleString("en-IN")}
              <button
                type="button"
                onClick={() => onChange({ ...filters, maxPrice: 5000 })}
                className="hover:text-red-500"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Collapsible filter panel - desktop only */}
      <AnimatePresence>
        {!isMobile && panelOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-2 bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4">
              {/* Style Category pills */}
              <div>
                <p className="text-xs font-bold text-gray-700 mb-2">
                  Style Category
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {Object.keys(STYLE_CATEGORIES).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                        filters.selectedCategories.has(cat)
                          ? "bg-primary text-primary-foreground border-[#F9A8C9]"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#F9A8C9]"
                      }`}
                      data-ocid="sort_filter.category_toggle"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform pills */}
              <div>
                <p className="text-xs font-bold text-gray-700 mb-2">Platform</p>
                <div className="flex flex-wrap gap-1.5">
                  {PLATFORMS.map((plat) => (
                    <button
                      key={plat.id}
                      type="button"
                      onClick={() => togglePlatform(plat.id)}
                      className={`text-[11px] font-bold px-3 py-1 rounded-full border-2 transition-all ${
                        filters.selectedPlatforms.has(plat.id)
                          ? "shadow-md scale-105"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      style={{
                        background: filters.selectedPlatforms.has(plat.id)
                          ? plat.color
                          : plat.bg,
                        color: filters.selectedPlatforms.has(plat.id)
                          ? "#fff"
                          : plat.color,
                        borderColor: plat.color,
                      }}
                      data-ocid="sort_filter.platform_toggle"
                    >
                      {plat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max price slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-gray-700">Max Price</p>
                  <span className="text-xs font-extrabold text-black">
                    ₹{filters.maxPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <Slider
                  min={200}
                  max={5000}
                  step={100}
                  value={[filters.maxPrice]}
                  onValueChange={([val]) =>
                    onChange({ ...filters, maxPrice: val })
                  }
                  className="w-full"
                  data-ocid="sort_filter.price_slider"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>₹200</span>
                  <span>₹5,000</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Mobile filter sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-3xl max-h-[85vh] flex flex-col"
          data-ocid="sort_filter.sheet"
        >
          <SheetHeader>
            <SheetTitle className="text-lg font-bold text-left">
              Sort & Filter
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 overflow-y-auto py-4">
            <div className="space-y-4">
              {/* Sort */}
              <div>
                <p className="text-sm font-bold text-gray-700 mb-2">Sort By</p>
                <div className="flex flex-wrap gap-2">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onChange({ ...filters, sortBy: opt })}
                      className={`text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                        filters.sortBy === opt
                          ? "bg-primary text-primary-foreground border-[#F9A8C9]"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#F9A8C9]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              {/* Style Category */}
              <div>
                <p className="text-sm font-bold text-gray-700 mb-2">
                  Style Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(STYLE_CATEGORIES).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                        filters.selectedCategories.has(cat)
                          ? "bg-primary text-primary-foreground border-[#F9A8C9]"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#F9A8C9]"
                      }`}
                      data-ocid="sort_filter.category_toggle"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              {/* Platform */}
              <div>
                <p className="text-sm font-bold text-gray-700 mb-2">Platform</p>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map((plat) => (
                    <button
                      key={plat.id}
                      type="button"
                      onClick={() => togglePlatform(plat.id)}
                      className={`text-sm font-bold px-4 py-1.5 rounded-full border-2 transition-all ${
                        filters.selectedPlatforms.has(plat.id)
                          ? "shadow-md scale-105"
                          : "opacity-70"
                      }`}
                      style={{
                        background: filters.selectedPlatforms.has(plat.id)
                          ? plat.color
                          : plat.bg,
                        color: filters.selectedPlatforms.has(plat.id)
                          ? "#fff"
                          : plat.color,
                        borderColor: plat.color,
                      }}
                      data-ocid="sort_filter.platform_toggle"
                    >
                      {plat.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Max price */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-gray-700">Max Price</p>
                  <span className="text-sm font-extrabold text-black">
                    ₹{filters.maxPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <Slider
                  min={200}
                  max={5000}
                  step={100}
                  value={[filters.maxPrice]}
                  onValueChange={([val]) =>
                    onChange({ ...filters, maxPrice: val })
                  }
                  className="w-full"
                  data-ocid="sort_filter.price_slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹200</span>
                  <span>₹5,000</span>
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="pt-3 pb-2 flex gap-2">
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  clearAll();
                  setSheetOpen(false);
                }}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700"
                data-ocid="sort_filter.clear_button"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm"
              data-ocid="sort_filter.close_button"
            >
              Apply Filters
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ─────────────── QUICK VIEW MODAL ───────────────
function QuickViewModal({
  variant,
  onClose,
  memberLabel,
}: {
  variant: OutfitVariant | null;
  onClose: () => void;
  memberLabel?: string;
}) {
  const isOpen = variant !== null;
  const { addCombo, isInWishlist } = useWishlistContext();
  const qvComboName = variant ? `${variant.color} ${variant.fullName}` : "";
  const qvSaved = variant ? isInWishlist(qvComboName) : false;

  const handleQvWishlist = () => {
    if (!variant || qvSaved) return;
    addCombo({
      name: qvComboName,
      occasion: "Twinning",
      items: [
        {
          id: `qv_${variant.variantIndex}_${Date.now()}`,
          memberLabel: memberLabel || "Member",
          garment: variant.garment,
          color: variant.color,
          size: "",
          styleName: variant.styleName,
          fullName: variant.fullName,
          lowestPrice: variant.lowestPrice,
          cheapestPlatform: variant.cheapestPlatform,
          imageUrl: variant.productImage,
          platforms: variant.platforms.map((p) => ({
            id: p.id,
            label: p.label,
            price: p.price,
            buyUrl: p.buyUrl,
          })),
        },
      ],
    });
    toast.success("Added to Wishlist! ❤️");
  };
  const colorHex = variant
    ? (COLOR_HEX[variant.color] ?? "#cccccc")
    : "#cccccc";
  const isMulti = variant?.color === "Multi";
  const [imgError, setImgError] = useState(false);

  // Use shared product image (same across all platforms — "same product" concept)
  const imgUrl = variant ? variant.productImage : "";
  const fallbackEmoji = variant ? getGarmentEmoji(variant.garment) : "👕";
  const fallbackBg = isMulti
    ? "linear-gradient(135deg,#FF6B6B,#FFD700,#4169E1)"
    : colorHex;

  const cheapestPlatformObj = variant
    ? variant.platforms.find((p) => p.id === variant.cheapestPlatform)
    : null;

  // Platform rows in canonical order
  const comparisonRows = variant
    ? (PLATFORMS.map((p) =>
        variant.platforms.find((sp) => sp.id === p.id),
      ).filter(Boolean) as OutfitVariant["platforms"])
    : [];
  const lowestPrice = variant
    ? Math.min(...comparisonRows.map((r) => r.price))
    : 0;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="max-w-sm w-full p-0 overflow-hidden rounded-2xl"
        data-ocid="quick_view.modal"
      >
        <DialogTitle className="sr-only">
          {variant?.fullName ?? "Quick View"}
        </DialogTitle>

        {variant && (
          <>
            {/* Product image */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "4/5",
                borderBottom: `4px solid ${isMulti ? "#FFD700" : colorHex}`,
              }}
            >
              {!imgError ? (
                <img
                  key={variant.variantIndex}
                  src={imgUrl}
                  alt={variant.fullName}
                  className="w-full h-full object-cover object-top"
                  onError={() => setImgError(true)}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-7xl"
                  style={{ background: fallbackBg }}
                >
                  {fallbackEmoji}
                </div>
              )}

              {/* Bottom gradient */}
              <div
                className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
                }}
              />

              {/* Badges on image */}
              <div className="absolute top-3 right-3 z-10">
                {variant.variantIndex % 4 === 0 && (
                  <span
                    className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full shadow"
                    style={{
                      background: "var(--color-pink)",
                      color: "var(--color-black)",
                    }}
                  >
                    <Sparkles className="w-3 h-3" /> Recommended for You
                  </span>
                )}
              </div>
              {/* Badges on image */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
                <span className="bg-white/90 text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full shadow">
                  {variant.styleName}
                </span>
                <span
                  className="w-5 h-5 rounded-full border-2 border-white shadow"
                  style={{
                    background: isMulti
                      ? "linear-gradient(135deg,#FF6B6B,#FFD700,#4169E1)"
                      : colorHex,
                  }}
                  title={variant.color}
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Name & price */}
              <div>
                <h3 className="text-base font-extrabold text-black leading-snug">
                  {variant.fullName}
                </h3>
                <p className="text-2xl font-extrabold text-black mt-1">
                  ₹{variant.lowestPrice.toLocaleString("en-IN")}
                  <span className="text-xs font-normal text-gray-500 ml-2">
                    lowest price
                  </span>
                </p>
              </div>

              {/* Platform price list */}
              <div className="space-y-1.5">
                {comparisonRows.map((row) => (
                  <div
                    key={row.id}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                      row.price === lowestPrice
                        ? "bg-pink-50 border border-[#F9A8C9]"
                        : "bg-gray-50 border border-gray-100"
                    }`}
                    data-ocid="quick_view.price_row"
                  >
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: row.bg, color: row.color }}
                    >
                      {row.label}
                    </span>
                    <span
                      className={`font-extrabold text-sm flex-1 ${
                        row.price === lowestPrice ? "text-black" : "text-black"
                      }`}
                    >
                      ₹{row.price.toLocaleString("en-IN")}
                      {row.price === lowestPrice && (
                        <span
                          className="ml-1 text-[10px] rounded px-1"
                          style={{
                            background: "var(--color-pink)",
                            color: "var(--color-black)",
                          }}
                        >
                          BEST
                        </span>
                      )}
                    </span>
                    <a
                      href={row.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-foreground text-[11px] font-bold flex items-center gap-0.5 flex-shrink-0"
                      data-ocid="quick_view.buy_link"
                    >
                      Buy <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                ))}
              </div>

              {/* Wishlist button */}
              <button
                type="button"
                onClick={handleQvWishlist}
                disabled={qvSaved}
                className={`flex items-center justify-center gap-2 w-full border font-semibold py-2.5 rounded-xl transition-colors text-sm ${
                  qvSaved
                    ? "border-red-300 text-red-500 bg-red-50 cursor-default"
                    : "border-gray-300 text-gray-700 hover:border-red-400 hover:text-red-500"
                }`}
                data-ocid="quick_view.wishlist_button"
              >
                <Heart className={`w-4 h-4 ${qvSaved ? "fill-red-500" : ""}`} />
                {qvSaved ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>

              {/* Buy Now CTA */}
              {cheapestPlatformObj && (
                <a
                  href={cheapestPlatformObj.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#111111] hover:bg-[#333333] text-white font-bold py-3 rounded-xl transition-colors text-sm"
                  data-ocid="quick_view.buy_now_button"
                >
                  Buy Now on {cheapestPlatformObj.label}
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─────────────── OUTFIT VARIANT CARD ───────────────
function OutfitVariantCard({
  variant,
  isSelected,
  onSelect,
  onQuickView,
}: {
  variant: OutfitVariant;
  isSelected: boolean;
  onSelect: () => void;
  onQuickView?: () => void;
}) {
  const colorHex = COLOR_HEX[variant.color] ?? "#cccccc";
  const isMulti = variant.color === "Multi";
  const cheapPlat = variant.platforms.find(
    (p) => p.id === variant.cheapestPlatform,
  );
  const [imgError, setImgError] = useState(false);

  // Use shared product image (same across all platforms)
  const imgUrl = variant.productImage;

  const fallbackEmoji = getGarmentEmoji(variant.garment);
  const fallbackBg = isMulti
    ? "linear-gradient(135deg,#FF6B6B,#FFD700,#4169E1)"
    : colorHex;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-xl overflow-hidden border-2 transition-all flex flex-col text-left flex-shrink-0 ${
        isSelected
          ? "border-pink-400 shadow-lg shadow-pink-200 ring-2 ring-pink-300"
          : "border-gray-200 hover:border-[#F9A8C9] hover:shadow-md"
      }`}
      style={{ width: 160 }}
      data-ocid="outfit_variant.card"
    >
      {/* Product image area */}
      <div
        className="relative w-full overflow-hidden flex-shrink-0"
        style={{
          aspectRatio: "4/5",
          borderBottom: `4px solid ${isMulti ? "#FFD700" : colorHex}`,
        }}
      >
        {!imgError ? (
          <img
            src={imgUrl}
            alt={variant.fullName}
            className="w-full h-full object-cover object-top"
            onError={() => setImgError(true)}
            loading="lazy"
            decoding="async"
          />
        ) : (
          /* Fallback: color bg + clothing emoji */
          <div
            className="w-full h-full flex items-center justify-center text-5xl"
            style={{ background: fallbackBg }}
          >
            {fallbackEmoji}
          </div>
        )}

        {/* Bottom gradient overlay for badge readability */}
        <div
          className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
          }}
        />

        {/* Platform badge — top left (always visible); shifts down when SELECTED */}
        {!isSelected && cheapPlat && (
          <span
            className={`absolute top-2 left-2 z-10 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md text-white ${
              cheapPlat.id === "amazon"
                ? "bg-white0"
                : cheapPlat.id === "myntra"
                  ? "bg-pink-500"
                  : cheapPlat.id === "flipkart"
                    ? "bg-primary"
                    : cheapPlat.id === "ajio"
                      ? "bg-red-600"
                      : "bg-[#111111]"
            }`}
          >
            {cheapPlat.id.charAt(0).toUpperCase() + cheapPlat.id.slice(1)}
          </span>
        )}

        {/* SELECTED badge — top left */}
        {isSelected && (
          <span className="absolute top-2 left-2 bg-pink-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md z-10">
            SELECTED
          </span>
        )}

        {/* Style name badge — top right (shifted down when zoom button present) */}
        <span className="absolute top-2 right-2 bg-white/90 text-gray-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow z-10 max-w-[80px] truncate">
          {variant.styleName}
        </span>

        {/* Zoom / Quick View button */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            className="absolute bottom-2 right-2 z-20 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-pink-50 transition-colors"
            aria-label="Quick view"
            data-ocid="outfit_variant.open_modal_button"
          >
            <ZoomIn className="w-3.5 h-3.5 text-foreground" />
          </button>
        )}
      </div>

      {/* Card body */}
      <div className="p-3 flex flex-col gap-1.5 flex-1 bg-white">
        {/* AI Recommendation badge */}
        {variant.variantIndex % 4 === 0 && (
          <span className="inline-flex items-center gap-1 bg-[#F9A8C9] text-black text-[9px] font-bold px-2 py-0.5 rounded-full">
            <Sparkles className="w-2.5 h-2.5" /> Recommended for You
          </span>
        )}
        <p className="text-[10px] font-bold text-foreground leading-tight truncate">
          {variant.brand}
        </p>
        <p className="text-[11px] font-semibold text-gray-800 leading-tight line-clamp-2">
          {variant.fullName}
        </p>
        {/* Best Deal section */}
        <div>
          <p className="text-base font-extrabold text-black">
            ₹{variant.lowestPrice.toLocaleString("en-IN")}
          </p>
          {variant.platforms.length > 1 &&
            (() => {
              const prices = variant.platforms.map((p) => p.price);
              const maxP = Math.max(...prices);
              const savings = maxP - variant.lowestPrice;
              return savings > 0 ? (
                <div className="flex items-center gap-1 mt-0.5">
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: "var(--color-pink)",
                      color: "var(--color-black)",
                    }}
                  >
                    Lowest Price 🔥
                  </span>
                  <span className="text-[9px] font-bold text-black">
                    Save ₹{savings.toLocaleString("en-IN")}
                  </span>
                </div>
              ) : null;
            })()}
        </div>
        <p className="text-[10px] text-gray-500">
          Best on{" "}
          <span className="font-bold" style={{ color: cheapPlat?.color }}>
            {variant.cheapestPlatform}
          </span>
        </p>
        {/* Platform availability badges */}
        <div className="flex flex-wrap gap-1 mt-auto">
          {variant.platforms.map((p) => (
            <span
              key={p.id}
              className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: p.bg, color: p.color }}
            >
              {p.id}
            </span>
          ))}
        </div>
        {cheapPlat && (
          <a
            href={cheapPlat.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-1 flex items-center justify-center gap-1 text-white text-[10px] font-bold px-2 py-1.5 rounded-lg transition-opacity hover:opacity-90"
            style={{
              background: "var(--color-pink)",
              color: "var(--color-black)",
            }}
            data-ocid="outfit_variant.buy_button"
          >
            Buy Now <ExternalLink className="w-2.5 h-2.5" />
          </a>
        )}
      </div>
    </button>
  );
}

// ─────────────── MEMBER RESULT SECTION ───────────────
function MemberSection({ member }: { member: MemberConfig }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const allVariants = generateOutfitVariants(member);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER);
  const [quickViewVariant, setQuickViewVariant] =
    useState<OutfitVariant | null>(null);
  const [visibleCount, setVisibleCount] = useState(20);
  const emoji = MEMBER_EMOJIS[member.id] ?? "🧑";

  const filteredVariants = applyFiltersAndSort(allVariants, filters);
  const visibleVariants = filteredVariants.slice(0, visibleCount);

  // Clamp selected index when filters change
  const clampedSelectedIdx =
    selectedVariantIdx < filteredVariants.length ? selectedVariantIdx : 0;
  const selectedVariant =
    filteredVariants[clampedSelectedIdx] ?? allVariants[0];

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  // Price comparison rows for selected variant, in platform order
  const comparisonRows = PLATFORMS.map((p) => {
    const found = selectedVariant.platforms.find((sp) => sp.id === p.id);
    return found ? { ...found } : null;
  }).filter(Boolean) as OutfitVariant["platforms"];

  const lowestCompPrice = Math.min(...comparisonRows.map((r) => r.price));

  const _hasActiveFilters =
    filters.selectedCategories.size > 0 ||
    filters.selectedPlatforms.size > 0 ||
    filters.maxPrice < 5000;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
      data-ocid="member_result.section"
    >
      {/* Section header */}
      <div className="px-5 py-4 bg-gradient-to-r from-gray-900 to-gray-700">
        <h2 className="text-lg font-extrabold text-white">
          {emoji} For {member.label} — {member.garment} ({member.size})
        </h2>
        <p className="text-pink-100 text-sm">
          {allVariants.length} outfit styles in {member.color} — Compare prices
          across platforms
        </p>
      </div>

      {/* Sort & Filter Bar */}
      <SortFilterBar
        filters={filters}
        onChange={(f) => {
          setFilters(f);
          setSelectedVariantIdx(0);
          setVisibleCount(20);
        }}
        totalCount={allVariants.length}
        filteredCount={filteredVariants.length}
      />

      {/* Outfit scroll or empty state */}
      {filteredVariants.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 my-6 flex flex-col items-center justify-center py-10 bg-pink-50 rounded-2xl border border-dashed border-pink-200"
          data-ocid="outfit_scroll.empty_state"
        >
          <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
            <SearchX className="w-7 h-7 text-pink-400" />
          </div>
          <p className="text-base font-bold text-black mb-1 text-center px-4">
            No outfits found. Try different filters
          </p>
          <p className="text-sm text-gray-500 mb-4 text-center px-6">
            Adjust your color, size, or occasion filters to see more results
          </p>
          <button
            type="button"
            onClick={() => setFilters(DEFAULT_FILTER)}
            className="flex items-center gap-2 text-sm font-bold text-white bg-pink-500 hover:bg-pink-600 active:bg-pink-700 px-5 py-2.5 rounded-full shadow-md transition-colors"
            data-ocid="outfit_scroll.reset_filters_button"
          >
            <RotateCcw className="w-4 h-4" /> Reset Filters
          </button>
        </motion.div>
      ) : (
        <div className="relative px-2 pt-3 pb-2">
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            data-ocid="outfit_scroll.pagination_prev"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Scrollable outfit row */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto px-8 py-2"
            style={{ scrollbarWidth: "none" }}
          >
            {visibleVariants.map((variant, idx) => (
              <OutfitVariantCard
                key={variant.variantIndex}
                variant={variant}
                isSelected={clampedSelectedIdx === idx}
                onSelect={() => setSelectedVariantIdx(idx)}
                onQuickView={() => setQuickViewVariant(variant)}
              />
            ))}
            {visibleCount < filteredVariants.length && (
              <div className="flex-shrink-0 flex items-center px-4">
                <button
                  type="button"
                  onClick={() => setVisibleCount((v) => v + 20)}
                  className="bg-primary text-primary-foreground text-xs font-bold px-4 py-3 rounded-full whitespace-nowrap hover:bg-gray-800 transition-colors"
                  data-ocid="outfit_scroll.load_more_button"
                >
                  Load 20 More
                  <br />
                  <span className="font-normal opacity-75">
                    ({filteredVariants.length - visibleCount} left)
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            data-ocid="outfit_scroll.pagination_next"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      )}

      {/* Selected variant label */}
      {filteredVariants.length > 0 && (
        <div className="px-5 pb-1">
          <p className="text-xs text-gray-500">
            Showing prices for:{" "}
            <span className="font-bold text-foreground">
              {selectedVariant.fullName}
            </span>
          </p>
        </div>
      )}

      {/* Price comparison table */}
      {filteredVariants.length > 0 && (
        <div className="px-4 pb-5 pt-2" data-ocid="price_comparison.table">
          {/* Same product badge */}
          <div className="flex items-center gap-3 mb-3 bg-pink-50 border border-pink-200 rounded-xl p-3">
            <img
              src={selectedVariant.productImage}
              alt={selectedVariant.fullName}
              className="w-14 h-14 rounded-lg object-cover border-2 border-pink-200 flex-shrink-0"
              loading="lazy"
              decoding="async"
            />
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                ✅ Same Product
              </span>
              <p className="text-xs font-bold text-foreground leading-tight truncate">
                {selectedVariant.brand}
              </p>
              <p className="text-[11px] text-foreground leading-tight truncate">
                {selectedVariant.color} · {selectedVariant.styleName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-[#111111]" />
            <span className="font-bold text-sm text-black">
              Price Comparison Across Platforms
            </span>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Platform</TableHead>
                  <TableHead>Outfit</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonRows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={
                      row.price === lowestCompPrice ? "bg-pink-50" : ""
                    }
                    data-ocid="price_comparison.row"
                  >
                    <TableCell>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: row.bg, color: row.color }}
                      >
                        {row.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs max-w-[160px] truncate">
                      {selectedVariant.fullName}
                    </TableCell>
                    <TableCell
                      className={`font-extrabold ${
                        row.price === lowestCompPrice
                          ? "text-[#111111]"
                          : "text-black"
                      }`}
                    >
                      ₹{row.price.toLocaleString("en-IN")}
                      {row.price === lowestCompPrice && (
                        <span
                          className="ml-1 text-[10px] rounded px-1"
                          style={{
                            background: "var(--color-pink)",
                            color: "var(--color-black)",
                          }}
                        >
                          LOWEST
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-yellow-600 font-semibold">
                      ★ {row.rating}
                    </TableCell>
                    <TableCell>
                      <a
                        href={row.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-lg text-white transition-colors"
                        style={{ backgroundColor: row.color }}
                        data-ocid="price_table.buy_button"
                      >
                        Buy Now <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        variant={quickViewVariant}
        onClose={() => setQuickViewVariant(null)}
        memberLabel={member.label}
      />
    </motion.section>
  );
}

// ─────────────── RESULTS PAGE ───────────────
export default function ResultsPage({
  navigate,
  finderState,
}: ResultsPageProps) {
  const { addCombo, isInWishlist } = useWishlistContext();
  const { members } = finderState;
  const color = members[0]?.color ?? "";
  const comboName = `${color} Twinning Combo – ${members.map((m) => m.label).join(", ")}`;
  const wishlistSaved = isInWishlist(comboName);

  const handleWishlist = () => {
    if (wishlistSaved) return;
    addCombo({
      name: comboName,
      occasion: finderState.occasion || "Twinning",
      items: members.map((m) => ({
        id: `${m.id}_${Date.now()}`,
        memberLabel: m.label,
        garment: m.garment,
        color: m.color,
        size: m.size,
        styleName: m.garment,
        fullName: `${m.color} ${m.garment}`,
        lowestPrice: 0,
        cheapestPlatform: "",
        imageUrl: `https://picsum.photos/seed/outfit-0-${m.garment.toLowerCase().replace(/\s+/g, "-")}/160/200`,
        platforms: [],
      })),
    });
    toast.success("Saved to wishlist! ❤️");
  };

  const handleShare = async () => {
    const text = `Check out my Shireka Fashion twinning combo! Color: ${color} — ${members
      .map((m) => `${m.label}: ${m.garment} (${m.size})`)
      .join(", ")}`;
    if (navigator.share) {
      await navigator.share({ title: "Shireka Fashion Twinning Outfit", text });
    } else {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    }
  };

  if (members.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center py-16 px-4"
        style={{ background: "#1a56db" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-sm w-full"
          data-ocid="results.empty_state"
        >
          <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-8 h-8 text-pink-400" />
          </div>
          <h2 className="text-xl font-bold text-black mb-2">
            No outfits found. Try different filters
          </h2>
          <p className="text-gray-500 mb-5 text-sm">
            Adjust your color, size, or occasion filters to see more results
          </p>
          <Button
            onClick={() => navigate("find")}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-md border-0 py-5"
            data-ocid="results.modify_search_button"
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Modify Search
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "#1a56db" }}>
      <div className="max-w-3xl mx-auto">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-black">
            ✨ Twinning Outfit Results
            {color && <span className="ml-2">— {color}</span>}
          </h1>
          <p className="text-black/80 mt-1">
            {members.length} member{members.length > 1 ? "s" : ""} &bull; Scroll
            left &amp; right to explore 500 outfit styles
          </p>
          <p className="text-white/90 text-sm mt-2 font-semibold bg-white/20 inline-block px-4 py-1.5 rounded-full">
            🛒 Compare prices for the same outfit across 5 platforms
          </p>
        </motion.div>

        {/* Summary + Action bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-5 shadow-xl mb-8"
          data-ocid="results.summary.card"
        >
          <h3 className="font-bold text-black mb-3">
            📋 Your Twinning Combination
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {color && (
              <Badge
                className="text-white text-sm"
                style={{ background: COLOR_HEX[color] ?? "#4169E1" }}
              >
                🎨 {color}
              </Badge>
            )}
            {members.map((m) => (
              <Badge key={m.id} variant="outline" className="text-black">
                {MEMBER_EMOJIS[m.id] ?? "🧑"} {m.label}: {m.garment} ({m.size})
              </Badge>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("find")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-black border-gray-300 py-5 text-base"
              data-ocid="results.modify_button"
            >
              <ArrowLeft className="w-4 h-4" /> Modify Search
            </Button>
            <Button
              variant="outline"
              onClick={handleWishlist}
              disabled={wishlistSaved}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-black border-gray-300 py-5 text-base"
              data-ocid="results.wishlist_button"
            >
              <Heart
                className={`w-4 h-4 ${
                  wishlistSaved ? "fill-red-500 text-red-500" : ""
                }`}
              />
              {wishlistSaved ? "Saved!" : "Save to Wishlist"}
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-black border-gray-300 py-5 text-base"
              data-ocid="results.share_button"
            >
              <Share2 className="w-4 h-4" /> Share Results
            </Button>
          </div>
        </motion.div>

        {/* AI Twinning Suggestions */}
        <TwinningLooksSuggestions
          members={members.map((m) => m.label as MemberType)}
        />

        {/* Per-member results */}
        {members.map((member) => (
          <MemberSection key={member.id} member={member} />
        ))}

        {/* Back to find button */}
        <div className="text-center mt-4 pb-8">
          <Button
            onClick={() => navigate("find")}
            className="bg-yellow-400 text-black font-bold hover:bg-yellow-300 border-0 px-8"
            data-ocid="results.new_search_button"
          >
            🔄 Start New Search
          </Button>
        </div>
      </div>
    </div>
  );
}
