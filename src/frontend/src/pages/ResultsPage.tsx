import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  ExternalLink,
  Heart,
  Share2,
  TrendingDown,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { MemberConfig, OutfitFinderState, Page } from "../App";

interface ResultsPageProps {
  navigate: (p: Page) => void;
  finderState: OutfitFinderState;
}

// ─────────────── PLATFORM CONFIG ───────────────
const PLATFORMS = [
  { id: "Myntra", label: "Myntra", color: "#FF3F6C", bg: "#fff0f4" },
  { id: "Amazon", label: "Amazon", color: "#FF9900", bg: "#fff8ec" },
  { id: "Flipkart", label: "Flipkart", color: "#2874F0", bg: "#eef4ff" },
  { id: "Ajio", label: "Ajio", color: "#5A0064", bg: "#f8f0fa" },
  { id: "Meesho", label: "Meesho", color: "#9B1FE8", bg: "#f5eeff" },
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

// Platform price multipliers
const PLATFORM_MULTIPLIERS: Record<string, number> = {
  Myntra: 1.0,
  Amazon: 0.92,
  Flipkart: 0.95,
  Ajio: 1.12,
  Meesho: 0.78,
};

const PLATFORM_RATINGS: Record<string, number> = {
  Myntra: 4.3,
  Amazon: 4.1,
  Flipkart: 4.0,
  Ajio: 4.2,
  Meesho: 3.9,
};

function generateMockProducts(
  member: MemberConfig,
  outfitType: string,
  color: string,
  size: string,
) {
  const base = BASE_PRICES[outfitType] ?? 800;
  return PLATFORMS.map((p, i) => {
    const price = Math.round(
      base * PLATFORM_MULTIPLIERS[p.id] * (0.95 + i * 0.03),
    );
    const searchQuery = encodeURIComponent(
      `${color} ${outfitType} ${member.label} ${size}`,
    );
    const outfitSlug = outfitType.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const colorSlug = color.toLowerCase().replace(/ /g, "+");

    const buyUrl = (() => {
      if (p.id === "Myntra")
        return `https://www.myntra.com/${outfitSlug}?q=${colorSlug}+${outfitSlug}+${member.label.toLowerCase()}`;
      if (p.id === "Amazon") return `https://www.amazon.in/s?k=${searchQuery}`;
      if (p.id === "Flipkart")
        return `https://www.flipkart.com/search?q=${searchQuery}`;
      if (p.id === "Ajio")
        return `https://www.ajio.com/search/?text=${colorSlug}+${outfitSlug}`;
      return `https://meesho.com/search?q=${searchQuery}`;
    })();

    return {
      platform: p.id,
      name: `${color} ${outfitType} — ${member.label} (${size})`,
      price,
      rating: PLATFORM_RATINGS[p.id],
      buyUrl,
      platformColor: p.color,
      platformBg: p.bg,
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

// ─────────────── PRODUCT CARD ───────────────
function ProductCard({
  product,
  color,
  isLowest,
}: {
  product: ReturnType<typeof generateMockProducts>[0];
  color: string;
  isLowest: boolean;
}) {
  const colorHex = COLOR_HEX[color] ?? "#cccccc";
  const isMulti = color === "Multi";

  return (
    <div
      className={`rounded-xl overflow-hidden border-2 transition-all hover:shadow-lg flex flex-col ${
        isLowest ? "border-green-500 shadow-green-100" : "border-gray-200"
      }`}
      style={{ minWidth: 160 }}
    >
      {/* Color swatch image */}
      <div
        className="h-28 w-full relative flex items-center justify-center"
        style={{
          background: isMulti
            ? "linear-gradient(135deg,#FF6B6B,#FFD700,#4169E1)"
            : `${colorHex}33`,
          borderBottom: `4px solid ${isMulti ? "#FFD700" : colorHex}`,
        }}
      >
        <div
          className="w-16 h-16 rounded-full border-4 border-white shadow-md"
          style={{
            background: isMulti
              ? "linear-gradient(135deg,#FF6B6B,#FFD700,#4169E1)"
              : colorHex,
          }}
        />
        {isLowest && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            BEST PRICE
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <span
          className="text-[11px] font-bold px-2 py-0.5 rounded-full w-fit"
          style={{
            background: product.platformBg,
            color: product.platformColor,
          }}
        >
          {product.platform}
        </span>
        <p className="text-xs text-gray-700 font-medium leading-tight line-clamp-2">
          {product.name}
        </p>
        <p className="text-lg font-extrabold text-black">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
        <p className="text-xs text-yellow-600 font-semibold">
          ★ {product.rating}
        </p>
        <a
          href={product.buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
          data-ocid="product.buy_button"
        >
          Buy Now <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

// ─────────────── MEMBER RESULT SECTION ───────────────
function MemberSection({ member }: { member: MemberConfig }) {
  const products = generateMockProducts(
    member,
    member.garment,
    member.color,
    member.size,
  );
  const lowestPrice = Math.min(...products.map((p) => p.price));

  const emoji = MEMBER_EMOJIS[member.id] ?? "🧑";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
      data-ocid="member_result.section"
    >
      {/* Section header */}
      <div className="px-5 py-4 bg-gradient-to-r from-blue-600 to-blue-400">
        <h2 className="text-lg font-extrabold text-white">
          {emoji} For {member.label} — {member.garment} ({member.size})
        </h2>
        <p className="text-blue-100 text-sm">
          Color: {member.color} &bull; Prices across 5 platforms
        </p>
      </div>

      {/* Product cards horizontal scroll */}
      <div className="p-4 overflow-x-auto">
        <div className="flex gap-3" style={{ minWidth: "max-content" }}>
          {products.map((prod) => (
            <ProductCard
              key={prod.platform}
              product={prod}
              color={member.color}
              isLowest={prod.price === lowestPrice}
            />
          ))}
        </div>
      </div>

      {/* Price comparison table */}
      <div className="px-4 pb-5" data-ocid="price_comparison.table">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="w-4 h-4 text-green-600" />
          <span className="font-bold text-sm text-black">Price Comparison</span>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products
                .slice()
                .sort((a, b) => a.price - b.price)
                .map((prod) => (
                  <TableRow
                    key={prod.platform}
                    className={prod.price === lowestPrice ? "bg-green-50" : ""}
                    data-ocid="price_comparison.row"
                  >
                    <TableCell>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: prod.platformBg,
                          color: prod.platformColor,
                        }}
                      >
                        {prod.platform}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs max-w-[180px] truncate">
                      {prod.name}
                    </TableCell>
                    <TableCell
                      className={`font-extrabold ${
                        prod.price === lowestPrice
                          ? "text-green-600"
                          : "text-black"
                      }`}
                    >
                      ₹{prod.price.toLocaleString("en-IN")}
                      {prod.price === lowestPrice && (
                        <span className="ml-1 text-[10px] bg-green-100 text-green-700 rounded px-1">
                          LOWEST
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-yellow-600 font-semibold">
                      ★ {prod.rating}
                    </TableCell>
                    <TableCell>
                      <a
                        href={prod.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs font-bold flex items-center gap-1"
                        data-ocid="price_table.buy_button"
                      >
                        Buy <ExternalLink className="w-3 h-3" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.section>
  );
}

// ─────────────── RESULTS PAGE ───────────────
export default function ResultsPage({
  navigate,
  finderState,
}: ResultsPageProps) {
  const [wishlistSaved, setWishlistSaved] = useState(false);
  const { members } = finderState;
  const color = members[0]?.color ?? "";

  const handleWishlist = () => {
    setWishlistSaved(true);
    toast.success("Saved to wishlist!");
  };

  const handleShare = async () => {
    const text = `Check out my Shireka twinning combo! Color: ${color} — ${members
      .map((m) => `${m.label}: ${m.garment} (${m.size})`)
      .join(", ")}`;
    if (navigator.share) {
      await navigator.share({ title: "Shireka Twinning Outfit", text });
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
        <div className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-sm">
          <p className="text-2xl mb-3">🔍</p>
          <h2 className="text-xl font-bold text-black mb-2">
            No outfit selected yet
          </h2>
          <p className="text-gray-500 mb-4 text-sm">
            Use the Twinning Finder to pick outfits and see results here.
          </p>
          <Button
            onClick={() => navigate("find")}
            className="bg-yellow-400 text-black font-bold hover:bg-yellow-300 border-0"
            data-ocid="results.go_find_button"
          >
            Start Finding
          </Button>
        </div>
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
            {members.length} member{members.length > 1 ? "s" : ""} &bull; Prices
            from 5 platforms
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
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("find")}
              className="flex items-center gap-2 text-black border-gray-300"
              data-ocid="results.modify_button"
            >
              <ArrowLeft className="w-4 h-4" /> Modify Search
            </Button>
            <Button
              variant="outline"
              onClick={handleWishlist}
              disabled={wishlistSaved}
              className="flex items-center gap-2 text-black border-gray-300"
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
              className="flex items-center gap-2 text-black border-gray-300"
              data-ocid="results.share_button"
            >
              <Share2 className="w-4 h-4" /> Share Results
            </Button>
          </div>
        </motion.div>

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
