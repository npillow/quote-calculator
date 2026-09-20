import { useRef, useState, type ChangeEvent } from "react";
import { Check, Copy, FileDown, FileUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { TIER_LABELS, TIER_ORDER, TIER_SHORT, type Tier } from "@/lib/plans";
import {
  ageFromDob,
  applyMembers,
  censusCsvTemplate,
  downloadTextFile,
  newMember,
  parseCensusCsv,
  seedMembersFromCensus,
  type CensusMember,
  type CensusMode,
} from "@/lib/census";
import { type Census, type QuoteInput } from "@/lib/quote";
import { cn } from "@/lib/utils";

type Props = {
  input: QuoteInput;
  onPatch: (partial: Partial<QuoteInput>) => void;
};

export function CensusForm({ input, onPatch }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [showTemplate, setShowTemplate] = useState(false);
  const [copied, setCopied] = useState(false);

  const setMembers = (members: CensusMember[]) => {
    onPatch(applyMembers(members));
  };

  const updateMember = (id: string, partial: Partial<CensusMember>) => {
    setMembers(input.members.map((m) => (m.id === id ? { ...m, ...partial } : m)));
  };

  const onMode = (mode: CensusMode) => {
    if (mode === "members") {
      const members = seedMembersFromCensus(input.census, input.members);
      onPatch({ censusMode: "members", ...applyMembers(members) });
      return;
    }
    onPatch({ censusMode: "mix" });
  };

  const onImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      const { members, error } = parseCensusCsv(text);
      if (error || members.length === 0) {
        window.alert(error ?? "Could not read that CSV.");
        return;
      }
      onPatch({ censusMode: "members", ...applyMembers(members) });
    };
    reader.readAsText(file);
  };

  const csv = censusCsvTemplate();

  const copyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(csv);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = csv;
      ta.setAttribute("readonly", "true");
      ta.className = "fixed left-0 top-0 opacity-0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
  };

  const loadSample = () => {
    const parsed = parseCensusCsv(csv);
    if (parsed.members.length > 0) {
      onPatch({ censusMode: "members", ...applyMembers(parsed.members) });
      setShowTemplate(true);
    }
  };

  const openTemplate = () => {
    setShowTemplate(true);
    setCopied(false);
    downloadTextFile("xgb-census-template.csv", csv);
  };

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-2">
        {(
          [
            ["members", "Employee census", "Names, DOB, ZIP, and tier"],
            ["mix", "Headcount mix", "Counts only — no names yet"],
          ] as const
        ).map(([mode, label, hint]) => (
          <button
            key={mode}
            type="button"
            onClick={() => onMode(mode)}
            className={cn(
              "rounded-lg border p-3 text-left transition-colors duration-150",
              input.censusMode === mode
                ? "border-accent bg-ice ring-1 ring-accent"
                : "border-border bg-card hover:border-sky/50 hover:bg-muted/60",
            )}
          >
            <p className="font-display text-sm font-semibold text-navy">{label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
          </button>
        ))}
      </div>

      {input.censusMode === "members" ? (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            One row per enrolled employee. Coverage tier rolls into the rate illustration. Import a
            CSV if you already have a census file.
          </p>
          <div className="h-0 overflow-hidden">
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              tabIndex={-1}
              aria-hidden="true"
              onChange={onImport}
            />
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            <Button type="button" onClick={() => setMembers([...input.members, newMember()])}>
              <Plus />
              Add employee
            </Button>
            <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
              <FileUp />
              Import CSV
            </Button>
            <Button type="button" variant="outline" onClick={openTemplate}>
              <FileDown />
              Template
            </Button>
            <Button type="button" variant="outline" onClick={loadSample}>
              Load sample
            </Button>
          </div>

          {showTemplate ? (
            <div className="mb-4 rounded-lg border border-accent/30 bg-ice p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-sm font-semibold text-navy">Census CSV template</p>
                <Button type="button" size="sm" variant="outline" onClick={copyTemplate}>
                  {copied ? <Check /> : <Copy />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Preview downloads are often blocked here — copy this, or use Load sample to fill
                three employees on the form.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-md bg-card px-3 py-2 text-xs leading-relaxed text-foreground">
                {csv}
              </pre>
            </div>
          ) : null}

          {input.members.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-muted/50 px-4 py-8 text-center">
              <p className="font-display font-semibold text-navy">No employees yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add rows or import First Name, Last Name, DOB, ZIP, Coverage, Tobacco.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {input.members.map((member, index) => (
                <MemberCard
                  key={member.id}
                  index={index}
                  member={member}
                  onChange={(partial) => updateMember(member.id, partial)}
                  onRemove={() => setMembers(input.members.filter((m) => m.id !== member.id))}
                />
              ))}
            </ul>
          )}
        </>
      ) : (
        <MixHint census={input.census} />
      )}

      <TierBar census={input.census} enrolled={input.enrolled} />
    </div>
  );
}

function MixHint({ census }: { census: Census }) {
  return (
    <p className="mb-4 text-sm text-muted-foreground">
      Use the headcount steppers below for a quick illustration. Switch to employee census before
      requesting a formal quote so XGB has names, dates of birth, and ZIPs.
      Current mix: {TIER_ORDER.filter((t) => census[t] > 0)
        .map((t) => `${census[t]} ${TIER_SHORT[t]}`)
        .join(" · ") || "none"}
      .
    </p>
  );
}

function TierBar({ census, enrolled }: { census: Census; enrolled: number }) {
  const tones = ["bg-navy", "bg-azure", "bg-sky", "bg-navy/40"];
  return (
    <div className="mt-4">
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className="flex h-full">
          {enrolled > 0
            ? TIER_ORDER.map((tier, i) => {
                const pct = (census[tier] / enrolled) * 100;
                if (pct <= 0) return null;
                return (
                  <div
                    key={tier}
                    className={tones[i]}
                    style={{ width: `${pct}%` }}
                    title={`${TIER_LABELS[tier]} ${pct.toFixed(0)}%`}
                  />
                );
              })
            : null}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {enrolled} enrolled
        {TIER_ORDER.some((t) => census[t] > 0)
          ? ` · ${TIER_ORDER.filter((t) => census[t] > 0)
              .map((t) => `${census[t]} ${TIER_SHORT[t]}`)
              .join(" · ")}`
          : ""}
      </p>
    </div>
  );
}

function MemberCard({
  index,
  member,
  onChange,
  onRemove,
}: {
  index: number;
  member: CensusMember;
  onChange: (partial: Partial<CensusMember>) => void;
  onRemove: () => void;
}) {
  const age = ageFromDob(member.dob);
  return (
    <li className="rounded-lg border border-border bg-muted/40 p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-accent">
          Employee {index + 1}
          {age != null ? ` · age ${age}` : ""}
        </p>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-card hover:text-destructive"
          aria-label={`Remove employee ${index + 1}`}
        >
          <Trash2 className="size-4" />
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Label htmlFor={`fn-${member.id}`}>First name</Label>
          <Input
            id={`fn-${member.id}`}
            className="mt-1.5 normal-nums"
            value={member.firstName}
            autoComplete="off"
            onChange={(e) => onChange({ firstName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={`ln-${member.id}`}>Last name</Label>
          <Input
            id={`ln-${member.id}`}
            className="mt-1.5 normal-nums"
            value={member.lastName}
            autoComplete="off"
            onChange={(e) => onChange({ lastName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={`dob-${member.id}`}>Date of birth</Label>
          <Input
            id={`dob-${member.id}`}
            type="date"
            className="mt-1.5"
            value={member.dob}
            onChange={(e) => onChange({ dob: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={`zip-${member.id}`}>ZIP</Label>
          <Input
            id={`zip-${member.id}`}
            inputMode="numeric"
            className="mt-1.5"
            maxLength={5}
            value={member.zip}
            onChange={(e) => onChange({ zip: e.target.value.replace(/\D/g, "").slice(0, 5) })}
          />
        </div>
        <div>
          <Label htmlFor={`tier-${member.id}`}>Coverage</Label>
          <NativeSelect
            id={`tier-${member.id}`}
            className="mt-1.5"
            value={member.tier}
            onChange={(e) => onChange({ tier: e.target.value as Tier })}
          >
            {TIER_ORDER.map((tier) => (
              <option key={tier} value={tier}>
                {TIER_LABELS[tier]}
              </option>
            ))}
          </NativeSelect>
        </div>
        <div>
          <Label htmlFor={`tob-${member.id}`}>Tobacco</Label>
          <NativeSelect
            id={`tob-${member.id}`}
            className="mt-1.5"
            value={member.tobacco ? "yes" : "no"}
            onChange={(e) => onChange({ tobacco: e.target.value === "yes" })}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </NativeSelect>
        </div>
      </div>
    </li>
  );
}
