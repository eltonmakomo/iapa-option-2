import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import {
  ArrowUpRight,
  Copy,
  Mail,
  MapPin,
  Phone,
  Briefcase,
  Users,
  MessageSquare,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, AFRICAN_COUNTRIES, SUBJECTS, countryLabel } from "@/lib/contact-schema";
import { getContactInfo, submitContact } from "@/lib/contact.functions";
import { IMPACT_REGIONS } from "@/lib/impact-data";
import type { Lang } from "@/lib/i18n";
export const contactInfoQuery = queryOptions({
  queryKey: ["contact-info"],
  queryFn: () => getContactInfo(),
});
export function ContactPage({ lang }: { lang: Lang }) {
  const fr = lang === "fr";
  const l = (en: string, frText: string) => (fr ? frText : en);
  const {
    data: { settings, contacts },
  } = useSuspenseQuery(contactInfoQuery);
  const send = useServerFn(submitContact);
  const [subject, setSubject] = useState("general");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState("");
  const [map, setMap] = useState(false);
  const [copied, setCopied] = useState(false);
  const subjectLabels = fr
    ? [
        "Demande générale",
        "Partenariat",
        "Adhésion",
        "Médias / presse",
        "Formation et services",
        "Autre",
      ]
    : [
        "General enquiry",
        "Partnership",
        "Membership",
        "Media / press",
        "Training & services",
        "Other",
      ];
  const fieldError = (name: string) =>
    errors[name] ? (
      <p id={`${name}-error`} role="alert" className="mt-1 text-sm text-destructive">
        {errors[name]}
      </p>
    ) : null;
  const input = (name: string, label: string, type = "text", required = false, maxLength = 100) => (
    <label className="block text-sm font-semibold">
      {label}
      {required ? " *" : ""}
      <Input
        name={name}
        type={type}
        maxLength={maxLength}
        required={required}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        className="mt-2 bg-card"
      />
      {fieldError(name)}
    </label>
  );
  const address = settings.hq_address;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const coords = settings.hq_coordinates.split(",").map(Number);
  const validCoords =
    coords.length === 2 &&
    settings.hq_coordinates.trim() !== "" &&
    Number.isFinite(coords[0]) &&
    Number.isFinite(coords[1]) &&
    Math.abs(coords[0] ?? 100) <= 90 &&
    Math.abs(coords[1] ?? 200) <= 180;
  const lat = coords[0] ?? 0,
    lon = coords[1] ?? 0;
  const osm = validCoords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.03}%2C${lat - 0.02}%2C${lon + 0.03}%2C${lat + 0.02}&layer=mapnik&marker=${lat}%2C${lon}`
    : "https://www.openstreetmap.org/export/embed.html?bbox=-0.35%2C5.48%2C-0.05%2C5.7&layer=mapnik";
  const social = [
    { Icon: Linkedin, url: settings.linkedin_url, label: "LinkedIn" },
    { Icon: Facebook, url: settings.facebook_url, label: "Facebook" },
    { Icon: Twitter, url: settings.x_url, label: "X" },
    { Icon: Youtube, url: settings.youtube_url, label: "YouTube" },
  ].filter((s) => /^https:\/\//.test(s.url));
  return (
    <article>
      <header className="relative -mt-28 overflow-hidden bg-savanna/20 pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <p className="eyebrow text-forest-deep">IAPA · {l("Contact", "Contact")}</p>
          <h1 className="mt-4 text-4xl text-forest-deep md:text-5xl">
            {l("Contact us", "Contactez-nous")}
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-light opacity-95">
            {l(
              "Whether you're a partner looking for agribusiness expertise, a practitioner interested in joining, or simply want to learn more about IAPA, we'd love to hear from you.",
              "Que vous soyez un partenaire à la recherche d’expertise en agribusiness, un praticien souhaitant nous rejoindre ou simplement curieux d’en savoir plus sur l’AIPA, nous serions ravis d’échanger avec vous.",
            )}
          </p>
        </div>
        <div
          aria-hidden
          className="absolute -bottom-8 left-0 h-16 w-full rounded-t-[50%] bg-background"
        />
      </header>
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              Icon: Briefcase,
              title: l("Work with IAPA", "Travailler avec l’AIPA"),
              body: l(
                "Training, advisory or events for your organisation.",
                "Formation, conseil ou événements pour votre organisation.",
              ),
              slug: "work-with-us",
            },
            {
              Icon: Users,
              title: l("Become a member", "Devenir membre"),
              body: l(
                "Join Africa's network of certified agribusiness practitioners.",
                "Rejoignez le réseau africain des professionnels certifiés de l’agribusiness.",
              ),
              slug: "join",
            },
            {
              Icon: MessageSquare,
              title: l("General enquiries", "Demandes générales"),
              body: l(
                "Media, partnerships or anything else.",
                "Médias, partenariats ou toute autre demande.",
              ),
              slug: "",
            },
          ].map(({ Icon, title, body, slug }) => (
            <div
              key={title}
              className="group flex flex-col rounded-2xl bg-card p-8 shadow-sm transition-colors duration-300 hover:bg-night"
            >
              <span className="icon-tile mb-16 flex h-12 w-12 items-center justify-center bg-night text-forest-foreground transition-colors duration-300 group-hover:bg-forest-foreground group-hover:text-night">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="text-lg text-foreground transition-colors duration-300 group-hover:text-forest-foreground">
                {title}
              </h2>
              <p className="mt-2 flex-1 text-muted-foreground transition-colors duration-300 group-hover:text-forest-foreground/70">
                {body}
              </p>
              <Button
                asChild
                variant="link"
                className="mt-5 self-start px-0 text-primary transition-colors duration-300 group-hover:text-sun"
              >
                {slug ? (
                  <Link to="/$lang/$" params={{ lang, _splat: slug }}>
                    {title}
                    <ArrowUpRight />
                  </Link>
                ) : (
                  <a href="#contact-form">
                    {l("Write to us", "Écrivez-nous")}
                    <ArrowUpRight />
                  </a>
                )}
              </Button>
            </div>
          ))}
        </div>
        <section className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div id="contact-form" className="scroll-mt-28">
            <h2 className="section-heading text-3xl text-primary md:text-4xl">
              {l("Send us a message", "Envoyez-nous un message")}
            </h2>
            {done ? (
              <div
                role="status"
                className="section-content border-l-4 border-primary bg-savanna/15 p-6"
              >
                <h3 className="text-xl">
                  {l("Thank you", "Merci")}, {done}.
                </h3>
                <p className="mt-3">
                  {settings.show_placeholders
                    ? l(
                        "We'll get back to you within [X] working days.",
                        "Nous vous répondrons sous [X] jours ouvrables.",
                      )
                    : l("Your message has been received.", "Votre message a bien été reçu.")}
                </p>
              </div>
            ) : (
              <form
                noValidate
                className="section-content space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const raw = Object.fromEntries(fd);
                  const parsed = contactSchema.safeParse({
                    ...raw,
                    consent: fd.get("consent") === "on",
                  });
                  if (!parsed.success) {
                    const out: Record<string, string> = {};
                    for (const issue of parsed.error.issues)
                      out[String(issue.path[0])] =
                        issue.path[0] === "message"
                          ? l(
                              "Please write at least 20 characters (maximum 5,000).",
                              "Veuillez saisir au moins 20 caractères (maximum 5 000).",
                            )
                          : issue.path[0] === "phone"
                            ? l(
                                "Include the country code, starting with +.",
                                "Ajoutez l’indicatif du pays, commençant par +.",
                              )
                            : l("Please check this field.", "Veuillez vérifier ce champ.");
                    setErrors(out);
                    return;
                  }
                  setErrors({});
                  setPending(true);
                  try {
                    await send({ data: parsed.data });
                    setDone(parsed.data.full_name.split(" ")[0] ?? parsed.data.full_name);
                  } catch {
                    setErrors({
                      submit: l(
                        "Your message could not be saved. Please try again.",
                        "Votre message n’a pas pu être enregistré. Veuillez réessayer.",
                      ),
                    });
                  } finally {
                    setPending(false);
                  }
                }}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  {input("full_name", l("Full name", "Nom complet"), "text", true)}
                  {input("email", l("Email", "E-mail"), "email", true, 255)}
                  {input(
                    "phone",
                    l("Phone (with country code)", "Téléphone (avec indicatif)"),
                    "tel",
                    false,
                    40,
                  )}
                  <label className="text-sm font-semibold">
                    {l("Country", "Pays")} *
                    <Input
                      name="country"
                      list="african-countries"
                      required
                      autoComplete="country-name"
                      aria-invalid={!!errors["country"]}
                      aria-describedby={errors["country"] ? "country-error" : undefined}
                      className="mt-2 bg-card"
                    />
                    <datalist id="african-countries">
                      {AFRICAN_COUNTRIES.map((c) => (
                        <option value={countryLabel(c, lang)} key={c}>
                          {countryLabel(c, lang)}
                        </option>
                      ))}
                    </datalist>
                    {fieldError("country")}
                  </label>
                </div>
                {input("organisation", l("Organisation", "Organisation"), "text", false, 200)}
                <label className="block text-sm font-semibold">
                  {l("Subject", "Objet")} *
                  <select
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-2 h-11 w-full rounded-md border border-input bg-card px-3"
                  >
                    {SUBJECTS.map((s, i) => (
                      <option value={s} key={s}>
                        {subjectLabels[i]}
                      </option>
                    ))}
                  </select>
                </label>
                {(subject === "training" || subject === "membership") && (
                  <p className="text-sm text-muted-foreground">
                    {l("You may also be interested in", "Vous pouvez aussi consulter")}{" "}
                    <Link
                      className="font-semibold text-primary underline"
                      to="/$lang/$"
                      params={{ lang, _splat: subject === "training" ? "work-with-us" : "join" }}
                    >
                      {subject === "training"
                        ? l("Work with us", "Travailler avec nous")
                        : l("Membership", "Adhésion")}
                    </Link>
                    .
                  </p>
                )}
                <label className="block text-sm font-semibold">
                  {l("Message", "Message")} *
                  <Textarea
                    name="message"
                    required
                    minLength={20}
                    maxLength={5000}
                    rows={7}
                    aria-invalid={!!errors["message"]}
                    aria-describedby={errors["message"] ? "message-error" : undefined}
                    className="mt-2 bg-card"
                  />
                  {fieldError("message")}
                </label>
                <label className="block text-sm font-semibold">
                  {l("Preferred language", "Langue préférée")}
                  <select
                    name="preferred_language"
                    defaultValue={lang}
                    className="mt-2 h-11 w-full rounded-md border border-input bg-card px-3"
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </label>
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 h-4 w-4 shrink-0"
                    aria-describedby={errors["consent"] ? "consent-error" : undefined}
                  />
                  <span>
                    {l(
                      "I agree that IAPA may store my details to respond to my enquiry.",
                      "J’accepte que l’AIPA conserve mes coordonnées pour répondre à ma demande.",
                    )}{" "}
                    <Link
                      to="/$lang/$"
                      params={{ lang, _splat: "privacy" }}
                      className="text-primary underline"
                    >
                      {l("Privacy Policy", "Politique de confidentialité")}
                    </Link>
                  </span>
                </label>
                {fieldError("consent")}
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                {fieldError("submit")}
                <button
                  type="submit"
                  disabled={pending}
                  className="wwu group relative inline-flex items-center rounded-full border border-sun disabled:opacity-60"
                >
                  <span className="wwu-fill" aria-hidden="true" />
                  <span className="relative z-10 px-7 py-3.5 font-bold text-forest-deep">
                    {pending ? l("Sending…", "Envoi…") : l("Send message", "Envoyer le message")}
                  </span>
                  <span className="wwu-arrow relative z-10 grid h-11 w-11 shrink-0 place-items-center">
                    <Send className="h-5 w-5" strokeWidth={2} />
                  </span>
                </button>
              </form>
            )}
          </div>
          <aside>
            <h2 className="section-heading text-3xl text-primary md:text-4xl">
              {l("Contact details", "Nos coordonnées")}
            </h2>
            <div className="section-content space-y-8 rounded-2xl bg-mint p-8">
              <div>
                <p className="eyebrow text-forest-deep">{l("Headquarters", "Siège social")}</p>
                <p className="mt-3 flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-primary" />
                  {address}
                </p>
              </div>
              <div>
                <p className="eyebrow text-forest-deep">{l("Email", "E-mail")}</p>
                <div className="mt-3 flex items-start gap-2">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <a
                    className="min-w-0 break-all underline"
                    href={`mailto:${settings.secretariat_email}`}
                  >
                    {settings.secretariat_email}
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    title={l("Copy email", "Copier l’e-mail")}
                    aria-label={l("Copy email", "Copier l’e-mail")}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(settings.secretariat_email);
                        setCopied(true);
                      } catch {
                        setCopied(false);
                      }
                    }}
                  >
                    <Copy />
                  </Button>
                </div>
                {copied && (
                  <p role="status" className="mt-2 text-sm">
                    {l("Email copied", "E-mail copié")}
                  </p>
                )}
              </div>
              <div>
                <p className="eyebrow text-forest-deep">{l("Phone", "Téléphone")}</p>
                {settings.contact_phones.split("·").map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/[^+\d]/g, "")}`}
                    className="mt-3 flex items-center gap-3"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    {p.trim()}
                  </a>
                ))}
              </div>
              {settings.whatsapp && (
                <a
                  className="block underline"
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                >
                  WhatsApp: {settings.whatsapp}
                </a>
              )}
              {settings.office_hours && (
                <p>
                  {l("Office hours", "Horaires")}: {settings.office_hours}
                </p>
              )}
              {social.length > 0 && (
                <div>
                  <p className="eyebrow text-forest-deep">{l("Follow us", "Suivez-nous")}</p>
                  <div className="mt-3 flex gap-4">
                    {social.map(({ Icon, url, label }) => (
                      <a href={url} key={label} aria-label={label} rel="noreferrer" target="_blank">
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                {l(
                  "We respond in English and French.",
                  "Nous répondons en anglais et en français.",
                )}
              </p>
            </div>
          </aside>
        </section>
        <section className="mt-16">
          <h2 className="section-heading text-3xl text-primary md:text-4xl">
            {l("Find us in Accra", "Retrouvez-nous à Accra")}
          </h2>
          <div className="section-content">
            {map ? (
              <iframe
                title={l("IAPA Headquarters — Accra", "Siège de l’AIPA — Accra")}
                src={osm}
                loading="lazy"
                className="h-80 w-full rounded-2xl border border-border"
              />
            ) : (
              <div className="relative flex min-h-64 flex-col items-center justify-center overflow-hidden rounded-2xl bg-mint p-8 text-center">
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full text-savanna/40"
                  viewBox="0 0 1000 300"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 80L1000 220M0 240L1000 60M200 0L500 300M700 0L800 300M0 150H1000"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="none"
                  />
                </svg>
                <MapPin className="relative h-10 w-10 text-primary" />
                <h3 className="relative mt-4 text-xl">
                  {l("IAPA Headquarters", "Siège de l’AIPA")}
                </h3>
                <p className="relative mt-2">{address}</p>
                <Button className="relative mt-6 rounded-full" onClick={() => setMap(true)}>
                  {l("View on map", "Voir la carte")}
                  <ArrowUpRight />
                </Button>
              </div>
            )}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline"
            >
              {l("Open in Google Maps", "Ouvrir dans Google Maps")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
        <section className="mt-16">
          <h2 className="section-heading text-3xl text-primary md:text-4xl">
            {l("Our regional focal points", "Nos points focaux régionaux")}
          </h2>
          <div className="section-content grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {IMPACT_REGIONS.map((r, i) => {
              const point = contacts.find((c) => c.id === r.id);
              const show = point && (!point.is_placeholder || settings.show_placeholders);
              return (
                <article key={r.id} className="bg-ink p-6 text-forest-foreground">
                  <p className="text-xs font-bold uppercase tracking-wider text-arid-orange">
                    {l("Region", "Région")} {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-xl leading-tight">{r.name[lang]}</h3>
                  <p className="mt-3 text-sm text-forest-foreground/70">
                    {r.countries.map((c) => c.name[lang]).join(" · ")}
                  </p>
                  {show && (
                    <>
                      <p className="mt-6 font-semibold">{point.name}</p>
                      {point.email.includes("@") ? (
                        <a
                          className="mt-2 block break-all text-sm text-arid-orange underline"
                          href={`mailto:${point.email}`}
                        >
                          {point.email}
                        </a>
                      ) : (
                        <p className="mt-2 text-sm italic text-forest-foreground/60">
                          {point.email}
                        </p>
                      )}
                    </>
                  )}
                </article>
              );
            })}
          </div>
          <Link
            to="/$lang/$"
            params={{ lang, _splat: "who-we-are/where-we-work" }}
            className="mt-6 inline-flex items-center gap-2 font-semibold text-primary"
          >
            {l("See all countries on our map", "Voir tous les pays sur notre carte")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </article>
  );
}
