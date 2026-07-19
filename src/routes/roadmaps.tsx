import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Signal } from "lucide-react";
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

// ---- monochrome palette ----------------------------------------------
const PALETTE = {
  slate: "from-neutral-900 via-neutral-950 to-black",
  charcoal: "from-zinc-900 via-black to-black",
  graphite: "from-neutral-800 via-neutral-950 to-black",
  ink: "from-neutral-950 via-black to-black",
} as const;
const PALETTE_KEYS = Object.keys(PALETTE) as (keyof typeof PALETTE)[];

function toneFor(roadmap: (typeof roadmaps)[number], index: number) {
  const key = (roadmap as any).tone as keyof typeof PALETTE | undefined;
  return PALETTE[key ?? PALETTE_KEYS[index % PALETTE_KEYS.length]];
}

function codeFor(roadmap: (typeof roadmaps)[number]) {
  const explicit = (roadmap as any).code as string | undefined;
  if (explicit) return explicit.toUpperCase();
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
              className="group block rounded-2xl border border-hairline overflow-hidden bg-gradient-to-b hover:border-white/30 hover:-translate-y-1 transition-all duration-300"
              style={{
                background: `linear-gradient(to bottom, ${toneFor(roadmap, index).replace('from-', '').replace('via-', '').replace('to-', '')})`,
              }}
            >
              <div className={`relative rounded-2xl border overflow-hidden flex flex-col bg-gradient-to-b ${toneFor(roadmap, index)} border-white/10 hover:border-white/30 transition-all duration-300 h-full`}>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
                
                <div className="relative p-5 sm:p-6 md:p-8 flex flex-col h-full">
                  {/* Monogram */}
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <span className="font-bold tracking-tight text-white/95 select-none leading-none text-5xl sm:text-6xl md:text-7xl">
                      {codeFor(roadmap)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-semibold text-white text-lg sm:text-xl md:text-2xl mb-1">
                    {getDisplayTitle(roadmap)}
                  </h2>
                  
                  <p className="text-sm text-white/60 mb-3 sm:mb-4 line-clamp-2">{roadmap.tagline}</p>

                  {/* Overview */}
                  <p className="text-xs sm:text-sm text-white/60 mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                    {roadmap.overview}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
                    {roadmap.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60"
                      >
                        {skill}
                      </span>
                    ))}
                    {roadmap.skills.length > 4 && (
                      <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
                        +{roadmap.skills.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Stats footer */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-white/60 pt-3 sm:pt-4 mt-auto border-t border-white/10">
                    <span className="inline-flex items-center gap-1.5 font-mono">
                      <Clock className="size-3 sm:size-3.5" /> {roadmap.estimatedTime}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono">
                      <Signal className="size-3 sm:size-3.5" /> {roadmap.difficulty}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="mt-3 sm:mt-4 w-full inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs sm:text-sm font-medium border border-white/10 hover:border-white/30">
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