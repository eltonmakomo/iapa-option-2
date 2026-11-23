import { useMemo } from "react";
import geography from "@/lib/impact-geography.json";

// The impact geography is an equirectangular Africa map (850x650):
// lon -18..51, lat 35..-35. Reproject those dots onto a globe facing Africa.
const LON_MIN = -18;
const LON_MAX = 51;
const LAT_MAX = 35;
const LAT_MIN = -35;
const CENTER_LON = 18;
const R = 96;

function project(lon: number, lat: number): [number, number, number] {
  const la = (lat * Math.PI) / 180;
  const lo = ((lon - CENTER_LON) * Math.PI) / 180;
  return [Math.cos(la) * Math.sin(lo), -Math.sin(la), Math.cos(la) * Math.cos(lo)];
}

function toPath(pts: [number, number][]): string {
  return pts.map(([x, y]) => `M${(100 + x * R).toFixed(1)},${(100 + y * R).toFixed(1)}h.1`).join("");
}

export function GlobeDots({ className }: { className?: string }) {
  const { land, pins } = useMemo(() => {
    const landPts: [number, number][] = [];
    for (const c of geography as { dots: number[][] }[]) {
      // The source dots are far denser than the globe scale; thin them so Africa reads as dots.
      for (let i = 0; i < c.dots.length; i += 2) {
        const [px = 0, py = 0] = c.dots[i] ?? [];
        const lon = LON_MIN + (px / 850) * (LON_MAX - LON_MIN);
        const lat = LAT_MAX + (py / 650) * (LAT_MIN - LAT_MAX);
        const [x, y, z] = project(lon, lat);
        if (z > 0.02) landPts.push([x, y]);
      }
    }
    // Glowing hubs at the centre of a few countries' own dots, so they always sit on land.
    const hubIds = ["GHA", "KEN", "ZAF", "SEN", "CMR", "ETH", "BFA"];
    const pinPts: [number, number][] = [];
    for (const c of geography as { id: string; dots: number[][] }[]) {
      if (!hubIds.includes(c.id) || !c.dots.length) continue;
      let sx = 0, sy = 0;
      for (const [px = 0, py = 0] of c.dots) { sx += px; sy += py; }
      const lon = LON_MIN + (sx / c.dots.length / 850) * (LON_MAX - LON_MIN);
      const lat = LAT_MAX + (sy / c.dots.length / 650) * (LAT_MIN - LAT_MAX);
      const [x, y] = project(lon, lat);
      pinPts.push([100 + x * R, 100 + y * R]);
    }
    return { land: toPath(landPts), pins: pinPts };
  }, []);
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="globe-shade" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="var(--color-rainforest)" stopOpacity="0.18" />
          <stop offset="60%" stopColor="var(--color-night)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-night)" stopOpacity="1" />
        </radialGradient>
        <linearGradient id="globe-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-rainforest)" stopOpacity="0" />
          <stop offset="30%" stopColor="var(--color-rainforest)" />
          <stop offset="55%" stopColor="var(--color-savanna-green)" />
          <stop offset="75%" stopColor="var(--color-semiarid-yellow)" />
          <stop offset="100%" stopColor="var(--color-arid-orange)" stopOpacity="0" />
        </linearGradient>
        <filter id="globe-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>
      <circle cx="100" cy="100" r={R} fill="url(#globe-shade)" />
      <circle cx="100" cy="100" r={R} className="globe-sphere" />
      <circle cx="100" cy="100" r={R} fill="none" stroke="url(#globe-rim)" strokeWidth="2.2" filter="url(#globe-glow)" />
      <circle cx="100" cy="100" r={R} fill="none" stroke="url(#globe-rim)" strokeWidth="0.8" />
      <path d={land} className="globe-dots-land" />
      {pins.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3.2" className="globe-pin-glow" />
          <circle cx={x} cy={y} r="1.3" className="globe-pin" />
        </g>
      ))}
    </svg>
  );
}
