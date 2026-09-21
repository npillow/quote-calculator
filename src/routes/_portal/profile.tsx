import { createFileRoute } from "@tanstack/react-router";
import { PortalPage } from "@/components/portal/portal-page";
import { ProfileView } from "@/components/portal/profile-view";

export const Route = createFileRoute("/_portal/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [{ title: "Profile · NP Benefit Services" }],
  }),
});

function ProfilePage() {
  return (
    <PortalPage>
      {({ data, reload }) => <ProfileView data={data} onChanged={() => void reload()} />}
    </PortalPage>
  );
}
