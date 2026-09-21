import { o as __toESM } from "./_runtime.mjs";
import { t as COMPANY } from "./_ssr/constants-DUFWoMyR.mjs";
import { t as cn } from "./_ssr/utils-D4SWYGA1.mjs";
import { H as require_jsx_runtime, V as require_react, d as useRouterState, m as Outlet, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as NpLogo } from "./_ssr/np-logo-CfmEREJn.mjs";
import { c as MessageSquare, l as Menu, n as UserRound, p as FileText, s as Phone, t as X } from "./_libs/lucide-react.mjs";
import { n as useCurrentUserState } from "./_ssr/use-current-user-DG6UNzh9.mjs";
import { n as UserButton, t as RedirectToSignIn } from "./_ssr/gates-o3jb5Qo4.mjs";
import { n as NAV } from "./_ssr/shared-B7y30cni.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_portal--hneHoq2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PortalShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { isPending } = useCurrentUserState();
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 border-b border-line/80 bg-white/90 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-[4.5rem] max-w-6xl items-center gap-4 px-4 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "shrink-0",
							"aria-label": "NP Benefit Services home",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NpLogo, { size: "sm" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "ml-4 hidden items-center gap-1 md:flex",
							children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150", isActive(pathname, item.to) ? "bg-paper-2 text-navy" : "text-muted hover:bg-paper hover:text-ink"),
								children: item.label
							}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/documents",
								className: cn("rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150", pathname.startsWith("/documents") ? "bg-paper-2 text-navy" : "text-muted hover:bg-paper hover:text-ink"),
								children: "Documents"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: COMPANY.phoneHref,
									className: "hidden h-11 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-navy hover:bg-paper lg:inline-flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), COMPANY.phone]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/messages",
									className: cn("grid size-11 place-items-center rounded-md text-muted hover:bg-paper hover:text-ink", pathname.startsWith("/messages") && "bg-paper-2 text-navy"),
									"aria-label": "Messages",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/profile",
									className: cn("grid size-11 place-items-center rounded-md text-muted hover:bg-paper hover:text-ink md:hidden", pathname.startsWith("/profile") && "bg-paper-2 text-navy"),
									"aria-label": "Profile",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden md:block",
									children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-28 animate-pulse rounded-full bg-paper-2" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-ink [&_button]:text-navy [&_span]:text-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-11 place-items-center rounded-md text-ink md:hidden",
									onClick: () => setOpen((v) => !v),
									"aria-label": open ? "Close menu" : "Open menu",
									children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})
							]
						})
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-line bg-white px-4 py-3 md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1",
						children: [
							[...NAV, {
								to: "/documents",
								label: "Documents",
								Icon: FileText
							}].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								onClick: () => setOpen(false),
								className: "flex h-11 items-center rounded-md px-3 text-sm font-medium text-ink hover:bg-paper",
								children: item.label
							}, item.to)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profile",
								onClick: () => setOpen(false),
								className: "flex h-11 items-center rounded-md px-3 text-sm font-medium text-ink hover:bg-paper",
								children: "Profile"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: COMPANY.phoneHref,
								className: "flex h-11 items-center gap-2 rounded-md px-3 text-sm font-medium text-navy",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), COMPANY.phone]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-t border-line px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
							})
						]
					})
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-line bg-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" ",
						COMPANY.name,
						". ",
						COMPANY.licenses,
						"."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Year-round service · ",
						COMPANY.phone,
						" · No extra open enrollment fees"
					] })]
				})
			})
		]
	});
}
function isActive(pathname, to) {
	if (to === "/portal") return pathname === "/portal";
	return pathname === to || pathname.startsWith(`${to}/`);
}
function PortalSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-[4.5rem] items-center border-b border-line bg-white px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NpLogo, { size: "sm" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-muted",
				children: "Loading your benefits…"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-white shadow-sm" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-white shadow-sm" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-white shadow-sm" })
				]
			})]
		})]
	});
}
function PortalLayout() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalSkeleton, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { PortalLayout as component };
