import { createFileRoute } from "@tanstack/react-router";
import { CardsView } from "@/components/portal/cards-view";
import { PortalPage } from "@/components/portal/portal-page";

export const Route = createFileRoute("/_portal/cards")({
  component: CardsPage,
  head: () => ({
    meta: [{ title: "ID cards · NP Benefit Services" }],
  }),
});

function CardsPage() {
  return <PortalPage>{({ data }) => <CardsView data={data} />}</PortalPage>;
}
