import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { GoogleMapsIcon } from "@/components/GoogleMapsIcon";
import { GradientBackdrop } from "./GradientBackdrop";

export function Footer() {
  return (
    <footer className="relative overflow-hidden text-primary-foreground">
      <GradientBackdrop variant="footer" />
      <div className="relative max-w-7xl mx-auto px-4 py-8 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <Logo light />
          <p className="text-sm text-white/75 max-w-sm">
            Professional same-day repairs for phones, laptops, tablets and electronic devices in
            Nuneaton. Fast service, quality parts, fair prices.
          </p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-white/20 transition-colors"
                aria-label="Social link"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/75">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link to="/accessories" className="hover:text-white">
                Accessories
              </Link>
            </li>
            <li>
              <Link to="/buy-and-sell" className="hover:text-white">
                Buy & Sell
              </Link>
            </li>
            <li>
              {/* About page removed */}
            </li>
            <li>
              <Link to="/book" className="hover:text-white">
                Book Repair
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-white">Our Services</h4>
          <ul className="space-y-2 text-sm text-white/75">
            <li>Phone Repair</li>
            <li>Laptop Repair</li>
            <li>Tablet Repair</li>
            <li>Phone Unlocking</li>
            <li>Accessories</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-white">Contact Us</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-0.5 shrink-0" /> 07415 278767
            </li>
            <li className="flex items-start gap-2">
              <GoogleMapsIcon className="w-5 h-5 mt-0.5 shrink-0" /> 6 Harefield Road, Nuneaton, CV11 4HD
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 mt-4 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 text-xs text-white flex items-center justify-between flex-wrap gap-2">
          <span>© 2026 Express Phone & Laptop Repair. All rights reserved.</span>
          <span className="flex gap-4">
            <a href="#" className="hover:text-white"></a>
            <a href="#" className="hover:text-white"></a>
          </span>
        </div>
      </div>
    </footer>
  );
}
