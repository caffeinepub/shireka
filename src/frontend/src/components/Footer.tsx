import { Facebook, Flower2, Instagram, Youtube } from "lucide-react";
import { SiPinterest } from "react-icons/si";
import type { Page } from "../App";

interface FooterProps {
  navigate: (p: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-secondary border-t border-border pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Wordmark */}
          <div>
            <button
              type="button"
              onClick={() => navigate("home")}
              className="font-display text-4xl font-bold tracking-wide"
            >
              <img
                src="/assets/generated/shireka-fashion-logo-transparent.dim_400x120.png"
                alt="Shireka Fashion"
                className="h-12 object-contain"
              />
            </button>
            <p className="text-sm text-muted-foreground mt-3 max-w-xs">
              India's premier destination for twinning outfits — couples,
              families, and kids all dressed in perfect harmony.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-xs tracking-widest uppercase mb-4">
              Links
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button
                  type="button"
                  className="hover:text-foreground transition-colors"
                >
                  Customer Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-foreground transition-colors"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-foreground transition-colors"
                >
                  Size Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-foreground transition-colors"
                >
                  Returns &amp; Exchange
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-foreground transition-colors"
                  onClick={() => navigate("find")}
                >
                  Outfit Finder
                </button>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-xs tracking-widest uppercase mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded border border-border hover:bg-background transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded border border-border hover:bg-background transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded border border-border hover:bg-background transition-colors"
                aria-label="Pinterest"
              >
                <SiPinterest className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded border border-border hover:bg-background transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              <p>#ShirekaFashionTwinning</p>
              <p>#MatchingOutfits</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-xs tracking-widest uppercase mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get style inspiration and exclusive deals straight to your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-background border border-border rounded-l px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-foreground"
                data-ocid="footer.input"
              />
              <button
                type="button"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-r text-sm font-semibold hover:opacity-90 transition-opacity"
                data-ocid="footer.submit_button"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© {year} Shireka Fashion. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
