import { Button } from "@/components/ui/button";
import { Camera, Loader2, Upload, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

const SIMILAR_OUTFITS = [
  {
    id: 1,
    title: "Bridal Red Lehenga Set",
    brand: "Biba",
    price: 3499,
    originalPrice: 5999,
    discount: 42,
    platform: "Myntra",
    platformColor: "#FF3F6C",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=70",
  },
  {
    id: 2,
    title: "Embroidered Anarkali Suit",
    brand: "W for Woman",
    price: 2199,
    originalPrice: 3499,
    discount: 37,
    platform: "Amazon",
    platformColor: "#FF9900",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=300&q=70",
  },
  {
    id: 3,
    title: "Pink Sharara Set Couple",
    brand: "Fabindia",
    price: 4299,
    originalPrice: 6499,
    discount: 34,
    platform: "Flipkart",
    platformColor: "#2874F0",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4a46?w=300&q=70",
  },
  {
    id: 4,
    title: "Chanderi Silk Kurta Set",
    brand: "Manyavar",
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    platform: "Ajio",
    platformColor: "#E31837",
    image:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&q=70",
  },
  {
    id: 5,
    title: "Floral Twinning Co-ord Set",
    brand: "Global Desi",
    price: 1599,
    originalPrice: 2499,
    discount: 36,
    platform: "Meesho",
    platformColor: "#9B2CE8",
    image:
      "https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=300&q=70",
  },
  {
    id: 6,
    title: "Banarasi Silk Couple Combo",
    brand: "Ethnix",
    price: 5299,
    originalPrice: 7999,
    discount: 34,
    platform: "Myntra",
    platformColor: "#FF3F6C",
    image:
      "https://images.unsplash.com/photo-1603161222-79a5509e7aa8?w=300&q=70",
  },
];

interface PhotoSearchProps {
  navigate: (page: "find") => void;
}

export default function PhotoSearch({ navigate }: PhotoSearchProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setLoading(true);
      setResults(false);
      setTimeout(() => {
        setLoading(false);
        setResults(true);
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  };

  const reset = () => {
    setPreview(null);
    setLoading(false);
    setResults(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <section
      className="py-14 px-4 bg-gradient-to-b from-white to-pink-50"
      data-ocid="photo_search.section"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-500 font-semibold mb-2">
            ✦ AI Visual Search ✦
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Upload a Photo &amp; Find Similar Outfits
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Saw an outfit you loved? Upload it and we'll find matching styles
            across 5 platforms.
          </p>
        </div>

        {!preview && (
          <label
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="block border-2 border-dashed border-pink-200 rounded-3xl p-10 text-center bg-white hover:border-pink-400 transition-colors cursor-pointer max-w-lg mx-auto"
            data-ocid="photo_search.dropzone"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-pink-50 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-pink-400" />
            </div>
            <p className="font-semibold text-gray-700 mb-1">
              Drag & drop an outfit photo
            </p>
            <p className="text-sm text-gray-400 mb-4">
              or click to browse from your device
            </p>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-pink-300 text-pink-600 hover:bg-pink-50"
              data-ocid="photo_search.upload_button"
            >
              <Upload className="w-3.5 h-3.5 mr-1.5" /> Choose Photo
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </label>
        )}

        <AnimatePresence>
          {preview && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-5xl mx-auto"
            >
              {/* Preview + Status */}
              <div className="flex items-start gap-5 mb-8 p-5 bg-white rounded-2xl shadow-md border border-pink-100 max-w-lg mx-auto">
                <img
                  src={preview}
                  alt="Uploaded outfit"
                  className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 mb-1">
                    Your uploaded outfit
                  </p>
                  {loading && (
                    <div
                      className="flex items-center gap-2 text-pink-500 text-sm"
                      data-ocid="photo_search.loading_state"
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Finding similar outfits...</span>
                    </div>
                  )}
                  {results && (
                    <p
                      className="text-sm text-green-600 font-medium"
                      data-ocid="photo_search.success_state"
                    >
                      ✓ Found 6 similar outfits
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  data-ocid="photo_search.close_button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Similar Outfit Results */}
              {results && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="font-bold text-lg text-gray-900 mb-5 text-center">
                    Similar Outfits Found
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {SIMILAR_OUTFITS.map((outfit) => (
                      <div
                        key={outfit.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow"
                        data-ocid={`photo_search.item.${outfit.id}`}
                      >
                        <div className="relative">
                          <img
                            src={outfit.image}
                            alt={outfit.title}
                            className="w-full h-40 object-cover"
                            loading="lazy"
                          />
                          <span
                            className="absolute top-2 right-2 text-white text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: outfit.platformColor }}
                          >
                            {outfit.platform}
                          </span>
                          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            -{outfit.discount}%
                          </span>
                        </div>
                        <div className="p-3">
                          <p className="text-xs text-gray-400 font-medium mb-0.5">
                            {outfit.brand}
                          </p>
                          <p className="text-sm font-semibold text-gray-800 leading-tight mb-2 line-clamp-2">
                            {outfit.title}
                          </p>
                          <div className="flex items-baseline gap-1.5 mb-2">
                            <span className="font-bold text-gray-900">
                              ₹{outfit.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              ₹{outfit.originalPrice.toLocaleString()}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => navigate("find")}
                            className="w-full text-white text-xs font-bold py-1.5 rounded-full transition-opacity hover:opacity-90"
                            style={{
                              background:
                                "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)",
                            }}
                            data-ocid="photo_search.secondary_button"
                          >
                            View Similar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
