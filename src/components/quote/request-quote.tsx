import { useState } from "react";
import { Check, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getMedical, NETWORK_LABELS, QUOTE_META } from "@/lib/plans";
import {
  downloadTextFile,
  membersToCsv,
  validateQuoteRequest,
} from "@/lib/census";
import { describeContribution, type QuoteInput, type QuoteResult } from "@/lib/quote";
import { formatUsd } from "@/lib/utils";

type Props = {
  input: QuoteInput;
  quote: QuoteResult;
  onPatch: (partial: Partial<QuoteInput>) => void;
};

export function RequestQuote({ input, quote, onPatch }: Props) {
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const medical = getMedical(input.medicalPlanId);

  const submit = () => {
    const next = validateQuoteRequest(input);
    setErrors(next);
    if (next.length > 0) {
      setSubmitted(false);
      return;
    }
    const stamp = new Date().toISOString().slice(0, 10);
    const company = input.companyName.trim().replace(/\s+/g, "-").toLowerCase() || "group";
    if (input.members.length > 0) {
      downloadTextFile(`xgb-census-${company}-${stamp}.csv`, membersToCsv(input.members));
    }
    downloadTextFile(
      `xgb-quote-request-${company}-${stamp}.txt`,
      requestPacket(input, quote),
      "text/plain;charset=utf-8",
    );
    setSubmitted(true);
  };

  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        Send this illustration plus census to XGB. Printing opens a one-page request packet; a CSV
        and summary file download for Tommy or Gunther.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">Contact name</Label>
          <Input
            id="contact-name"
            className="mt-2 normal-nums"
            value={input.contactName}
            autoComplete="name"
            onChange={(e) => onPatch({ contactName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="contact-email">Contact email</Label>
          <Input
            id="contact-email"
            type="email"
            className="mt-2 normal-nums"
            value={input.contactEmail}
            autoComplete="email"
            onChange={(e) => onPatch({ contactEmail: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="contact-phone">Phone</Label>
          <Input
            id="contact-phone"
            type="tel"
            className="mt-2"
            value={input.contactPhone}
            autoComplete="tel"
            onChange={(e) => onPatch({ contactPhone: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="effective">Requested effective date</Label>
          <Input
            id="effective"
            type="date"
            className="mt-2"
            value={input.effectiveDate}
            onChange={(e) => onPatch({ effectiveDate: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="notes">Notes for underwriting</Label>
          <textarea
            id="notes"
            rows={4}
            className="mt-2 w-full rounded-md border border-input bg-card px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={input.notes}
            onChange={(e) => onPatch({ notes: e.target.value })}
            placeholder="Current carrier, waiting period, participation, other coverage…"
          />
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-muted/80 px-4 py-3 text-sm">
        <p className="font-medium text-navy">This request includes</p>
        <p className="mt-1 text-muted-foreground">
          {input.companyName.trim() || "Unnamed group"} · {quote.enrolled} enrolled ·{" "}
          {medical?.shortName ?? "No medical"} · {NETWORK_LABELS[input.network]} · Employer{" "}
          {formatUsd(quote.employerMonthlyCents)} / mo
        </p>
      </div>

      {errors.length > 0 ? (
        <ul className="mt-4 space-y-1 text-sm text-destructive">
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      ) : null}

      {submitted ? (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-ice px-4 py-3 text-sm text-navy">
          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
          <p>
            Request packet downloaded. Print or forward the files to XGB. Census stays on this
            device only until you send it.
          </p>
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        <Button type="button" onClick={submit}>
          <Send />
          Request this quote
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={input.members.length === 0}
          onClick={() =>
            downloadTextFile(
              "xgb-census.csv",
              membersToCsv(input.members),
            )
          }
        >
          <Download />
          Census CSV
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {QUOTE_META.carrier} · {QUOTE_META.effective} · Broker illustration, not a binder.
      </p>
    </div>
  );
}

function requestPacket(input: QuoteInput, quote: QuoteResult): string {
  const medical = getMedical(input.medicalPlanId);
  const lines = [
    `XGB group quote request`,
    `Rate card: ${QUOTE_META.effective} · ${QUOTE_META.version}`,
    ``,
    `Company: ${input.companyName}`,
    `Situs: ${input.state}`,
    `Contact: ${input.contactName}`,
    `Email: ${input.contactEmail}`,
    `Phone: ${input.contactPhone}`,
    `Effective: ${input.effectiveDate}`,
    ``,
    `Enrolled: ${quote.enrolled}`,
    `Medical: ${medical?.name ?? "—"} · ${NETWORK_LABELS[input.network]}`,
    `Employer monthly: ${formatUsd(quote.employerMonthlyCents)}`,
    `Employee monthly: ${formatUsd(quote.employeeMonthlyCents)}`,
    `Contribution: ${describeContribution(input)}`,
    ``,
    `Notes:`,
    input.notes.trim() || "(none)",
  ];
  return lines.join("\n");
}
