import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CONTENT_TABLES, type ContentTable } from "@/lib/content.functions";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MessagesInbox } from "@/components/site/MessagesInbox";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — IAPA" },
      { name: "description", content: "Manage IAPA website content." },
      { property: "og:title", content: "Admin — IAPA" },
      { property: "og:description", content: "Manage IAPA website content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const LABEL: Record<ContentTable, string> = {
  team_members: "Team",
  news_posts: "News & press",
  events: "Events",
  resources: "Resources",
  testimonials: "Testimonials",
  vacancies: "Vacancies",
  scholarships: "Scholarships",
  faqs: "FAQs",
};
type AnyRow = { id: string; is_placeholder: boolean } & Record<string, unknown>;
const titleOf = (r: AnyRow) =>
  String(r["title_en"] ?? r["question_en"] ?? r["role_en"] ?? r["quote_en"] ?? r["id"]) +
  (r["name"] && r["name"] !== "[Name]" ? ` — ${String(r["name"])}` : "");

function AdminPage() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const admin = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return { ok: false, email: "" };
      const { data } = await supabase.rpc("has_role", { _user_id: u.user.id, _role: "admin" });
      return { ok: !!data, email: u.user?.email ?? "" };
    },
  });
  const settings = useQuery({
    queryKey: ["admin-settings"],
    enabled: !!admin.data?.ok,
    queryFn: async () =>
      (await supabase.from("site_settings").select("*").eq("id", 1).single()).data,
  });
  const content = useQuery({
    queryKey: ["admin-content"],
    enabled: !!admin.data?.ok,
    queryFn: async () => {
      const out = {} as Record<ContentTable, AnyRow[]>;
      await Promise.all(
        CONTENT_TABLES.map(async (t) => {
          out[t] = ((await supabase.from(t).select("*").order("sort")).data ??
            []) as unknown as AnyRow[];
        }),
      );
      return out;
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    nav({ to: "/auth", replace: true });
  }
  async function setShow(v: boolean) {
    const { error } = await supabase
      .from("site_settings")
      .update({ show_placeholders: v })
      .eq("id", 1);
    if (error) {
      toast.error(error.message);
      return;
    }
    qc.invalidateQueries();
    toast.success(v ? "Placeholders visible" : "Placeholders hidden");
  }
  async function setSocial(
    k: "linkedin_url" | "facebook_url" | "x_url" | "youtube_url",
    v: string,
  ) {
    const { error } = await supabase
      .from("site_settings")
      .update({ [k]: v } as { linkedin_url: string })
      .eq("id", 1);
    if (error) toast.error(error.message);
    else {
      qc.invalidateQueries();
      toast.success("Saved");
    }
  }
  async function toggle(t: ContentTable, r: AnyRow) {
    const { error } = await supabase
      .from(t)
      .update({ is_placeholder: !r.is_placeholder })
      .eq("id", r.id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({ queryKey: ["admin-content"] });
  }
  async function remove(t: ContentTable, r: AnyRow) {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from(t).delete().eq("id", r.id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({ queryKey: ["admin-content"] });
  }

  if (admin.isLoading) return <p className="p-10">Loading…</p>;
  if (!admin.data?.ok)
    return (
      <main className="mx-auto max-w-lg p-10">
        <h1 className="text-2xl text-primary">No admin access</h1>
        <p className="mt-3 text-muted-foreground">
          {admin.data?.email} is signed in but isn't an IAPA admin.
        </p>
        <Button className="mt-6" variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </main>
    );
  const all = content.data ? CONTENT_TABLES.flatMap((t) => content.data[t]) : [];
  const left = all.filter((r) => r.is_placeholder).length;
  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-primary">IAPA admin</h1>
          <p className="text-sm text-muted-foreground">{admin.data.email}</p>
        </div>
        <Button variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </header>
      <MessagesInbox />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-sun/25 p-6">
          <p className="text-4xl font-extrabold text-ink">{left}</p>
          <p className="font-semibold">placeholder items left to replace</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <label className="flex items-center justify-between gap-4 font-semibold">
            Show placeholders on the public site
            <Switch checked={settings.data?.show_placeholders ?? true} onCheckedChange={setShow} />
          </label>
          <p className="mt-2 text-sm text-muted-foreground">
            Switch off at launch to hide every sample item and placeholder social icon.
          </p>
        </div>
      </div>
      {settings.data && (
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl">Social links</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {(["linkedin_url", "facebook_url", "x_url", "youtube_url"] as const).map((k) => (
              <label key={k} className="text-sm font-semibold">
                {k.replace("_url", "")}
                <input
                  defaultValue={settings.data?.[k] ?? ""}
                  onBlur={(e) =>
                    e.target.value !== settings.data?.[k] && setSocial(k, e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 font-normal"
                />
              </label>
            ))}
          </div>
        </section>
      )}
      {content.data &&
        CONTENT_TABLES.map((t) => (
          <section key={t}>
            <h2 className="text-xl">
              {LABEL[t]}{" "}
              <span className="text-sm text-muted-foreground">({content.data[t].length})</span>
            </h2>
            {content.data[t].length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                No items — the public page shows its empty message.
              </p>
            ) : (
              <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-card">
                {content.data[t].map((r) => (
                  <li key={r.id} className="flex flex-wrap items-center gap-3 p-3 text-sm">
                    {r.is_placeholder && (
                      <span className="rounded-full bg-sun px-2.5 py-0.5 text-xs font-bold text-ink">
                        Placeholder
                      </span>
                    )}
                    <span className="flex-1">{titleOf(r)}</span>
                    <Button size="sm" variant="ghost" onClick={() => toggle(t, r)}>
                      {r.is_placeholder ? "Mark as final" : "Mark as placeholder"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => remove(t, r)}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
    </main>
  );
}
