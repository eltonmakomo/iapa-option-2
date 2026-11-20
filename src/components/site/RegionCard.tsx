import { useId } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { REGION_MAPS } from "@/lib/region-maps";
import { t, type Lang } from "@/lib/i18n";

type RegionCardProps = { lang: Lang; title: string; countries: string; index: number };

const cellBase =
  "region-card group relative flex min-w-0 flex-1 flex-col overflow-hidden bg-card text-ink transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary min-h-[220px] lg:min-h-[250px]";

export function RegionCard({ lang, title, countries, index }: RegionCardProps) {
  const patternId = `region-lines-${useId().replace(/:/g, "")}`;
  const map = REGION_MAPS[index];
  if (!map) return null;

  return (
    <Link to="/$lang/$" params={{ lang, _splat: "who-we-are/where-we-work" }} className={cellBase}>
      <svg viewBox="0 0 280 300" preserveAspectRatio="xMidYMid slice" className="region-map absolute inset-y-0 right-0 h-full w-[52%] sm:w-[58%]" fill="none" aria-hidden="true">
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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[72%] bg-gradient-to-r from-card via-card/92 to-transparent" aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col p-5">
        <h3 className="max-w-[62%] text-lg leading-snug sm:max-w-[52%]">{title}</h3>
        <p className="mt-2 max-w-[60%] text-sm leading-relaxed text-ink/70 sm:max-w-[50%]">{countries}</p>
        <span className="mt-auto flex items-center gap-2">
          <ArrowRight className="h-5 w-5 shrink-0 text-clay-deep transition-transform duration-300 group-hover:translate-x-1" />
          <span className="text-sm font-semibold">{t(lang).viewRegion}</span>
        </span>
      </div>
    </Link>
  );
}

export function RegionMapTile({ lang, label }: { lang: Lang; label: string }) {
  const patternId = `region-tile-hatch-${useId().replace(/:/g, "")}`;
  return (
    <Link to="/$lang/$" params={{ lang, _splat: "who-we-are/where-we-work" }} className={cellBase}>
      <svg className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <defs>
          <pattern id={patternId} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <path d="M0 0V7" className="region-hatch" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} opacity="0.18" />
      </svg>
      <div className="relative z-10 flex h-full flex-col p-5">
        <span className="mt-auto flex items-center">
          <span className="relative z-10 shrink-0">
            <ArrowRight className="h-5 w-5 text-clay-deep transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <h3 className="-ml-2.5 max-w-[80%] text-lg leading-snug">{label}</h3>
        </span>
      </div>
    </Link>
  );
}
