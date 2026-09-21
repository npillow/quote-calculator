export const COMPANY = {
  name: "NP Benefit Services",
  shortName: "NP Benefits",
  phone: "888-954-8999",
  phoneHref: "tel:8889548999",
  localPhone: "909-227-6465",
  localPhoneHref: "tel:9092276465",
  email: "npillow@npbenefitservices.com",
  emailHref: "mailto:npillow@npbenefitservices.com",
  licenses: "Licensed CA / AZ / UT",
  region: "Southern California · Inland Empire",
  city: "Norco, CA",
  address: "1791 Third Street, Norco, CA 92860",
  mapsUrl: "https://maps.google.com/?q=1791+Third+Street+Norco+CA+92860",
  linkedin: "https://www.linkedin.com/company/np-benefit-services",
  tagline: "Group benefits for Southern California employers",
  years: 30,
  hours: "Mon–Thu 9 a.m.–5 p.m. · Fri 10 a.m.–4 p.m. PT",
} as const;

export const TEAM = [
  { name: "Nelson Pillow", role: "Owner / Broker" },
  { name: "Daniel Kirves", role: "Account Manager" },
  { name: "Rob Wintour", role: "Account Manager" },
] as const;

export const SUPPORT_HOURS = "Weekdays 8:00 a.m. – 5:00 p.m. PT";

export const OPEN_ENROLLMENT = {
  start: "2026-10-15",
  end: "2026-11-15",
  effective: "2027-01-01",
} as const;

export const SITE_NAV = [
  { to: "/coverages", label: "Coverages" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
] as const;

export const FOOTER_LINKS = [
  { to: "/coverages", label: "Coverages" },
  { to: "/401k", label: "401(k)" },
  { to: "/funding", label: "Self-funding" },
  { to: "/payroll", label: "Payroll" },
  { to: "/hr", label: "HR" },
  { to: "/technology", label: "Technology" },
  { to: "/videos", label: "Videos" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/quote", label: "Quote" },
] as const;
