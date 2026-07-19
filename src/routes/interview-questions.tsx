import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/interview-questions")({
  head: () => ({
    meta: [
      { title: "Interview Questions — DataWithAarav" },
      { name: "description", content: "Curated data analyst interview questions in SQL, Python, Statistics, Excel, Power BI, Tableau, and HR." },
      { property: "og:title", content: "Data Analyst Interview Questions" },
      { property: "og:description", content: "Practice the questions actually asked at top data teams." },
    ],
  }),
  component: InterviewPage,
});

function InterviewPage() {
  return (
    <>
      <PageShell
        eyebrow="INTERVIEW PREP"
        title="Every question. Every category."
        description="Categorized from Beginner to Advanced. Click any question to reveal the answer."
      />
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="rounded-full bg-surface-2 p-6 mb-6">
            <Clock className="size-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Coming Soon</h2>
          <p className="text-muted-foreground max-w-md">
            We're curating the best interview questions from top companies. 
            Check back soon for SQL, Python, Statistics, Excel, Power BI, Tableau, and HR questions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <div className="px-4 py-2 rounded-lg border border-hairline text-sm text-muted-foreground">
              Statistics
            </div>
            <div className="px-4 py-2 rounded-lg border border-hairline text-sm text-muted-foreground">
              Excel
            </div>
            <div className="px-4 py-2 rounded-lg border border-hairline text-sm text-muted-foreground">
              SQL
            </div>
            <div className="px-4 py-2 rounded-lg border border-hairline text-sm text-muted-foreground">
              Python
            </div>
            <div className="px-4 py-2 rounded-lg border border-hairline text-sm text-muted-foreground">
              Power BI
            </div>
            <div className="px-4 py-2 rounded-lg border border-hairline text-sm text-muted-foreground">
              Tableau
            </div>
          </div>
        </div>
      </section>
    </>
  );
}