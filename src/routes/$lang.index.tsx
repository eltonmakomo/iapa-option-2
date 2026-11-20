import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Award, BookOpen, Briefcase, CalendarDays, Compass, GraduationCap, Megaphone, Users } from "lucide-react";
import hero from "@/assets/hero-farmer.jpg";
import coop from "@/assets/cooperative.jpg";
import proc from "@/assets/processor.jpg";
import train from "@/assets/training-tree.jpg";
import { t, type Lang } from "@/lib/i18n";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { ReadMoreLink } from "@/components/site/ReadMoreLink";
import { RegionCard, RegionMapTile } from "@/components/site/RegionCard";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    const fr = params.lang === "fr";
    const title = fr ? "AIPA — Formation et conseil certifiés en agribusiness en Afrique" : "IAPA — Certified agribusiness training and advisory in Africa";
    const desc = fr ? "Réseau panafricain de Master Trainers et d'experts des chaînes de valeur agricoles dans plus de 20 pays." : "Pan-African network of Master Trainers and agricultural value chain experts across 20+ countries.";
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: Home,
});

const whatIcons = [Compass, BookOpen, GraduationCap, CalendarDays, Award, Users, Megaphone, Briefcase];

// Each visible group of four fades from white to the soft green (leaf-1).
const whatTones = [
  { card: "bg-card text-forest-deep", tile: "bg-forest-deep/10 text-forest-deep" },
  { card: "bg-leaf-fade-1 text-forest-deep", tile: "bg-forest-deep/10 text-forest-deep" },
  { card: "bg-leaf-fade-2 text-forest-deep", tile: "bg-forest-deep/10 text-forest-deep" },
  { card: "bg-leaf-1 text-forest-deep", tile: "bg-forest-deep/10 text-forest-deep" },
];


function Home() {
  const lang = Route.useParams().lang as Lang;
  const d = t(lang);
  const newsImgs = [coop, train, proc];
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [group, setGroup] = useState(0);

  useEffect(() => {
    if (!animate) {
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
      return () => cancelAnimationFrame(r);
    }
    const id = setInterval(() => setOffset((o) => o + 1), 3500);
    return () => clearInterval(id);
  }, [animate]);

  return (
    <>
      <section className="relative isolate aspect-[16/9] min-h-[580px] w-full overflow-hidden min-[800px]:min-h-[440px]">
        <img src={hero} alt="" width={1920} height={1080} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 photo-scrim" />
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pt-36 pb-12 text-forest-foreground min-[800px]:pt-28 min-[800px]:pb-12 lg:px-6">
          <h1 className="max-w-none text-4xl md:text-[2.75rem] lg:text-[3.25rem] xl:text-6xl">{d.heroTitle}</h1>
          <p className="mt-8 max-w-2xl text-lg font-light opacity-95">{d.heroSub}</p>
          <div className="mt-[2.6667rem] flex flex-wrap gap-3 md:mt-16">
            <Link to="/$lang/$" params={{ lang, _splat: "work-with-us" }} className="wwu group relative inline-flex items-center rounded-full border border-sun">
              <span className="wwu-fill" aria-hidden="true" />
              <span className="relative z-10 px-7 py-3.5 font-bold text-forest-deep">{d.workWithUs}</span>
              <span className="wwu-arrow relative z-10 grid h-11 w-11 shrink-0 place-items-center"><ArrowUpRight className="h-[23px] w-[23px]" strokeWidth={2} /></span>
            </Link>
            <Link to="/$lang/$" params={{ lang, _splat: "join" }} className="wwu wwu-ghost relative inline-flex items-center rounded-full border border-forest-foreground">
              <span className="wwu-fill" aria-hidden="true" />
              <span className="wwu-label relative z-10 px-7 py-3.5 font-bold text-forest-foreground">{d.becomeMember}</span>
              <span className="wwu-arrow wwu-reveal relative z-10 grid h-11 w-11 shrink-0 place-items-center"><ArrowRight className="h-[23px] w-[23px]" strokeWidth={2} /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <div>
            <p className="eyebrow text-forest-deep">{d.aboutEyebrow}</p>
            <h2 className="section-heading mt-3 text-3xl text-primary md:text-4xl">{d.aboutTitle}</h2>
          </div>
          <div className="md:pt-7">
            <p className="text-xl font-medium text-muted-foreground">{d.aboutBody}</p>
            <ReadMoreLink lang={lang} to="who-we-are" className="mt-10">{d.learnMore}</ReadMoreLink>
          </div>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <p className="eyebrow text-forest-deep">{d.whatEyebrow}</p>
          <h2 className={`section-heading mt-3 ${lang === "en" ? "what-heading" : "text-3xl md:text-4xl"}`}>
            {d.whatTitle.split(", ").map((part, gi) => (
              <span key={gi}>
                {gi > 0 && <span className={group === 0 ? "text-primary" : "text-muted-foreground/50"}>, </span>}
                <button type="button" onClick={() => setGroup(gi)} className={`text-left transition-colors duration-300 ${group === gi ? "text-primary" : "text-muted-foreground/50 hover:text-muted-foreground"}`}>
                  {gi > 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part}
                </button>
              </span>
            ))}
          </h2>
          <p className="mt-4 whitespace-nowrap text-[clamp(0.625rem,1.55vw,1.125rem)] font-light leading-snug text-forest-deep">{d.inclusionNote}</p>
          <div className="section-content grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...d.partnerItems.map((item) => [d.forPartners, item] as const), ...d.memberItems.map((item) => [d.forMembers, item] as const)].map(([tag, [h, b]], i) => [tag, h, b, i] as const).filter(([, , , i]) => Math.floor(i / 4) === group).map(([tag, h, b, i]) => {
              const Icon = whatIcons[i]!;
              const tone = whatTones[i % 4]!;
              return (
                <div key={h} className="[filter:drop-shadow(0_14px_24px_rgb(33_54_24/0.16))_drop-shadow(0_2px_6px_rgb(33_54_24/0.12))] animate-in fade-in duration-500">
                  <div className={`stat-notch relative flex h-full min-h-[300px] flex-col p-5 ${tone.card}`}>
                    <span className={`grid h-11 w-11 place-items-center rounded-xl ${tone.tile}`}><Icon className="h-5 w-5" /></span>
                    <div className="mt-[90px]">
                      <p className="font-bold leading-snug">{h}</p>
                      <p className="mt-[22px] text-sm opacity-80">{b}</p>
                    </div>
                    <div className="absolute right-5 top-5 flex gap-1.5">
                      <span className="rounded-full border border-current/30 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide opacity-80">{tag}</span>
                      <span className="rounded-full border border-current/30 px-2.5 py-0.5 text-[11px] font-semibold opacity-60">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex gap-1.5">
            {[d.forPartners, d.forMembers].map((label, gi) => (
              <button key={label} type="button" onClick={() => setGroup(gi)} aria-label={label} aria-current={group === gi}
                className={`h-1.5 rounded-full transition-all duration-300 ${group === gi ? "w-8 bg-leaf-7" : "w-3 bg-forest-deep/20 hover:bg-forest-deep/40"}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <h2 className="section-heading text-3xl text-primary md:text-4xl">{lang === "en" ? <>A growing<br />continental network</> : d.glanceTitle}</h2>
            <div className="section-content overflow-hidden">
              <div
                className={`flex gap-3 [--per:2] sm:[--per:4] ${animate ? "transition-transform duration-[1400ms] ease-in-out" : ""}`}
                style={{ transform: `translateX(calc(-${offset} * (100% + 0.75rem) / var(--per)))` }}
                onTransitionEnd={() => {
                  if (offset >= d.glance.length) { setAnimate(false); setOffset(0); }
                }}
              >
                {[...d.glance, ...d.glance.slice(0, 4)].map(([n, l], i) => (
                  <div
                    key={i}
                    className="stat-notch flex min-h-[300px] shrink-0 basis-[calc((100%-(var(--per)-1)*0.75rem)/var(--per))] flex-col bg-leaf-1 p-5 text-forest-deep md:min-h-[370px]"
                  >
                    <p className="text-xs font-semibold uppercase leading-snug tracking-wide">{d.glanceNames[i % d.glance.length] ?? l}</p>
                    <p className="mt-1 text-xs uppercase leading-snug opacity-70">{l}</p>
                    <p className="mt-auto text-6xl font-medium tracking-tight md:text-7xl lg:text-8xl">{n}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex gap-1.5">
              {d.glance.map(([, l], i) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => { setAnimate(true); setOffset(i); }}
                  aria-label={d.glanceNames[i] ?? l}
                  aria-current={offset % d.glance.length === i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${offset % d.glance.length === i ? "w-8 bg-leaf-7" : "w-3 bg-forest-deep/20 hover:bg-forest-deep/40"}`}
                />
              ))}
            </div>
        </div>
      </section>

      <section className="bg-clay py-16">
        <div className="mx-auto max-w-7xl px-5">
          <p className="eyebrow text-center text-forest-deep">{d.approachesEyebrow}</p>
          <h2 className="section-heading approach-heading mx-auto mt-3 text-center text-cream">{d.approachesTitle}</h2>
          <div className="section-content approach-grid mx-auto w-full">
            {d.approaches.map(([code, name, short]) => {
              const full = short || (name ?? "").split(" (")[0]!;
              return (
                <Link
                  key={code}
                  to="/$lang/$"
                  params={{ lang, _splat: `training/${(code ?? "").toLowerCase()}` }}
                  className="group relative flex h-16 w-full items-center overflow-hidden rounded-full border border-cream px-5 text-forest-deep transition-colors duration-300 hover:text-cream focus-visible:text-cream md:h-20"
                >
                  <span className="approach-fill" />
                  <span className="approach-sweep" />
                  <span className="relative z-10 max-w-12 shrink-0 overflow-hidden whitespace-nowrap text-base font-extrabold tracking-tight transition-all duration-300 ease-in-out md:text-lg lg:text-xl group-hover:max-w-0 group-hover:opacity-0 group-focus-visible:max-w-0 group-focus-visible:opacity-0">
                    {code}
                  </span>
                  <span className="approach-name relative z-10 mr-5 min-w-0 max-w-0 overflow-hidden whitespace-nowrap font-semibold leading-tight opacity-0 transition-all duration-500 ease-in-out group-hover:max-w-[26rem] group-hover:opacity-100 group-focus-visible:max-w-[26rem] group-focus-visible:opacity-100">
                    {full}
                  </span>
                  <span className="relative z-10 ml-auto flex h-9 shrink-0 items-center justify-end text-cream md:h-11">
                    <svg viewBox="0 0 72 24" className="h-5 w-12 lg:h-6 lg:w-14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="round" aria-hidden="true">
                      <line x1="2" y1="12" x2="46" y2="12" strokeDasharray="6 5" className="approach-dash" />
                      <line x1="46" y1="12" x2="68" y2="12" />
                      <polyline points="58,3 68,12 58,21" strokeLinecap="round" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div>
            <p className="eyebrow text-forest-deep">{d.whereEyebrow}</p>
            <h2 className="section-heading mt-3 text-3xl text-primary md:text-4xl">{d.whereTitle}</h2>
          </div>
          <div className="section-content">
            <p className="text-muted-foreground">{d.whereBody}</p>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-forest-deep/20 bg-forest-deep/12 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-16 text-forest-foreground">
        <img src={coop} alt="" loading="lazy" width={1280} height={960} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-black/85" />
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <p className="eyebrow text-sun">{d.ambitionEyebrow}</p>
          <h2 className="section-heading mt-3 text-3xl md:text-4xl">{d.ambitionTitle}</h2>
          <div className="section-content grid grid-cols-2 gap-8 md:grid-cols-6">
            {d.ambition.map(([n, l]) => (<div key={l}><p className="text-4xl font-extrabold text-sun">{n}</p><p className="mt-2 text-sm opacity-90">{l}</p></div>))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <p className="eyebrow text-forest-deep">{d.newsEyebrow}</p>
        <h2 className="section-heading mt-3 text-3xl text-primary md:text-4xl">{d.newsTitle}</h2>
        <div className="section-content grid gap-6 md:grid-cols-3">
          {d.news.map(([cat, date, title, body], i) => (
            <article key={title} className="overflow-hidden rounded-xl bg-card shadow-sm">
              <img src={newsImgs[i]} alt="" loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full object-cover" />
              <div className="p-5"><p className="eyebrow text-forest-deep">{cat} · {date}</p><h3 className="mt-2 text-lg">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <p className="eyebrow text-center text-forest-deep">{d.partnersEyebrow}</p>
          <ul className="section-content grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
            {d.partners.map((p) => (<li key={p} className="grid h-20 place-items-center rounded-lg bg-muted px-2 text-center text-sm font-semibold text-muted-foreground">{p}</li>))}
          </ul>
        </div>
      </section>

      <section className="bg-sunrise py-16">
        <div className="mx-auto max-w-3xl px-4 text-center text-foreground">
          <h2 className="section-heading mx-auto text-3xl md:text-4xl">{d.nlTitle}</h2>
          <div className="section-content">
          <p>{d.nlBody}</p>
          <div className="mx-auto mt-4 max-w-lg"><NewsletterForm lang={lang} /></div>
          </div>
        </div>
      </section>
    </>
  );
}
