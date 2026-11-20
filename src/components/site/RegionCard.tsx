import { useId } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { REGION_MAPS } from "@/lib/region-maps";
import type { Lang } from "@/lib/i18n";

type RegionCardProps = { lang: Lang; title: string; countries: string; index: number };

export function RegionCard({ lang, title, countries, index }: RegionCardProps) {
  const patternId = `region-lines-${useId().replace(/:/g, "")}`;
  const map = REGION_MAPS[index];
  if (!map) return null;

  return (
    <Link to="/$lang/$" params={{ lang, _splat: "who-we-are/where-we-work" }}
      className="region-card group relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-forest-deep/25 bg-card text-ink transition-colors duration-300 hover:border-primary focus-visible:border-primary">
      <svg viewBox="0 0 280 300" preserveAspectRatio="xMidYMid slice" className="region-map absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <defs>
          <pattern id={patternId} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <path d="M0 0V7" className="region-hatch" />
          </pattern>
        </defs>
        {map.countries.map((country) => (
          <g key={country.id}>
            <path d={country.path} className={country.active ? "region-country-active" : "region-country"} />
            {country.active && <path d={country.path} fill={`url(#${patternId})`} />}
          </g>
        ))}
        {map.markers.map((marker, i) => (
          <g key={i}>
            <circle cx={marker.x} cy={marker.y} r="6" className="region-island" />
            <circle cx={marker.x + 8} cy={marker.y - 7} r="2" className="region-island" />
          </g>
        ))}
      </svg>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-card via-card/70 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-card via-card/80 to-transparent" aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <h3 className="text-lg leading-snug">{title}</h3>
        <div>
          <p className="min-h-[4.75rem] text-sm leading-relaxed text-ink/80">{countries}</p>
          <span className="mt-5 flex items-center justify-between border-t border-ink/15 pt-4">
            <span className="text-xs font-semibold text-clay-deep">{lang === "fr" ? "Explorer" : "Explore"}</span>
            <ArrowUpRight className="h-5 w-5 text-clay-deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
