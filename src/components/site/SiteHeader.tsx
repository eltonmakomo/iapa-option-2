import { Link, useParams, useLocation } from "@tanstack/react-router";
import { ChevronDown, Menu, X, ArrowUpRight, Plus, Globe, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logoFull from "@/assets/iapa-logo-fullcolour.png.asset.json";
import trainingImg from "@/assets/training-tree.jpg";
import { NAV } from "@/lib/nav";
import { t, type Lang } from "@/lib/i18n";
import { ReadMoreLink } from "@/components/site/ReadMoreLink";
import { Button } from "@/components/ui/button";

function LangSwitch({ lang }: { lang: Lang }) {
  const params = useParams({ strict: false }) as { _splat?: string };
  const splat = params._splat;
  const isContact = /\/(en|fr)\/contact\/?$/.test(useLocation().pathname);
  const other: Lang = lang === "en" ? "fr" : "en";
  const label = other === "fr" ? "Français" : "English";
  const cls = "flex items-center gap-1.5 text-[0.95rem] font-bold text-foreground hover:text-primary";
  const inner = (
    <>
      <Globe className="h-4 w-4" aria-hidden />
      {label}
    </>
  );
  return isContact ? (
    <Link to="/$lang/contact" params={{ lang: other }} hrefLang={other} className={cls}>
      {inner}
    </Link>
  ) : splat ? (
    <Link to="/$lang/$" params={{ lang: other, _splat: splat }} hrefLang={other} className={cls}>
      {inner}
    </Link>
  ) : (
    <Link to="/$lang" params={{ lang: other }} hrefLang={other} className={cls}>
      {inner}
    </Link>
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
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const enter = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 lg:px-6 lg:pt-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        {d.skip}
      </a>
      <div
        className={`mx-auto flex max-w-7xl items-center gap-4 rounded-full border border-white/70 pl-4 pr-2 text-forest-deep shadow-lg backdrop-blur-xl transition-all lg:pl-6 ${compact ? "h-16 bg-white/90" : "h-20 bg-white/80"}`}
      >
        <Link to="/$lang" params={{ lang }} className="shrink-0" onClick={() => setOpen(null)}>
          <img
            src={logoFull.url}
            alt="IAPA — International Agribusiness Practitioners Association"
            width={1270}
            height={354}
            className={`w-auto transition-all ${compact ? "h-9" : "h-11"}`}
          />
        </Link>

        <nav className="ml-auto hidden xl:flex" aria-label="Main">
          <ul className="flex items-center">
            {NAV.map((g, i) => (
              <li key={g.slug} onMouseEnter={() => enter(i)} onMouseLeave={leave}>
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                  className={`flex items-center gap-1 px-3 py-2 text-[0.95rem] font-medium transition-colors ${open === i ? "text-primary" : "hover:text-primary"}`}
                >
                  {g.label[lang]}
                  <Plus
                    className={`h-4 w-4 transition-transform ${open === i ? "rotate-45" : ""}`}
                    aria-hidden
                  />
                </button>
              </li>
            ))}
            <li>
              <Button
                asChild
                variant="ghost"
                className="px-3 text-[0.95rem] font-medium hover:bg-transparent hover:text-primary"
              >
                <Link to="/$lang/contact" params={{ lang }} onClick={() => setOpen(null)}>
                  {lang === "fr" ? "Contact" : "Contact"}
                </Link>
              </Button>
            </li>
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <LangSwitch lang={lang} />
          <Link
            to="/$lang/$"
            params={{ lang, _splat: "knowledge-hub" }}
            aria-label="Search"
            className={`grid place-items-center rounded-full bg-primary text-primary-foreground transition hover:brightness-110 ${compact ? "h-12 w-12" : "h-14 w-14"}`}
          >
            <Search className="h-5 w-5" />
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto rounded-full p-2 xl:hidden"
          aria-label={d.menu}
          aria-expanded={mobile}
          onClick={() => setMobile(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open !== null && (
        <div
          className="absolute inset-x-3 top-full mt-2 hidden overflow-hidden rounded-3xl border border-border bg-card text-foreground shadow-xl xl:inset-x-6 xl:block"
          onMouseEnter={() => enter(open)}
          onMouseLeave={leave}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 py-10">
            <div className="col-span-3 border-r border-border pr-8">
              <p className="eyebrow text-savanna">{NAV[open]!.label[lang]}</p>
              <p className="mt-3 text-lg font-semibold leading-snug text-foreground">
                {NAV[open]!.blurb[lang]}
              </p>
              <ReadMoreLink
                lang={lang}
                to={NAV[open]!.slug}
                onClick={() => setOpen(null)}
                className="mt-10"
              >
                {d.learnMore}
              </ReadMoreLink>
            </div>
            <div className="col-span-6 grid grid-cols-2 gap-8">
              {NAV[open]!.columns.map((c) => (
                <div key={c.title.en}>
                  <p className="eyebrow mb-3 text-muted-foreground">{c.title[lang]}</p>
                  <ul className="space-y-1">
                    {c.links.map((ln) => (
                      <li key={ln.label.en}>
                        <Link
                          to="/$lang/$"
                          params={{ lang, _splat: ln.slug }}
                          onClick={() => setOpen(null)}
                          className="block rounded-md px-2 py-1.5 -mx-2 font-medium text-foreground hover:bg-secondary hover:text-primary"
                        >
                          {ln.label[lang]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="col-span-3 overflow-hidden rounded-xl">
              <img
                src={trainingImg}
                alt=""
                loading="lazy"
                width={1280}
                height={960}
                className="h-full max-h-56 w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {mobile && (
        <div
          className="fixed inset-0 z-50 xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={d.menu}
        >
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setMobile(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-card p-5 animate-in slide-in-from-right">
            <div className="flex items-center justify-between">
              <LangSwitch lang={lang} />
              <button
                type="button"
                aria-label={d.close}
                className="rounded-md p-2"
                onClick={() => setMobile(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="mt-6 divide-y divide-border">
              {NAV.map((g) => (
                <li key={g.slug}>
                  <details className="group py-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold">
                      {g.label[lang]}{" "}
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="mt-2 space-y-1 pl-2">
                      {g.columns
                        .flatMap((c) => c.links)
                        .map((ln) => (
                          <li key={ln.label.en}>
                            <Link
                              to="/$lang/$"
                              params={{ lang, _splat: ln.slug }}
                              onClick={() => setMobile(false)}
                              className="block py-1.5 text-muted-foreground hover:text-primary"
                            >
                              {ln.label[lang]}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </details>
                </li>
              ))}
              <li className="py-3">
                <Button asChild variant="link" className="px-0 text-lg font-semibold">
                  <Link to="/$lang/contact" params={{ lang }} onClick={() => setMobile(false)}>
                    Contact
                  </Link>
                </Button>
              </li>
            </ul>
            <Link
              to="/$lang/$"
              params={{ lang, _splat: "work-with-us" }}
              onClick={() => setMobile(false)}
              className="wwu group relative mt-6 flex items-center justify-between rounded-full border border-sun"
            >
              <span className="wwu-fill" aria-hidden="true" />
              <span className="relative z-10 px-6 py-3 font-bold text-forest-deep">
                {d.workWithUs}
              </span>
              <span className="wwu-arrow relative z-10 grid h-11 w-11 shrink-0 place-items-center">
                <ArrowUpRight className="h-[23px] w-[23px]" strokeWidth={2} />
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
