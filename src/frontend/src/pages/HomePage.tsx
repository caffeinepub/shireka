import { PlatformTrustStrip } from "@/components/PlatformTrustStrip";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Filter,
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { FindMode, Page } from "../App";
import PhotoSearch from "../components/PhotoSearch";
import SmartSearchBar from "../components/SmartSearchBar";
import Testimonials from "../components/Testimonials";
import TwinningLooksSuggestions from "../components/TwinningLooksSuggestions";
import { COLORS, MOCK_PRODUCTS, OCCASIONS } from "../data/products";

interface HomePageProps {
  navigate: (p: Page, mode?: FindMode) => void;
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

const BOY_BABY_CATEGORIES = [
  "Onesies & Rompers",
  "Sets & Suits",
  "T-Shirts & Bodysuits",
  "Shorts & Pants",
  "Ethnic Wear",
  "Sleepwear & Nightsuits",
  "Dungarees & Jumpsuits",
  "Swimwear",
  "Winterwear",
  "Party Wear",
];

const GIRL_BABY_CATEGORIES = [
  "Frocks & Dresses",
  "Onesies & Rompers",
  "Sets & Suits",
  "Tops & Bodysuits",
  "Ethnic Wear",
  "Sleepwear & Nightsuits",
  "Dungarees & Jumpsuits",
  "Swimwear",
  "Winterwear",
  "Party Wear",
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
  categories: string[];
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
  onClick,
  ocid,
}: KidsCardProps) {
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
        className="relative h-[80vh] min-h-[560px] overflow-hidden"
        data-ocid="hero.section"
      >
        <img
          src="/assets/generated/hero-twinning-bg.dim_1600x900.jpg"
          alt="Family twinning outfits"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <p className="text-white/70 text-xs tracking-[0.3em] uppercase mb-3">
                India&apos;s #1 Twinning Platform
              </p>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-5">
                Find Perfect Twinning Outfits Instantly
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-5 leading-relaxed font-medium">
                Compare prices from Myntra, Amazon, Ajio, Flipkart &amp; Meesho
              </p>
              <div className="mb-6">
                <SmartSearchBar
                  onSearch={() => navigate("find")}
                  variant="hero"
                  className="w-full max-w-xl"
                />
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  👗 500+ Outfit Styles
                </span>
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  🛒 5 Platforms Compared
                </span>
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  💰 Best Price Guaranteed
                </span>
              </div>
              <Button
                size="lg"
                className="w-full sm:w-auto text-white font-black text-xl px-12 py-7 rounded-full tracking-wide transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95 border-0"
                style={{
                  background: "#AD1457",
                  boxShadow:
                    "0 8px 30px rgba(173,20,87,0.55), 0 2px 8px rgba(0,0,0,0.25)",
                }}
                onClick={() => navigate("find")}
                data-ocid="hero.primary_button"
              >
                🛍️ Find My Outfit
              </Button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("photo-search-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-3 w-full sm:w-auto block text-white/80 text-sm font-medium hover:text-white transition-colors underline underline-offset-2"
                data-ocid="hero.secondary_button"
              >
                📷 Upload Photo &amp; Find Similar
              </button>
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

      {/* Category Cards Section */}
      <section
        className="py-14 px-4 bg-pink-50"
        data-ocid="categories_browse.section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-pink-500 font-semibold mb-2">
              ✦ Explore Collections ✦
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Browse by Category
            </h2>
            <p className="text-gray-500 text-base">
              Choose your twinning style and compare prices instantly
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                label: "Couples",
                emoji: "👫",
                img: "/assets/generated/category-couples.dim_600x400.jpg",
                ocid: "browse_couples",
              },
              {
                label: "Family",
                emoji: "👨‍👩‍👧",
                img: "/assets/generated/category-family.dim_600x400.jpg",
                ocid: "browse_family",
              },
              {
                label: "Kids",
                emoji: "🧒",
                img: "/assets/generated/category-kids.dim_600x400.jpg",
                ocid: "browse_kids",
              },
              {
                label: "Friends",
                emoji: "🤝",
                img: "/assets/generated/category-friends.dim_600x400.jpg",
                ocid: "browse_friends",
              },
            ].map((cat) => (
              <div
                key={cat.label}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                data-ocid={`${cat.ocid}.card`}
              >
                <div className="overflow-hidden h-48">
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-4 flex flex-col items-center gap-3 flex-1 justify-between">
                  <h3 className="font-bold text-gray-900 text-lg tracking-tight">
                    {cat.emoji} {cat.label}
                  </h3>
                  <button
                    type="button"
                    className="w-full text-white font-extrabold text-sm py-2.5 px-4 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-md border-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)",
                    }}
                    onClick={() => navigate("find")}
                    data-ocid={`${cat.ocid}.button`}
                  >
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Search Section */}
      <div id="photo-search-section">
        <PhotoSearch navigate={(p) => navigate(p)} />
      </div>

      {/* Trust Section */}
      <section
        className="py-12 px-4 bg-white border-y border-gray-100"
        data-ocid="trust.section"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <p className="text-xs tracking-[0.3em] uppercase text-pink-500 font-semibold mb-2">
              ✦ Social Proof ✦
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              Trusted by 1000+ Users
            </h2>
            <p className="text-gray-500 text-base">
              Shop identical outfits. Compare prices instantly.
            </p>
          </div>

          {/* Platform Pills */}
          <div
            className="flex flex-wrap justify-center gap-3 mb-8"
            data-ocid="trust.panel"
          >
            {[
              { name: "Amazon", color: "#FF9900", bg: "#FFF8EC", icon: "🛒" },
              { name: "Myntra", color: "#FF3F6C", bg: "#FFF0F3", icon: "👗" },
              { name: "Flipkart", color: "#2874F0", bg: "#EEF4FF", icon: "🛍️" },
              { name: "Ajio", color: "#E31837", bg: "#FFF0F2", icon: "🏷️" },
              { name: "Meesho", color: "#9B2CE8", bg: "#F5EEFF", icon: "✨" },
            ].map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base shadow-md transition-transform hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: p.bg,
                  color: p.color,
                  border: `2px solid ${p.color}55`,
                }}
                data-ocid="trust.item"
              >
                <span>{p.icon}</span>
                <span>{p.name}</span>
              </div>
            ))}
          </div>

          {/* Stats Row */}
          <div
            className="flex flex-wrap justify-center gap-8"
            data-ocid="trust.row"
          >
            {[
              { value: "500+", label: "Brands" },
              { value: "5", label: "Platforms" },
              { value: "1000+", label: "Happy Users" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-extrabold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* How It Works Section */}
      <section
        className="py-16 px-4 bg-pink-50"
        data-ocid="how_it_works.section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-pink-500 font-semibold mb-2">
              ✦ Simple Process ✦
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Find Your Perfect Twinning Outfit in{" "}
              <span className="text-[#F9A8C9]">3 Simple Steps</span>
            </h2>
          </div>
          <div className="relative flex flex-col md:flex-row gap-8 items-stretch">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-1/3 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 border-t-2 border-dashed border-pink-200 z-0" />
            {[
              {
                icon: <Users className="w-10 h-10 text-pink-500" />,
                step: 1,
                title: "Select Occasion & People",
                desc: "Choose your occasion (Wedding, Casual, Party) and add family members or your partner",
              },
              {
                icon: <SlidersHorizontal className="w-10 h-10 text-pink-500" />,
                step: 2,
                title: "Apply Filters",
                desc: "Filter by color, size, budget, brand, and outfit type to narrow down the perfect look",
              },
              {
                icon: <ShoppingBag className="w-10 h-10 text-pink-500" />,
                step: 3,
                title: "Get Matching Outfits",
                desc: "Browse 500+ matching outfit styles with price comparison across Myntra, Amazon, Flipkart, Ajio & Meesho",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: item.step * 0.12 }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 32px rgba(236,72,153,0.12)",
                }}
                className="relative flex-1 bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center z-10 cursor-default border border-pink-50"
              >
                {/* Step number badge */}
                <span
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center shadow-md"
                  style={{
                    background: "var(--color-pink)",
                    color: "var(--color-black)",
                  }}
                >
                  {item.step}
                </span>
                {/* Icon circle */}
                <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center mb-5 mt-2">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Twinning Mode Section */}
      <section className="bg-white py-14 px-4" data-ocid="twinning.section">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase font-semibold text-black mb-2">
            ✦ Start Your Twinning Journey ✦
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Choose Your Twinning Style
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Select members, pick matching outfits in your favorite color, and
            compare prices across 5 Indian shopping platforms — all in one
            place.
          </p>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("find", "couple")}
            data-ocid="twinning.couple.button"
            className="group relative overflow-hidden rounded-3xl bg-[#F9A8C9] text-white shadow-2xl shadow-pink-200 p-8 text-left flex flex-col gap-4 cursor-pointer border-0"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl backdrop-blur-sm">
              💑
            </div>
            <div>
              <h3 className="text-2xl font-extrabold tracking-wide mb-1">
                Couple Twinning ❤️
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Find perfectly coordinated outfits for you and your partner. Men
                & Women options with matching colors and styles.
              </p>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm font-semibold">
              <Heart className="w-4 h-4" />
              Men · Women options
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500" />
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("find", "family")}
            data-ocid="twinning.family.button"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white shadow-2xl shadow-gray-300 p-8 text-left flex flex-col gap-4 cursor-pointer border-0"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl backdrop-blur-sm">
              👨‍👩‍👧‍👦
            </div>
            <div>
              <h3 className="text-2xl font-extrabold tracking-wide mb-1">
                Family Twinning 👨‍👩‍👧
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Dress your whole family in coordinated outfits. Add men, women,
                boys, girls, and babies — up to 8 members.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-white/90 text-xs font-medium">
              <Users className="w-3.5 h-3.5" />
              Men · Women · Boys · Girls · Baby Boy · Baby Girl
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500" />
          </motion.button>
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
                  <div className={`relative ${imgHeight} overflow-hidden`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${item.overlayGradient} via-transparent to-transparent opacity-70`}
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div
                      className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-300/60 transition-all duration-500"
                      style={{
                        boxShadow: "inset 0 0 0 0",
                        transition: "box-shadow 0.5s",
                      }}
                    />
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
              className="w-full sm:w-auto font-bold tracking-widest px-10 py-5 text-sm rounded-full shadow-xl"
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

      {/* AI Twinning Suggestions */}
      <TwinningLooksSuggestions />

      {/* Trending Twinning Outfits */}
      <section className="py-16 bg-white px-4" data-ocid="trending.section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
              Trending Twinning Outfits 🔥
            </h2>
            <p className="text-gray-600 text-base">
              Most loved matching outfits this season
            </p>
            <PlatformTrustStrip className="mt-3" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(
              [
                {
                  image: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)",
                  title: "Fabindia Couple Kurta Set — Deep Orange & Rose",
                  price: 1299,
                  originalPrice: 1799,
                  discountPercent: 28,
                  platform: "Amazon" as const,
                  platformPrices: [
                    { platform: "Ajio" as const, price: 1349 },
                    { platform: "Amazon" as const, price: 1299 },
                    { platform: "Flipkart" as const, price: 1399 },
                    { platform: "Meesho" as const, price: 1199 },
                    { platform: "Myntra" as const, price: 1449 },
                  ],
                },
                {
                  image: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                  title: "W for Woman Family Ethnic Combo — Mustard Yellow",
                  price: 2199,
                  originalPrice: 2999,
                  discountPercent: 27,
                  platform: "Ajio" as const,
                  platformPrices: [
                    { platform: "Ajio" as const, price: 2199 },
                    { platform: "Amazon" as const, price: 2399 },
                    { platform: "Flipkart" as const, price: 2299 },
                    { platform: "Myntra" as const, price: 2499 },
                  ],
                },
                {
                  image: "linear-gradient(135deg, #facc15 0%, #fb923c 100%)",
                  title: "Global Desi Sibling Twinning Set — Sunshine Yellow",
                  price: 899,
                  originalPrice: 1299,
                  discountPercent: 31,
                  platform: "Meesho" as const,
                  platformPrices: [
                    { platform: "Amazon" as const, price: 999 },
                    { platform: "Flipkart" as const, price: 949 },
                    { platform: "Meesho" as const, price: 899 },
                    { platform: "Myntra" as const, price: 1099 },
                  ],
                },
                {
                  image: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
                  title: "Biba Matching Lehenga Duo — Deep Crimson Red",
                  price: 3299,
                  originalPrice: 4999,
                  discountPercent: 34,
                  platform: "Myntra" as const,
                  platformPrices: [
                    { platform: "Ajio" as const, price: 3199 },
                    { platform: "Amazon" as const, price: 3499 },
                    { platform: "Flipkart" as const, price: 3399 },
                    { platform: "Meesho" as const, price: 2999 },
                    { platform: "Myntra" as const, price: 3299 },
                  ],
                },
              ] as {
                image: string;
                title: string;
                price: number;
                originalPrice: number;
                discountPercent: number;
                platform: "Amazon" | "Myntra" | "Flipkart" | "Ajio" | "Meesho";
                platformPrices: {
                  platform:
                    | "Amazon"
                    | "Myntra"
                    | "Flipkart"
                    | "Ajio"
                    | "Meesho";
                  price: number;
                }[];
              }[]
            ).map((item, idx) => (
              <div key={item.title} data-ocid={`trending.item.${idx + 1}`}>
                <ProductCard
                  {...item}
                  ocidSuffix={`trending_${idx + 1}`}
                  tag={idx % 2 === 0 ? "Trending" : "Best Match"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Special */}
      <section className="py-16 bg-pink-50 px-4" data-ocid="wedding.section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
              Wedding Special 💍
            </h2>
            <p className="text-gray-600 text-base">
              Coordinated bridal and festive wear for the whole family
            </p>
            <PlatformTrustStrip className="mt-3" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(
              [
                {
                  image: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
                  title: "Sabyasachi Style Bridal Lehenga Pair — Deep Pink",
                  price: 7499,
                  originalPrice: 12999,
                  discountPercent: 42,
                  platform: "Myntra" as const,
                  platformPrices: [
                    { platform: "Ajio" as const, price: 7799 },
                    { platform: "Amazon" as const, price: 7999 },
                    { platform: "Flipkart" as const, price: 7699 },
                    { platform: "Meesho" as const, price: 6999 },
                    { platform: "Myntra" as const, price: 7499 },
                  ],
                },
                {
                  image: "linear-gradient(135deg, #f43f5e 0%, #db2777 100%)",
                  title: "Manyavar Sherwani & Kurta Couple Set — Royal Red",
                  price: 5999,
                  originalPrice: 8999,
                  discountPercent: 33,
                  platform: "Flipkart" as const,
                  platformPrices: [
                    { platform: "Ajio" as const, price: 6299 },
                    { platform: "Amazon" as const, price: 6499 },
                    { platform: "Flipkart" as const, price: 5999 },
                    { platform: "Myntra" as const, price: 6199 },
                  ],
                },
                {
                  image: "linear-gradient(135deg, #c026d3 0%, #ec4899 100%)",
                  title: "Kalki Fashion Family Wedding Coordinated Set",
                  price: 12999,
                  originalPrice: 18999,
                  discountPercent: 32,
                  platform: "Ajio" as const,
                  platformPrices: [
                    { platform: "Ajio" as const, price: 12999 },
                    { platform: "Amazon" as const, price: 13499 },
                    { platform: "Flipkart" as const, price: 13999 },
                    { platform: "Meesho" as const, price: 11999 },
                    { platform: "Myntra" as const, price: 13299 },
                  ],
                },
                {
                  image: "linear-gradient(135deg, #f9a8d4 0%, #f43f5e 100%)",
                  title: "Hopscotch Kids Wedding Twinning Outfit — Rose",
                  price: 1899,
                  originalPrice: 2799,
                  discountPercent: 32,
                  platform: "Meesho" as const,
                  platformPrices: [
                    { platform: "Amazon" as const, price: 2099 },
                    { platform: "Flipkart" as const, price: 1999 },
                    { platform: "Meesho" as const, price: 1899 },
                    { platform: "Myntra" as const, price: 2199 },
                  ],
                },
              ] as {
                image: string;
                title: string;
                price: number;
                originalPrice: number;
                discountPercent: number;
                platform: "Amazon" | "Myntra" | "Flipkart" | "Ajio" | "Meesho";
                platformPrices?: {
                  platform:
                    | "Amazon"
                    | "Myntra"
                    | "Flipkart"
                    | "Ajio"
                    | "Meesho";
                  price: number;
                }[];
              }[]
            ).map((item, idx) => (
              <div key={item.title} data-ocid={`wedding.item.${idx + 1}`}>
                <ProductCard
                  {...item}
                  ocidSuffix={`wedding_${idx + 1}`}
                  tag="Best Match"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kids Matching */}
      <section
        className="py-16 bg-sky-50 px-4"
        data-ocid="kids_matching.section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
              Kids Matching 👶
            </h2>
            <p className="text-gray-600 text-base">
              Adorable coordinated outfits for little ones
            </p>
            <PlatformTrustStrip className="mt-3" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(
              [
                {
                  image: "linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)",
                  title: "H&M Brother Sister Ethnic Combo — Sky Blue",
                  price: 799,
                  originalPrice: 1199,
                  discountPercent: 33,
                  platform: "Meesho" as const,
                  platformPrices: [
                    { platform: "Amazon" as const, price: 899 },
                    { platform: "Flipkart" as const, price: 849 },
                    { platform: "Meesho" as const, price: 799 },
                    { platform: "Myntra" as const, price: 949 },
                  ],
                },
                {
                  image: "linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%)",
                  title: "Babyhug Twins Festive Set — Cyan & Teal",
                  price: 1299,
                  originalPrice: 1899,
                  discountPercent: 32,
                  platform: "Flipkart" as const,
                  platformPrices: [
                    { platform: "Ajio" as const, price: 1349 },
                    { platform: "Amazon" as const, price: 1399 },
                    { platform: "Flipkart" as const, price: 1299 },
                    { platform: "Meesho" as const, price: 1199 },
                    { platform: "Myntra" as const, price: 1449 },
                  ],
                },
                {
                  image: "linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)",
                  title: "FirstCry Baby Matching Romper Duo — Powder Blue",
                  price: 599,
                  originalPrice: 899,
                  discountPercent: 33,
                  platform: "Amazon" as const,
                  platformPrices: [
                    { platform: "Amazon" as const, price: 599 },
                    { platform: "Flipkart" as const, price: 649 },
                    { platform: "Meesho" as const, price: 549 },
                    { platform: "Myntra" as const, price: 699 },
                  ],
                },
                {
                  image: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
                  title: "Cute Walk Kids Festive Twinning Set — Indigo",
                  price: 1899,
                  originalPrice: 2699,
                  discountPercent: 30,
                  platform: "Ajio" as const,
                  platformPrices: [
                    { platform: "Ajio" as const, price: 1899 },
                    { platform: "Amazon" as const, price: 1999 },
                    { platform: "Flipkart" as const, price: 1949 },
                    { platform: "Meesho" as const, price: 1749 },
                    { platform: "Myntra" as const, price: 2099 },
                  ],
                },
              ] as {
                image: string;
                title: string;
                price: number;
                originalPrice: number;
                discountPercent: number;
                platform: "Amazon" | "Myntra" | "Flipkart" | "Ajio" | "Meesho";
                platformPrices?: {
                  platform:
                    | "Amazon"
                    | "Myntra"
                    | "Flipkart"
                    | "Ajio"
                    | "Meesho";
                  price: number;
                }[];
              }[]
            ).map((item, idx) => (
              <div key={item.title} data-ocid={`kids_matching.item.${idx + 1}`}>
                <ProductCard
                  {...item}
                  ocidSuffix={`kids_${idx + 1}`}
                  tag="Trending"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KIDS Section */}
      <section
        className="py-16 max-w-7xl mx-auto px-4 sm:px-6"
        data-ocid="categories.section"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KidsCard
            title="Boys"
            subtitle="Trendy styles for little gents"
            bgClass="bg-pink-50"
            accentClass="text-black"
            borderClass="border-[#F9A8C9]"
            hoverBgClass="hover:bg-pink-100"
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
            title="Boy Baby"
            subtitle="Sweet styles for baby boys"
            bgClass="bg-sky-50"
            accentClass="text-sky-800"
            borderClass="border-sky-200"
            hoverBgClass="hover:bg-sky-100"
            icon="👶"
            categories={BOY_BABY_CATEGORIES}
            onClick={() => navigate("find")}
            ocid="categories.boy_baby.card"
          />
          <KidsCard
            title="Girl Baby"
            subtitle="Adorable picks for baby girls"
            bgClass="bg-pink-50"
            accentClass="text-black"
            borderClass="border-rose-200"
            hoverBgClass="hover:bg-rose-100"
            icon="👶"
            categories={GIRL_BABY_CATEGORIES}
            onClick={() => navigate("find")}
            ocid="categories.girl_baby.card"
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
            className="w-full sm:w-auto bg-white text-foreground hover:bg-white/90 font-semibold"
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
            COMPARING OUTFIT FOR YOU
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Compare Prices Across 5 Platforms
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop */}
          <aside
            className="hidden lg:block lg:w-56 shrink-0"
            data-ocid="filter.panel"
          >
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
                        loading="lazy"
                        decoding="async"
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
                className="w-full sm:w-auto tracking-wider"
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
