import { t as cn } from "./utils-D4SWYGA1.mjs";
import { H as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/np-logo-CfmEREJn.js
var import_jsx_runtime = require_jsx_runtime();
function NpLogo({ className, size = "md", plate = false }) {
	const img = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/np-logo.png",
		alt: "NP Benefit Services",
		className: cn("w-auto object-contain", {
			sm: "h-14",
			md: "h-[4.75rem]",
			lg: "h-28"
		}[size])
	});
	if (plate) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("inline-flex rounded-lg bg-white p-3 shadow-sm", className),
		children: img
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex items-center", className),
		children: img
	});
}
//#endregion
export { NpLogo as t };
