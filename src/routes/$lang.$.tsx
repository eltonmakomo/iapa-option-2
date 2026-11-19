import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { t, isLang, type Lang } from "@/lib/i18n";
import { PAGES, type Img } from "@/lib/pages";
import hero from "@/assets/hero-farmer.jpg";
import coop from "@/assets/cooperative.jpg";
import processor from "@/assets/processor.jpg";
import training from "@/assets/training-tree.jpg";

const IMGS: Record<Img, string> = { hero, coop, processor, training };

export const Route = createFileRoute("/$lang/$")({
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "en") as Lang;
    const p = PAGES[params._splat ?? ""];
    const title = p ? `${p.title[lang]} — IAPA` : "IAPA";
    const desc = p ? p.intro[lang] : "International Agribusiness Practitioners Association";
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: ContentPage,
});

function ContentPage() {
  const { lang: rawLang, _splat } = Route.useParams();
  const lang = rawLang as Lang;
  const d = t(lang);
  const p = PAGES[_splat ?? ""];
  if (!p) return (
    <section className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="text-4xl text-primary">{d.comingTitle}</h1>
      <p className="mt-4 text-muted-foreground">{d.comingBody}</p>
      <Link to="/$lang" params={{ lang }} className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground">{d.backHome}</Link>
    </section>
  );
  return (
    <article>
      <header className="relative isolate -mt-28 overflow-hidden">
        <img src={IMGS[p.img]} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="photo-scrim absolute inset-0 -z-10" />
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-48 text-forest-foreground lg:px-6">
          <p className="eyebrow text-sun">{p.eyebrow[lang]}</p>
          <h1 className="mt-3 max-w-3xl text-4xl md:text-5xl">{p.title[lang]}</h1>
          <p className="mt-5 max-w-2xl text-lg opacity-90">{p.intro[lang]}</p>
        </div>
      </header>
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 lg:px-6">
        {p.stats && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.stats.map(([n, lbl]) => (
              <div key={n + lbl.en} className="rounded-2xl bg-card p-8 shadow-sm">
                <p className="text-5xl font-extrabold text-primary">{n}</p>
                <p className="mt-2 font-semibold text-muted-foreground">{lbl[lang]}</p>
              </div>
            ))}
          </div>
        )}
        {p.sections.map((s) => (
          <section key={s.h.en}>
            <h2 className="section-heading text-3xl text-primary md:text-4xl">{s.h[lang]}</h2>
            {s.p && <p className="section-content max-w-3xl text-lg">{s.p[lang]}</p>}
            {s.items && (
              <div className={`${s.p ? "mt-8" : "section-content"} grid gap-4 md:grid-cols-2 lg:grid-cols-3`}>
                {s.items.map(([h, b]) => (
                  <div key={h.en} className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="text-lg text-foreground">{h[lang]}</h3>
                    <p className="mt-2 text-muted-foreground">{b[lang]}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
        {p.sections.length === 0 && !p.stats && (
          <p className="rounded-2xl bg-secondary p-8 text-lg text-muted-foreground">{d.comingBody}</p>
        )}
        {p.cta && (
          <div className="flex flex-col items-start gap-4 rounded-3xl bg-forest-deep p-10 text-forest-foreground md:flex-row md:items-center md:justify-between">
            <p className="text-2xl font-bold">{d.motto}</p>
            <Link to="/$lang/$" params={{ lang, _splat: p.cta.slug }} className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground">
              {p.cta.label[lang]} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
