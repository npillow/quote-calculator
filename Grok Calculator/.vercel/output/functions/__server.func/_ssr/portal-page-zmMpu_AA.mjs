import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-D4SWYGA1.mjs";
import { H as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { D as _enum, F as object, P as number, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as useCurrentUser } from "./use-current-user-DG6UNzh9.mjs";
import { t as authMiddleware } from "./middleware-CPamUddj.mjs";
import { n as createSsrRpc } from "./router-DYaLm8mN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-page-zmMpu_AA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tones = {
	neutral: "bg-paper-2 text-ink",
	blue: "bg-blue/10 text-navy",
	green: "bg-success/12 text-success",
	amber: "bg-warning/12 text-warning",
	red: "bg-red/10 text-red-deep"
};
function Badge({ className, tone = "neutral", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase", tones[tone], className),
		children
	});
}
var getPortalData = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	displayName: string().nullable().optional(),
	email: string().nullable().optional()
}).parse(input ?? {})).handler(createSsrRpc("056efed243289ff461e8e1332efbebaf432f93828db89b8459de833c59c232c0"));
var profileSchema = object({
	firstName: string().trim().min(1).max(80),
	lastName: string().trim().min(1).max(80),
	phone: string().trim().max(40),
	addressLine: string().trim().max(120),
	city: string().trim().max(80),
	state: string().trim().max(2),
	zip: string().trim().max(12)
});
var updateProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => profileSchema.parse(input)).handler(createSsrRpc("3659fad81d4a2fcfe7b9b102e6eea2581cbf2b8f97b2ff2e4a3660ed68d751fc"));
var claimSchema = object({
	provider: string().trim().min(2).max(120),
	serviceDate: string().regex(/^\d{4}-\d{2}-\d{2}$/),
	type: _enum([
		"medical",
		"dental",
		"vision"
	]),
	billed: number().min(0).max(1e5),
	description: string().trim().min(2).max(200)
});
var submitClaim = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => claimSchema.parse(input)).handler(createSsrRpc("a9fcf70d5f819b6669656ec879ad0b156fd5a9b655e3391cc2097470ddb25000"));
var markMessageRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ id: number() }).parse(input)).handler(createSsrRpc("0d319e089df299afa0aa3118f1d2cb352601cff7ff8706b9d4532acfb3948c54"));
function usePortal() {
	const user = useCurrentUser();
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const reload = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		try {
			const next = await getPortalData({ data: {
				displayName: user?.displayName ?? null,
				email: user?.primaryEmail ?? null
			} });
			setData(next);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Could not load portal";
			setError(message);
		} finally {
			setLoading(false);
		}
	}, [user?.displayName, user?.primaryEmail]);
	(0, import_react.useEffect)(() => {
		reload();
	}, [reload]);
	return {
		data,
		error,
		loading,
		reload,
		setData
	};
}
function PortalPage({ children }) {
	const portal = usePortal();
	if (portal.loading && !portal.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-white" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-white" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-white" })
		]
	});
	if (portal.error || !portal.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-white p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold text-ink",
				children: "We couldn’t load your benefits."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: portal.error ?? "Try again in a moment."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 h-11 rounded-[10px] bg-red px-4 text-sm font-semibold text-white",
				onClick: () => void portal.reload(),
				children: "Retry"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: children({
		...portal,
		data: portal.data
	}) });
}
//#endregion
export { updateProfile as a, submitClaim as i, PortalPage as n, markMessageRead as r, Badge as t };
