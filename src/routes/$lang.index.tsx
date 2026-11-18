import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, BookOpen, Briefcase, CalendarDays, Compass, GraduationCap, Megaphone, Users } from "lucide-react";
import hero from "@/assets/hero-farmer.jpg";
import coop from "@/assets/cooperative.jpg";
import proc from "@/assets/processor.jpg";
import train from "@/assets/training-tree.jpg";
import { t, type Lang } from "@/lib/i18n";
import { NewsletterForm } from "@/components/site/NewsletterForm";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    const fr = params.lang === "fr";
    const title = fr ? "AIPA — Formation et conseil certifiés en agribusiness en Afrique" : "IAPA — Certified agribusiness training and advisory in Africa";
    const desc = fr ? "Réseau panafricain de Master Trainers et d'experts des chaînes de valeur agricoles dans plus de 20 pays." : "Pan-African network of Master Trainers and agricultural value chain experts across 20+ countries.";
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: Home,
});

const regionColors = ["bg-primary", "bg-savanna", "bg-accent", "bg-sun", "bg-forest-deep"];

const whatIcons = [Compass, BookOpen, GraduationCap, CalendarDays, Award, Users, Megaphone, Briefcase];

const whatTones = [
  { card: "bg-card text-foreground", tile: "bg-primary/10 text-primary" },
  { card: "bg-sunrise text-foreground", tile: "bg-primary/10 text-primary" },
  { card: "bg-savanna/50 text-foreground", tile: "bg-primary/10 text-primary" },
  { card: "bg-savanna text-foreground", tile: "bg-primary/10 text-primary" },
  { card: "bg-accent text-accent-foreground", tile: "bg-primary-foreground/20 text-current" },
  { card: "bg-primary text-primary-foreground", tile: "bg-primary-foreground/15 text-current" },
  { card: "bg-forest text-forest-foreground", tile: "bg-primary-foreground/15 text-current" },
  { card: "bg-forest-deep text-forest-foreground", tile: "bg-primary-foreground/15 text-current" },
];

function Home() {
  const lang = Route.useParams().lang as Lang;
  const d = t(lang);
  const newsImgs = [coop, train, proc];
  return (
    <>
      <section className="relative isolate min-h-[620px] overflow-hidden">
        <img src={hero} alt="" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 photo-scrim" />
        <div className="mx-auto flex min-h-[620px] max-w-7xl flex-col justify-center px-4 py-20 text-forest-foreground lg:px-6">
          <h1 className="max-w-none text-4xl md:text-[2.75rem] lg:text-[3.25rem] xl:text-6xl">{d.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg font-light opacity-95">{d.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/$lang/$" params={{ lang, _splat: "work-with-us" }} className="rounded-full bg-accent px-7 py-3.5 font-bold text-accent-foreground">{d.workWithUs}</Link>
            <Link to="/$lang/$" params={{ lang, _splat: "join" }} className="rounded-full border-2 border-forest-foreground px-7 py-3 font-bold hover:bg-forest-foreground hover:text-forest">{d.becomeMember}</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-2 lg:px-6">
        <div>
          <p className="eyebrow text-savanna">{d.aboutEyebrow}</p>
          <h2 className="mt-3 text-3xl text-primary md:text-4xl">{d.aboutTitle}</h2>
        </div>
        <div>
          <p className="text-muted-foreground">{d.aboutBody}</p>
          <Link to="/$lang/$" params={{ lang, _splat: "who-we-are" }} className="mt-5 inline-flex items-center gap-2 font-bold text-primary">{d.learnMore} <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <p className="eyebrow text-savanna">{d.whatEyebrow}</p>
          <h2 className="mt-3 text-3xl text-primary md:text-4xl">{d.whatTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...d.partnerItems.map((item) => [d.forPartners, item] as const), ...d.memberItems.map((item) => [d.forMembers, item] as const)].map(([tag, [h, b]], i) => {
              const Icon = whatIcons[i]!;
              const tone = whatTones[i]!;
              return (
                <div key={h} className={`flex min-h-[300px] flex-col rounded-2xl p-5 ${tone.card}`}>
                  <span className={`grid h-11 w-11 place-items-center rounded-xl ${tone.tile}`}><Icon className="h-5 w-5" /></span>
                  <p className="mt-4 font-bold leading-snug">{h}</p>
                  <div className="mt-2 flex gap-1.5">
                    <span className="rounded-full border border-current/30 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide opacity-80">{tag}</span>
                    <span className="rounded-full border border-current/30 px-2.5 py-0.5 text-[11px] font-semibold opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-3 text-sm opacity-80">{b}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-sm italic text-muted-foreground">{d.inclusionNote}</p>
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <p className="eyebrow text-sun">{d.glanceEyebrow}</p>
          <h2 className="mt-3 text-3xl md:text-4xl">{d.glanceTitle}</h2>
          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-5">
            {d.glance.map(([n, l]) => (<div key={l}><p className="text-5xl font-extrabold text-sun">{n}</p><p className="mt-2 text-sm opacity-90">{l}</p></div>))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-6">
        <p className="eyebrow text-savanna">{d.approachesEyebrow}</p>
        <h2 className="mt-3 text-3xl text-primary md:text-4xl">{d.approachesTitle}</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {d.approaches.map(([code, name]) => (
            <Link key={code} to="/$lang/$" params={{ lang, _splat: `training/${(code ?? "").toLowerCase()}` }} className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 hover:border-primary">
              <span className="icon-tile grid h-14 w-14 shrink-0 place-items-center bg-sunrise font-extrabold text-foreground">{code}</span>
              <span className="font-semibold group-hover:text-primary">{name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:px-6">
          <div>
            <p className="eyebrow text-savanna">{d.whereEyebrow}</p>
            <h2 className="mt-3 text-3xl text-primary md:text-4xl">{d.whereTitle}</h2>
            <p className="mt-4 text-muted-foreground">{d.whereBody}</p>
            <Link to="/$lang/$" params={{ lang, _splat: "who-we-are/where-we-work" }} className="mt-5 inline-flex items-center gap-2 font-bold text-primary">{d.seeMap} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <ul className="space-y-3">
            {d.regions.map(([r, c], i) => (
              <li key={r} className="flex gap-4 rounded-xl bg-card p-4"><span className={`mt-1 h-4 w-4 shrink-0 rounded ${regionColors[i]}`} /><div><p className="font-bold">{r}</p><p className="text-sm text-muted-foreground">{c}</p></div></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-24 text-forest-foreground">
        <img src={coop} alt="" loading="lazy" width={1280} height={960} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-forest-deep/85" />
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <p className="eyebrow text-sun">{d.ambitionEyebrow}</p>
          <h2 className="mt-3 max-w-3xl text-3xl md:text-4xl">{d.ambitionTitle}</h2>
          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-6">
            {d.ambition.map(([n, l]) => (<div key={l}><p className="text-4xl font-extrabold text-sun">{n}</p><p className="mt-2 text-sm opacity-90">{l}</p></div>))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-6">
        <p className="eyebrow text-savanna">{d.newsEyebrow}</p>
        <h2 className="mt-3 text-3xl text-primary md:text-4xl">{d.newsTitle}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {d.news.map(([cat, date, title, body], i) => (
            <article key={title} className="overflow-hidden rounded-xl bg-card shadow-sm">
              <img src={newsImgs[i]} alt="" loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full object-cover" />
              <div className="p-5"><p className="eyebrow text-accent">{cat} · {date}</p><h3 className="mt-2 text-lg">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <p className="eyebrow text-center text-muted-foreground">{d.partnersEyebrow}</p>
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
            {d.partners.map((p) => (<li key={p} className="grid h-20 place-items-center rounded-lg bg-muted px-2 text-center text-sm font-semibold text-muted-foreground">{p}</li>))}
          </ul>
        </div>
      </section>

      <section className="bg-sunrise py-16">
        <div className="mx-auto max-w-3xl px-4 text-center text-foreground">
          <h2 className="text-3xl">{d.nlTitle}</h2>
          <p className="mt-3">{d.nlBody}</p>
          <div className="mx-auto mt-4 max-w-lg"><NewsletterForm lang={lang} /></div>
        </div>
      </section>
    </>
  );
}
