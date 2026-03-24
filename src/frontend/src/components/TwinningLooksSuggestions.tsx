import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Sparkles, Tag } from "lucide-react";

export type MemberType =
  | "Men"
  | "Women"
  | "Boys"
  | "Girls"
  | "Baby Boy"
  | "Baby Girl"
  | "Kids";

interface TwinningLooksSuggestionsProps {
  members?: MemberType[];
  occasion?: "Wedding" | "Festival" | "Casual";
  title?: string;
  subtitle?: string;
}

interface OutfitItem {
  memberType: MemberType;
  styleName: string;
  color: string;
  gradient: string;
  emoji: string;
}

interface OutfitCombo {
  id: number;
  name: string;
  occasion: "Wedding" | "Festival" | "Casual";
  priceRange: string;
  outfits: Record<MemberType, OutfitItem>;
}

const OCCASION_COLORS: Record<string, string> = {
  Wedding: "#ec4899",
  Festival: "#f97316",
  Casual: "#6366f1",
};

const ALL_COMBOS: OutfitCombo[] = [
  {
    id: 1,
    name: "Look 1: Wedding Elegance",
    occasion: "Wedding",
    priceRange: "₹3,499 – ₹6,999",
    outfits: {
      Men: {
        memberType: "Men",
        styleName: "Bandhgala Suit",
        color: "Ivory Gold",
        gradient: "linear-gradient(135deg, #f5e6c8 0%, #d4a853 100%)",
        emoji: "👔",
      },
      Women: {
        memberType: "Women",
        styleName: "Banarasi Anarkali",
        color: "Deep Rose",
        gradient: "linear-gradient(135deg, #fce4ec 0%, #c2185b 100%)",
        emoji: "👗",
      },
      Kids: {
        memberType: "Kids",
        styleName: "Sherwani Set",
        color: "Cream",
        gradient: "linear-gradient(135deg, #fff8e1 0%, #f9a825 100%)",
        emoji: "🧒",
      },
      Girls: {
        memberType: "Girls",
        styleName: "Lehenga Choli",
        color: "Blush Pink",
        gradient: "linear-gradient(135deg, #fce4ec 0%, #e91e63 100%)",
        emoji: "👧",
      },
      Boys: {
        memberType: "Boys",
        styleName: "Nehru Jacket Set",
        color: "Golden",
        gradient: "linear-gradient(135deg, #fff8e1 0%, #f59e0b 100%)",
        emoji: "👦",
      },
      "Baby Boy": {
        memberType: "Baby Boy",
        styleName: "Mini Kurta Pyjama",
        color: "Ivory",
        gradient: "linear-gradient(135deg, #f5f5f5 0%, #e0c080 100%)",
        emoji: "👶",
      },
      "Baby Girl": {
        memberType: "Baby Girl",
        styleName: "Floral Frock",
        color: "Baby Pink",
        gradient: "linear-gradient(135deg, #fce4ec 0%, #f48fb1 100%)",
        emoji: "👶",
      },
    },
  },
  {
    id: 2,
    name: "Look 2: Festival Vibes",
    occasion: "Festival",
    priceRange: "₹2,199 – ₹4,499",
    outfits: {
      Men: {
        memberType: "Men",
        styleName: "Phulkari Kurta",
        color: "Mustard Yellow",
        gradient: "linear-gradient(135deg, #fef9c3 0%, #f59e0b 100%)",
        emoji: "👔",
      },
      Women: {
        memberType: "Women",
        styleName: "Lucknowi Palazzo Set",
        color: "Turquoise",
        gradient: "linear-gradient(135deg, #ccfbf1 0%, #0d9488 100%)",
        emoji: "👗",
      },
      Kids: {
        memberType: "Kids",
        styleName: "Printed Kurta Set",
        color: "Bright Orange",
        gradient: "linear-gradient(135deg, #ffedd5 0%, #f97316 100%)",
        emoji: "🧒",
      },
      Girls: {
        memberType: "Girls",
        styleName: "Salwar Suit",
        color: "Peacock Green",
        gradient: "linear-gradient(135deg, #d1fae5 0%, #059669 100%)",
        emoji: "👧",
      },
      Boys: {
        memberType: "Boys",
        styleName: "Kurta Churidar",
        color: "Royal Blue",
        gradient: "linear-gradient(135deg, #dbeafe 0%, #1d4ed8 100%)",
        emoji: "👦",
      },
      "Baby Boy": {
        memberType: "Baby Boy",
        styleName: "Dhoti Kurta",
        color: "Saffron",
        gradient: "linear-gradient(135deg, #ffedd5 0%, #ea580c 100%)",
        emoji: "👶",
      },
      "Baby Girl": {
        memberType: "Baby Girl",
        styleName: "Ghagra Choli",
        color: "Parrot Green",
        gradient: "linear-gradient(135deg, #d1fae5 0%, #16a34a 100%)",
        emoji: "👶",
      },
    },
  },
  {
    id: 3,
    name: "Look 3: Casual Day Out",
    occasion: "Casual",
    priceRange: "₹1,299 – ₹2,999",
    outfits: {
      Men: {
        memberType: "Men",
        styleName: "Linen Shirt Pants",
        color: "Sky Blue",
        gradient: "linear-gradient(135deg, #dbeafe 0%, #60a5fa 100%)",
        emoji: "👔",
      },
      Women: {
        memberType: "Women",
        styleName: "Cotton Kurti Palazzo",
        color: "Lavender",
        gradient: "linear-gradient(135deg, #ede9fe 0%, #7c3aed 100%)",
        emoji: "👗",
      },
      Kids: {
        memberType: "Kids",
        styleName: "Jogger Set",
        color: "Coral",
        gradient: "linear-gradient(135deg, #ffe4e6 0%, #f43f5e 100%)",
        emoji: "🧒",
      },
      Girls: {
        memberType: "Girls",
        styleName: "Printed Frock",
        color: "Mint Green",
        gradient: "linear-gradient(135deg, #d1fae5 0%, #34d399 100%)",
        emoji: "👧",
      },
      Boys: {
        memberType: "Boys",
        styleName: "T-Shirt & Shorts",
        color: "Indigo",
        gradient: "linear-gradient(135deg, #e0e7ff 0%, #6366f1 100%)",
        emoji: "👦",
      },
      "Baby Boy": {
        memberType: "Baby Boy",
        styleName: "Onesie + Dungaree",
        color: "Baby Blue",
        gradient: "linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)",
        emoji: "👶",
      },
      "Baby Girl": {
        memberType: "Baby Girl",
        styleName: "Smocked Dress",
        color: "Peach",
        gradient: "linear-gradient(135deg, #fef9c3 0%, #fca5a5 100%)",
        emoji: "👶",
      },
    },
  },
];

const DISPLAY_MEMBER_ORDER: MemberType[] = [
  "Men",
  "Women",
  "Boys",
  "Girls",
  "Kids",
  "Baby Boy",
  "Baby Girl",
];

function OutfitMiniCard({ item }: { item: OutfitItem }) {
  return (
    <div className="flex-shrink-0 w-28 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white">
      <div
        className="h-24 w-full"
        style={{ background: item.gradient }}
        aria-hidden="true"
      >
        <div className="h-full flex items-center justify-center">
          <span className="text-3xl">{item.emoji}</span>
        </div>
      </div>
      <div className="p-2">
        <p className="text-sm font-semibold text-black leading-tight truncate">
          {item.styleName}
        </p>
        <p className="text-xs text-gray-500 truncate">{item.color}</p>
        <p className="text-xs text-gray-400 font-medium mt-0.5">
          {item.memberType}
        </p>
      </div>
    </div>
  );
}

export default function TwinningLooksSuggestions({
  members,
  occasion,
  title = "✨ Recommended Twinning Looks",
  subtitle = "Handpicked complete outfit combos for your family",
}: TwinningLooksSuggestionsProps) {
  const activeMemberTypes: MemberType[] =
    members && members.length > 0 ? members : ["Men", "Women", "Kids"];

  let combos = [...ALL_COMBOS];
  if (occasion) {
    combos = [
      ...combos.filter((c) => c.occasion === occasion),
      ...combos.filter((c) => c.occasion !== occasion),
    ];
  }
  combos = combos.slice(0, 3);

  return (
    <section className="py-12 px-4" data-ocid="ai_suggestions.section">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5" style={{ color: "#ec4899" }} />
            <span
              className="text-sm font-semibold px-3 py-1 rounded-full"
              style={{
                background: "linear-gradient(90deg, #ec4899, #f97316)",
                color: "white",
              }}
            >
              AI Powered
            </span>
            <Sparkles className="w-5 h-5" style={{ color: "#f97316" }} />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-black mb-2">
            {title}
          </h2>
          <p className="text-gray-500 text-base md:text-lg">{subtitle}</p>
        </div>

        {/* Combo cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {combos.map((combo, idx) => (
            <div
              key={combo.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200"
              data-ocid={`ai_suggestions.item.${idx + 1}`}
            >
              {/* Card header */}
              <div className="p-4 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                    style={{
                      background: "linear-gradient(90deg, #ec4899, #f97316)",
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                    AI Recommended
                  </span>
                  <Badge
                    className="text-white text-xs"
                    style={{ background: OCCASION_COLORS[combo.occasion] }}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {combo.occasion}
                  </Badge>
                </div>
                <h3 className="font-display font-bold text-black text-lg leading-tight">
                  {combo.name}
                </h3>
              </div>

              {/* Outfit mini-cards horizontal scroll */}
              <div className="px-4">
                <div
                  className="flex gap-3 overflow-x-auto pb-2"
                  style={{ scrollbarWidth: "none" }}
                >
                  {DISPLAY_MEMBER_ORDER.filter((m) =>
                    activeMemberTypes.includes(m),
                  ).map((memberType) => (
                    <OutfitMiniCard
                      key={memberType}
                      item={combo.outfits[memberType]}
                    />
                  ))}
                </div>
              </div>

              {/* Card footer */}
              <div className="p-4 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-400">Total price range</p>
                  <p className="text-base font-bold text-black">
                    {combo.priceRange}
                  </p>
                  <p className="text-xs text-gray-400">across all platforms</p>
                </div>
                <Button
                  size="sm"
                  className="w-full sm:w-auto text-white font-semibold border-0 flex items-center justify-center gap-1.5 py-5"
                  style={{
                    background: "linear-gradient(90deg, #ec4899, #f97316)",
                  }}
                  data-ocid={`ai_suggestions.item.${idx + 1}.button`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Shop This Look
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
