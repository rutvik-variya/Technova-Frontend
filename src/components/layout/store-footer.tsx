import Link from "next/link";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Container from "./container";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <Container>
        {/* Newsletter Section */}
        <div className="border-b border-slate-800 py-10">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h3 className="text-xl font-bold text-white">
                Join TechNova Newsletter
              </h3>
              <p className="text-xs text-slate-400">
                Get updates on flash sales, new product drops & tech news.
              </p>
            </div>

            <div className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
              <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                Subscribe <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-black tracking-tight text-white">
              Tech<span className="text-blue-500">Nova</span>
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Your premier destination for high-performance computing, mobile
              tech, and accessories. Experience authentic gadgets backed by
              official warranty.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Categories
            </h4>
            <div className="mt-4 space-y-2.5 text-xs text-slate-400">
              <Link
                href="/products?category=laptops"
                className="block hover:text-white"
              >
                Laptops & PCs
              </Link>
              <Link
                href="/products?category=mobiles"
                className="block hover:text-white"
              >
                Smartphones
              </Link>
              <Link
                href="/products?category=tablets"
                className="block hover:text-white"
              >
                Tablets & iPads
              </Link>
              <Link
                href="/products?category=accessories"
                className="block hover:text-white"
              >
                Computer Accessories
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Customer Support
            </h4>
            <div className="mt-4 space-y-2.5 text-xs text-slate-400">
              <Link href="/orders" className="block hover:text-white">
                Track Order
              </Link>
              <Link href="/wishlist" className="block hover:text-white">
                My Wishlist
              </Link>
              <Link href="/profile" className="block hover:text-white">
                Account Info
              </Link>
              <Link href="/help" className="block hover:text-white">
                Return & Refund Policy
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact Us
            </h4>
            <div className="mt-4 space-y-3 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" /> Tech Hub, Silicon
                Valley, India
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-500" /> +91 98765 43210
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-500" /> support@technova.com
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
          © 2026 TechNova Store. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
