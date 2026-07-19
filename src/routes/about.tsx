import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DataWithAarav" },
      { name: "description", content: "Why DataWithAarav exists, who it's for, and what's coming next." },
      { property: "og:title", content: "About DataWithAarav" },
      { property: "og:description", content: "A free, open roadmap for aspiring data analysts." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageShell
        eyebrow="ABOUT"
        title="A free, open roadmap for aspiring data analysts."
        description="DataWithAarav exists because the internet is full of scattered advice and paid bootcamps. This is neither."
      />
      <section className="max-w-3xl mx-auto px-6 pb-16 space-y-10">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-3">Our mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Give anyone — regardless of background or budget — a clear, structured path to becoming a
            data analyst. No paywalls. No fluff. Just the curriculum that actually gets people hired.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-3">Why this roadmap exists</h2>
          <p className="text-muted-foreground leading-relaxed">
            Most learners waste months bouncing between courses without knowing what to learn next.
            DataWithAarav answers three questions on every step: what to learn, why it matters, and
            where to practice it.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-3">Who it's for</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-2"><span className="text-brand">›</span> Students choosing a first career in data.</li>
            <li className="flex gap-2"><span className="text-brand">›</span> Career-switchers moving from ops, finance, marketing, or engineering.</li>
            <li className="flex gap-2"><span className="text-brand">›</span> Self-taught analysts filling in gaps.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-3">What's next</h2>
          <p className="text-muted-foreground leading-relaxed">
            Deeper roadmaps for Data Engineering and Analytics Engineering, more community projects,
            and a curated interview vault built from real hiring loops.
          </p>
        </div>

        <div className="pt-4">
          <Link
            to="/roadmaps"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90"
          >
            Start with the roadmaps <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}