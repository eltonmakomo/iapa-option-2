import logo from "@/assets/iapa-logo.jpg.asset.json";

/** Neutral branded placeholder: Savanna Green block at 15% with the IAPA mark and a caption. */
export function PlaceholderImage({ caption, className = "", round = false }: { caption?: string; className?: string; round?: boolean }) {
  return (
    <div className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden bg-savanna/15 text-ink/60 ${round ? "rounded-full" : ""} ${className}`}>
      {round ? (
        <span className="text-sm font-bold tracking-wider text-forest-deep/70">IAPA</span>
      ) : (
        <>
          <img src={logo.url} alt="" className="h-10 w-auto opacity-70 mix-blend-multiply" loading="lazy" />
          {caption && <span className="px-4 text-center text-xs italic">{caption}</span>}
        </>
      )}
    </div>
  );
}
