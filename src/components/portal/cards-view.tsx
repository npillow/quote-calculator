import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Coverage, PortalData } from "@/lib/portal/types";
import { TYPE_META } from "./shared";
import { PageHeader } from "./shared";

export function CardsView({ data }: { data: PortalData }) {
  const cards = data.coverages.filter((c) =>
    ["medical", "dental", "vision"].includes(c.type),
  );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          eyebrow="Wallet"
          title="ID cards"
          description="Present these at the pharmacy, dentist, or doctor’s office. Group and member numbers match your carrier."
        />
        <Button
          variant="secondary"
          className="mb-6 no-print"
          onClick={() => window.print()}
        >
          Print cards
        </Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {cards.map((c) => (
          <IdCard key={c.id} coverage={c} name={`${data.profile.firstName} ${data.profile.lastName}`} />
        ))}
      </div>
    </div>
  );
}

function IdCard({ coverage, name }: { coverage: Coverage; name: string }) {
  const meta = TYPE_META[coverage.type];
  const face =
    coverage.type === "medical"
      ? "from-navy-deep to-navy"
      : coverage.type === "dental"
        ? "from-navy to-blue"
        : "from-blue to-blue-bright";

  return (
    <article className="print-card overflow-hidden rounded-xl bg-linear-to-br shadow-[0_10px_30px_rgb(7_44_92_/_0.16)] text-white">
      <div className={`bg-linear-to-br ${face} p-5 sm:p-6`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase">
              NP Benefit Services
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold">{meta.label}</h2>
          </div>
          <img
            src="/np-logo.png"
            alt=""
            className="h-14 w-auto rounded-md bg-white object-contain p-1"
          />
        </div>
        <p className="mt-6 text-xs tracking-wide text-white/70 uppercase">Member</p>
        <p className="text-lg font-semibold">{name}</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-[11px] tracking-wide text-white/65 uppercase">Member ID</dt>
            <dd className="font-medium tabular-nums">{coverage.memberId}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-wide text-white/65 uppercase">Group</dt>
            <dd className="font-medium tabular-nums">{coverage.groupNumber}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[11px] tracking-wide text-white/65 uppercase">Plan</dt>
            <dd className="font-medium">{coverage.planName}</dd>
          </div>
        </dl>
        <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-3 text-xs text-white/75">
          <span>{coverage.carrier}</span>
          <Badge tone="neutral" className="bg-white/15 text-white normal-case">
            {coverage.network}
          </Badge>
        </div>
      </div>
    </article>
  );
}
