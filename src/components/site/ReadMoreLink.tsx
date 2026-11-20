import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Lang } from "@/lib/i18n";

export function ReadMoreLink({ lang, to, children, className = "", onClick }: { lang: Lang; to: string; children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <Link
      to="/$lang/$"
      params={{ lang, _splat: to }}
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 rounded-full border border-forest-deep/15 bg-leaf-1 py-1.5 pl-1.5 pr-5 font-semibold text-forest-deep transition-colors duration-300 hover:border-forest-deep/25 ${className}`}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-forest-deep transition-colors duration-300 group-hover:bg-primary group-hover:text-cream">
        <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
      </span>
      {children}
    </Link>
  );
}
