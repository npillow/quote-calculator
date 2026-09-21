import { o as __toESM } from "../_runtime.mjs";
import { H as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as PageHeader } from "./shared-B7y30cni.mjs";
import { n as PortalPage, r as markMessageRead, t as Badge } from "./portal-page-zmMpu_AA.mjs";
import { t as Card } from "./card-CcjKZy-l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/messages-DosJQEGY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MessagesView({ data, onChanged }) {
	const [open, setOpen] = (0, import_react.useState)(data.messages[0] ?? null);
	async function select(m) {
		setOpen(m);
		if (!m.read) {
			await markMessageRead({ data: { id: m.id } });
			onChanged();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Inbox",
		title: "Messages",
		description: "Notices from NP Benefit Services, claims, and enrollment."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "divide-y divide-line overflow-hidden",
			children: data.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => void select(m),
				className: `block w-full px-4 py-3.5 text-left transition-colors duration-150 ${open?.id === m.id ? "bg-paper" : "hover:bg-paper/70"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-sm ${m.read ? "font-medium text-ink" : "font-semibold text-ink"}`,
						children: m.subject
					}), !m.read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 shrink-0 rounded-full bg-red" }) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 text-xs text-muted",
					children: [
						m.fromName,
						" · ",
						new Date(m.createdAt).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric"
						})
					]
				})]
			}, m.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-5 sm:p-6",
			children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: open.kind === "enrollment" ? "Enrollment" : open.kind === "claim" ? "Claim" : "Notice" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-xl font-semibold text-ink",
					children: open.subject
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted",
					children: [
						open.fromName,
						" ·",
						" ",
						new Date(open.createdAt).toLocaleString("en-US", {
							month: "short",
							day: "numeric",
							year: "numeric"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 whitespace-pre-wrap text-sm leading-relaxed text-ink/85",
					children: open.body
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Select a message."
			})
		})]
	})] });
}
function MessagesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalPage, { children: ({ data, reload }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesView, {
		data,
		onChanged: () => void reload()
	}) });
}
//#endregion
export { MessagesPage as component };
