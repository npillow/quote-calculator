import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { NpLogo } from "@/components/brand/np-logo";
import { COMPANY, FOOTER_LINKS } from "@/lib/portal/constants";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <TopBar />
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export function MarketingPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <SiteShell>
      <main>
        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
          <p className="text-sm font-medium tracking-wide text-navy uppercase">{eyebrow}</p>
          <h1 className="font-display mt-2 max-w-3xl text-4xl leading-tight font-semibold tracking-tight">
            {title}
          </h1>
          <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-muted">
            {children}
          </div>
        </section>
        <CallBand />
      </main>
    </SiteShell>
  );
}

export function CallBand() {
  return (
    <section className="bg-navy-deep text-paper">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-display text-2xl font-semibold tracking-tight">
          Call {COMPANY.phone}
        </p>
        <a
          href={COMPANY.phoneHref}
          className="inline-flex h-12 items-center gap-2 rounded-md bg-red px-5 text-sm font-semibold text-white hover:bg-red-deep"
        >
          <Phone className="size-4" />
          {COMPANY.phone}
        </a>
      </div>
    </section>
  );
}

function TopBar() {
  return (
    <a href={COMPANY.phoneHref} className="block bg-navy-deep text-white">
      <p className="mx-auto max-w-5xl px-4 py-1.5 text-center text-xs leading-snug sm:px-6">
        {COMPANY.years} years · {COMPANY.phone} · {COMPANY.licenses} · no extra
        open enrollment fees
      </p>
    </a>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-5xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="shrink-0" aria-label="NP Benefit Services home">
          <NpLogo size="sm" />
        </Link>
        <a
          href={COMPANY.phoneHref}
          className="ml-auto inline-flex h-11 items-center gap-1.5 rounded-md bg-red px-4 text-sm font-semibold text-white shadow-sm hover:bg-red-deep"
        >
          <Phone className="size-4" />
          {COMPANY.phone}
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-deep text-paper/75">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {FOOTER_LINKS.map((item) => (
            <Link key={item.to} to={item.to} className="hover:text-paper">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            {COMPANY.name} · {COMPANY.licenses}
          </p>
          <a href={COMPANY.phoneHref} className="font-semibold text-paper hover:underline">
            {COMPANY.phone}
          </a>
        </div>
      </div>
    </footer>
  );
}
