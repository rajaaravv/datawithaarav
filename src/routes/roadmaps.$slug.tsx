import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, Circle, Clock, ExternalLink, Signal, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { roadmaps, type Priority, type Roadmap, type RoadmapTopic, type TopicDifficulty } from "@/lib/data";

export const Route = createFileRoute("/roadmaps/$slug")({
  loader: ({ params }): { roadmap: Roadmap } => {
    const roadmap = roadmaps.find((r) => r.slug === params.slug);
    if (!roadmap) throw notFound();
    return { roadmap };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Roadmap not found" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${loaderData.roadmap.title} — Mastery Checklist` },
        { name: "description", content: loaderData.roadmap.overview },
        { property: "og:title", content: loaderData.roadmap.title },
        { property: "og:description", content: loaderData.roadmap.overview },
      ],
    };
  },
  component: RoadmapDetail,
});

interface EnrichedTopic extends RoadmapTopic {
  stageTitle: string;
  order: number;
  _difficulty: TopicDifficulty;
  _hours: string;
  _priority: Priority;
  _mustKnow: boolean;
}

function enrich(roadmap: Roadmap): EnrichedTopic[] {
  const out: EnrichedTopic[] = [];
  let order = 0;
  roadmap.stages.forEach((stage, si) => {
    stage.topics.forEach((t) => {
      order += 1;
      const diff: TopicDifficulty =
        t.difficulty ?? (si <= 1 ? "Easy" : si <= 4 ? "Medium" : "Hard");
      const hours =
        t.hours ?? (diff === "Easy" ? "2–3 hrs" : diff === "Medium" ? "4–5 hrs" : "6–8 hrs");
      const priority: Priority =
        t.priority ?? (si <= 2 ? "Critical" : si <= 4 ? "Important" : "Nice to have");
      const mustKnow = t.mustKnow ?? si <= 3;
      out.push({
        ...t,
        stageTitle: stage.title,
        order,
        _difficulty: diff,
        _hours: hours,
        _priority: priority,
        _mustKnow: mustKnow,
      });
    });
  });
  return out;
}

function parseHours(h: string): number {
  const nums = h.match(/\d+/g)?.map(Number) ?? [];
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

const diffStyles: Record<TopicDifficulty, string> = {
  Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const priorityStyles: Record<Priority, string> = {
  Critical: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Important: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Nice to have": "bg-muted/40 text-muted-foreground border-hairline",
};

function RoadmapDetail() {
  const { roadmap } = Route.useLoaderData() as { roadmap: Roadmap };
  const topics = useMemo(() => enrich(roadmap), [roadmap]);
  const storageKey = `roadmap-progress:${roadmap.slug}`;

  const [done, setDone] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setDone(new Set(JSON.parse(raw) as number[]));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify([...done]));
    } catch {
      /* ignore */
    }
  }, [done, hydrated, storageKey]);

  const toggleDone = (o: number) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(o)) next.delete(o);
      else next.add(o);
      return next;
    });

  const toggleExpand = (o: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(o)) next.delete(o);
      else next.add(o);
      return next;
    });

  const stats = useMemo(() => {
    const total = topics.length;
    const easy = topics.filter((t) => t._difficulty === "Easy").length;
    const med = topics.filter((t) => t._difficulty === "Medium").length;
    const hard = topics.filter((t) => t._difficulty === "Hard").length;
    const totalH = Math.round(topics.reduce((n, t) => n + parseHours(t._hours), 0));
    return { total, easy, med, hard, totalH, done: done.size };
  }, [topics, done]);

  const progressPct = stats.total ? (stats.done / stats.total) * 100 : 0;

  return (
    <>
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-6 animate-fade-up">
        <Link to="/roadmaps" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="size-3.5" /> All roadmaps
        </Link>
        <div className="text-xs font-mono uppercase tracking-widest text-brand mb-4">MASTERY CHECKLIST</div>
        <h1 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight mb-3">
          {roadmap.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-6">{roadmap.overview}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5"><Signal className="size-4" /> {roadmap.difficulty}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="size-4" /> {roadmap.estimatedTime}</span>
          <span className="inline-flex items-center gap-1.5">Industry-focused · Interview-ready</span>
        </div>

        {/* Progress */}
        <div className="glass-card rounded-xl p-4 mb-8">
          <div className="flex items-center justify-between mb-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span>Progress</span>
            <span className="text-foreground">{stats.done} / {stats.total}</span>
          </div>
          <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand to-brand-secondary transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          <StatBox n={stats.done} label="Done" tone="text-brand" />
          <StatBox n={stats.total} label="Topics" tone="text-foreground" />
          <StatBox n={stats.easy} label="Easy" tone="text-emerald-400" />
          <StatBox n={stats.med} label="Medium" tone="text-amber-400" />
          <StatBox n={stats.hard} label="Hard" tone="text-rose-400" />
          <StatBox n={`~${stats.totalH}h`} label="Total Time" tone="text-brand" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
            Priority-Based Topic Checklist
          </h2>
          <p className="text-sm text-muted-foreground">
            Topics ordered by recommended learning sequence. Expand each for details. Check off as
            you master them.
          </p>
        </div>

        <ul className="space-y-3">
          {topics.map((t) => {
            const isDone = done.has(t.order);
            const isOpen = expanded.has(t.order);
            const hasDetails =
              !!t.description ||
              !!t.resources?.length ||
              !!t.practice?.length ||
              !!t.interview?.length;
            return (
              <li
                key={t.order}
                className={`rounded-xl border transition-colors ${
                  isDone
                    ? "border-brand/40 bg-brand/[0.04]"
                    : "border-hairline hover:border-brand/30"
                }`}
              >
                <div className="flex items-start gap-4 p-5">
                  <button
                    type="button"
                    onClick={() => toggleDone(t.order)}
                    aria-label={isDone ? "Mark as not done" : "Mark as done"}
                    className="mt-0.5 shrink-0"
                  >
                    {isDone ? (
                      <CheckCircle2 className="size-5 text-brand" />
                    ) : (
                      <Circle className="size-5 text-muted-foreground hover:text-foreground transition-colors" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-2">
                      <h3
                        className={`font-medium ${
                          isDone ? "text-muted-foreground line-through" : "text-foreground"
                        }`}
                      >
                        <span className="text-muted-foreground font-mono text-sm mr-2">
                          {String(t.order).padStart(2, "0")}.
                        </span>
                        {t.name}
                      </h3>
                      {t._mustKnow && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand">
                          <Star className="size-3 fill-brand" /> Must Know
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge className={diffStyles[t._difficulty]}>{t._difficulty}</Badge>
                      <Badge className="bg-surface-2 text-muted-foreground border-hairline">
                        <Clock className="size-3" /> {t._hours}
                      </Badge>
                      <Badge className="bg-brand/10 text-brand border-brand/20">
                        Order #{t.order}
                      </Badge>
                      <Badge className={priorityStyles[t._priority]}>● {t._priority}</Badge>
                      <Badge className="bg-surface-2 text-muted-foreground border-hairline">
                        {t.stageTitle}
                      </Badge>
                    </div>
                  </div>
                  {hasDetails && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(t.order)}
                      aria-label={isOpen ? "Collapse" : "Expand"}
                      className="shrink-0 size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
                    >
                      <ChevronDown
                        className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>

                {isOpen && hasDetails && (
                  <div className="px-5 pb-5 pl-14 space-y-4 border-t border-hairline pt-4">
                    {t.description && (
                      <p className="text-sm text-muted-foreground">{t.description}</p>
                    )}
                    {t.resources && t.resources.length > 0 && (
                      <LinkGroup title="Resources" links={t.resources} accent />
                    )}
                    {t.practice && t.practice.length > 0 && (
                      <LinkGroup title="Practice" links={t.practice} />
                    )}
                    {t.interview && t.interview.length > 0 && (
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                          Interview
                        </div>
                        <ul className="space-y-1">
                          {t.interview.map((q) => (
                            <li key={q} className="text-xs text-muted-foreground flex gap-2">
                              <span className="text-brand">›</span> {q}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-16 flex justify-between border-t border-hairline pt-8">
          <Link to="/roadmaps" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
            <ArrowLeft className="size-4" /> All roadmaps
          </Link>
          <Link to="/projects" className="text-sm text-brand hover:text-brand-secondary inline-flex items-center gap-1.5">
            Browse projects <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function StatBox({ n, label, tone }: { n: number | string; label: string; tone: string }) {
  return (
    <div className="rounded-xl border border-hairline bg-surface-1/40 p-4 text-center">
      <div className={`text-2xl md:text-3xl font-semibold font-mono ${tone}`}>{n}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md border ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

function LinkGroup({
  title,
  links,
  accent,
}: {
  title: string;
  links: { label: string; url: string }[];
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map((r) => (
          <a
            key={r.url}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border ${
              accent
                ? "bg-brand/10 text-brand border-brand/20 hover:bg-brand/20"
                : "border-hairline hover:bg-accent text-muted-foreground"
            }`}
          >
            {r.label} <ExternalLink className="size-3" />
          </a>
        ))}
      </div>
    </div>
  );
}
