import { r as OPEN_ENROLLMENT, t as COMPANY } from "./constants-DUFWoMyR.mjs";
import { n as formatCurrencyExact, r as formatDate } from "./utils-D4SWYGA1.mjs";
import { H as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as CalendarDays, g as CreditCard, s as Phone, v as ArrowRight } from "../_libs/lucide-react.mjs";
import { i as TYPE_META, o as claimTone, r as PageHeader, t as Meter } from "./shared-B7y30cni.mjs";
import { n as PortalPage, t as Badge } from "./portal-page-zmMpu_AA.mjs";
import { t as Button } from "./button-CG9D3vv1.mjs";
import { t as Card } from "./card-CcjKZy-l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-Di4oQ4H_.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardView({ data }) {
	const { profile, coverages, claims, messages } = data;
	const unread = messages.filter((m) => !m.read).length;
	const medical = coverages.find((c) => c.type === "medical");
	const recent = claims.slice(0, 4);
	const premium = coverages.reduce((sum, c) => sum + c.premiumEmployee, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Member home",
				title: `Welcome back, ${profile.firstName}.`,
				description: `${profile.employer} · Member ${profile.memberId} · Group ${profile.groupNumber}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mb-6 flex flex-col gap-3 border-blue/20 bg-gradient-to-br from-white to-paper p-5 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-10 shrink-0 place-items-center rounded-md bg-blue/10 text-navy",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-ink",
						children: "Open enrollment is coming up"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-sm text-muted",
						children: [
							formatDate(OPEN_ENROLLMENT.start),
							" – ",
							formatDate(OPEN_ENROLLMENT.end),
							" for coverage effective ",
							formatDate(OPEN_ENROLLMENT.effective),
							". Current elections roll forward unless you change them."
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/documents",
					className: "shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "sm",
						children: "Enrollment guide"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Per-paycheck benefits",
						value: formatCurrencyExact(premium),
						hint: "Your contribution"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Medical deductible used",
						value: medical ? `${formatCurrencyExact(medical.deductibleUsed)} of ${formatCurrencyExact(medical.deductibleMax)}` : "—",
						hint: medical ? medical.planName : "No medical plan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Unread messages",
						value: String(unread),
						hint: "From NP Benefit Services"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold tracking-wide text-ink uppercase",
						children: "Your coverage"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/coverage",
						className: "text-sm font-medium text-navy hover:underline",
						children: "View all"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: coverages.map((c) => {
						const meta = TYPE_META[c.type];
						const Icon = meta.Icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `grid size-9 place-items-center rounded-md ${meta.tone}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "green",
										children: c.status
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs font-semibold tracking-wide text-muted uppercase",
									children: meta.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 font-semibold text-ink",
									children: c.planName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: c.carrier
								}),
								c.deductibleMax > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
										used: c.deductibleUsed,
										max: c.deductibleMax,
										label: "Deductible"
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted",
									children: c.summary
								})
							]
						}, c.id);
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold tracking-wide text-ink uppercase",
							children: "Recent claims"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/claims",
							className: "text-sm font-medium text-navy hover:underline",
							children: "All claims"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "divide-y divide-line overflow-hidden",
						children: recent.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium text-ink",
									children: c.provider
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										formatDate(c.serviceDate),
										" · ",
										c.description
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shrink-0 text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: claimTone(c.status),
									children: c.status
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs tabular-nums text-muted",
									children: ["You: ", formatCurrencyExact(c.memberOwed)]
								})]
							})]
						}, c.id))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-ink",
							children: "Quick actions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/cards",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "secondary",
										className: "w-full justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-4" }), "View ID cards"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/claims",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "secondary",
										className: "w-full justify-between",
										children: ["Submit a claim", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: COMPANY.phoneHref,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "primary",
										className: "w-full justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }),
												"Call ",
												COMPANY.phone
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									})
								})
							]
						})]
					})]
				})]
			})
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-wide text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-lg font-semibold tracking-tight text-ink tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-muted",
				children: hint
			})
		]
	});
}
function PortalHome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalPage, { children: ({ data }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardView, { data }) });
}
//#endregion
export { PortalHome as component };
