import { useState } from "react";
import { t, type Lang } from "@/lib/i18n";

export function NewsletterForm({ lang, tone = "light" }: { lang: Lang; tone?: "light" | "dark" }) {
  const d = t(lang);
  const [done, setDone] = useState(false);
  if (done) return <p role="status" className="mt-3 text-sm font-semibold">{d.nlSoon}</p>;
  return (
    <form className="mt-3 flex flex-col gap-2 sm:flex-row" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
      <label className="sr-only" htmlFor={`nl-${tone}`}>{d.nlPlaceholder}</label>
      <input id={`nl-${tone}`} type="email" required placeholder={d.nlPlaceholder}
        className={`min-w-0 flex-1 rounded-full border px-5 py-3 text-sm text-foreground ${tone === "dark" ? "border-transparent bg-card" : "border-border bg-card"}`} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground hover:brightness-105">{d.nlCta}</button>
    </form>
  );
}
