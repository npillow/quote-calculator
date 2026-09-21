import { Link } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing/site-shell";
import { COMPANY, TEAM } from "@/lib/portal/constants";

export function CoveragesPage() {
  return (
    <MarketingPage eyebrow="Coverages" title="Medical, dental, vision & life.">
      <p>
        Flexible group health for employers of all sizes, including blue-collar
        teams when it fits. Self-funding and level-funded options when they save
        money.
      </p>
      <p>
        Dental, vision, and life round out the package so employees have one
        advisor — not a stack of vendors.
      </p>
      <p>
        <Link to="/401k" className="font-semibold text-navy hover:underline">
          401(k)
        </Link>
        {" · "}
        <Link to="/funding" className="font-semibold text-navy hover:underline">
          Self-funding
        </Link>
      </p>
    </MarketingPage>
  );
}

export function ServicesPage() {
  return (
    <MarketingPage eyebrow="Services" title="One advisor. The extras included.">
      <p>
        Onboarding, online open enrollment, year-round service, employee
        benefits meetings, and team-building at the worksite.
      </p>
      <p>
        COBRA administration is included for required federal COBRA. HR support
        is included for clients. Payroll integration is free with a qualifying
        provider; full payroll is optional.
      </p>
      <p>
        <Link to="/payroll" className="font-semibold text-navy hover:underline">
          Payroll
        </Link>
        {" · "}
        <Link to="/hr" className="font-semibold text-navy hover:underline">
          HR
        </Link>
        {" · "}
        <Link to="/technology" className="font-semibold text-navy hover:underline">
          Technology
        </Link>
      </p>
    </MarketingPage>
  );
}

export function AboutPage() {
  return (
    <MarketingPage eyebrow="About" title="Employee benefits for California businesses.">
      <p>
        NP Benefit Services is dedicated to group benefits in Southern
        California. We help clients save money on the package — and we do the
        enrollment work so you don’t have to.
      </p>
      <p>
        Clients deserve the best. That’s why we offer a one-stop platform:
        customizable, affordable coverage plus a host of services at no extra
        charge.
      </p>
      <ul className="space-y-3 pt-2">
        {TEAM.map((person) => (
          <li key={person.name}>
            <p className="font-semibold text-ink">{person.name}</p>
            <p className="text-sm">{person.role}</p>
          </li>
        ))}
      </ul>
      <p>
        {COMPANY.address}
        <br />
        {COMPANY.hours}
      </p>
    </MarketingPage>
  );
}

export function RetirementPage() {
  return (
    <MarketingPage eyebrow="401(k)" title="Practical retirement plans for growing employers.">
      <p>
        Start a 401(k) in a few steps and get help finding products that fit
        your team. Plan design and administration — without making it a second
        job.
      </p>
    </MarketingPage>
  );
}

export function FundingPage() {
  return (
    <MarketingPage eyebrow="Self-funding" title="Level funding and reference-based pricing.">
      <p>
        For employers who want flexibility and local support. Level-funded and
        reference-based pricing plans are built to stabilize cost — often up to
        20% less than a traditional PPO.
      </p>
      <p>
        Targeted at groups of about 25–200 full-time employees. Larger groups
        considered case by case.
      </p>
    </MarketingPage>
  );
}

export function PayrollPage() {
  return (
    <MarketingPage eyebrow="Payroll" title="Online payroll — fast, simple, optional.">
      <p>
        We offer online payroll that integrates with major carriers. Full
        service: you run payroll, we handle the taxes. Basic: you run payroll
        and taxes yourself.
      </p>
      <p>
        Payroll is not required. New insurance clients receive it at a reduced
        cost. Direct deposit, employee portal, W-2s, and federal / state / local
        filings are available on full service.
      </p>
    </MarketingPage>
  );
}

export function HrPage() {
  return (
    <MarketingPage eyebrow="HR" title="HR support, included for clients.">
      <p>
        We can’t replace a human-resources manager, but we can help you run HR.
        Clients get 24-hour access to a complete HR library — guides, forms,
        and tools written for compliance.
      </p>
      <p>
        Hiring, terminating, COBRA, FMLA, job descriptions, salary
        benchmarking, and a benefits calendar — in one place.
      </p>
    </MarketingPage>
  );
}

export function TechnologyPage() {
  return (
    <MarketingPage eyebrow="Technology" title="Goodbye paper. Hello Ease.">
      <p>
        A technology solution for you and your employees. Staff sign in with
        email or phone, enroll online, and see copays, coverage, and documents
        year-round — on web or mobile.
      </p>
      <p>
        HR can set PTO policy, approve time off, and skip the paper chase.
        Employees enter information once and sign digitally.
      </p>
    </MarketingPage>
  );
}

export function VideosPage() {
  return (
    <MarketingPage eyebrow="Videos" title="Short explainers.">
      <ul className="space-y-3">
        <li>Open enrollment tips — 2 min 54 sec</li>
        <li>Level funding — 1 min 15 sec</li>
        <li>Reference-based pricing — 1 min 40 sec</li>
        <li>HR services — 1 min 34 sec</li>
      </ul>
      <p>
        Call {COMPANY.phone} if you want us to walk through any of these with
        your team.
      </p>
    </MarketingPage>
  );
}
