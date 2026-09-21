import { o as __toESM } from "../_runtime.mjs";
import { n as formatCurrencyExact, r as formatDate } from "./utils-D4SWYGA1.mjs";
import { H as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TypeChip, o as claimTone, r as PageHeader } from "./shared-B7y30cni.mjs";
import { i as submitClaim, n as PortalPage, t as Badge } from "./portal-page-zmMpu_AA.mjs";
import { t as Button } from "./button-CG9D3vv1.mjs";
import { t as Card } from "./card-CcjKZy-l.mjs";
import { n as Label, t as Input } from "./label-DNOk5PGz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/claims-CYFNw9xz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	"all",
	"medical",
	"dental",
	"vision"
];
function ClaimsView({ data, onChanged }) {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(false);
	const rows = filter === "all" ? data.claims : data.claims.filter((c) => c.type === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Reimbursements",
				title: "Claims",
				description: "Paid, processing, and submitted claims for this plan year."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mb-6 shrink-0",
				onClick: () => setOpen((v) => !v),
				children: open ? "Close form" : "Submit a claim"
			})]
		}),
		open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClaimForm, { onDone: () => {
			setOpen(false);
			onChanged();
		} }) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(f),
				className: filter === f ? "h-9 rounded-full bg-red px-3 text-xs font-semibold text-white" : "h-9 rounded-full bg-white px-3 text-xs font-semibold text-muted ring-1 ring-line hover:text-ink",
				children: f === "all" ? "All" : f[0].toUpperCase() + f.slice(1)
			}, f))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden grid-cols-[1.2fr_1fr_0.7fr_0.7fr_0.6fr] gap-3 border-b border-line bg-paper px-5 py-2 text-[11px] font-semibold tracking-wide text-muted uppercase md:grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Provider" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Service" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Plan paid" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "You owe" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Status" })
				]
			}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 py-10 text-center text-sm text-muted",
				children: "No claims in this view."
			}) : rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClaimRow, { claim: c }, c.id))]
		})
	] });
}
function ClaimRow({ claim }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2 border-b border-line px-5 py-4 last:border-0 md:grid-cols-[1.2fr_1fr_0.7fr_0.7fr_0.6fr] md:items-center md:gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium text-ink",
				children: claim.provider
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: claim.claimNumber
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeChip, { type: claim.type }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted",
				children: [
					formatDate(claim.serviceDate),
					" · ",
					claim.description
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm tabular-nums text-ink",
				children: formatCurrencyExact(claim.planPaid)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm tabular-nums text-ink",
				children: formatCurrencyExact(claim.memberOwed)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: claimTone(claim.status),
				children: claim.status
			})
		]
	});
}
function ClaimForm({ onDone }) {
	const [provider, setProvider] = (0, import_react.useState)("");
	const [serviceDate, setServiceDate] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("medical");
	const [billed, setBilled] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		try {
			await submitClaim({ data: {
				provider,
				serviceDate,
				type,
				billed: Number(billed),
				description
			} });
			onDone();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not submit claim");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "mb-6 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-ink",
				children: "New reimbursement request"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "For dental or vision out-of-network bills, or medical expenses not run through your ID card. NP Benefit Services will review within a few business days."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-4 grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "provider",
							children: "Provider"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "provider",
							value: provider,
							onChange: (e) => setProvider(e.target.value),
							required: true,
							placeholder: "Riverside Medical Associates"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "service-date",
							children: "Service date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "service-date",
							type: "date",
							value: serviceDate,
							onChange: (e) => setServiceDate(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "claim-type",
							children: "Benefit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "claim-type",
							value: type,
							onChange: (e) => setType(e.target.value),
							className: "flex h-11 w-full rounded-[10px] border border-line bg-white px-3.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "medical",
									children: "Medical"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "dental",
									children: "Dental"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "vision",
									children: "Vision"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "billed",
							children: "Amount billed"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "billed",
							type: "number",
							min: "0",
							step: "0.01",
							value: billed,
							onChange: (e) => setBilled(e.target.value),
							required: true,
							placeholder: "0.00"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "desc",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "desc",
							value: description,
							onChange: (e) => setDescription(e.target.value),
							required: true,
							placeholder: "Office visit, filling, exam…"
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger sm:col-span-2",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							children: busy ? "Submitting…" : "Submit claim"
						})
					})
				]
			})
		]
	});
}
function ClaimsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalPage, { children: ({ data, reload }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClaimsView, {
		data,
		onChanged: () => void reload()
	}) });
}
//#endregion
export { ClaimsPage as component };
