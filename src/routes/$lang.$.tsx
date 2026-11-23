import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Users, HeartHandshake, HandHeart } from "lucide-react";
import { t, isLang, type Lang } from "@/lib/i18n";
import { PAGES, type Img } from "@/lib/pages";
import { DynamicBlock, blockQuery } from "@/components/site/DynamicBlock";
import { logoOf } from "@/lib/partner-logos";
import { ImpactMap } from "@/components/site/ImpactMap";
import { RegionCard, RegionMapTile } from "@/components/site/RegionCard";
import { CountUp } from "@/components/site/CountUp";
import hero from "@/assets/hero-farmer.jpg";
import coop from "@/assets/cooperative.jpg";
import processor from "@/assets/processor.jpg";
import training from "@/assets/training-tree.jpg";
import planting from "@/assets/hands-planting-lettuce.jpg.asset.json";
import ctaPhoto from "@/assets/man-planting-seedlings.jpg.asset.json";

const IMGS: Record<Img, string> = { hero, coop, processor, training, planting: planting.url };

export const Route = createFileRoute("/$lang/$")({
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "en") as Lang;
    const p = PAGES[params._splat ?? ""];
    const title = p ? `${p.title[lang]} — IAPA` : "IAPA";
    const desc = p ? p.intro[lang] : "International Agribusiness Practitioners Association";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  loader: async ({ params, context }) => {
    const p = PAGES[params._splat ?? ""];
    await Promise.all(
      (p?.blocks ?? []).map((b) => context.queryClient.ensureQueryData(blockQuery(b))),
    );
  },
  errorComponent: ({ error }) => (
    <div role="alert" className="mx-auto max-w-2xl px-4 py-32">
      {error instanceof Error ? error.message : String(error)}
    </div>
  ),
  notFoundComponent: () => <div className="mx-auto max-w-2xl px-4 py-32">Not found</div>,
  component: ContentPage,
});

function ContentPage() {
  const { lang: rawLang, _splat } = Route.useParams();
  const lang = rawLang as Lang;
  const d = t(lang);
  const p = PAGES[_splat ?? ""];
  if (_splat === "our-work/impact-map") return <ImpactMap lang={lang} />;
  if (!p)
    return (
      <section className="mx-auto max-w-2xl px-4 py-32 text-center">
        <h1 className="text-4xl text-primary">{d.comingTitle}</h1>
        <p className="mt-4 text-muted-foreground">{d.comingBody}</p>
        <Link
          to="/$lang"
          params={{ lang }}
          className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
        >
          {d.backHome}
        </Link>
      </section>
    );
  return (
    <article>
      <header className="relative isolate -mt-28 overflow-hidden">
        <img
          src={IMGS[p.img]}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="photo-scrim absolute inset-0 -z-10" />
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-48 text-forest-foreground lg:px-6">
          {p.draft && (
            <p className="mb-6 inline-block rounded-full bg-sun px-4 py-1.5 text-sm font-bold text-ink">
              {lang === "fr"
                ? "Brouillon — à relire par l'AIPA avant publication."
                : "Draft — to be reviewed by IAPA before publication."}
            </p>
          )}
          <p className="eyebrow text-sun">{p.eyebrow[lang]}</p>
          <h1
            className={`mt-3 whitespace-pre-line text-4xl md:text-5xl ${p.narrowIntro ? "max-w-5xl" : "max-w-3xl"}`}
          >
            {p.title[lang]}
          </h1>
          <p
            className={`mt-8 text-lg font-light opacity-95 ${p.narrowIntro ? "max-w-[75%]" : "max-w-2xl"}`}
          >
            {p.intro[lang]}
          </p>
        </div>
      </header>
      <div className="space-y-16 py-16">
        {p.stats && (
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            {p.statsCards ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {p.stats.map(([n, lbl, sub]) => (
                  <div
                    key={n + lbl.en}
                    className="stat-notch group flex min-h-[300px] flex-col bg-leaf-1 p-5 text-night transition-colors duration-300 hover:bg-night hover:text-cream md:min-h-[370px]"
                  >
                    <h3 className="text-lg font-bold uppercase leading-[1.1] tracking-normal">
                      {lbl[lang]}
                    </h3>
                    {sub && <p className="mt-3 text-sm leading-relaxed opacity-80">{sub[lang]}</p>}
                    <p className="mt-auto text-7xl font-medium tracking-tight text-forest-deep transition-colors duration-300 group-hover:text-cream md:text-8xl lg:text-9xl">
                      <CountUp value={n} />
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {p.stats.map(([n, lbl]) => (
                  <div key={n + lbl.en} className="rounded-2xl bg-card p-8 shadow-sm">
                    <p className="text-5xl font-extrabold text-primary">
                      <CountUp value={n} />
                    </p>
                    <p className="mt-2 font-semibold text-muted-foreground">{lbl[lang]}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {p.sections.map((s) =>
          s.regions ? (
            <section key={s.h.en} className="bg-cream py-16">
              <div>
                <div className="mx-auto max-w-7xl px-4 lg:px-6">
                  <h2 className="section-heading text-3xl text-primary md:text-4xl">{s.h[lang]}</h2>
                </div>
                <ul className="section-content grid gap-px overflow-hidden border-y border-forest-deep/20 bg-forest-deep/12 sm:grid-cols-2 lg:grid-cols-3">
                  {d.regions.map(([r, c], i) => (
                    <li key={r} className="flex min-w-0">
                      <RegionCard lang={lang} title={r ?? ""} countries={c ?? ""} index={i} />
                    </li>
                  ))}
                  <li className="flex min-w-0">
                    <RegionMapTile lang={lang} label={d.seeMap} />
                  </li>
                </ul>
              </div>
            </section>
          ) : s.feature && s.p ? (
            <div key={s.h.en} className="mx-auto max-w-7xl px-4 lg:px-6">
              <section className="grid gap-6 rounded-xl bg-mint p-8 md:grid-cols-[1fr_2fr] md:gap-12 md:p-12">
                <p className="text-sm font-medium text-night">{s.h[lang]}</p>
                <div>
                  {(() => {
                    const t = s.p[lang];
                    const i = t.indexOf(",") + 1;
                    return (
                      <p className="text-2xl font-bold leading-snug text-forest-deep md:text-3xl">
                        {t.slice(0, i)}
                        <span className="text-muted-foreground/70">{t.slice(i)}</span>
                      </p>
                    );
                  })()}
                  <img
                    src={IMGS[s.feature]}
                    alt=""
                    loading="lazy"
                    className="mt-8 aspect-[16/9] w-full rounded-lg object-cover"
                  />
                </div>
              </section>
            </div>
          ) : (
            <div key={s.h.en} className="mx-auto max-w-7xl px-4 lg:px-6">
              <section>
                <h2 className="section-heading text-3xl text-primary md:text-4xl">{s.h[lang]}</h2>
                {s.p && <p className="section-content max-w-3xl text-lg">{s.p[lang]}</p>}
                {s.list && (
                  <ul className="section-content grid max-w-3xl gap-3">
                    {s.list.map((x) => (
                      <li key={x.en} className="flex gap-3 text-lg">
                        <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-savanna" />
                        {x[lang]}
                      </li>
                    ))}
                  </ul>
                )}
                {s.tags && (
                  <div className="section-content flex flex-wrap gap-2">
                    {s.tags.map((x) => (
                      <span
                        key={x}
                        className="rounded-full border border-primary/30 px-4 py-1.5 text-sm font-semibold text-primary"
                      >
                        {x}
                      </span>
                    ))}
                  </div>
                )}
                {s.steps && (
                  <ol className="section-content grid gap-4 md:grid-cols-4">
                    {s.steps.map(([h, b], i) => (
                      <li
                        key={h.en}
                        className="rounded-2xl bg-forest-deep p-6 text-forest-foreground"
                      >
                        <span className="text-3xl font-extrabold text-sun">{i + 1}</span>
                        <h3 className="mt-3 text-lg">{h[lang]}</h3>
                        {b[lang] && <p className="mt-2 text-sm opacity-80">{b[lang]}</p>}
                      </li>
                    ))}
                  </ol>
                )}
                {s.rows && (
                  <table className="section-content w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card text-left">
                    <tbody className="divide-y divide-border">
                      {s.rows.map(([k, v]) => (
                        <tr key={k.en}>
                          <th className="p-4 font-semibold">{k[lang]}</th>
                          <td className="p-4 italic text-muted-foreground">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {s.items && (
                  <div
                    className={`${s.p ? "mt-8" : "section-content"} grid gap-4 md:grid-cols-2 lg:grid-cols-3`}
                  >
                    {s.items.map(([h, b, keys], i) => (
                      <div
                        key={h.en}
                        className={
                          s.icons
                            ? "group rounded-2xl bg-card p-8 shadow-sm transition-colors duration-300 hover:bg-night"
                            : "rounded-2xl border border-border bg-card p-6"
                        }
                      >
                        {s.icons &&
                          (() => {
                            const Icon = [Users, HeartHandshake, HandHeart][i % 3]!;
                            return (
                              <span className="icon-tile mb-20 flex h-12 w-12 items-center justify-center bg-night text-forest-foreground transition-colors duration-300 group-hover:bg-forest-foreground group-hover:text-night">
                                <Icon className="h-5 w-5" />
                              </span>
                            );
                          })()}
                        {keys && keys.length > 0 && (
                          <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                            {keys.map((k) => {
                              const p = logoOf(k);
                              return (
                                <img
                                  key={k}
                                  src={p.url}
                                  alt={p.name[lang]}
                                  loading="lazy"
                                  className="h-9 w-auto max-w-[190px] object-contain"
                                />
                              );
                            })}
                          </div>
                        )}
                        <h3
                          className={`text-lg text-foreground${s.icons ? " transition-colors duration-300 group-hover:text-forest-foreground" : ""}`}
                        >
                          {h[lang]}
                        </h3>
                        <p
                          className={`mt-2 text-muted-foreground${s.icons ? " transition-colors duration-300 group-hover:text-forest-foreground/70" : ""}`}
                        >
                          {b[lang]}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {s.note && (
                  <p className="mt-4 text-sm italic text-muted-foreground">{s.note[lang]}</p>
                )}
              </section>
            </div>
          ),
        )}
        {p.blocks && p.blocks.length > 0 && (
          <div className="mx-auto max-w-7xl space-y-16 px-4 lg:px-6">
            {p.blocks.map((b, i) => (
              <DynamicBlock key={i} block={b} lang={lang} />
            ))}
          </div>
        )}
        {p.sections.length === 0 && !p.stats && !p.blocks && (
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <p className="rounded-2xl bg-secondary p-8 text-lg text-muted-foreground">
              {d.comingBody}
            </p>
          </div>
        )}
        {p.cta && (
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <div className="relative isolate flex flex-col items-start gap-4 overflow-hidden bg-gradient-to-b from-forest-deep via-forest-deep to-night p-10 text-forest-foreground md:flex-row md:items-center md:justify-between md:bg-gradient-to-r">
              <img
                src={ctaPhoto.url}
                alt=""
                loading="lazy"
                className="absolute inset-y-0 left-0 -z-10 h-full w-full object-cover object-[65%_28%] opacity-25 [mask-image:linear-gradient(to_right,black_0%,black_35%,transparent_75%)] md:w-3/4"
              />
              <p className="text-2xl font-bold">{d.motto}</p>
              <Link
                to="/$lang/$"
                params={{ lang, _splat: p.cta.slug }}
                className="wwu group relative inline-flex items-center rounded-full border border-sun"
              >
                <span className="wwu-fill" aria-hidden="true" />
                <span className="relative z-10 px-7 py-3.5 font-bold text-forest-deep">
                  {p.cta.label[lang]}
                </span>
                <span className="wwu-arrow relative z-10 grid h-11 w-11 shrink-0 place-items-center">
                  <ArrowUpRight className="h-[23px] w-[23px]" strokeWidth={2} />
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
