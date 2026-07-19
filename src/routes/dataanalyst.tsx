import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  ArrowRight, 
  Clock, 
  Signal, 
  CheckCircle2, 
  Target,
  BookOpen,
  TrendingUp,
  Database,
  Code,
  BarChart3,
  Presentation,
  FolderGit2,
  Award,
  Briefcase
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";

// Create the route at /dataanalyst
export const Route = createFileRoute("/dataanalyst")({
  head: () => ({
    meta: [
      { title: "Data Analyst Roadmap — DataWithAarav" },
      { name: "description", content: "A step-by-step path to become a data analyst. Nine-stage roadmap covering skills, tools, and career steps." },
      { property: "og:title", content: "Data Analyst Roadmap — DataWithAarav" },
      { property: "og:description", content: "From beginner to hired data analyst - a structured learning path." },
    ],
  }),
  component: DataAnalystPage,
});

// Stage data
const stages = [
  {
    id: 1,
    icon: TrendingUp,
    title: "Probability & Statistics",
    whyItMatters: "You need this to understand trends, outliers, probability, and the story behind your data. Without it, even advanced dashboards or ML models won't make sense — this is the foundation everything else is built on.",
    whatToLearn: [
      "Descriptive statistics: mean, median, mode, range, variance, standard deviation",
      "Probability basics: independent and dependent events, permutations, combinations",
      "Distributions: normal, binomial, Poisson",
      "Hypothesis testing: null vs. alternate hypothesis, p-value, confidence intervals",
      "Correlation and regression: simple and multiple linear regression"
    ],
    difficulty: "Beginner",
    estimatedTime: "2-3 weeks"
  },
  {
    id: 2,
    icon: BarChart3,
    title: "Excel",
    whyItMatters: "Excel builds your data problem-solving mindset — it's the natural starting point for non-programmers before jumping into code. It teaches you to think in terms of data cleaning, visualization, and logic building, skills that transfer directly to SQL and Python later.",
    whatToLearn: [
      "Data cleaning and formatting",
      "Pivot tables, filters, conditional formatting",
      "Formulas: VLOOKUP, INDEX, MATCH, IF, SUMIFS, COUNTIFS",
      "Charts and dashboards",
      "Simple regression using the Excel Data Analysis Toolpak"
    ],
    difficulty: "Beginner",
    estimatedTime: "2-3 weeks"
  },
  {
    id: 3,
    icon: Database,
    title: "SQL (Structured Query Language)",
    whyItMatters: "SQL is the language of data. Every analyst uses it daily to pull, join, and transform data directly from databases — it's often the very first technical skill employers screen for.",
    whatToLearn: [
      "SELECT, WHERE, ORDER BY, GROUP BY, HAVING",
      "Joins: inner, left, right, full",
      "Subqueries and CTEs",
      "Aggregate functions: SUM, COUNT, AVG, MIN, MAX",
      "Window functions: ROW_NUMBER, RANK, LAG, LEAD",
      "CASE WHEN and conditional logic"
    ],
    difficulty: "Intermediate",
    estimatedTime: "3-4 weeks"
  },
  {
    id: 4,
    icon: Code,
    title: "Python & Libraries",
    whyItMatters: "Python is the bridge between data analysis and automation or AI. You'll use it for deeper analysis, scripting, and even automating dashboards and reports — the skill that takes you beyond what Excel and SQL alone can do.",
    whatToLearn: [
      "Python basics: variables, loops, functions, lists, dictionaries",
      "Libraries for data analysis: pandas — data manipulation, numpy — numerical analysis, matplotlib, seaborn, plotly — visualization",
      "Data cleaning and transformation",
      "Exploratory data analysis (EDA)",
      "Working with CSV, Excel, and SQL data",
      "Introduction to APIs and web scraping"
    ],
    difficulty: "Intermediate",
    estimatedTime: "4-6 weeks"
  },
  {
    id: 5,
    icon: BarChart3,
    title: "Visualization Tools",
    whyItMatters: "You need to communicate insights visually. Learning one visualization tool deeply is enough to showcase in your portfolio — depth beats breadth here.",
    whatToLearn: [
      "Choose one: Power BI (Microsoft ecosystem) or Tableau (more visual flexibility)",
      "Importing and cleaning data",
      "Creating bar, line, pie, map, and KPI charts",
      "Calculated fields and parameters",
      "Dashboard design and storytelling",
      "Publishing and sharing reports"
    ],
    difficulty: "Intermediate",
    estimatedTime: "3-4 weeks"
  },
  {
    id: 6,
    icon: Presentation,
    title: "Presentation & Communication Skills",
    whyItMatters: "You'll often present to non-technical stakeholders. This step helps you bridge the gap between data and decision-making — a technically perfect analysis that no one can act on has little value.",
    whatToLearn: [
      "Storytelling with data (setup → insight → impact)",
      "Slide and dashboard design principles",
      "Explaining technical concepts simply",
      "Report writing and summarization"
    ],
    difficulty: "All Levels",
    estimatedTime: "Ongoing"
  },
  {
    id: 7,
    icon: FolderGit2,
    title: "Projects & Portfolio",
    whyItMatters: "Recruiters don't hire learners — they hire problem solvers. Your portfolio is the proof that you can do real-world analysis, not just follow tutorials.",
    whatToLearn: [
      "Projects using real data (Kaggle, Google Dataset Search)",
      "Power BI or Tableau dashboards, published online",
      "Python notebooks on GitHub or Google Colab",
      "Case studies written like business problems",
      "A resume tailored to data analyst roles",
      "LinkedIn and GitHub portfolio, kept in sync"
    ],
    difficulty: "All Levels",
    estimatedTime: "2-4 weeks"
  },
  {
    id: 8,
    icon: Award,
    title: "Certifications",
    whyItMatters: "Certifications validate your skills and boost your resume's credibility, especially useful for standing out to recruiters and ATS filters when you don't yet have work experience.",
    whatToLearn: [
      "Google Data Analytics",
      "Microsoft PL-300",
      "IBM Data Analyst",
      "Tableau Desktop Specialist"
    ],
    difficulty: "All Levels",
    estimatedTime: "2-4 weeks each"
  },
  {
    id: 9,
    icon: Briefcase,
    title: "Get Hired",
    whyItMatters: "This is where everything comes together — turning your skills and portfolio into an actual job offer.",
    whatToLearn: [
      "Resume and LinkedIn optimization",
      "Interview preparation",
      "Case study rounds",
      "Job search strategy",
      "Networking"
    ],
    difficulty: "All Levels",
    estimatedTime: "Ongoing"
  }
];

function DataAnalystPage() {
  return (
    <>
      <PageShell
        eyebrow="CAREER PATH"
        title="Data Analyst Roadmap"
        description="A step-by-step path to become a data analyst. Nine stages covering the skills, tools, and career steps to go from beginner to hired."
      />
      
      <section className="max-w-7xl mx-auto px-6 pb-16">
        {/* Progress Overview */}
        <div className="mb-12 p-6 rounded-2xl border border-hairline bg-surface-1/50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Target className="size-5 text-brand" />
                <span className="text-sm font-medium">9 Stages</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-brand" />
                <span className="text-sm font-medium">~4-6 Months</span>
              </div>
              <div className="flex items-center gap-2">
                <Signal className="size-5 text-brand" />
                <span className="text-sm font-medium">Beginner to Job Ready</span>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-brand/10 text-brand border border-brand/20">
                Updated 2026
              </span>
            </div>
          </div>
        </div>

        {/* Stages Grid */}
        <div className="space-y-6">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.id}
                className="group p-7 rounded-2xl border border-hairline hover:border-brand/40 hover:-translate-y-0.5 transition-all bg-surface-1/30 hover:bg-surface-1/60"
              >
                <div className="flex items-start gap-5">
                  {/* Stage Number */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-semibold text-sm">
                      {stage.id}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <Icon className="size-5 text-brand" />
                        <h2 className="text-xl font-semibold text-foreground">
                          {stage.title}
                        </h2>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-surface-2 border border-hairline">
                          <Signal className="size-3.5" /> {stage.difficulty}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-surface-2 border border-hairline">
                          <Clock className="size-3.5" /> {stage.estimatedTime}
                        </span>
                      </div>
                    </div>

                    {/* Why It Matters */}
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1.5">Why it matters</h3>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {stage.whyItMatters}
                      </p>
                    </div>

                    {/* What to Learn */}
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">What to learn</h3>
                      <ul className="space-y-1.5">
                        {stage.whatToLearn.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-foreground/70 leading-relaxed">
                            <CheckCircle2 className="size-4 text-brand mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}