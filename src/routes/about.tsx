import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/marketing/pages";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({ meta: [{ title: "About · NP Benefit Services" }] }),
});
