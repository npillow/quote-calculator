import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/marketing/pages";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({ meta: [{ title: "Services · NP Benefit Services" }] }),
});
