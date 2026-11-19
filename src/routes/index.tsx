import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "IAPA — Africa’s agribusiness practitioners network" },
    { name: "description", content: "Explore IAPA’s certified agribusiness expertise, training and pan-African practitioner network." },
    { property: "og:title", content: "IAPA — Africa’s agribusiness practitioners network" },
    { property: "og:description", content: "Explore IAPA’s certified agribusiness expertise, training and pan-African practitioner network." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  beforeLoad: () => { throw redirect({ to: "/$lang", params: { lang: "en" } }); },
});
