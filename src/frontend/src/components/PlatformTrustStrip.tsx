interface PlatformTrustStripProps {
  className?: string;
}

const PLATFORMS = [
  { name: "Amazon", abbr: "AMZ", color: "#FF9900", bg: "#FFF8EC" },
  { name: "Myntra", abbr: "MYN", color: "#FF3F6C", bg: "#FFF0F3" },
  { name: "Flipkart", abbr: "FLK", color: "#2874F0", bg: "#EEF4FF" },
  { name: "Ajio", abbr: "AJO", color: "#E31837", bg: "#FFF0F2" },
  { name: "Meesho", abbr: "MEE", color: "#9B1FE8", bg: "#F5EEFF" },
];

export function PlatformTrustStrip({
  className = "",
}: PlatformTrustStripProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 py-3 ${className}`}
      data-ocid="platform_trust.panel"
    >
      <span className="text-xs sm:text-sm font-semibold text-gray-500 whitespace-nowrap">
        🛒 Compare prices from top platforms:
      </span>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {PLATFORMS.map((p) => (
          <span
            key={p.name}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide transition-transform hover:scale-105"
            style={{
              backgroundColor: p.bg,
              color: p.color,
              border: `1.5px solid ${p.color}44`,
            }}
          >
            {p.name}
          </span>
        ))}
      </div>
    </div>
  );
}
