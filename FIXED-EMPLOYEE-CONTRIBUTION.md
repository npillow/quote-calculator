# Fixed employee contribution

Source from Grok Build for the XGB group quote calculator.

**Branch:** `fixed-employee-contribution`  
**Do not merge this onto `main` by replacing `assets/*.css` or `index.html`.** The live GitHub Pages site is compiled files on `main`. Overwriting those CSS files with a stub (PLACEHOLDER) blanks the calculator.

## What changed

Step 05 — Employer contribution — now has two modes:

1. **Percentage** (existing): employer pays a % of the employee-only premium, optional % of dependent premium.
2. **Fixed dollar** (new): employer pays a set dollar amount toward the employee-only rate (default $400/mo). Optional second dollar amount toward dependent premium (default $200/mo). Amount is capped at the actual premium.

Print quote and the request packet both describe whichever mode is selected.

## Files that contain this feature

- `src/lib/quote.ts` — `contributionMode`, `eeContributionCents`, `depContributionCents`, math + `describeContribution()`
- `src/components/quote/quote-app.tsx` — Percentage / Fixed dollar toggle UI
- `src/components/quote/print-quote.tsx`
- `src/components/quote/request-quote.tsx`

## For Tommy

Rebuild the Pages bundle from this source. Publish the new hashed JS/CSS the same way as before. Do not hand-edit `assets/styles-quote.css` into PLACEHOLDER. Leave the CSS guard workflow in place.
