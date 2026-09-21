import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, ShieldCheck, Phone } from "lucide-react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { COMPANY } from "@/lib/portal/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NpLogo } from "@/components/brand/np-logo";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.3-1.9 3l3.1 2.4c1.8-1.7 2.9-4.1 2.9-7 0-.7-.1-1.4-.2-2H12z"
      />
      <path
        fill="#34A853"
        d="M6.6 14.3 5.5 15.2 2.1 17.8C4.2 21.1 7.9 23 12 23c2.9 0 5.4-1 7.2-2.8l-3.1-2.4c-.9.6-2 1-3.3 1-2.6 0-4.8-1.7-5.6-4.1z"
      />
      <path
        fill="#4A90E2"
        d="M2.1 6.2C.8 8.1 0 10 0 12s.8 3.9 2.1 5.8l4.5-3.5c-.2-.6-.3-1.2-.3-1.9s.1-1.4.3-2L2.1 6.2z"
      />
      <path
        fill="#FBBC05"
        d="M12 4.8c1.6 0 3 .5 4.1 1.6l3.1-3.1C17.4 1.4 14.9 0 12 0 7.9 0 4.2 1.9 2.1 5.2L6.6 8.7C7.4 6.3 9.6 4.8 12 4.8z"
      />
    </svg>
  );
}

function XMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.9 2H22l-6.8 7.8L23.3 22h-6.5l-5.1-6.7L5.9 22H2.8l7.3-8.3L.8 2h6.7l4.6 6.1L18.9 2Zm-1.1 18.1h1.8L6.4 3.8H4.5l13.3 16.3Z"
      />
    </svg>
  );
}

export function LoginScreen() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState<"email" | "google" | "x" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy("email");
    try {
      if (mode === "register") {
        const { error: err } = await authClient.signUp.email({
          email,
          password,
          name: name.trim() || email.split("@")[0] || "Member",
        });
        if (err) throw new Error(err.message || "Could not create account");
      } else {
        const { error: err } = await authClient.signIn.email({ email, password });
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

  async function onProvider(providerId: string) {
    setError(null);
    setBusy(providerId.includes("google") ? "google" : "x");
    try {
      await signIn(providerId, { callbackURL: "/portal" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
      setBusy(null);
    }
  }

  return (
    <div className="min-h-dvh bg-paper lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <aside className="relative hidden overflow-hidden bg-navy-deep text-white lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
        <SwooshBackdrop />
        <div className="relative z-10">
          <NpLogo size="lg" plate />
          <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-bright">
            Member portal
          </p>
          <h1 className="font-display mt-3 max-w-md text-4xl leading-[1.15] font-semibold tracking-tight xl:text-[2.75rem]">
            Your group benefits, in one secure place.
          </h1>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/75">
            Coverage, ID cards, claims, and 401(k) for Southern California
            employers — built around the client relationship.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/85">
            {[
              "Medical, dental, vision, and life ID cards",
              "Claims status and reimbursements",
              "Open enrollment and plan documents",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-blue-bright" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative z-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/60">
          <span>{COMPANY.years} years</span>
          <span className="size-1 rounded-full bg-white/30" />
          <span>{COMPANY.licenses}</span>
          <span className="size-1 rounded-full bg-white/30" />
          <a href={COMPANY.phoneHref} className="hover:text-white">
            {COMPANY.phone}
          </a>
        </div>
      </aside>

      <main className="flex min-h-dvh flex-col px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="lg:hidden" aria-label="Back to home">
            <NpLogo size="sm" />
          </Link>
          <Link
            to="/"
            className="hidden text-sm font-medium text-muted hover:text-ink lg:inline"
          >
            ← Home
          </Link>
          <a
            href={COMPANY.phoneHref}
            className="inline-flex h-11 items-center gap-1.5 text-sm font-medium text-navy lg:ml-auto"
          >
            <Phone className="size-4" />
            Call
          </a>
        </div>

        <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center">
          <p className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-blue lg:block">
            Secure sign-in
          </p>
          <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight text-ink">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {mode === "signin"
              ? "Sign in to view coverage, ID cards, and claims."
              : "Register to open your NP Benefit Services member portal."}
          </p>

          <form onSubmit={onEmail} className="mt-8 space-y-4">
            {mode === "register" ? (
              <Field label="Full name" htmlFor="full-name">
                <Input
                  id="full-name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Jordan Reyes"
                />
              </Field>
            ) : null}

            <Field label="Work email" htmlFor="email">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@company.com"
              />
            </Field>

            <Field label="Password" htmlFor="password">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder={mode === "register" ? "At least 8 characters" : "••••••••"}
                  className="pr-11"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 grid h-11 w-11 place-items-center text-muted hover:text-ink"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </Field>

            {error ? (
              <p
                role="alert"
                className="rounded-[10px] bg-red/8 px-3 py-2 text-sm text-danger"
              >
                {error}
              </p>
            ) : null}

            <Button type="submit" className="w-full" size="lg" disabled={busy !== null}>
              <Lock className="size-4 opacity-80" />
              {busy === "email"
                ? "Please wait…"
                : mode === "signin"
                  ? "Sign in"
                  : "Create account"}
            </Button>
          </form>

          {authEnabled ? (
            <>
              <div className="my-6 flex items-center gap-3 text-[11px] font-medium tracking-wide text-muted uppercase">
                <span className="h-px flex-1 bg-line" />
                or
                <span className="h-px flex-1 bg-line" />
              </div>
              <div className="space-y-2.5">
                {GROK_PROVIDERS.map((p) => (
                  <Button
                    key={p.providerId}
                    variant="secondary"
                    className="w-full"
                    size="lg"
                    disabled={busy !== null}
                    onClick={() => onProvider(p.providerId)}
                  >
                    {p.label === "Google" ? <GoogleMark /> : <XMark />}
                    Continue with {p.label}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-6 text-sm text-muted">Sign-in is currently disabled.</p>
          )}

          <p className="mt-8 text-center text-sm text-muted">
            {mode === "signin" ? "New to the portal?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="font-semibold text-navy underline-offset-4 hover:underline"
              onClick={() => {
                setMode(mode === "signin" ? "register" : "signin");
                setError(null);
              }}
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>

        <p className="mt-10 text-center text-[11px] leading-relaxed text-muted lg:text-left">
          {COMPANY.licenses} · No extra open enrollment fees · {COMPANY.region}
        </p>
      </main>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function SwooshBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="navyWash" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0A3D73" />
          <stop offset="100%" stopColor="#072C5C" />
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#navyWash)" />
      <path
        d="M-40 820 C 180 700, 420 880, 860 640"
        fill="none"
        stroke="#C81018"
        strokeWidth="28"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M-40 850 C 200 740, 460 910, 860 680"
        fill="none"
        stroke="#EDE7E1"
        strokeWidth="2"
        opacity="0.2"
      />
      <circle cx="640" cy="180" r="220" fill="#C81018" opacity="0.14" />
    </svg>
  );
}
