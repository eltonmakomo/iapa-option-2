import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Download, Mail, Check, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SUBJECTS, csvCell } from "@/lib/contact-schema";
import {
  setMessageStatus,
  saveContactSettings,
  saveRegionalContact,
} from "@/lib/contact.functions";
import { IMPACT_REGIONS } from "@/lib/impact-data";
import type { Database } from "@/integrations/supabase/types";
type Message = Database["public"]["Tables"]["contact_messages"]["Row"];
const LABELS: Record<string, string> = {
  general: "General enquiry",
  partnership: "Partnership",
  membership: "Membership",
  media: "Media / press",
  training: "Training & services",
  other: "Other",
};
const SETTINGS = [
  "secretariat_email",
  "hq_address",
  "contact_phones",
  "whatsapp",
  "office_hours",
  "hq_coordinates",
] as const;
const SETTING_LABELS: Record<string, string> = {
  secretariat_email: "Secretariat email",
  hq_address: "Headquarters address",
  contact_phones: "Phone numbers (separate with ·)",
  whatsapp: "WhatsApp (optional)",
  office_hours: "Office hours (optional)",
  hq_coordinates: "Headquarters coordinates (latitude, longitude)",
};
export function MessagesInbox() {
  const qc = useQueryClient();
  const update = useServerFn(setMessageStatus);
  const saveSettings = useServerFn(saveContactSettings);
  const savePoint = useServerFn(saveRegionalContact);
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selected, setSelected] = useState<Message | null>(null);
  const messages = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const settings = useQuery({
    queryKey: ["admin-contact-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();
      if (error) throw error;
      return data;
    },
  });
  const points = useQuery({
    queryKey: ["admin-regional-contacts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("regional_contacts").select("*");
      if (error) throw error;
      return data;
    },
  });
  const subscriptions = useQuery({
    queryKey: ["admin-newsletter-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("newsletter_subscriptions")
        .select("id", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });
  const rows = (messages.data ?? []).filter(
    (r) =>
      (!subject || r.subject === subject) &&
      (!status || r.status === status) &&
      (!from || r.created_at.slice(0, 10) >= from) &&
      (!to || r.created_at.slice(0, 10) <= to),
  );
  async function mark(row: Message, value: "read" | "replied") {
    try {
      await update({ data: { id: row.id, status: value } });
      setSelected({ ...row, status: value });
      await qc.invalidateQueries({ queryKey: ["admin-messages"] });
    } catch {
      toast.error("Unable to update message");
    }
  }
  function exportCsv() {
    const keys = [
      "created_at",
      "full_name",
      "email",
      "phone",
      "country",
      "organisation",
      "subject",
      "message",
      "preferred_language",
      "status",
    ] as const;
    const csv =
      "\uFEFF" +
      [keys.join(","), ...rows.map((r) => keys.map((k) => csvCell(r[k])).join(","))].join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "iapa-contact-messages.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <section className="space-y-10" id="messages">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl text-primary">
            Messages{" "}
            <span className="text-base text-muted-foreground">({messages.data?.length ?? 0})</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Newsletter subscriptions: {subscriptions.data ?? 0}
          </p>
        </div>
        <Button variant="outline" disabled={!rows.length} onClick={exportCsv}>
          <Download />
          Export CSV
        </Button>
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm font-semibold">
          Subject
          <select
            className="mt-2 h-10 w-full rounded-md border bg-card px-3"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">All subjects</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {LABELS[s]}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold">
          Status
          <select
            className="mt-2 h-10 w-full rounded-md border bg-card px-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All statuses</option>
            {["new", "read", "replied"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold">
          From
          <Input
            className="mt-2"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>
        <label className="text-sm font-semibold">
          To
          <Input className="mt-2" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
      </div>
      {messages.isError ? (
        <p role="alert">Messages could not be loaded.</p>
      ) : messages.isLoading ? (
        <p>Loading messages…</p>
      ) : rows.length === 0 ? (
        <p className="border-y border-border py-8 text-muted-foreground">
          No messages match these filters.
        </p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {rows.map((r) => (
            <li key={r.id}>
              <Button
                variant="ghost"
                className="h-auto w-full justify-start whitespace-normal rounded-none px-3 py-4 text-left"
                onClick={() => {
                  setSelected(r);
                  if (r.status === "new") void mark(r, "read");
                }}
              >
                <Mail className="shrink-0 text-primary" />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{r.full_name}</span>
                  <span className="block break-all text-sm text-muted-foreground">
                    {LABELS[r.subject]} · {new Date(r.created_at).toLocaleDateString()}
                  </span>
                </span>
                <span className="text-xs font-semibold text-primary">{r.status}</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Message details"
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/60 p-4"
          onKeyDown={(e) => {
            if (e.key === "Escape") setSelected(null);
          }}
        >
          <div className="max-h-[85vh] w-full max-w-2xl overflow-auto rounded-lg bg-card p-6">
            <div className="flex justify-between gap-4">
              <h3 className="text-xl">{selected.full_name}</h3>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Close message"
                onClick={() => setSelected(null)}
              >
                <X />
              </Button>
            </div>
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
              {[
                ["Email", selected.email],
                ["Phone", selected.phone || "—"],
                ["Country", selected.country],
                ["Organisation", selected.organisation || "—"],
                ["Subject", LABELS[selected.subject]],
                ["Language", selected.preferred_language],
                ["Received", new Date(selected.created_at).toLocaleString()],
                ["Status", selected.status],
              ].map(([label, value]) => (
                <div key={label} className="contents">
                  <dt className="font-semibold">{label}</dt>
                  <dd className="min-w-0 break-words">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 whitespace-pre-wrap break-words border-t border-border pt-6">
              {selected.message}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="outline"
                disabled={selected.status === "replied"}
                onClick={() => void mark(selected, "replied")}
              >
                <Check />
                Mark as replied
              </Button>
              <Button asChild>
                <a href={`mailto:${encodeURIComponent(selected.email)}`}>
                  <Mail />
                  Reply by email
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
      {settings.data && (
        <section>
          <h2 className="text-2xl text-primary">Contact settings</h2>
          <form
            className="mt-6 grid gap-4 md:grid-cols-2"
            onSubmit={async (e) => {
              e.preventDefault();
              const values = Object.fromEntries(new FormData(e.currentTarget));
              try {
                await saveSettings({ data: values });
                await qc.invalidateQueries({ queryKey: ["contact-info"] });
                toast.success("Contact settings saved");
              } catch {
                toast.error("Check the email, phone numbers and coordinates.");
              }
            }}
          >
            {SETTINGS.map((k) => (
              <label key={k} className="text-sm font-semibold">
                {SETTING_LABELS[k]}
                <Input
                  className="mt-2"
                  name={k}
                  maxLength={k === "hq_address" ? 300 : 255}
                  defaultValue={settings.data?.[k] ?? ""}
                />
              </label>
            ))}
            <Button className="justify-self-start" type="submit">
              Save contact settings
            </Button>
          </form>
        </section>
      )}
      <section>
        <h2 className="text-2xl text-primary">Regional focal points</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {IMPACT_REGIONS.map((r) => {
            const point = points.data?.find((p) => p.id === r.id);
            return (
              <form
                key={`${r.id}-${point?.name}`}
                className="rounded-lg border border-border p-5"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  try {
                    await savePoint({
                      data: {
                        id: r.id,
                        name: fd.get("name"),
                        email: fd.get("email"),
                        is_placeholder: fd.get("is_placeholder") === "on",
                      },
                    });
                    qc.invalidateQueries({ queryKey: ["admin-regional-contacts"] });
                    qc.invalidateQueries({ queryKey: ["contact-info"] });
                    toast.success("Focal point saved");
                  } catch {
                    toast.error("Check the focal point details");
                  }
                }}
              >
                <h3 className="text-lg">{r.name.en}</h3>
                <label className="mt-4 block text-sm">
                  Name
                  <Input
                    name="name"
                    required
                    maxLength={100}
                    defaultValue={point?.name ?? "[Name]"}
                    className="mt-2"
                  />
                </label>
                <label className="mt-4 block text-sm">
                  Email
                  <Input
                    name="email"
                    required
                    maxLength={255}
                    defaultValue={point?.email ?? "[Email TBC]"}
                    className="mt-2"
                  />
                </label>
                <label className="mt-4 flex items-center gap-2 text-sm">
                  <input
                    name="is_placeholder"
                    type="checkbox"
                    defaultChecked={point?.is_placeholder ?? true}
                  />
                  Placeholder
                </label>
                <Button type="submit" size="sm" className="mt-4">
                  Save focal point
                </Button>
              </form>
            );
          })}
        </div>
      </section>
    </section>
  );
}
