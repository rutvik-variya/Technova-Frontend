import Link from "next/link";
import Container from "./container";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl"
          >
            Tech<span className="text-blue-600">Nova</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Shop
            </Link>

            <Link
              href="/wishlist"
              className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Wishlist
            </Link>

            <Link
              href="/orders"
              className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
            >
              Orders
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="hidden text-sm font-medium text-gray-700 hover:text-blue-600 sm:block"
            >
              Account
            </Link>

            <Link
              href="/cart"
              className="relative rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Cart
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="rounded-lg border border-gray-200 p-2 md:hidden"
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
