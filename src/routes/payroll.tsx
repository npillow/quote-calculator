import { createFileRoute } from "@tanstack/react-router";
import { PayrollPage } from "@/components/marketing/pages";

export const Route = createFileRoute("/payroll")({
  component: PayrollPage,
  head: () => ({ meta: [{ title: "Payroll · NP Benefit Services" }] }),
});
