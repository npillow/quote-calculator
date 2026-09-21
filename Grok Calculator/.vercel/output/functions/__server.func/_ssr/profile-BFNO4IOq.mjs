import { o as __toESM } from "../_runtime.mjs";
import { H as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as UserButton } from "./gates-o3jb5Qo4.mjs";
import { r as PageHeader } from "./shared-B7y30cni.mjs";
import { a as updateProfile, n as PortalPage, t as Badge } from "./portal-page-zmMpu_AA.mjs";
import { t as Button } from "./button-CG9D3vv1.mjs";
import { t as Card } from "./card-CcjKZy-l.mjs";
import { n as Label, t as Input } from "./label-DNOk5PGz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BFNO4IOq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfileView({ data, onChanged }) {
	const p = data.profile;
	const [firstName, setFirstName] = (0, import_react.useState)(p.firstName);
	const [lastName, setLastName] = (0, import_react.useState)(p.lastName);
	const [phone, setPhone] = (0, import_react.useState)(p.phone);
	const [addressLine, setAddressLine] = (0, import_react.useState)(p.addressLine);
	const [city, setCity] = (0, import_react.useState)(p.city);
	const [state, setState] = (0, import_react.useState)(p.state);
	const [zip, setZip] = (0, import_react.useState)(p.zip);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		setSaved(false);
		try {
			await updateProfile({ data: {
				firstName,
				lastName,
				phone,
				addressLine,
				city,
				state,
				zip
			} });
			setSaved(true);
			onChanged();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not save");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Account",
		title: "Profile",
		description: "Keep your mailing address current so ID cards and COBRA notices reach you."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-5 sm:p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "First name",
						htmlFor: "fn",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "fn",
							value: firstName,
							onChange: (e) => setFirstName(e.target.value),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Last name",
						htmlFor: "ln",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "ln",
							value: lastName,
							onChange: (e) => setLastName(e.target.value),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Mobile",
						htmlFor: "ph",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "ph",
							value: phone,
							onChange: (e) => setPhone(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Street",
						htmlFor: "ad",
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "ad",
							value: addressLine,
							onChange: (e) => setAddressLine(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "City",
						htmlFor: "ct",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "ct",
							value: city,
							onChange: (e) => setCity(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "State",
							htmlFor: "st",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "st",
								value: state,
								onChange: (e) => setState(e.target.value),
								maxLength: 2
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "ZIP",
							htmlFor: "zp",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "zp",
								value: zip,
								onChange: (e) => setZip(e.target.value)
							})
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger sm:col-span-2",
						children: error
					}) : null,
					saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-success sm:col-span-2",
						children: "Saved. Carrier records update overnight."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							children: busy ? "Saving…" : "Save profile"
						})
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-wide text-muted uppercase",
						children: "Employment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-lg font-semibold text-ink",
						children: p.employer
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: p.jobTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 space-y-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Member ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-medium tabular-nums",
								children: p.memberId
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Group"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-medium tabular-nums",
								children: p.groupNumber
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "green",
						className: "mt-4",
						children: "Active"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-ink",
					children: "Signed in as"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 text-ink",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
				})]
			})]
		})]
	})] });
}
function Field({ label, htmlFor, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `space-y-1.5 ${className ?? ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor,
			children: label
		}), children]
	});
}
function ProfilePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalPage, { children: ({ data, reload }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileView, {
		data,
		onChanged: () => void reload()
	}) });
}
//#endregion
export { ProfilePage as component };
