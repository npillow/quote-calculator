import { createFileRoute } from "@tanstack/react-router";
import { CoverageView } from "@/components/portal/coverage-view";
import { PortalPage } from "@/components/portal/portal-page";

export const Route = createFileRoute("/_portal/coverage")({
  component: CoveragePage,
  head: () => ({
    meta: [{ title: "Coverage · NP Benefit Services" }],
  }),
});

function CoveragePage() {
  return <PortalPage>{({ data }) => <CoverageView data={data} />}</PortalPage>;
}
