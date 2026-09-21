import { Eye, HeartPulse, Landmark, Phone, Shield, Smile } from "lucide-react";
import { NpLogo } from "@/components/brand/np-logo";
import { SiteShell } from "@/components/marketing/site-shell";
import { COMPANY } from "@/lib/portal/constants";

const COVERAGES = [
  { title: "Medical", Icon: HeartPulse },
  { title: "Dental", Icon: Smile },
  { title: "Vision", Icon: Eye },
  { title: "Life", Icon: Shield },
] as const;

const BENEFITS = [
  {
    title: "Group medical",
    copy: "Flexible group health plans for employers of all sizes, including blue-collar teams when relevant.",
  },
  {
    title: "Self-funding",
    copy: "Self-funded health plan options for employers seeking flexibility and local support.",
  },
  {
    title: "401(k)",
    copy: "Practical 401(k) plan design and administration for growing employers.",
  },
  {
    title: "Dental, vision & life",
    copy: "Complete dental, vision and life benefits for teams of all sizes.",
  },
] as const;

const SERVICES = [
  "Onboarding",
  "Online open enrollment",
  "Year-round customer service",
  "COBRA administration",
  "H.R. support",
  "Employee benefits meeting",
  "Payroll integration",
  "Team building events",
] as const;

export function HomePage() {
  return (
    <SiteShell>
      <main>
        <Why />
        <Coverages />
        <Insurance />
        <Benefits />
        <Services />
      </main>
    </SiteShell>
  );
}

export function HomeSkeleton() {
  return (
    <div className="grid min-h-dvh place-items-center bg-paper">
      <div className="flex flex-col items-center gap-4">
        <NpLogo size="md" />
        <p className="text-sm text-muted">Loading…</p>
      </div>
    </div>
  );
}

function Why() {
  return (
    <section className="bg-navy-deep text-paper">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="stagger-in max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-paper/70 uppercase">
            Why NP Benefits
          </p>
          <h1 className="font-display mt-3 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
            Group benefits for Southern California employers
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-paper/75">
            Employers of all sizes in SoCal (Norco / Inland Empire), with
            programs that also fit blue-collar teams of about 15–100 when
            relevant.
          </p>
          <p className="mt-8 text-sm font-medium tracking-wide text-paper/70 uppercase">
            Customer service
          </p>
          <p className="mt-3 text-lg leading-relaxed text-paper/90">
            Client relationship is our #1 priority. That is why we make open
            enrollment simple and never charge extra fees.
          </p>
          <a
            href={COMPANY.phoneHref}
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-red px-5 text-sm font-semibold text-white hover:bg-red-deep"
          >
            <Phone className="size-4" />
            Call {COMPANY.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

function Coverages() {
  return (
    <section className="border-b border-line/70 bg-white">
      <div className="mx-auto grid max-w-5xl grid-cols-2 lg:grid-cols-4">
        {COVERAGES.map(({ title, Icon }) => (
          <div
            key={title}
            className="flex items-center gap-3 border-line/70 px-4 py-6 sm:px-6 lg:border-r last:border-r-0 [&:nth-child(odd)]:border-r max-lg:[&:nth-child(-n+2)]:border-b"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-paper text-navy">
              <Icon className="size-4" />
            </span>
            <p className="text-sm font-semibold tracking-wide uppercase">{title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Insurance() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-sm font-medium tracking-wide text-navy uppercase">
          Insurance for employees
        </p>
        <p className="font-display mt-3 max-w-3xl text-3xl leading-snug font-semibold tracking-tight sm:text-4xl">
          You care about your employees.
          <span className="mt-2 block text-navy">We care about protecting them.</span>
        </p>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="border-y border-line/70 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight">
          Benefits for SoCal employers: medical, dental, vision & life
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {BENEFITS.map((item) => (
            <article key={item.title}>
              <div className="flex items-start gap-3">
                {item.title === "401(k)" ? (
                  <Landmark className="mt-0.5 size-4 shrink-0 text-navy" />
                ) : null}
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.copy}</p>
                  <a
                    href={COMPANY.phoneHref}
                    className="mt-3 inline-block text-sm font-semibold text-red hover:underline"
                  >
                    Call {COMPANY.phone}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <p className="text-sm font-medium tracking-wide text-navy uppercase">
          Services
        </p>
        <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight">
          Included with the relationship
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
          {SERVICES.map((item) => (
            <li key={item} className="border-b border-line/80 py-3.5 text-sm font-medium">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 space-y-2 text-xs leading-relaxed text-muted">
          <p>
            Free payroll integration is provided with a qualifying payroll
            service provider.
          </p>
          <p>
            COBRA administration is provided at no cost to employers who are
            required to offer Federal COBRA.
          </p>
          <p>
            Team building events are hosted at your work-site or a facility of
            your choosing; location, prizes, and food not provided.
          </p>
        </div>
      </div>
    </section>
  );
}
