import { createFileRoute } from "@tanstack/react-router";
import { TechnologyPage } from "@/components/marketing/pages";

export const Route = createFileRoute("/technology")({
  component: TechnologyPage,
  head: () => ({ meta: [{ title: "Technology · NP Benefit Services" }] }),
});
