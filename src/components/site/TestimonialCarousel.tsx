import { useRef } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import type { Row } from "@/lib/content.functions";
import type { Lang } from "@/lib/i18n";
import { PlaceholderImage } from "./PlaceholderImage";

const s = (r: Row, k: string) => String(r[k] ?? "");

export function TestimonialCarousel({ rows, lang }: { rows: Row[]; lang: Lang }) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="grid gap-10 md:grid-cols-[260px_1fr] md:gap-12">
      <div className="flex flex-col items-start">
        <Quote className="h-16 w-16 text-muted-foreground/30" fill="currentColor" strokeWidth={0} />
        <h2 className="mt-6 text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {lang === "fr"
            ? "Ce que disent nos partenaires et membres"
            : "What our partners and members are saying"}
        </h2>
        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label={lang === "fr" ? "Témoignage précédent" : "Previous testimonial"}
            className="grid h-11 w-11 place-items-center rounded-full border border-foreground/25 text-foreground transition-colors hover:bg-night hover:text-cream"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="h-px w-16 bg-foreground/25" aria-hidden="true" />
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label={lang === "fr" ? "Témoignage suivant" : "Next testimonial"}
            className="grid h-11 w-11 place-items-center rounded-full border border-foreground/25 text-foreground transition-colors hover:bg-night hover:text-cream"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:px-1 [&::-webkit-scrollbar]:hidden"
      >
        {rows.map((r) => (
          <figure
            key={r.id}
            data-card
            className="flex w-[300px] shrink-0 snap-start flex-col rounded-2xl bg-card p-7 shadow-sm md:w-[360px]"
          >
            <blockquote className="text-base leading-relaxed text-foreground">
              “{s(r, `quote_${lang}`)}”
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3 pt-8">
              <PlaceholderImage round className="h-12 w-12 shrink-0" />
              <span className="min-w-0 text-sm">
                <span className="block truncate font-bold text-foreground">{s(r, "name")}</span>
                <span className="block truncate text-muted-foreground">
                  {s(r, `role_${lang}`)}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
