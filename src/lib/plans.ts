export type Tier = "ee" | "eeSp" | "eeCh" | "family";
export type Network = "phcs" | "cigna";

export const TIER_ORDER: Tier[] = ["ee", "eeSp", "eeCh", "family"];

export const TIER_LABELS: Record<Tier, string> = {
  ee: "Employee only",
  eeSp: "Employee + spouse",
  eeCh: "Employee + child(ren)",
  family: "Family",
};

export const TIER_SHORT: Record<Tier, string> = {
  ee: "EE",
  eeSp: "EE+SP",
  eeCh: "EE+CH",
  family: "Family",
};

export type TierRates = Record<Tier, number>;

export type MedicalPlan = {
  id: string;
  name: string;
  shortName: string;
  category: "ppo" | "vl" | "epo";
  kind: "hsa" | "copay" | "deductible";
  networks: Network[];
  rates: Record<Network, TierRates | null>;
  hsaSeedCents: number;
  tagline: string;
  deductibleIn: { individual: number; family: number };
  deductibleOut: { individual: number; family: number } | null;
  oopIn: { individual: number; family: number };
  oopOut: { individual: number; family: number } | null;
  coinsuranceIn: string;
  coinsuranceOut: string;
  highlights: string[];
  visitLimits?: string[];
};

export type AncillaryPlan = {
  id: string;
  name: string;
  subtitle: string;
  rates: TierRates;
  eeOnly?: boolean;
  states?: "humana-ppo" | "humana-trad" | "all";
};

export const HUMANA_TRADITIONAL_STATES = ["AK", "GA", "LA", "SD", "TX", "WV"] as const;

export const US_STATES: { code: string; name: string }[] = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

const usd = (dollars: number) => Math.round(dollars * 100);

const ppo = (phcs: [number, number, number, number], cigna: [number, number, number, number]) => ({
  phcs: { ee: usd(phcs[0]), eeSp: usd(phcs[1]), eeCh: usd(phcs[2]), family: usd(phcs[3]) },
  cigna: { ee: usd(cigna[0]), eeSp: usd(cigna[1]), eeCh: usd(cigna[2]), family: usd(cigna[3]) },
});

const oneNet = (network: Network, rates: [number, number, number, number]) => ({
  phcs: network === "phcs" ? { ee: usd(rates[0]), eeSp: usd(rates[1]), eeCh: usd(rates[2]), family: usd(rates[3]) } : null,
  cigna: network === "cigna" ? { ee: usd(rates[0]), eeSp: usd(rates[1]), eeCh: usd(rates[2]), family: usd(rates[3]) } : null,
});

export const MEDICAL_PLANS: MedicalPlan[] = [
  {
    id: "hsa-8300",
    name: "8300 HSA",
    shortName: "8300 HSA",
    category: "ppo",
    kind: "hsa",
    networks: ["phcs", "cigna"],
    rates: ppo([529, 919, 1039, 1299], [589, 969, 1089, 1349]),
    hsaSeedCents: 2500,
    tagline: "For healthy groups that want a tax-advantaged HSA and $0 coinsurance after the deductible.",
    deductibleIn: { individual: 8300, family: 16600 },
    deductibleOut: { individual: 16600, family: 33200 },
    oopIn: { individual: 8300, family: 16600 },
    oopOut: { individual: 16600, family: 33200 },
    coinsuranceIn: "0%",
    coinsuranceOut: "50%",
    highlights: [
      "Includes $25/mo HSA card funding",
      "Preventive and telemedicine $0 copay",
      "In-network: deductible then plan pays 100%",
      "Preventive Rx $0; all other Rx subject to deductible",
    ],
  },
  {
    id: "hsa-3500",
    name: "3500 HSA",
    shortName: "3500 HSA",
    category: "ppo",
    kind: "hsa",
    networks: ["phcs", "cigna"],
    rates: ppo([649, 1339, 1199, 1869], [709, 1389, 1259, 1929]),
    hsaSeedCents: 0,
    tagline: "Lower deductible HSA with a $7,000 individual in-network out-of-pocket max.",
    deductibleIn: { individual: 3500, family: 7000 },
    deductibleOut: { individual: 7000, family: 14000 },
    oopIn: { individual: 7000, family: 14000 },
    oopOut: { individual: 14000, family: 28000 },
    coinsuranceIn: "30%",
    coinsuranceOut: "50%",
    highlights: [
      "HSA-qualified HDHP",
      "Preventive and telemedicine $0 copay",
      "In-network: deductible + 30% coinsurance",
      "Preventive Rx $0; other Rx after deductible",
    ],
  },
  {
    id: "copay-4500",
    name: "$4500 Copay",
    shortName: "$4500 Copay",
    category: "ppo",
    kind: "copay",
    networks: ["phcs", "cigna"],
    rates: ppo([687, 1449, 1294, 1919], [759, 1489, 1379, 1974]),
    hsaSeedCents: 0,
    tagline: "Copays for office visits and drugs, with protection from catastrophic loss.",
    deductibleIn: { individual: 4500, family: 9000 },
    deductibleOut: { individual: 9000, family: 18000 },
    oopIn: { individual: 9000, family: 18000 },
    oopOut: { individual: 18000, family: 36000 },
    coinsuranceIn: "30%",
    coinsuranceOut: "50%",
    highlights: [
      "PCP $40 / specialist $75 / urgent care $90",
      "Unlimited telemedicine $0",
      "Rx: $20 / $65 / $95 / $200 specialty",
      "Hospital services: deductible + 30%",
    ],
  },
  {
    id: "copay-3500",
    name: "$3500 Copay",
    shortName: "$3500 Copay",
    category: "ppo",
    kind: "copay",
    networks: ["phcs", "cigna"],
    rates: ppo([794, 1512, 1479, 2199], [864, 1559, 1529, 2249]),
    hsaSeedCents: 0,
    tagline: "Richer copay plan for groups that use care more often or take multiple medications.",
    deductibleIn: { individual: 3500, family: 7000 },
    deductibleOut: { individual: 7000, family: 14000 },
    oopIn: { individual: 7000, family: 14000 },
    oopOut: { individual: 14000, family: 28000 },
    coinsuranceIn: "20%",
    coinsuranceOut: "50%",
    highlights: [
      "PCP $40 / specialist $75 / urgent care $90",
      "Unlimited telemedicine $0",
      "Hospital services: deductible + 20%",
      "Rx: $20 / $65 / $95 / $200 specialty",
    ],
  },
  {
    id: "vl-1750",
    name: "HSA VL 1750",
    shortName: "VL 1750 HSA",
    category: "vl",
    kind: "hsa",
    networks: ["phcs"],
    rates: oneNet("phcs", [359, 689, 679, 959]),
    hsaSeedCents: 2500,
    tagline: "Visit-limit HSA on PHCS with $25/mo HSA funding. Deductible must be met before copays.",
    deductibleIn: { individual: 1750, family: 3500 },
    deductibleOut: null,
    oopIn: { individual: 8500, family: 17000 },
    oopOut: null,
    coinsuranceIn: "Copay after deductible",
    coinsuranceOut: "N/A",
    highlights: [
      "Includes $25/mo HSA card funding",
      "Office / UC / specialist $50 after deductible",
      "Generic Rx $0; brand via PAP",
      "PHCS Extended PPO only",
    ],
    visitLimits: [
      "10 physician visits per year combined",
      "Inpatient: 2 ICU + 2 non-ICU per year",
      "3 outpatient surgeries per year",
      "ER: 2 accident + 2 sickness per year",
      "Labs, X-rays, and advanced imaging: 3 each per year",
    ],
  },
  {
    id: "vl-1000",
    name: "VL 1000 Deductible",
    shortName: "VL 1000",
    category: "vl",
    kind: "deductible",
    networks: ["phcs"],
    rates: oneNet("phcs", [399, 729, 719, 1029]),
    hsaSeedCents: 0,
    tagline: "Visit-limit plan on PHCS. Deductible must be met before copays apply.",
    deductibleIn: { individual: 1000, family: 2000 },
    deductibleOut: null,
    oopIn: { individual: 8500, family: 17000 },
    oopOut: null,
    coinsuranceIn: "Copay after deductible",
    coinsuranceOut: "N/A",
    highlights: [
      "Office / UC / specialist $50 after deductible",
      "Inpatient $1,000 copay after deductible",
      "Generic Rx $0; brand via PAP",
      "PHCS Extended PPO only",
    ],
    visitLimits: [
      "10 physician visits per year combined",
      "Inpatient: 2 ICU + 2 non-ICU per year",
      "3 outpatient surgeries per year",
      "ER: 2 accident + 2 sickness per year",
      "Labs, X-rays, and advanced imaging: 3 each per year",
    ],
  },
  {
    id: "epo-1750",
    name: "HSA EPO 1750",
    shortName: "EPO 1750 HSA",
    category: "epo",
    kind: "hsa",
    networks: ["cigna"],
    rates: oneNet("cigna", [439, 789, 779, 1079]),
    hsaSeedCents: 2500,
    tagline: "Cigna EPO HSA with $25/mo HSA funding. No visit caps; deductible applies before copays.",
    deductibleIn: { individual: 1750, family: 3500 },
    deductibleOut: null,
    oopIn: { individual: 8500, family: 17000 },
    oopOut: null,
    coinsuranceIn: "Copay after deductible",
    coinsuranceOut: "N/A",
    highlights: [
      "Includes $25/mo HSA card funding",
      "PCP / specialist / UC $50 after deductible",
      "Inpatient / outpatient surgery $2,500 copay after deductible",
      "Generic Rx $0; brand via PAP",
    ],
  },
  {
    id: "epo-1000",
    name: "EPO 1000 Deductible",
    shortName: "EPO 1000",
    category: "epo",
    kind: "deductible",
    networks: ["cigna"],
    rates: oneNet("cigna", [489, 829, 819, 1149]),
    hsaSeedCents: 0,
    tagline: "Cigna EPO. Deductible must be met before copays. No visit caps.",
    deductibleIn: { individual: 1000, family: 2000 },
    deductibleOut: null,
    oopIn: { individual: 8500, family: 17000 },
    oopOut: null,
    coinsuranceIn: "Copay after deductible",
    coinsuranceOut: "N/A",
    highlights: [
      "PCP / specialist / UC $50 after deductible",
      "ER $1,000 copay after deductible",
      "Inpatient / surgery $2,500 copay after deductible",
      "Generic Rx $0; brand via PAP",
    ],
  },
];

export const DENTAL_PLANS: AncillaryPlan[] = [
  {
    id: "humana-1500",
    name: "Humana Dental $1,500",
    subtitle: "PPO 100/80/50 in · 80/50/50 out · U&C+",
    rates: { ee: usd(51.26), eeSp: usd(105.43), eeCh: usd(105.43), family: usd(162.69) },
    states: "humana-ppo",
  },
  {
    id: "humana-unl",
    name: "Humana Dental Unlimited",
    subtitle: "PPO 100/80/50 · ortho $1,500 · U&C+",
    rates: { ee: usd(56.97), eeSp: usd(121.1), eeCh: usd(121.1), family: usd(194.88) },
    states: "humana-ppo",
  },
  {
    id: "humana-1500-trad",
    name: "Humana Dental $1,500",
    subtitle: "Traditional Preferred 100/80/50 · U&C+",
    rates: { ee: usd(61.01), eeSp: usd(125.5), eeCh: usd(125.5), family: usd(193.64) },
    states: "humana-trad",
  },
  {
    id: "humana-unl-trad",
    name: "Humana Dental Unlimited",
    subtitle: "Traditional Preferred 100/80/50 · ortho $1,500",
    rates: { ee: usd(70.12), eeSp: usd(148.15), eeCh: usd(148.15), family: usd(236.65) },
    states: "humana-trad",
  },
  {
    id: "smart-premium",
    name: "Smart Premium $1,000",
    subtitle: "Open Access PPO 100/80/50 · $50 / $150 deductible",
    rates: { ee: usd(34.77), eeSp: usd(69.54), eeCh: usd(78.58), family: usd(113.34) },
    states: "all",
  },
  {
    id: "smart-plus",
    name: "Smart Premium Plus $2,000",
    subtitle: "Open Access PPO 100/80/50 · ortho included",
    rates: { ee: usd(60.22), eeSp: usd(120.45), eeCh: usd(131.73), family: usd(191.95) },
    states: "all",
  },
];

export const VISION_PLANS: AncillaryPlan[] = [
  {
    id: "vsp-choice",
    name: "VSP Choice",
    subtitle: "$10 exam · $25 lenses · $150 frame / elective contacts",
    rates: { ee: usd(9.52), eeSp: usd(19.04), eeCh: usd(20.78), family: usd(32.42) },
    states: "all",
  },
  {
    id: "humana-vision",
    name: "Humana Vision",
    subtitle: "$10 / $10 copay · $150 frame · $150 contact allowance",
    rates: { ee: usd(14.54), eeSp: usd(30.14), eeCh: usd(30.14), family: usd(41.17) },
    states: "all",
  },
];

export const LIFE_PLANS: AncillaryPlan[] = [
  {
    id: "life-20k",
    name: "Basic Life + AD&D $20K",
    subtitle: "Employee-only benefit",
    rates: { ee: usd(5), eeSp: 0, eeCh: 0, family: 0 },
    eeOnly: true,
    states: "all",
  },
  {
    id: "life-200k",
    name: "Basic Life + AD&D $200K",
    subtitle: "Employee-only benefit",
    rates: { ee: usd(49), eeSp: 0, eeCh: 0, family: 0 },
    eeOnly: true,
    states: "all",
  },
];

export const NETWORK_LABELS: Record<Network, string> = {
  phcs: "PHCS Extended PPO",
  cigna: "Cigna PPO / EPO",
};

export const PROVIDER_SEARCH = {
  phcs: {
    label: "PHCS provider search",
    href: "https://providersearch.multiplan.com/",
    hint: "Select PHCS Extended PPO",
  },
  cigna: {
    label: "Cigna provider search",
    href: "https://www.cigna.com/",
    hint: "Find a Doctor → Guest → PPO / Choice Fund PPO",
  },
} as const;

export const QUOTE_META = {
  carrier: "X Group Benefits",
  administrator: "Marpai",
  effective: "October 1, 2026",
  contract: "Contract 15/21",
  version: "V2.5.81226",
  pharmacy: "Phoenix",
  telemedicine: "Recuro",
};

export const HSA_LIMITS_2026 = {
  self: 4400,
  family: 8750,
  catchUp: 1000,
} as const;

export function isTraditionalDentalState(state: string): boolean {
  return (HUMANA_TRADITIONAL_STATES as readonly string[]).includes(state);
}

export function dentalPlansForState(state: string): AncillaryPlan[] {
  const trad = isTraditionalDentalState(state);
  return DENTAL_PLANS.filter((p) => {
    if (p.states === "all") return true;
    if (p.states === "humana-trad") return trad;
    if (p.states === "humana-ppo") return !trad;
    return false;
  });
}

export function getMedical(id: string): MedicalPlan | undefined {
  return MEDICAL_PLANS.find((p) => p.id === id);
}

export function medicalPlansForNetwork(network: Network): MedicalPlan[] {
  return MEDICAL_PLANS.filter((p) => p.networks.includes(network));
}

export function getMedicalRate(plan: MedicalPlan, network: Network): TierRates | null {
  return plan.rates[network];
}
