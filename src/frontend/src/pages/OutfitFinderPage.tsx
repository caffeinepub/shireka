import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { MemberConfig, OutfitFinderState, Page } from "../App";
import {
  ADULT_SIZES,
  GARMENTS_BY_GENDER,
  INFANT_MONTHS,
  KID_AGES,
} from "../data/products";

interface OutfitFinderPageProps {
  navigate: (p: Page) => void;
  finderState: OutfitFinderState;
  setFinderState: (s: OutfitFinderState) => void;
}

const OCCASIONS = [
  { label: "Festive", emoji: "🪔", desc: "Diwali, Navratri & more" },
  { label: "Wedding", emoji: "💍", desc: "Shaadi & sangeet" },
  { label: "Casual", emoji: "☀️", desc: "Everyday comfort" },
  { label: "Party", emoji: "🎉", desc: "Birthdays & celebrations" },
  { label: "Traditional", emoji: "🌺", desc: "Cultural events" },
  { label: "Office", emoji: "💼", desc: "Corporate & formal" },
  { label: "Sports", emoji: "🏏", desc: "Active & outdoor" },
  { label: "Religious", emoji: "🙏", desc: "Puja & temple visits" },
];

const MEMBER_TYPES = [
  {
    id: "man",
    label: "Man",
    gender: "male",
    icon: "👨",
    defaultGarment: "Kurta",
    defaultSize: "M",
  },
  {
    id: "woman",
    label: "Woman",
    gender: "female",
    icon: "👩",
    defaultGarment: "Saree",
    defaultSize: "M",
  },
  {
    id: "boy",
    label: "Boy",
    gender: "boy",
    icon: "👦",
    defaultGarment: "Kurta",
    defaultSize: "4",
  },
  {
    id: "girl",
    label: "Girl",
    gender: "girl",
    icon: "👧",
    defaultGarment: "Lehenga",
    defaultSize: "4",
  },
  {
    id: "infant",
    label: "Infant",
    gender: "infant",
    icon: "👶",
    defaultGarment: "Kurta",
    defaultSize: "3",
  },
];

const COLOR_SWATCHES: Record<string, string> = {
  Black: "#111111",
  White: "#F5F5F5",
  Blue: "#4169E1",
  Pink: "#FF69B4",
  Green: "#228B22",
  Red: "#DC143C",
  Multi: "#9B59B6",
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
  "Turquoise Blue": "#00CED1",
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
  "Grey Melange": "#A9A9A9",
  "Fluorescent Green": "#39FF14",
  Gold: "#FFD700",
  Tan: "#D2B48C",
  Violet: "#7F00FF",
  Nude: "#F2D2BD",
  Metallic: "#AAA9AD",
  Taupe: "#483C32",
  Silver: "#C0C0C0",
  "Camel Brown": "#C19A6B",
  "Rose Gold": "#B76E79",
  Skin: "#FFCBA4",
  Copper: "#B87333",
  Champagne: "#F7E7CE",
  Bronze: "#CD7F32",
  Steel: "#71797E",
};

const STEPS = ["Occasion", "Members", "Garments & Colors", "Summary"];

interface MemberSlot {
  typeId: string;
  gender: string;
  label: string;
  icon: string;
  count: number;
  size: string;
  garment: string;
  color: string;
}

export default function OutfitFinderPage({
  navigate,
  setFinderState,
}: OutfitFinderPageProps) {
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState("");
  const [memberSlots, setMemberSlots] = useState<MemberSlot[]>(
    MEMBER_TYPES.map((mt) => ({
      typeId: mt.id,
      gender: mt.gender,
      label: mt.label,
      icon: mt.icon,
      count: 0,
      size: "",
      garment: "",
      color: "",
    })),
  );

  const activeSlots = memberSlots.filter((s) => s.count > 0);

  const updateSlot = (
    typeId: string,
    key: keyof MemberSlot,
    value: string | number,
  ) => {
    setMemberSlots((prev) =>
      prev.map((s) => (s.typeId === typeId ? { ...s, [key]: value } : s)),
    );
  };

  const getSizes = (gender: string): string[] => {
    if (gender === "infant") return INFANT_MONTHS.map(String);
    if (gender === "boy" || gender === "girl") return KID_AGES.map(String);
    return ADULT_SIZES;
  };

  const getSizeLabel = (gender: string) => {
    if (gender === "infant") return "Months";
    if (gender === "boy" || gender === "girl") return "Age";
    return "Size";
  };

  const canNext = () => {
    if (step === 0) return !!occasion;
    if (step === 1) return activeSlots.length > 0;
    return true;
  };

  const handleFinish = () => {
    const members: MemberConfig[] = [];
    for (const slot of activeSlots) {
      for (let i = 0; i < slot.count; i++) {
        members.push({
          id: `${slot.typeId}-${i}`,
          label: slot.label,
          gender: slot.gender,
          garment: slot.garment,
          color: slot.color,
          size: slot.size,
        });
      }
    }
    setFinderState({ members, occasion });
    navigate("results");
  };

  return (
    <div className="min-h-screen py-10" data-ocid="outfit_finder.page">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-1">
            Guided Selection
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Outfit Finder
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Answer a few questions — we'll find perfect twinning outfits
          </p>
        </motion.div>

        {/* Progress Stepper */}
        <div
          className="flex items-center justify-center mb-10"
          data-ocid="outfit_finder.stepper.panel"
        >
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className={`flex flex-col items-center gap-1 group ${
                  i < step ? "cursor-pointer" : "cursor-default"
                }`}
                data-ocid={`outfit_finder.step.${i + 1}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                    i < step
                      ? "bg-primary border-primary text-primary-foreground"
                      : i === step
                        ? "bg-card border-primary text-primary"
                        : "bg-card border-border text-muted-foreground"
                  }`}
                >
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={`text-[9px] font-semibold uppercase tracking-wider hidden sm:block ${
                    i === step ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-8 md:w-16 h-0.5 mx-1 ${
                    i < step ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Step 0: Occasion */}
            {step === 0 && (
              <div data-ocid="outfit_finder.occasion.section">
                <h2 className="font-display text-xl font-bold text-center mb-6">
                  What's the occasion?
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {OCCASIONS.map((occ) => (
                    <button
                      key={occ.label}
                      type="button"
                      onClick={() => setOccasion(occ.label)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        occasion === occ.label
                          ? "border-primary bg-primary/10 shadow-md scale-[1.02]"
                          : "border-border bg-card hover:border-primary/50 hover:shadow-sm"
                      }`}
                      data-ocid={`outfit_finder.occasion.${occ.label.toLowerCase()}.button`}
                    >
                      <span className="text-3xl">{occ.emoji}</span>
                      <span className="font-bold text-sm">{occ.label}</span>
                      <span className="text-[10px] text-muted-foreground text-center leading-snug">
                        {occ.desc}
                      </span>
                      {occasion === occ.label && (
                        <Badge variant="default" className="text-[9px]">
                          Selected
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Members */}
            {step === 1 && (
              <div data-ocid="outfit_finder.members.section">
                <h2 className="font-display text-xl font-bold text-center mb-2">
                  Who's twinning?
                </h2>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  Set the count for each family member
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {memberSlots.map((slot) => {
                    const sizes = getSizes(slot.gender);
                    return (
                      <div
                        key={slot.typeId}
                        className={`bg-card border-2 rounded-xl p-4 transition-all ${
                          slot.count > 0 ? "border-primary" : "border-border"
                        }`}
                        data-ocid={`outfit_finder.member.${slot.typeId}.panel`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{slot.icon}</span>
                            <span className="font-bold text-sm">
                              {slot.label}
                            </span>
                            {slot.count > 0 && (
                              <Badge variant="secondary" className="text-[9px]">
                                {slot.count}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateSlot(
                                  slot.typeId,
                                  "count",
                                  Math.max(0, slot.count - 1),
                                )
                              }
                              className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                              data-ocid={`outfit_finder.member.${slot.typeId}.decrement.button`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold w-4 text-center">
                              {slot.count}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateSlot(
                                  slot.typeId,
                                  "count",
                                  Math.min(5, slot.count + 1),
                                )
                              }
                              className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                              data-ocid={`outfit_finder.member.${slot.typeId}.increment.button`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        {slot.count > 0 && (
                          <div>
                            <p className="text-[10px] text-muted-foreground mb-1">
                              {getSizeLabel(slot.gender)}
                            </p>
                            <select
                              value={slot.size}
                              onChange={(e) =>
                                updateSlot(slot.typeId, "size", e.target.value)
                              }
                              className="w-full text-xs bg-background border border-border rounded px-2 py-1.5 outline-none focus:ring-1 focus:ring-primary"
                              data-ocid={`outfit_finder.member.${slot.typeId}.size.select`}
                            >
                              <option value="">Select option</option>
                              {sizes.map((sz) => (
                                <option key={sz} value={sz}>
                                  {slot.gender === "infant"
                                    ? `${sz} months`
                                    : slot.gender === "boy" ||
                                        slot.gender === "girl"
                                      ? `Age ${sz}`
                                      : sz}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Garments & Colors */}
            {step === 2 && (
              <div data-ocid="outfit_finder.garments.section">
                <h2 className="font-display text-xl font-bold text-center mb-2">
                  Choose garment & color
                </h2>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  Pick one outfit style and color per member type
                </p>
                <div className="space-y-6">
                  {activeSlots.map((slot) => {
                    const garments = GARMENTS_BY_GENDER[slot.gender] || [
                      "Kurta",
                    ];
                    return (
                      <div
                        key={slot.typeId}
                        className="bg-card border border-border rounded-xl p-4"
                        data-ocid={`outfit_finder.garment.${slot.typeId}.panel`}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xl">{slot.icon}</span>
                          <span className="font-bold">{slot.label}</span>
                          <span className="text-muted-foreground text-sm">
                            × {slot.count}
                          </span>
                        </div>

                        {/* Garment tiles */}
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          Garment
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {garments.map((g) => (
                            <button
                              key={g}
                              type="button"
                              onClick={() =>
                                updateSlot(slot.typeId, "garment", g)
                              }
                              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                                slot.garment === g
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-background border-border hover:border-primary/50"
                              }`}
                              data-ocid={`outfit_finder.garment.${slot.typeId}.${g.toLowerCase().replace(/ /g, "_")}.button`}
                            >
                              {g}
                            </button>
                          ))}
                        </div>

                        {/* Color swatches */}
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          Color
                        </p>
                        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1">
                          {Object.entries(COLOR_SWATCHES).map(([name, hex]) => (
                            <button
                              key={name}
                              type="button"
                              onClick={() =>
                                updateSlot(slot.typeId, "color", name)
                              }
                              title={name}
                              className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                                slot.color === name
                                  ? "border-foreground scale-110"
                                  : "border-transparent"
                              }`}
                              style={{ backgroundColor: hex }}
                              data-ocid={`outfit_finder.color.${slot.typeId}.${name.toLowerCase().replace(/ /g, "_")}.button`}
                            />
                          ))}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Selected:{" "}
                          <span className="font-semibold">
                            {slot.color} {slot.garment}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Summary */}
            {step === 3 && (
              <div data-ocid="outfit_finder.summary.section">
                <h2 className="font-display text-xl font-bold text-center mb-6">
                  Your Outfit Selection
                </h2>
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl overflow-hidden mb-8"
                  style={{
                    background:
                      "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
                  }}
                  data-ocid="outfit_finder.summary.card"
                >
                  <div className="px-6 py-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <span className="text-white font-bold tracking-wide">
                        Twinning Combo
                      </span>
                    </div>
                    <div className="mb-3">
                      <p className="text-white/60 text-xs uppercase tracking-widest mb-1">
                        Occasion
                      </p>
                      <p className="text-white font-bold text-lg">{occasion}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-widest mb-2">
                        Members
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {activeSlots.map((slot) => (
                          <div
                            key={slot.typeId}
                            className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1"
                          >
                            <span>{slot.icon}</span>
                            <span className="text-white text-xs font-semibold">
                              {slot.count} {slot.label}
                            </span>
                            <div
                              className="w-3 h-3 rounded-full border border-white/40"
                              style={{
                                backgroundColor:
                                  COLOR_SWATCHES[slot.color] || "#ccc",
                              }}
                            />
                            <span className="text-white/70 text-xs">
                              {slot.color} {slot.garment}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* FIND RESULT button */}
                <motion.button
                  type="button"
                  onClick={handleFinish}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(26,35,126,0.4)",
                      "0 0 0 12px rgba(26,35,126,0)",
                      "0 0 0 0 rgba(26,35,126,0)",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="w-full py-5 rounded-xl font-display text-xl font-extrabold tracking-wider bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  data-ocid="outfit_finder.find_result.primary_button"
                >
                  🔍 FIND RESULT
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => (step === 0 ? navigate("home") : setStep(step - 1))}
            className="flex items-center gap-1"
            data-ocid="outfit_finder.back.button"
          >
            <ChevronLeft className="w-4 h-4" />
            {step === 0 ? "Back" : "Previous"}
          </Button>

          {step < 3 && (
            <Button
              disabled={!canNext()}
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1"
              data-ocid="outfit_finder.next.button"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
