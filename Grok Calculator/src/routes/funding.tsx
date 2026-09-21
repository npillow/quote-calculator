import { createFileRoute } from "@tanstack/react-router";
import { FundingPage } from "@/components/marketing/pages";

export const Route = createFileRoute("/funding")({
  component: FundingPage,
  head: () => ({ meta: [{ title: "Self-funding · NP Benefit Services" }] }),
});
