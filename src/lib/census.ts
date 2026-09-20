import { TIER_ORDER, TIER_SHORT, type Tier } from "@/lib/plans";

export type CensusMember = {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  zip: string;
  tier: Tier;
  tobacco: boolean;
};

export type CensusMode = "members" | "mix";

export type CensusCounts = Record<Tier, number>;

const TIER_ALIASES: Record<string, Tier> = {
  ee: "ee",
  "ee only": "ee",
  employee: "ee",
  "employee only": "ee",
  "employee-only": "ee",
  "ee+sp": "eeSp",
  "ee+spouse": "eeSp",
  "ee sp": "eeSp",
  "employee + spouse": "eeSp",
  spouse: "eeSp",
  "ee+ch": "eeCh",
  "ee+child": "eeCh",
  "ee+children": "eeCh",
  "employee + child": "eeCh",
  "employee + child(ren)": "eeCh",
  children: "eeCh",
  family: "family",
  "ee+fam": "family",
};

export function newMember(partial: Partial<CensusMember> = {}): CensusMember {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    id,
    firstName: "",
    lastName: "",
    dob: "",
    zip: "",
    tier: "ee",
    tobacco: false,
    ...partial,
  };
}

export function membersToCensus(members: CensusMember[]): CensusCounts {
  const census: CensusCounts = { ee: 0, eeSp: 0, eeCh: 0, family: 0 };
  for (const member of members) {
    if (TIER_ORDER.includes(member.tier)) census[member.tier] += 1;
  }
  return census;
}

export function applyMembers(members: CensusMember[]): {
  members: CensusMember[];
  census: CensusCounts;
  enrolled: number;
} {
  const census = membersToCensus(members);
  const enrolled = TIER_ORDER.reduce((sum, tier) => sum + census[tier], 0);
  return { members, census, enrolled };
}

export function seedMembersFromCensus(census: CensusCounts, existing: CensusMember[]): CensusMember[] {
  if (existing.length > 0) return existing;
  const next: CensusMember[] = [];
  for (const tier of TIER_ORDER) {
    for (let i = 0; i < census[tier]; i += 1) {
      next.push(newMember({ tier }));
    }
  }
  return next;
}

export function ageFromDob(dob: string, asOf = "2026-10-01"): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
  const born = new Date(`${dob}T00:00:00`);
  const at = new Date(`${asOf}T00:00:00`);
  if (Number.isNaN(born.getTime())) return null;
  let age = at.getFullYear() - born.getFullYear();
  const md = at.getMonth() - born.getMonth();
  if (md < 0 || (md === 0 && at.getDate() < born.getDate())) age -= 1;
  return age >= 0 && age < 120 ? age : null;
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else if (ch === '"') {
        quoted = false;
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      cells.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  cells.push(cur.trim());
  return cells;
}

function normalizeHeader(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9+]+/g, " ").trim();
}

function parseTier(value: string): Tier {
  const key = value.toLowerCase().replace(/\s+/g, " ").trim();
  return TIER_ALIASES[key] ?? TIER_ALIASES[key.replace(/ /g, "")] ?? "ee";
}

function parseTobacco(value: string): boolean {
  const v = value.trim().toLowerCase();
  return v === "y" || v === "yes" || v === "true" || v === "1" || v === "tobacco";
}

function parseDob(value: string): string {
  const v = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  const mdy = v.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (mdy) {
    const mm = mdy[1].padStart(2, "0");
    const dd = mdy[2].padStart(2, "0");
    return `${mdy[3]}-${mm}-${dd}`;
  }
  return "";
}

export function parseCensusCsv(text: string): { members: CensusMember[]; error: string | null } {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return { members: [], error: "CSV needs a header row and at least one employee." };

  const headers = parseCsvLine(lines[0]).map(normalizeHeader);
  const idx = (aliases: string[]) => headers.findIndex((h) => aliases.includes(h));
  const firstI = idx(["first name", "first", "firstname", "employee first name"]);
  const lastI = idx(["last name", "last", "lastname", "employee last name"]);
  const dobI = idx(["dob", "date of birth", "birth date", "birthday"]);
  const zipI = idx(["zip", "zip code", "zipcode", "postal code"]);
  const tierI = idx(["coverage", "tier", "coverage tier", "plan tier", "election"]);
  const tobaccoI = idx(["tobacco", "smoker", "tobacco user"]);

  if (firstI < 0 && lastI < 0) {
    return { members: [], error: "Could not find First Name / Last Name columns." };
  }

  const members: CensusMember[] = [];
  for (const line of lines.slice(1)) {
    const cells = parseCsvLine(line);
    if (cells.every((c) => c === "")) continue;
    members.push(
      newMember({
        firstName: firstI >= 0 ? cells[firstI] ?? "" : "",
        lastName: lastI >= 0 ? cells[lastI] ?? "" : "",
        dob: dobI >= 0 ? parseDob(cells[dobI] ?? "") : "",
        zip: zipI >= 0 ? (cells[zipI] ?? "").replace(/\D/g, "").slice(0, 5) : "",
        tier: tierI >= 0 ? parseTier(cells[tierI] ?? "EE") : "ee",
        tobacco: tobaccoI >= 0 ? parseTobacco(cells[tobaccoI] ?? "") : false,
      }),
    );
  }
  if (members.length === 0) return { members: [], error: "No employee rows found in that file." };
  return { members, error: null };
}

export function censusCsvTemplate(): string {
  return [
    "First Name,Last Name,DOB,ZIP,Coverage,Tobacco",
    "Alex,Rivera,1988-04-12,92501,EE,N",
    "Jordan,Chen,1992-11-03,92503,EE+SP,N",
    "Sam,Patel,1984-07-22,92507,Family,N",
  ].join("\n");
}

export function membersToCsv(members: CensusMember[]): string {
  const header = "First Name,Last Name,DOB,ZIP,Coverage,Tobacco,Age";
  const rows = members.map((m) => {
    const age = ageFromDob(m.dob);
    const cells = [
      m.firstName,
      m.lastName,
      m.dob,
      m.zip,
      TIER_SHORT[m.tier],
      m.tobacco ? "Y" : "N",
      age == null ? "" : String(age),
    ].map((c) => (c.includes(",") || c.includes('"') ? `"${c.replace(/"/g, '""')}"` : c));
    return cells.join(",");
  });
  return [header, ...rows].join("\n");
}

export function validateQuoteRequest(input: {
  companyName: string;
  contactName: string;
  contactEmail: string;
  enrolled: number;
  censusMode: CensusMode;
  members: CensusMember[];
}): string[] {
  const errors: string[] = [];
  if (!input.companyName.trim()) errors.push("Company name is required.");
  if (!input.contactName.trim()) errors.push("Contact name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.contactEmail.trim())) {
    errors.push("A valid contact email is required.");
  }
  if (input.enrolled < 1) errors.push("Add at least one enrolled employee.");
  if (input.censusMode === "members") {
    if (input.members.length === 0) errors.push("Add employee census rows or import a CSV.");
    else if (input.members.every((m) => !m.firstName.trim() && !m.lastName.trim())) {
      errors.push("Enter a name on at least one employee.");
    }
  }
  return errors;
}

export function downloadTextFile(filename: string, contents: string, mime = "text/csv;charset=utf-8"): void {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
