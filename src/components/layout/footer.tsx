import Link from "next/link";
import Container from "./container";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-white">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold">
              Tech<span className="text-blue-400">Nova</span>
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Your trusted destination for laptops, mobiles, accessories and
              electronics.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Shop</h4>

            <div className="mt-4 space-y-3 text-sm text-gray-400">
              <Link href="/products" className="block hover:text-white">
                All Products
              </Link>

              <Link href="/products" className="block hover:text-white">
                Laptops & PC
              </Link>

              <Link href="/products" className="block hover:text-white">
                Mobile & Tablets
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Account</h4>

            <div className="mt-4 space-y-3 text-sm text-gray-400">
              <Link href="/profile" className="block hover:text-white">
                Profile
              </Link>

              <Link href="/orders" className="block hover:text-white">
                Orders
              </Link>

              <Link href="/wishlist" className="block hover:text-white">
                Wishlist
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Support</h4>

            <div className="mt-4 space-y-3 text-sm text-gray-400">
              <p>support@technova.com</p>
              <p>+91 00000 00000</p>
              <p>India</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
          © 2026 TechNova. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
