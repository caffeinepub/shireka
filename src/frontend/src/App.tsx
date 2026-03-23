import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { WishlistProvider } from "./contexts/WishlistContext";
import FindPage from "./pages/FindPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ResultsPage from "./pages/ResultsPage";
import WishlistPage from "./pages/WishlistPage";

export type Page = "home" | "find" | "results" | "wishlist" | "profile";
export type FindMode = "couple" | "family" | null;

export interface OutfitFinderState {
  members: MemberConfig[];
  occasion: string;
}

export interface MemberConfig {
  id: string;
  label: string;
  gender: string;
  garment: string;
  color: string;
  size: string;
}

export const EMPTY_FINDER_STATE: OutfitFinderState = {
  members: [],
  occasion: "",
};

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [findMode, setFindMode] = useState<FindMode>(null);
  const [finderState, setFinderState] =
    useState<OutfitFinderState>(EMPTY_FINDER_STATE);

  const navigate = (p: Page, mode?: FindMode) => {
    if (p === "find" && mode !== undefined) setFindMode(mode);
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <WishlistProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar currentPage={page} navigate={(p) => navigate(p)} />
        <main className="flex-1">
          {page === "home" && <HomePage navigate={navigate} />}
          {page === "find" && (
            <FindPage
              navigate={(p) => navigate(p)}
              initialMode={findMode}
              onSearch={(state) => {
                setFinderState(state);
                navigate("results");
              }}
            />
          )}
          {page === "results" && (
            <ResultsPage
              navigate={(p) => navigate(p)}
              finderState={finderState}
            />
          )}
          {page === "wishlist" && (
            <WishlistPage navigate={(p) => navigate(p)} />
          )}
          {page === "profile" && <ProfilePage navigate={(p) => navigate(p)} />}
        </main>
        <Footer navigate={(p) => navigate(p)} />
        <Toaster />
      </div>
    </WishlistProvider>
  );
}
