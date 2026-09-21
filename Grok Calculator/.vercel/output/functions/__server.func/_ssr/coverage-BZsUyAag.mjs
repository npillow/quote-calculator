import { n as formatCurrencyExact, r as formatDate } from "./utils-D4SWYGA1.mjs";
import { H as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TYPE_META, r as PageHeader, t as Meter } from "./shared-B7y30cni.mjs";
import { n as PortalPage, t as Badge } from "./portal-page-zmMpu_AA.mjs";
import { t as Card } from "./card-CcjKZy-l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coverage-BZsUyAag.js
var import_jsx_runtime = require_jsx_runtime();
function CoverageView({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Plans",
			title: "Coverage",
			description: "Active elections for this plan year. Premiums below are your per-paycheck share."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: data.coverages.map((c) => {
				const meta = TYPE_META[c.type];
				const Icon = meta.Icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid size-11 place-items-center rounded-md ${meta.tone}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold tracking-wide text-muted uppercase",
										children: meta.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg font-semibold text-ink",
										children: c.planName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: c.carrier
									})
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "green",
									children: c.status
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm tabular-nums text-ink",
									children: c.premiumEmployee > 0 ? `${formatCurrencyExact(c.premiumEmployee)} / pay` : "Employer paid"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted",
							children: c.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-5 grid gap-3 text-sm sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									label: "Member ID",
									value: c.memberId
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									label: "Group number",
									value: c.groupNumber
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									label: "Network",
									value: c.network
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									label: "Effective",
									value: formatDate(c.effectiveDate)
								}),
								c.deductibleMax > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									label: "Deductible",
									value: `${formatCurrencyExact(c.deductibleUsed)} of ${formatCurrencyExact(c.deductibleMax)}`
								}) : null,
								c.oopMax > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									label: "Out-of-pocket max",
									value: `${formatCurrencyExact(c.oopUsed)} of ${formatCurrencyExact(c.oopMax)}`
								}) : null
							]
						}),
						c.deductibleMax > 0 || c.oopMax > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								used: c.deductibleUsed,
								max: c.deductibleMax,
								label: "Deductible used"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								used: c.oopUsed,
								max: c.oopMax,
								label: "Out-of-pocket used"
							})]
						}) : null
					]
				}, c.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-sm font-semibold tracking-wide text-ink uppercase",
				children: "Covered family"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "divide-y divide-line overflow-hidden",
				children: data.dependents.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 px-5 py-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-ink",
						children: d.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							d.relationship,
							" · Born ",
							formatDate(d.dateOfBirth)
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: d.covered ? "green" : "neutral",
						children: d.covered ? "Covered" : "Not covered"
					})]
				}, d.id))
			})]
		})
	] });
}
function Info({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs font-medium text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-0.5 font-medium text-ink tabular-nums",
		children: value
	})] });
}
function CoveragePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalPage, { children: ({ data }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageView, { data }) });
}
//#endregion
export { CoveragePage as component };
