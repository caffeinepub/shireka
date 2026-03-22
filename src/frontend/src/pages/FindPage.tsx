import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { MemberConfig, OutfitFinderState, Page } from "../App";

interface FindPageProps {
  navigate: (p: Page) => void;
  onSearch: (state: OutfitFinderState) => void;
}

// ─────────────────── MEMBER TYPES ───────────────────
const ALL_MEMBERS = [
  { id: "man", label: "Man", emoji: "👨", gender: "male" },
  { id: "woman", label: "Woman", emoji: "👩", gender: "female" },
  { id: "boy", label: "Boy", emoji: "👦", gender: "boy" },
  { id: "girl", label: "Girl", emoji: "👧", gender: "girl" },
  { id: "infant_boy", label: "Baby Boy", emoji: "👶", gender: "infant" },
  { id: "infant_girl", label: "Baby Girl", emoji: "👶", gender: "infant" },
];

// ─────────────────── OUTFITS PER GENDER ───────────────────
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
    "Jackets",
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
    "Jackets & Coats",
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
    "Onesies & Rompers",
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
  boy: ["2Y", "4Y", "6Y", "8Y", "10Y", "12Y"],
  girl: ["2Y", "4Y", "6Y", "8Y", "10Y", "12Y"],
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
  { name: "Sea Green", hex: "#2E8B57" },
  { name: "Lime Green", hex: "#32CD32" },
  { name: "Burgundy", hex: "#800020" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "Rust", hex: "#B7410E" },
  { name: "Coral", hex: "#FF6B6B" },
  { name: "Mauve", hex: "#E0B0FF" },
  { name: "Khaki", hex: "#C3B091" },
  { name: "Coffee Brown", hex: "#6F4E37" },
  { name: "Rose", hex: "#FF007F" },
  { name: "Magenta", hex: "#FF00FF" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Tan", hex: "#D2B48C" },
  { name: "Violet", hex: "#EE82EE" },
  { name: "Nude", hex: "#E3BC9A" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Rose Gold", hex: "#B76E79" },
  { name: "Copper", hex: "#B87333" },
  { name: "Bronze", hex: "#CD7F32" },
];

const STEP_LABELS = [
  "Select Members",
  "Choose Outfits",
  "Pick Color",
  "Select Sizes",
];

export default function FindPage({ navigate, onSearch }: FindPageProps) {
  const [step, setStep] = useState(0);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [garments, setGarments] = useState<Record<string, string>>({});
  const [selectedColor, setSelectedColor] = useState("");
  const [sizes, setSizes] = useState<Record<string, string>>({});

  const toggleMember = (id: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const selectedMembers = ALL_MEMBERS.filter((m) =>
    selectedMemberIds.includes(m.id),
  );

  const canProceed = () => {
    if (step === 0) return selectedMemberIds.length > 0;
    if (step === 1) return selectedMembers.every((m) => garments[m.id]);
    if (step === 2) return !!selectedColor;
    if (step === 3) return selectedMembers.every((m) => sizes[m.id]);
    return false;
  };

  const handleFindResult = () => {
    const members: MemberConfig[] = selectedMembers.map((m) => ({
      id: m.id,
      label: m.label,
      gender: m.gender,
      garment: garments[m.id] || "",
      color: selectedColor,
      size: sizes[m.id] || "",
    }));
    onSearch({ members, occasion: "" });
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "#1a56db" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-1">
            <Sparkles className="inline-block w-7 h-7 mr-2 text-yellow-400" />
            Find Twinning Outfits
          </h1>
          <p className="text-black/80 text-base">
            Step-by-step matching for your whole family
          </p>
        </motion.div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  i === step
                    ? "bg-yellow-400 text-black shadow-lg scale-110"
                    : i < step
                      ? "bg-white text-blue-700 cursor-pointer"
                      : "bg-white/30 text-black"
                }`}
              >
                {i + 1}
              </button>
              {i < STEP_LABELS.length - 1 && (
                <div
                  className={`w-6 h-1 rounded-full ${
                    i < step ? "bg-yellow-400" : "bg-white/30"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mb-6">
          <span className="text-black font-semibold text-lg">
            Step {step + 1}: {STEP_LABELS[step]}
          </span>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          >
            {/* ─── STEP 1: Select Members ─── */}
            {step === 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-bold text-black mb-4">
                  Who is in the group?
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ALL_MEMBERS.map((m) => {
                    const selected = selectedMemberIds.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggleMember(m.id)}
                        data-ocid={`member_select.${m.id}.toggle`}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all font-medium text-black ${
                          selected
                            ? "border-blue-600 bg-blue-50 shadow-md"
                            : "border-gray-200 bg-gray-50 hover:border-blue-300"
                        }`}
                      >
                        <span className="text-4xl">{m.emoji}</span>
                        <span className="text-sm font-semibold">{m.label}</span>
                        {selected && (
                          <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {selectedMemberIds.length > 0 && (
                  <p className="mt-4 text-sm text-blue-700 font-medium">
                    Selected: {selectedMembers.map((m) => m.label).join(", ")}
                  </p>
                )}
              </div>
            )}

            {/* ─── STEP 2: Choose Outfits ─── */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-bold text-black mb-4">
                  Choose outfit for each member
                </h2>
                <div className="space-y-4">
                  {selectedMembers.map((m) => (
                    <div key={m.id} className="flex items-center gap-4">
                      <span className="text-2xl w-8">{m.emoji}</span>
                      <div className="flex-1">
                        <Label className="text-black font-semibold mb-1 block">
                          {m.label}
                        </Label>
                        <Select
                          value={garments[m.id] || ""}
                          onValueChange={(v) =>
                            setGarments((prev) => ({ ...prev, [m.id]: v }))
                          }
                        >
                          <SelectTrigger
                            className="w-full text-black"
                            data-ocid={`outfit_select.${m.id}.select`}
                          >
                            <SelectValue placeholder="Select outfit..." />
                          </SelectTrigger>
                          <SelectContent>
                            {(OUTFITS_BY_MEMBER[m.id] || []).map((outfit) => (
                              <SelectItem key={outfit} value={outfit}>
                                {outfit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── STEP 3: Pick Color ─── */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-bold text-black mb-2">
                  Choose a coordinating color
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                  Pick one color theme for the whole group
                </p>
                <ScrollArea className="h-64">
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pr-2">
                    {COLORS.map((c) => {
                      const isSelected = selectedColor === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          data-ocid={`color_select.${c.name.toLowerCase().replace(/ /g, "_")}.toggle`}
                          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all border-2 ${
                            isSelected
                              ? "border-blue-600 bg-blue-50 scale-105 shadow"
                              : "border-transparent hover:border-gray-300"
                          }`}
                        >
                          <div
                            className="w-8 h-8 rounded-full border border-gray-200 shadow-sm"
                            style={{
                              background:
                                c.name === "Multi"
                                  ? "linear-gradient(135deg,#FF6B6B,#FFD700,#4169E1)"
                                  : c.hex,
                            }}
                          />
                          <span className="text-[10px] text-black font-medium text-center leading-tight">
                            {c.name}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] text-blue-600 font-bold">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
                {selectedColor && (
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-700">
                    <div
                      className="w-5 h-5 rounded-full border border-gray-300"
                      style={{
                        background:
                          selectedColor === "Multi"
                            ? "linear-gradient(135deg,#FF6B6B,#FFD700,#4169E1)"
                            : COLORS.find((c) => c.name === selectedColor)?.hex,
                      }}
                    />
                    Selected: {selectedColor}
                  </div>
                )}
              </div>
            )}

            {/* ─── STEP 4: Select Sizes ─── */}
            {step === 3 && (
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-bold text-black mb-4">
                  Select size for each member
                </h2>
                <div className="space-y-6">
                  {selectedMembers.map((m) => (
                    <div key={m.id}>
                      <p className="font-semibold text-black mb-2">
                        {m.emoji} {m.label} — {garments[m.id]}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(SIZES_BY_MEMBER[m.id] || []).map((sz) => {
                          const selected = sizes[m.id] === sz;
                          return (
                            <button
                              key={sz}
                              type="button"
                              onClick={() =>
                                setSizes((prev) => ({ ...prev, [m.id]: sz }))
                              }
                              data-ocid={`size_select.${m.id}.toggle`}
                              className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all ${
                                selected
                                  ? "border-blue-600 bg-blue-600 text-white"
                                  : "border-gray-300 text-black hover:border-blue-400"
                              }`}
                            >
                              {sz}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Summary Card */}
        {step === 3 && selectedMembers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white/90 rounded-2xl p-5 shadow-lg"
            data-ocid="summary.card"
          >
            <h3 className="font-bold text-black text-lg mb-3">
              📋 Your Selection Summary
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="text-black">
                🎨 Color: {selectedColor}
              </Badge>
            </div>
            <div className="space-y-1">
              {selectedMembers.map((m) => (
                <div key={m.id} className="text-sm text-black">
                  <span className="font-semibold">
                    {m.emoji} {m.label}:
                  </span>{" "}
                  {garments[m.id]} &bull; Size: {sizes[m.id] || "Not selected"}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 gap-4">
          <Button
            variant="outline"
            onClick={() =>
              step === 0 ? navigate("home") : setStep((s) => s - 1)
            }
            className="flex items-center gap-2 bg-white text-black border-white"
            data-ocid="find.back_button"
          >
            <ChevronLeft className="w-4 h-4" />
            {step === 0 ? "Home" : "Back"}
          </Button>

          {step < 3 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold hover:bg-yellow-300 border-0"
              data-ocid="find.next_button"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleFindResult}
              disabled={!canProceed()}
              className="flex-1 font-extrabold text-lg bg-yellow-400 text-black hover:bg-yellow-300 border-0 shadow-[0_0_24px_rgba(250,204,21,0.7)] animate-pulse"
              data-ocid="find.submit_button"
            >
              ✨ FIND RESULT
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
