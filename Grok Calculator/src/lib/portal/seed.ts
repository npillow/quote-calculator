import type { Profile } from "./types";

function hashUser(userId: string): number {
  let h = 2166136261;
  for (let i = 0; i < userId.length; i += 1) {
    h ^= userId.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function memberIdFromUser(userId: string): string {
  const n = 10000000 + (hashUser(userId) % 90000000);
  return `NPB-${n}`;
}

export function buildProfile(input: {
  userId: string;
  displayName: string | null;
  email: string | null;
}): Profile {
  const raw = (input.displayName ?? input.email ?? "Member").trim();
  const parts = raw.replace(/@.*/, "").split(/[\s._-]+/).filter(Boolean);
  const firstName = cap(parts[0] ?? "Member");
  const lastName = cap(parts.slice(1).join(" ") || "Account");
  return {
    userId: input.userId,
    firstName,
    lastName,
    memberId: memberIdFromUser(input.userId),
    employer: "Riverside Precision Metals",
    groupNumber: "GRP-88421",
    dateOfBirth: "1988-04-16",
    phone: "(951) 555-0148",
    addressLine: "412 Mission Blvd",
    city: "Riverside",
    state: "CA",
    zip: "92501",
    jobTitle: "Operations Lead",
  };
}

function cap(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function seedRows(profile: Profile) {
  const { userId, memberId, groupNumber, firstName } = profile;
  const coverages = [
    {
      type: "medical",
      planName: "Blue Shield of California Gold PPO",
      carrier: "Blue Shield of California",
      memberId,
      groupNumber,
      effectiveDate: "2026-01-01",
      status: "active",
      deductibleUsed: 420,
      deductibleMax: 1500,
      oopUsed: 890,
      oopMax: 5500,
      premiumEmployee: 186.4,
      network: "PPO Prudent Buyer",
      summary:
        "In-network office visit $25 copay. Specialist $45. Emergency $250. Preventive care covered at 100%.",
    },
    {
      type: "dental",
      planName: "Delta Dental PPO",
      carrier: "Delta Dental of California",
      memberId: `DD-${memberId.slice(-8)}`,
      groupNumber,
      effectiveDate: "2026-01-01",
      status: "active",
      deductibleUsed: 0,
      deductibleMax: 50,
      oopUsed: 0,
      oopMax: 2000,
      premiumEmployee: 28.1,
      network: "Delta Dental PPO",
      summary: "100% preventive, 80% basic, 50% major. $2,000 annual maximum.",
    },
    {
      type: "vision",
      planName: "VSP Signature",
      carrier: "Vision Service Plan",
      memberId: `VSP-${memberId.slice(-8)}`,
      groupNumber,
      effectiveDate: "2026-01-01",
      status: "active",
      deductibleUsed: 0,
      deductibleMax: 0,
      oopUsed: 0,
      oopMax: 0,
      premiumEmployee: 12.75,
      network: "VSP Signature",
      summary: "Annual exam $10 copay. $150 frame allowance. Lenses covered in full.",
    },
    {
      type: "life",
      planName: "Basic Life & AD&D — 2× salary",
      carrier: "MetLife",
      memberId,
      groupNumber,
      effectiveDate: "2026-01-01",
      status: "active",
      deductibleUsed: 0,
      deductibleMax: 0,
      oopUsed: 0,
      oopMax: 0,
      premiumEmployee: 0,
      network: "Employer paid",
      summary: "Company-paid basic life equal to two times annual salary, plus matching AD&D.",
    },
    {
      type: "retirement",
      planName: "NP Benefits 401(k)",
      carrier: "Empower",
      memberId,
      groupNumber,
      effectiveDate: "2025-06-01",
      status: "active",
      deductibleUsed: 0,
      deductibleMax: 0,
      oopUsed: 0,
      oopMax: 0,
      premiumEmployee: 0,
      network: "Empower Retirement",
      summary: "4% match on the first 5% you defer. Safe harbor. Immediate vesting on match.",
    },
  ];

  const claims = [
    {
      claimNumber: "CLM-2611048",
      serviceDate: "2026-08-22",
      provider: "Riverside Medical Associates",
      type: "medical",
      billed: 285,
      planPaid: 235,
      memberOwed: 25,
      status: "paid",
      description: "Primary care office visit",
    },
    {
      claimNumber: "CLM-2609831",
      serviceDate: "2026-07-09",
      provider: "CVS Pharmacy — Magnolia",
      type: "medical",
      billed: 64.2,
      planPaid: 54.2,
      memberOwed: 10,
      status: "paid",
      description: "30-day maintenance prescription",
    },
    {
      claimNumber: "CLM-2608712",
      serviceDate: "2026-06-18",
      provider: "Inland Empire Orthopedics",
      type: "medical",
      billed: 640,
      planPaid: 512,
      memberOwed: 45,
      status: "paid",
      description: "Specialist consult — shoulder",
    },
    {
      claimNumber: "CLM-2612201",
      serviceDate: "2026-09-03",
      provider: "LabCorp — Upland",
      type: "medical",
      billed: 312,
      planPaid: 0,
      memberOwed: 0,
      status: "processing",
      description: "Annual metabolic panel",
    },
    {
      claimNumber: "CLM-2606404",
      serviceDate: "2026-04-12",
      provider: "Bright Smiles Dental of Norco",
      type: "dental",
      billed: 168,
      planPaid: 168,
      memberOwed: 0,
      status: "paid",
      description: "Adult prophylaxis and exam",
    },
    {
      claimNumber: "CLM-2605122",
      serviceDate: "2026-03-02",
      provider: "VSP Premier Eyecare — Riverside",
      type: "vision",
      billed: 295,
      planPaid: 220,
      memberOwed: 75,
      status: "paid",
      description: "Annual exam and frames",
    },
    {
      claimNumber: "CLM-2611888",
      serviceDate: "2026-08-29",
      provider: "Corona Regional Medical Center",
      type: "medical",
      billed: 1840,
      planPaid: 0,
      memberOwed: 250,
      status: "processing",
      description: "Emergency department — laceration repair",
    },
  ];

  const dependents = [
    {
      name: `${firstName} ${profile.lastName}`,
      relationship: "Self",
      dateOfBirth: profile.dateOfBirth,
      covered: true,
    },
    {
      name: "Maya " + profile.lastName,
      relationship: "Spouse",
      dateOfBirth: "1990-11-03",
      covered: true,
    },
    {
      name: "Luis " + profile.lastName,
      relationship: "Child",
      dateOfBirth: "2016-07-21",
      covered: true,
    },
  ];

  const documents = [
    {
      title: "Summary of Benefits and Coverage — Gold PPO",
      category: "Medical",
      dateIssued: "2026-01-01",
      summary:
        "Plan year 2026 SBC for Blue Shield of California Gold PPO, including copays, deductible, and out-of-pocket maximum.",
    },
    {
      title: "Delta Dental PPO Evidence of Coverage",
      category: "Dental",
      dateIssued: "2026-01-01",
      summary: "Covered services, annual maximum, and waiting periods for the group dental plan.",
    },
    {
      title: "VSP Signature Certificate",
      category: "Vision",
      dateIssued: "2026-01-01",
      summary: "Exam, lenses, frames, and contact lens allowances for the VSP Signature plan.",
    },
    {
      title: "401(k) Summary Plan Description",
      category: "Retirement",
      dateIssued: "2025-06-01",
      summary: "Eligibility, match formula, vesting, loans, and distribution rules for the Empower 401(k).",
    },
    {
      title: "Open Enrollment Guide 2027",
      category: "Enrollment",
      dateIssued: "2026-09-01",
      summary:
        "What is changing for 2027, how to elect coverage, and important dates (Oct 15 – Nov 15, 2026).",
    },
    {
      title: "COBRA General Notice",
      category: "COBRA",
      dateIssued: "2026-01-01",
      summary:
        "Federal COBRA continuation rights. NP Benefit Services administers COBRA at no cost to the employer.",
    },
  ];

  const messages = [
    {
      subject: "Open enrollment starts October 15",
      body: `Hi ${firstName},\n\nOpen enrollment for 2027 coverage runs October 15 through November 15. Medical, dental, vision, and 401(k) deferral changes take effect January 1, 2027.\n\nYour current elections will roll forward unless you make a change. We’ll host an on-site benefits meeting at Riverside Precision Metals the week of October 6.\n\n— NP Benefit Services`,
      fromName: "NP Benefit Services",
      createdAt: "2026-09-08T15:04:00Z",
      read: false,
      kind: "enrollment",
    },
    {
      subject: "Your ER claim is in review",
      body: `A claim from Corona Regional Medical Center (service date Aug 29) is processing. The emergency copay is $250 if the visit is confirmed in-network. We’ll post an Explanation of Benefits as soon as Blue Shield finishes adjudication.\n\nYou can check status anytime under Claims.`,
      fromName: "Claims Desk",
      createdAt: "2026-09-05T18:22:00Z",
      read: false,
      kind: "claim",
    },
    {
      subject: "Welcome to the member portal",
      body: `This portal is where you view ID cards, deductibles, claims, dependents, and plan documents. Year-round customer service is at 888-954-8999, weekdays 8 a.m. – 5 p.m. PT.\n\nClient relationship is our #1 priority — if something looks off, call us.`,
      fromName: "NP Benefit Services",
      createdAt: "2026-01-06T16:00:00Z",
      read: true,
      kind: "notice",
    },
  ];

  return { coverages, claims, dependents, documents, messages };
}
