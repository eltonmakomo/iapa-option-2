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
  const { grid, land } = useMemo(() => {
    const gridPts: [number, number][] = [];
    for (let lat = -84; lat <= 84; lat += 4) {
      const step = 4 / Math.max(Math.cos((lat * Math.PI) / 180), 0.15);
      for (let lon = -180; lon < 180; lon += step) {
        const [x, y, z] = project(lon, lat);
        if (z > 0.02) gridPts.push([x, y]);
      }
    }
    const landPts: [number, number][] = [];
    for (const c of geography as { dots: number[][] }[]) {
      // The source dots are far denser than the globe scale; thin them so Africa reads as dots.
      for (let i = 0; i < c.dots.length; i += 3) {
        const [px = 0, py = 0] = c.dots[i] ?? [];
        const lon = LON_MIN + (px / 850) * (LON_MAX - LON_MIN);
        const lat = LAT_MAX + (py / 650) * (LAT_MIN - LAT_MAX);
        const [x, y, z] = project(lon, lat);
        if (z > 0.02) landPts.push([x, y]);
      }
    }
    return { grid: toPath(gridPts), land: toPath(landPts) };
  }, []);
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <circle cx="100" cy="100" r={R} className="globe-sphere" />
      <path d={grid} className="globe-dots" />
      <path d={land} className="globe-dots-land" />
    </svg>
  );
}
