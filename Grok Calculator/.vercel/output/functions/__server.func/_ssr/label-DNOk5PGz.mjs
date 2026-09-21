import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-D4SWYGA1.mjs";
import { H as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/label-DNOk5PGz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = (0, import_react.forwardRef)(function Input({ className, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		className: cn("flex h-11 w-full rounded-[10px] border border-line bg-white px-3.5 text-sm text-ink shadow-sm", "placeholder:text-muted/70", "transition-[border-color,box-shadow] duration-150", "focus-visible:border-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/25", "disabled:cursor-not-allowed disabled:bg-paper", className),
		...props
	});
});
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-[13px] font-medium text-ink", className),
		...props
	});
}
//#endregion
export { Label as n, Input as t };
