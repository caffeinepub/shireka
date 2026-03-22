import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Filter,
  Heart,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Page } from "../App";
import { COLORS, MOCK_PRODUCTS, OCCASIONS } from "../data/products";

interface HomePageProps {
  navigate: (p: Page) => void;
}

const GIRLS_CATEGORIES = [
  "Frocks & Dresses",
  "Sets & Suits",
  "Onesies & Rompers",
  "Tops & T-shirts",
  "Shorts & Skirts",
  "Jeans & Jeggings",
  "Pajamas & Leggings",
  "Party Wear",
  "Ethnic Wear",
  "Jumpsuits & Dungarees",
];

const BOYS_CATEGORIES = [
  "Sets & Suits",
  "T-Shirts",
  "Shorts",
  "Onesies & Rompers",
  "Shirts",
  "Jeans & Trousers",
  "Pajamas & Trackpants",
  "Diaper & Bootie Leggings",
  "Party Wear",
  "Ethnic Wear",
];

const INFANT_AGE_RANGES = [
  "0-3 Months",
  "3-6 Months",
  "6-9 Months",
  "9-12 Months",
  "12-18 Months",
  "18-24 Months",
];

const TWINNING_GALLERY = [
  {
    id: "family4",
    image: "/assets/generated/family4-pink.dim_800x600.jpg",
    title: "Family of Four",
    subtitle: "Pink Ethnic Ensemble",
    badge: "Family · 4",
    badgeBg: "bg-pink-500",
    badgeText: "text-white",
    overlayGradient: "from-pink-900/80",
    borderAccent: "border-pink-300",
    featured: true,
  },
  {
    id: "family3",
    image: "/assets/generated/family3-green.dim_800x600.jpg",
    title: "Family of Three",
    subtitle: "Green Traditional Attire",
    badge: "Family · 3",
    badgeBg: "bg-green-600",
    badgeText: "text-white",
    overlayGradient: "from-green-900/80",
    borderAccent: "border-green-300",
    featured: false,
  },
  {
    id: "brothers",
    image: "/assets/generated/brothers2-navyblue.dim_800x600.jpg",
    title: "Brothers Duo",
    subtitle: "Navy Blue Kurtas",
    badge: "Brothers · 2",
    badgeBg: "bg-navy",
    badgeText: "text-white",
    overlayGradient: "from-blue-950/80",
    borderAccent: "border-blue-300",
    featured: false,
  },
  {
    id: "couple",
    image: "/assets/generated/couple-white.dim_800x600.jpg",
    title: "Couple Goals",
    subtitle: "White Festive Wear",
    badge: "Couple",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-900",
    overlayGradient: "from-gray-900/80",
    borderAccent: "border-amber-200",
    featured: true,
  },
];

interface KidsCardProps {
  title: string;
  subtitle: string;
  bgClass: string;
  accentClass: string;
  borderClass: string;
  hoverBgClass: string;
  icon: string;
  categories?: string[];
  infantMode?: boolean;
  onClick: () => void;
  ocid: string;
}

function KidsCard({
  title,
  subtitle,
  bgClass,
  accentClass,
  borderClass,
  hoverBgClass,
  icon,
  categories,
  infantMode,
  onClick,
  ocid,
}: KidsCardProps) {
  const [expandedInfant, setExpandedInfant] = useState<"girl" | "boy" | null>(
    null,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl overflow-hidden border ${borderClass} shadow-md flex flex-col ${bgClass}`}
      data-ocid={ocid}
    >
      {/* Card header button */}
      <button
        type="button"
        onClick={onClick}
        className={`px-6 pt-6 pb-4 text-left w-full border-b ${borderClass} hover:opacity-80 transition-opacity`}
      >
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">{icon}</span>
          <div>
            <h3
              className={`font-display text-2xl font-bold tracking-wider ${accentClass}`}
            >
              {title}
            </h3>
            <p className="text-xs tracking-widest uppercase text-foreground/50">
              {subtitle}
            </p>
          </div>
        </div>
      </button>

      {/* Category list */}
      <div className="px-5 py-4 flex-1">
        {!infantMode && categories && (
          <ul className="space-y-1.5">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={onClick}
                  className={`w-full text-left text-sm px-3 py-1.5 rounded-lg font-medium transition-all ${hoverBgClass} hover:pl-5`}
                >
                  <span className={`${accentClass} mr-2 text-xs`}>▸</span>
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        )}

        {infantMode && (
          <div className="space-y-3">
            {/* Baby Girl */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setExpandedInfant((prev) => (prev === "girl" ? null : "girl"))
                }
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold text-sm tracking-wide bg-pink-100 text-pink-800 hover:bg-pink-200 transition-colors"
                data-ocid="kids.infant.baby_girl.toggle"
              >
                <span>👧 Baby Girl</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    expandedInfant === "girl" ? "rotate-90" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {expandedInfant === "girl" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 pl-3 space-y-1">
                      {INFANT_AGE_RANGES.map((age) => (
                        <button
                          type="button"
                          key={age}
                          onClick={onClick}
                          className="w-full text-left text-xs px-3 py-1.5 rounded-lg font-medium bg-pink-50 hover:bg-pink-100 transition-colors hover:pl-5"
                        >
                          <span className="text-pink-400 mr-2">♡</span>
                          {age}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Baby Boy */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setExpandedInfant((prev) => (prev === "boy" ? null : "boy"))
                }
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold text-sm tracking-wide bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                data-ocid="kids.infant.baby_boy.toggle"
              >
                <span>👦 Baby Boy</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    expandedInfant === "boy" ? "rotate-90" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {expandedInfant === "boy" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 pl-3 space-y-1">
                      {INFANT_AGE_RANGES.map((age) => (
                        <button
                          type="button"
                          key={age}
                          onClick={onClick}
                          className="w-full text-left text-xs px-3 py-1.5 rounded-lg font-medium bg-blue-50 hover:bg-blue-100 transition-colors hover:pl-5"
                        >
                          <span className="text-blue-400 mr-2">♡</span>
                          {age}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="px-5 pb-5 pt-2">
        <button
          type="button"
          onClick={onClick}
          className={`w-full py-2 rounded-xl text-xs font-bold tracking-widest uppercase border-2 ${borderClass} ${accentClass} ${hoverBgClass} hover:text-white transition-all`}
        >
          EXPLORE {title.toUpperCase()}
        </button>
      </div>
    </motion.div>
  );
}

export default function HomePage({ navigate }: HomePageProps) {
  const [filterColor, setFilterColor] = useState("");
  const [filterOccasion, setFilterOccasion] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [wishlistedIds, setWishlistedIds] = useState<Set<number>>(new Set());

  const filteredProducts = MOCK_PRODUCTS.filter((p) => {
    if (filterColor && p.color !== filterColor) return false;
    if (filterOccasion && p.occasion !== filterOccasion) return false;
    if (filterGender) {
      if (filterGender === "men" && p.gender !== "male") return false;
      if (filterGender === "women" && p.gender !== "female") return false;
      if (filterGender === "kids" && p.gender !== "boy" && p.gender !== "girl")
        return false;
    }
    return true;
  }).slice(0, 8);

  const toggleWishlist = (id: number) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.success("Removed from wishlist");
      } else {
        next.add(id);
        toast.success("Added to wishlist");
      }
      return next;
    });
  };

  const platformBadgeStyle: Record<string, string> = {
    Myntra: "bg-[#FF3F6C] text-white",
    "Amazon Fashion": "bg-[#FF9900] text-white",
    Flipkart: "bg-[#2874F0] text-white",
    Ajio: "bg-[#5A0064] text-white",
    Meesho: "bg-[#9B1FE8] text-white",
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[70vh] min-h-[500px] overflow-hidden"
        data-ocid="hero.section"
      >
        <img
          src="/assets/generated/hero-family-twinning.dim_1400x700.jpg"
          alt="Family twinning outfits"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-xl"
            >
              <p className="text-white/70 text-xs tracking-[0.3em] uppercase mb-3">
                India's #1 Twinning Platform
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-wide uppercase mb-4">
                SHIREKA
                <span className="block text-2xl sm:text-3xl md:text-4xl font-medium mt-1">
                  Twinning in Style
                </span>
              </h1>
              <p className="text-white/80 text-base md:text-lg mb-8 leading-relaxed">
                Discover perfectly matched outfits for couples, families, and
                kids across India's top fashion platforms — all in one place.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-white text-foreground hover:bg-white/90 font-semibold tracking-wider"
                  onClick={() => navigate("find")}
                  data-ocid="hero.primary_button"
                >
                  SHOP COLLECTION
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-semibold tracking-wider"
                  onClick={() => navigate("find")}
                  data-ocid="hero.secondary_button"
                >
                  FIND YOUR MATCH
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Pagination dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === 0 ? "bg-white w-6" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Indian Traditional Twinning Gallery */}
      <section
        className="py-20 relative overflow-hidden"
        data-ocid="gallery.section"
        style={{
          background:
            "linear-gradient(135deg, #1a0a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%)",
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #ff6eb4, transparent)",
            }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #4ade80, transparent)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
            style={{
              background: "radial-gradient(circle, #e2c08d, transparent)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: "#e2c08d" }}
            >
              ✦ Ethnic Collections ✦
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-3"
              style={{ fontFamily: "Georgia, serif", letterSpacing: "0.05em" }}
            >
              Indian Traditional Twinning
            </h2>
            <p className="text-white/60 text-base md:text-lg tracking-wide">
              Coordinated Ethnic Wear for Every Occasion
            </p>
            <div className="flex justify-center mt-5 gap-2">
              <div
                className="h-px w-16 bg-gradient-to-r from-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, transparent, #e2c08d)",
                }}
              />
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#e2c08d" }}
              />
              <div
                className="h-px w-16"
                style={{
                  backgroundImage:
                    "linear-gradient(to left, transparent, #e2c08d)",
                }}
              />
            </div>
          </motion.div>

          {/* Gallery Grid — featured asymmetric layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
            {TWINNING_GALLERY.map((item, idx) => {
              // Featured items get more columns on large screens
              const colSpan = item.featured ? "lg:col-span-7" : "lg:col-span-5";
              const imgHeight = item.featured ? "h-[380px]" : "h-[340px]";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-2xl ${colSpan}`}
                  onClick={() => navigate("find")}
                  data-ocid={`gallery.${item.id}.card`}
                >
                  {/* Image */}
                  <div className={`relative ${imgHeight} overflow-hidden`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Base gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${item.overlayGradient} via-transparent to-transparent opacity-70`}
                    />

                    {/* Hover overlay with shimmer */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Golden border glow on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-300/60 transition-all duration-500"
                      style={{
                        boxShadow: "inset 0 0 0 0",
                        transition: "box-shadow 0.5s",
                      }}
                    />

                    {/* Badge top-left */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg ${item.badgeBg} ${item.badgeText}`}
                        style={
                          item.id === "brothers"
                            ? { backgroundColor: "#1e3a5f" }
                            : {}
                        }
                      >
                        ✦ {item.badge}
                      </span>
                    </div>

                    {/* Text content bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3
                        className="text-white font-bold text-xl md:text-2xl leading-tight"
                        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-white/75 text-sm mt-0.5 tracking-wide">
                        {item.subtitle}
                      </p>

                      {/* Shop Now — visible on hover */}
                      <div className="overflow-hidden mt-3">
                        <motion.div
                          initial={{ y: 30, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400"
                        >
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase text-white border border-white/60 hover:bg-white hover:text-black transition-colors duration-300"
                            data-ocid={`gallery.${item.id}.primary_button`}
                          >
                            SHOP NOW <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              className="font-bold tracking-widest px-10 py-5 text-sm rounded-full shadow-xl"
              style={{
                background: "linear-gradient(135deg, #e2c08d, #c9a55e)",
                color: "#1a0a2e",
              }}
              onClick={() => navigate("find")}
              data-ocid="gallery.view_all.button"
            >
              EXPLORE ALL ETHNIC COLLECTIONS ✦
            </Button>
          </motion.div>
        </div>
      </section>

      {/* KIDS Section */}
      <section
        className="py-16 max-w-7xl mx-auto px-4 sm:px-6"
        data-ocid="categories.section"
      >
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Collections
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">KIDS</h2>
          <p className="text-muted-foreground text-sm mt-1 tracking-widest uppercase">
            Little Twinners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KidsCard
            title="Boys"
            subtitle="Trendy styles for little gents"
            bgClass="bg-blue-50"
            accentClass="text-blue-800"
            borderClass="border-blue-200"
            hoverBgClass="hover:bg-blue-100"
            icon="👦"
            categories={BOYS_CATEGORIES}
            onClick={() => navigate("find")}
            ocid="categories.boys.card"
          />
          <KidsCard
            title="Girls"
            subtitle="Cute & stylish for little queens"
            bgClass="bg-pink-50"
            accentClass="text-pink-800"
            borderClass="border-pink-200"
            hoverBgClass="hover:bg-pink-100"
            icon="👧"
            categories={GIRLS_CATEGORIES}
            onClick={() => navigate("find")}
            ocid="categories.girls.card"
          />
          <KidsCard
            title="Infants"
            subtitle="Adorable outfits for your tiny ones"
            bgClass="bg-purple-50"
            accentClass="text-purple-800"
            borderClass="border-purple-200"
            hoverBgClass="hover:bg-purple-100"
            icon="👶"
            infantMode
            onClick={() => navigate("find")}
            ocid="categories.infants.card"
          />
        </div>
      </section>

      {/* AI Banner */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Sparkles className="w-10 h-10 opacity-70" />
            <div>
              <h3 className="font-display text-2xl font-bold">
                AI-Powered Outfit Matching
              </h3>
              <p className="text-primary-foreground/70 text-sm mt-1">
                Our smart algorithm finds perfectly coordinated outfits from 5
                platforms instantly
              </p>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-white text-foreground hover:bg-white/90 font-semibold shrink-0"
            onClick={() => navigate("find")}
            data-ocid="ai_banner.primary_button"
          >
            Try AI Matching →
          </Button>
        </div>
      </section>

      {/* Product Discovery Section */}
      <section
        className="py-16 max-w-7xl mx-auto px-4 sm:px-6"
        data-ocid="discovery.section"
      >
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Curated For You
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Find Your Perfect Match
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className="lg:w-56 shrink-0" data-ocid="filter.panel">
            <div className="bg-card border border-border rounded p-4 space-y-6">
              <div>
                <h4 className="font-semibold text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5" /> Filters
                </h4>
              </div>

              <div>
                <h5 className="font-semibold text-xs uppercase tracking-wider mb-2">
                  Gender
                </h5>
                <div className="space-y-1">
                  {[
                    ["men", "Men"],
                    ["", "All"],
                    ["women", "Women"],
                    ["kids", "Kids"],
                  ].map(([val, label]) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setFilterGender(val)}
                      className={`w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                        filterGender === val
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                      data-ocid={`filter.gender.${label.toLowerCase()}.toggle`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-xs uppercase tracking-wider mb-2">
                  Occasion
                </h5>
                <div className="space-y-1">
                  {["", ...OCCASIONS].map((occ) => (
                    <button
                      type="button"
                      key={occ}
                      onClick={() => setFilterOccasion(occ)}
                      className={`w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                        filterOccasion === occ
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {occ || "All"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-xs uppercase tracking-wider mb-2">
                  Color
                </h5>
                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                  {COLORS.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setFilterColor(filterColor === c ? "" : c)}
                      className={`text-xs px-2 py-1 rounded border transition-colors ${
                        filterColor === c
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => {
                  setFilterColor("");
                  setFilterOccasion("");
                  setFilterGender("");
                }}
                data-ocid="filter.reset.button"
              >
                Clear Filters
              </Button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div
                className="text-center py-16 text-muted-foreground"
                data-ocid="products.empty_state"
              >
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No products match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-card border border-border rounded overflow-hidden group"
                    data-ocid={`products.item.${idx + 1}`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
                        data-ocid={`products.wishlist.toggle.${idx + 1}`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-colors ${
                            wishlistedIds.has(product.id)
                              ? "fill-red-500 text-red-500"
                              : "text-foreground/60"
                          }`}
                        />
                      </button>
                      <div className="absolute top-2 left-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${
                            platformBadgeStyle[product.platform] ||
                            "bg-gray-500"
                          }`}
                          style={{
                            backgroundColor: {
                              Myntra: "#FF3F6C",
                              "Amazon Fashion": "#FF9900",
                              Flipkart: "#2874F0",
                              Ajio: "#5A0064",
                              Meesho: "#9B1FE8",
                            }[product.platform],
                          }}
                        >
                          {product.platform}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground mb-0.5">
                        {product.category}
                      </p>
                      <h3 className="text-sm font-semibold line-clamp-1 mb-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <Badge variant="outline" className="text-[10px] px-1.5">
                          {product.color}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        className="w-full mt-2 text-xs h-7"
                        onClick={() => navigate("find")}
                        data-ocid={`products.${idx + 1}.primary_button`}
                      >
                        ADD TO CART
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="mt-8 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("find")}
                data-ocid="discovery.view_all.button"
                className="tracking-wider"
              >
                VIEW ALL COLLECTIONS <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="bg-card border-y border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
            Shop From India's Best Platforms
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {[
              { name: "Myntra", color: "#FF3F6C" },
              { name: "Amazon Fashion", color: "#FF9900" },
              { name: "Flipkart", color: "#2874F0" },
              { name: "Ajio", color: "#5A0064" },
              { name: "Meesho", color: "#9B1FE8" },
            ].map((p) => (
              <div
                key={p.name}
                className="font-bold text-lg md:text-xl"
                style={{ color: p.color }}
              >
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
