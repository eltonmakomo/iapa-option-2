import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import logoWhiteFr from "@/assets/iapa-logo-white.png.asset.json";
import logoEn from "@/assets/iapa-logo.jpg.asset.json";
import { NAV } from "@/lib/nav";
import { CONTACT, t, type Lang } from "@/lib/i18n";
import { NewsletterForm } from "./NewsletterForm";

const legalSlugs = ["brand-guidelines", "privacy", "legal-notice", "faq"];

export function SiteFooter({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-12 lg:px-6">
        <div className="lg:col-span-4">
          {lang === "fr" ? (
            <img src={logoWhiteFr.url} alt="AIPA" width={1920} height={543} loading="lazy" className="h-14 w-auto" />
          ) : (
            <span className="inline-block rounded-xl bg-card p-3">
              <img src={logoEn.url} alt="IAPA" width={1270} height={354} loading="lazy" className="h-10 w-auto" />
            </span>
          )}
          <p className="mt-5 max-w-sm text-sm opacity-90">{d.footerTagline}</p>
          <div className="mt-6 flex gap-3">
            {[Linkedin, Facebook, Twitter, Youtube].map((I, i) => (
              <a key={i} href="#" aria-label={["LinkedIn", "Facebook", "X", "YouTube"][i]}
                className="grid h-10 w-10 place-items-center rounded-full bg-forest-deep transition hover:bg-accent hover:text-accent-foreground">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <p className="eyebrow mb-4 text-sun">{d.quickLinks}</p>
          <ul className="grid grid-cols-2 gap-y-2 text-sm lg:grid-cols-1">
            {NAV.map((g) => (
              <li key={g.slug}><Link to="/$lang/$" params={{ lang, _splat: g.slug }} className="opacity-90 hover:opacity-100 hover:underline">{g.label[lang]}</Link></li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4 text-sun">{d.contact}</p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" /><a href={`mailto:${CONTACT.email}`} className="hover:underline break-all">{CONTACT.email}</a></li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" />{CONTACT.phones.join(" · ")}</li>
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{CONTACT.address}</li>
          </ul>
          <p className="mt-6 font-semibold">{d.nlTitle}</p>
          <NewsletterForm lang={lang} tone="dark" />
        </div>
      </div>
      <div className="border-t border-forest-foreground/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs opacity-90 md:flex-row md:items-center md:justify-between lg:px-6">
          <p>© IAPA 2026</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {d.legal.map((x, i) => (
              <li key={x}><Link to="/$lang/$" params={{ lang, _splat: legalSlugs[i] }} className="hover:underline">{x}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
