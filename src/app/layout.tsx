import type { Metadata } from "next";

import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";

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
          {children}
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
