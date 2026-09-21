import { i as TEAM, t as COMPANY } from "./constants-DUFWoMyR.mjs";
import { H as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as MarketingPage } from "./site-shell-D3mNotbv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pages-Chjt_Tz4.js
var import_jsx_runtime = require_jsx_runtime();
function CoveragesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingPage, {
		eyebrow: "Coverages",
		title: "Medical, dental, vision & life.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Flexible group health for employers of all sizes, including blue-collar teams when it fits. Self-funding and level-funded options when they save money." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Dental, vision, and life round out the package so employees have one advisor — not a stack of vendors." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/401k",
					className: "font-semibold text-navy hover:underline",
					children: "401(k)"
				}),
				" · ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/funding",
					className: "font-semibold text-navy hover:underline",
					children: "Self-funding"
				})
			] })
		]
	});
}
function ServicesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingPage, {
		eyebrow: "Services",
		title: "One advisor. The extras included.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Onboarding, online open enrollment, year-round service, employee benefits meetings, and team-building at the worksite." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "COBRA administration is included for required federal COBRA. HR support is included for clients. Payroll integration is free with a qualifying provider; full payroll is optional." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/payroll",
					className: "font-semibold text-navy hover:underline",
					children: "Payroll"
				}),
				" · ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/hr",
					className: "font-semibold text-navy hover:underline",
					children: "HR"
				}),
				" · ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/technology",
					className: "font-semibold text-navy hover:underline",
					children: "Technology"
				})
			] })
		]
	});
}
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingPage, {
		eyebrow: "About",
		title: "Employee benefits for California businesses.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NP Benefit Services is dedicated to group benefits in Southern California. We help clients save money on the package — and we do the enrollment work so you don’t have to." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Clients deserve the best. That’s why we offer a one-stop platform: customizable, affordable coverage plus a host of services at no extra charge." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3 pt-2",
				children: TEAM.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold text-ink",
					children: person.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: person.role
				})] }, person.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				COMPANY.address,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				COMPANY.hours
			] })
		]
	});
}
function RetirementPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingPage, {
		eyebrow: "401(k)",
		title: "Practical retirement plans for growing employers.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Start a 401(k) in a few steps and get help finding products that fit your team. Plan design and administration — without making it a second job." })
	});
}
function FundingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingPage, {
		eyebrow: "Self-funding",
		title: "Level funding and reference-based pricing.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "For employers who want flexibility and local support. Level-funded and reference-based pricing plans are built to stabilize cost — often up to 20% less than a traditional PPO." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Targeted at groups of about 25–200 full-time employees. Larger groups considered case by case." })]
	});
}
function PayrollPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingPage, {
		eyebrow: "Payroll",
		title: "Online payroll — fast, simple, optional.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We offer online payroll that integrates with major carriers. Full service: you run payroll, we handle the taxes. Basic: you run payroll and taxes yourself." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Payroll is not required. New insurance clients receive it at a reduced cost. Direct deposit, employee portal, W-2s, and federal / state / local filings are available on full service." })]
	});
}
function HrPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingPage, {
		eyebrow: "HR",
		title: "HR support, included for clients.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We can’t replace a human-resources manager, but we can help you run HR. Clients get 24-hour access to a complete HR library — guides, forms, and tools written for compliance." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Hiring, terminating, COBRA, FMLA, job descriptions, salary benchmarking, and a benefits calendar — in one place." })]
	});
}
function TechnologyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingPage, {
		eyebrow: "Technology",
		title: "Goodbye paper. Hello Ease.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A technology solution for you and your employees. Staff sign in with email or phone, enroll online, and see copays, coverage, and documents year-round — on web or mobile." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "HR can set PTO policy, approve time off, and skip the paper chase. Employees enter information once and sign digitally." })]
	});
}
function VideosPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingPage, {
		eyebrow: "Videos",
		title: "Short explainers.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Open enrollment tips — 2 min 54 sec" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Level funding — 1 min 15 sec" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Reference-based pricing — 1 min 40 sec" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "HR services — 1 min 34 sec" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			"Call ",
			COMPANY.phone,
			" if you want us to walk through any of these with your team."
		] })]
	});
}
//#endregion
export { PayrollPage as a, TechnologyPage as c, HrPage as i, VideosPage as l, CoveragesPage as n, RetirementPage as o, FundingPage as r, ServicesPage as s, AboutPage as t };
