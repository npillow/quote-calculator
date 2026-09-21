import { createFileRoute } from "@tanstack/react-router";
import { RetirementPage } from "@/components/marketing/pages";

export const Route = createFileRoute("/401k")({
  component: RetirementPage,
  head: () => ({ meta: [{ title: "401(k) · NP Benefit Services" }] }),
});
