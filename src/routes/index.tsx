import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Briefcase, MessageSquare, Map, Code, Sparkles, Users } from "lucide-react";
import { roadmaps } from "@/lib/data";

export const Route = createFileRoute("/")({
  component: Home,
});

const features = [
  { icon: Map, title: "Structured Roadmap", desc: "Step-by-step from Excel foundations to advanced Python modeling." },
  { icon: Briefcase, title: "Real Projects", desc: "Portfolio-ready projects using Netflix, IPL, Amazon, and Spotify data." },
  { icon: MessageSquare, title: "Interview Questions", desc: "500+ curated technical and behavioral questions." },
  { icon: Code, title: "Practice Problems", desc: "The best free platforms to sharpen every skill." },
  { icon: BookOpen, title: "Learning Resources", desc: "Docs, tutorials, and cheat sheets — hand-picked." },
  { icon: Users, title: "Community Support", desc: "Connect with peers, share projects, and get feedback on your work." },
];

const stats = [
  { n: "100+", label: "Resources" },
  { n: "10+", label: "Projects" },
  { n: "500+", label: "Questions" },
  { n: "20+", label: "Guides" },
];

function Home() {
  const analyst = roadmaps.find((r) => r.slug === "data-analyst")!;

  return (
    <>
      {/* Hero */}
      <section className="relative px-4 sm:px-6 pt-24 md:pt-36 pb-16 md:pb-24 text-center overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full bg-white/10 blur-[160px] -z-10 animate-glow" />
        <div className="max-w-5xl mx-auto animate-fade-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-[-0.045em] leading-[1.02] text-balance text-gradient-brand mb-6 md:mb-8">
            Become a Data Analyst.
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 md:mb-12 tracking-tight px-2">
            A curated, step-by-step guide to mastering the modern data stack — learning paths,
            real-world projects, and interview prep. Free, forever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
            <Link
              to="/dataanalyst"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 md:py-3.5 rounded-full bg-foreground text-background font-semibold text-[15px] hover:opacity-90 transition-all active:scale-95 min-h-[44px]"
            >
              Start Your Journey <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/roadmaps"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 md:py-3.5 rounded-full border border-hairline bg-surface-1/60 backdrop-blur text-foreground font-semibold text-[15px] hover:bg-surface-2 transition-colors min-h-[44px]"
            >
              Explore Roadmap
            </Link>
          </div>
        </div>
      </section>

      {/* Features Bento */}
      <section className="px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[-0.04em] leading-[1.05] text-balance">
              Everything you need — nothing you don't.
            </h2>
            <p className="mt-4 md:mt-6 text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed tracking-tight max-w-2xl">
              We stripped away the noise. What's left is the curriculum you actually need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 mb-4 md:mb-5">
            {/* Main feature card - full width on mobile, 8 cols on md+ */}
            <div className="md:col-span-8 md:row-span-2 relative overflow-hidden rounded-[24px] md:rounded-[32px] glass-card p-6 sm:p-8 md:p-12 flex flex-col justify-end min-h-[400px] md:min-h-0 group hover:scale-[1.01] transition-all duration-700 ease-out motion-reduce:transition-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-700 motion-reduce:transition-none" />
              <div className="relative z-10">
                <Map className="size-6 text-white mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-500 motion-reduce:transition-none" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-4 md:mb-6">Curated Learning Path</h2>
                <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-xl leading-relaxed tracking-tight">
                  Stop wasting time in tutorial hell. Every resource is vetted so you can focus on
                  building skills that get you hired.
                </p>
              </div>
            </div>
            {/* Project-Based card - full width mobile, 4 cols md+ */}
            <div className="md:col-span-4 rounded-[24px] md:rounded-[32px] glass-card p-6 sm:p-8 md:p-10 flex flex-col justify-center group hover:scale-[1.03] transition-all duration-500 ease-out motion-reduce:transition-none">
              <Briefcase className="size-6 text-white mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-500 motion-reduce:transition-none" />
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">Project-Based</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Build real portfolios with production-grade datasets.
              </p>
            </div>
            {/* Interview Ready card - full width mobile, 4 cols md+ */}
            <div className="md:col-span-4 rounded-[24px] md:rounded-[32px] glass-card p-6 sm:p-8 md:p-10 flex flex-col justify-center group hover:scale-[1.03] transition-all duration-500 ease-out motion-reduce:transition-none">
              <MessageSquare className="size-6 text-white mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-500 motion-reduce:transition-none" />
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">Interview Ready</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                500+ technical and behavioral questions curated for analysts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {features.slice(3).map((f) => (
              <div
                key={f.title}
                className="p-6 sm:p-8 md:p-10 rounded-[24px] md:rounded-[32px] glass-card group hover:scale-[1.02] hover:border-white/30 transition-all duration-500 ease-out motion-reduce:transition-none"
              >
                <f.icon className="size-6 text-white mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-500 motion-reduce:transition-none" />
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">{f.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Made This */}
      <section className="px-4 sm:px-6 py-16 md:py-24 border-t border-hairline">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-[-0.04em] leading-[1.05] mb-12 md:mb-16">
            Who Made This
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            {/* Profile card */}
            <div className="md:col-span-5 rounded-[24px] md:rounded-[32px] glass-card p-6 sm:p-8 md:p-10 flex flex-col">
              <div className="flex items-center gap-5 mb-6 md:mb-8">
                <div className="size-16 sm:size-20 shrink-0 rounded-full bg-[#1a1a1a] flex items-center justify-center text-2xl md:text-3xl font-bold text-white">
                  A
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Aarav</h3>
                  <span className="inline-flex text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-brand/40 text-brand">
                    Open to Collabs
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                I build free, structured learning systems for aspiring data analysts because
                learning shouldn't be expensive, scattered, or overwhelming.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Every roadmap, project, and question bank here is designed to be completed — not
                just collected. Currently building mastery systems for SQL, Excel, Python, Power
                BI, and the full Data Analyst journey.
              </p>
            </div>

            {/* Stats grid */}
            <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-[24px] md:rounded-[32px] glass-card p-6 sm:p-8 flex flex-col justify-center hover:scale-[1.02] transition-all duration-500 ease-out motion-reduce:transition-none"
                >
                  <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] text-brand mb-2">
                    {s.n}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}