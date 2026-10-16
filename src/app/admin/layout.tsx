import type { Metadata } from "next";

import AdminSidebar from "@/components/admin/AdminSidebar";
import ProtectedRoute from "@/components/auth/protected-route";

export const metadata: Metadata = {
  title: "Admin Dashboard | TechNova",
  description: "TechNova admin dashboard management console",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <div className="min-h-screen bg-slate-50/50">
        <div className="flex min-h-screen">
          {/* Desktop Fixed Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <AdminSidebar />
          </aside>

          {/* Main Content Area */}
          <div className="flex min-w-0 flex-1 flex-col">
            <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
