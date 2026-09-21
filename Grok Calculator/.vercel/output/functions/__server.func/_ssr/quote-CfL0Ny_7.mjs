import { o as __toESM } from "../_runtime.mjs";
import { t as COMPANY } from "./constants-DUFWoMyR.mjs";
import { H as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Phone } from "../_libs/lucide-react.mjs";
import { r as SiteShell, t as CallBand } from "./site-shell-D3mNotbv.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { F as object, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { n as createSsrRpc } from "./router-DYaLm8mN.mjs";
import { t as Button } from "./button-CG9D3vv1.mjs";
import { n as Label, t as Input } from "./label-DNOk5PGz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quote-CfL0Ny_7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
var submitQuote = createServerFn({ method: "POST" }).validator((input) => quoteSchema.parse(input)).handler(createSsrRpc("6f6b67d8778b234a0f705ff6d15014b1578aa6fa374a2e8460c2d9d19cd78c7b"));
function QuotePage() {
	const [done, setDone] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		setBusy(true);
		const form = new FormData(e.currentTarget);
		const value = (key) => String(form.get(key) ?? "").trim();
		try {
			await submitQuote({ data: {
				kind: "group",
				name: value("name"),
				email: value("email"),
				phone: value("phone"),
				company: value("company"),
				employees: value("employees"),
				city: value("city"),
				coverage: value("coverage"),
				notes: value("notes")
			} });
			setDone(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not send the quote request.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto grid max-w-5xl gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-navy",
				children: "Quote"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-4xl leading-tight font-semibold tracking-tight",
				children: "Get a group quote."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-base leading-relaxed text-muted",
				children: "We’re not a typical broker. Once you pick a package, we quote it, run paperless open enrollment, and stay on the account year-round."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: COMPANY.mapsUrl,
				target: "_blank",
				rel: "noreferrer",
				className: "mt-8 block text-ink hover:text-navy",
				children: COMPANY.address
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: COMPANY.hours
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: COMPANY.localPhoneHref,
				className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), COMPANY.localPhone]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: COMPANY.emailHref,
				className: "mt-2 block text-sm text-muted hover:text-ink",
				children: COMPANY.email
			})
		] }), done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-line bg-white p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl font-semibold",
				children: "Thank you."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: "We received your request. We’ll follow up shortly."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "space-y-4 rounded-xl border border-line bg-white p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					name: "name",
					required: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Work email",
					name: "email",
					type: "email",
					required: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Phone",
					name: "phone",
					type: "tel",
					required: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Company",
					name: "company"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Employees",
					name: "employees",
					placeholder: "e.g. 35"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "City",
					name: "city"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Coverage needed",
					name: "coverage",
					placeholder: "Medical, dental…"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "notes",
						children: "Notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "notes",
						name: "notes",
						rows: 4,
						className: "w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-navy"
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "text-sm text-danger",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full",
					size: "lg",
					disabled: busy,
					children: busy ? "Sending…" : "Request a quote"
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallBand, {})] }) });
}
function Field({ label, name, type = "text", required, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: name,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: name,
			name,
			type,
			required,
			placeholder
		})]
	});
}
var SplitComponent = QuotePage;
//#endregion
export { SplitComponent as component };
