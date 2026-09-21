import { createFileRoute } from "@tanstack/react-router";
import { QuotePage } from "@/components/marketing/quote-page";

export const Route = createFileRoute("/quote")({
  component: QuotePage,
  head: () => ({ meta: [{ title: "Quote · NP Benefit Services" }] }),
});
