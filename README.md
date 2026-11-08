# Removals and Storage X — interactive redesign prototype

This is a runnable, dependency-light Node.js prototype. It contains server-rendered pages, a responsive design system, an eight-step quote planner, an address check and road-route preview, and a local enquiry-saving endpoint.

## Run locally

1. Install Node.js 20 or later.
2. From this directory, run `npm start` (or `npm run dev`).
3. Open `http://localhost:4173`.

The prototype has no build step or package installation. Change the port with `PORT=4173` in your shell. The server writes new enquiries to `data/leads.jsonl`; that private data directory is excluded by `.gitignore`.

## Pages and SEO structure

- `/` — homepage and moving configurator
- `/services` — service overview
- `/pricing` — service-specific quote starting points, cost factors and pricing FAQs; no unverified prices or fixed packages
- `/storage`, `/business-moves`, `/about`, `/contact`
- `/get-a-quote` — direct entry to the configurator, including service-prefill query parameters
- `/services/house-removals`, `/services/packing`, `/services/specialist-moving`, `/services/european-removals`
- The Storage, Locations, Office and Residential menu links each resolve to a local service or location page. Existing service aliases redirect to the equivalent local page.
- `/sitemap.xml` and `/robots.txt`

The server renders unique titles, descriptions, canonical/Open Graph metadata and LocalBusiness schema. Redirects retain several established service/contact URLs. Compare the complete current sitemap and Search Console data before any production redirect or URL changes.

## Map and provider setup

The map uses Leaflet and OpenStreetMap map tiles. A deliberate **Check location** action queries OpenStreetMap Nominatim; an OSRM public demo service supplies road geometry, distance and duration. Returned route geometry is displayed on the map and the simulated van follows its route. No fake location, time or route is used. The page remains usable if any map provider is offline.

These public services are **for prototype evaluation, not guaranteed production infrastructure**: Nominatim is not an address-autocomplete API, and public tile/routing endpoints have capacity and usage policies and no service agreement. Before a public launch, select contracted geocoding/routing and tile services, follow their attribution/caching rules, move protected API access behind the server where required, and verify the user/privacy disclosures. No API keys are included in this repository.

The review section links to the company's public Trustpilot profile and uses short excerpts attributed to their reviewers; live ratings and counts are not hardcoded. The BAR membership statement is attributed to the company's own website. Verify current membership and obtain approved official logos before presenting any official accreditation marks. The service and location pages are initial templates; review their content and existing search performance with the company before deployment.

## Enquiries, storage and privacy

`POST /api/leads` validates required contact fields and appends a structured lead with a reference to the local JSON Lines file. Leads are not emailed or sent to the company; the on-screen confirmation explicitly says local prototype. Selected photos are not uploaded; the optional file control asks the user to describe details instead. Marketing permission is optional and separate from the acknowledgement to respond to the enquiry.

Before production use, replace the local file store with an authenticated, access-controlled CRM/lead service, add a reliable idempotency key and spam/rate controls, configure retention/deletion and access procedures, agree data-protection language with the company, and connect the response workflow. This local prototype is not a production lead system.

## Existing-site UX and conversion audit (8 November 2026)

Evidence is from a read-only review of the public homepage, service pages and navigation. It is not a Search Console, analytics, mobile-device, or source-code audit.

- **Observed — navigation:** the homepage duplicates a large menu covering residential/commercial storage, many locations, office services, European destinations and company information. The redesign gives six primary destinations and one prominent quote action, then organizes relevant services in linked cards. Hypothesis: fewer first-level choices may make service selection quicker; validate with quote starts and successful submissions by device.
- **Observed — quotation:** the public homepage asks for name, phone and email before a compact details field. Its required privacy tick box combines responding with digital marketing. The redesign gathers service and move details first and keeps optional marketing separate. Hypothesis: progressive questions can improve completion while qualifying enquiries; compare step completion and valid enquiry rate before/after.
- **Observed — contact consistency:** the site publishes 0208 3517 101, info@removalsandstoragex.com and WhatsApp 07555 081 555; these are retained. Source: [existing homepage](https://removalsandstoragex.com/), inspected 8 November 2026.
- **Observed — company claims:** the homepage states London-based, and a BAR membership since March 2026. No invented review score, fleet, insurance promise, fixed pricing, warehouse address, or live vehicle-tracking claim is used. Source: [existing homepage](https://removalsandstoragex.com/), inspected 8 November 2026.
- **Observed — services and useful URLs:** the site links residential removals at `/residential-removals/`, office removals at `/office-removals/`, packing at `/packing-services/`, and European moving at `/european-moving/`, among other long-tail pages. The prototype redirects these four and the about/contact aliases to focused pages. This is a proposal for review, not a production change. Source: [house-removals page](https://removalsandstoragex.com/residential-removals/), [office-removals page](https://removalsandstoragex.com/office-removals/), [packing page](https://removalsandstoragex.com/packing-services/), and [European-removals page](https://removalsandstoragex.com/european-moving/), inspected 8 November 2026.
- **Observed — trust and visual assets:** the live site has image content, a BAR membership statement and review content on the house-removals page, but no review sources were validated in this pass. The prototype avoids repeating unsourced reviews/ratings; real approved photography and direct review-profile links should be added after the company approves them.
- **Missing verification — mobile, technical SEO and search value:** no physical mobile usability assessment, full crawl, indexation report, analytics, Search Console export, backlinks, or ranking history was available. Do not assume the new URLs can replace existing URLs without checking the full URL inventory and performance data.

## Manual QA performed

- Node syntax checked for the server and browser module; page-route and lead endpoint checks performed locally.
- Verified server-rendered pages, distinct page metadata, main nav/service links, sitemap/robots output, and legacy redirects locally.
- Walked through service selection, conditional move-size questions, storage without a destination, access/date/extras/review/contact steps, and back-navigation state in a desktop browser.
- Verified that an enquiry receives success only after the local server returns a saved reference; malformed contact details fail without clearing wizard state.
- Checked phone/email/WhatsApp links, reduced-motion CSS, responsive mobile layout rules, form labels, and the map's provider-failure text path.
- **Not verified:** live geocoder/routing availability or policy compliance for a production service contract; external tile loading on every network; real-world mobile assistive-technology testing; CRM/email delivery; Search Console/indexation; pricing or availability; BAR record independently; deployment or DNS.

## Production integrations still required

1. Company-approved assets, actual review sources and copy approval.
2. Contracted UK/international geocoder, routing API and map tiles.
3. Company CRM/email endpoint with authentication, idempotency and spam controls.
4. Data-protection, retention and operational response policies.
5. Approved domain deployment, full existing URL crawl, redirects, sitemap and Search Console release monitoring.
