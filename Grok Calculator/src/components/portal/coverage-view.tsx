import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { PortalData } from "@/lib/portal/types";
import { formatCurrencyExact, formatDate } from "@/lib/utils";
import { Meter, PageHeader, TYPE_META } from "./shared";

export function CoverageView({ data }: { data: PortalData }) {
  return (
    <div>
      <PageHeader
        eyebrow="Plans"
        title="Coverage"
        description="Active elections for this plan year. Premiums below are your per-paycheck share."
      />
      <div className="space-y-4">
        {data.coverages.map((c) => {
          const meta = TYPE_META[c.type];
          const Icon = meta.Icon;
          return (
            <Card key={c.id} className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className={`grid size-11 place-items-center rounded-md ${meta.tone}`}>
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                      {meta.label}
                    </p>
                    <h2 className="text-lg font-semibold text-ink">{c.planName}</h2>
                    <p className="text-sm text-muted">{c.carrier}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone="green">{c.status}</Badge>
                  <span className="text-sm tabular-nums text-ink">
                    {c.premiumEmployee > 0
                      ? `${formatCurrencyExact(c.premiumEmployee)} / pay`
                      : "Employer paid"}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted">{c.summary}</p>

              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                <Info label="Member ID" value={c.memberId} />
                <Info label="Group number" value={c.groupNumber} />
                <Info label="Network" value={c.network} />
                <Info label="Effective" value={formatDate(c.effectiveDate)} />
                {c.deductibleMax > 0 ? (
                  <Info
                    label="Deductible"
                    value={`${formatCurrencyExact(c.deductibleUsed)} of ${formatCurrencyExact(c.deductibleMax)}`}
                  />
                ) : null}
                {c.oopMax > 0 ? (
                  <Info
                    label="Out-of-pocket max"
                    value={`${formatCurrencyExact(c.oopUsed)} of ${formatCurrencyExact(c.oopMax)}`}
                  />
                ) : null}
              </dl>

              {c.deductibleMax > 0 || c.oopMax > 0 ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Meter used={c.deductibleUsed} max={c.deductibleMax} label="Deductible used" />
                  <Meter used={c.oopUsed} max={c.oopMax} label="Out-of-pocket used" />
                </div>
              ) : null}
            </Card>
          );
        })}
      </div>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-ink uppercase">
          Covered family
        </h2>
        <Card className="divide-y divide-line overflow-hidden">
          {data.dependents.map((d) => (
            <div key={d.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div>
                <p className="font-medium text-ink">{d.name}</p>
                <p className="text-xs text-muted">
                  {d.relationship} · Born {formatDate(d.dateOfBirth)}
                </p>
              </div>
              <Badge tone={d.covered ? "green" : "neutral"}>
                {d.covered ? "Covered" : "Not covered"}
              </Badge>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="mt-0.5 font-medium text-ink tabular-nums">{value}</dd>
    </div>
  );
}
