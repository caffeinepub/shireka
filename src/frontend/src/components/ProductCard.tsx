import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export type Platform = "Amazon" | "Myntra" | "Flipkart" | "Ajio" | "Meesho";

export interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  platform: Platform;
  viewUrl?: string;
  /** Optional: ocid suffix for deterministic markers */
  ocidSuffix?: string;
}

const PLATFORM_CONFIG: Record<
  Platform,
  { label: string; bg: string; text: string; emoji: string }
> = {
  Amazon: {
    label: "Amazon",
    bg: "bg-orange-500",
    text: "text-white",
    emoji: "🟠",
  },
  Myntra: {
    label: "Myntra",
    bg: "bg-pink-500",
    text: "text-white",
    emoji: "🌸",
  },
  Flipkart: {
    label: "Flipkart",
    bg: "bg-blue-600",
    text: "text-white",
    emoji: "🔵",
  },
  Ajio: { label: "Ajio", bg: "bg-red-600", text: "text-white", emoji: "🔴" },
  Meesho: {
    label: "Meesho",
    bg: "bg-purple-600",
    text: "text-white",
    emoji: "🟣",
  },
};

export function ProductCard({
  image,
  title,
  price,
  originalPrice,
  discountPercent,
  platform,
  viewUrl = "#",
  ocidSuffix,
}: ProductCardProps) {
  const plat = PLATFORM_CONFIG[platform];
  const ocidBase = ocidSuffix ? `product_card.${ocidSuffix}` : "product_card";

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
        {/* CSS gradient product image */}
        <div
          className="w-full h-full flex items-end justify-center"
          style={{ background: image }}
        >
          {/* Subtle overlay at bottom for contrast */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>

        {/* Platform badge — top-left */}
        <span
          className={`absolute top-2 left-2 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide ${plat.bg} ${plat.text} shadow`}
          data-ocid={`${ocidBase}.platform_badge`}
        >
          {plat.label}
        </span>

        {/* Discount badge — top-right */}
        <span
          className="absolute top-2 right-2 z-10 bg-red-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow"
          data-ocid={`${ocidBase}.discount_badge`}
        >
          {discountPercent}% OFF
        </span>
      </div>

      {/* Card body */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        {/* Title */}
        <h3
          className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug"
          title={title}
        >
          {title}
        </h3>

        {/* Price row */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-extrabold text-gray-900">
            ₹{price.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{originalPrice.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* View Product button */}
        <Button
          asChild
          size="sm"
          className="w-full font-bold text-white rounded-lg mt-1"
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
    </article>
  );
}
