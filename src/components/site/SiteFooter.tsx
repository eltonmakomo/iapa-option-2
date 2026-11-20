import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import logoWhite from "@/assets/iapa-logo-white.png.asset.json";
import { NAV } from "@/lib/nav";
import { CONTACT, t, type Lang } from "@/lib/i18n";

const legalSlugs = ["brand-guidelines", "privacy", "legal-notice", "faq"];
const colSlugs = ["who-we-are", "training", "join"];

export function SiteFooter({ lang }: { lang: Lang }) {
  const d = t(lang);
  const cols = colSlugs.map((s) => NAV.find((g) => g.slug === s)!).filter(Boolean);
  return (
    <footer className="bg-background px-3 pb-3 pt-10 md:px-6 md:pb-6">
      <div className="mx-auto max-w-7xl rounded-3xl bg-ink px-4 pb-8 pt-8 text-cream md:px-8 md:pt-10">
        <div className="grid gap-10 px-2 pt-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img src={logoWhite.url} alt={lang === "fr" ? "AIPA" : "IAPA"} width={1920} height={543} loading="lazy" className="h-12 w-auto" />
            <p className="mt-5 max-w-sm text-sm text-cream/75">{d.footerTagline}</p>
            <div className="mt-5 flex gap-4">
              {[Linkedin, Facebook, Twitter, Youtube].map((I, i) => (
                <a key={i} href="#" aria-label={["LinkedIn", "Facebook", "X", "YouTube"][i]} className="text-cream/80 transition hover:text-clay">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((g) => (
            <div key={g.slug} className="lg:col-span-2">
              <p className="eyebrow mb-4 text-clay">{g.label[lang]}</p>
              <ul className="space-y-2 text-sm">
                {g.columns.flatMap((c) => c.links).filter((x, i, a) => a.findIndex((y) => y.slug === x.slug) === i).slice(0, 4).map((x) => (
                  <li key={x.slug}><Link to="/$lang/$" params={{ lang, _splat: x.slug }} className="text-cream/85 hover:text-clay">{x.label[lang]}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="lg:col-span-2">
            <p className="eyebrow mb-4 text-clay">{d.contact}</p>
            <ul className="space-y-2 text-sm text-cream/85">
              <li className="flex gap-2"><Mail className="mt-1 h-3.5 w-3.5 shrink-0" /><a href={`mailto:${CONTACT.email}`} className="break-all hover:text-clay">{CONTACT.email}</a></li>
              {CONTACT.phones.map((p) => <li key={p} className="flex gap-2"><Phone className="mt-1 h-3.5 w-3.5 shrink-0" />{p}</li>)}
              <li className="flex gap-2"><MapPin className="mt-1 h-3.5 w-3.5 shrink-0" />{CONTACT.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/15 px-2 pt-5 text-xs text-cream/70 md:flex-row md:items-center md:justify-between">
          <p>© IAPA 2026</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {d.legal.map((x, i) => (
              <li key={x}><Link to="/$lang/$" params={{ lang, _splat: legalSlugs[i] }} className="hover:text-clay">{x}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
