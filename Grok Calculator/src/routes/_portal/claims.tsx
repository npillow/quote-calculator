import { createFileRoute } from "@tanstack/react-router";
import { ClaimsView } from "@/components/portal/claims-view";
import { PortalPage } from "@/components/portal/portal-page";

export const Route = createFileRoute("/_portal/claims")({
  component: ClaimsPage,
  head: () => ({
    meta: [{ title: "Claims · NP Benefit Services" }],
  }),
});

function ClaimsPage() {
  return (
    <PortalPage>
      {({ data, reload }) => <ClaimsView data={data} onChanged={() => void reload()} />}
    </PortalPage>
  );
}
