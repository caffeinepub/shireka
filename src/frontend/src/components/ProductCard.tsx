import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useState } from "react";

export type Platform = "Amazon" | "Myntra" | "Flipkart" | "Ajio" | "Meesho";

export interface PlatformPrice {
  platform: Platform;
  price: number;
  buyUrl?: string;
}

export interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  platform: Platform;
  viewUrl?: string;
  /** Optional price comparison across platforms */
  platformPrices?: PlatformPrice[];
  /** Optional: ocid suffix for deterministic markers */
  ocidSuffix?: string;
}

const PLATFORM_CONFIG: Record<
  Platform,
  { label: string; bg: string; text: string; btnBg: string }
> = {
  Amazon: {
    label: "Amazon",
    bg: "bg-orange-500",
    text: "text-white",
    btnBg: "#f97316",
  },
  Myntra: {
    label: "Myntra",
    bg: "bg-pink-500",
    text: "text-white",
    btnBg: "#ec4899",
  },
  Flipkart: {
    label: "Flipkart",
    bg: "bg-blue-600",
    text: "text-white",
    btnBg: "#2563eb",
  },
  Ajio: {
    label: "Ajio",
    bg: "bg-red-600",
    text: "text-white",
    btnBg: "#dc2626",
  },
  Meesho: {
    label: "Meesho",
    bg: "bg-purple-600",
    text: "text-white",
    btnBg: "#9333ea",
  },
};

const PLATFORM_ORDER: Platform[] = [
  "Ajio",
  "Amazon",
  "Flipkart",
  "Meesho",
  "Myntra",
];

export function ProductCard({
  image,
  title,
  price,
  originalPrice,
  discountPercent,
  platform,
  viewUrl = "#",
  platformPrices,
  ocidSuffix,
}: ProductCardProps) {
  const [showPrices, setShowPrices] = useState(false);
  const plat = PLATFORM_CONFIG[platform];
  const ocidBase = ocidSuffix ? `product_card.${ocidSuffix}` : "product_card";

  // Sort platform prices in canonical order
  const sortedPrices = platformPrices
    ? [...platformPrices].sort(
        (a, b) =>
          PLATFORM_ORDER.indexOf(a.platform) -
          PLATFORM_ORDER.indexOf(b.platform),
      )
    : null;

  const lowestPrice = sortedPrices
    ? Math.min(...sortedPrices.map((p) => p.price))
    : null;
  const highestPrice = sortedPrices
    ? Math.max(...sortedPrices.map((p) => p.price))
    : null;
  const savings =
    lowestPrice !== null && highestPrice !== null
      ? highestPrice - lowestPrice
      : 0;

  return (
    <article
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
      data-ocid={`${ocidBase}.card`}
    >
      {/* Image area */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "3/4" }}
      >
        <div
          className="w-full h-full flex items-end justify-center"
          style={{ background: image }}
        >
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>

        {/* Platform badge — top-left */}
        <span
          className={`absolute top-2 left-2 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold tracking-wide ${plat.bg} ${plat.text} shadow`}
          data-ocid={`${ocidBase}.platform_badge`}
        >
          {plat.label}
        </span>

        {/* Discount badge — top-right */}
        <span
          className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-extrabold px-2 py-0.5 rounded-full shadow"
          data-ocid={`${ocidBase}.discount_badge`}
        >
          {discountPercent}% OFF
        </span>
      </div>

      {/* Card body */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        {/* Title */}
        <h3
          className="text-base font-semibold text-gray-900 line-clamp-2 leading-snug"
          title={title}
        >
          {title}
        </h3>

        {/* Price row */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-gray-900">
            ₹{price.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{originalPrice.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex-1" />

        {/* View Product button */}
        <Button
          asChild
          size="sm"
          className="w-full font-bold text-white rounded-full mt-1 text-sm py-5"
          style={{
            background: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
            border: "none",
          }}
          data-ocid={`${ocidBase}.primary_button`}
        >
          <a
            href={viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5"
          >
            View Product <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Button>
      </div>

      {/* Price Comparison Section */}
      {sortedPrices && sortedPrices.length > 0 && (
        <div className="border-t border-gray-100">
          {/* Toggle header */}
          <button
            type="button"
            onClick={() => setShowPrices((v) => !v)}
            className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 transition-colors"
            data-ocid={`${ocidBase}.toggle`}
          >
            <span className="text-sm font-bold text-gray-700">
              Compare Prices
            </span>
            <span className="flex items-center gap-1">
              {!showPrices && lowestPrice !== null && (
                <span className="text-xs font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                  Best: ₹{lowestPrice.toLocaleString("en-IN")}
                </span>
              )}
              {showPrices ? (
                <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              )}
            </span>
          </button>

          {/* Expanded price rows */}
          {showPrices && (
            <div className="pb-2 px-2 flex flex-col gap-1">
              {sortedPrices.map((pp) => {
                const isLowest = pp.price === lowestPrice;
                const cfg = PLATFORM_CONFIG[pp.platform];
                return (
                  <div
                    key={pp.platform}
                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${
                      isLowest
                        ? "bg-green-50 ring-1 ring-green-200"
                        : "bg-gray-50"
                    }`}
                    data-ocid={`${ocidBase}.${pp.platform.toLowerCase()}_row`}
                  >
                    {/* Platform pill */}
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded-full shrink-0 ${cfg.bg} ${cfg.text}`}
                    >
                      {cfg.label}
                    </span>

                    {/* Price */}
                    <span
                      className={`text-sm font-extrabold ${
                        isLowest ? "text-green-700" : "text-gray-800"
                      } flex-1`}
                    >
                      ₹{pp.price.toLocaleString("en-IN")}
                    </span>

                    {/* Best Deal badges */}
                    {isLowest && (
                      <span className="flex items-center gap-1 shrink-0">
                        <span className="text-[10px] font-extrabold bg-green-600 text-white px-1.5 py-0.5 rounded-full">
                          Best Deal 🏷️
                        </span>
                        {savings > 0 && (
                          <span className="text-[10px] font-bold text-orange-600">
                            Save ₹{savings}
                          </span>
                        )}
                      </span>
                    )}

                    {/* Buy Now button */}
                    <a
                      href={pp.buyUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-xs font-bold text-white px-2 py-0.5 rounded-full transition-opacity hover:opacity-90"
                      style={{ backgroundColor: cfg.btnBg }}
                      data-ocid={`${ocidBase}.${pp.platform.toLowerCase()}_button`}
                    >
                      Buy
                    </a>
                  </div>
                );
              })}

              {/* Lowest Price label */}
              {lowestPrice !== null && (
                <p className="text-xs text-green-700 font-semibold text-center mt-0.5">
                  🔥 Lowest Price ₹{lowestPrice.toLocaleString("en-IN")} — Save
                  ₹{savings}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
