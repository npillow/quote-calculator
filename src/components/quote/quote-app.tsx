import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Building2,
  Check,
  ExternalLink,
  HeartPulse,
  Info,
  RotateCcw,
  Send,
  Shield,
  Smile,
  Stethoscope,
  Users,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/layout/site-shell";
import { CensusForm } from "@/components/quote/census-form";
import { PrintQuote } from "@/components/quote/print-quote";
import { RequestQuote } from "@/components/quote/request-quote";
import { Stepper } from "@/components/quote/stepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  LIFE_PLANS,
  NETWORK_LABELS,
  PROVIDER_SEARCH,
  QUOTE_META,
  HSA_LIMITS_2026,
  TIER_LABELS,
  TIER_ORDER,
  TIER_SHORT,
  US_STATES,
  VISION_PLANS,
  dentalPlansForState,
  getMedical,
  getMedicalRate,
  medicalPlansForNetwork,
  type MedicalPlan,
  type Network,
} from "@/lib/plans";
import {
  DEFAULT_QUOTE,
  censusDependents,
  compareMedicalPlans,
  computeQuote,
  describeContribution,
  setEmployeeOnly,
  setEnrolled,
  setTierCount,
  type ContributionMode,
  type QuoteInput,
} from "@/lib/quote";
import { cn, formatUsd } from "@/lib/utils";

const STORAGE_KEY = "xgb-group-quote-v2";

function dollarsToCents(raw: string): number {
  const n = Number(String(raw).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.round(Math.min(5000, n) * 100);
}

function centsToDollarInput(cents: number): string {
  const n = Math.max(0, cents || 0) / 100;
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

function Section({
  step,
  title,
  icon,
  children,
}: {
  step: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl bg-card p-5 shadow-card sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
          {icon}
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-accent">Step {step}</p>
          <h2 className="font-display text-lg font-semibold text-navy">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function ChoiceCard({
  selected,
  onSelect,
  children,
  className,
}: {
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "rounded-lg border p-4 text-left transition-colors duration-150",
        selected
          ? "border-accent bg-ice ring-1 ring-accent"
          : "border-border bg-card hover:border-sky/50 hover:bg-muted/60",
        className,
      )}
    >
      {children}
    </button>
  );
}

function mapPlanForNetwork(planId: string, network: Network): string {
  const plan = getMedical(planId);
  const available = medicalPlansForNetwork(network);
  if (available.some((p) => p.id === planId)) return planId;
  if (plan?.category === "vl" && network === "cigna") {
    const epo = available.find((p) => p.id === plan.id.replace("vl-", "epo-"));
    if (epo) return epo.id;
  }
  if (plan?.category === "epo" && network === "phcs") {
    const vl = available.find((p) => p.id === plan.id.replace("epo-", "vl-"));
    if (vl) return vl.id;
  }
  const sameName = available.find((p) => p.id === plan?.id);
  if (sameName) return sameName.id;
  const sameKind = available.find((p) => p.kind === plan?.kind && p.category === "ppo");
  return (sameKind ?? available[0])?.id ?? "hsa-8300";
}

export function QuoteApp() {
  const [input, setInput] = useState<QuoteInput>(DEFAULT_QUOTE);
  const [ready, setReady] = useState(false);
  const [showBenefits, setShowBenefits] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<QuoteInput>;
        setInput({
          ...DEFAULT_QUOTE,
          ...parsed,
          contributionMode: parsed.contributionMode === "fixed" ? "fixed" : "percent",
          members: Array.isArray(parsed.members) ? parsed.members : [],
          census: { ...DEFAULT_QUOTE.census, ...parsed.census },
        });
      }
    } catch {
      /* keep defaults */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
  }, [input, ready]);

  const patch = (partial: Partial<QuoteInput>) => setInput((prev) => ({ ...prev, ...partial }));

  const quote = useMemo(() => computeQuote(input), [input]);
  const medical = getMedical(input.medicalPlanId);
  const medicalRates = medical ? getMedicalRate(medical, input.network) : null;
  const networkPlans = medicalPlansForNetwork(input.network);
  const dentalOptions = dentalPlansForState(input.state);
  const dependentEnrolled = censusDependents(input.census);
  const comparisons = useMemo(
    () =>
      compareMedicalPlans(input, networkPlans).sort(
        (a, b) => a.employerMonthlyCents - b.employerMonthlyCents,
      ),
    [input, networkPlans],
  );

  const onNetwork = (network: Network) => {
    patch({
      network,
      medicalPlanId: mapPlanForNetwork(input.medicalPlanId, network),
    });
  };

  const onEnrolled = (n: number) => {
    const census = setEnrolled(n, input.census);
    patch({ enrolled: n, census });
  };

  const onPrint = () => window.print();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader onPrint={onPrint} />
      <PrintQuote input={input} quote={quote} />

      <main className="no-print mx-auto max-w-6xl px-4 py-6 pb-28 sm:px-6 sm:py-8 xl:pb-8">
        <div className="mb-6 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
            Group plans only · 10/1 rates
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Build a group quote
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Census, contribution, and plan mix against the XGB Marpai 10/1 2026 rate card. Totals
            update as you go.
          </p>
        </div>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="flex flex-col gap-5">
            <Section step="01" title="Group" icon={<Building2 className="size-4" />}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="company">Company name</Label>
                  <Input
                    id="company"
                    className="mt-2 normal-nums"
                    placeholder="Required to request a quote"
                    value={input.companyName}
                    onChange={(e) => patch({ companyName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="enrolled">Enrolled employees</Label>
                  <Input
                    id="enrolled"
                    inputMode="numeric"
                    className="mt-2 font-display text-lg tabular-nums"
                    value={input.enrolled}
                    disabled={input.censusMode === "members"}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^\d]/g, "");
                      onEnrolled(raw === "" ? 0 : Number(raw));
                    }}
                  />
                  {input.censusMode === "members" ? (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Headcount follows the employee census below.
                    </p>
                  ) : input.enrolled > 0 && input.enrolled < 100 ? (
                    <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                      <Info className="mt-0.5 size-3.5 shrink-0" />
                      One network allowed for groups under 100 enrolled employees.
                    </p>
                  ) : null}
                </div>
                <div>
                  <Label htmlFor="state">Situs state</Label>
                  <NativeSelect
                    id="state"
                    className="mt-2"
                    value={input.state}
                    onChange={(e) => {
                      const state = e.target.value;
                      const stillValid = dentalPlansForState(state).some(
                        (p) => p.id === input.dentalPlanId,
                      );
                      patch({
                        state,
                        dentalPlanId: stillValid ? input.dentalPlanId : null,
                      });
                    }}
                  >
                    {US_STATES.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name}
                      </option>
                    ))}
                  </NativeSelect>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Sets Humana dental PPO vs Traditional Preferred.
                  </p>
                </div>
              </div>
            </Section>

            <Section step="02" title="Employee census" icon={<Users className="size-4" />}>
              <CensusForm input={input} onPatch={patch} />
              {input.censusMode === "mix" ? (
              <div className="mt-4 flex flex-col gap-3">
                {TIER_ORDER.map((tier) => (
                  <div key={tier} className="rounded-lg bg-muted/70 px-3 py-2">
                    <Stepper
                      label={TIER_LABELS[tier]}
                      hint={
                        tier === "ee"
                          ? "Changing this also updates enrolled headcount"
                          : "Takes from employee-only; total stays the same"
                      }
                      value={input.census[tier]}
                      max={
                        tier === "ee"
                          ? 500 - dependentEnrolled
                          : input.enrolled -
                            (dependentEnrolled - input.census[tier])
                      }
                      onChange={(value) => {
                        if (tier === "ee") {
                          const next = setEmployeeOnly(input.census, value);
                          patch({ census: next.census, enrolled: next.enrolled });
                          return;
                        }
                        patch({
                          census: setTierCount(input.census, input.enrolled, tier, value),
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
              ) : null}
            </Section>

            <Section step="03" title="Medical plan" icon={<Stethoscope className="size-4" />}>
              <div className="mb-4 grid grid-cols-2 gap-2">
                {(["phcs", "cigna"] as Network[]).map((network) => (
                  <ChoiceCard
                    key={network}
                    selected={input.network === network}
                    onSelect={() => onNetwork(network)}
                  >
                    <p className="font-display text-sm font-semibold text-navy">
                      {NETWORK_LABELS[network]}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {network === "phcs" ? "PPO + visit-limit plans" : "PPO + Cigna EPO plans"}
                    </p>
                  </ChoiceCard>
                ))}
              </div>
              <a
                href={PROVIDER_SEARCH[input.network].href}
                target="_blank"
                rel="noreferrer"
                className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-navy"
              >
                {PROVIDER_SEARCH[input.network].label}
                <ExternalLink className="size-3.5" />
              </a>
              <p className="mb-3 text-xs text-muted-foreground">
                {PROVIDER_SEARCH[input.network].hint}
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {networkPlans.map((plan) => {
                  const rates = getMedicalRate(plan, input.network);
                  const selected = input.medicalPlanId === plan.id;
                  return (
                    <ChoiceCard
                      key={plan.id}
                      selected={selected}
                      onSelect={() => patch({ medicalPlanId: plan.id })}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-display font-semibold text-navy">{plan.shortName}</p>
                          <p className="mt-0.5 text-xs uppercase tracking-wide text-muted-foreground">
                            {plan.category === "ppo"
                              ? "PPO"
                              : plan.category === "vl"
                                ? "Visit limit"
                                : "EPO"}
                            {plan.kind === "hsa" ? " · HSA" : ""}
                          </p>
                        </div>
                        {selected ? (
                          <span className="flex size-6 items-center justify-center rounded-full bg-accent text-accent-foreground">
                            <Check className="size-3.5" />
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-3 font-display text-xl font-semibold tabular-nums text-navy">
                        {rates ? formatUsd(rates.ee) : "—"}
                        <span className="ml-1 text-sm font-normal text-muted-foreground">
                          EE / mo
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Deductible ${plan.deductibleIn.individual.toLocaleString()} ind.
                      </p>
                    </ChoiceCard>
                  );
                })}
              </div>

              {medical && medicalRates ? (
                <div className="mt-5 rounded-lg bg-muted/80 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-sm font-semibold text-navy">
                      {medical.name} snapshot
                    </p>
                    <button
                      type="button"
                      className="text-sm font-medium text-accent"
                      onClick={() => setShowBenefits((v) => !v)}
                    >
                      {showBenefits ? "Hide" : "Show"} details
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{medical.tagline}</p>
                  {showBenefits ? (
                    <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="text-muted-foreground">In-network deductible</dt>
                        <dd className="tabular-nums">
                          ${medical.deductibleIn.individual.toLocaleString()} / $
                          {medical.deductibleIn.family.toLocaleString()}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">In-network OOP max</dt>
                        <dd className="tabular-nums">
                          ${medical.oopIn.individual.toLocaleString()} / $
                          {medical.oopIn.family.toLocaleString()}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Member coinsurance</dt>
                        <dd>
                          {medical.coinsuranceIn} in / {medical.coinsuranceOut} out
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Included</dt>
                        <dd>
                          {QUOTE_META.telemedicine} telemedicine · {QUOTE_META.pharmacy} Rx
                        </dd>
                      </div>
                    </dl>
                  ) : null}
                  {showBenefits && medical.kind === "hsa" ? (
                    <div className="mt-4 rounded-md border border-accent/20 bg-ice px-3 py-3 text-sm">
                      <p className="font-medium text-navy">HSA tax room (2026)</p>
                      <p className="mt-1 text-muted-foreground">
                        IRS max ${HSA_LIMITS_2026.self.toLocaleString()} self-only / $
                        {HSA_LIMITS_2026.family.toLocaleString()} family
                        {medical.hsaSeedCents > 0
                          ? `. Employer card is $${medical.hsaSeedCents / 100}/mo ($${(medical.hsaSeedCents * 12) / 100}/yr) toward that cap.`
                          : "."}{" "}
                        Payroll contributions are pre-tax and skip FICA. Qualified medical
                        withdrawals are tax-free.
                      </p>
                    </div>
                  ) : null}
                  {showBenefits ? (
                    <ul className="mt-3 space-y-1 text-sm text-foreground">
                      {medical.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                          {h}
                        </li>
                      ))}
                      {medical.visitLimits?.map((h) => (
                        <li key={h} className="flex gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-warn" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-72 text-left text-sm">
                      <thead>
                        <tr className="text-muted-foreground">
                          <th className="pb-1 font-medium">Tier</th>
                          <th className="pb-1 font-medium">Monthly rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TIER_ORDER.map((tier) => (
                          <tr key={tier} className="border-t border-border">
                            <td className="py-1.5">{TIER_LABELS[tier]}</td>
                            <td className="py-1.5 tabular-nums">{formatUsd(medicalRates[tier])}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </Section>

            <Section step="04" title="Ancillary" icon={<Smile className="size-4" />}>
              <AncillaryBlock
                title="Dental"
                noneSelected={input.dentalPlanId === null}
                onNone={() => patch({ dentalPlanId: null })}
              >
                {dentalOptions.map((plan) => (
                  <ChoiceCard
                    key={plan.id}
                    selected={input.dentalPlanId === plan.id}
                    onSelect={() => patch({ dentalPlanId: plan.id })}
                  >
                    <p className="font-medium text-navy">{plan.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{plan.subtitle}</p>
                    <p className="mt-2 font-display text-lg font-semibold tabular-nums">
                      {formatUsd(plan.rates.ee)}
                      <span className="ml-1 text-sm font-normal text-muted-foreground">EE</span>
                    </p>
                  </ChoiceCard>
                ))}
              </AncillaryBlock>

              <Separator className="my-5" />

              <AncillaryBlock
                title="Vision"
                noneSelected={input.visionPlanId === null}
                onNone={() => patch({ visionPlanId: null })}
              >
                {VISION_PLANS.map((plan) => (
                  <ChoiceCard
                    key={plan.id}
                    selected={input.visionPlanId === plan.id}
                    onSelect={() => patch({ visionPlanId: plan.id })}
                  >
                    <p className="font-medium text-navy">{plan.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{plan.subtitle}</p>
                    <p className="mt-2 font-display text-lg font-semibold tabular-nums">
                      {formatUsd(plan.rates.ee)}
                      <span className="ml-1 text-sm font-normal text-muted-foreground">EE</span>
                    </p>
                  </ChoiceCard>
                ))}
              </AncillaryBlock>

              <Separator className="my-5" />

              <AncillaryBlock
                title="Life + AD&D"
                noneSelected={input.lifePlanId === null}
                onNone={() => patch({ lifePlanId: null })}
              >
                {LIFE_PLANS.map((plan) => (
                  <ChoiceCard
                    key={plan.id}
                    selected={input.lifePlanId === plan.id}
                    onSelect={() => patch({ lifePlanId: plan.id })}
                  >
                    <p className="font-medium text-navy">{plan.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{plan.subtitle}</p>
                    <p className="mt-2 font-display text-lg font-semibold tabular-nums">
                      {formatUsd(plan.rates.ee)}
                      <span className="ml-1 text-sm font-normal text-muted-foreground">
                        EE / mo
                      </span>
                    </p>
                  </ChoiceCard>
                ))}
              </AncillaryBlock>
            </Section>

            <Section step="05" title="Employer contribution" icon={<HeartPulse className="size-4" />}>
              <div className="mb-5 grid grid-cols-2 gap-2">
                {(
                  [
                    ["percent", "Percentage", "Pay a percent of premium"],
                    ["fixed", "Fixed dollar", "Pay a set amount per contract"],
                  ] as const
                ).map(([mode, label, hint]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => patch({ contributionMode: mode as ContributionMode })}
                    className={cn(
                      "rounded-lg border p-3 text-left transition-colors duration-150",
                      input.contributionMode === mode
                        ? "border-accent bg-ice ring-1 ring-accent"
                        : "border-border bg-card hover:border-sky/50 hover:bg-muted/60",
                    )}
                  >
                    <p className="font-display text-sm font-semibold text-navy">{label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
                  </button>
                ))}
              </div>

              {input.contributionMode === "fixed" ? (
                <div>
                  <Label htmlFor="ee-fixed">Employee premium paid by employer</Label>
                  <div className="relative mt-2 w-full min-w-0 max-w-xs">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="ee-fixed"
                      className="pl-7 font-display text-lg tabular-nums"
                      inputMode="decimal"
                      value={centsToDollarInput(input.eeContributionCents)}
                      onChange={(e) => patch({ eeContributionCents: dollarsToCents(e.target.value) })}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      / mo
                    </span>
                  </div>
                  <Slider
                    className="mt-4"
                    min={0}
                    max={2000}
                    step={25}
                    value={[Math.round((input.eeContributionCents || 0) / 100)]}
                    onValueChange={([v]) => patch({ eeContributionCents: Math.round((v ?? 0) * 100) })}
                    aria-label="Employee premium paid by employer in dollars"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Applied to the employee-only rate on every enrolled contract. The employee pays
                    anything above this amount. Capped at the actual premium.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-end justify-between gap-3">
                    <Label htmlFor="ee-pct">Employee premium paid by employer</Label>
                    <span className="font-display text-2xl font-semibold tabular-nums text-navy">
                      {input.eeContributionPct}%
                    </span>
                  </div>
                  <Slider
                    className="mt-4"
                    id="ee-pct"
                    min={0}
                    max={100}
                    step={5}
                    value={[input.eeContributionPct]}
                    onValueChange={([v]) => patch({ eeContributionPct: v ?? 0 })}
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Applied to the employee-only rate on every enrolled contract, including dependent
                    tiers.
                  </p>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-4 rounded-lg bg-muted/80 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Cover dependent premiums</p>
                  <p className="text-xs text-muted-foreground">
                    {input.contributionMode === "fixed"
                      ? "Adds a set dollar amount on premium above the employee-only rate for EE+SP, EE+CH, and family."
                      : "Pays a percent of premium above the employee-only rate on EE+SP, EE+CH, and family contracts."}{" "}
                    Shows on the contribution schedule even before those lives are in the census.
                  </p>
                </div>
                <Switch
                  checked={input.coverDependents}
                  onCheckedChange={(checked) => patch({ coverDependents: checked })}
                  aria-label="Cover dependent premiums"
                />
              </div>

              {input.coverDependents ? (
                input.contributionMode === "fixed" ? (
                  <div className="mt-5">
                    <Label htmlFor="dep-fixed">Dependent premium paid by employer</Label>
                    <div className="relative mt-2 w-full min-w-0 max-w-xs">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        id="dep-fixed"
                        className="pl-7 font-display text-lg tabular-nums"
                        inputMode="decimal"
                        value={centsToDollarInput(input.depContributionCents)}
                        onChange={(e) =>
                          patch({ depContributionCents: dollarsToCents(e.target.value) })
                        }
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        / mo
                      </span>
                    </div>
                    <Slider
                      className="mt-4"
                      min={0}
                      max={2000}
                      step={25}
                      value={[Math.round((input.depContributionCents || 0) / 100)]}
                      onValueChange={([v]) =>
                        patch({ depContributionCents: Math.round((v ?? 0) * 100) })
                      }
                      aria-label="Dependent premium paid by employer in dollars"
                    />
                  </div>
                ) : (
                  <div className="mt-5">
                    <div className="flex items-end justify-between gap-3">
                      <Label htmlFor="dep-pct">Dependent premium paid by employer</Label>
                      <span className="font-display text-2xl font-semibold tabular-nums text-navy">
                        {input.depContributionPct}%
                      </span>
                    </div>
                    <Slider
                      className="mt-4"
                      id="dep-pct"
                      min={0}
                      max={100}
                      step={5}
                      value={[input.depContributionPct]}
                      onValueChange={([v]) => patch({ depContributionPct: v ?? 0 })}
                    />
                  </div>
                )
              ) : null}

              <p className="mt-4 text-sm text-muted-foreground">{describeContribution(input)}</p>

              {medical && medical.hsaSeedCents > 0 ? (
                <div className="mt-5 flex items-center justify-between gap-4 rounded-lg bg-muted/80 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Include ${medical.hsaSeedCents / 100}/mo HSA card
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Adds employer funding of {formatUsd(medical.hsaSeedCents)} per enrolled
                      employee. Not part of the listed premium.
                    </p>
                  </div>
                  <Switch
                    checked={input.includeHsaSeed}
                    onCheckedChange={(checked) => patch({ includeHsaSeed: checked })}
                    aria-label="Include HSA contribution"
                  />
                </div>
              ) : null}

              <Button
                type="button"
                variant="outline"
                className="mt-5"
                onClick={() => {
                  localStorage.removeItem(STORAGE_KEY);
                  setInput(DEFAULT_QUOTE);
                }}
              >
                <RotateCcw />
                Reset quote
              </Button>
            </Section>

            <Section step="06" title="Request this quote" icon={<Send className="size-4" />}>
              <RequestQuote
                input={input}
                quote={quote}
                onPatch={patch}
              />
            </Section>
          </div>

          <aside className="xl:sticky xl:top-6 xl:max-h-[calc(100vh-2rem)] xl:overflow-y-auto">
            <QuoteRail
              quote={quote}
              input={input}
              medical={medical}
              comparisons={comparisons}
              onSelectPlan={(id) => patch({ medicalPlanId: id })}
            />
          </aside>
        </div>
      </main>

      <div className="no-print sticky bottom-0 z-20 border-t border-border bg-card/95 px-4 py-3 backdrop-blur xl:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Employer monthly</p>
            <p className="font-display text-xl font-semibold tabular-nums text-navy">
              {formatUsd(quote.employerMonthlyCents)}
            </p>
          </div>
          <Button type="button" onClick={onPrint}>
            Print
          </Button>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

function AncillaryBlock({
  title,
  noneSelected,
  onNone,
  children,
}: {
  title: string;
  noneSelected: boolean;
  onNone: () => void;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-navy">{title}</h3>
        <button
          type="button"
          onClick={onNone}
          className={cn(
            "text-sm font-medium",
            noneSelected ? "text-navy" : "text-muted-foreground hover:text-navy",
          )}
        >
          {noneSelected ? "Not included" : "Remove"}
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function QuoteRail({
  quote,
  input,
  medical,
  comparisons,
  onSelectPlan,
}: {
  quote: ReturnType<typeof computeQuote>;
  input: QuoteInput;
  medical: MedicalPlan | undefined;
  comparisons: ReturnType<typeof compareMedicalPlans>;
  onSelectPlan: (id: string) => void;
}) {
  return (
    <div className="rounded-xl bg-navy p-5 text-primary-foreground shadow-card sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky">Live quote</p>
        <Badge variant="accent" className="bg-sky/20 text-sky">
          {QUOTE_META.effective}
        </Badge>
      </div>
      <p className="mt-4 text-sm text-primary-foreground/70">Employer monthly cost</p>
      <p className="font-display text-4xl font-semibold tabular-nums tracking-tight">
        {formatUsd(quote.employerMonthlyCents)}
      </p>
      <p className="mt-1 text-sm text-primary-foreground/70">
        {formatUsd(quote.employerAnnualCents)} / year · {formatUsd(quote.pepmCents)} PEPM
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md bg-navy-deep/60 p-3">
          <dt className="text-primary-foreground/60">Premium</dt>
          <dd className="mt-1 font-display text-lg font-semibold tabular-nums">
            {formatUsd(quote.premiumMonthlyCents)}
          </dd>
        </div>
        <div className="rounded-md bg-navy-deep/60 p-3">
          <dt className="text-primary-foreground/60">Employees pay</dt>
          <dd className="mt-1 font-display text-lg font-semibold tabular-nums">
            {formatUsd(quote.employeeMonthlyCents)}
          </dd>
        </div>
      </dl>

      <Separator className="my-5 bg-primary-foreground/15" />

      <ul className="space-y-3 text-sm">
        {quote.lines.length === 0 ? (
          <li className="text-primary-foreground/70">Add enrolled employees to see a total.</li>
        ) : (
          quote.lines.map((line) => (
            <li key={line.id} className="flex items-start justify-between gap-3">
              <span>
                <span className="block font-medium">{line.name}</span>
                <span className="text-xs text-primary-foreground/60">
                  {line.kind}
                  {line.networkLabel ? ` · ${line.networkLabel}` : ""}
                </span>
              </span>
              <span className="tabular-nums">{formatUsd(line.employerMonthlyCents)}</span>
            </li>
          ))
        )}
        {quote.hsaSeedMonthlyCents > 0 ? (
          <li className="flex items-start justify-between gap-3">
            <span>
              <span className="block font-medium">HSA card</span>
              <span className="text-xs text-primary-foreground/60">{quote.hsaSeedNote}</span>
            </span>
            <span className="tabular-nums">{formatUsd(quote.hsaSeedMonthlyCents)}</span>
          </li>
        ) : null}
      </ul>

      {quote.schedule.length ? (
        <>
          <Separator className="my-5 bg-primary-foreground/15" />
          <p className="text-xs font-medium uppercase tracking-wider text-sky">
            Monthly contribution schedule
          </p>
          <p className="mt-1 text-xs text-primary-foreground/60">
            What one employee on each tier costs — employer vs paycheck.
          </p>
          <table className="mt-3 w-full text-left text-xs">
            <thead>
              <tr className="text-primary-foreground/55">
                <th className="pb-1.5 font-medium">Tier</th>
                <th className="pb-1.5 text-right font-medium">Rate</th>
                <th className="pb-1.5 text-right font-medium">ER</th>
                <th className="pb-1.5 text-right font-medium">EE pays</th>
              </tr>
            </thead>
            <tbody>
              {quote.schedule.map((row) => (
                <tr key={row.tier} className="border-t border-primary-foreground/10">
                  <td className="py-1.5">{TIER_SHORT[row.tier]}</td>
                  <td className="py-1.5 text-right tabular-nums">{formatUsd(row.premiumCents)}</td>
                  <td className="py-1.5 text-right tabular-nums">{formatUsd(row.employerCents)}</td>
                  <td className="py-1.5 text-right tabular-nums font-medium">
                    {formatUsd(row.employeeCents)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}

      {quote.lines[0]?.byTier.length ? (
        <>
          <Separator className="my-5 bg-primary-foreground/15" />
          <p className="text-xs font-medium uppercase tracking-wider text-sky">Medical by tier</p>
          <ul className="mt-3 space-y-2 text-sm">
            {quote.lines[0].byTier.map((row) => (
              <li key={row.tier} className="flex justify-between gap-3">
                <span className="text-primary-foreground/80">
                  {TIER_LABELS[row.tier]} × {row.count}
                </span>
                <span className="tabular-nums">{formatUsd(row.employerCents)}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <Separator className="my-5 bg-primary-foreground/15" />
      <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-sky">
        <Shield className="size-3.5" />
        Employer cost by medical plan
      </p>
      <ul className="mt-3 space-y-1">
        {comparisons.map(({ plan, employerMonthlyCents }) => {
          const active = plan.id === input.medicalPlanId;
          return (
            <li key={plan.id}>
              <button
                type="button"
                onClick={() => onSelectPlan(plan.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                  active ? "bg-sky/15" : "hover:bg-navy-deep/80",
                )}
              >
                <span className={active ? "font-medium text-sky" : "text-primary-foreground/80"}>
                  {plan.shortName}
                </span>
                <span className="tabular-nums">{formatUsd(employerMonthlyCents)}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {medical ? (
        <p className="mt-4 text-xs leading-relaxed text-primary-foreground/55">
          Comparison holds census, contribution, and ancillary constant. Selected plan:{" "}
          {medical.name}.
        </p>
      ) : null}
    </div>
  );
}
