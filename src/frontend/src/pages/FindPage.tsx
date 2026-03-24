import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import {
  ChevronLeft,
  Heart,
  Plus,
  SlidersHorizontal,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { FindMode, MemberConfig, OutfitFinderState, Page } from "../App";

interface FindPageProps {
  navigate: (p: Page) => void;
  onSearch: (state: OutfitFinderState) => void;
  initialMode?: FindMode | null;
}

// ─────────────────── MEMBER TYPE DEFINITIONS ───────────────────
const MEMBER_TYPES = [
  { id: "man", label: "Men", emoji: "👨", gender: "male", group: "adult" },
  {
    id: "woman",
    label: "Women",
    emoji: "👩",
    gender: "female",
    group: "adult",
  },
  { id: "boy", label: "Boys", emoji: "👦", gender: "boy", group: "kids" },
  { id: "girl", label: "Girls", emoji: "👧", gender: "girl", group: "kids" },
  {
    id: "infant_boy",
    label: "Baby Boy",
    emoji: "👶",
    gender: "infant_boy",
    group: "baby",
  },
  {
    id: "infant_girl",
    label: "Baby Girl",
    emoji: "👶",
    gender: "infant_girl",
    group: "baby",
  },
];

const COUPLE_TYPES = MEMBER_TYPES.filter((m) => m.group === "adult");
const FAMILY_TYPES = MEMBER_TYPES;

// ─────────────────── OUTFITS BY GENDER + STYLE ───────────────────
type GenderKey = "male" | "female" | "kids";
type StyleKey = "indian" | "western" | "fusion";
type KidsTypeKey = "boy" | "girl" | "infant_boy" | "infant_girl";

const OUTFITS_BY_GENDER_STYLE: Record<GenderKey, Record<StyleKey, string[]>> = {
  male: {
    indian: [
      "Kurtas",
      "Kurta Sets",
      "Sherwanis",
      "Nehru Jackets",
      "Dhotis",
      "Ethnic Pyjamas",
      "Ethnic Sets",
    ],
    western: [
      "T-Shirts",
      "Casual Shirts",
      "Formal Shirts",
      "Sweatshirts",
      "Blazers",
      "Suits",
      "Jeans",
    ],
    fusion: [
      "Kurta over Jeans",
      "Indo-Western Suits",
      "Fusion Jackets",
      "Printed Kurtas",
      "Bandhgala Blazers",
    ],
  },
  female: {
    indian: [
      "Sarees",
      "Salwar Kameez",
      "Churidars",
      "Kurtis",
      "Lehengas",
      "Anarkalis",
      "Palazzo Sets",
    ],
    western: [
      "Dresses",
      "Tops",
      "Jeans",
      "Trousers",
      "Co-ords",
      "Jumpsuits",
      "Shorts & Skirts",
    ],
    fusion: [
      "Indo-Western Dresses",
      "Fusion Kurtis",
      "Cape Gowns",
      "Dhoti Pants Sets",
      "Jacket Lehengas",
    ],
  },
  kids: {
    indian: [
      "Ethnic Sets",
      "Kurta Pyjama",
      "Lehenga Choli",
      "Sherwanis (Boys)",
      "Salwar Suits",
    ],
    western: [
      "T-Shirts",
      "Jeans",
      "Dresses",
      "Shorts",
      "Casual Sets",
      "Sweatshirts",
    ],
    fusion: [
      "Fusion Ethnic Sets",
      "Kurta Jeans Combo",
      "Indo-Western Frocks",
      "Printed Ethnic Tees",
    ],
  },
};

// For sizes, map gender+kidsType to member type id
const SIZES_BY_MEMBER: Record<string, string[]> = {
  man: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
  woman: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
  boy: [
    "2Y",
    "3Y",
    "4Y",
    "5Y",
    "6Y",
    "7Y",
    "8Y",
    "9Y",
    "10Y",
    "11Y",
    "12Y",
    "13Y",
    "14Y",
  ],
  girl: [
    "2Y",
    "3Y",
    "4Y",
    "5Y",
    "6Y",
    "7Y",
    "8Y",
    "9Y",
    "10Y",
    "11Y",
    "12Y",
    "13Y",
    "14Y",
  ],
  infant_boy: ["0-3M", "3-6M", "6-9M", "9-12M", "12-18M", "18-24M"],
  infant_girl: ["0-3M", "3-6M", "6-9M", "9-12M", "12-18M", "18-24M"],
};

// ─────────────────── COLORS ───────────────────
const COLORS = [
  { name: "Black", hex: "#111111" },
  { name: "White", hex: "#F5F5F5" },
  { name: "Blue", hex: "#4169E1" },
  { name: "Pink", hex: "#FF69B4" },
  { name: "Green", hex: "#228B22" },
  { name: "Red", hex: "#DC143C" },
  { name: "Multi", hex: "linear-gradient(135deg,#FF6B6B,#FFD700,#4169E1)" },
  { name: "Navy Blue", hex: "#001F5B" },
  { name: "Grey", hex: "#808080" },
  { name: "Maroon", hex: "#800000" },
  { name: "Brown", hex: "#8B4513" },
  { name: "Yellow", hex: "#FFD700" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Purple", hex: "#800080" },
  { name: "Off White", hex: "#FAF9F6" },
  { name: "Peach", hex: "#FFCBA4" },
  { name: "Orange", hex: "#FF8C00" },
  { name: "Olive", hex: "#808000" },
  { name: "Mustard", hex: "#FFDB58" },
  { name: "Lavender", hex: "#E6E6FA" },
  { name: "Cream", hex: "#FFFDD0" },
  { name: "Turquoise Blue", hex: "#40E0D0" },
  { name: "Teal", hex: "#008080" },
  { name: "Rust", hex: "#B7410E" },
  { name: "Coral", hex: "#FF6B6B" },
  { name: "Tan", hex: "#D2B48C" },
  { name: "Violet", hex: "#EE82EE" },
  { name: "Rose Gold", hex: "#B76E79" },
];

// ─────────────────── MEMBER CARD STATE ───────────────────
interface MemberCard {
  uid: string;
  typeId: string;
  gender: GenderKey | "";
  kidsType: KidsTypeKey | "";
  style: StyleKey | "";
  outfit: string;
  color: string;
  size: string;
}

function createMember(typeId: string, index: number): MemberCard {
  let gender: GenderKey | "" = "";

  let kidsType: KidsTypeKey | "" = "";
  if (typeId === "boy") kidsType = "boy";
  else if (typeId === "girl") kidsType = "girl";
  else if (typeId === "infant_boy") kidsType = "infant_boy";
  else if (typeId === "infant_girl") kidsType = "infant_girl";

  return {
    uid: `${typeId}_${index}_${Date.now()}`,
    typeId,
    gender,
    kidsType,
    style: "",
    outfit: "",
    color: "",
    size: "",
  };
}

function getMemberType(typeId: string) {
  return MEMBER_TYPES.find((m) => m.id === typeId) ?? MEMBER_TYPES[0];
}

function getEffectiveTypeId(
  gender: GenderKey | "",
  kidsType: KidsTypeKey | "",
): string {
  if (gender === "male") return "man";
  if (gender === "female") return "woman";
  if (gender === "kids") {
    if (kidsType === "boy") return "boy";
    if (kidsType === "girl") return "girl";
    if (kidsType === "infant_boy") return "infant_boy";
    if (kidsType === "infant_girl") return "infant_girl";
    return "boy";
  }
  return "man";
}

// ─────────────────── PILL BUTTON COMPONENT ───────────────────
function PillButton({
  label,
  selected,
  onClick,
  dataOcid,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  dataOcid?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={dataOcid}
      className={`px-4 py-2 rounded-full border-2 text-sm font-bold transition-all ${
        selected
          ? "border-pink-500 bg-pink-500 text-white shadow-md scale-105"
          : "border-gray-300 bg-white text-gray-700 hover:border-pink-300 hover:text-pink-600"
      }`}
    >
      {label}
    </button>
  );
}

// ─────────────────── COLOR PICKER COMPONENT ───────────────────
function ColorPicker({
  value,
  onChange,
}: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-600 mb-1">Color</p>
      <div className="flex flex-wrap gap-1.5">
        {COLORS.map((c) => {
          const selected = value === c.name;
          return (
            <button
              key={c.name}
              type="button"
              title={c.name}
              onClick={() => onChange(c.name)}
              className={`w-7 h-7 rounded-full border-2 transition-all ${
                selected
                  ? "border-blue-600 scale-125 shadow-md"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              style={{
                background:
                  c.name === "Multi"
                    ? "linear-gradient(135deg,#FF6B6B,#FFD700,#4169E1)"
                    : c.hex,
              }}
            />
          );
        })}
      </div>
      {value && (
        <p className="text-sm text-blue-600 font-medium mt-1">
          Selected: {value}
        </p>
      )}
    </div>
  );
}

// ─────────────────── MEMBER CARD COMPONENT ───────────────────
function MemberCardUI({
  card,
  index,
  canRemove,
  onRemove,
  onChange,
}: {
  card: MemberCard;
  index: number;
  canRemove: boolean;
  onRemove: () => void;
  onChange: (updates: Partial<MemberCard>) => void;
}) {
  const effectiveTypeId = getEffectiveTypeId(card.gender, card.kidsType);
  const sizes = SIZES_BY_MEMBER[effectiveTypeId] ?? [];

  const outfits =
    card.gender && card.style
      ? (OUTFITS_BY_GENDER_STYLE[card.gender as GenderKey]?.[
          card.style as StyleKey
        ] ?? [])
      : [];

  const handleGenderChange = (g: GenderKey) => {
    onChange({
      gender: g,
      kidsType: g === "kids" ? "boy" : "",
      outfit: "",
      size: "",
      typeId: g === "male" ? "man" : g === "female" ? "woman" : "boy",
    });
  };

  const handleKidsTypeChange = (kt: KidsTypeKey) => {
    onChange({
      kidsType: kt,
      typeId: kt,
      outfit: "",
      size: "",
    });
  };

  const handleStyleChange = (s: StyleKey) => {
    onChange({ style: s, outfit: "" });
  };

  const emoji =
    card.gender === "male"
      ? "👨"
      : card.gender === "female"
        ? "👩"
        : card.gender === "kids"
          ? card.kidsType === "girl" || card.kidsType === "infant_girl"
            ? "👧"
            : "👦"
          : "👤";

  const memberLabel =
    card.gender === "male"
      ? "Men"
      : card.gender === "female"
        ? "Women"
        : card.gender === "kids"
          ? card.kidsType === "boy"
            ? "Boys"
            : card.kidsType === "girl"
              ? "Girls"
              : card.kidsType === "infant_boy"
                ? "Baby Boy"
                : card.kidsType === "infant_girl"
                  ? "Baby Girl"
                  : "Kids"
          : `Member ${index + 1}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 relative"
      data-ocid={`member.item.${index + 1}`}
    >
      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          data-ocid={`member.delete_button.${index + 1}`}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Member Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl">{emoji}</span>
        <div>
          <p className="font-bold text-black text-lg">{memberLabel}</p>
          <p className="text-sm text-gray-400">Member {index + 1}</p>
        </div>
        {card.outfit && (
          <Badge variant="secondary" className="ml-auto text-sm">
            {card.outfit}
          </Badge>
        )}
      </div>

      {/* ── GENDER SECTION ── */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Gender
          </p>
          {!card.gender && (
            <span className="text-xs text-red-400 font-medium">* Required</span>
          )}
        </div>
        <div
          className="flex flex-wrap gap-2"
          data-ocid={`member.gender.toggle.${index + 1}`}
        >
          <PillButton
            label="Men"
            selected={card.gender === "male"}
            onClick={() => handleGenderChange("male")}
            dataOcid={`member.gender_male.toggle.${index + 1}`}
          />
          <PillButton
            label="Women"
            selected={card.gender === "female"}
            onClick={() => handleGenderChange("female")}
            dataOcid={`member.gender_female.toggle.${index + 1}`}
          />
          <PillButton
            label="Kids"
            selected={card.gender === "kids"}
            onClick={() => handleGenderChange("kids")}
            dataOcid={`member.gender_kids.toggle.${index + 1}`}
          />
        </div>

        {/* Kids Sub-row */}
        <AnimatePresence>
          {card.gender === "kids" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mt-2 pl-1">
                {(
                  [
                    { key: "boy", label: "Boys", emoji: "👦" },
                    { key: "girl", label: "Girls", emoji: "👧" },
                    { key: "infant_boy", label: "Baby Boy", emoji: "👶" },
                    { key: "infant_girl", label: "Baby Girl", emoji: "👶" },
                  ] as const
                ).map((kt) => (
                  <button
                    key={kt.key}
                    type="button"
                    onClick={() => handleKidsTypeChange(kt.key)}
                    data-ocid={`member.kids_type.toggle.${index + 1}`}
                    className={`px-3 py-1.5 rounded-full border-2 text-xs font-semibold transition-all flex items-center gap-1 ${
                      card.kidsType === kt.key
                        ? "border-pink-400 bg-pink-50 text-pink-700"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-pink-200"
                    }`}
                  >
                    <span>{kt.emoji}</span>
                    {kt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-4" />

      {/* ── STYLE SECTION ── */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Style
          </p>
          {!card.style && (
            <span className="text-xs text-red-400 font-medium">* Required</span>
          )}
        </div>
        <div
          className="flex flex-wrap gap-2"
          data-ocid={`member.style.toggle.${index + 1}`}
        >
          <PillButton
            label="Indian Wear"
            selected={card.style === "indian"}
            onClick={() => handleStyleChange("indian")}
            dataOcid={`member.style_indian.toggle.${index + 1}`}
          />
          <PillButton
            label="Western Wear"
            selected={card.style === "western"}
            onClick={() => handleStyleChange("western")}
            dataOcid={`member.style_western.toggle.${index + 1}`}
          />
          <PillButton
            label="Fusion Wear"
            selected={card.style === "fusion"}
            onClick={() => handleStyleChange("fusion")}
            dataOcid={`member.style_fusion.toggle.${index + 1}`}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-4" />

      {/* ── OUTFIT TYPE ── */}
      <div className="mb-3">
        <p className="text-sm font-semibold text-gray-600 mb-1">Outfit Type</p>
        {!card.gender || !card.style ? (
          <p className="text-xs text-amber-500 font-medium bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            ⬆ Select Gender and Style first
          </p>
        ) : (
          <Select
            value={card.outfit}
            onValueChange={(v) => onChange({ outfit: v })}
          >
            <SelectTrigger
              className="w-full text-black text-base h-11"
              data-ocid={`member.select.${index + 1}`}
            >
              <SelectValue placeholder="Select outfit..." />
            </SelectTrigger>
            <SelectContent>
              {outfits.map((o) => (
                <SelectItem key={o} value={o} className="text-base">
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* ── COLOR ── */}
      <ColorPicker
        value={card.color}
        onChange={(v) => onChange({ color: v })}
      />

      {/* ── SIZE ── */}
      {card.gender && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-600 mb-1">Size</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => onChange({ size: sz })}
                data-ocid={`member.toggle.${index + 1}`}
                className={`px-3 py-1.5 rounded-md border text-sm font-semibold transition-all ${
                  card.size === sz
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-gray-300 text-black hover:border-blue-400"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────── FILTER PANEL CONTENT ───────────────────
const FILTER_BRANDS = [
  "Fabindia",
  "W",
  "Biba",
  "Manyavar",
  "Global Desi",
  "H&M",
  "Zara",
  "AND",
  "Rangmanch",
];

const OCCASIONS = ["Wedding", "Casual", "Party"];

interface FilterPanelProps {
  budget: [number, number];
  setBudget: (v: [number, number]) => void;
  selectedBrands: Set<string>;
  setSelectedBrands: (fn: (prev: Set<string>) => Set<string>) => void;
  selectedOccasions: Set<string>;
  setSelectedOccasions: (fn: (prev: Set<string>) => Set<string>) => void;
  onClearAll?: () => void;
  variant?: "dark" | "light";
}

function FilterPanelContent({
  budget,
  setBudget,
  selectedBrands,
  setSelectedBrands,
  selectedOccasions,
  setSelectedOccasions,
  onClearAll,
  variant = "dark",
}: FilterPanelProps) {
  const isDark = variant === "dark";

  // Colour tokens based on variant
  const labelCls = isDark ? "text-white/90" : "text-gray-800";
  const budgetValueCls = isDark ? "text-yellow-300" : "text-pink-600 font-bold";
  const sliderMinMaxCls = isDark ? "text-white/50" : "text-gray-400";
  const clearAllCls = isDark
    ? "text-yellow-300 hover:text-yellow-100"
    : "text-pink-600 hover:text-pink-800";
  const unselectedBtnCls = isDark
    ? "border-white/30 text-white/80 hover:bg-white/20"
    : "border-gray-300 text-gray-700 hover:bg-gray-100";
  const selectedBtnCls = "bg-yellow-400 text-black border-yellow-400";

  const toggleOccasion = (occ: string) => {
    setSelectedOccasions((prev) => {
      const next = new Set(prev);
      if (next.has(occ)) next.delete(occ);
      else next.add(occ);
      return next;
    });
  };

  return (
    <div className="space-y-5">
      {/* Occasion */}
      <div>
        <p className={`text-base font-semibold mb-2 ${labelCls}`}>Occasion</p>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((occ) => (
            <button
              key={occ}
              type="button"
              onClick={() => toggleOccasion(occ)}
              className={`text-sm font-bold px-4 py-2 rounded-full border transition-colors ${
                selectedOccasions.has(occ) ? selectedBtnCls : unselectedBtnCls
              }`}
              data-ocid="filters.occasion.toggle"
            >
              {occ}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className={`text-base font-semibold ${labelCls}`}>Budget</p>
          <span className={`text-sm font-bold ${budgetValueCls}`}>
            ₹{budget[0].toLocaleString()} – ₹{budget[1].toLocaleString()}
          </span>
        </div>
        <Slider
          min={500}
          max={10000}
          step={100}
          value={budget}
          onValueChange={(v) => setBudget(v as [number, number])}
          className="[&_[role=slider]]:bg-yellow-400 [&_[role=slider]]:border-yellow-500"
          data-ocid="filters.budget.input"
        />
        <div className={`flex justify-between text-xs mt-1 ${sliderMinMaxCls}`}>
          <span>₹500</span>
          <span>₹10,000</span>
        </div>
      </div>

      {/* Brand */}
      <div>
        <p className={`text-base font-semibold mb-2 ${labelCls}`}>Brand</p>
        <div className="flex flex-wrap gap-2">
          {FILTER_BRANDS.map((brand) => {
            const selected = selectedBrands.has(brand);
            return (
              <button
                key={brand}
                type="button"
                onClick={() => {
                  setSelectedBrands((prev) => {
                    const next = new Set(prev);
                    if (next.has(brand)) next.delete(brand);
                    else next.add(brand);
                    return next;
                  });
                }}
                className={`text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  selected ? selectedBtnCls : unselectedBtnCls
                }`}
                data-ocid="filters.brand.toggle"
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear All — bottom of panel for mobile context */}
      {onClearAll && (
        <div className="pt-1">
          <button
            type="button"
            onClick={onClearAll}
            className={`text-xs font-bold underline underline-offset-2 transition-colors ${clearAllCls}`}
            data-ocid="filters.clear_all_button"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────── MAIN FIND PAGE ───────────────────
export default function FindPage({
  navigate,
  onSearch,
  initialMode,
}: FindPageProps) {
  const [mode, setMode] = useState<"couple" | "family" | null>(
    initialMode ?? null,
  );
  const [members, setMembers] = useState<MemberCard[]>([]);
  const [budget, setBudget] = useState<[number, number]>([500, 5000]);
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [selectedOccasions, setSelectedOccasions] = useState<Set<string>>(
    new Set(),
  );
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const clearAllFilters = () => {
    setBudget([500, 5000]);
    setSelectedBrands(() => new Set());
    setSelectedOccasions(() => new Set());
  };

  const switchMode = (m: "couple" | "family") => {
    setMode(m);
    if (m === "couple") {
      setMembers([createMember("man", 0), createMember("woman", 1)]);
    } else {
      setMembers([createMember("man", 0), createMember("woman", 1)]);
    }
  };

  // Initialize mode if provided via prop
  if (mode === null && initialMode) {
    switchMode(initialMode);
  }

  const addMember = (typeId: string) => {
    if (members.length >= 8) return;
    setMembers((prev) => [...prev, createMember(typeId, prev.length)]);
  };

  const removeMember = (uid: string) => {
    setMembers((prev) => prev.filter((m) => m.uid !== uid));
  };

  const updateMember = (uid: string, updates: Partial<MemberCard>) => {
    setMembers((prev) =>
      prev.map((m) => (m.uid === uid ? { ...m, ...updates } : m)),
    );
  };

  const canFind =
    members.length > 0 &&
    members.every((m) => m.gender && m.style && m.outfit && m.color && m.size);

  const handleFindResult = () => {
    const configs: MemberConfig[] = members.map((m) => {
      const effectiveTypeId = getEffectiveTypeId(m.gender, m.kidsType);
      const mt = getMemberType(effectiveTypeId);
      return {
        id: m.uid,
        label: mt.label,
        gender: mt.gender,
        garment: m.outfit,
        color: m.color,
        size: m.size,
      };
    });
    onSearch({ members: configs, occasion: "" });
  };

  const availableTypes = mode === "couple" ? COUPLE_TYPES : FAMILY_TYPES;

  const filterPanelProps: FilterPanelProps = {
    budget,
    setBudget,
    selectedBrands,
    setSelectedBrands,
    selectedOccasions,
    setSelectedOccasions,
    onClearAll: clearAllFilters,
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
            <Sparkles className="inline-block w-7 h-7 mr-2 text-yellow-400" />
            Find Twinning Outfits
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Pick members, select outfits, compare prices across 5 platforms
          </p>
        </motion.div>

        {/* Mode Toggle */}
        <div
          className="flex rounded-2xl overflow-hidden border-2 border-white/20 mb-8 shadow-xl"
          data-ocid="mode.toggle"
        >
          <button
            type="button"
            onClick={() => switchMode("couple")}
            data-ocid="mode.couple.tab"
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-base font-bold transition-all ${
              mode === "couple"
                ? "bg-white text-blue-700 shadow-inner"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Heart className="w-5 h-5" />
            Couple Twinning
          </button>
          <button
            type="button"
            onClick={() => switchMode("family")}
            data-ocid="mode.family.tab"
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-base font-bold transition-all ${
              mode === "family"
                ? "bg-white text-blue-700 shadow-inner"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Users className="w-5 h-5" />
            Family Twinning
          </button>
        </div>

        {/* No Mode Selected Prompt */}
        {!mode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/10 rounded-2xl p-10 text-center text-white"
          >
            <p className="text-xl font-semibold mb-2">
              Choose a twinning mode above
            </p>
            <p className="text-white/70 text-base">
              Start with Couple Twinning or Family Twinning to add members and
              find matching outfits.
            </p>
          </motion.div>
        )}

        {/* Members */}
        {mode && (
          <>
            <AnimatePresence>
              {members.map((card, idx) => (
                <div key={card.uid} className="mb-4">
                  <MemberCardUI
                    card={card}
                    index={idx}
                    canRemove={members.length > 1}
                    onRemove={() => removeMember(card.uid)}
                    onChange={(updates) => updateMember(card.uid, updates)}
                  />
                </div>
              ))}
            </AnimatePresence>

            {/* Add Person */}
            {members.length < 8 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-dashed border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold py-6 text-base"
                      data-ocid="member.open_modal_button"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Person
                      {members.length < 8 && (
                        <span className="ml-2 text-white/60 text-sm">
                          ({8 - members.length} remaining)
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-56">
                    {availableTypes.map((t) => (
                      <DropdownMenuItem
                        key={t.id}
                        onClick={() => addMember(t.id)}
                        className="cursor-pointer text-base py-2"
                        data-ocid={`member.${t.id}.button`}
                      >
                        <span className="mr-2 text-xl">{t.emoji}</span>
                        {t.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            )}

            {/* Filters: Desktop inline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden md:block bg-white/10 rounded-2xl p-5 mb-4 border border-white/20"
              data-ocid="filters.panel"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white text-lg">🎯 Filters</h3>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs font-bold text-yellow-300 hover:text-yellow-100 underline underline-offset-2 transition-colors"
                  data-ocid="filters.clear_all_button"
                >
                  Clear All
                </button>
              </div>
              <FilterPanelContent {...filterPanelProps} variant="dark" />
            </motion.div>

            {/* Summary & Find */}
            {members.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 rounded-2xl p-5 mb-6 border border-white/20"
                data-ocid="summary.card"
              >
                <h3 className="font-bold text-white text-lg mb-3">
                  📋 Your Selection Summary
                </h3>
                <div className="space-y-1.5">
                  {members.map((m, idx) => {
                    const effectiveTypeId = getEffectiveTypeId(
                      m.gender,
                      m.kidsType,
                    );
                    const mt = getMemberType(effectiveTypeId);
                    const styleLabel =
                      m.style === "indian"
                        ? "Indian Wear"
                        : m.style === "western"
                          ? "Western Wear"
                          : m.style === "fusion"
                            ? "Fusion Wear"
                            : null;
                    return (
                      <div
                        key={m.uid}
                        className="flex items-center gap-2 text-base text-white/90 flex-wrap"
                      >
                        <span>{mt.emoji}</span>
                        <span className="font-semibold">
                          {m.gender === "male"
                            ? "Men"
                            : m.gender === "female"
                              ? "Women"
                              : m.gender === "kids"
                                ? "Kids"
                                : `Member ${idx + 1}`}
                        </span>
                        {styleLabel && (
                          <Badge
                            variant="outline"
                            className="text-pink-300 border-pink-400 text-xs py-0"
                          >
                            {styleLabel}
                          </Badge>
                        )}
                        <span>
                          {m.outfit || (
                            <em className="opacity-50">No outfit</em>
                          )}
                        </span>
                        {m.color && (
                          <span className="flex items-center gap-1">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/30 inline-block"
                              style={{
                                background:
                                  m.color === "Multi"
                                    ? "linear-gradient(135deg,#FF6B6B,#FFD700,#4169E1)"
                                    : COLORS.find((c) => c.name === m.color)
                                        ?.hex,
                              }}
                            />
                            {m.color}
                          </span>
                        )}
                        {m.size && (
                          <Badge
                            variant="outline"
                            className="text-white border-white/40 text-sm py-0"
                          >
                            {m.size}
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
                {!canFind && (
                  <p className="text-yellow-300 text-sm mt-3 font-medium">
                    ⚠ Please select Gender, Style, outfit, color, and size for
                    all members.
                  </p>
                )}
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("home")}
                className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white py-5 text-base"
                data-ocid="find.back_button"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button
                onClick={handleFindResult}
                disabled={!canFind}
                className="flex-1 font-extrabold text-xl bg-yellow-400 text-black hover:bg-yellow-300 border-0 shadow-lg rounded-full disabled:opacity-40 disabled:shadow-none py-6 tracking-wider w-full sm:w-auto"
                data-ocid="find.submit_button"
              >
                ✨ FIND RESULT
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Mobile sticky filter button */}
      {mode && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center px-4 md:hidden z-50">
          <button
            type="button"
            onClick={() => setFilterSheetOpen(true)}
            className="flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3.5 rounded-full shadow-2xl text-base border-2 border-blue-200"
            data-ocid="filters.open_modal_button"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters & Budget
            {selectedBrands.size > 0 && (
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                {selectedBrands.size}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Mobile Filters Sheet */}
      <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-3xl max-h-[85vh] flex flex-col bg-background border-border p-0"
          data-ocid="filters.sheet"
        >
          {/* Sheet header — fixed */}
          <SheetHeader className="px-5 pt-5 pb-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-foreground text-xl font-bold text-left">
                🎯 Filters & Budget
              </SheetTitle>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-bold text-pink-600 hover:text-pink-800 underline underline-offset-2 transition-colors"
                data-ocid="filters.clear_all_button"
              >
                Clear All
              </button>
            </div>
          </SheetHeader>

          {/* Scrollable filter content */}
          <div className="flex-1 overflow-y-auto px-5 pb-2">
            <FilterPanelContent {...filterPanelProps} variant="light" />
            <div className="h-4" />
          </div>

          {/* Sticky Apply button pinned at bottom */}
          <div className="sticky bottom-0 bg-background px-5 pt-3 pb-5 flex-shrink-0 border-t border-border">
            <Button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg py-6 rounded-full shadow-lg"
              onClick={() => setFilterSheetOpen(false)}
              data-ocid="filters.close_button"
            >
              Apply Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
