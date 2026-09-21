import { i as num } from "./utils-D4SWYGA1.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { D as _enum, F as object, P as number, R as string } from "../_libs/@better-auth/core+[...].mjs";
import { r as getSql } from "./db-yDQ5-rQI.mjs";
import { t as authMiddleware } from "./middleware-CPamUddj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-BbezBoqy.js
function hashUser(userId) {
	let h = 2166136261;
	for (let i = 0; i < userId.length; i += 1) {
		h ^= userId.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function memberIdFromUser(userId) {
	return `NPB-${1e7 + hashUser(userId) % 9e7}`;
}
function buildProfile(input) {
	const parts = (input.displayName ?? input.email ?? "Member").trim().replace(/@.*/, "").split(/[\s._-]+/).filter(Boolean);
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
		jobTitle: "Operations Lead"
	};
}
function cap(s) {
	if (!s) return s;
	return s.charAt(0).toUpperCase() + s.slice(1);
}
function seedRows(profile) {
	const { userId, memberId, groupNumber, firstName } = profile;
	return {
		coverages: [
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
				summary: "In-network office visit $25 copay. Specialist $45. Emergency $250. Preventive care covered at 100%."
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
				oopMax: 2e3,
				premiumEmployee: 28.1,
				network: "Delta Dental PPO",
				summary: "100% preventive, 80% basic, 50% major. $2,000 annual maximum."
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
				summary: "Annual exam $10 copay. $150 frame allowance. Lenses covered in full."
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
				summary: "Company-paid basic life equal to two times annual salary, plus matching AD&D."
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
				summary: "4% match on the first 5% you defer. Safe harbor. Immediate vesting on match."
			}
		],
		claims: [
			{
				claimNumber: "CLM-2611048",
				serviceDate: "2026-08-22",
				provider: "Riverside Medical Associates",
				type: "medical",
				billed: 285,
				planPaid: 235,
				memberOwed: 25,
				status: "paid",
				description: "Primary care office visit"
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
				description: "30-day maintenance prescription"
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
				description: "Specialist consult — shoulder"
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
				description: "Annual metabolic panel"
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
				description: "Adult prophylaxis and exam"
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
				description: "Annual exam and frames"
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
				description: "Emergency department — laceration repair"
			}
		],
		dependents: [
			{
				name: `${firstName} ${profile.lastName}`,
				relationship: "Self",
				dateOfBirth: profile.dateOfBirth,
				covered: true
			},
			{
				name: "Maya " + profile.lastName,
				relationship: "Spouse",
				dateOfBirth: "1990-11-03",
				covered: true
			},
			{
				name: "Luis " + profile.lastName,
				relationship: "Child",
				dateOfBirth: "2016-07-21",
				covered: true
			}
		],
		documents: [
			{
				title: "Summary of Benefits and Coverage — Gold PPO",
				category: "Medical",
				dateIssued: "2026-01-01",
				summary: "Plan year 2026 SBC for Blue Shield of California Gold PPO, including copays, deductible, and out-of-pocket maximum."
			},
			{
				title: "Delta Dental PPO Evidence of Coverage",
				category: "Dental",
				dateIssued: "2026-01-01",
				summary: "Covered services, annual maximum, and waiting periods for the group dental plan."
			},
			{
				title: "VSP Signature Certificate",
				category: "Vision",
				dateIssued: "2026-01-01",
				summary: "Exam, lenses, frames, and contact lens allowances for the VSP Signature plan."
			},
			{
				title: "401(k) Summary Plan Description",
				category: "Retirement",
				dateIssued: "2025-06-01",
				summary: "Eligibility, match formula, vesting, loans, and distribution rules for the Empower 401(k)."
			},
			{
				title: "Open Enrollment Guide 2027",
				category: "Enrollment",
				dateIssued: "2026-09-01",
				summary: "What is changing for 2027, how to elect coverage, and important dates (Oct 15 – Nov 15, 2026)."
			},
			{
				title: "COBRA General Notice",
				category: "COBRA",
				dateIssued: "2026-01-01",
				summary: "Federal COBRA continuation rights. NP Benefit Services administers COBRA at no cost to the employer."
			}
		],
		messages: [
			{
				subject: "Open enrollment starts October 15",
				body: `Hi ${firstName},\n\nOpen enrollment for 2027 coverage runs October 15 through November 15. Medical, dental, vision, and 401(k) deferral changes take effect January 1, 2027.\n\nYour current elections will roll forward unless you make a change. We’ll host an on-site benefits meeting at Riverside Precision Metals the week of October 6.\n\n— NP Benefit Services`,
				fromName: "NP Benefit Services",
				createdAt: "2026-09-08T15:04:00Z",
				read: false,
				kind: "enrollment"
			},
			{
				subject: "Your ER claim is in review",
				body: `A claim from Corona Regional Medical Center (service date Aug 29) is processing. The emergency copay is $250 if the visit is confirmed in-network. We’ll post an Explanation of Benefits as soon as Blue Shield finishes adjudication.\n\nYou can check status anytime under Claims.`,
				fromName: "Claims Desk",
				createdAt: "2026-09-05T18:22:00Z",
				read: false,
				kind: "claim"
			},
			{
				subject: "Welcome to the member portal",
				body: `This portal is where you view ID cards, deductibles, claims, dependents, and plan documents. Year-round customer service is at 888-954-8999, weekdays 8 a.m. – 5 p.m. PT.\n\nClient relationship is our #1 priority — if something looks off, call us.`,
				fromName: "NP Benefit Services",
				createdAt: "2026-01-06T16:00:00Z",
				read: true,
				kind: "notice"
			}
		]
	};
}
function mapProfile(row) {
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
		jobTitle: row.job_title
	};
}
function mapCoverage(row) {
	return {
		id: row.id,
		type: row.type,
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
		summary: row.summary
	};
}
function mapClaim(row) {
	return {
		id: row.id,
		claimNumber: row.claim_number,
		serviceDate: row.service_date,
		provider: row.provider,
		type: row.type,
		billed: num(row.billed),
		planPaid: num(row.plan_paid),
		memberOwed: num(row.member_owed),
		status: row.status,
		description: row.description
	};
}
async function loadPortal(userId) {
	const sql = await getSql();
	const profileRow = (await sql`
    select user_id, first_name, last_name, member_id, employer, group_number,
           date_of_birth, phone, address_line, city, state, zip, job_title
    from profiles where user_id = ${userId}
  `)[0];
	if (!profileRow) return null;
	const [coverages, claims, dependents, documents, messages] = await Promise.all([
		sql`
      select id, type, plan_name, carrier, member_id, group_number, effective_date,
             status, deductible_used, deductible_max, oop_used, oop_max,
             premium_employee, network, summary
      from coverages where user_id = ${userId} order by id
    `,
		sql`
      select id, claim_number, service_date, provider, type, billed, plan_paid,
             member_owed, status, description
      from claims where user_id = ${userId} order by service_date desc, id desc
    `,
		sql`
      select id, name, relationship, date_of_birth, covered
      from dependents where user_id = ${userId} order by id
    `,
		sql`
      select id, title, category, date_issued, summary
      from documents where user_id = ${userId} order by date_issued desc, id desc
    `,
		sql`
      select id, subject, body, from_name, created_at, read, kind
      from messages where user_id = ${userId} order by created_at desc
    `
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
			covered: Boolean(d.covered)
		})),
		documents: documents.map((d) => ({
			id: d.id,
			title: d.title,
			category: d.category,
			dateIssued: d.date_issued,
			summary: d.summary
		})),
		messages: messages.map((m) => ({
			id: m.id,
			subject: m.subject,
			body: m.body,
			fromName: m.from_name,
			createdAt: m.created_at,
			read: Boolean(m.read),
			kind: m.kind || "notice"
		}))
	};
}
async function seedUser(userId, displayName, email) {
	const sql = await getSql();
	const profile = buildProfile({
		userId,
		displayName,
		email
	});
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
	if (((await sql`
    select count(*)::int as n from coverages where user_id = ${userId}
  `)[0]?.n ?? 0) > 0) return;
	for (const c of seed.coverages) await sql`
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
	for (const c of seed.claims) await sql`
      insert into claims (
        user_id, claim_number, service_date, provider, type, billed, plan_paid,
        member_owed, status, description
      ) values (
        ${userId}, ${c.claimNumber}, ${c.serviceDate}, ${c.provider}, ${c.type},
        ${c.billed}, ${c.planPaid}, ${c.memberOwed}, ${c.status}, ${c.description}
      )
    `;
	for (const d of seed.dependents) await sql`
      insert into dependents (user_id, name, relationship, date_of_birth, covered)
      values (${userId}, ${d.name}, ${d.relationship}, ${d.dateOfBirth}, ${d.covered})
    `;
	for (const d of seed.documents) await sql`
      insert into documents (user_id, title, category, date_issued, summary)
      values (${userId}, ${d.title}, ${d.category}, ${d.dateIssued}, ${d.summary})
    `;
	for (const m of seed.messages) await sql`
      insert into messages (user_id, subject, body, from_name, created_at, read, kind)
      values (${userId}, ${m.subject}, ${m.body}, ${m.fromName}, ${m.createdAt}, ${m.read}, ${m.kind})
    `;
}
var getPortalData_createServerFn_handler = createServerRpc({
	id: "056efed243289ff461e8e1332efbebaf432f93828db89b8459de833c59c232c0",
	name: "getPortalData",
	filename: "src/lib/portal/api.ts"
}, (opts) => getPortalData.__executeServer(opts));
var getPortalData = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	displayName: string().nullable().optional(),
	email: string().nullable().optional()
}).parse(input ?? {})).handler(getPortalData_createServerFn_handler, async ({ context, data }) => {
	const existing = await loadPortal(context.userId);
	if (existing) return existing;
	const { getSessionUser } = await import("./verify.server-CupAObXb.mjs");
	const session = await getSessionUser();
	await seedUser(context.userId, data.displayName ?? null, data.email ?? session?.email ?? null);
	const seeded = await loadPortal(context.userId);
	if (!seeded) throw new Error("Could not load your benefits profile.");
	return seeded;
});
var profileSchema = object({
	firstName: string().trim().min(1).max(80),
	lastName: string().trim().min(1).max(80),
	phone: string().trim().max(40),
	addressLine: string().trim().max(120),
	city: string().trim().max(80),
	state: string().trim().max(2),
	zip: string().trim().max(12)
});
var updateProfile_createServerFn_handler = createServerRpc({
	id: "3659fad81d4a2fcfe7b9b102e6eea2581cbf2b8f97b2ff2e4a3660ed68d751fc",
	name: "updateProfile",
	filename: "src/lib/portal/api.ts"
}, (opts) => updateProfile.__executeServer(opts));
var updateProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => profileSchema.parse(input)).handler(updateProfile_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
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
	return { ok: true };
});
var claimSchema = object({
	provider: string().trim().min(2).max(120),
	serviceDate: string().regex(/^\d{4}-\d{2}-\d{2}$/),
	type: _enum([
		"medical",
		"dental",
		"vision"
	]),
	billed: number().min(0).max(1e5),
	description: string().trim().min(2).max(200)
});
var submitClaim_createServerFn_handler = createServerRpc({
	id: "a9fcf70d5f819b6669656ec879ad0b156fd5a9b655e3391cc2097470ddb25000",
	name: "submitClaim",
	filename: "src/lib/portal/api.ts"
}, (opts) => submitClaim.__executeServer(opts));
var submitClaim = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => claimSchema.parse(input)).handler(submitClaim_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const claimNumber = `CLM-${Date.now().toString().slice(-6)}${context.userId.slice(-2).replace(/\W/g, "0")}`;
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
	return {
		ok: true,
		claimNumber
	};
});
var markMessageRead_createServerFn_handler = createServerRpc({
	id: "0d319e089df299afa0aa3118f1d2cb352601cff7ff8706b9d4532acfb3948c54",
	name: "markMessageRead",
	filename: "src/lib/portal/api.ts"
}, (opts) => markMessageRead.__executeServer(opts));
var markMessageRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ id: number() }).parse(input)).handler(markMessageRead_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
      update messages set read = true
      where id = ${data.id} and user_id = ${context.userId}
    `;
	return { ok: true };
});
//#endregion
export { getPortalData_createServerFn_handler, markMessageRead_createServerFn_handler, submitClaim_createServerFn_handler, updateProfile_createServerFn_handler };
