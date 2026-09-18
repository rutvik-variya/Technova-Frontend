import Header from "./store-header";
import Footer from "./store-footer";
import MobileMenu from "./mobile-menu";
import { WishlistSync } from "../wishlist/wishlist-sync";

interface StoreShellProps {
  children: React.ReactNode;
}

export default function StoreShell({ children }: StoreShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <WishlistSync />
      <Header />
      <MobileMenu />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
