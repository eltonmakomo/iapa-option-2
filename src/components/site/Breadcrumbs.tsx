import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { NAV } from "@/lib/nav";
import type { Lang } from "@/lib/i18n";

type Crumb = { label: string; slug?: string };

/** Finds the nav group + link for a page slug so the trail mirrors the menu. */
export function trailFor(slug: string, lang: Lang, current?: string): Crumb[] {
  const home: Crumb = { label: lang === "fr" ? "Accueil" : "Home", slug: "" };
  if (!slug) return [{ label: home.label }];
  const group = NAV.find((g) => slug === g.slug || slug.startsWith(g.slug + "/") || g.columns.some((c) => c.links.some((l) => l.slug === slug)));
  const link = NAV.flatMap((g) => g.columns.flatMap((c) => c.links)).find((l) => l.slug === slug);
  const out: Crumb[] = [home];
  if (group && group.slug !== slug) out.push({ label: group.label[lang], slug: group.slug });
  out.push({ label: link?.label[lang] ?? current ?? group?.label[lang] ?? slug });
  return out;
}

export function Breadcrumbs({ lang, slug, current, tone = "light" }: { lang: Lang; slug: string; current?: string; tone?: "light" | "dark" }) {
  const items = trailFor(slug, lang, current);
  return (
    <nav aria-label={lang === "fr" ? "Fil d'Ariane" : "Breadcrumb"} className="mb-5">
      <ol className={`inline-flex flex-wrap items-center gap-1.5 rounded-md px-3 py-1.5 text-sm ${tone === "light" ? "bg-cream/90 text-night" : "bg-savanna/25 text-night"}`}>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="inline-flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-semibold text-arid-orange">{c.label}</span>
              ) : c.slug === "" ? (
                <Link to="/$lang" params={{ lang }} className="hover:text-primary">{c.label}</Link>
              ) : (
                <Link to="/$lang/$" params={{ lang, _splat: c.slug! }} className="hover:text-primary">{c.label}</Link>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
