import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, CreditCard, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { COMPANY, OPEN_ENROLLMENT } from "@/lib/portal/constants";
import type { PortalData } from "@/lib/portal/types";
import { formatCurrencyExact, formatDate } from "@/lib/utils";
import { claimTone, Meter, PageHeader, TYPE_META } from "./shared";

export function DashboardView({ data }: { data: PortalData }) {
  const { profile, coverages, claims, messages } = data;
  const unread = messages.filter((m) => !m.read).length;
  const medical = coverages.find((c) => c.type === "medical");
  const recent = claims.slice(0, 4);
  const premium = coverages.reduce((sum, c) => sum + c.premiumEmployee, 0);

  return (
    <div className="stagger-in">
      <PageHeader
        eyebrow="Member home"
        title={`Welcome back, ${profile.firstName}.`}
        description={`${profile.employer} · Member ${profile.memberId} · Group ${profile.groupNumber}`}
      />

      <Card className="mb-6 flex flex-col gap-3 border-blue/20 bg-gradient-to-br from-white to-paper p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-blue/10 text-navy">
            <CalendarDays className="size-5" />
          </span>
          <div>
            <p className="font-semibold text-ink">Open enrollment is coming up</p>
            <p className="mt-0.5 text-sm text-muted">
              {formatDate(OPEN_ENROLLMENT.start)} – {formatDate(OPEN_ENROLLMENT.end)} for
              coverage effective {formatDate(OPEN_ENROLLMENT.effective)}. Current elections
              roll forward unless you change them.
            </p>
          </div>
        </div>
        <Link to="/documents" className="shrink-0">
          <Button variant="secondary" size="sm">
            Enrollment guide
          </Button>
        </Link>
      </Card>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat
          label="Per-paycheck benefits"
          value={formatCurrencyExact(premium)}
          hint="Your contribution"
        />
        <Stat
          label="Medical deductible used"
          value={
            medical
              ? `${formatCurrencyExact(medical.deductibleUsed)} of ${formatCurrencyExact(medical.deductibleMax)}`
              : "—"
          }
          hint={medical ? medical.planName : "No medical plan"}
        />
        <Stat
          label="Unread messages"
          value={String(unread)}
          hint="From NP Benefit Services"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wide text-ink uppercase">
              Your coverage
            </h2>
            <Link to="/coverage" className="text-sm font-medium text-navy hover:underline">
              View all
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {coverages.map((c) => {
              const meta = TYPE_META[c.type];
              const Icon = meta.Icon;
              return (
                <Card key={c.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`grid size-9 place-items-center rounded-md ${meta.tone}`}
                    >
                      <Icon className="size-4" />
                    </span>
                    <Badge tone="green">{c.status}</Badge>
                  </div>
                  <p className="mt-3 text-xs font-semibold tracking-wide text-muted uppercase">
                    {meta.label}
                  </p>
                  <p className="mt-0.5 font-semibold text-ink">{c.planName}</p>
                  <p className="text-sm text-muted">{c.carrier}</p>
                  {c.deductibleMax > 0 ? (
                    <div className="mt-3">
                      <Meter used={c.deductibleUsed} max={c.deductibleMax} label="Deductible" />
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-muted">{c.summary}</p>
                  )}
                </Card>
              );
            })}
          </div>
        </section>

        <aside className="space-y-6">
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-wide text-ink uppercase">
                Recent claims
              </h2>
              <Link to="/claims" className="text-sm font-medium text-navy hover:underline">
                All claims
              </Link>
            </div>
            <Card className="divide-y divide-line overflow-hidden">
              {recent.map((c) => (
                <div key={c.id} className="flex items-start justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">{c.provider}</p>
                    <p className="text-xs text-muted">
                      {formatDate(c.serviceDate)} · {c.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <Badge tone={claimTone(c.status)}>{c.status}</Badge>
                    <p className="mt-1 text-xs tabular-nums text-muted">
                      You: {formatCurrencyExact(c.memberOwed)}
                    </p>
                  </div>
                </div>
              ))}
            </Card>
          </section>

          <Card className="p-4">
            <p className="text-sm font-semibold text-ink">Quick actions</p>
            <div className="mt-3 grid gap-2">
              <Link to="/cards">
                <Button variant="secondary" className="w-full justify-between">
                  <span className="inline-flex items-center gap-2">
                    <CreditCard className="size-4" />
                    View ID cards
                  </span>
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/claims">
                <Button variant="secondary" className="w-full justify-between">
                  Submit a claim
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <a href={COMPANY.phoneHref}>
                <Button variant="primary" className="w-full justify-between">
                  <span className="inline-flex items-center gap-2">
                    <Phone className="size-4" />
                    Call {COMPANY.phone}
                  </span>
                  <ArrowRight className="size-4" />
                </Button>
              </a>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-1 text-lg font-semibold tracking-tight text-ink tabular-nums">
        {value}
      </p>
      <p className="mt-0.5 text-xs text-muted">{hint}</p>
    </Card>
  );
}
