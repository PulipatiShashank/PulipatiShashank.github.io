import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Reveal from "@/components/Reveal";

const GH_USER = "PulipatiShashank";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
}

async function fetchRepos(): Promise<Repo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`,
    { headers: { Accept: "application/vnd.github.mercy-preview+json" } }
  );
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return res.json();
}

function rank(r: Repo) {
  // Stars are king; freshness breaks ties.
  return r.stargazers_count * 1000 + new Date(r.pushed_at).getTime() / 1e10;
}

const SkeletonCard = () => (
  <Card className="card-glass overflow-hidden h-full">
    <div className="aspect-video bg-muted/40 animate-pulse" />
    <CardHeader className="p-4 sm:p-6">
      <div className="h-5 w-2/3 bg-muted/40 rounded animate-pulse mb-3" />
      <div className="h-4 w-full bg-muted/30 rounded animate-pulse" />
      <div className="h-4 w-5/6 bg-muted/30 rounded animate-pulse mt-2" />
    </CardHeader>
    <CardContent className="p-4 sm:p-6 pt-0 flex gap-2">
      <div className="h-5 w-14 bg-muted/30 rounded-full animate-pulse" />
      <div className="h-5 w-16 bg-muted/30 rounded-full animate-pulse" />
    </CardContent>
  </Card>
);

const Projects = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["gh-repos", GH_USER],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  const repos = (data ?? [])
    .filter((r) => !r.fork && !r.archived && r.name.toLowerCase() !== `${GH_USER.toLowerCase()}.github.io`)
    .sort((a, b) => rank(b) - rank(a))
    .slice(0, 6);

  return (
    <section id="projects" className="relative py-16 sm:py-20 px-4 sm:px-6">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(800px 400px at 80% 10%, hsl(var(--accent) / 0.10), transparent 60%), radial-gradient(700px 400px at 10% 90%, hsl(var(--primary) / 0.10), transparent 60%)",
        }}
      />
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">
            Live from my GitHub — sorted by stars and recent activity.
          </p>
        </Reveal>

        {isError && (
          <div className="text-center text-muted-foreground">
            Couldn't load repos right now.{" "}
            <a
              className="underline hover:text-foreground"
              href={`https://github.com/${GH_USER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit my GitHub →
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <Reveal key={i} delay={i * 100}>
                <SkeletonCard />
              </Reveal>
            ))}

          {!isLoading &&
            repos.map((repo, index) => {
              const techs = [
                ...(repo.language ? [repo.language] : []),
                ...(repo.topics ?? []),
              ]
                .filter((v, i, a) => v && a.indexOf(v) === i)
                .slice(0, 6);
              const image = `https://opengraph.githubassets.com/1/${repo.full_name}`;
              const liveUrl = repo.homepage && repo.homepage.trim() !== "" ? repo.homepage : null;
              const title = repo.name
                .replace(/[-_]/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());

              return (
                <Reveal key={repo.id} delay={index * 120}>
                  <Card className="card-glass hover:glow-primary hover:-translate-y-1 transition-smooth group overflow-hidden h-full">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block aspect-video overflow-hidden bg-muted/40"
                      aria-label={`${repo.name} on GitHub`}
                    >
                      <img
                        src={image}
                        alt={`${repo.name} preview`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </a>
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-lg sm:text-xl">
                        <span className="leading-tight">{title}</span>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-9 w-9 p-0 touch-manipulation"
                            onClick={() => window.open(repo.html_url, "_blank", "noopener,noreferrer")}
                            aria-label="Open repo"
                          >
                            <Github className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-9 w-9 p-0 touch-manipulation"
                            onClick={() => liveUrl && window.open(liveUrl, "_blank", "noopener,noreferrer")}
                            disabled={!liveUrl}
                            aria-label="Open live site"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardTitle>
                      <CardDescription className="text-sm sm:text-base leading-relaxed">
                        {repo.description || "No description provided."}
                      </CardDescription>
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" />
                          {repo.stargazers_count}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GitFork className="h-3.5 w-3.5" />
                          {repo.forks_count}
                        </span>
                        <span>Updated {new Date(repo.pushed_at).toLocaleDateString()}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="chip-aurora text-xs px-2.5 py-1 rounded-full capitalize"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
        </div>

        {!isLoading && !isError && (
          <div className="text-center mt-10">
            <a
              href={`https://github.com/${GH_USER}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-aurora rounded-xl px-5 py-2.5 inline-flex items-center gap-2 text-sm font-medium"
            >
              <Github className="h-4 w-4" />
              View all on GitHub
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
