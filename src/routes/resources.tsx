import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { learningResources } from "@/lib/data";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Learning Resources — DataWithAarav" },
      { name: "description", content: "Docs, tutorials, and cheat sheets for every skill on the data analyst roadmap." },
      { property: "og:title", content: "Learning Resources — DataWithAarav" },
      { property: "og:description", content: "Hand-picked references and tutorials for every data analytics skill." },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <>
      <PageShell
        eyebrow="RESOURCES"
        title="Every reference you'll need."
        description="Official documentation, high-signal tutorials, and cheat sheets — organized by skill."
      />
      <section className="max-w-7xl mx-auto px-6 pb-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {learningResources.map((s) => (
          <div key={s.slug} className="p-6 rounded-2xl border border-hairline">
            <h2 className="text-foreground font-semibold mb-4">{s.title}</h2>
            <ul className="space-y-2">
              {s.items.map((it) => (
                <li key={it.url}>
                  <a
                    href={it.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
                  >
                    {it.label} <ExternalLink className="size-3" />
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