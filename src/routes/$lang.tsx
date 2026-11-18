import { createFileRoute, notFound, Outlet, useLocation } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { isLang, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => { if (!isLang(params.lang)) throw notFound(); },
  component: LangLayout,
});

function LangLayout() {
  const lang = Route.useParams().lang as Lang;
  const isHome = /^\/(en|fr)\/?$/.test(useLocation().pathname);
  return (
    <div lang={lang} className="flex min-h-screen flex-col">
      <SiteHeader lang={lang} />
      <main id="main" className={`flex-1 ${isHome ? "" : "pt-28"}`}><Outlet /></main>
      <SiteFooter lang={lang} />
    </div>
  );
}
