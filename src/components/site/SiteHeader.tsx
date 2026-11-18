import { Link, useParams } from "@tanstack/react-router";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logoEn from "@/assets/iapa-logo.jpg.asset.json";
import logoFr from "@/assets/iapa-logo-fr.png.asset.json";
import trainingImg from "@/assets/training-tree.jpg";
import { NAV } from "@/lib/nav";
import { t, type Lang } from "@/lib/i18n";

function LangSwitch({ lang }: { lang: Lang }) {
  const params = useParams({ strict: false }) as { _splat?: string };
  const splat = params._splat;
  return (
    <div className="flex items-center rounded-full border border-border text-sm font-semibold" aria-label="Language">
      {(["en", "fr"] as const).map((l) =>
        splat ? (
          <Link key={l} to="/$lang/$" params={{ lang: l, _splat: splat }} hrefLang={l}
            className={`rounded-full px-3 py-1 ${l === lang ? "bg-primary text-primary-foreground" : "text-foreground hover:text-primary"}`}
            aria-current={l === lang ? "true" : undefined}>{l.toUpperCase()}</Link>
        ) : (
          <Link key={l} to="/$lang" params={{ lang: l }} hrefLang={l}
            className={`rounded-full px-3 py-1 ${l === lang ? "bg-primary text-primary-foreground" : "text-foreground hover:text-primary"}`}
            aria-current={l === lang ? "true" : undefined}>{l.toUpperCase()}</Link>
        ),
      )}
    </div>
  );
}

export function SiteHeader({ lang }: { lang: Lang }) {
  const d = t(lang);
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const [compact, setCompact] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(null), setMobile(false));
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);

  const enter = (i: number) => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(i); };
  const leave = () => { closeTimer.current = setTimeout(() => setOpen(null), 150); };
  const logo = lang === "fr" ? logoFr : logoEn;

  return (
    <header className={`sticky top-0 z-50 border-b border-border bg-card transition-shadow ${compact ? "shadow-md" : ""}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">{d.skip}</a>
      <div className={`mx-auto flex max-w-7xl items-center gap-6 px-4 transition-all lg:px-6 ${compact ? "h-16" : "h-24"}`}>
        <Link to="/$lang" params={{ lang }} className="shrink-0" onClick={() => setOpen(null)}>
          <img src={logo.url} alt="IAPA — International Agribusiness Practitioners Association" width={1270} height={354}
            className={`w-auto transition-all ${compact ? "h-9" : "h-12"}`} />
        </Link>

        <nav className="hidden flex-1 justify-center lg:flex" aria-label="Main">
          <ul className="flex items-stretch">
            {NAV.map((g, i) => (
              <li key={g.slug} onMouseEnter={() => enter(i)} onMouseLeave={leave}>
                <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}
                  className={`flex items-center gap-1 px-3 py-2 text-[0.95rem] font-semibold transition-colors ${open === i ? "text-primary" : "text-foreground hover:text-primary"}`}>
                  {g.label[lang]}
                  <ChevronDown className={`h-4 w-4 transition-transform ${open === i ? "rotate-180" : ""}`} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <LangSwitch lang={lang} />
          <Link to="/$lang/$" params={{ lang, _splat: "work-with-us" }}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition hover:brightness-105">
            {d.workWithUs}
          </Link>
        </div>

        <button type="button" className="ml-auto rounded-md p-2 lg:hidden" aria-label={d.menu} aria-expanded={mobile} onClick={() => setMobile(true)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open !== null && (
        <div className="absolute inset-x-0 top-full hidden border-t border-border bg-card shadow-xl lg:block"
          onMouseEnter={() => enter(open)} onMouseLeave={leave}>
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 py-10">
            <div className="col-span-3 border-r border-border pr-8">
              <p className="eyebrow text-savanna">{NAV[open].label[lang]}</p>
              <p className="mt-3 text-lg font-semibold leading-snug text-foreground">{NAV[open].blurb[lang]}</p>
              <Link to="/$lang/$" params={{ lang, _splat: NAV[open].slug }} onClick={() => setOpen(null)}
                className="mt-5 inline-flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all">
                {d.learnMore} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="col-span-6 grid grid-cols-2 gap-8">
              {NAV[open].columns.map((c) => (
                <div key={c.title.en}>
                  <p className="eyebrow mb-3 text-muted-foreground">{c.title[lang]}</p>
                  <ul className="space-y-1">
                    {c.links.map((ln) => (
                      <li key={ln.label.en}>
                        <Link to="/$lang/$" params={{ lang, _splat: ln.slug }} onClick={() => setOpen(null)}
                          className="block rounded-md px-2 py-1.5 -mx-2 font-medium text-foreground hover:bg-secondary hover:text-primary">
                          {ln.label[lang]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="col-span-3 overflow-hidden rounded-xl">
              <img src={trainingImg} alt="" loading="lazy" width={1280} height={960} className="h-full max-h-56 w-full object-cover" />
            </div>
          </div>
        </div>
      )}

      {mobile && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={d.menu}>
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setMobile(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-card p-5 animate-in slide-in-from-right">
            <div className="flex items-center justify-between">
              <LangSwitch lang={lang} />
              <button type="button" aria-label={d.close} className="rounded-md p-2" onClick={() => setMobile(false)}><X className="h-6 w-6" /></button>
            </div>
            <ul className="mt-6 divide-y divide-border">
              {NAV.map((g) => (
                <li key={g.slug}>
                  <details className="group py-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
                      {g.label[lang]} <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="mt-2 space-y-1 pl-2">
                      {g.columns.flatMap((c) => c.links).map((ln) => (
                        <li key={ln.label.en}>
                          <Link to="/$lang/$" params={{ lang, _splat: ln.slug }} onClick={() => setMobile(false)}
                            className="block py-1.5 text-muted-foreground hover:text-primary">{ln.label[lang]}</Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
            <Link to="/$lang/$" params={{ lang, _splat: "work-with-us" }} onClick={() => setMobile(false)}
              className="mt-6 rounded-full bg-accent px-5 py-3 text-center font-bold text-accent-foreground">{d.workWithUs}</Link>
          </div>
        </div>
      )}
    </header>
  );
}
