import { useState, type FormEvent } from "react";
import { Phone } from "lucide-react";
import { SiteShell, CallBand } from "@/components/marketing/site-shell";
import { submitQuote } from "@/lib/marketing/quote";
import { COMPANY } from "@/lib/portal/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function QuotePage() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const form = new FormData(e.currentTarget);
    const value = (key: string) => String(form.get(key) ?? "").trim();
    try {
      await submitQuote({
        data: {
          kind: "group",
          name: value("name"),
          email: value("email"),
          phone: value("phone"),
          company: value("company"),
          employees: value("employees"),
          city: value("city"),
          coverage: value("coverage"),
          notes: value("notes"),
        },
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the quote request.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteShell>
      <main>
        <section className="mx-auto grid max-w-5xl gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-sm font-medium text-navy">Quote</p>
            <h1 className="font-display mt-2 text-4xl leading-tight font-semibold tracking-tight">
              Get a group quote.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted">
              We’re not a typical broker. Once you pick a package, we quote it,
              run paperless open enrollment, and stay on the account year-round.
            </p>
            <a
              href={COMPANY.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 block text-ink hover:text-navy"
            >
              {COMPANY.address}
            </a>
            <p className="mt-2 text-sm text-muted">{COMPANY.hours}</p>
            <a
              href={COMPANY.localPhoneHref}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy"
            >
              <Phone className="size-4" />
              {COMPANY.localPhone}
            </a>
            <a href={COMPANY.emailHref} className="mt-2 block text-sm text-muted hover:text-ink">
              {COMPANY.email}
            </a>
          </div>

          {done ? (
            <div className="rounded-xl border border-line bg-white p-6">
              <p className="font-display text-2xl font-semibold">Thank you.</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We received your request. We’ll follow up shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="space-y-4 rounded-xl border border-line bg-white p-6"
            >
              <Field label="Name" name="name" required />
              <Field label="Work email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" required />
              <Field label="Company" name="company" />
              <Field label="Employees" name="employees" placeholder="e.g. 35" />
              <Field label="City" name="city" />
              <Field label="Coverage needed" name="coverage" placeholder="Medical, dental…" />
              <div className="space-y-1.5">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-navy"
                />
              </div>
              {error ? (
                <p role="alert" className="text-sm text-danger">
                  {error}
                </p>
              ) : null}
              <Button type="submit" className="w-full" size="lg" disabled={busy}>
                {busy ? "Sending…" : "Request a quote"}
              </Button>
            </form>
          )}
        </section>
        <CallBand />
      </main>
    </SiteShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}
