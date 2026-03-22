import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Page } from "../App";
import { MOCK_PRODUCTS, PLATFORM_COLORS } from "../data/products";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useRemoveWishlistItem, useWishlist } from "../hooks/useQueries";

interface WishlistPageProps {
  navigate: (p: Page) => void;
}

// Static demo wishlist items
const DEMO_WISHLIST = [
  {
    id: 1,
    comboName: "Pink Festive Family Look",
    occasion: "Diwali",
    members: [
      { label: "Man", product: MOCK_PRODUCTS[0] },
      { label: "Woman", product: MOCK_PRODUCTS[6] },
      { label: "Boy Kid", product: MOCK_PRODUCTS[20] },
    ],
  },
  {
    id: 2,
    comboName: "Blue Wedding Couple",
    occasion: "Wedding",
    members: [
      { label: "Man", product: MOCK_PRODUCTS[1] },
      { label: "Woman", product: MOCK_PRODUCTS[7] },
    ],
  },
  {
    id: 3,
    comboName: "Maroon Bridal Family Set",
    occasion: "Wedding",
    members: [
      { label: "Man", product: MOCK_PRODUCTS[17] },
      { label: "Woman", product: MOCK_PRODUCTS[12] },
      { label: "Girl Kid", product: MOCK_PRODUCTS[27] },
    ],
  },
];

export default function WishlistPage({ navigate }: WishlistPageProps) {
  useInternetIdentity();
  const [localWishlist, setLocalWishlist] = useState(DEMO_WISHLIST);

  const removeCombo = (id: number) => {
    setLocalWishlist((prev) => prev.filter((c) => c.id !== id));
    toast.success("Combo removed from wishlist");
  };

  const totalItems = localWishlist.reduce(
    (acc, c) => acc + c.members.length,
    0,
  );

  return (
    <div className="min-h-screen py-12" data-ocid="wishlist.page">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-1">
            My Collection
          </p>
          <h1 className="font-display text-4xl font-bold flex items-center gap-3">
            <Heart className="w-8 h-8" /> Wishlist
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {localWishlist.length} outfit combo
            {localWishlist.length !== 1 ? "s" : ""} · {totalItems} pieces saved
          </p>
        </div>

        {localWishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-card border border-dashed border-border rounded-lg"
            data-ocid="wishlist.empty_state"
          >
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <h3 className="font-display text-xl font-semibold mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Find and save twinning outfit combos for your family
            </p>
            <Button
              onClick={() => navigate("find")}
              data-ocid="wishlist.find.button"
            >
              Find Outfits
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {localWishlist.map((combo, idx) => (
              <motion.div
                key={combo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-border rounded-lg overflow-hidden"
                data-ocid={`wishlist.item.${idx + 1}`}
              >
                <div className="p-4 flex items-center justify-between border-b border-border">
                  <div>
                    <h3 className="font-semibold text-base">
                      {combo.comboName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {combo.occasion}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {combo.members.length} members
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("find")}
                      data-ocid={`wishlist.shop.button.${idx + 1}`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 mr-1" /> Shop Now
                    </Button>
                    <button
                      type="button"
                      onClick={() => removeCombo(combo.id)}
                      className="text-destructive hover:text-destructive/80 p-2 transition-colors"
                      data-ocid={`wishlist.delete_button.${idx + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {combo.members.map((item, mIdx) => (
                    <div
                      key={item.product.id}
                      className="group"
                      data-ocid={`wishlist.product.item.${mIdx + 1}`}
                    >
                      <div className="relative aspect-[4/5] rounded overflow-hidden mb-2">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className="absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded text-white"
                          style={{
                            backgroundColor:
                              PLATFORM_COLORS[item.product.platform] || "#666",
                          }}
                        >
                          {item.product.platform.split(" ")[0]}
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-xs font-semibold line-clamp-1">
                        {item.product.name}
                      </p>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-xs font-bold">
                          ₹{item.product.price.toLocaleString()}
                        </span>
                        <a
                          href={item.product.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] text-muted-foreground hover:text-foreground flex items-center gap-0.5"
                          data-ocid={`wishlist.view.button.${mIdx + 1}`}
                        >
                          View <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 pb-4">
                  <p className="text-xs text-muted-foreground">
                    Total: ₹
                    {combo.members
                      .reduce((acc, m) => acc + m.product.price, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => navigate("find")}
            data-ocid="wishlist.add_more.button"
          >
            + Find More Outfits
          </Button>
        </div>
      </div>
    </div>
  );
}
