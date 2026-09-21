import { o as __toESM } from "../_runtime.mjs";
import { r as formatDate } from "./utils-D4SWYGA1.mjs";
import { H as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as FileText } from "../_libs/lucide-react.mjs";
import { r as PageHeader } from "./shared-B7y30cni.mjs";
import { n as PortalPage, t as Badge } from "./portal-page-zmMpu_AA.mjs";
import { t as Card } from "./card-CcjKZy-l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-BCv3YNHc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DocumentsView({ data }) {
	const [active, setActive] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Plan files",
			title: "Documents",
			description: "Summaries of benefits, certificates, and enrollment materials for your group."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: data.documents.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setActive(doc),
				className: "w-full text-left",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex items-start gap-4 p-4 transition-transform duration-150 hover:-translate-y-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-11 shrink-0 place-items-center rounded-md bg-paper-2 text-navy",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-ink",
									children: doc.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: doc.category })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: doc.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted",
								children: ["Issued ", formatDate(doc.dateIssued)]
							})
						]
					})]
				})
			}, doc.id))
		}),
		active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-40 grid place-items-end bg-ink/40 p-0 sm:place-items-center sm:p-6",
			onClick: () => setActive(null),
			role: "presentation",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "max-h-[85dvh] w-full max-w-lg overflow-auto rounded-t-xl p-6 sm:rounded-xl",
				onClick: (e) => e.stopPropagation(),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "doc-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-wide text-blue uppercase",
						children: active.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "doc-title",
						className: "mt-1 text-xl font-semibold text-ink",
						children: active.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: ["Issued ", formatDate(active.dateIssued)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-ink/80",
						children: active.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted",
						children: "This is a member-portal summary. The official carrier certificate governs benefits. Call 888-954-8999 if you need a mailed copy or a full PDF."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-6 h-11 rounded-[10px] bg-red px-4 text-sm font-semibold text-white",
						onClick: () => setActive(null),
						children: "Close"
					})
				]
			})
		}) : null
	] });
}
function DocumentsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalPage, { children: ({ data }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentsView, { data }) });
}
//#endregion
export { DocumentsPage as component };
