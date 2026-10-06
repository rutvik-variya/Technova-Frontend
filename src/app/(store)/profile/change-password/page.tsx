import ProtectedRoute from "@/components/auth/protected-route";
import Container from "@/components/layout/container";
import Section from "@/components/ui/section";
import ChangePassword from "@/components/profile/change-password";

export default function ChangePasswordPage() {
  return (
    <ProtectedRoute>
      <Section className="bg-slate-50/50 py-10 lg:py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <ChangePassword />
          </div>
        </Container>
      </Section>
    </ProtectedRoute>
  );
}
