import { Link, useRouterState } from "@tanstack/react-router";
import { FileText, Menu, MessageSquare, Phone, UserRound, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { COMPANY } from "@/lib/portal/constants";
import { NpLogo } from "@/components/brand/np-logo";
import { NAV } from "@/components/portal/shared";
import { cn } from "@/lib/utils";

export function PortalShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isPending } = useCurrentUserState();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-paper">
      <header className="sticky top-0 z-30 border-b border-line/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Link to="/" className="shrink-0" aria-label="NP Benefit Services home">
            <NpLogo size="sm" />
          </Link>
          <nav className="ml-4 hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150",
                  isActive(pathname, item.to)
                    ? "bg-paper-2 text-navy"
                    : "text-muted hover:bg-paper hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/documents"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150",
                pathname.startsWith("/documents")
                  ? "bg-paper-2 text-navy"
                  : "text-muted hover:bg-paper hover:text-ink",
              )}
            >
              Documents
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <a
              href={COMPANY.phoneHref}
              className="hidden h-11 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-navy hover:bg-paper lg:inline-flex"
            >
              <Phone className="size-4" />
              {COMPANY.phone}
            </a>
            <Link
              to="/messages"
              className={cn(
                "grid size-11 place-items-center rounded-md text-muted hover:bg-paper hover:text-ink",
                pathname.startsWith("/messages") && "bg-paper-2 text-navy",
              )}
              aria-label="Messages"
            >
              <MessageSquare className="size-5" />
            </Link>
            <Link
              to="/profile"
              className={cn(
                "grid size-11 place-items-center rounded-md text-muted hover:bg-paper hover:text-ink md:hidden",
                pathname.startsWith("/profile") && "bg-paper-2 text-navy",
              )}
              aria-label="Profile"
            >
              <UserRound className="size-5" />
            </Link>
            <div className="hidden md:block">
              {isPending ? (
                <div className="h-8 w-28 animate-pulse rounded-full bg-paper-2" />
              ) : (
                <div className="text-ink [&_button]:text-navy [&_span]:text-sm">
                  <UserButton />
                </div>
              )}
            </div>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-md text-ink md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <div className="border-t border-line bg-white px-4 py-3 md:hidden">
            <div className="grid gap-1">
              {[...NAV, { to: "/documents", label: "Documents", Icon: FileText }].map(
                (item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex h-11 items-center rounded-md px-3 text-sm font-medium text-ink hover:bg-paper"
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex h-11 items-center rounded-md px-3 text-sm font-medium text-ink hover:bg-paper"
              >
                Profile
              </Link>
              <a
                href={COMPANY.phoneHref}
                className="flex h-11 items-center gap-2 rounded-md px-3 text-sm font-medium text-navy"
              >
                <Phone className="size-4" />
                {COMPANY.phone}
              </a>
              <div className="border-t border-line px-3 py-3">
                <UserButton />
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</div>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. {COMPANY.licenses}.
          </p>
          <p>
            Year-round service · {COMPANY.phone} · No extra open enrollment fees
          </p>
        </div>
      </footer>
    </div>
  );
}

function isActive(pathname: string, to: string) {
  if (to === "/portal") return pathname === "/portal";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function PortalSkeleton() {
  return (
    <div className="min-h-dvh bg-paper">
      <div className="flex h-[4.5rem] items-center border-b border-line bg-white px-4 sm:px-6">
        <NpLogo size="sm" />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-sm font-medium text-muted">Loading your benefits…</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-40 animate-pulse rounded-xl bg-white shadow-sm" />
          <div className="h-40 animate-pulse rounded-xl bg-white shadow-sm" />
          <div className="h-40 animate-pulse rounded-xl bg-white shadow-sm" />
        </div>
      </div>
    </div>
  );
}
