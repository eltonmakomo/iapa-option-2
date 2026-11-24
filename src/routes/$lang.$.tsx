import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Users,
  HeartHandshake,
  HandHeart,
  Lightbulb,
  GraduationCap,
  Presentation,
} from "lucide-react";
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

import pFarmer from "@/assets/happy-farmer-holding-fresh-vegetables-harvest-in-f.jpg.asset.json";
import pCabbages from "@/assets/smiling-woman-carrying-cabbages-in-a-field.jpg.asset.json";
import pCrate from "@/assets/woman-holds-lettuce-crate-in-greenhouse.jpg.asset.json";
import pHarvest from "@/assets/man-harvesting-fresh-produce-in-a-rural-setting.jpg.asset.json";
import pLaptop from "@/assets/focused-man-working-on-laptop-in-greenhouse.jpg.asset.json";
import pCorn from "@/assets/man-inspecting-corn-crop-with-digital-tablet.jpg.asset.json";
import iBoard from "@/assets/page-board-strategy.jpg";
import iGovernance from "@/assets/page-governance-vote.jpg";
import iPartners from "@/assets/page-partnership-handshake.jpg";
import iCabbage from "@/assets/woman-inspecting-cabbage-crops-in-field.jpg.asset.json";
import iData from "@/assets/page-data-review.jpg";
import iNewsField from "@/assets/news-field.png.asset.json";
import iNewsTrainers from "@/assets/news-trainers.png.asset.json";
import iNewsStrategy from "@/assets/news-strategy.png.asset.json";
import iDiscussion from "@/assets/page-group-discussion.jpg";
import iClassroom from "@/assets/page-training-classroom.jpg";
import iLibrary from "@/assets/page-resource-library.jpg";
import iNetworking from "@/assets/page-networking-event.jpg";
import iConference from "@/assets/page-conference-hall.jpg";
import iFieldvisit from "@/assets/page-field-visit.jpg";
import iPress from "@/assets/page-press-microphone.jpg";
import iNewsletter from "@/assets/page-newsletter-reading.jpg";
import iVacancy from "@/assets/page-vacancy-board.jpg";
import iScholarship from "@/assets/page-scholarship-graduate.jpg";
import iCertificate from "@/assets/page-certificate-handover.jpg";
import iAgronomist from "@/assets/woman-agronomist-works-with-tablet-in-greenhouse.jpg.asset.json";
import iGreens from "@/assets/woman-harvesting-fresh-greens-in-greenhouse.jpg.asset.json";
import iLeadership from "@/assets/page-leadership-meeting.jpg";
import iSeedlings from "@/assets/adult-man-planting-seedlings-in-the-field.jpg.asset.json";
import iLettuceHands from "@/assets/hands-planting-young-lettuce-in-fertile-soil.jpg.asset.json";
import iFish from "@/assets/page-fish-ponds.jpg";
import iContract from "@/assets/page-contract-farming.jpg";
import iCornField from "@/assets/lush-green-corn-plants-growing-in-a-field.jpg.asset.json";
import cCocoa from "@/assets/crop-cocoa.jpg";
import cCoffee from "@/assets/crop-coffee.jpg";
import cMaize from "@/assets/crop-maize.jpg";
import cRice from "@/assets/crop-rice.jpg";
import cDairy from "@/assets/crop-dairy.jpg";
import cOnion from "@/assets/crop-onion.jpg";
import cCashew from "@/assets/crop-cashew.jpg";
import cSoybean from "@/assets/crop-soybean.jpg";
import cRiceFish from "@/assets/crop-rice-fish.jpg";
import cPeanut from "@/assets/crop-peanut.jpg";

const TRAINING_PHOTOS: Record<string, string> = {
  "happy-farmer": pFarmer.url,
  "coop-cabbages": pCabbages.url,
  "lettuce-crate": pCrate.url,
  "harvesting-produce": pHarvest.url,
  laptop: pLaptop.url,
  "corn-tablet": pCorn.url,
};
const CROPS: Record<string, string> = {
  Cocoa: cCocoa,
  Coffee: cCoffee,
  Maize: cMaize,
  Rice: cRice,
  Dairy: cDairy,
  Onion: cOnion,
  Cashew: cCashew,
  Soybean: cSoybean,
  "Rice-fish": cRiceFish,
  Peanut: cPeanut,
};
const QUAD_ICONS = [Lightbulb, Users, GraduationCap, Presentation];

const IMGS: Record<Img, string> = {
  hero,
  coop,
  processor,
  training,
  planting: planting.url,
  board: iBoard,
  governance: iGovernance,
  partners: iPartners,
  cabbage: iCabbage.url,
  data: iData,
  newsField: iNewsField.url,
  newsTrainers: iNewsTrainers.url,
  newsStrategy: iNewsStrategy.url,
  discussion: iDiscussion,
  classroom: iClassroom,
  library: iLibrary,
  networking: iNetworking,
  conference: iConference,
  fieldvisit: iFieldvisit,
  press: iPress,
  newsletter: iNewsletter,
  vacancy: iVacancy,
  scholarship: iScholarship,
  certificate: iCertificate,
  agronomist: iAgronomist.url,
  greens: iGreens.url,
  leadership: iLeadership,
  "happy-farmer": pFarmer.url,
  "coop-cabbages": pCabbages.url,
  "lettuce-crate": pCrate.url,
  "harvesting-produce": pHarvest.url,
  laptop: pLaptop.url,
  "corn-tablet": pCorn.url,
  seedlings: iSeedlings.url,
  lettuceHands: iLettuceHands.url,
  fish: iFish,
  contract: iContract,
  cornField: iCornField.url,
};

// Frame the upper part of each photo, with horizontal focus on its subject.
const HERO_FRAMING: Partial<Record<Img, string>> = {
  hero: "object-[35%_0%]",
  processor: "object-[35%_0%]",
  cabbage: "object-[85%_8%] md:object-contain md:object-right",
  data: "object-[45%_0%]",
  seedlings: "object-[65%_0%]",
  classroom: "object-[70%_0%]",
  newsTrainers: "object-[55%_0%]",
  vacancy: "object-[35%_0%]",
  scholarship: "object-[35%_0%]",
  press: "object-[75%_0%]",
  newsletter: "object-[70%_0%]",
  agronomist: "object-[55%_14%] md:object-contain md:object-right",
  greens: "object-[45%_32%] md:object-contain md:object-right",
  contract: "object-[60%_0%]",
};

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
      <header className="relative isolate -mt-28 min-h-[520px] overflow-hidden bg-night md:aspect-[16/7]">
        <img
          src={IMGS[p.img]}
          alt=""
          className={`absolute inset-0 -z-10 h-full w-full object-cover ${HERO_FRAMING[p.img] ?? "object-top"}`}
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
      <div className="py-10">
        {p.stats && (
          <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
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
            <section key={s.h.en} className="bg-cream py-10">
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
          ) : s.quad ? (
            <div key={s.h.en} className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
              <section className="grid gap-4 lg:grid-cols-[3fr_2fr]">
                <div className="grid gap-4 sm:grid-cols-2">
                  {s.quad.cards.map(([h, b], i) => {
                    const Icon = QUAD_ICONS[i % 4]!;
                    return (
                      <div
                        key={h.en}
                        className="group rounded-2xl bg-card p-8 shadow-sm transition-colors duration-300 hover:bg-night"
                      >
                        <div className="mb-6 flex items-center gap-4">
                        <span className="icon-tile flex h-12 w-12 shrink-0 items-center justify-center bg-night text-forest-foreground transition-colors duration-300 group-hover:bg-forest-foreground group-hover:text-night">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-forest-foreground md:text-2xl">
                          {h[lang]}
                        </h3>
                        </div>
                        {Array.isArray(b) ? (
                          <ul className="mt-2 grid gap-1.5 text-muted-foreground transition-colors duration-300 group-hover:text-forest-foreground/70">
                            {b.map((x) => (
                              <li key={x.en} className="flex gap-2">
                                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-savanna" />
                                {x[lang]}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-muted-foreground transition-colors duration-300 group-hover:text-forest-foreground/70">
                            {b[lang]}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <img
                  src={TRAINING_PHOTOS[s.quad.photo]}
                  alt=""
                  loading="lazy"
                  className="h-full min-h-[320px] w-full rounded-2xl object-cover"
                />
              </section>
            </div>
          ) : s.feature && s.p ? (
            <div key={s.h.en} className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
              <section className="grid gap-6 rounded-xl bg-mint p-8 md:grid-cols-[1fr_2fr] md:gap-12 md:p-12">
                <p className="section-heading text-3xl text-primary md:text-4xl">{s.h[lang]}</p>
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
            <div key={s.h.en} className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
              <section>
                <h2
                  className={`section-heading text-3xl text-primary md:text-4xl${s.centered ? " mx-auto text-center" : ""}`}
                >
                  {s.h[lang]}
                </h2>
                {s.sub && (
                  <p
                    className={`mt-4 text-lg text-muted-foreground${s.centered ? " mx-auto max-w-2xl text-center" : " max-w-3xl"}`}
                  >
                    {s.sub[lang]}
                  </p>
                )}
                {s.p &&
                  (s.cards ? (
                    <div className="section-content max-w-3xl rounded-2xl border border-border bg-card p-6">
                      <p className="text-lg">{s.p[lang]}</p>
                    </div>
                  ) : (
                    <p className="section-content max-w-3xl text-lg">{s.p[lang]}</p>
                  ))}
                {s.list &&
                  (s.cards ? (
                    <ul className="section-content grid gap-4 md:grid-cols-2">
                      {s.list.map((x) => (
                        <li
                          key={x.en}
                          className="flex gap-3 rounded-2xl border border-border bg-card p-6 text-lg"
                        >
                          <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-savanna" />
                          {x[lang]}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="section-content grid max-w-3xl gap-3">
                      {s.list.map((x) => (
                        <li key={x.en} className="flex gap-3 text-lg">
                          <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-savanna" />
                          {x[lang]}
                        </li>
                      ))}
                    </ul>
                  ))}
                {s.tags &&
                  (s.cropCards ? (
                    <div className="section-content grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {s.tags.map((x) => (
                        <div
                          key={x}
                          className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-card shadow-sm"
                        >
                          <img
                            src={CROPS[x]}
                            alt={x}
                            loading="lazy"
                            width={944}
                            height={704}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-transparent" />
                          <p className="absolute bottom-0 left-0 p-6 text-2xl font-extrabold text-forest-foreground md:text-3xl">
                            {x}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : s.cards ? (
                    <div className="section-content grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {s.tags.map((x) => (
                        <div
                          key={x}
                          className="rounded-2xl border border-border bg-card p-6 text-center text-lg font-semibold text-primary"
                        >
                          {x}
                        </div>
                      ))}
                    </div>
                  ) : (
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
                  ))}
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
                {s.items && s.logoGrid && (
                  <div
                    className={`${s.p ? "mt-8" : "section-content"} grid grid-cols-2 gap-px overflow-hidden border border-forest-deep/20 bg-forest-deep/20 md:grid-cols-3 lg:grid-cols-4`}
                  >
                    {s.items.map(([h, b, keys]) => (
                      <div
                        key={h.en + (keys?.[0] ?? "")}
                        className="group relative flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-card p-6 transition-colors duration-300 hover:bg-rainforest"
                      >
                        {keys?.map((k) => {
                          const p = logoOf(k);
                          return (
                            <img
                              key={k}
                              src={p.url}
                              alt={p.name[lang]}
                              loading="lazy"
                              className="h-12 w-auto max-w-[70%] object-contain transition-all duration-300 group-hover:scale-75 group-hover:opacity-0"
                            />
                          );
                        })}
                        <p className="text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-opacity duration-200 group-hover:opacity-0">
                          {h[lang]}
                        </p>
                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
                          <p className="translate-y-2 text-center text-sm font-medium leading-snug text-forest-foreground opacity-0 transition-all duration-300 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
                            {b[lang]}
                          </p>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {s.items && !s.logoGrid && (
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
          <div className="mx-auto max-w-7xl space-y-20 px-4 py-10 lg:px-6">
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
