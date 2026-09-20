import { QUOTE_META, TIER_LABELS, TIER_SHORT, US_STATES } from "@/lib/plans";
import { ageFromDob } from "@/lib/census";
import { describeContribution, type QuoteInput, type QuoteResult } from "@/lib/quote";
import { formatUsd } from "@/lib/utils";

export function PrintQuote({ input, quote }: { input: QuoteInput; quote: QuoteResult }) {
  const stateName = US_STATES.find((s) => s.code === input.state)?.name ?? input.state;
  const company = input.companyName.trim() || "Employer group";

  return (
    <section className="print-only print-sheet mx-auto max-w-3xl bg-card px-8 py-8 text-foreground">
      <header className="flex items-end justify-between border-b border-border pb-4">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight text-accent">XGB</p>
          <p className="text-sm font-medium text-navy">X Group Benefits · Quote request</p>
        </div>
        <div className="text-right text-sm">
          <p>{QUOTE_META.effective}</p>
          <p>{QUOTE_META.contract}</p>
          <p>Administered by {QUOTE_META.administrator}</p>
        </div>
      </header>

      <h1 className="mt-6 font-display text-2xl font-semibold text-navy">{company}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {quote.enrolled} enrolled · {stateName} · {input.network === "phcs" ? "PHCS Extended PPO" : "Cigna"}
        {input.effectiveDate ? ` · eff. ${input.effectiveDate}` : ""}
      </p>

      {(input.contactName || input.contactEmail) && (
        <p className="mt-3 text-sm">
          Contact: {input.contactName}
          {input.contactEmail ? ` · ${input.contactEmail}` : ""}
          {input.contactPhone ? ` · ${input.contactPhone}` : ""}
        </p>
      )}

      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-muted-foreground">Employer monthly</dt>
          <dd className="font-display text-2xl font-semibold tabular-nums text-navy">
            {formatUsd(quote.employerMonthlyCents)}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Employee monthly (all enrolled)</dt>
          <dd className="font-display text-2xl font-semibold tabular-nums">
            {formatUsd(quote.employeeMonthlyCents)}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Employer annual</dt>
          <dd className="tabular-nums">{formatUsd(quote.employerAnnualCents)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Employer PEPM</dt>
          <dd className="tabular-nums">{formatUsd(quote.pepmCents)}</dd>
        </div>
      </dl>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-navy">Census</h2>
      <table className="mt-2 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="py-2 font-medium">Tier</th>
            <th className="py-2 font-medium">Enrolled</th>
          </tr>
        </thead>
        <tbody>
          {(
            [
              ["ee", input.census.ee],
              ["eeSp", input.census.eeSp],
              ["eeCh", input.census.eeCh],
              ["family", input.census.family],
            ] as const
          )
            .filter(([, n]) => n > 0)
            .map(([tier, n]) => (
              <tr key={tier} className="border-b border-border">
                <td className="py-2">{TIER_LABELS[tier]}</td>
                <td className="py-2 tabular-nums">{n}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {input.members.length > 0 ? (
        <>
          <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-navy">
            Employee census
          </h2>
          <table className="mt-2 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-2 font-medium">Name</th>
                <th className="py-2 font-medium">DOB</th>
                <th className="py-2 font-medium">Age</th>
                <th className="py-2 font-medium">ZIP</th>
                <th className="py-2 font-medium">Tier</th>
                <th className="py-2 font-medium">Tobacco</th>
              </tr>
            </thead>
            <tbody>
              {input.members.map((m) => (
                <tr key={m.id} className="border-b border-border">
                  <td className="py-2">
                    {`${m.firstName} ${m.lastName}`.trim() || "—"}
                  </td>
                  <td className="py-2 tabular-nums">{m.dob || "—"}</td>
                  <td className="py-2 tabular-nums">{ageFromDob(m.dob) ?? "—"}</td>
                  <td className="py-2 tabular-nums">{m.zip || "—"}</td>
                  <td className="py-2">{TIER_SHORT[m.tier]}</td>
                  <td className="py-2">{m.tobacco ? "Y" : "N"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}

      {input.notes.trim() ? (
        <>
          <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-navy">Notes</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm">{input.notes}</p>
        </>
      ) : null}

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-navy">Contribution</h2>
      <p className="mt-2 text-sm">{describeContribution(input)}</p>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-navy">
        Contribution schedule (per employee / month)
      </h2>
      <table className="mt-2 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="py-2 font-medium">Tier</th>
            <th className="py-2 font-medium">Premium</th>
            <th className="py-2 font-medium">Employer</th>
            <th className="py-2 font-medium">Employee pays</th>
          </tr>
        </thead>
        <tbody>
          {quote.schedule.map((row) => (
            <tr key={row.tier} className="border-b border-border">
              <td className="py-2">
                {TIER_LABELS[row.tier]} ({TIER_SHORT[row.tier]})
              </td>
              <td className="py-2 tabular-nums">{formatUsd(row.premiumCents)}</td>
              <td className="py-2 tabular-nums">{formatUsd(row.employerCents)}</td>
              <td className="py-2 tabular-nums">{formatUsd(row.employeeCents)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-navy">Selected coverage</h2>
      <table className="mt-2 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="py-2 font-medium">Line</th>
            <th className="py-2 font-medium">Monthly premium</th>
            <th className="py-2 font-medium">Employer</th>
            <th className="py-2 font-medium">Employees</th>
          </tr>
        </thead>
        <tbody>
          {quote.lines.map((line) => (
            <tr key={line.id} className="border-b border-border">
              <td className="py-2">
                {line.name}
                {line.networkLabel ? ` (${line.networkLabel})` : ""}
              </td>
              <td className="py-2 tabular-nums">{formatUsd(line.monthlyTotalCents)}</td>
              <td className="py-2 tabular-nums">{formatUsd(line.employerMonthlyCents)}</td>
              <td className="py-2 tabular-nums">{formatUsd(line.employeeMonthlyCents)}</td>
            </tr>
          ))}
          {quote.hsaSeedMonthlyCents > 0 ? (
            <tr className="border-b border-border">
              <td className="py-2">HSA card funding ({quote.hsaSeedNote})</td>
              <td className="py-2 tabular-nums">—</td>
              <td className="py-2 tabular-nums">{formatUsd(quote.hsaSeedMonthlyCents)}</td>
              <td className="py-2 tabular-nums">$0.00</td>
            </tr>
          ) : null}
        </tbody>
      </table>

      <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
        Broker-facing illustration only. Rates from the XGB 10/1 2026 Marpai proposal, {QUOTE_META.version}.
        One network allowed for groups under 100 enrolled employees. Not a binder. Final rates are
        confirmed at enrollment. Copyright XGB/MVP © 2026.
      </p>
    </section>
  );
}
