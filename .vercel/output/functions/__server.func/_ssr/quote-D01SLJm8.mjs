import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { F as object, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { r as getSql } from "./db-yDQ5-rQI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quote-D01SLJm8.js
var quoteSchema = object({
	kind: string().trim().min(1).max(40),
	name: string().trim().min(2).max(80),
	email: string().trim().email().max(120),
	phone: string().trim().min(7).max(30),
	company: string().trim().max(120).default(""),
	employees: string().trim().max(40).default(""),
	city: string().trim().max(80).default(""),
	coverage: string().trim().max(120).default(""),
	notes: string().trim().max(1e3).default("")
});
var submitQuote_createServerFn_handler = createServerRpc({
	id: "6f6b67d8778b234a0f705ff6d15014b1578aa6fa374a2e8460c2d9d19cd78c7b",
	name: "submitQuote",
	filename: "src/lib/marketing/quote.ts"
}, (opts) => submitQuote.__executeServer(opts));
var submitQuote = createServerFn({ method: "POST" }).validator((input) => quoteSchema.parse(input)).handler(submitQuote_createServerFn_handler, async ({ data }) => {
	await (await getSql())`
      insert into quote_requests (
        kind, name, email, phone, company, employees, city, coverage, notes
      ) values (
        ${data.kind}, ${data.name}, ${data.email}, ${data.phone},
        ${data.company}, ${data.employees}, ${data.city}, ${data.coverage},
        ${data.notes}
      )
    `;
	return { ok: true };
});
//#endregion
export { submitQuote_createServerFn_handler };
