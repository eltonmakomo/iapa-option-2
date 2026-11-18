import { createFileRoute, Link } from "@tanstack/react-router";
import { t, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/$")({
  head: () => ({ meta: [{ title: "IAPA — Coming soon" }, { name: "description", content: "This section of the IAPA website is coming soon." }, { property: "og:title", content: "IAPA — Coming soon" }, { property: "og:description", content: "This section of the IAPA website is coming soon." }] }),
  component: Coming,
});

function Coming() {
  const lang = Route.useParams().lang as Lang;
  const d = t(lang);
  return (
    <section className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="text-4xl text-primary">{d.comingTitle}</h1>
      <p className="mt-4 text-muted-foreground">{d.comingBody}</p>
      <Link to="/$lang" params={{ lang }} className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground">{d.backHome}</Link>
    </section>
  );
}
