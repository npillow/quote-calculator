import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PortalShell, PortalSkeleton } from "@/components/layout/portal-shell";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/_portal")({
  component: PortalLayout,
});

function PortalLayout() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <PortalSkeleton />;
  if (!user) return <RedirectToSignIn />;
  return (
    <PortalShell>
      <Outlet />
    </PortalShell>
  );
}
