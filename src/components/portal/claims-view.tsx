import { useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitClaim } from "@/lib/portal/api";
import type { Claim, CoverageType, PortalData } from "@/lib/portal/types";
import { formatCurrencyExact, formatDate } from "@/lib/utils";
import { claimTone, PageHeader, TypeChip } from "./shared";

const FILTERS = ["all", "medical", "dental", "vision"] as const;

export function ClaimsView({
  data,
  onChanged,
}: {
  data: PortalData;
  onChanged: () => void;
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [open, setOpen] = useState(false);
  const rows =
    filter === "all" ? data.claims : data.claims.filter((c) => c.type === filter);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          eyebrow="Reimbursements"
          title="Claims"
          description="Paid, processing, and submitted claims for this plan year."
        />
        <Button className="mb-6 shrink-0" onClick={() => setOpen((v) => !v)}>
          {open ? "Close form" : "Submit a claim"}
        </Button>
      </div>

      {open ? <ClaimForm onDone={() => { setOpen(false); onChanged(); }} /> : null}

      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={
              filter === f
                ? "h-9 rounded-full bg-red px-3 text-xs font-semibold text-white"
                : "h-9 rounded-full bg-white px-3 text-xs font-semibold text-muted ring-1 ring-line hover:text-ink"
            }
          >
            {f === "all" ? "All" : f[0]!.toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-[1.2fr_1fr_0.7fr_0.7fr_0.6fr] gap-3 border-b border-line bg-paper px-5 py-2 text-[11px] font-semibold tracking-wide text-muted uppercase md:grid">
          <span>Provider</span>
          <span>Service</span>
          <span>Plan paid</span>
          <span>You owe</span>
          <span>Status</span>
        </div>
        {rows.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted">No claims in this view.</p>
        ) : (
          rows.map((c) => <ClaimRow key={c.id} claim={c} />)
        )}
      </Card>
    </div>
  );
}

function ClaimRow({ claim }: { claim: Claim }) {
  return (
    <div className="grid gap-2 border-b border-line px-5 py-4 last:border-0 md:grid-cols-[1.2fr_1fr_0.7fr_0.7fr_0.6fr] md:items-center md:gap-3">
      <div>
        <p className="font-medium text-ink">{claim.provider}</p>
        <p className="text-xs text-muted">{claim.claimNumber}</p>
      </div>
      <div>
        <TypeChip type={claim.type} />
        <p className="mt-1 text-xs text-muted">
          {formatDate(claim.serviceDate)} · {claim.description}
        </p>
      </div>
      <p className="text-sm tabular-nums text-ink">{formatCurrencyExact(claim.planPaid)}</p>
      <p className="text-sm tabular-nums text-ink">{formatCurrencyExact(claim.memberOwed)}</p>
      <Badge tone={claimTone(claim.status)}>{claim.status}</Badge>
    </div>
  );
}

function ClaimForm({ onDone }: { onDone: () => void }) {
  const [provider, setProvider] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [type, setType] = useState<"medical" | "dental" | "vision">("medical");
  const [billed, setBilled] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await submitClaim({
        data: {
          provider,
          serviceDate,
          type,
          billed: Number(billed),
          description,
        },
      });
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit claim");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="mb-6 p-5">
      <h2 className="font-semibold text-ink">New reimbursement request</h2>
      <p className="mt-1 text-sm text-muted">
        For dental or vision out-of-network bills, or medical expenses not run through your ID
        card. NP Benefit Services will review within a few business days.
      </p>
      <form onSubmit={onSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="provider">Provider</Label>
          <Input
            id="provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            required
            placeholder="Riverside Medical Associates"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="service-date">Service date</Label>
          <Input
            id="service-date"
            type="date"
            value={serviceDate}
            onChange={(e) => setServiceDate(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="claim-type">Benefit</Label>
          <select
            id="claim-type"
            value={type}
            onChange={(e) => setType(e.target.value as CoverageType & "medical")}
            className="flex h-11 w-full rounded-[10px] border border-line bg-white px-3.5 text-sm"
          >
            <option value="medical">Medical</option>
            <option value="dental">Dental</option>
            <option value="vision">Vision</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="billed">Amount billed</Label>
          <Input
            id="billed"
            type="number"
            min="0"
            step="0.01"
            value={billed}
            onChange={(e) => setBilled(e.target.value)}
            required
            placeholder="0.00"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="desc">Description</Label>
          <Input
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Office visit, filling, exam…"
          />
        </div>
        {error ? <p className="text-sm text-danger sm:col-span-2">{error}</p> : null}
        <div className="sm:col-span-2">
          <Button type="submit" disabled={busy}>
            {busy ? "Submitting…" : "Submit claim"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
