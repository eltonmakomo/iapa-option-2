import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Staff sign-in — IAPA" }, { name: "description", content: "Sign in to manage IAPA website content." },
    { property: "og:title", content: "Staff sign-in — IAPA" }, { property: "og:description", content: "Sign in to manage IAPA website content." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" },
  ] }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) { toast.error(error.message); return; }
      nav({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
      setBusy(false);
      if (error) { toast.error(error.message); return; }
      toast.success("Check your email to confirm your account.");
    }
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl bg-card p-8 shadow-sm">
        <h1 className="text-2xl text-primary">{mode === "in" ? "IAPA staff sign-in" : "Create staff account"}</h1>
        <Input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" required minLength={8} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" className="w-full" disabled={busy}>{mode === "in" ? "Sign in" : "Create account"}</Button>
        <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="w-full text-sm text-muted-foreground underline">
          {mode === "in" ? "No account yet? Create one" : "Already have an account? Sign in"}
        </button>
      </form>
    </main>
  );
}
