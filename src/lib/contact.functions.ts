import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { contactSchema, newsletterSchema } from "./contact-schema";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) throw new Error("Unable to submit");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { website: _website, ...row } = data;
    const { error } = await supabaseAdmin.from("contact_messages").insert(row);
    if (error) throw new Error("Unable to save your message. Please try again.");
    return { ok: true };
  });
export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => newsletterSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) throw new Error("Unable to subscribe");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("newsletter_subscriptions")
      .upsert(
        { email: data.email.toLowerCase(), language: data.language },
        { onConflict: "email", ignoreDuplicates: true },
      );
    if (error) throw new Error("Unable to subscribe. Please try again.");
    return { ok: true };
  });
export const getContactInfo = createServerFn({ method: "GET" }).handler(async () => {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const sb = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
          h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
  const [settings, contacts] = await Promise.all([
    sb.from("site_settings").select("*").eq("id", 1).single(),
    sb.from("regional_contacts").select("*"),
  ]);
  if (settings.error || contacts.error) throw new Error("Contact details are unavailable");
  return { settings: settings.data, contacts: contacts.data };
});
export const setMessageStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ id: z.string().uuid(), status: z.enum(["read", "replied"]) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("contact_messages")
      .update({ status: data.status })
      .eq("id", data.id)
      .select("id")
      .single();
    if (error) throw new Error("Unable to update message");
    return { ok: true };
  });
const settingsSchema = z.object({
  secretariat_email: z.string().trim().email().max(255),
  hq_address: z.string().trim().min(1).max(300),
  contact_phones: z
    .string()
    .trim()
    .max(255)
    .refine((v) => v.split("·").every((p) => /^\+[\d\s().-]{6,39}$/.test(p.trim()))),
  whatsapp: z
    .string()
    .trim()
    .max(40)
    .refine((v) => !v || /^\+[\d\s().-]{6,39}$/.test(v)),
  office_hours: z.string().trim().max(255),
  hq_coordinates: z
    .string()
    .trim()
    .max(100)
    .refine((v) => {
      if (!v) return true;
      const c = v.split(",").map(Number);
      return (
        c.length === 2 &&
        c.every(Number.isFinite) &&
        Math.abs(c[0] ?? 100) <= 90 &&
        Math.abs(c[1] ?? 200) <= 180
      );
    }),
});
export const saveContactSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => settingsSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("site_settings")
      .update(data)
      .eq("id", 1)
      .select("id")
      .single();
    if (error) throw new Error("Unable to update settings");
    return { ok: true };
  });
export const saveRegionalContact = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z
      .object({
        id: z.enum(["north", "francophone-west", "anglophone-central", "east", "south"]),
        name: z.string().trim().min(1).max(100),
        email: z.string().trim().max(255),
        is_placeholder: z.boolean(),
      })
      .refine(
        (v) =>
          (v.is_placeholder && v.email === "[Email TBC]") ||
          z.string().email().safeParse(v.email).success,
      )
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("regional_contacts")
      .upsert(data)
      .select("id")
      .single();
    if (error) throw new Error("Unable to update focal point");
    return { ok: true };
  });
