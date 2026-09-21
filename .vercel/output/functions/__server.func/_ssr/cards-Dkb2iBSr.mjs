import { H as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TYPE_META, r as PageHeader } from "./shared-B7y30cni.mjs";
import { n as PortalPage, t as Badge } from "./portal-page-zmMpu_AA.mjs";
import { t as Button } from "./button-CG9D3vv1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cards-Dkb2iBSr.js
var import_jsx_runtime = require_jsx_runtime();
function CardsView({ data }) {
	const cards = data.coverages.filter((c) => [
		"medical",
		"dental",
		"vision"
	].includes(c.type));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Wallet",
			title: "ID cards",
			description: "Present these at the pharmacy, dentist, or doctor’s office. Group and member numbers match your carrier."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			className: "mb-6 no-print",
			onClick: () => window.print(),
			children: "Print cards"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-6 lg:grid-cols-2",
		children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdCard, {
			coverage: c,
			name: `${data.profile.firstName} ${data.profile.lastName}`
		}, c.id))
	})] });
}
function IdCard({ coverage, name }) {
	const meta = TYPE_META[coverage.type];
	const face = coverage.type === "medical" ? "from-navy-deep to-navy" : coverage.type === "dental" ? "from-navy to-blue" : "from-blue to-blue-bright";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "print-card overflow-hidden rounded-xl bg-linear-to-br shadow-[0_10px_30px_rgb(7_44_92_/_0.16)] text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `bg-linear-to-br ${face} p-5 sm:p-6`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase",
						children: "NP Benefit Services"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl font-semibold",
						children: meta.label
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/np-logo.png",
						alt: "",
						className: "h-14 w-auto rounded-md bg-white object-contain p-1"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-xs tracking-wide text-white/70 uppercase",
					children: "Member"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-semibold",
					children: name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 grid grid-cols-2 gap-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] tracking-wide text-white/65 uppercase",
							children: "Member ID"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-medium tabular-nums",
							children: coverage.memberId
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] tracking-wide text-white/65 uppercase",
							children: "Group"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-medium tabular-nums",
							children: coverage.groupNumber
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[11px] tracking-wide text-white/65 uppercase",
								children: "Plan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-medium",
								children: coverage.planName
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center justify-between border-t border-white/15 pt-3 text-xs text-white/75",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: coverage.carrier }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "neutral",
						className: "bg-white/15 text-white normal-case",
						children: coverage.network
					})]
				})
			]
		})
	});
}
function CardsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalPage, { children: ({ data }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardsView, { data }) });
}
//#endregion
export { CardsPage as component };
