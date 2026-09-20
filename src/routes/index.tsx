import { createFileRoute } from "@tanstack/react-router";
import { QuoteApp } from "@/components/quote/quote-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <QuoteApp />;
}
