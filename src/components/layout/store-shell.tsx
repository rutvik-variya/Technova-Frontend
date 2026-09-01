import Header from "./store-header";
import Footer from "./store-footer";
import MobileMenu from "./mobile-menu";

interface StoreShellProps {
  children: React.ReactNode;
}

export default function StoreShell({ children }: StoreShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <MobileMenu />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
