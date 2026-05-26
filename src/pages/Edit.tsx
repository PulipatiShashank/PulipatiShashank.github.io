import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CONTENT_PATH, SiteContent, siteContent as bundled } from "@/content";
import { ArrowLeft, Eye, EyeOff, Loader2, LogOut, Plus, RefreshCw, Save, ShieldCheck, X } from "lucide-react";

const OWNER = "PulipatiShashank";
const REPO = "PulipatiShashank.github.io";
const BRANCH = "main";
const TOKEN_KEY = "gh_edit_token";

// UTF-8 safe base64
const b64encode = (s: string) =>
  btoa(unescape(encodeURIComponent(s)));
const b64decode = (s: string) =>
  decodeURIComponent(escape(atob(s.replace(/\n/g, ""))));

interface GhFile {
  sha: string;
  content: string;
}

async function ghFetchFile(token: string): Promise<{ json: SiteContent; sha: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${CONTENT_PATH}?ref=${BRANCH}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) throw new Error(`GET failed: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as GhFile;
  return { json: JSON.parse(b64decode(data.content)) as SiteContent, sha: data.sha };
}

async function ghPutFile(token: string, content: SiteContent, sha: string, message: string) {
  const body = {
    message,
    content: b64encode(JSON.stringify(content, null, 2) + "\n"),
    sha,
    branch: BRANCH,
  };
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${CONTENT_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) throw new Error(`PUT failed: ${res.status} ${await res.text()}`);
  return res.json();
}

const Edit = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>(() => sessionStorage.getItem(TOKEN_KEY) || "");
  const [showToken, setShowToken] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [draft, setDraft] = useState<SiteContent>(bundled);
  const [sha, setSha] = useState<string>("");
  const [status, setStatus] = useState<{ kind: "idle" | "loading" | "saving" | "ok" | "err"; msg?: string }>({
    kind: "idle",
  });

  const draftJson = useMemo(() => JSON.stringify(draft, null, 2), [draft]);
  const original = useMemo(() => JSON.stringify(bundled, null, 2), []);
  const isDirty = draftJson !== original;

  async function authenticate() {
    if (!token.trim()) return;
    setStatus({ kind: "loading" });
    try {
      const { json, sha } = await ghFetchFile(token.trim());
      sessionStorage.setItem(TOKEN_KEY, token.trim());
      setDraft(json);
      setSha(sha);
      setAuthed(true);
      setStatus({ kind: "ok", msg: "Loaded latest content from GitHub." });
    } catch (e) {
      setStatus({ kind: "err", msg: e instanceof Error ? e.message : String(e) });
    }
  }

  async function reload() {
    if (!token) return;
    setStatus({ kind: "loading" });
    try {
      const { json, sha } = await ghFetchFile(token);
      setDraft(json);
      setSha(sha);
      setStatus({ kind: "ok", msg: "Reloaded from GitHub." });
    } catch (e) {
      setStatus({ kind: "err", msg: e instanceof Error ? e.message : String(e) });
    }
  }

  async function save() {
    if (!token || !sha) return;
    setStatus({ kind: "saving" });
    try {
      const res = await ghPutFile(token, draft, sha, "chore(content): update site.json via /edit");
      setSha(res.content.sha);
      setStatus({
        kind: "ok",
        msg: "Saved. GitHub Actions will redeploy in ~1 minute.",
      });
    } catch (e) {
      setStatus({ kind: "err", msg: e instanceof Error ? e.message : String(e) });
    }
  }

  function signOut() {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setAuthed(false);
    setStatus({ kind: "idle" });
  }

  // Convenience setters
  const setHero = (k: keyof SiteContent["hero"], v: unknown) =>
    setDraft({ ...draft, hero: { ...draft.hero, [k]: v } as SiteContent["hero"] });
  const setAbout = (k: keyof SiteContent["about"], v: unknown) =>
    setDraft({ ...draft, about: { ...draft.about, [k]: v } as SiteContent["about"] });
  const setContact = (k: keyof SiteContent["contact"], v: string) =>
    setDraft({ ...draft, contact: { ...draft.contact, [k]: v } });
  const setSocial = (k: keyof SiteContent["social"], v: string) =>
    setDraft({ ...draft, social: { ...draft.social, [k]: v } });

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="card-glass w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Editor — Authenticate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Paste a <strong>GitHub Personal Access Token</strong> with{" "}
              <code className="text-foreground">Contents: Read &amp; Write</code> on{" "}
              <code className="text-foreground">{OWNER}/{REPO}</code>.
            </p>
            <p className="text-xs text-muted-foreground">
              Create one at{" "}
              <a
                href="https://github.com/settings/personal-access-tokens/new"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                github.com → Settings → Developer settings → Fine-grained tokens
              </a>
              . Token stays in this browser tab only.
            </p>
            <div className="relative">
              <Input
                type={showToken ? "text" : "password"}
                placeholder="github_pat_..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && authenticate()}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowToken((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Toggle token visibility"
              >
                {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex gap-2">
              <Button onClick={authenticate} disabled={!token.trim() || status.kind === "loading"} className="flex-1">
                {status.kind === "loading" ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Unlock editor
              </Button>
              <Button variant="ghost" onClick={() => navigate("/")}>Cancel</Button>
            </div>
            {status.kind === "err" && (
              <p className="text-sm text-destructive break-all">{status.msg}</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Editor
  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="chip-aurora">
              {OWNER}/{REPO}@{BRANCH}
            </Badge>
            <Button variant="ghost" size="sm" onClick={reload} disabled={status.kind === "loading" || status.kind === "saving"}>
              <RefreshCw className="h-4 w-4 mr-1" /> Reload
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-1" /> Sign out
            </Button>
          </div>
        </div>

        <h1 className="text-3xl font-bold">
          Site <span className="text-gradient">Editor</span>
        </h1>

        {/* Hero */}
        <Card className="card-glass">
          <CardHeader><CardTitle>Hero</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Field label="Name">
              <Input value={draft.hero.name} onChange={(e) => setHero("name", e.target.value)} />
            </Field>
            <Field label="Tagline">
              <Input value={draft.hero.tagline} onChange={(e) => setHero("tagline", e.target.value)} />
            </Field>
            <Field label="CV URL">
              <Input value={draft.hero.cvUrl} onChange={(e) => setHero("cvUrl", e.target.value)} />
            </Field>
            <ListEditor
              label="Rotating roles"
              values={draft.hero.roles}
              onChange={(v) => setHero("roles", v)}
              placeholder="e.g. Cloud Engineer"
            />
          </CardContent>
        </Card>

        {/* About */}
        <Card className="card-glass">
          <CardHeader><CardTitle>About</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Field label="Intro paragraph (above the cards)">
              <Textarea rows={4} value={draft.about.intro} onChange={(e) => setAbout("intro", e.target.value)} />
            </Field>
            <ListEditor
              label="Journey paragraphs"
              values={draft.about.journey}
              onChange={(v) => setAbout("journey", v)}
              multiline
              placeholder="A paragraph about your journey..."
            />
            <ListEditor
              label="Skills"
              values={draft.about.skills}
              onChange={(v) => setAbout("skills", v)}
              placeholder="e.g. TypeScript"
            />
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="card-glass">
          <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Field label="Email">
              <Input type="email" value={draft.contact.email} onChange={(e) => setContact("email", e.target.value)} />
            </Field>
            <Field label="Phone">
              <Input value={draft.contact.phone} onChange={(e) => setContact("phone", e.target.value)} />
            </Field>
            <Field label="Location">
              <Input value={draft.contact.location} onChange={(e) => setContact("location", e.target.value)} />
            </Field>
          </CardContent>
        </Card>

        {/* Social */}
        <Card className="card-glass">
          <CardHeader><CardTitle>Social</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Field label="GitHub URL">
              <Input value={draft.social.github} onChange={(e) => setSocial("github", e.target.value)} />
            </Field>
            <Field label="LinkedIn URL">
              <Input value={draft.social.linkedin} onChange={(e) => setSocial("linkedin", e.target.value)} />
            </Field>
          </CardContent>
        </Card>

        {/* Save bar */}
        <div className="sticky bottom-4 z-10">
          <Card className="card-glass">
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
              <div className="text-sm text-muted-foreground">
                {status.kind === "ok" && <span className="text-foreground">{status.msg}</span>}
                {status.kind === "err" && <span className="text-destructive break-all">{status.msg}</span>}
                {status.kind === "idle" && (isDirty ? "Unsaved changes." : "No changes yet.")}
                {status.kind === "saving" && "Saving..."}
                {status.kind === "loading" && "Loading..."}
              </div>
              <Button
                onClick={save}
                disabled={!isDirty || status.kind === "saving" || !sha}
                className="btn-aurora rounded-xl"
              >
                {status.kind === "saving" ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Commit &amp; publish
              </Button>
            </CardContent>
          </Card>
        </div>

        <details className="text-xs text-muted-foreground">
          <summary className="cursor-pointer">Raw JSON preview</summary>
          <pre className="mt-2 p-3 bg-muted/40 rounded overflow-auto">{draftJson}</pre>
        </details>
      </div>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-sm">{label}</Label>
    {children}
  </div>
);

interface ListEditorProps {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
}

const ListEditor = ({ label, values, onChange, placeholder, multiline }: ListEditorProps) => {
  const [draft, setDraft] = useState("");
  const add = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...values, v]);
    setDraft("");
  };
  const update = (i: number, v: string) => {
    const next = [...values];
    next[i] = v;
    onChange(next);
  };
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  const InputEl = multiline ? Textarea : Input;

  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2 items-start">
            <InputEl
              value={v}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                update(i, e.target.value)
              }
              rows={multiline ? 3 : undefined}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(i)}
              aria-label="Remove"
              className="mt-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <InputEl
          value={draft}
          placeholder={placeholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setDraft(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent) => {
            if (!multiline && e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          rows={multiline ? 3 : undefined}
        />
        <Button type="button" variant="outline" onClick={add} className="mt-0">
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>
    </div>
  );
};

export default Edit;
