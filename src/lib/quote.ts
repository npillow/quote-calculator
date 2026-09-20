import {
  type CensusMember,
  type CensusMode,
} from "@/lib/census";
import {
  type AncillaryPlan,
  type MedicalPlan,
  type Network,
  type Tier,
  type TierRates,
  LIFE_PLANS,
  TIER_ORDER,
  VISION_PLANS,
  dentalPlansForState,
  getMedical,
  getMedicalRate,
} from "@/lib/plans";
import { formatUsd } from "@/lib/utils";

export type Census = Record<Tier, number>;

export type ContributionMode = "percent" | "fixed";

export type QuoteInput = {
  companyName: string;
  state: string;
  enrolled: number;
  census: Census;
  censusMode: CensusMode;
  members: CensusMember[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  effectiveDate: string;
  notes: string;
  network: Network;
  medicalPlanId: string;
  dentalPlanId: string | null;
  visionPlanId: string | null;
  lifePlanId: string | null;
  contributionMode: ContributionMode;
  eeContributionPct: number;
  eeContributionCents: number;
  coverDependents: boolean;
  depContributionPct: number;
  depContributionCents: number;
  includeHsaSeed: boolean;
};

type ContributionRules = {
  mode: ContributionMode;
  coverDependents: boolean;
  eePct: number;
  depPct: number;
  eeFixedCents: number;
  depFixedCents: number;
};

export type TierBreakdown = {
  tier: Tier;
  count: number;
  rateCents: number;
  totalCents: number;
  employerCents: number;
  employeeCents: number;
};

export type LineQuote = {
  id: string;
  kind: "medical" | "dental" | "vision" | "life";
  name: string;
  networkLabel?: string;
  monthlyTotalCents: number;
  employerMonthlyCents: number;
  employeeMonthlyCents: number;
  byTier: TierBreakdown[];
};

/** Per-contract monthly split — what one employee on that tier pays. */
export type ScheduleRow = {
  tier: Tier;
  premiumCents: number;
  employerCents: number;
  employeeCents: number;
};

export type QuoteResult = {
  enrolled: number;
  dependentCount: number;
  lines: LineQuote[];
  hsaSeedMonthlyCents: number;
  hsaSeedNote: string | null;
  premiumMonthlyCents: number;
  employerPremiumMonthlyCents: number;
  employeeMonthlyCents: number;
  employerMonthlyCents: number;
  employerAnnualCents: number;
  employeeAnnualCents: number;
  pepmCents: number;
  schedule: ScheduleRow[];
};

type RatedLine = { rates: TierRates; eeOnly: boolean };

export const EMPTY_CENSUS: Census = { ee: 0, eeSp: 0, eeCh: 0, family: 0 };

export function censusTotal(census: Census): number {
  return TIER_ORDER.reduce((sum, tier) => sum + Math.max(0, census[tier] | 0), 0);
}

export function censusDependents(census: Census): number {
  return Math.max(0, census.eeSp) + Math.max(0, census.eeCh) + Math.max(0, census.family);
}

export function setEnrolled(enrolled: number, census: Census): Census {
  const n = Math.max(0, Math.min(500, Math.floor(enrolled) || 0));
  const current = censusTotal(census);
  if (n === current) return census;
  if (n > current) {
    return { ...census, ee: census.ee + (n - current) };
  }
  let remaining = n;
  const ee = Math.min(census.ee, remaining);
  remaining -= ee;
  const eeSp = Math.min(census.eeSp, remaining);
  remaining -= eeSp;
  const eeCh = Math.min(census.eeCh, remaining);
  remaining -= eeCh;
  const family = remaining;
  return { ee, eeSp, eeCh, family };
}

export function setEmployeeOnly(census: Census, value: number): { census: Census; enrolled: number } {
  const deps = censusDependents(census);
  const ee = Math.max(0, Math.min(500 - deps, Math.floor(value) || 0));
  const next = { ...census, ee };
  return { census: next, enrolled: censusTotal(next) };
}

export function setTierCount(census: Census, enrolled: number, tier: Tier, value: number): Census {
  if (tier === "ee") {
    return setEmployeeOnly(census, value).census;
  }
  const n = Math.max(0, Math.min(enrolled, Math.floor(value) || 0));
  const next = { ...census, [tier]: n };
  const deps = next.eeSp + next.eeCh + next.family;
  if (deps > enrolled) {
    next[tier] = Math.max(0, n - (deps - enrolled));
  }
  next.ee = enrolled - next.eeSp - next.eeCh - next.family;
  return next;
}

export function contributionRulesFrom(input: QuoteInput): ContributionRules {
  const coverDependents = Boolean(input.coverDependents);
  return {
    mode: input.contributionMode === "fixed" ? "fixed" : "percent",
    coverDependents,
    eePct: Math.min(1, Math.max(0, (input.eeContributionPct ?? 0) / 100)),
    depPct: coverDependents
      ? Math.min(1, Math.max(0, (input.depContributionPct ?? 0) / 100))
      : 0,
    eeFixedCents: Math.max(0, Math.round(input.eeContributionCents || 0)),
    depFixedCents: coverDependents
      ? Math.max(0, Math.round(input.depContributionCents || 0))
      : 0,
  };
}

export function describeContribution(input: QuoteInput): string {
  if (input.contributionMode === "fixed") {
    const ee = formatUsd(Math.max(0, input.eeContributionCents || 0));
    if (input.coverDependents) {
      return `Employer pays ${ee} toward the employee-only premium and ${formatUsd(Math.max(0, input.depContributionCents || 0))} toward dependent premiums.`;
    }
    return `Employer pays ${ee} toward the employee-only premium. Dependent premiums are not employer-paid.`;
  }
  if (input.coverDependents) {
    return `Employer pays ${input.eeContributionPct}% of the employee-only premium and ${input.depContributionPct}% of dependent premiums.`;
  }
  return `Employer pays ${input.eeContributionPct}% of the employee-only premium. Dependent premiums are not employer-paid.`;
}

function shareForTier(
  rateCents: number,
  eeRateCents: number,
  rules: ContributionRules,
  forceNoDependents = false,
): { employer: number; employee: number } {
  const employeePortion = eeRateCents;
  const dependentPortion = Math.max(0, rateCents - eeRateCents);
  const coverDependents = forceNoDependents ? false : rules.coverDependents;
  let employer = 0;
  if (rules.mode === "fixed") {
    employer = Math.min(employeePortion, rules.eeFixedCents);
    if (coverDependents) {
      employer += Math.min(dependentPortion, rules.depFixedCents);
    }
  } else {
    employer =
      Math.round(employeePortion * rules.eePct) +
      (coverDependents ? Math.round(dependentPortion * rules.depPct) : 0);
  }
  const clamped = Math.min(rateCents, Math.max(0, Math.round(employer)));
  return { employer: clamped, employee: rateCents - clamped };
}

function quoteLine(
  id: string,
  kind: LineQuote["kind"],
  name: string,
  rates: TierRates,
  census: Census,
  rules: ContributionRules,
  eeOnly = false,
  networkLabel?: string,
): LineQuote {
  const eeRate = rates.ee;
  const byTier: TierBreakdown[] = [];
  let monthlyTotalCents = 0;
  let employerMonthlyCents = 0;
  let employeeMonthlyCents = 0;

  if (eeOnly) {
    const count = censusTotal(census);
    const rateCents = rates.ee;
    const { employer, employee } = shareForTier(rateCents, eeRate, rules, true);
    const totalCents = rateCents * count;
    monthlyTotalCents = totalCents;
    employerMonthlyCents = employer * count;
    employeeMonthlyCents = employee * count;
    byTier.push({
      tier: "ee",
      count,
      rateCents,
      totalCents,
      employerCents: employer * count,
      employeeCents: employee * count,
    });
  } else {
    for (const tier of TIER_ORDER) {
      const count = census[tier];
      if (count <= 0) continue;
      const rateCents = rates[tier];
      const { employer, employee } = shareForTier(rateCents, eeRate, rules);
      const totalCents = rateCents * count;
      monthlyTotalCents += totalCents;
      employerMonthlyCents += employer * count;
      employeeMonthlyCents += employee * count;
      byTier.push({
        tier,
        count,
        rateCents,
        totalCents,
        employerCents: employer * count,
        employeeCents: employee * count,
      });
    }
  }

  return {
    id,
    kind,
    name,
    networkLabel,
    monthlyTotalCents,
    employerMonthlyCents,
    employeeMonthlyCents,
    byTier,
  };
}

function buildSchedule(
  rated: RatedLine[],
  rules: ContributionRules,
  hsaPerEmployeeCents: number,
): ScheduleRow[] {
  return TIER_ORDER.map((tier) => {
    let premiumCents = 0;
    let employerCents = 0;
    let employeeCents = 0;
    for (const line of rated) {
      const rateCents = line.eeOnly ? line.rates.ee : line.rates[tier];
      const { employer, employee } = shareForTier(
        rateCents,
        line.rates.ee,
        rules,
        line.eeOnly,
      );
      premiumCents += rateCents;
      employerCents += employer;
      employeeCents += employee;
    }
    return {
      tier,
      premiumCents,
      employerCents: employerCents + hsaPerEmployeeCents,
      employeeCents,
    };
  });
}

export function emptyQuote(): QuoteResult {
  return {
    enrolled: 0,
    dependentCount: 0,
    lines: [],
    hsaSeedMonthlyCents: 0,
    hsaSeedNote: null,
    premiumMonthlyCents: 0,
    employerPremiumMonthlyCents: 0,
    employeeMonthlyCents: 0,
    employerMonthlyCents: 0,
    employerAnnualCents: 0,
    employeeAnnualCents: 0,
    pepmCents: 0,
    schedule: [],
  };
}

export function computeQuote(input: QuoteInput): QuoteResult {
  const census: Census = {
    ee: Math.max(0, input.census.ee | 0),
    eeSp: Math.max(0, input.census.eeSp | 0),
    eeCh: Math.max(0, input.census.eeCh | 0),
    family: Math.max(0, input.census.family | 0),
  };
  const lives = censusTotal(census);
  if (lives <= 0) return emptyQuote();

  const rules = contributionRulesFrom(input);

  const lines: LineQuote[] = [];
  const rated: RatedLine[] = [];
  const medical = getMedical(input.medicalPlanId);
  let hsaSeedMonthlyCents = 0;
  let hsaSeedNote: string | null = null;
  let hsaPerEmployeeCents = 0;

  if (medical) {
    const rates = getMedicalRate(medical, input.network);
    if (rates) {
      const networkLabel = input.network === "phcs" ? "PHCS" : "Cigna";
      lines.push(
        quoteLine(medical.id, "medical", medical.name, rates, census, rules, false, networkLabel),
      );
      rated.push({ rates, eeOnly: false });
      if (input.includeHsaSeed && medical.hsaSeedCents > 0) {
        hsaPerEmployeeCents = medical.hsaSeedCents;
        hsaSeedMonthlyCents = medical.hsaSeedCents * lives;
        hsaSeedNote = `$${medical.hsaSeedCents / 100}/mo HSA card × ${lives} enrolled`;
      }
    }
  }

  if (input.dentalPlanId) {
    const dental = dentalPlansForState(input.state).find((p) => p.id === input.dentalPlanId);
    if (dental) {
      lines.push(quoteLine(dental.id, "dental", dental.name, dental.rates, census, rules));
      rated.push({ rates: dental.rates, eeOnly: false });
    }
  }

  if (input.visionPlanId) {
    const vision = VISION_PLANS.find((p) => p.id === input.visionPlanId);
    if (vision) {
      lines.push(quoteLine(vision.id, "vision", vision.name, vision.rates, census, rules));
      rated.push({ rates: vision.rates, eeOnly: false });
    }
  }

  if (input.lifePlanId) {
    const life = LIFE_PLANS.find((p) => p.id === input.lifePlanId);
    if (life) {
      lines.push(quoteLine(life.id, "life", life.name, life.rates, census, rules, true));
      rated.push({ rates: life.rates, eeOnly: true });
    }
  }

  const premiumMonthlyCents = lines.reduce((s, l) => s + l.monthlyTotalCents, 0);
  const employerPremiumMonthlyCents = lines.reduce((s, l) => s + l.employerMonthlyCents, 0);
  const employeeMonthlyCents = lines.reduce((s, l) => s + l.employeeMonthlyCents, 0);
  const employerMonthlyCents = employerPremiumMonthlyCents + hsaSeedMonthlyCents;

  return {
    enrolled: lives,
    dependentCount: censusDependents(census),
    lines,
    hsaSeedMonthlyCents,
    hsaSeedNote,
    premiumMonthlyCents,
    employerPremiumMonthlyCents,
    employeeMonthlyCents,
    employerMonthlyCents,
    employerAnnualCents: employerMonthlyCents * 12,
    employeeAnnualCents: employeeMonthlyCents * 12,
    pepmCents: lives > 0 ? Math.round(employerMonthlyCents / lives) : 0,
    schedule: buildSchedule(rated, rules, hsaPerEmployeeCents),
  };
}

export function compareMedicalPlans(
  input: QuoteInput,
  plans: MedicalPlan[],
): { plan: MedicalPlan; employerMonthlyCents: number; premiumMonthlyCents: number }[] {
  return plans.map((plan) => {
    const result = computeQuote({ ...input, medicalPlanId: plan.id });
    return {
      plan,
      employerMonthlyCents: result.employerMonthlyCents,
      premiumMonthlyCents: result.premiumMonthlyCents,
    };
  });
}

export const DEFAULT_QUOTE: QuoteInput = {
  companyName: "",
  state: "CA",
  enrolled: 10,
  census: { ee: 10, eeSp: 0, eeCh: 0, family: 0 },
  censusMode: "mix",
  members: [],
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  effectiveDate: "2026-10-01",
  notes: "",
  network: "phcs",
  medicalPlanId: "hsa-8300",
  dentalPlanId: null,
  visionPlanId: null,
  lifePlanId: null,
  contributionMode: "percent",
  eeContributionPct: 100,
  eeContributionCents: 40000,
  coverDependents: false,
  depContributionPct: 50,
  depContributionCents: 20000,
  includeHsaSeed: true,
};

export type { AncillaryPlan };
