import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { practiceResources } from "@/lib/data";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice — DataWithAarav" },
      { name: "description", content: "The best free platforms to practice SQL, Python, Excel, Statistics, Power BI, and Tableau." },
      { property: "og:title", content: "Practice — DataWithAarav" },
      { property: "og:description", content: "Sharpen every skill on curated practice platforms." },
    ],
  }),
  component: PracticePage,
});

function PracticePage() {
  return (
    <>
      <PageShell
        eyebrow="PRACTICE"
        title="The best places to practice — hand-picked."
        description="Reading is not enough. Pick a platform below and start solving problems today."
      />
      <section className="max-w-7xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-5">
        {practiceResources.map((s) => (
          <div key={s.slug} className="p-6 rounded-2xl border border-hairline">
            <h2 className="text-foreground font-semibold mb-4">{s.title}</h2>
            <ul className="divide-y divide-hairline">
              {s.items.map((it) => (
                <li key={it.url}>
                  <a
                    href={it.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-3 group"
                  >
                    <span className="text-sm text-muted-foreground group-hover:text-foreground">{it.label}</span>
                    <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-brand" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}