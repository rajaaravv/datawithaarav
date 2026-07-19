import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { projects, projectCategories } from "@/lib/data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — DataWithAarav" },
      { name: "description", content: "Portfolio-ready data analytics projects across SQL, Python, Excel, Power BI, and Tableau." },
      { property: "og:title", content: "Data Analytics Projects — DataWithAarav" },
      { property: "og:description", content: "Curated portfolio projects to build hands-on experience." },
    ],
  }),
  component: ProjectsPage,
});

const difficultyColor: Record<string, string> = {
  Beginner: "text-white border-white/30 bg-white/10",
  Intermediate: "text-gray-300 border-gray-300/30 bg-gray-300/10",
  Advanced: "text-gray-500 border-gray-500/30 bg-gray-500/10",
};

function ProjectsPage() {
  const [cat, setCat] = useState<string>("All");
  const difficultyOrder = { Beginner: 0, Intermediate: 1, Advanced: 2 };
  const filtered = cat === "All" 
    ? [...projects].sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]) 
    : [...projects].filter((p) => p.category === cat).sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);

  return (
    <>
      <PageShell
        eyebrow="PROJECTS"
        title="Build a portfolio that gets you hired."
        description="Every project below uses real, public datasets. Fork them, remix them, or use them as inspiration."
      />
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex flex-wrap gap-2 mb-8">
          {projectCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                cat === c
                  ? "bg-foreground text-background border-foreground"
                  : "border-hairline text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <article
              key={p.name}
              className="p-6 rounded-2xl border border-hairline hover:border-brand/40 hover:-translate-y-0.5 transition-all flex flex-col"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-foreground font-medium leading-snug">{p.name}</h3>
                <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 ${difficultyColor[p.difficulty]}`}>
                  {p.difficulty}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tools.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-2 border border-hairline text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-hairline flex items-center justify-between text-xs text-muted-foreground">
                <span>{p.category}</span>
                {p.dataset && (
                  <a href={p.dataset} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand hover:text-brand-secondary">
                    Dataset <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}