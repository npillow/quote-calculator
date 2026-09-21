import { createFileRoute } from "@tanstack/react-router";
import { MessagesView } from "@/components/portal/messages-view";
import { PortalPage } from "@/components/portal/portal-page";

export const Route = createFileRoute("/_portal/messages")({
  component: MessagesPage,
  head: () => ({
    meta: [{ title: "Messages · NP Benefit Services" }],
  }),
});

function MessagesPage() {
  return (
    <PortalPage>
      {({ data, reload }) => <MessagesView data={data} onChanged={() => void reload()} />}
    </PortalPage>
  );
}
