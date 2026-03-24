import { Star } from "lucide-react";
import { motion } from "motion/react";

const TESTIMONIALS = [
  {
    initials: "PS",
    name: "Priya S.",
    city: "Mumbai",
    gradient: "from-pink-400 to-rose-500",
    quote:
      "Found matching outfits for our whole family in just 5 minutes! Saved ₹800 by comparing prices across platforms.",
    stars: 5,
  },
  {
    initials: "RS",
    name: "Rahul & Sneha",
    city: "Delhi",
    gradient: "from-orange-400 to-pink-500",
    quote:
      "Best app for couple twinning. The price comparison is so useful — we always find the best deal instantly!",
    stars: 5,
  },
  {
    initials: "AK",
    name: "Anjali K.",
    city: "Bengaluru",
    gradient: "from-purple-400 to-pink-400",
    quote:
      "My kids absolutely loved their matching outfits. The smart search suggestions made finding the perfect look effortless!",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 bg-white" data-ocid="testimonials.section">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-500 font-semibold mb-2">
            ✦ Real Stories ✦
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Loved by Families Across India
          </h2>
          <p className="text-gray-500 text-base">
            Join 1000+ happy families finding their perfect twinning looks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.city}</p>
                </div>
              </div>

              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].slice(0, t.stars).map((si) => (
                  <Star
                    key={si}
                    className="w-4 h-4 fill-pink-400 text-pink-400"
                  />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                "{t.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
