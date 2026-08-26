import type { Metadata } from "next";

import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TechNova",
    template: "%s | TechNova",
  },
  description: "TechNova - Shop laptops, mobiles, tablets and electronics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">{children}</main>

            <Footer />
          </div>

          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
