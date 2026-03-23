import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface WishlistOutfitItem {
  id: string;
  memberLabel: string;
  garment: string;
  color: string;
  size: string;
  styleName: string;
  fullName: string;
  lowestPrice: number;
  cheapestPlatform: string;
  imageUrl: string;
  platforms: Array<{
    id: string;
    label: string;
    price: number;
    buyUrl: string;
  }>;
}

export interface WishlistCombo {
  id: string;
  name: string;
  occasion: string;
  items: WishlistOutfitItem[];
  addedAt: number;
}

interface WishlistContextType {
  combos: WishlistCombo[];
  addCombo: (combo: Omit<WishlistCombo, "id" | "addedAt">) => void;
  removeCombo: (id: string) => void;
  isInWishlist: (comboName: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

const STORAGE_KEY = "shireka_wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [combos, setCombos] = useState<WishlistCombo[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combos));
  }, [combos]);

  const addCombo = useCallback(
    (combo: Omit<WishlistCombo, "id" | "addedAt">) => {
      const newCombo: WishlistCombo = {
        ...combo,
        id: `combo_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        addedAt: Date.now(),
      };
      setCombos((prev) => [newCombo, ...prev]);
    },
    [],
  );

  const removeCombo = useCallback((id: string) => {
    setCombos((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const isInWishlist = useCallback(
    (comboName: string) => combos.some((c) => c.name === comboName),
    [combos],
  );

  return (
    <WishlistContext.Provider
      value={{
        combos,
        addCombo,
        removeCombo,
        isInWishlist,
        count: combos.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const ctx = useContext(WishlistContext);
  if (!ctx)
    throw new Error("useWishlistContext must be used inside WishlistProvider");
  return ctx;
}
