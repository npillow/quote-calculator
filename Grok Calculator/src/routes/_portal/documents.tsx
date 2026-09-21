import { createFileRoute } from "@tanstack/react-router";
import { DocumentsView } from "@/components/portal/documents-view";
import { PortalPage } from "@/components/portal/portal-page";

export const Route = createFileRoute("/_portal/documents")({
  component: DocumentsPage,
  head: () => ({
    meta: [{ title: "Documents · NP Benefit Services" }],
  }),
});

function DocumentsPage() {
  return <PortalPage>{({ data }) => <DocumentsView data={data} />}</PortalPage>;
}
