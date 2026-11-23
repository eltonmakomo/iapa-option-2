import { createFileRoute } from "@tanstack/react-router";
import { ContactPage, contactInfoQuery } from "@/components/site/ContactPage";
import { isLang } from "@/lib/i18n";
export const Route = createFileRoute("/$lang/contact")({
  loader: ({ context }) => context.queryClient.ensureQueryData(contactInfoQuery),
  head: ({ params, loaderData }) => {
    const fr = params.lang === "fr";
    const title = fr
      ? "Contact AIPA | Association Internationale des Professionnels Agraires"
      : "Contact IAPA | International Agribusiness Practitioners Association";
    const description = fr
      ? "Contactez l’AIPA pour vos demandes de partenariat, d’adhésion, de formation ou d’information."
      : "Contact IAPA for partnerships, membership, training or general enquiries.";
    const s = loaderData?.settings;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "International Agribusiness Practitioners Association",
            address: {
              "@type": "PostalAddress",
              streetAddress: s?.hq_address ?? "The Rombus, Plot 24, Tumu Street",
              addressLocality: "Accra",
              addressCountry: "GH",
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "General enquiries",
              email: s?.secretariat_email ?? "secretariatexecutif.iapa@gmail.com",
              telephone: s?.contact_phones.split("·")[0]?.trim() ?? "+237 67501 1100",
              availableLanguage: ["English", "French"],
            },
          }),
        },
      ],
    };
  },
  component: () => {
    const { lang } = Route.useParams();
    return <ContactPage lang={isLang(lang) ? lang : "en"} />;
  },
});
