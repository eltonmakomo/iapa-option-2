import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import logoWhite from "@/assets/iapa-logo-white.png.asset.json";
import { NAV } from "@/lib/nav";
import { CONTACT, t, type Lang } from "@/lib/i18n";
import { NewsletterForm } from "./NewsletterForm";
import { GlobeDots } from "./GlobeDots";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "@/lib/content.functions";

const legalSlugs = ["brand-guidelines", "privacy", "legal-notice", "faq"];
const colSlugs = ["who-we-are", "training", "join"];

export function SiteFooter({ lang }: { lang: Lang }) {
  const d = t(lang);
  const { data: st } = useQuery({ queryKey: ["site-settings"], queryFn: () => getSiteSettings() });
  const socials = [
    { I: Linkedin, n: "LinkedIn", u: st?.linkedin_url ?? "#" },
    { I: Facebook, n: "Facebook", u: st?.facebook_url ?? "#" },
    { I: Twitter, n: "X", u: st?.x_url ?? "#" },
    { I: Youtube, n: "YouTube", u: st?.youtube_url ?? "#" },
  ].filter((x) => st?.show_placeholders !== false || (x.u && x.u !== "#"));
  const cols = colSlugs.map((s) => NAV.find((g) => g.slug === s)!).filter(Boolean);
  return (
    <footer className="bg-night">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-4 text-cream md:px-8 md:pt-8">
        <div className="relative overflow-hidden rounded-2xl border border-cream/10 bg-night px-6 py-10 text-cream md:px-10 md:py-14">
          <div className="nl-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <GlobeDots className="pointer-events-none absolute -right-24 top-1/2 hidden h-[150%] w-auto -translate-y-1/2 md:block" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl md:text-4xl">{d.nlTitle}</h2>
              <p className="mt-4 max-w-md text-sm text-cream/80">{d.nlBody}</p>
            </div>
            <div className="[&_button]:bg-cream [&_button]:text-night [&_button]:hover:bg-cream/90 [&_input]:border-transparent [&_input]:bg-card">
              <NewsletterForm lang={lang} tone="dark" />
            </div>
          </div>
        </div>

        <div className="grid gap-10 px-2 pt-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img
              src={logoWhite.url}
              alt={lang === "fr" ? "AIPA" : "IAPA"}
              width={1920}
              height={543}
              loading="lazy"
              className="h-12 w-auto"
            />
            <p className="mt-5 max-w-sm text-sm text-cream/75">{d.footerTagline}</p>
            <div className="mt-5 flex gap-4">
              {socials.map(({ I, n, u }) => (
                <a
                  key={n}
                  href={u || "#"}
                  aria-label={n}
                  className="text-cream/80 transition hover:text-clay"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((g) => (
            <div key={g.slug} className="lg:col-span-2">
              <p className="eyebrow mb-4 text-clay">{g.label[lang]}</p>
              <ul className="space-y-2 text-sm">
                {g.columns
                  .flatMap((c) => c.links)
                  .filter((x, i, a) => a.findIndex((y) => y.slug === x.slug) === i)
                  .slice(0, 4)
                  .map((x) => (
                    <li key={x.slug}>
                      <Link
                        to="/$lang/$"
                        params={{ lang, _splat: x.slug }}
                        className="text-cream/85 hover:text-clay"
                      >
                        {x.label[lang]}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          <div className="lg:col-span-2">
            <p className="eyebrow mb-4 text-clay">{d.contact}</p>
            <ul className="space-y-2 text-sm text-cream/85">
              <li>
                <Link to="/$lang/contact" params={{ lang }} className="hover:text-clay">
                  {lang === "fr" ? "Contactez-nous" : "Contact us"}
                </Link>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-1 h-3.5 w-3.5 shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-clay">
                  {CONTACT.email}
                </a>
              </li>
              {CONTACT.phones.map((p) => (
                <li key={p} className="flex gap-2">
                  <Phone className="mt-1 h-3.5 w-3.5 shrink-0" />
                  {p}
                </li>
              ))}
              <li className="flex gap-2">
                <MapPin className="mt-1 h-3.5 w-3.5 shrink-0" />
                {CONTACT.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/15 px-2 pt-5 text-xs text-cream/70 md:flex-row md:items-center md:justify-between">
          <p>© IAPA 2026</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {d.legal.map((x, i) => (
              <li key={x}>
                <Link
                  to="/$lang/$"
                  params={{ lang, _splat: legalSlugs[i] }}
                  className="hover:text-clay"
                >
                  {x}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
