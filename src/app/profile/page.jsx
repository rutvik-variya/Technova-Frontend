"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogoutButton from "@/components/auth/logout-button";

function ProfileContent() {
    const { data } = useCurrentUser();

    const user = data?.data;

    return (
        <main className="p-10">
            <h1 className="text-3xl font-bold">
                Profile
            </h1>

            <div className="mt-6 space-y-2">
                <p>
                    <strong>Name:</strong>{" "}
                    {user?.name}
                </p>

                <p>
                    <strong>Email:</strong>{" "}
                    {user?.email}
                </p>

                <p>
                    <strong>Role:</strong>{" "}
                    {user?.role}
                </p>
            </div>

            <div className="mt-6">
                <LogoutButton />
            </div>
        </main>
    );
}

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <ProfileContent />
        </ProtectedRoute>
    );
}