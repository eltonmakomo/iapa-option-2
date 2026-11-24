<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

Use shared section-heading and section-content classes for content-section titles and their first content block so spacing remains consistent across language and content routes.

Render regional illustrations in the shared RegionCard using simplified public-domain Natural Earth boundary paths; accurate map crops stay scalable and theme-aware without a live map service.

Render the interactive footprint using local Natural Earth geometry and shared, sourced regional data; use react-zoom-pan-pinch for navigation and never infer country-level impact from network membership. Why: map interaction stays keyless and the displayed evidence stays distinct from unprovided project metrics.

## Project rules
- Editable content (team, news/press, events, resources, testimonials, vacancies, scholarships, FAQs, site settings) lives in Lovable Cloud tables with an `is_placeholder` flag; static page copy stays in src/lib/pages.ts and pages pull rows via `blocks`. Why: client replaces placeholders from /admin and a `show_placeholders` switch hides them at launch.
- The first account created becomes admin (DB trigger); roles live in `user_roles`. Why: no other way for IAPA staff to bootstrap admin access.
- Contact and newsletter submissions use validated public server functions with insert-only privileged writes; inbox reads and status updates use admin RLS. Why: visitors must never read private submissions.
- Regional focal-point records reference the shared sourced region IDs without duplicating country membership. Why: Contact and map pages stay aligned.
- Contact maps use configurable headquarters coordinates; without them, show an Accra city view without an invented headquarters pin. Why: precise office location is unverified.
- Hero photo crops use a shared image-key framing map and top alignment by default; keep subject faces in view across both languages and screen sizes.
