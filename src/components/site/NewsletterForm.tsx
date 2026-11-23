import { useState } from "react";
import { t, type Lang } from "@/lib/i18n";
import { useServerFn } from "@tanstack/react-start";
import { subscribeNewsletter } from "@/lib/contact.functions";
import { newsletterSchema } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";

export function NewsletterForm({ lang, tone = "light" }: { lang: Lang; tone?: "light" | "dark" }) {
  const d = t(lang);
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const subscribe = useServerFn(subscribeNewsletter);
  if (done)
    return (
      <p role="status" className="mt-3 text-sm font-semibold">
        {lang === "fr"
          ? "Merci ! Votre inscription à IAPA Pulse a été enregistrée."
          : "Thank you! Your IAPA Pulse subscription has been saved."}
      </p>
    );
  return (
    <form
      className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap"
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const parsed = newsletterSchema.safeParse({
          email: fd.get("email"),
          language: lang,
          website: fd.get("website"),
        });
        if (!parsed.success) {
          setError(
            lang === "fr" ? "Vérifiez votre adresse e-mail." : "Please check your email address.",
          );
          return;
        }
        setPending(true);
        setError("");
        try {
          await subscribe({ data: parsed.data });
          setDone(true);
        } catch {
          setError(
            lang === "fr"
              ? "Impossible de vous inscrire. Veuillez réessayer."
              : "Unable to subscribe. Please try again.",
          );
        } finally {
          setPending(false);
        }
      }}
    >
      <label className="sr-only" htmlFor={`nl-${tone}`}>
        {d.nlPlaceholder}
      </label>
      <input
        id={`nl-${tone}`}
        name="email"
        type="email"
        maxLength={255}
        required
        placeholder={d.nlPlaceholder}
        className={`min-w-0 flex-1 rounded-full border px-5 py-3 text-sm text-foreground ${tone === "dark" ? "border-transparent bg-card" : "border-border bg-card"}`}
      />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <Button
        disabled={pending}
        className="h-auto rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground hover:bg-accent/90"
      >
        {pending ? "…" : d.nlCta}
      </Button>
      {error && (
        <p role="alert" className="basis-full text-sm">
          {error}
        </p>
      )}
    </form>
  );
}
