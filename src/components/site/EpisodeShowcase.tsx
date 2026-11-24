import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Mic, Play } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import listener from "@/assets/man-listening-headphones-grass.jpg.asset.json";

type L = Record<Lang, string>;
type Episode = { no: number; host: string; length: string; title: L; body: L };
const l = (en: string, fr: string): L => ({ en, fr });

/** Placeholder episodes until real recordings are published. */
const EPISODES: Record<"podcast" | "webinar", { h: L; featured: Episode; list: Episode[] }> = {
  podcast: {
    h: l("Recent episodes", "Épisodes récents"),
    featured: { no: 4, host: "Amina Diallo", length: "38 min", title: l("Listening to the field", "À l'écoute du terrain"), body: l("Master Trainers share what farmers taught them about running a farm as a business.", "Des Master Trainers racontent ce que les agriculteurs leur ont appris sur la gestion d'une exploitation comme une entreprise.") },
    list: [
      { no: 3, host: "Kwame Mensah", length: "42 min", title: l("Cooperatives that pay off", "Des coopératives rentables"), body: l("How Cooperative Business School graduates rebuilt trust and margins.", "Comment les diplômés de l'École d'entrepreneuriat coopératif ont reconstruit confiance et marges.") },
      { no: 2, host: "Beatrice Uwase", length: "35 min", title: l("Contract farming, fairly", "Une agriculture contractuelle équitable"), body: l("What makes a buyer–farmer contract work for both sides.", "Ce qui fait fonctionner un contrat acheteur–agriculteur pour les deux parties.") },
      { no: 1, host: "Tendai Mukono", length: "29 min", title: l("Why IAPA, why now", "Pourquoi l'AIPA, pourquoi maintenant"), body: l("The founders on building a pan-African body of practitioners.", "Les fondateurs sur la création d'un organisme panafricain de praticiens.") },
    ],
  },
  webinar: {
    h: l("Recent recordings", "Enregistrements récents"),
    featured: { no: 4, host: "IAPA Secretariat", length: "1 h 05", title: l("Strategic Plan 2026–2030 explained", "Le Plan stratégique 2026–2030 expliqué"), body: l("A walk through IAPA's ambition to reach 40 African countries by 2030.", "Présentation de l'ambition de l'AIPA d'atteindre 40 pays africains d'ici 2030.") },
    list: [
      { no: 3, host: "Kwame Mensah", length: "58 min", title: l("Certifying Master Trainers", "La certification des Master Trainers"), body: l("Standards, assessment and what certification means for members.", "Normes, évaluation et ce que la certification signifie pour les membres.") },
      { no: 2, host: "Amina Diallo", length: "52 min", title: l("Blended training that works", "Une formation hybride efficace"), body: l("Combining online modules with field sessions for adult learners.", "Combiner modules en ligne et sessions de terrain pour les adultes.") },
      { no: 1, host: "Beatrice Uwase", length: "47 min", title: l("Measuring impact in value chains", "Mesurer l'impact dans les chaînes de valeur"), body: l("Simple tools to track farmer income and adoption.", "Des outils simples pour suivre les revenus et l'adoption.") },
    ],
  },
};

function Meta({ e, lang, light }: { e: Episode; lang: Lang; light?: boolean }) {
  const tone = light ? "text-cream/85" : "text-muted-foreground";
  return (
    <div className={`flex flex-wrap items-center gap-3 text-xs ${tone}`}>
      <span className={`rounded-full border px-3 py-1 font-semibold ${light ? "border-cream/40 text-cream" : "border-border text-night"}`}>
        {lang === "fr" ? "Épisode" : "Episode"} {e.no}
      </span>
      <span className="inline-flex items-center gap-1.5"><Mic className="h-3.5 w-3.5 text-primary" />{e.host}</span>
      <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-arid-orange" />{e.length}</span>
    </div>
  );
}

function Listen({ lang, light, kind }: { lang: Lang; light?: boolean; kind: "podcast" | "webinar" }) {
  const label = kind === "podcast" ? (lang === "fr" ? "Écouter" : "Listen now") : lang === "fr" ? "Regarder" : "Watch now";
  return (
    <span className={`inline-flex items-center gap-3 text-sm font-semibold ${light ? "text-cream" : "text-night"}`}>
      <span className={`grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 ${light ? "bg-cream text-night" : "bg-night text-cream group-hover:bg-primary"}`}>
        <Play className="h-4 w-4 fill-current" />
      </span>
      <span className="underline underline-offset-4">{label}</span>
      <span className="text-xs font-normal opacity-60">{lang === "fr" ? "[Lien à venir]" : "[Link to come]"}</span>
    </span>
  );
}

const Wave = () => (
  <div aria-hidden className="hidden items-center gap-[3px] opacity-30 sm:flex">
    {[6, 14, 9, 20, 12, 24, 10, 18, 7, 15, 22, 11, 8, 16, 5].map((h, i) => (
      <span key={i} className="w-[2px] rounded-full bg-night" style={{ height: h }} />
    ))}
  </div>
);

export function EpisodeShowcase({ kind, lang }: { kind: "podcast" | "webinar"; lang: Lang }) {
  const d = EPISODES[kind];
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="section-heading text-3xl text-night md:text-4xl">{d.h[lang]}</h2>
        <Link to="/$lang/$" params={{ lang, _splat: "knowledge-hub" }} className="inline-flex items-center gap-2 rounded-full border border-night px-4 py-2 text-sm font-semibold text-night transition-colors duration-300 hover:bg-night hover:text-cream">
          {lang === "fr" ? "Toute la bibliothèque" : "View the full library"}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="section-content grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          {d.list.map((e) => (
            <article key={e.no} className="group rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border transition-colors duration-300 hover:bg-secondary">
              <Meta e={e} lang={lang} />
              <h3 className="mt-4 text-xl font-bold text-night">{e.title[lang]}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{e.body[lang]}</p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <Listen lang={lang} kind={kind} />
                <Wave />
              </div>
            </article>
          ))}
        </div>
        <article className="relative isolate flex min-h-[480px] flex-col justify-between overflow-hidden rounded-2xl bg-night p-6">
          <img src={listener.url} alt={lang === "fr" ? "Un homme écoute avec un casque, allongé dans l'herbe" : "A man listening on headphones, lying on the grass"} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover object-[45%_30%]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/90 via-night/30 to-night/20" />
          <Meta e={d.featured} lang={lang} light />
          <div>
            <h3 className="text-2xl font-bold text-cream md:text-3xl">{d.featured.title[lang]}</h3>
            <p className="mt-2 max-w-md text-sm text-cream/80">{d.featured.body[lang]}</p>
            <div className="mt-5"><Listen lang={lang} light kind={kind} /></div>
          </div>
        </article>
      </div>
    </section>
  );
}
