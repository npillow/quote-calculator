import { n as FOOTER_LINKS, t as COMPANY } from "./constants-DUFWoMyR.mjs";
import { H as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as NpLogo } from "./np-logo-CfmEREJn.mjs";
import { s as Phone } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-shell-D3mNotbv.js
var import_jsx_runtime = require_jsx_runtime();
function SiteShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function MarketingPage({ eyebrow, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium tracking-wide text-navy uppercase",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 max-w-3xl text-4xl leading-tight font-semibold tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-muted",
				children
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallBand, {})] }) });
}
function CallBand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-navy-deep text-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-2xl font-semibold tracking-tight",
				children: ["Call ", COMPANY.phone]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: COMPANY.phoneHref,
				className: "inline-flex h-12 items-center gap-2 rounded-md bg-red px-5 text-sm font-semibold text-white hover:bg-red-deep",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), COMPANY.phone]
			})]
		})
	});
}
function TopBar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: COMPANY.phoneHref,
		className: "block bg-navy-deep text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mx-auto max-w-5xl px-4 py-1.5 text-center text-xs leading-snug sm:px-6",
			children: [
				COMPANY.years,
				" years · ",
				COMPANY.phone,
				" · ",
				COMPANY.licenses,
				" · no extra open enrollment fees"
			]
		})
	});
}
function Header() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 border-b border-line/70 bg-paper/90 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-[4.5rem] max-w-5xl items-center gap-3 px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "shrink-0",
				"aria-label": "NP Benefit Services home",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NpLogo, { size: "sm" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: COMPANY.phoneHref,
				className: "ml-auto inline-flex h-11 items-center gap-1.5 rounded-md bg-red px-4 text-sm font-semibold text-white shadow-sm hover:bg-red-deep",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), COMPANY.phone]
			})]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "bg-navy-deep text-paper/75",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-4 py-10 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-x-5 gap-y-2 text-sm",
				children: FOOTER_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					className: "hover:text-paper",
					children: item.label
				}, item.to))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					COMPANY.name,
					" · ",
					COMPANY.licenses
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: COMPANY.phoneHref,
					className: "font-semibold text-paper hover:underline",
					children: COMPANY.phone
				})]
			})]
		})
	});
}
//#endregion
export { MarketingPage as n, SiteShell as r, CallBand as t };
