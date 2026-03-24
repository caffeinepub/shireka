import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SUGGESTIONS = {
  Occasions: [
    "wedding couple outfits",
    "festival family twinning",
    "party night couple",
    "casual twinning",
    "birthday twinning",
  ],
  Categories: [
    "pink lehenga",
    "kurta set men",
    "saree women",
    "kids ethnic wear",
    "baby onesie",
    "anarkali suit",
    "indo-western couple",
  ],
  People: [
    "couple matching",
    "family of 4 twinning",
    "mother daughter twinning",
    "brothers twinning",
    "friends matching outfits",
  ],
};

interface SmartSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  variant?: "hero" | "navbar";
}

export default function SmartSearchBar({
  onSearch,
  placeholder = "Search 'wedding couple outfits', 'kids twinning'...",
  className = "",
  variant = "hero",
}: SmartSearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = query.trim()
    ? (Object.entries(SUGGESTIONS) as [string, string[]][]).reduce(
        (acc, [group, items]) => {
          const matches = items.filter((s) =>
            s.toLowerCase().includes(query.toLowerCase()),
          );
          if (matches.length) acc.push({ group, items: matches });
          return acc;
        },
        [] as { group: string; items: string[] }[],
      )
    : (Object.entries(SUGGESTIONS) as [string, string[]][]).map(
        ([group, items]) => ({
          group,
          items: items.slice(0, 3),
        }),
      );

  const handleSubmit = (value?: string) => {
    const q = value ?? query;
    setQuery(q);
    setOpen(false);
    onSearch(q);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return <span>{text}</span>;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return <span>{text}</span>;
    return (
      <span>
        {text.slice(0, idx)}
        <span className="font-bold text-pink-500">
          {text.slice(idx, idx + query.length)}
        </span>
        {text.slice(idx + query.length)}
      </span>
    );
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
      data-ocid="search.panel"
    >
      <div
        className={`flex items-center gap-2 bg-white rounded-full shadow-lg border border-gray-100 px-4 ${
          variant === "hero" ? "py-3.5" : "py-2.5"
        }`}
      >
        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
            if (e.key === "Escape") setOpen(false);
          }}
          className={`flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400 ${
            variant === "hero" ? "text-base" : "text-sm"
          }`}
          data-ocid="search.input"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            className="p-0.5 text-gray-400 hover:text-gray-600"
            data-ocid="search.close_button"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          type="button"
          onClick={() => handleSubmit()}
          className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold text-sm px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
          data-ocid="search.submit_button"
        >
          Search
        </button>
      </div>

      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden max-h-80 overflow-y-auto"
            data-ocid="search.dropdown_menu"
          >
            {filtered.map(({ group, items }) => (
              <div key={group}>
                <div className="px-4 pt-3 pb-1">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-pink-400">
                    {group}
                  </span>
                </div>
                {items.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleSubmit(item)}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 flex items-center gap-2 transition-colors"
                    data-ocid="search.item"
                  >
                    <Search className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                    {highlightMatch(item, query)}
                  </button>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
