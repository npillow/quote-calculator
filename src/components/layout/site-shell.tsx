import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUOTE_META } from "@/lib/plans";

function Wordmark() {
  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-[28px] font-semibold leading-none tracking-tight text-sky">
        XGB
      </span>
      <span className="hidden h-8 w-px bg-sky/30 sm:block" />
      <div className="hidden leading-tight sm:block">
        <p className="font-display text-sm font-semibold tracking-wide text-primary-foreground">
          X GROUP BENEFITS
        </p>
        <p className="text-xs text-sky/90">Group quote · {QUOTE_META.effective}</p>
      </div>
    </div>
  );
}

export function SiteHeader({ onPrint }: { onPrint: () => void }) {
  return (
    <header className="diamond-field no-print text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Wordmark />
        <div className="flex items-center gap-3">
          <div className="hidden text-right md:block">
            <p className="text-xs uppercase tracking-wider text-sky/90">{QUOTE_META.contract}</p>
            <p className="text-sm text-primary-foreground/90">Administered by {QUOTE_META.administrator}</p>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="bg-card/95 text-navy hover:bg-card"
            onClick={onPrint}
          >
            <Printer />
            Print quote
          </Button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-muted-foreground sm:px-6">
        <p className="font-medium text-foreground">
          Broker-facing rates · {QUOTE_META.effective} · {QUOTE_META.contract} · {QUOTE_META.version}
        </p>
        <p className="mt-2 max-w-4xl">
          For broker-facing audiences only, to be presented to the client. Information is customized
          for each employer. Rates are good for plans beginning by October 1, 2026. Misrepresenting
          or distributing this information is prohibited by law. Copyright XGB/MVP © 2026.
          Pharmacy: {QUOTE_META.pharmacy} · Telemedicine: {QUOTE_META.telemedicine}.
        </p>
      </div>
    </footer>
  );
}
