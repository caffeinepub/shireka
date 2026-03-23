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
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, Heart, Plus, Sparkles, Users, X } from "lucide-react";
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
  { id: "man", label: "Male", emoji: "👨", gender: "male", group: "adult" },
  {
    id: "woman",
    label: "Female",
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

// ─────────────────── OUTFITS PER MEMBER ───────────────────
const OUTFITS_BY_MEMBER: Record<string, string[]> = {
  man: [
    "Kurtas & Kurta Sets",
    "Sherwanis",
    "Nehru Jackets",
    "Dhotis",
    "T-Shirts",
    "Casual Shirts",
    "Formal Shirts",
    "Sweatshirts",
    "Sweaters",
    "Blazers & Coats",
    "Suits",
  ],
  woman: [
    "Churidars",
    "Sarees",
    "Kurtis",
    "Dresses",
    "Tops",
    "Jeans",
    "Trousers & Capris",
    "Shorts & Skirts",
    "Co-ords",
    "Jumpsuits",
    "Blazers & Waistcoats",
    "Sweatshirts",
  ],
  boy: [
    "Kurtas & Sets",
    "T-Shirts",
    "Shirts",
    "Jeans & Trousers",
    "Shorts",
    "Ethnic Wear",
    "Party Wear",
    "Onesies & Rompers",
  ],
  girl: [
    "Kurtis & Sets",
    "Frocks & Dresses",
    "Tops & T-shirts",
    "Jeans & Jeggings",
    "Ethnic Wear",
    "Party Wear",
    "Jumpsuits & Dungarees",
  ],
  infant_boy: [
    "Onesies & Rompers",
    "Sets & Suits",
    "Kurta Sets",
    "Tops & Shorts",
  ],
  infant_girl: ["Onesies & Rompers", "Sets & Suits", "Frocks", "Tops & Shorts"],
};

// ─────────────────── SIZES PER MEMBER ───────────────────
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
  outfit: string;
  color: string;
  size: string;
}

function createMember(typeId: string, index: number): MemberCard {
  return {
    uid: `${typeId}_${index}_${Date.now()}`,
    typeId,
    outfit: "",
    color: "",
    size: "",
  };
}

function getMemberType(typeId: string) {
  return MEMBER_TYPES.find((m) => m.id === typeId) ?? MEMBER_TYPES[0];
}

// ─────────────────── COLOR PICKER COMPONENT ───────────────────
function ColorPicker({
  value,
  onChange,
}: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-600 mb-1">Color</p>
      <div className="flex flex-wrap gap-1.5">
        {COLORS.map((c) => {
          const selected = value === c.name;
          return (
            <button
              key={c.name}
              type="button"
              title={c.name}
              onClick={() => onChange(c.name)}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
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
        <p className="text-xs text-blue-600 font-medium mt-1">
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
  const mt = getMemberType(card.typeId);
  const sizes = SIZES_BY_MEMBER[card.typeId] ?? [];
  const outfits = OUTFITS_BY_MEMBER[card.typeId] ?? [];

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
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{mt.emoji}</span>
        <div>
          <p className="font-bold text-black text-base">{mt.label}</p>
          <p className="text-xs text-gray-500 capitalize">{mt.group}</p>
        </div>
        {card.outfit && (
          <Badge variant="secondary" className="ml-auto text-xs">
            {card.outfit}
          </Badge>
        )}
      </div>

      {/* Outfit */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-600 mb-1">Outfit Type</p>
        <Select
          value={card.outfit}
          onValueChange={(v) => onChange({ outfit: v })}
        >
          <SelectTrigger
            className="w-full text-black text-sm"
            data-ocid={`member.select.${index + 1}`}
          >
            <SelectValue placeholder="Select outfit..." />
          </SelectTrigger>
          <SelectContent>
            {outfits.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Size */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-600 mb-1">Size</p>
        <div className="flex flex-wrap gap-1.5">
          {sizes.map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => onChange({ size: sz })}
              data-ocid={`member.toggle.${index + 1}`}
              className={`px-2.5 py-1 rounded-md border text-xs font-semibold transition-all ${
                card.size === sz
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 text-black hover:border-blue-400"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <ColorPicker
        value={card.color}
        onChange={(v) => onChange({ color: v })}
      />
    </motion.div>
  );
}

// ─────────────────── MAIN FIND PAGE ───────────────────
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
    members.length > 0 && members.every((m) => m.outfit && m.color && m.size);

  const handleFindResult = () => {
    const configs: MemberConfig[] = members.map((m) => {
      const mt = getMemberType(m.typeId);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
            <Sparkles className="inline-block w-7 h-7 mr-2 text-yellow-400" />
            Find Twinning Outfits
          </h1>
          <p className="text-white/80 text-base">
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
            <p className="text-lg font-semibold mb-2">
              Choose a twinning mode above
            </p>
            <p className="text-white/70">
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
                    canRemove={members.length > (mode === "couple" ? 1 : 1)}
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
                        className="cursor-pointer"
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

            {/* Budget & Brand Filters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/10 rounded-2xl p-5 mb-4 border border-white/20"
              data-ocid="filters.panel"
            >
              <h3 className="font-bold text-white text-base mb-4">
                🎯 Filters
              </h3>

              {/* Budget Slider */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-white/90">Budget</p>
                  <span className="text-xs font-bold text-yellow-300">
                    ₹{budget[0].toLocaleString()} – ₹
                    {budget[1].toLocaleString()}
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
                <div className="flex justify-between text-[10px] text-white/50 mt-1">
                  <span>₹500</span>
                  <span>₹10,000</span>
                </div>
              </div>

              {/* Occasion */}
              <div className="mb-5">
                <p className="text-sm font-semibold text-white/90 mb-2">
                  Occasion
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Wedding", "Casual", "Party"].map((occ) => (
                    <button
                      key={occ}
                      type="button"
                      className="text-xs font-bold px-3 py-1.5 rounded-full border border-white/30 text-white/80 hover:bg-white/20 transition-colors"
                      data-ocid="filters.occasion.toggle"
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <p className="text-sm font-semibold text-white/90 mb-2">
                  Brand
                </p>
                <div className="flex flex-wrap gap-1.5">
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
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                          selected
                            ? "bg-yellow-400 text-black border-yellow-400"
                            : "border-white/30 text-white/80 hover:bg-white/20"
                        }`}
                        data-ocid="filters.brand.toggle"
                      >
                        {brand}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Summary & Find */}
            {members.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 rounded-2xl p-5 mb-6 border border-white/20"
                data-ocid="summary.card"
              >
                <h3 className="font-bold text-white text-base mb-3">
                  📋 Your Selection Summary
                </h3>
                <div className="space-y-1.5">
                  {members.map((m, idx) => {
                    const mt = getMemberType(m.typeId);
                    return (
                      <div
                        key={m.uid}
                        className="flex items-center gap-2 text-sm text-white/90"
                      >
                        <span>{mt.emoji}</span>
                        <span className="font-semibold">{mt.label}:</span>
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
                            className="text-white border-white/40 text-xs py-0"
                          >
                            {m.size}
                          </Badge>
                        )}
                        {idx === 0 && !m.outfit && !m.color && !m.size && (
                          <span className="text-yellow-300 text-xs ml-auto">
                            Fill details ↑
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                {!canFind && (
                  <p className="text-yellow-300 text-xs mt-3 font-medium">
                    ⚠ Please fill outfit, color, and size for all members to
                    continue.
                  </p>
                )}
              </motion.div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("home")}
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white"
                data-ocid="find.back_button"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button
                onClick={handleFindResult}
                disabled={!canFind}
                className="flex-1 font-extrabold text-xl bg-yellow-400 text-black hover:bg-yellow-300 border-0 shadow-[0_0_32px_rgba(250,204,21,0.8)] disabled:opacity-40 disabled:shadow-none py-6 tracking-wider"
                data-ocid="find.submit_button"
              >
                ✨ FIND RESULT
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
