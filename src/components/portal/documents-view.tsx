import { useState } from "react";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { DocumentRow, PortalData } from "@/lib/portal/types";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "./shared";

export function DocumentsView({ data }: { data: PortalData }) {
  const [active, setActive] = useState<DocumentRow | null>(null);

  return (
    <div>
      <PageHeader
        eyebrow="Plan files"
        title="Documents"
        description="Summaries of benefits, certificates, and enrollment materials for your group."
      />
      <div className="grid gap-3">
        {data.documents.map((doc) => (
          <button
            key={doc.id}
            type="button"
            onClick={() => setActive(doc)}
            className="w-full text-left"
          >
            <Card className="flex items-start gap-4 p-4 transition-transform duration-150 hover:-translate-y-0.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-paper-2 text-navy">
                <FileText className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-ink">{doc.title}</p>
                  <Badge>{doc.category}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted">{doc.summary}</p>
                <p className="mt-1 text-xs text-muted">Issued {formatDate(doc.dateIssued)}</p>
              </div>
            </Card>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-40 grid place-items-end bg-ink/40 p-0 sm:place-items-center sm:p-6"
          onClick={() => setActive(null)}
          role="presentation"
        >
          <Card
            className="max-h-[85dvh] w-full max-w-lg overflow-auto rounded-t-xl p-6 sm:rounded-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="doc-title"
          >
            <p className="text-xs font-semibold tracking-wide text-blue uppercase">
              {active.category}
            </p>
            <h2 id="doc-title" className="mt-1 text-xl font-semibold text-ink">
              {active.title}
            </h2>
            <p className="mt-1 text-xs text-muted">Issued {formatDate(active.dateIssued)}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink/80">{active.summary}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              This is a member-portal summary. The official carrier certificate governs
              benefits. Call 888-954-8999 if you need a mailed copy or a full PDF.
            </p>
            <button
              type="button"
              className="mt-6 h-11 rounded-[10px] bg-red px-4 text-sm font-semibold text-white"
              onClick={() => setActive(null)}
            >
              Close
            </button>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
