import { o as __toESM } from "../_runtime.mjs";
import { t as COMPANY } from "./constants-DUFWoMyR.mjs";
import { H as require_jsx_runtime, V as require_react, b as useNavigate, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as NpLogo } from "./np-logo-CfmEREJn.mjs";
import { h as EyeOff, m as Eye, o as ShieldCheck, s as Phone, u as Lock } from "../_libs/lucide-react.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { n as useCurrentUserState } from "./use-current-user-DG6UNzh9.mjs";
import { t as GROK_PROVIDERS } from "./server-D8BhDHbP.mjs";
import { t as Button } from "./button-CG9D3vv1.mjs";
import { n as Label, t as Input } from "./label-DNOk5PGz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CcsGIyg4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GoogleMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: "size-4",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 10.2v3.6h5.1c-.2 1.2-.9 2.3-1.9 3l3.1 2.4c1.8-1.7 2.9-4.1 2.9-7 0-.7-.1-1.4-.2-2H12z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M6.6 14.3 5.5 15.2 2.1 17.8C4.2 21.1 7.9 23 12 23c2.9 0 5.4-1 7.2-2.8l-3.1-2.4c-.9.6-2 1-3.3 1-2.6 0-4.8-1.7-5.6-4.1z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4A90E2",
				d: "M2.1 6.2C.8 8.1 0 10 0 12s.8 3.9 2.1 5.8l4.5-3.5c-.2-.6-.3-1.2-.3-1.9s.1-1.4.3-2L2.1 6.2z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M12 4.8c1.6 0 3 .5 4.1 1.6l3.1-3.1C17.4 1.4 14.9 0 12 0 7.9 0 4.2 1.9 2.1 5.2L6.6 8.7C7.4 6.3 9.6 4.8 12 4.8z"
			})
		]
	});
}
function XMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "size-4",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M18.9 2H22l-6.8 7.8L23.3 22h-6.5l-5.1-6.7L5.9 22H2.8l7.3-8.3L.8 2h6.7l4.6 6.1L18.9 2Zm-1.1 18.1h1.8L6.4 3.8H4.5l13.3 16.3Z"
		})
	});
}
function LoginScreen() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	async function onEmail(e) {
		e.preventDefault();
		setError(null);
		setBusy("email");
		try {
			if (mode === "register") {
				const { error: err } = await authClient.signUp.email({
					email,
					password,
					name: name.trim() || email.split("@")[0] || "Member"
				});
				if (err) throw new Error(err.message || "Could not create account");
			} else {
				const { error: err } = await authClient.signIn.email({
					email,
					password
				});
				if (err) throw new Error(err.message || "Sign-in failed");
			}
			await authClient.getSession();
			await navigate({ to: "/portal" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setBusy(null);
		}
	}
	async function onProvider(providerId) {
		setError(null);
		setBusy(providerId.includes("google") ? "google" : "x");
		try {
			await signIn(providerId, { callbackURL: "/portal" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Sign-in failed");
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "relative hidden overflow-hidden bg-navy-deep text-white lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwooshBackdrop, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NpLogo, {
							size: "lg",
							plate: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-bright",
							children: "Member portal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display mt-3 max-w-md text-4xl leading-[1.15] font-semibold tracking-tight xl:text-[2.75rem]",
							children: "Your group benefits, in one secure place."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-sm text-[15px] leading-relaxed text-white/75",
							children: "Coverage, ID cards, claims, and 401(k) for Southern California employers — built around the client relationship."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 space-y-3 text-sm text-white/85",
							children: [
								"Medical, dental, vision, and life ID cards",
								"Claims status and reimbursements",
								"Open enrollment and plan documents"
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-4 shrink-0 text-blue-bright" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
							}, item))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [COMPANY.years, " years"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-white/30" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: COMPANY.licenses }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-white/30" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: COMPANY.phoneHref,
							className: "hover:text-white",
							children: COMPANY.phone
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex min-h-dvh flex-col px-5 py-8 sm:px-8 lg:px-12 lg:py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-center justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "lg:hidden",
							"aria-label": "Back to home",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NpLogo, { size: "sm" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hidden text-sm font-medium text-muted hover:text-ink lg:inline",
							children: "← Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: COMPANY.phoneHref,
							className: "inline-flex h-11 items-center gap-1.5 text-sm font-medium text-navy lg:ml-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), "Call"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-blue lg:block",
							children: "Secure sign-in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-1 text-3xl font-semibold tracking-tight text-ink",
							children: mode === "signin" ? "Welcome back" : "Create your account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: mode === "signin" ? "Sign in to view coverage, ID cards, and claims." : "Register to open your NP Benefit Services member portal."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: onEmail,
							className: "mt-8 space-y-4",
							children: [
								mode === "register" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Full name",
									htmlFor: "full-name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "full-name",
										autoComplete: "name",
										value: name,
										onChange: (e) => setName(e.target.value),
										required: true,
										placeholder: "Jordan Reyes"
									})
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Work email",
									htmlFor: "email",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "email",
										type: "email",
										autoComplete: "email",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										required: true,
										placeholder: "you@company.com"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Password",
									htmlFor: "password",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "password",
											type: showPassword ? "text" : "password",
											autoComplete: mode === "signin" ? "current-password" : "new-password",
											value: password,
											onChange: (e) => setPassword(e.target.value),
											required: true,
											minLength: 8,
											placeholder: mode === "register" ? "At least 8 characters" : "••••••••",
											className: "pr-11"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "absolute top-0 right-0 grid h-11 w-11 place-items-center text-muted hover:text-ink",
											onClick: () => setShowPassword((v) => !v),
											"aria-label": showPassword ? "Hide password" : "Show password",
											children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
										})]
									})
								}),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "alert",
									className: "rounded-[10px] bg-red/8 px-3 py-2 text-sm text-danger",
									children: error
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									className: "w-full",
									size: "lg",
									disabled: busy !== null,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4 opacity-80" }), busy === "email" ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-6 flex items-center gap-3 text-[11px] font-medium tracking-wide text-muted uppercase",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" }),
								"or",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2.5",
							children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								className: "w-full",
								size: "lg",
								disabled: busy !== null,
								onClick: () => onProvider(p.providerId),
								children: [
									p.label === "Google" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleMark, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XMark, {}),
									"Continue with ",
									p.label
								]
							}, p.providerId))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-8 text-center text-sm text-muted",
							children: [
								mode === "signin" ? "New to the portal?" : "Already have an account?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "font-semibold text-navy underline-offset-4 hover:underline",
									onClick: () => {
										setMode(mode === "signin" ? "register" : "signin");
										setError(null);
									},
									children: mode === "signin" ? "Create an account" : "Sign in"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-10 text-center text-[11px] leading-relaxed text-muted lg:text-left",
					children: [
						COMPANY.licenses,
						" · No extra open enrollment fees · ",
						COMPANY.region
					]
				})
			]
		})]
	});
}
function Field({ label, htmlFor, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor,
			children: label
		}), children]
	});
}
function SwooshBackdrop() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "pointer-events-none absolute inset-0 h-full w-full",
		viewBox: "0 0 800 1000",
		preserveAspectRatio: "xMidYMid slice",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "navyWash",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#0A3D73"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#072C5C"
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "800",
				height: "1000",
				fill: "url(#navyWash)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M-40 820 C 180 700, 420 880, 860 640",
				fill: "none",
				stroke: "#C81018",
				strokeWidth: "28",
				strokeLinecap: "round",
				opacity: "0.85"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M-40 850 C 200 740, 460 910, 860 680",
				fill: "none",
				stroke: "#EDE7E1",
				strokeWidth: "2",
				opacity: "0.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "640",
				cy: "180",
				r: "220",
				fill: "#C81018",
				opacity: "0.14"
			})
		]
	});
}
function Login() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 w-64 animate-pulse rounded-xl bg-white" })
	});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/portal" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginScreen, {});
}
//#endregion
export { Login as component };
