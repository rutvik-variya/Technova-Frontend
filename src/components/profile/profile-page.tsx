"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import Container from "@/components/layout/container";
import Section from "@/components/ui/section";

import { useCurrentUser } from "@/hooks/auth/use-current-user";

import ProfileHeader from "@/components/profile/profile-header";
import ProfilePersonalInfo from "@/components/profile/profile-personal-info";
import ProfileQuickActions from "@/components/profile/profile-quick-actions";
import AccountAddresses from "@/components/profile/address/account-addresses";

function ProfileContent() {
  const { data, isLoading } = useCurrentUser();

  const user = data?.data;

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
          <ProfileHeader
            name={user?.name}
            email={user?.email}
            role={user?.role}
          />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <ProfilePersonalInfo
                name={user?.name}
                email={user?.email}
                role={user?.role}
              />
            </div>

            <div className="space-y-6">
              <ProfileQuickActions />
            </div>
          </div>

          <AccountAddresses />
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
