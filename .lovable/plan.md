# Placeholder content for client review

## What you'll get
- **Leadership page**: intro paragraph, three groups (Board of Directors, Supervisory Board, Executive Secretariat). Valentin Nchendeh shown as President (Cameroon); every other seat shows `[Name]`, `[Country]`, a bio template and an "IAPA" initials photo.
- **Six approach pages** (FBS, CBS, PBS, ABS, CF, GAP): What it is · Who it's for · What participants learn · How it's delivered · Value chains · Related stories · "Request this training" button.
- **Training page**: four format cards (Online, Residential, Blended, Tailor-made) and a four-step certification pathway.
- **Join page**: membership categories, how-to-join steps, fees table with `[Fee TBC]` only, the real IAPA Pulse proof point, membership FAQs.
- **Testimonials**: three italic placeholder quotes.
- **Knowledge Hub & Media**: IAPA Pulse Issue 2 (real, PDF linked), six "Sample:" resources, two sample events, one sample press release, and the eight real news stories from IAPA Pulse written as short stories.
- **Vacancies & Scholarships**: friendly empty messages pointing to IAPA Pulse.
- **FAQs page**: About IAPA, Services, Membership.
- **Privacy Policy & Legal Notice**: drafts marked "Draft — to be reviewed by IAPA before publication", with "Last updated: [Date]".
- **Footer social icons**: LinkedIn, Facebook, X, YouTube, managed from settings.
- **Placeholder images**: Savanna Green panels with the IAPA icon and a short caption. No stock photos of people.
- Everything in English and French (formal "vous"). French copy is tagged `[FR à valider]`.

## Admin area (/admin)
- Sign-in for IAPA staff. Only admins get in.
- Lists for team, news, events, resources, testimonials, vacancies, scholarships and FAQs, with a yellow "Placeholder" badge on sample rows.
- Dashboard counter: "X placeholder items left to replace".
- A "Show placeholders" switch, on by default. Turning it off at launch hides every sample item and placeholder social icon, and empty sections show their empty messages.
- Editing is basic: you can toggle placeholder status and delete rows. A full editor for each content type is not part of this round.

## At the end
A list of every remaining `[…]` tag, grouped by page, so you can send the client one content request.

## Technical details
- This needs Lovable Cloud enabled. Tables: team_members, news_posts, events, resources, testimonials, vacancies, scholarships, faqs (bilingual columns plus is_placeholder default true), site_settings (show_placeholders, social URLs), and user_roles with an admin role. RLS lets the public read only. Admins can write.
- Seed rows go in the migration. Public pages read through server functions that filter on show_placeholders.
- Static page copy (approaches, formats, legal) stays in pages.ts. Shared section-heading/section-content classes are kept.
- The IAPA Pulse PDF is added as a CDN asset.
