import { createFileRoute } from "@tanstack/react-router";
import { DashboardView } from "@/components/portal/dashboard-view";
import { PortalPage } from "@/components/portal/portal-page";

export const Route = createFileRoute("/_portal/portal")({
  component: PortalHome,
  head: () => ({
    meta: [{ title: "Portal · NP Benefit Services" }],
  }),
});

function PortalHome() {
  return <PortalPage>{({ data }) => <DashboardView data={data} />}</PortalPage>;
}
