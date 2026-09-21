import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { num } from "@/lib/utils";
import { buildProfile, seedRows } from "./seed";
import type { Claim, Coverage, MessageKind, PortalData, Profile } from "./types";

type ProfileRow = {
  user_id: string;
  first_name: string;
  last_name: string;
  member_id: string;
  employer: string;
  group_number: string;
  date_of_birth: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  zip: string;
  job_title: string;
};

type CoverageRow = {
  id: number;
  type: string;
  plan_name: string;
  carrier: string;
  member_id: string;
  group_number: string;
  effective_date: string;
  status: string;
  deductible_used: string | number;
  deductible_max: string | number;
  oop_used: string | number;
  oop_max: string | number;
  premium_employee: string | number;
  network: string;
  summary: string;
};

type ClaimRow = {
  id: number;
  claim_number: string;
  service_date: string;
  provider: string;
  type: string;
  billed: string | number;
  plan_paid: string | number;
  member_owed: string | number;
  status: string;
  description: string;
};

type DependentRow = {
  id: number;
  name: string;
  relationship: string;
  date_of_birth: string;
  covered: boolean;
};

type DocumentSqlRow = {
  id: number;
  title: string;
  category: string;
  date_issued: string;
  summary: string;
};

type MessageSqlRow = {
  id: number;
  subject: string;
  body: string;
  from_name: string;
  created_at: string;
  read: boolean;
  kind: string;
};

function mapProfile(row: ProfileRow): Profile {
  return {
    userId: row.user_id,
    firstName: row.first_name,
    lastName: row.last_name,
    memberId: row.member_id,
    employer: row.employer,
    groupNumber: row.group_number,
    dateOfBirth: row.date_of_birth,
    phone: row.phone,
    addressLine: row.address_line,
    city: row.city,
    state: row.state,
    zip: row.zip,
    jobTitle: row.job_title,
  };
}

function mapCoverage(row: CoverageRow): Coverage {
  return {
    id: row.id,
    type: row.type as Coverage["type"],
    planName: row.plan_name,
    carrier: row.carrier,
    memberId: row.member_id,
    groupNumber: row.group_number,
    effectiveDate: row.effective_date,
    status: row.status === "pending" ? "pending" : "active",
    deductibleUsed: num(row.deductible_used),
    deductibleMax: num(row.deductible_max),
    oopUsed: num(row.oop_used),
    oopMax: num(row.oop_max),
    premiumEmployee: num(row.premium_employee),
    network: row.network,
    summary: row.summary,
  };
}

function mapClaim(row: ClaimRow): Claim {
  return {
    id: row.id,
    claimNumber: row.claim_number,
    serviceDate: row.service_date,
    provider: row.provider,
    type: row.type as Claim["type"],
    billed: num(row.billed),
    planPaid: num(row.plan_paid),
    memberOwed: num(row.member_owed),
    status: row.status as Claim["status"],
    description: row.description,
  };
}

async function loadPortal(userId: string): Promise<PortalData | null> {
  const sql = await getSql();
  const profiles = await sql<ProfileRow>`
    select user_id, first_name, last_name, member_id, employer, group_number,
           date_of_birth, phone, address_line, city, state, zip, job_title
    from profiles where user_id = ${userId}
  `;
  const profileRow = profiles[0];
  if (!profileRow) return null;

  const [coverages, claims, dependents, documents, messages] = await Promise.all([
    sql<CoverageRow>`
      select id, type, plan_name, carrier, member_id, group_number, effective_date,
             status, deductible_used, deductible_max, oop_used, oop_max,
             premium_employee, network, summary
      from coverages where user_id = ${userId} order by id
    `,
    sql<ClaimRow>`
      select id, claim_number, service_date, provider, type, billed, plan_paid,
             member_owed, status, description
      from claims where user_id = ${userId} order by service_date desc, id desc
    `,
    sql<DependentRow>`
      select id, name, relationship, date_of_birth, covered
      from dependents where user_id = ${userId} order by id
    `,
    sql<DocumentSqlRow>`
      select id, title, category, date_issued, summary
      from documents where user_id = ${userId} order by date_issued desc, id desc
    `,
    sql<MessageSqlRow>`
      select id, subject, body, from_name, created_at, read, kind
      from messages where user_id = ${userId} order by created_at desc
    `,
  ]);

  return {
    profile: mapProfile(profileRow),
    coverages: coverages.map(mapCoverage),
    claims: claims.map(mapClaim),
    dependents: dependents.map((d) => ({
      id: d.id,
      name: d.name,
      relationship: d.relationship,
      dateOfBirth: d.date_of_birth,
      covered: Boolean(d.covered),
    })),
    documents: documents.map((d) => ({
      id: d.id,
      title: d.title,
      category: d.category,
      dateIssued: d.date_issued,
      summary: d.summary,
    })),
    messages: messages.map((m) => ({
      id: m.id,
      subject: m.subject,
      body: m.body,
      fromName: m.from_name,
      createdAt: m.created_at,
      read: Boolean(m.read),
      kind: (m.kind as MessageKind) || "notice",
    })),
  };
}

async function seedUser(
  userId: string,
  displayName: string | null,
  email: string | null,
): Promise<void> {
  const sql = await getSql();
  const profile = buildProfile({ userId, displayName, email });
  const seed = seedRows(profile);

  await sql`
    insert into profiles (
      user_id, first_name, last_name, member_id, employer, group_number,
      date_of_birth, phone, address_line, city, state, zip, job_title
    ) values (
      ${profile.userId}, ${profile.firstName}, ${profile.lastName}, ${profile.memberId},
      ${profile.employer}, ${profile.groupNumber}, ${profile.dateOfBirth}, ${profile.phone},
      ${profile.addressLine}, ${profile.city}, ${profile.state}, ${profile.zip}, ${profile.jobTitle}
    ) on conflict (user_id) do nothing
  `;

  const existing = await sql<{ n: number }>`
    select count(*)::int as n from coverages where user_id = ${userId}
  `;
  if ((existing[0]?.n ?? 0) > 0) return;

  for (const c of seed.coverages) {
    await sql`
      insert into coverages (
        user_id, type, plan_name, carrier, member_id, group_number, effective_date,
        status, deductible_used, deductible_max, oop_used, oop_max, premium_employee,
        network, summary
      ) values (
        ${userId}, ${c.type}, ${c.planName}, ${c.carrier}, ${c.memberId}, ${c.groupNumber},
        ${c.effectiveDate}, ${c.status}, ${c.deductibleUsed}, ${c.deductibleMax},
        ${c.oopUsed}, ${c.oopMax}, ${c.premiumEmployee}, ${c.network}, ${c.summary}
      )
    `;
  }
  for (const c of seed.claims) {
    await sql`
      insert into claims (
        user_id, claim_number, service_date, provider, type, billed, plan_paid,
        member_owed, status, description
      ) values (
        ${userId}, ${c.claimNumber}, ${c.serviceDate}, ${c.provider}, ${c.type},
        ${c.billed}, ${c.planPaid}, ${c.memberOwed}, ${c.status}, ${c.description}
      )
    `;
  }
  for (const d of seed.dependents) {
    await sql`
      insert into dependents (user_id, name, relationship, date_of_birth, covered)
      values (${userId}, ${d.name}, ${d.relationship}, ${d.dateOfBirth}, ${d.covered})
    `;
  }
  for (const d of seed.documents) {
    await sql`
      insert into documents (user_id, title, category, date_issued, summary)
      values (${userId}, ${d.title}, ${d.category}, ${d.dateIssued}, ${d.summary})
    `;
  }
  for (const m of seed.messages) {
    await sql`
      insert into messages (user_id, subject, body, from_name, created_at, read, kind)
      values (${userId}, ${m.subject}, ${m.body}, ${m.fromName}, ${m.createdAt}, ${m.read}, ${m.kind})
    `;
  }
}

export const getPortalData = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z
      .object({
        displayName: z.string().nullable().optional(),
        email: z.string().nullable().optional(),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ context, data }): Promise<PortalData> => {
    const existing = await loadPortal(context.userId);
    if (existing) return existing;

    const { getSessionUser } = await import("@/lib/auth/verify.server");
    const session = await getSessionUser();
    await seedUser(
      context.userId,
      data.displayName ?? null,
      data.email ?? session?.email ?? null,
    );
    const seeded = await loadPortal(context.userId);
    if (!seeded) throw new Error("Could not load your benefits profile.");
    return seeded;
  });

const profileSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  phone: z.string().trim().max(40),
  addressLine: z.string().trim().max(120),
  city: z.string().trim().max(80),
  state: z.string().trim().max(2),
  zip: z.string().trim().max(12),
});

export const updateProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => profileSchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      update profiles set
        first_name = ${data.firstName},
        last_name = ${data.lastName},
        phone = ${data.phone},
        address_line = ${data.addressLine},
        city = ${data.city},
        state = ${data.state},
        zip = ${data.zip}
      where user_id = ${context.userId}
    `;
    return { ok: true as const };
  });

const claimSchema = z.object({
  provider: z.string().trim().min(2).max(120),
  serviceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  type: z.enum(["medical", "dental", "vision"]),
  billed: z.number().min(0).max(100000),
  description: z.string().trim().min(2).max(200),
});

export const submitClaim = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => claimSchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const stamp = Date.now().toString().slice(-6);
    const claimNumber = `CLM-${stamp}${context.userId.slice(-2).replace(/\W/g, "0")}`;
    await sql`
      insert into claims (
        user_id, claim_number, service_date, provider, type, billed, plan_paid,
        member_owed, status, description
      ) values (
        ${context.userId}, ${claimNumber}, ${data.serviceDate}, ${data.provider},
        ${data.type}, ${data.billed}, ${0}, ${data.billed}, ${"submitted"},
        ${data.description}
      )
    `;
    return { ok: true as const, claimNumber };
  });

export const markMessageRead = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ id: z.number() }).parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      update messages set read = true
      where id = ${data.id} and user_id = ${context.userId}
    `;
    return { ok: true as const };
  });

export type {
  Claim,
  Coverage,
  CoverageType,
  Dependent,
  DocumentRow,
  MessageRow,
  PortalData,
  Profile,
} from "./types";
