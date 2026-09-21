import { createFileRoute } from "@tanstack/react-router";
import { HrPage } from "@/components/marketing/pages";

export const Route = createFileRoute("/hr")({
  component: HrPage,
  head: () => ({ meta: [{ title: "HR · NP Benefit Services" }] }),
});
