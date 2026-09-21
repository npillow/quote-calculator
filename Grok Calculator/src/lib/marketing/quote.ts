import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";

const quoteSchema = z.object({
  kind: z.string().trim().min(1).max(40),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(7).max(30),
  company: z.string().trim().max(120).default(""),
  employees: z.string().trim().max(40).default(""),
  city: z.string().trim().max(80).default(""),
  coverage: z.string().trim().max(120).default(""),
  notes: z.string().trim().max(1000).default(""),
});

export const submitQuote = createServerFn({ method: "POST" })
  .validator((input: unknown) => quoteSchema.parse(input))
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      insert into quote_requests (
        kind, name, email, phone, company, employees, city, coverage, notes
      ) values (
        ${data.kind}, ${data.name}, ${data.email}, ${data.phone},
        ${data.company}, ${data.employees}, ${data.city}, ${data.coverage},
        ${data.notes}
      )
    `;
    return { ok: true as const };
  });
