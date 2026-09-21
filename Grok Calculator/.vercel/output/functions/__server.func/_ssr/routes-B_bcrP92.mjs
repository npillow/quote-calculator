import { t as COMPANY } from "./constants-DUFWoMyR.mjs";
import { H as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shield, d as Landmark, f as HeartPulse, i as Smile, m as Eye, s as Phone } from "../_libs/lucide-react.mjs";
import { r as SiteShell } from "./site-shell-D3mNotbv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_bcrP92.js
var import_jsx_runtime = require_jsx_runtime();
var COVERAGES = [
	{
		title: "Medical",
		Icon: HeartPulse
	},
	{
		title: "Dental",
		Icon: Smile
	},
	{
		title: "Vision",
		Icon: Eye
	},
	{
		title: "Life",
		Icon: Shield
	}
];
var BENEFITS = [
	{
		title: "Group medical",
		copy: "Flexible group health plans for employers of all sizes, including blue-collar teams when relevant."
	},
	{
		title: "Self-funding",
		copy: "Self-funded health plan options for employers seeking flexibility and local support."
	},
	{
		title: "401(k)",
		copy: "Practical 401(k) plan design and administration for growing employers."
	},
	{
		title: "Dental, vision & life",
		copy: "Complete dental, vision and life benefits for teams of all sizes."
	}
];
var SERVICES = [
	"Onboarding",
	"Online open enrollment",
	"Year-round customer service",
	"COBRA administration",
	"H.R. support",
	"Employee benefits meeting",
	"Payroll integration",
	"Team building events"
];
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Why, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coverages, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Insurance, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Benefits, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Services, {})
	] }) });
}
function Why() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-navy-deep text-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stagger-in max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium tracking-wide text-paper/70 uppercase",
						children: "Why NP Benefits"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-3 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl",
						children: "Group benefits for Southern California employers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-lg leading-relaxed text-paper/75",
						children: "Employers of all sizes in SoCal (Norco / Inland Empire), with programs that also fit blue-collar teams of about 15–100 when relevant."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-sm font-medium tracking-wide text-paper/70 uppercase",
						children: "Customer service"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-lg leading-relaxed text-paper/90",
						children: "Client relationship is our #1 priority. That is why we make open enrollment simple and never charge extra fees."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: COMPANY.phoneHref,
						className: "mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-red px-5 text-sm font-semibold text-white hover:bg-red-deep",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }),
							"Call ",
							COMPANY.phone
						]
					})
				]
			})
		})
	});
}
function Coverages() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-line/70 bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid max-w-5xl grid-cols-2 lg:grid-cols-4",
			children: COVERAGES.map(({ title, Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-line/70 px-4 py-6 sm:px-6 lg:border-r last:border-r-0 [&:nth-child(odd)]:border-r max-lg:[&:nth-child(-n+2)]:border-b",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-9 shrink-0 place-items-center rounded-md bg-paper text-navy",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold tracking-wide uppercase",
					children: title
				})]
			}, title))
		})
	});
}
function Insurance() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium tracking-wide text-navy uppercase",
				children: "Insurance for employees"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display mt-3 max-w-3xl text-3xl leading-snug font-semibold tracking-tight sm:text-4xl",
				children: ["You care about your employees.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-2 block text-navy",
					children: "We care about protecting them."
				})]
			})]
		})
	});
}
function Benefits() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-line/70 bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-semibold tracking-tight",
				children: "Benefits for SoCal employers: medical, dental, vision & life"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-8 sm:grid-cols-2",
				children: BENEFITS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [item.title === "401(k)" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "mt-0.5 size-4 shrink-0 text-navy" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: item.copy
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: COMPANY.phoneHref,
							className: "mt-3 inline-block text-sm font-semibold text-red hover:underline",
							children: ["Call ", COMPANY.phone]
						})
					] })]
				}) }, item.title))
			})]
		})
	});
}
function Services() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-4 py-16 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium tracking-wide text-navy uppercase",
					children: "Services"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-1 text-3xl font-semibold tracking-tight",
					children: "Included with the relationship"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 grid grid-cols-1 gap-x-10 sm:grid-cols-2",
					children: SERVICES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-b border-line/80 py-3.5 text-sm font-medium",
						children: item
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 space-y-2 text-xs leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Free payroll integration is provided with a qualifying payroll service provider." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "COBRA administration is provided at no cost to employers who are required to offer Federal COBRA." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Team building events are hosted at your work-site or a facility of your choosing; location, prizes, and food not provided." })
					]
				})
			]
		})
	});
}
var SplitComponent = HomePage;
//#endregion
export { SplitComponent as component };
