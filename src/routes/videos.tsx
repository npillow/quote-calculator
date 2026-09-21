import { createFileRoute } from "@tanstack/react-router";
import { VideosPage } from "@/components/marketing/pages";

export const Route = createFileRoute("/videos")({
  component: VideosPage,
  head: () => ({ meta: [{ title: "Videos · NP Benefit Services" }] }),
});
