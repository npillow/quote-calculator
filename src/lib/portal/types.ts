export type CoverageType = "medical" | "dental" | "vision" | "life" | "retirement";
export type ClaimStatus = "paid" | "processing" | "denied" | "submitted";
export type MessageKind = "notice" | "claim" | "enrollment";

export type Profile = {
  userId: string;
  firstName: string;
  lastName: string;
  memberId: string;
  employer: string;
  groupNumber: string;
  dateOfBirth: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
  jobTitle: string;
};

export type Coverage = {
  id: number;
  type: CoverageType;
  planName: string;
  carrier: string;
  memberId: string;
  groupNumber: string;
  effectiveDate: string;
  status: "active" | "pending";
  deductibleUsed: number;
  deductibleMax: number;
  oopUsed: number;
  oopMax: number;
  premiumEmployee: number;
  network: string;
  summary: string;
};

export type Claim = {
  id: number;
  claimNumber: string;
  serviceDate: string;
  provider: string;
  type: CoverageType;
  billed: number;
  planPaid: number;
  memberOwed: number;
  status: ClaimStatus;
  description: string;
};

export type Dependent = {
  id: number;
  name: string;
  relationship: string;
  dateOfBirth: string;
  covered: boolean;
};

export type DocumentRow = {
  id: number;
  title: string;
  category: string;
  dateIssued: string;
  summary: string;
};

export type MessageRow = {
  id: number;
  subject: string;
  body: string;
  fromName: string;
  createdAt: string;
  read: boolean;
  kind: MessageKind;
};

export type PortalData = {
  profile: Profile;
  coverages: Coverage[];
  claims: Claim[];
  dependents: Dependent[];
  documents: DocumentRow[];
  messages: MessageRow[];
};
