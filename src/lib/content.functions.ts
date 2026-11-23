import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export const CONTENT_TABLES = ["team_members", "news_posts", "events", "resources", "testimonials", "vacancies", "scholarships", "faqs"] as const;
export type ContentTable = (typeof CONTENT_TABLES)[number];
export type Row = Record<string, string | number | boolean | null> & { id: string; is_placeholder: boolean };
export type Settings = { show_placeholders: boolean; linkedin_url: string; facebook_url: string; x_url: string; youtube_url: string };

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

const DEFAULT_SETTINGS: Settings = { show_placeholders: true, linkedin_url: "#", facebook_url: "#", x_url: "#", youtube_url: "#" };

export const getSiteSettings = createServerFn({ method: "GET" }).handler(async (): Promise<Settings> => {
  const { data } = await publicClient().from("site_settings").select("show_placeholders, linkedin_url, facebook_url, x_url, youtube_url").eq("id", 1).maybeSingle();
  return data ?? DEFAULT_SETTINGS;
});

export const getContent = createServerFn({ method: "GET" })
  .inputValidator((d: { table: ContentTable; filter?: [string, string] }) => {
    if (!CONTENT_TABLES.includes(d.table)) throw new Error("Unknown table");
    return d;
  })
  .handler(async ({ data }): Promise<Row[]> => {
    const sb = publicClient();
    const { data: s } = await sb.from("site_settings").select("show_placeholders").eq("id", 1).maybeSingle();
    let q = sb.from(data.table).select("*").order("sort");
    if (data.filter) q = q.eq(data.filter[0], data.filter[1]);
    if (s && !s.show_placeholders) q = q.eq("is_placeholder", false);
    const { data: rows, error } = await q;
    if (error) { console.error(error); return []; }
    return (rows ?? []) as unknown as Row[];
  });
