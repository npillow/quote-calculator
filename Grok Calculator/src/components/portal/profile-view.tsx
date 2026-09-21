import { useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserButton } from "@/lib/auth/gates";
import { updateProfile } from "@/lib/portal/api";
import type { PortalData } from "@/lib/portal/types";
import { PageHeader } from "./shared";

export function ProfileView({
  data,
  onChanged,
}: {
  data: PortalData;
  onChanged: () => void;
}) {
  const p = data.profile;
  const [firstName, setFirstName] = useState(p.firstName);
  const [lastName, setLastName] = useState(p.lastName);
  const [phone, setPhone] = useState(p.phone);
  const [addressLine, setAddressLine] = useState(p.addressLine);
  const [city, setCity] = useState(p.city);
  const [state, setState] = useState(p.state);
  const [zip, setZip] = useState(p.zip);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setSaved(false);
    try {
      await updateProfile({
        data: { firstName, lastName, phone, addressLine, city, state, zip },
      });
      setSaved(true);
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description="Keep your mailing address current so ID cards and COBRA notices reach you."
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Card className="p-5 sm:p-6">
          <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" htmlFor="fn">
              <Input id="fn" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </Field>
            <Field label="Last name" htmlFor="ln">
              <Input id="ln" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </Field>
            <Field label="Mobile" htmlFor="ph">
              <Input id="ph" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Field>
            <Field label="Street" htmlFor="ad" className="sm:col-span-2">
              <Input id="ad" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} />
            </Field>
            <Field label="City" htmlFor="ct">
              <Input id="ct" value={city} onChange={(e) => setCity(e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="State" htmlFor="st">
                <Input id="st" value={state} onChange={(e) => setState(e.target.value)} maxLength={2} />
              </Field>
              <Field label="ZIP" htmlFor="zp">
                <Input id="zp" value={zip} onChange={(e) => setZip(e.target.value)} />
              </Field>
            </div>
            {error ? <p className="text-sm text-danger sm:col-span-2">{error}</p> : null}
            {saved ? (
              <p className="text-sm text-success sm:col-span-2">Saved. Carrier records update overnight.</p>
            ) : null}
            <div className="sm:col-span-2">
              <Button type="submit" disabled={busy}>
                {busy ? "Saving…" : "Save profile"}
              </Button>
            </div>
          </form>
        </Card>
        <div className="space-y-4">
          <Card className="p-5">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">Employment</p>
            <p className="mt-2 text-lg font-semibold text-ink">{p.employer}</p>
            <p className="text-sm text-muted">{p.jobTitle}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Member ID</dt>
                <dd className="font-medium tabular-nums">{p.memberId}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Group</dt>
                <dd className="font-medium tabular-nums">{p.groupNumber}</dd>
              </div>
            </dl>
            <Badge tone="green" className="mt-4">
              Active
            </Badge>
          </Card>
          <Card className="p-5">
            <p className="text-sm font-semibold text-ink">Signed in as</p>
            <div className="mt-3 text-ink">
              <UserButton />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
