import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Calendar, FileText, Linkedin, MapPin } from "lucide-react";
import { getContent, type ContentTable, type Row } from "@/lib/content.functions";
import type { Block, BlockKind } from "@/lib/pages";
import type { Lang } from "@/lib/i18n";
import { PlaceholderImage } from "./PlaceholderImage";
import { Link } from "@tanstack/react-router";

const TABLE: Record<BlockKind, ContentTable> = {
  team: "team_members",
  testimonials: "testimonials",
  resources: "resources",
  events: "events",
  news: "news_posts",
  press: "news_posts",
  vacancies: "vacancies",
  scholarships: "scholarships",
  faqs: "faqs",
};

export const blockQuery = (b: Block) => {
  const table = TABLE[b.kind];
  const filter = b.filter && b.kind === "news" && b.filter[0] === "approach" ? undefined : b.filter;
  return queryOptions({
    queryKey: ["content", table, filter ?? null],
    queryFn: () => getContent({ data: filter ? { table, filter } : { table } }),
  });
};

const s = (r: Row, k: string) => String(r[k] ?? "");
const loc = (r: Row, k: string, lang: Lang) => s(r, `${k}_${lang}`);
/** Bracketed placeholder text reads in italics. */
const Tagged = ({ text }: { text: string }) => (
  <>
    {text.split(/(\[[^\]]+\])/g).map((p, i) =>
      p.startsWith("[") ? (
        <em key={i} className="text-muted-foreground">
          {p}
        </em>
      ) : (
        p
      ),
    )}
  </>
);

export function DynamicBlock({ block, lang }: { block: Block; lang: Lang }) {
  const { data } = useSuspenseQuery(blockQuery(block));
  let rows = data;
  if (block.kind === "news" && block.filter?.[0] === "approach")
    rows = rows.filter((r) => s(r, "kind") === "news" && s(r, "approach") === block.filter![1]);
  if (block.kind === "news" && !block.filter) rows = rows.filter((r) => s(r, "kind") === "news");
  if (
    rows.length === 0 &&
    !block.empty &&
    block.kind === "news" &&
    block.filter?.[0] === "approach"
  )
    return null;

  return (
    <section>
      {block.h && (
        <h2 className="section-heading text-3xl text-primary md:text-4xl">{block.h[lang]}</h2>
      )}
      <div className={block.h ? "section-content" : ""}>
        {rows.length === 0 ? (
          <div className="rounded-2xl bg-secondary p-8 text-lg text-muted-foreground">
            <p>{block.empty?.[lang] ?? "—"}</p>
            {(block.kind === "vacancies" || block.kind === "scholarships") && (
              <Link
                to="/$lang/contact"
                params={{ lang }}
                className="mt-4 inline-block font-semibold text-primary underline"
              >
                {lang === "fr" ? "Contactez-nous" : "Contact us"}
              </Link>
            )}
          </div>
        ) : (
          <Rows kind={block.kind} rows={rows} lang={lang} />
        )}
      </div>
      {block.kind === "faqs" && (
        <p className="mt-6 text-sm">
          <Link
            to="/$lang/contact"
            params={{ lang }}
            className="font-semibold text-primary underline"
          >
            {lang === "fr"
              ? "Une autre question ? Contactez-nous."
              : "Still have a question? Get in touch."}
          </Link>
        </p>
      )}
    </section>
  );
}

function Rows({ kind, rows, lang }: { kind: BlockKind; rows: Row[]; lang: Lang }) {
  if (kind === "team")
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
        {rows.map((r) => (
          <article key={r.id} className="min-w-0">
            {s(r, "photo_url") ? (
              <img
                src={s(r, "photo_url")}
                alt={s(r, "name")}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
              />
            ) : (
              <PlaceholderImage
                caption={lang === "fr" ? "[Portrait à venir]" : "[Portrait to come]"}
                className="aspect-[3/2] w-full"
              />
            )}
            <div className="mt-2">
              <h3 className="text-sm font-bold leading-snug tracking-normal text-ink">
                <Tagged text={s(r, "name")} />
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-ink">{loc(r, "role", lang)}</p>
            </div>
            <a
              href={s(r, "linkedin")}
              aria-label="LinkedIn"
              className="mt-3 inline-flex text-ink/70 hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    );
  if (kind === "testimonials")
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {rows.map((r) => (
          <figure key={r.id} className="rounded-2xl bg-card p-6 shadow-sm">
            <blockquote className="text-lg italic text-foreground">
              “{loc(r, "quote", lang)}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <PlaceholderImage round className="h-12 w-12 shrink-0" />
              <span className="text-sm">
                <em className="font-semibold not-italic text-foreground">
                  <Tagged text={s(r, "name")} />
                </em>
                <br />
                <span className="text-muted-foreground">
                  <Tagged text={loc(r, "role", lang)} />
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    );
  if (kind === "resources")
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((r) => {
          const url = s(r, "url");
          const body = (
            <>
              <PlaceholderImage
                caption={lang === "fr" ? "Couverture" : "Cover"}
                className="aspect-[4/3] w-full"
              />
              <div className="p-5">
                <p className="eyebrow text-clay-deep">{loc(r, "type", lang)}</p>
                <h3 className="mt-2 text-lg text-foreground">{loc(r, "title", lang)}</h3>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" />
                  {url
                    ? lang === "fr"
                      ? "Télécharger"
                      : "Download"
                    : lang === "fr"
                      ? "[Fichier à venir]"
                      : "[File to come]"}
                </p>
              </div>
            </>
          );
          return url ? (
            <a
              key={r.id}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="overflow-hidden border border-border bg-card"
            >
              {body}
            </a>
          ) : (
            <div key={r.id} className="overflow-hidden border border-border bg-card">
              {body}
            </div>
          );
        })}
      </div>
    );
  if (kind === "events")
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border bg-card p-6">
            <p className="eyebrow text-clay-deep">
              {s(r, "status") === "upcoming"
                ? lang === "fr"
                  ? "À venir"
                  : "Upcoming"
                : s(r, "status")}
            </p>
            <h3 className="mt-2 text-xl text-foreground">{loc(r, "title", lang)}</h3>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <Tagged text={s(r, "date_label")} />
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <Tagged text={s(r, "location")} />
            </p>
          </div>
        ))}
      </div>
    );
  if (kind === "news" || kind === "press")
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rows.map((r) => (
          <article key={r.id} className="overflow-hidden bg-night text-cream">
            <div className="relative">
              {s(r, "image_url") ? (
                <img
                  src={s(r, "image_url")}
                  alt={loc(r, "title", lang)}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              ) : (
                <PlaceholderImage
                  caption={s(r, "image_caption")}
                  className="aspect-[16/10] w-full bg-savanna/30 text-cream/80"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/15 to-night/25 p-4">
                <p className="eyebrow text-cream">
                  <Tagged
                    text={[s(r, "date_label"), s(r, "country"), s(r, "approach")]
                      .filter(Boolean)
                      .join(" · ")}
                  />
                </p>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg leading-snug">{loc(r, "title", lang)}</h3>
              <div className="mt-4 space-y-3 text-sm text-cream/70">
                {loc(r, "body", lang)
                  .split("\n\n")
                  .map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  if (kind === "faqs")
    return (
      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        {rows.map((r) => (
          <details key={r.id} className="group p-5">
            <summary className="cursor-pointer list-none font-semibold text-foreground">
              {loc(r, "question", lang)}
            </summary>
            <p className="mt-3 text-muted-foreground">
              <Tagged text={loc(r, "answer", lang)} />
            </p>
          </details>
        ))}
      </div>
    );
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {rows.map((r) => (
        <div key={r.id} className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg text-foreground">{loc(r, "title", lang)}</h3>
          <p className="mt-2 text-muted-foreground">{loc(r, "body", lang)}</p>
        </div>
      ))}
    </div>
  );
}
