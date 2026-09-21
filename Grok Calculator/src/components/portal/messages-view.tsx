import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { markMessageRead } from "@/lib/portal/api";
import type { MessageRow, PortalData } from "@/lib/portal/types";
import { PageHeader } from "./shared";

export function MessagesView({
  data,
  onChanged,
}: {
  data: PortalData;
  onChanged: () => void;
}) {
  const [open, setOpen] = useState<MessageRow | null>(data.messages[0] ?? null);

  async function select(m: MessageRow) {
    setOpen(m);
    if (!m.read) {
      await markMessageRead({ data: { id: m.id } });
      onChanged();
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Inbox"
        title="Messages"
        description="Notices from NP Benefit Services, claims, and enrollment."
      />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Card className="divide-y divide-line overflow-hidden">
          {data.messages.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => void select(m)}
              className={`block w-full px-4 py-3.5 text-left transition-colors duration-150 ${
                open?.id === m.id ? "bg-paper" : "hover:bg-paper/70"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className={`text-sm ${m.read ? "font-medium text-ink" : "font-semibold text-ink"}`}>
                  {m.subject}
                </p>
                {!m.read ? <span className="size-2 shrink-0 rounded-full bg-red" /> : null}
              </div>
              <p className="mt-0.5 text-xs text-muted">
                {m.fromName} · {new Date(m.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            </button>
          ))}
        </Card>
        <Card className="p-5 sm:p-6">
          {open ? (
            <>
              <Badge>
                {open.kind === "enrollment"
                  ? "Enrollment"
                  : open.kind === "claim"
                    ? "Claim"
                    : "Notice"}
              </Badge>
              <h2 className="mt-3 text-xl font-semibold text-ink">{open.subject}</h2>
              <p className="mt-1 text-xs text-muted">
                {open.fromName} ·{" "}
                {new Date(open.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-ink/85">
                {open.body}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted">Select a message.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
