import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Edit2,
  Heart,
  LogOut,
  Package,
  Save,
  Settings,
  User,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Page } from "../App";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useSaveProfile, useUserProfile } from "../hooks/useQueries";

interface ProfilePageProps {
  navigate: (p: Page) => void;
}

const STYLE_OPTIONS = [
  "Traditional",
  "Contemporary",
  "Fusion",
  "Bridal",
  "Casual",
  "Festive",
  "Party",
  "Western",
];

const ORDER_HISTORY = [
  {
    id: "ORD-001",
    date: "15 Feb 2026",
    combo: "Pink Diwali Family Set",
    amount: 3347,
    status: "Delivered",
  },
  {
    id: "ORD-002",
    date: "2 Jan 2026",
    combo: "Blue Wedding Couple",
    amount: 2898,
    status: "Delivered",
  },
  {
    id: "ORD-003",
    date: "20 Dec 2025",
    combo: "Maroon Sherwani Combo",
    amount: 8498,
    status: "Delivered",
  },
];

export default function ProfilePage({ navigate }: ProfilePageProps) {
  const { identity, clear, login, loginStatus } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const { data: profile } = useUserProfile();
  const saveProfileMutation = useSaveProfile();

  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(
    profile?.displayName || "Fashion Lover",
  );
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    profile?.stylePreferences || ["Traditional", "Festive"],
  );

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style],
    );
  };

  const handleSave = async () => {
    try {
      await saveProfileMutation.mutateAsync({
        displayName,
        stylePreferences: selectedStyles,
      });
      toast.success("Profile saved!");
      setEditing(false);
    } catch {
      toast.error("Failed to save profile. Please login first.");
    }
  };

  const principal = identity?.getPrincipal().toString();
  const shortPrincipal = principal
    ? `${principal.slice(0, 8)}...${principal.slice(-5)}`
    : null;

  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        data-ocid="profile.page"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-3">My Profile</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Sign in to save outfit preferences, view order history, and manage
            your wishlist.
          </p>
          <Button
            size="lg"
            onClick={login}
            className="w-full"
            data-ocid="profile.login.button"
          >
            Sign In
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            Powered by Internet Identity
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12" data-ocid="profile.page">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-1">
              My Account
            </p>
            <h1 className="font-display text-4xl font-bold">Profile</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              clear();
              navigate("home");
            }}
            data-ocid="profile.logout.button"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" /> Logout
          </Button>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6 mb-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl">
                👗
              </div>
              <div>
                {editing ? (
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="font-semibold text-lg h-9 mb-1"
                    data-ocid="profile.name.input"
                  />
                ) : (
                  <h2 className="font-semibold text-xl">{displayName}</h2>
                )}
                {shortPrincipal && (
                  <p className="text-xs text-muted-foreground font-mono">
                    {shortPrincipal}
                  </p>
                )}
              </div>
            </div>
            {editing ? (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={saveProfileMutation.isPending}
                  data-ocid="profile.save.button"
                >
                  <Save className="w-3.5 h-3.5 mr-1" />
                  {saveProfileMutation.isPending ? "Saving..." : "Save"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditing(false)}
                  data-ocid="profile.cancel.button"
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditing(true)}
                data-ocid="profile.edit.button"
              >
                <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
              </Button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            {[
              {
                label: "Wishlist",
                value: "3",
                icon: <Heart className="w-4 h-4" />,
              },
              {
                label: "Orders",
                value: "3",
                icon: <Package className="w-4 h-4" />,
              },
              {
                label: "Styles",
                value: String(selectedStyles.length),
                icon: <Settings className="w-4 h-4" />,
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-1 text-muted-foreground">
                  {stat.icon}
                </div>
                <p className="font-bold text-xl">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Style Preferences */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
            Style Preferences
          </h3>
          <div className="flex flex-wrap gap-2">
            {STYLE_OPTIONS.map((style) => (
              <button
                type="button"
                key={style}
                onClick={() => editing && toggleStyle(style)}
                className={`px-3 py-1.5 rounded border text-sm transition-colors ${
                  selectedStyles.includes(style)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:bg-muted"
                } ${!editing ? "cursor-default" : "cursor-pointer"}`}
                data-ocid={`profile.style.${style.toLowerCase()}.toggle`}
              >
                {style}
              </button>
            ))}
          </div>
          {!editing && (
            <p className="text-xs text-muted-foreground mt-3">
              Edit your profile to update style preferences.
            </p>
          )}
        </div>

        {/* Order History */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
            <Package className="w-4 h-4" /> Order History
          </h3>
          <div className="space-y-3">
            {ORDER_HISTORY.map((order, idx) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
                data-ocid={`orders.item.${idx + 1}`}
              >
                <div>
                  <p className="text-sm font-semibold">{order.combo}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.id} · {order.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">
                    ₹{order.amount.toLocaleString()}
                  </p>
                  <Badge variant="outline" className="text-[10px] mt-1">
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-12"
            onClick={() => navigate("wishlist")}
            data-ocid="profile.wishlist.button"
          >
            <Heart className="w-4 h-4 mr-2" /> My Wishlist
          </Button>
          <Button
            variant="outline"
            className="h-12"
            onClick={() => navigate("find")}
            data-ocid="profile.find.button"
          >
            Find Outfits
          </Button>
        </div>
      </div>
    </div>
  );
}
