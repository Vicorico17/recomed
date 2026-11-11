# Recomed

Romanian landing page and interactive prototype for a clinician referral pilot in Bucharest. Plain HTML, CSS, and JavaScript; no build step, external fonts, runtime dependencies, database, or analytics.

## Run locally

```sh
python3 -m http.server 4189 --bind 127.0.0.1
```

Open http://127.0.0.1:4189. A static host can serve these files directly.

## What works

- Responsive navigation with keyboard support and a no-JavaScript fallback.
- Three fictional referral examples with specialty selection and expandable next steps.
- Native HTML validation and an email draft generator for clinicians, clinics, and patients.
- Encoded email links, editable contact fields, message preview, and copy with a manual fallback.
- FAQ, explicit pilot/roadmap status, reduced-motion support, and Romanian metadata.

The contact form does **not** submit or store information. The visitor must send the prepared message through their email provider. Changing a field invalidates the previous draft. There are no bookings, real doctor profiles, clinical uploads, authentication, or verification services.

## Browser regression checks

With Node.js 20+, Playwright installed, and Google Chrome available:

```sh
npm install --no-save --package-lock=false playwright@1.64.1
node smoke.cjs
```

Keep the local server running on port 4189. Alternatively, set `PLAYWRIGHT_MODULE` to an existing Playwright installation. The smoke script covers the demo, fragment links, required/whitespace input validation, email encoding, draft invalidation, clipboard fallback, mobile menu, overflow at six viewport widths (320–1440px), and JavaScript-disabled operation. Screenshots are saved to `/tmp/recomed-desktop.png` and `/tmp/recomed-mobile.png`.

## Files

- `index.html`: Romanian content, accessible forms, and static fallback.
- `styles.css`: responsive design and reduced-motion behavior.
- `app.js`: progressive enhancement; no network requests or browser storage.
- `favicon.svg`: local brand icon.
- `smoke.cjs`: browser regression checks.
- `RESEARCH.md`: historical product research, not verified current legal guidance.

## Before a public pilot

Confirm that `hello@recomed.health` is owned and monitored; the address is inherited from the original site and email delivery has not been verified. Confirm the proposed 60-day pilot terms and launch schedule. Any future real profiles, verification, clinical processing, or server-side signup requires its own implementation, privacy review, and operational processes. This prototype makes no compliance certification claims.
