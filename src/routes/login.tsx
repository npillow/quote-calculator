import { createFileRoute, Navigate } from "@tanstack/react-router";
import { LoginScreen } from "@/components/login/login-screen";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [{ title: "Sign in · NP Benefit Services" }],
  }),
});

function Login() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <div className="grid min-h-dvh place-items-center bg-paper">
        <div className="h-24 w-64 animate-pulse rounded-xl bg-white" />
      </div>
    );
  }
  if (user) return <Navigate to="/portal" />;
  return <LoginScreen />;
}
