import { createFileRoute } from "@tanstack/react-router";
import { CoveragesPage } from "@/components/marketing/pages";

export const Route = createFileRoute("/coverages")({
  component: CoveragesPage,
  head: () => ({ meta: [{ title: "Coverages · NP Benefit Services" }] }),
});
