// src/routes/bi.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  Signal,
  Star,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  LayoutDashboard,
  Database,
  GitBranch,
  Box,
  FlaskRound,
  Workflow,
  Cloud,
  FileJson,
  Gauge,
  Presentation,
  Brain,
  Notebook,
  FileSearch,
  RefreshCw,
  Table2,
  Filter,
  Share2,
  Users,
  Target,
  TrendingUp,
  Layers,
  Palette,
  BookOpen,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/bi")({
  head: () => ({
    meta: [
      { title: "Power BI Mastery Checklist — DataWithAarav" },
      {
        name: "description",
        content:
          "The complete Power BI roadmap for aspiring data analysts — Phase 1 (0-2 yrs) and Phase 2 (2-3+ yrs), 30-60-90 plan, projects, interview questions, and real-world scenarios.",
      },
      { property: "og:title", content: "Power BI Mastery Checklist — DataWithAarav" },
      {
        property: "og:description",
        content:
          "Phase 1 and Phase 2 topics, must-know skills, DAX, Power Query, data modeling, interview prep, and a 30-60-90 day plan.",
      },
    ],
  }),
  component: BIRoadmap,
});

// ---------- Data ----------

type Diff = "Easy" | "Medium" | "Hard";
type Phase = "Phase 1" | "Phase 2";
type Priority = "Critical" | "High" | "Medium" | "Low";

interface Topic {
  order: number;
  name: string;
  difficulty: Diff;
  hours: string;
  phase: Phase;
  priority?: Priority;
  mustKnow?: boolean;
  mostCritical?: boolean;
  seniorLevel?: boolean;
}

const topics: Topic[] = [
  // Phase 1 Topics
  { order: 1, name: "Power BI Fundamentals — Interface, Navigation & Core Concepts", difficulty: "Easy", hours: "2–3 weeks", phase: "Phase 1", priority: "Critical", mustKnow: true, mostCritical: true },
  { order: 2, name: "Power Query — Data Transformation & ETL", difficulty: "Medium", hours: "3–4 weeks", phase: "Phase 1", priority: "Critical", mustKnow: true, mostCritical: true },
  { order: 3, name: "Data Modeling — Relationships, Star Schema & DAX Basics", difficulty: "Medium", hours: "3–4 weeks", phase: "Phase 1", priority: "Critical", mustKnow: true },
  { order: 4, name: "DAX Fundamentals — CALCULATE, FILTER, SUMX, COUNTROWS", difficulty: "Medium", hours: "4–5 weeks", phase: "Phase 1", priority: "Critical", mustKnow: true, mostCritical: true },
  { order: 5, name: "Visualization Basics — Charts, Formatting & Best Practices", difficulty: "Easy", hours: "2–3 weeks", phase: "Phase 1", priority: "Critical", mustKnow: true },
  { order: 6, name: "Report Design — Layout, Navigation & User Experience", difficulty: "Medium", hours: "2–3 weeks", phase: "Phase 1", priority: "High", mustKnow: true },
  { order: 7, name: "Filter Context & Row Context — DAX Execution", difficulty: "Hard", hours: "3–4 weeks", phase: "Phase 1", priority: "Critical", mustKnow: true },
  { order: 8, name: "Time Intelligence — YTD, MTD, QTD, Previous Periods", difficulty: "Hard", hours: "4–5 weeks", phase: "Phase 1", priority: "Critical", mustKnow: true },

  // Phase 2 Topics
  { order: 9, name: "Advanced DAX — Variables, Table Functions, Iterators", difficulty: "Hard", hours: "4–5 weeks", phase: "Phase 2", priority: "Critical", mustKnow: true },
  { order: 10, name: "Dashboard Design — Executive Dashboards, KPIs & Storytelling", difficulty: "Medium", hours: "3–4 weeks", phase: "Phase 2", priority: "High", mustKnow: true },
  { order: 11, name: "Row-Level Security — User-Based Data Filtering", difficulty: "Hard", hours: "2–3 weeks", phase: "Phase 2", priority: "High", mustKnow: true, seniorLevel: true },
  { order: 12, name: "Performance Optimization — DAX Studio, VertiPaq Analyzer", difficulty: "Hard", hours: "3–4 weeks", phase: "Phase 2", priority: "High", seniorLevel: true },
  { order: 13, name: "Power BI Service — Workspaces, Sharing, Deployment", difficulty: "Medium", hours: "3–4 weeks", phase: "Phase 2", priority: "Critical", mustKnow: true },
  { order: 14, name: "Data Integration — SQL, Excel, Python, APIs in Power BI", difficulty: "Medium", hours: "3–4 weeks", phase: "Phase 2", priority: "High", mustKnow: true },
  { order: 15, name: "Paginated Reports — SSRS Style Reporting in Power BI", difficulty: "Hard", hours: "2–3 weeks", phase: "Phase 2", priority: "Medium" },
  { order: 16, name: "Power BI + Python — Advanced Analytics & Visuals", difficulty: "Hard", hours: "3–4 weeks", phase: "Phase 2", priority: "High", seniorLevel: true },
  { order: 17, name: "Power BI + Excel — Bridge Between Tools", difficulty: "Medium", hours: "2–3 weeks", phase: "Phase 2", priority: "High", mustKnow: true },
  { order: 18, name: "Power BI Embedded — Custom Applications", difficulty: "Hard", hours: "3–4 weeks", phase: "Phase 2", priority: "Medium", seniorLevel: true },
  { order: 19, name: "Power BI REST API — Automation & Governance", difficulty: "Hard", hours: "2–3 weeks", phase: "Phase 2", priority: "High" },
  { order: 20, name: "Dataflows — Cloud-Based ETL in Power BI Service", difficulty: "Medium", hours: "2–3 weeks", phase: "Phase 2", priority: "Medium" },
];

const phase1Topics: { icon: any; title: string; items: string[] }[] = [
  {
    icon: LayoutDashboard,
    title: "Power BI Fundamentals",
    items: [
      "Understanding Power BI ecosystem: Desktop, Service, Mobile",
      "Connecting to data sources: Excel, CSV, SQL, Web",
      "Power BI interface: Visualizations, Fields, Filters panes",
      "Creating your first report from scratch",
      "Publishing and sharing reports",
      "Understanding workspaces and apps",
      "Power BI vs Power BI Pro vs Premium",
      "Installation and setup best practices",
    ],
  },
  {
    icon: RefreshCw,
    title: "Power Query — ETL Mastery",
    items: [
      "Connecting to multiple data sources",
      "Appending and merging queries",
      "Data cleaning: Remove duplicates, filter rows",
      "Data transformation: Split columns, pivot, unpivot",
      "M language basics — understanding the formula",
      "Parameterized queries for dynamic reporting",
      "Query folding — push transformations to source",
      "Creating reusable functions and templates",
    ],
  },
  {
    icon: Layers,
    title: "Data Modeling Fundamentals",
    items: [
      "Star schema design: Fact and Dimension tables",
      "Understanding relationships: 1:* and *:*",
      "Relationship directions and cross-filtering",
      "Creating calculated columns and measures",
      "Active vs Inactive relationships with USERELATIONSHIP",
      "Date table creation and marking as date table",
      "Understanding cardinality and filtering",
      "Data model normalization best practices",
    ],
  },
  {
    icon: BarChart3,
    title: "DAX Fundamentals",
    items: [
      "CALCULATE — The most important DAX function",
      "FILTER — Row-level filtering in CALCULATE",
      "SUMX, AVERAGEX — Iterator functions",
      "COUNTROWS, DISTINCTCOUNT — Counting patterns",
      "RELATED — Look up values from related tables",
      "Basic time intelligence: TOTALYTD, TOTALMTD",
      "Filter context vs Row context explained",
      "Using variables (VAR) for cleaner code",
    ],
  },
  {
    icon: PieChart,
    title: "Visualization Basics",
    items: [
      "Choosing the right chart for your data",
      "Bar, Line, Pie, Scatter — when to use each",
      "Conditional formatting for data-driven styling",
      "Adding slicers and filters for interactivity",
      "Using tooltips for detailed information",
      "Visualization formatting best practices",
      "Custom visuals from AppSource",
      "Drill-through and drill-down functionality",
    ],
  },
  {
    icon: Palette,
    title: "Report Design & UX",
    items: [
      "Creating a consistent theme and color palette",
      "Effective report navigation and bookmarks",
      "Layout best practices for executive dashboards",
      "Using buttons and shapes for interactivity",
      "Designing for mobile and desktop views",
      "Accessibility considerations in report design",
      "Storytelling with data in Power BI",
      "Performance considerations in report design",
    ],
  },
];

const phase2Topics: { icon: any; title: string; items: string[] }[] = [
  {
    icon: Brain,
    title: "Advanced DAX Patterns",
    items: [
      "Dynamic measure selection with Parameter tables",
      "Ranking and Top N analysis with RANKX",
      "Running totals and cumulative calculations",
      "Period-over-period comparisons: MoM, YoY, QoQ",
      "Parent-child hierarchies in DAX",
      "Using SWITCH for complex logical measures",
      "Advanced time intelligence with DATESINPERIOD",
      "Creating dynamic aggregations with CALCULATE",
    ],
  },
  {
    icon: Presentation,
    title: "Executive Dashboards",
    items: [
      "Executive dashboard design principles",
      "Creating KPI cards and scorecards",
      "Decomposition trees for root cause analysis",
      "Smart narratives and AI visuals",
      "Key Influencers visual for driver analysis",
      "Building operational dashboards for teams",
      "Strategic vs Tactical vs Operational dashboards",
      "Getting feedback and iterating on dashboards",
    ],
  },
  {
    icon: Users,
    title: "Row-Level Security (RLS)",
    items: [
      "Understanding RLS concepts and use cases",
      "Creating dynamic RLS rules with DAX",
      "Static RLS using roles and usernames",
      "Testing RLS in Power BI Desktop",
      "Managing RLS in Power BI Service",
      "RLS with Active Directory groups",
      "RLS for multi-tenant applications",
      "Performance implications of RLS",
    ],
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    items: [
      "Using DAX Studio for query performance analysis",
      "VertiPaq Analyzer for data model optimization",
      "Understanding storage engine and formula engine",
      "Optimizing DAX measures for speed",
      "Data reduction techniques: summarize, filter",
      "Understanding cardinality and its impact",
      "Performance best practices for large datasets",
      "Monitoring performance in Power BI Service",
    ],
  },
  {
    icon: Cloud,
    title: "Power BI Service & Governance",
    items: [
      "Workspace creation and management",
      "Creating and managing data pipelines",
      "Setting up scheduled data refresh",
      "Gateway configuration for on-premises data",
      "Power BI deployment pipelines",
      "Managing permissions and sharing",
      "Audit logs and governance best practices",
      "Understanding Power BI Premium capacity",
    ],
  },
  {
    icon: Database,
    title: "Data Integration & Sources",
    items: [
      "Connecting to SQL Server, Azure SQL, PostgreSQL",
      "Using DirectQuery vs Import mode",
      "Composite models: mixing DirectQuery and Import",
      "Python in Power BI for advanced analytics",
      "SQL queries in Power Query for complex data",
      "Connecting to APIs and web data sources",
      "Using Common Data Model and Dataverse",
      "Managing data source credentials securely",
    ],
  },
  {
    icon: TrendingUp,
    title: "Power BI + Advanced Analytics",
    items: [
      "Python visuals for custom charts and analysis",
      "Using R scripts in Power BI for statistics",
      "AI visuals: Key Influencers, Decomposition Tree",
      "Integration with Azure Cognitive Services",
      "Advanced forecasting with Python",
      "Anomaly detection in Power BI",
      "Machine learning integration with Azure ML",
      "Sentiment analysis in Power BI with Python",
    ],
  },
];

const interviewPhases = [
  {
    n: "1",
    title: "Foundation — Core Concepts Cold",
    when: "Week 1 · Daily 1.5 hrs",
    a: {
      title: "Must explain without hesitation",
      items: [
        "Power Query — what it is and why it matters",
        "Star schema vs Snowflake schema design",
        "CALCULATE — how it changes filter context",
        "Difference between calculated columns and measures",
        "Import vs DirectQuery — when to use each",
      ],
    },
    b: {
      title: "Practice method",
      items: [
        "Build a simple report from scratch in 30 minutes",
        "Create a date table and basic time intelligence",
        "Explain filter context to a non-technical person",
        "Practice DAX patterns without looking up syntax",
      ],
    },
  },
  {
    n: "2",
    title: "DAX & Data Modeling Sprint",
    when: "Week 2 · Daily 2 hrs",
    a: {
      title: "Master these patterns",
      items: [
        "CALCULATE with multiple filters and ALL",
        "Time intelligence: YTD, MTD, vs previous period",
        "Create dynamic measures with parameter tables",
        "Handle many-to-many relationships properly",
        "Use variables for better DAX performance",
      ],
    },
    b: {
      title: "Interview tips",
      items: [
        "Explain the difference between filter and row context",
        "Discuss when to use iterator functions (SUMX, AVERAGEX)",
        "Mention performance implications of DAX measures",
        "Always consider the data model before writing DAX",
      ],
    },
  },
  {
    n: "3",
    title: "Power Query & ETL",
    when: "Week 3 · Daily 1.5 hrs",
    a: {
      title: "Real-world ETL scenarios",
      items: [
        "Combine multiple Excel files with different schemas",
        "Handle slowly changing dimensions (SCD Type 1 and 2)",
        "Parametrize your queries for dynamic refresh",
        "Use query folding for performance optimization",
        "Create reusable functions for common transformations",
      ],
    },
    b: {
      title: "Standout elements",
      items: [
        "Show proficiency in M language queries",
        "Demonstrate understanding of query folding",
        "Handle errors and edge cases in data transformation",
        "Document and organize your queries well",
      ],
    },
  },
  {
    n: "4",
    title: "Service, Deployment & Advanced",
    when: "Week 4 · 4–6 hrs per task",
    a: {
      title: "Enterprise-level skills",
      items: [
        "Set up a scheduled refresh and manage credentials",
        "Implement Row-Level Security (RLS) with dynamic rules",
        "Deploy reports using Power BI deployment pipelines",
        "Optimize performance for a large dataset",
        "Create a paginated report with Power BI Report Builder",
      ],
    },
    b: {
      title: "Portfolio talking points",
      items: [
        "Real dashboard that saved stakeholders hours",
        'Quantify impact: "10-page manual report → 1-click dashboard"',
        "Mention handling of large datasets",
        "Showcase complex DAX measures you built",
      ],
    },
  },
];

const interviewQs: { section: string; items: string[] }[] = [
  {
    section: "Power Query & Data Preparation",
    items: [
      "What is Power Query and how does it differ from traditional Excel?",
      "Explain query folding and why it matters for performance.",
      "How would you combine data from 12 monthly Excel files with different headers?",
      "What is the M language and when would you write custom M code?",
      "How do you handle slowly changing dimensions in Power Query?",
      "What is the difference between appending and merging queries?",
    ],
  },
  {
    section: "Data Modeling",
    items: [
      "What is a star schema and why is it preferred in Power BI?",
      "Explain the difference between calculated columns and measures.",
      "What is filter context and how does it affect DAX calculations?",
      "How do you create a date table and why is it important?",
      "What are bidirectional relationships and when should you use them?",
      "Explain row context vs filter context with examples.",
    ],
  },
  {
    section: "DAX Fundamentals",
    items: [
      "What is CALCULATE and why is it the most important DAX function?",
      "Explain the difference between SUM and SUMX with examples.",
      "How would you calculate year-over-year growth in DAX?",
      "What is the difference between CALCULATE and FILTER?",
      "How do you create a running total in DAX?",
      "What are variables in DAX and why use them?",
    ],
  },
  {
    section: "Visualization & Design",
    items: [
      "How do you choose the right chart type for your data?",
      "What are your best practices for dashboard design?",
      "How would you create an executive dashboard with 5 KPIs?",
      "Explain bookmarks and how they improve user experience.",
      "What is drill-through functionality and how do you implement it?",
      "How do you design for both desktop and mobile viewing?",
    ],
  },
  {
    section: "Service & Deployment",
    items: [
      "How do you set up scheduled refresh for a Power BI dataset?",
      "What is Row-Level Security and how do you implement it?",
      "Explain the difference between workspaces and apps.",
      "How do you use deployment pipelines for CI/CD?",
      "What is a gateway and when is it needed?",
      "How do you monitor and optimize Power BI Service performance?",
    ],
  },
];

const learningPlan = [
  {
    phase: "Days 1–30",
    heading: "Phase 1 — Foundation",
    sub: "Power BI Basics, Power Query, Data Modeling, DAX Fundamentals",
    weeks: [
      { d: "Days 1–5", t: "Power BI Fundamentals", desc: "Interface, connecting to data, creating first report, understanding visuals" },
      { d: "Days 6–10", t: "Power Query — Data Transformation", desc: "Connect, clean, transform, append, merge, query folding basics" },
      { d: "Days 11–15", t: "Data Modeling — Star Schema, Relationships", desc: "Fact and dimension tables, relationships, calculated columns" },
      { d: "Days 16–20", t: "DAX Fundamentals", desc: "CALCULATE, FILTER, SUMX, COUNTROWS, basic time intelligence" },
      { d: "Days 21–25", t: "Visualization & Report Design", desc: "Charts, formatting, slicers, bookmarks, navigation" },
      { d: "Days 26–30", t: "Weekend Project", desc: "Build a sales dashboard: ETL → Model → DAX → Visuals" },
    ],
  },
  {
    phase: "Days 31–60",
    heading: "Phase 1 Complete — Advanced DAX & Design",
    sub: "Advanced DAX, Time Intelligence, Dashboard Design, Performance",
    weeks: [
      { d: "Days 31–36", t: "Advanced DAX — Time Intelligence", desc: "YTD, MTD, QTD, YoY, MoM, QoQ comparisons, PARALLELPERIOD" },
      { d: "Days 37–42", t: "Advanced DAX — Patterns", desc: "RANKX, TOPN, dynamic measures, parameter tables" },
      { d: "Days 43–48", t: "Executive Dashboard Design", desc: "KPI cards, scorecards, decomposition tree, storytelling" },
      { d: "Days 49–54", t: "Performance Optimization", desc: "DAX Studio, VertiPaq Analyzer, optimization techniques" },
      { d: "Days 55–60", t: "Project 2", desc: "Build an executive dashboard with advanced DAX measures" },
    ],
  },
  {
    phase: "Days 61–90",
    heading: "Phase 2 — Enterprise & Advanced",
    sub: "Power BI Service, RLS, Integration, Python, Advanced Analytics",
    weeks: [
      { d: "Days 61–66", t: "Power BI Service", desc: "Workspaces, publishing, refresh scheduling, gateway configuration" },
      { d: "Days 67–72", t: "Row-Level Security (RLS)", desc: "Dynamic RLS, static RLS, testing, governance" },
      { d: "Days 73–78", t: "Data Integration", desc: "SQL, Python, Excel, APIs, DirectQuery, composite models" },
      { d: "Days 79–84", t: "Power BI + Python", desc: "Python visuals, advanced analytics, forecasting" },
      { d: "Days 85–90", t: "Capstone Project", desc: "End-to-end enterprise dashboard: ETL → Model → RLS → Service" },
    ],
  },
];

const projects = [
  { code: "P1", tier: "Beginner", h: "4–6hrs", t: "Sales Performance Dashboard", d: "Connect to sales data, clean with Power Query, build star schema, create 10+ DAX measures, design interactive dashboard with slicers and drill-through." },
  { code: "P2", tier: "Beginner", h: "5–7hrs", t: "Financial Reporting Dashboard", d: "Import financial data, create P&L statements with DAX, build budget vs actual comparison, create variance analysis with conditional formatting." },
  { code: "P3", tier: "Intermediate", h: "6–8hrs", t: "HR Analytics Dashboard", d: "Connect to employee data, create headcount and attrition measures, build retention cohort analysis, design executive HR dashboard." },
  { code: "P4", tier: "Intermediate", h: "8–10hrs", t: "Customer 360 Dashboard", d: "Integrate data from multiple sources (CRM, sales, support), build 360-degree customer view with RFM segmentation, create customer journey visuals." },
  { code: "P5", tier: "Advanced", h: "10–12hrs", t: "Supply Chain Analytics Dashboard", d: "Connect to supply chain data sources, build inventory and order analytics, create supplier performance dashboard, implement RLS for supplier access." },
  { code: "P6", tier: "Advanced", h: "12–15hrs", t: "Enterprise Executive Dashboard", d: "Build comprehensive executive dashboard with 20+ KPIs, implement dynamic measures, optimize for performance, deploy to Power BI Service with RLS." },
  { code: "P7", tier: "Advanced", h: "15–20hrs", t: "Power BI + Python Advanced Analytics", d: "Integrate Python for predictive analytics in Power BI, build forecasting models, create custom visuals with matplotlib, deploy as paginated reports." },
];

const scenarios = [
  {
    icon: "📊",
    title: "Scenario 1 — 'Executive needs a weekly sales dashboard'",
    cols: [
      { h: "Requirements", items: ["Weekly sales by region and product", "YTD vs Budget comparison", "Current month performance", "Interactive filters by region", "Mobile-friendly design"] },
      { h: "Power BI solution", items: ["Connect to SQL sales database", "Power Query for data transformation", "Star schema with Date, Product, Region dims", "DAX measures for KPIs and time intelligence", "Bookmarks for executive navigation"] },
      { h: "Outcome", items: ["Single source of truth for sales", "30-min manual report → 1-click refresh", "Executive decision-making improved", "Version controlled with deployment pipelines"] },
    ],
  },
  {
    icon: "🔒",
    title: "Scenario 2 — 'Sales managers should only see their region'",
    cols: [
      { h: "Challenge", items: ["10+ regional sales managers", "Each should see only their region's data", "Executive should see all data", "Data security is critical"] },
      { h: "Power BI solution", items: ["Implement Row-Level Security (RLS)", "Dynamic rules based on user email", "Use USERPRINCIPALNAME() in DAX", "Create roles for each region", "Test RLS with 'View as Role' feature"] },
      { h: "Outcome", items: ["Data security without duplication", "Single report for all users", "Centralized management", "Audit-ready security controls"] },
    ],
  },
  {
    icon: "🚀",
    title: "Scenario 3 — '20M row dataset is too slow'",
    cols: [
      { h: "Symptom", items: ["Report takes 45 seconds to load", "Visuals are slow to respond", "Users are complaining", "Data grows 1M rows per month"] },
      { h: "Optimization", items: ["Analyze with DAX Studio and VertiPaq", "Reduce cardinality in key columns", "Aggregate data where possible", "Use summarized tables for dashboard", "Implement incremental refresh"] },
      { h: "Results", items: ["Load time: 45s → 3s", "Visuals respond instantly", "Users happy with performance", "Pattern reusable for other datasets"] },
    ],
  },
  {
    icon: "🔄",
    title: "Scenario 4 — 'Monthly reports are taking 4 days to prepare'",
    cols: [
      { h: "Current process", items: ["Data pulled from 5 systems", "Manual Excel consolidation", "Pivot tables and charts manually", "Report distributed via email", "Takes 4 days each month"] },
      { h: "Power BI solution", items: ["Connect directly to all data sources", "Power Query for ETL pipeline", "DAX for all calculations", "Automated refresh with gateway", "Publish to Power BI Service"] },
      { h: "Impact", items: ["4-day manual process → 1-hour review", "100% reduction in errors", "Real-time data availability", "Stakeholders self-serve insights"] },
    ],
  },
];

const bestPractices = [
  { h: "Data Modeling", items: ["Always use star schema — fact and dimension tables", "Create a separate date table for time intelligence", "Avoid bidirectional relationships when possible", "Use calculated columns sparingly — prefer measures", "Normalize dimensions to reduce redundancy", "Use surrogate keys for all dimension tables"] },
  { h: "DAX Performance", items: ["Use variables in DAX to reduce recalculation", "Avoid using FILTER inside CALCULATE when a simple filter works", "Use iterators (SUMX) only when necessary", "Pre-calculate in Power Query when possible", "Use DIVIDE instead of / to handle divide by zero", "Avoid using ALL in measures when not needed"] },
  { h: "Visualization", items: ["Choose the right chart for your data type", "Maintain consistent color palette across reports", "Use conditional formatting to highlight outliers", "Add clear titles and labels to all visuals", "Use tooltips for additional context", "Keep it simple — less is more"] },
  { h: "Power Query", items: ["Always use query folding when possible", "Remove unnecessary columns at source", "Filter rows as early as possible", "Create reusable functions for common transformations", "Parameterize your queries for flexibility", "Document all transformation steps clearly"] },
  { h: "Service & Governance", items: ["Set up scheduled refresh with proper credentials", "Use deployment pipelines for development → test → production", "Implement RLS for data security", "Monitor usage and performance metrics", "Set up data alerts for important KPIs", "Create and maintain data dictionaries"] },
  { h: "Code Organization", items: ["Organize DAX measures into folders in the model", "Use consistent naming conventions for measures", "Comment complex DAX formulas", "Group related queries in Power Query", "Maintain version control for .pbix files", "Document your data model design decisions"] },
];

const resources = [
  { h: "Official Microsoft Resources", items: [
    { l: "Power BI Documentation", u: "https://docs.microsoft.com/en-us/power-bi/" },
    { l: "DAX Reference Guide", u: "https://dax.guide/" },
    { l: "Power Query Documentation", u: "https://docs.microsoft.com/en-us/power-query/" },
    { l: "SQLBI — DAX Patterns", u: "https://www.sqlbi.com/dax-patterns/" },
  ]},
  { h: "Learning Platforms", items: [
    { l: "Microsoft Learn — Power BI", u: "https://learn.microsoft.com/en-us/training/powerplatform/power-bi" },
    { l: "DataCamp — Power BI Courses", u: "https://www.datacamp.com/categories/power-bi" },
    { l: "Coursera — Power BI Specialization", u: "https://www.coursera.org/specializations/power-bi-data-analytics" },
    { l: "Udemy — Power BI Courses", u: "https://www.udemy.com/topic/power-bi/" },
  ]},
  { h: "Community & Practice", items: [
    { l: "Power BI Community", u: "https://community.powerbi.com/" },
    { l: "PBIX Sample Reports", u: "https://learn.microsoft.com/en-us/power-bi/create-reports/sample-datasets" },
    { l: "DAX Studio — Performance Tool", u: "https://daxstudio.org/" },
    { l: "Power BI Tips", u: "https://www.powerbitips.com/" },
  ]},
];

// ---------- Component ----------

function parseHours(h: string) {
  const nums = h.match(/\d+/g)?.map(Number) ?? [];
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

const diffStyles: Record<Diff, string> = {
  Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const priorityStyles: Record<Priority, string> = {
  Critical: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  High: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Medium: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Low: "bg-muted/40 text-muted-foreground border-hairline",
};

const phaseStyles: Record<Phase, string> = {
  "Phase 1": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Phase 2": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

function BIRoadmap() {
  const storageKey = "roadmap-progress:bi";
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
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify([...done]));
    } catch {
      /* ignore */
    }
  }, [done, hydrated]);

  const toggleDone = (o: number) =>
    setDone((prev) => {
      const n = new Set(prev);
      n.has(o) ? n.delete(o) : n.add(o);
      return n;
    });

  const toggleExpand = (o: number) =>
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(o) ? n.delete(o) : n.add(o);
      return n;
    });

  const stats = useMemo(() => {
    const total = topics.length;
    const phase1 = topics.filter((t) => t.phase === "Phase 1").length;
    const phase2 = topics.filter((t) => t.phase === "Phase 2").length;
    const easy = topics.filter((t) => t.difficulty === "Easy").length;
    const med = topics.filter((t) => t.difficulty === "Medium").length;
    const hard = topics.filter((t) => t.difficulty === "Hard").length;
    const totalH = Math.round(topics.reduce((n, t) => n + parseHours(t.hours), 0));
    return { total, phase1, phase2, easy, med, hard, totalH, done: done.size };
  }, [done]);

  const progressPct = stats.total ? (stats.done / stats.total) * 100 : 0;

  return (
    <>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-6 animate-fade-up">
        <Link
          to="/roadmaps"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="size-3.5" /> All roadmaps
        </Link>
        <div className="text-xs font-mono uppercase tracking-widest text-brand mb-4">
          MASTERY CHECKLIST · POWER BI
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-3 text-gradient-brand">
          Power BI Mastery Checklist
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-6">
          The complete Power BI journey for aspiring data analysts. Phase 1 (0–2 yrs) and Phase 2 (2–3+ yrs) topics, 
          20 priority-ranked topics, a 30-60-90 day plan, 7 portfolio projects, real-world scenarios, and interview prep.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5"><Signal className="size-4" /> Beginner → Senior</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="size-4" /> ~250 hrs total</span>
          <span>Industry-focused · Interview-ready</span>
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

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-4">
          <StatBox n={stats.done} label="Done" tone="text-brand" />
          <StatBox n={stats.total} label="Topics" tone="text-foreground" />
          <StatBox n={stats.phase1} label="Phase 1" tone="text-blue-400" />
          <StatBox n={stats.phase2} label="Phase 2" tone="text-purple-400" />
          <StatBox n={stats.easy} label="Easy" tone="text-emerald-400" />
          <StatBox n={stats.med} label="Medium" tone="text-amber-400" />
          <StatBox n={stats.hard} label="Hard" tone="text-rose-400" />
        </div>
      </section>

      {/* Checklist */}
      <Section id="checklist" title="Priority-Based Topic Checklist" subtitle="Organized by Phase (1 and 2). Expand each for context; check off as you master them.">
        <ul className="space-y-3">
          {topics.map((t) => {
            const isDone = done.has(t.order);
            const isOpen = expanded.has(t.order);
            return (
              <li
                key={t.order}
                className={`rounded-xl border transition-colors ${
                  isDone ? "border-brand/40 bg-brand/[0.04]" : "border-hairline hover:border-brand/30"
                }`}
              >
                <div className="flex items-start gap-4 p-5">
                  <button
                    type="button"
                    onClick={() => toggleDone(t.order)}
                    aria-label={isDone ? "Mark not done" : "Mark done"}
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
                      <h3 className={`font-medium ${isDone ? "text-muted-foreground line-through" : "text-foreground"}`}>
                        <span className="text-muted-foreground font-mono text-sm mr-2">
                          {String(t.order).padStart(2, "0")}.
                        </span>
                        {t.name}
                      </h3>
                      {t.mostCritical && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-400">
                          <Star className="size-3 fill-rose-400" /> Most Critical
                        </span>
                      )}
                      {t.mustKnow && !t.mostCritical && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand">
                          <Star className="size-3 fill-brand" /> Must Know
                        </span>
                      )}
                      {t.seniorLevel && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-purple-400">
                          <Signal className="size-3" /> Senior Level
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge className={diffStyles[t.difficulty]}>{t.difficulty}</Badge>
                      <Badge className={phaseStyles[t.phase]}>{t.phase}</Badge>
                      <Badge className="bg-surface-2 text-muted-foreground border-hairline">
                        <Clock className="size-3" /> {t.hours}
                      </Badge>
                      <Badge className="bg-brand/10 text-brand border-brand/20">Order #{t.order}</Badge>
                      {t.priority && <Badge className={priorityStyles[t.priority]}>● {t.priority}</Badge>}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleExpand(t.order)}
                    aria-label={isOpen ? "Collapse" : "Expand"}
                    className="shrink-0 size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
                  >
                    <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
                {isOpen && (
                  <div className="px-5 pb-5 pl-14 border-t border-hairline pt-4 text-sm text-muted-foreground">
                    <p>Focus this session on <span className="text-foreground">{t.name}</span>.</p>
                    <p className="mt-1">Target study time: <span className="text-foreground">{t.hours}</span>.</p>
                    <p className="mt-1">Practice with real datasets and build reusable patterns.</p>
                    {t.phase === "Phase 1" && (
                      <p className="mt-1 text-blue-400">Phase 1 — foundation skills for 0–2 years experience.</p>
                    )}
                    {t.phase === "Phase 2" && (
                      <p className="mt-1 text-purple-400">Phase 2 — advanced skills for 2–3+ years experience.</p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Phase 1 Must Know */}
      <Section id="phase1" eyebrow="Phase 1 · 0–2 Years" title="Must Know for Early Data Analysts" subtitle="Core Power BI skills every data analyst must master in their first two years. Tested in interviews and used daily.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phase1Topics.map((g) => (
            <Card key={g.title} icon={<g.icon className="size-5 text-brand" />}>
              <h3 className="font-medium text-foreground mb-3">{g.title}</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {g.items.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-brand mt-1">›</span>{i}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Phase 2 Advanced */}
      <Section id="phase2" eyebrow="Phase 2 · 2–3+ Years" title="Advanced Power BI Skills for Senior Analysts" subtitle="Advanced DAX, RLS, Performance, Service, Python integration, and enterprise capabilities.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phase2Topics.map((g) => (
            <Card key={g.title} icon={<g.icon className="size-5 text-brand" />}>
              <h3 className="font-medium text-foreground mb-3">{g.title}</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {g.items.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-brand mt-1">›</span>{i}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* 30-60-90 plan */}
      <Section id="plan" eyebrow="Structured" title="30-60-90 Day Power BI Learning Plan" subtitle="For a working analyst putting in 2–3 hrs/day. Phase 1 in Days 1–60. Phase 2 in Days 61–90 and beyond.">
        <div className="space-y-6">
          {learningPlan.map((p) => (
            <div key={p.phase} className="rounded-2xl border border-hairline bg-surface-1/40 p-6">
              <div className="mb-4">
                <div className="text-xs font-mono uppercase tracking-widest text-brand">{p.phase}</div>
                <h3 className="text-xl font-semibold text-foreground mt-1">{p.heading}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.sub}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {p.weeks.map((w) => (
                  <div key={w.d} className="rounded-xl border border-hairline p-4 bg-surface-2/40">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{w.d}</div>
                    <div className="text-sm font-medium text-foreground mt-1">{w.t}</div>
                    <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{w.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Interview prep */}
      <Section id="interview" eyebrow="Interview Prep" title="4-Phase Interview Preparation Roadmap" subtitle="Expect live DAX exercises and data modeling scenarios — practice for speed and accuracy.">
        <div className="grid md:grid-cols-2 gap-4">
          {interviewPhases.map((p) => (
            <Card key={p.n}>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-2xl font-mono text-brand">{p.n}</span>
                <div>
                  <h3 className="font-medium text-foreground">{p.title}</h3>
                  <div className="text-xs text-muted-foreground">{p.when}</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                {[p.a, p.b].map((s) => (
                  <div key={s.title}>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      {s.title}
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {s.items.map((i) => (
                        <li key={i} className="flex gap-2"><span className="text-brand mt-1">›</span>{i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Interview Q */}
      <Section title="Top Power BI Interview Questions" subtitle="Common questions asked at data analyst interviews across tech, finance, and consulting.">
        <div className="grid md:grid-cols-2 gap-4">
          {interviewQs.map((s) => (
            <Card key={s.section}>
              <h3 className="font-medium text-foreground mb-3">{s.section}</h3>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                {s.items.map((q) => (
                  <li key={q} className="leading-relaxed">{q}</li>
                ))}
              </ol>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" eyebrow="Portfolio" title="Hands-On Projects & Portfolio Ideas" subtitle="Build these to prove real-world Power BI mastery. Each covers multiple topic areas.">
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <Card key={p.code}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-brand">{p.code}</span>
                <Badge className={p.tier === "Beginner" ? diffStyles.Easy : p.tier === "Intermediate" ? diffStyles.Medium : p.tier === "Advanced" ? diffStyles.Hard : "bg-rose-500/10 text-rose-400 border-rose-500/20"}>
                  {p.tier}
                </Badge>
                <Badge className="bg-surface-2 text-muted-foreground border-hairline">
                  <Clock className="size-3" /> {p.h}
                </Badge>
              </div>
              <h3 className="font-medium text-foreground mb-2">{p.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Scenarios */}
      <Section id="scenarios" eyebrow="Real-World" title="Business Scenarios You'll Actually Face" subtitle="Common asks from actual analyst roles. Know how to solve each end-to-end.">
        <div className="space-y-4">
          {scenarios.map((s) => (
            <div key={s.title} className="rounded-2xl border border-hairline bg-surface-1/40 p-6">
              <h3 className="font-medium text-foreground mb-4">
                <span className="mr-2">{s.icon}</span>{s.title}
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {s.cols.map((c) => (
                  <div key={c.h}>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      {c.h}
                    </div>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {c.items.map((i) => (
                        <li key={i} className="flex gap-2"><span className="text-brand mt-1">›</span>{i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Best practices */}
      <Section id="best-practices" eyebrow="Standards" title="Power BI Best Practices Used at Companies" subtitle="Standards followed by professional analysts at product companies, consulting firms, and data-driven enterprises.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bestPractices.map((b) => (
            <Card key={b.h}>
              <h3 className="font-medium text-foreground mb-3">{b.h}</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {b.items.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-brand mt-1">›</span>{i}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Resources */}
      <Section id="resources" eyebrow="Level Up" title="Power BI Learning Resources">
        <div className="grid md:grid-cols-3 gap-4">
          {resources.map((r) => (
            <Card key={r.h}>
              <h3 className="font-medium text-foreground mb-3">{r.h}</h3>
              <ul className="space-y-2 text-sm">
                {r.items.map((i) => (
                  <li key={i.u}>
                    <a
                      href={i.u}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:text-brand-secondary underline-offset-4 hover:underline"
                    >
                      {i.l} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="mt-8 flex items-center justify-between border-t border-hairline pt-8">
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

// ---------- Small helpers ----------

function Section({
  id,
  title,
  subtitle,
  eyebrow,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="max-w-5xl mx-auto px-6 py-14 border-t border-hairline">
      <div className="mb-8">
        {eyebrow && (
          <div className="text-xs font-mono uppercase tracking-widest text-brand mb-2">{eyebrow}</div>
        )}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Card({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface-1/40 p-5 hover:border-brand/30 transition-colors">
      {icon && <div className="mb-3">{icon}</div>}
      {children}
    </div>
  );
}

function StatBox({ n, label, tone }: { n: number | string; label: string; tone: string }) {
  return (
    <div className="rounded-xl border border-hairline bg-surface-1/40 p-4 text-center">
      <div className={`text-2xl md:text-3xl font-semibold font-mono ${tone}`}>{n}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md border ${className ?? ""}`}>
      {children}
    </span>
  );
}