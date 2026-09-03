"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogoutButton from "@/components/auth/logout-button";
import Container from "@/components/layout/container";
import Section from "@/components/ui/section";
import {
    User,
    Mail,
    ShieldCheck,
    Package,
    Heart,
    Settings,
    CheckCircle2,
} from "lucide-react";

function ProfileContent() {
    const { data, isLoading } = useCurrentUser();
    const user = data?.data;

    const getInitials = (name) => {
        if (!name) return "TN";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    if (isLoading) {
        return (
            <Section className="py-12">
                <Container>
                    <div className="mx-auto max-w-4xl space-y-6">
                        <div className="h-32 w-full animate-pulse rounded-3xl bg-slate-200" />
                        <div className="h-64 w-full animate-pulse rounded-3xl bg-slate-100" />
                    </div>
                </Container>
            </Section>
        );
    }

    return (
        <Section className="bg-slate-50/50 py-10 lg:py-16">
            <Container>
                <div className="mx-auto max-w-4xl space-y-8">
                    {/* Top User Header Card */}
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
                        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-600/5 blur-2xl" />

                        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                {/* User Avatar */}
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-xl font-black text-white shadow-md shadow-slate-900/10">
                                    {getInitials(user?.name)}
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                                            {user?.name || "TechNova Member"}
                                        </h1>
                                        <CheckCircle2 className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <p className="text-xs text-slate-500">{user?.email}</p>
                                </div>
                            </div>

                            {/* Role Badge */}
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    {user?.role || "CUSTOMER"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Account Details & Quick Navigation Grid */}
                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Left Info Panel (2 Cols) */}
                        <div className="space-y-6 md:col-span-2">
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
                                <h2 className="text-base font-bold text-slate-900">
                                    Personal Information
                                </h2>
                                <p className="mt-0.5 text-xs text-slate-500">
                                    Manage your personal details and account settings.
                                </p>

                                <div className="mt-6 space-y-4">
                                    <div className="flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-xs">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Full Name
                                            </span>
                                            <p className="text-sm font-semibold text-slate-900">
                                                {user?.name || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-xs">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Email Address
                                            </span>
                                            <p className="text-sm font-semibold text-slate-900">
                                                {user?.email || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-xs">
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Account Role
                                            </span>
                                            <p className="text-sm font-semibold text-slate-900 capitalize">
                                                {user?.role?.toLowerCase() || "customer"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
                                <h2 className="text-base font-bold text-slate-900">
                                    Quick Actions
                                </h2>

                                <div className="mt-4 space-y-2">
                                    <button
                                        type="button"
                                        className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                                    >
                                        <Package className="h-4 w-4 text-blue-600" />
                                        <span>My Orders</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                                    >
                                        <Heart className="h-4 w-4 text-red-500" />
                                        <span>Wishlist</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                                    >
                                        <Settings className="h-4 w-4 text-slate-500" />
                                        <span>Account Settings</span>
                                    </button>
                                </div>

                                <div className="mt-6 border-t border-slate-100 pt-6">
                                    <LogoutButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <ProfileContent />
        </ProtectedRoute>
    );
}