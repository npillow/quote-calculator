import { t as cn } from "./utils-D4SWYGA1.mjs";
import { H as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shield, d as Landmark, f as HeartPulse, g as CreditCard, i as Smile, m as Eye, p as FileText } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shared-B7y30cni.js
var import_jsx_runtime = require_jsx_runtime();
var TYPE_META = {
	medical: {
		label: "Medical",
		Icon: HeartPulse,
		tone: "bg-blue/10 text-navy"
	},
	dental: {
		label: "Dental",
		Icon: Smile,
		tone: "bg-success/12 text-success"
	},
	vision: {
		label: "Vision",
		Icon: Eye,
		tone: "bg-blue-bright/15 text-navy"
	},
	life: {
		label: "Life",
		Icon: Shield,
		tone: "bg-navy/10 text-navy"
	},
	retirement: {
		label: "401(k)",
		Icon: Landmark,
		tone: "bg-warning/12 text-warning"
	}
};
var NAV = [
	{
		to: "/portal",
		label: "Home",
		Icon: HeartPulse,
		match: "home"
	},
	{
		to: "/coverage",
		label: "Coverage",
		Icon: Shield,
		match: "coverage"
	},
	{
		to: "/claims",
		label: "Claims",
		Icon: FileText,
		match: "claims"
	},
	{
		to: "/cards",
		label: "ID cards",
		Icon: CreditCard,
		match: "cards"
	}
];
function Meter({ used, max, label }) {
	if (max <= 0) return null;
	const pct = Math.min(100, Math.round(used / max * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1.5 flex items-baseline justify-between gap-3 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "tabular-nums text-ink",
			children: [
				pct,
				"% · ",
				used.toLocaleString(),
				" / ",
				max.toLocaleString()
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1.5 overflow-hidden rounded-full bg-paper-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "meter-fill h-full rounded-full bg-blue",
			style: { width: `${pct}%` }
		})
	})] });
}
function PageHeader({ eyebrow, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-6",
		children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold tracking-[0.18em] text-blue uppercase",
				children: eyebrow
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-1 text-3xl font-semibold tracking-tight text-ink",
				children: title
			}),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 max-w-2xl text-sm leading-relaxed text-muted",
				children: description
			}) : null
		]
	});
}
function TypeChip({ type, className }) {
	const meta = TYPE_META[type];
	const Icon = meta.Icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", meta.tone, className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), meta.label]
	});
}
function claimTone(status) {
	if (status === "paid") return "green";
	if (status === "processing" || status === "submitted") return "amber";
	return "red";
}
//#endregion
export { TypeChip as a, TYPE_META as i, NAV as n, claimTone as o, PageHeader as r, Meter as t };
