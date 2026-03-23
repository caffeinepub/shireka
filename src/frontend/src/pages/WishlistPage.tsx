import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import type { Page } from "../App";
import { useWishlistContext } from "../contexts/WishlistContext";

interface WishlistPageProps {
  navigate: (p: Page) => void;
}

export default function WishlistPage({ navigate }: WishlistPageProps) {
  const { combos, removeCombo } = useWishlistContext();

  const handleRemove = (id: string) => {
    removeCombo(id);
    toast.success("Removed from wishlist");
  };

  const totalItems = combos.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <div className="min-h-screen py-12" data-ocid="wishlist.page">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-1">
            My Collection
          </p>
          <h1 className="font-display text-4xl font-bold flex items-center gap-3">
            <Heart className="w-8 h-8 fill-red-500 text-red-500" /> Wishlist
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {combos.length} outfit combo
            {combos.length !== 1 ? "s" : ""}
            {combos.length > 0 && <> &middot; {totalItems} member pieces</>}
          </p>
        </div>

        {combos.length === 0 ? (
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
          <AnimatePresence>
            <div className="space-y-6">
              {combos.map((combo, idx) => (
                <motion.div
                  key={combo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: idx * 0.06 }}
                  className="bg-card border border-border rounded-lg overflow-hidden"
                  data-ocid={`wishlist.item.${idx + 1}`}
                >
                  <div className="p-4 flex items-center justify-between border-b border-border">
                    <div>
                      <h3 className="font-semibold text-base">{combo.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {combo.occasion}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {combo.items.length} member
                          {combo.items.length !== 1 ? "s" : ""}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          &middot;{" "}
                          {new Date(combo.addedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
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
                        onClick={() => handleRemove(combo.id)}
                        className="text-destructive hover:text-destructive/80 p-2 transition-colors"
                        data-ocid={`wishlist.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {combo.items.map((item, mIdx) => (
                      <div
                        key={item.id}
                        className="group"
                        data-ocid={`wishlist.product.item.${mIdx + 1}`}
                      >
                        <div className="relative aspect-[4/5] rounded overflow-hidden mb-2 bg-muted">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.fullName}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl">
                              👕
                            </div>
                          )}
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          {item.memberLabel}
                        </p>
                        <p className="text-xs font-semibold line-clamp-1">
                          {item.fullName}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Size: {item.size}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
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
