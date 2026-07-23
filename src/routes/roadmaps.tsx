import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Signal, Map } from "lucide-react";
import { roadmaps } from "@/lib/data";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/roadmaps")({
  head: () => ({
    meta: [
      { title: "Roadmaps — DataWithAarav" },
      { name: "description", content: "Structured roadmaps for SQL, Python, Excel, Statistics, Power BI, and Tableau." },
      { property: "og:title", content: "Roadmaps — DataWithAarav" },
      { property: "og:description", content: "Pick your learning path. Each roadmap is curated and free." },
    ],
  }),
  component: RoadmapsPage,
});

// Enhanced gradient palettes with subtle brand accents
const CARD_GRADIENTS = [
  "from-slate-900/90 via-zinc-950/95 to-black",
  "from-zinc-900/90 via-neutral-950/95 to-black", 
  "from-neutral-800/90 via-stone-950/95 to-black",
  "from-stone-900/90 via-zinc-950/95 to-black",
  "from-gray-900/90 via-neutral-950/95 to-black",
  "from-zinc-800/90 via-stone-950/95 to-black",
  "from-slate-800/90 via-zinc-950/95 to-black",
];

// Glow colors for each card - subtle brand-aligned glows
const GLOW_COLORS = [
  "rgba(255, 255, 255, 0.15)",
  "rgba(200, 200, 200, 0.12)",
  "rgba(180, 180, 180, 0.14)",
  "rgba(220, 220, 220, 0.13)",
  "rgba(190, 190, 190, 0.15)",
  "rgba(210, 210, 210, 0.12)",
  "rgba(230, 230, 230, 0.14)",
];

function codeFor(roadmap: (typeof roadmaps)[number]) {
  const words = roadmap.title.trim().split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

const getRoutePath = (slug: string) => {
  const routeMap: Record<string, string> = {
    "data-analyst": "/dataanalyst",
    "excel": "/excel",
    "statistics": "/statistics",
    "python": "/python",
    "sql": "/sql",
    "visualization-tools": "/bi",
    "power-bi": "/bi",
    "tableau": "/tableau",
  };
  return routeMap[slug] || `/roadmaps/${slug}`;
};

function getDisplayTitle(roadmap: (typeof roadmaps)[number]) {
  const titleOverrides: Record<string, string> = {
    "visualization-tools": "Visualization Tools",
    "power-bi": "Power BI",
  };
  return titleOverrides[roadmap.slug] || roadmap.title;
}

function RoadmapsPage() {
  return (
    <>
      <PageShell
        eyebrow="ROADMAPS"
        title="Pick your path."
        description="Each roadmap is a structured, curated sequence. Start with the Data Analyst roadmap or dive into a specific skill."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {roadmaps.map((roadmap, index) => (
            <Link
              key={roadmap.slug}
              to={getRoutePath(roadmap.slug)}
              className="group block"
            >
              <div 
                className="relative overflow-hidden rounded-2xl glass-card p-5 sm:p-6 md:p-8 flex flex-col h-full group-hover:scale-[1.02] group-hover:border-white/30 hover:-translate-y-1 transition-all duration-300"
                style={{
                  boxShadow: `0 0 60px -20px ${GLOW_COLORS[index % GLOW_COLORS.length]}`,
                }}
              >
                {/* Ambient glow */}
                <div 
                  className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[50px] opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                  style={{ backgroundColor: GLOW_COLORS[index % GLOW_COLORS.length] }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Monogram */}
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <span className="font-black tracking-tight text-white/95 select-none leading-none text-5xl sm:text-6xl md:text-7xl bg-gradient-to-br from-white to-white/30 bg-clip-text text-transparent">
                      {codeFor(roadmap)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-semibold text-white text-lg sm:text-xl md:text-2xl mb-1">
                    {getDisplayTitle(roadmap)}
                  </h2>
                  
                  <p className="text-sm text-white/60 mb-3 sm:mb-4 line-clamp-2">{roadmap.tagline}</p>

                  {/* Overview */}
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                    {roadmap.overview}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
                    {roadmap.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60"
                      >
                        {skill}
                      </span>
                    ))}
                    {roadmap.skills.length > 4 && (
                      <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                        +{roadmap.skills.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Stats footer */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-muted-foreground pt-3 sm:pt-4 mt-auto border-t border-white/10">
                    <span className="inline-flex items-center gap-1.5 font-mono">
                      <Clock className="size-3 sm:size-3.5" /> {roadmap.estimatedTime}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="mt-3 sm:mt-4 w-full inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs sm:text-sm font-medium border border-white/10 hover:border-white/30 group-hover:scale-[1.02]">
                    Open Roadmap
                    <ArrowRight className="size-3 sm:size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}