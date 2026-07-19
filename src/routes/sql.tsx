import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  Ban,
  BarChart3,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  Cloud,
  CreditCard,
  Database,
  DollarSign,
  Factory,
  FileText,
  Hammer,
  Laptop,
  Layers,
  Link2,
  ListOrdered,
  type LucideIcon,
  Megaphone,
  Package,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Shuffle,
  Signal,
  Smartphone,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/sql")({
  head: () => ({
    meta: [
      { title: "SQL Mastery Checklist — Data Analyst Roadmap" },
      {
        name: "description",
        content:
          "The complete SQL roadmap for aspiring data analysts — 32 priority-based topics, query patterns, 30-60-90 plan, projects, interview questions, and real-world scenarios.",
      },
      { property: "og:title", content: "SQL Mastery Checklist — Data Analyst Roadmap" },
      {
        property: "og:description",
        content:
          "32 priority-ranked topics, must-know skills, window functions, projects, interview prep, and a 30-60-90 day plan.",
      },
    ],
  }),
  component: SQLRoadmap,
});

// ---------- Data ----------

type Diff = "Easy" | "Medium" | "Hard";
type Priority = "Critical" | "High" | "Medium" | "Low";

interface Topic {
  order: number;
  name: string;
  difficulty: Diff;
  hours: string;
  priority?: Priority;
  mustKnow?: boolean;
  mostCritical?: boolean;
}

const topics: Topic[] = [
  { order: 1, name: "SELECT, FROM, WHERE — SQL Core Syntax", difficulty: "Easy", hours: "2–3 hrs", priority: "Critical", mustKnow: true, mostCritical: true },
  { order: 2, name: "Filtering & Conditional Logic — AND, OR, IN, BETWEEN, LIKE, CASE WHEN", difficulty: "Easy", hours: "3–4 hrs", priority: "Critical", mustKnow: true },
  { order: 3, name: "Aggregate Functions — COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING", difficulty: "Easy", hours: "3–4 hrs", priority: "Critical", mustKnow: true },
  { order: 4, name: "SQL Joins — INNER, LEFT, RIGHT, FULL, SELF, CROSS", difficulty: "Medium", hours: "6–8 hrs", priority: "Critical", mustKnow: true, mostCritical: true },
  { order: 5, name: "NULL Handling & Data Cleaning in SQL", difficulty: "Easy", hours: "3–4 hrs", priority: "Critical", mustKnow: true },
  { order: 6, name: "Subqueries & Correlated Subqueries", difficulty: "Medium", hours: "4–5 hrs", priority: "High", mustKnow: true },
  { order: 7, name: "CTEs (Common Table Expressions) — WITH Clause", difficulty: "Medium", hours: "4–5 hrs", priority: "Critical", mustKnow: true },
  { order: 8, name: "Window Functions — ROW_NUMBER, RANK, LEAD, LAG, Running Totals", difficulty: "Hard", hours: "5–6 hrs", priority: "Critical", mustKnow: true, mostCritical: true },
  { order: 9, name: "Date & Time Functions — DATE_TRUNC, DATEDIFF, EXTRACT, Time Series", difficulty: "Medium", hours: "4–5 hrs", priority: "Critical", mustKnow: true },
  { order: 10, name: "String Functions — CONCAT, SUBSTRING, TRIM, LOWER, REPLACE, REGEXP", difficulty: "Easy", hours: "3–4 hrs", priority: "High", mustKnow: true },
  { order: 11, name: "UNION, UNION ALL, INTERSECT, EXCEPT — Set Operations", difficulty: "Easy", hours: "2–3 hrs", priority: "High", mustKnow: true },
  { order: 12, name: "Views, Temp Tables & Materialized Views", difficulty: "Medium", hours: "3–4 hrs", priority: "High", mustKnow: true },
  { order: 13, name: "Cohort Analysis SQL — Retention & Lifetime Value", difficulty: "Hard", hours: "6–8 hrs", priority: "Critical", mustKnow: true },
  { order: 14, name: "Funnel Analysis SQL — Conversion & Drop-off", difficulty: "Hard", hours: "5–6 hrs", priority: "High" },
  { order: 15, name: "Customer Segmentation SQL — RFM & Behavioral", difficulty: "Hard", hours: "5–6 hrs", priority: "High" },
  { order: 16, name: "Revenue & KPI Analytics SQL", difficulty: "Medium", hours: "5–6 hrs", priority: "High" },
  { order: 17, name: "Query Optimization & Execution Plans", difficulty: "Hard", hours: "6–8 hrs", priority: "Critical" },
  { order: 18, name: "Indexing Fundamentals for Analysts", difficulty: "Medium", hours: "3–4 hrs", priority: "High" },
  { order: 19, name: "Data Warehouse Concepts — Star Schema, Fact/Dim Tables, OLAP vs OLTP", difficulty: "Medium", hours: "4–5 hrs", priority: "High" },
  { order: 20, name: "Product Analytics SQL — DAU, MAU, Engagement Metrics", difficulty: "Hard", hours: "5–6 hrs", priority: "High" },
  { order: 21, name: "Finance Analytics SQL — P&L, Revenue, Cost Analysis", difficulty: "Hard", hours: "5–6 hrs", priority: "High" },
  { order: 22, name: "Marketing Analytics SQL — Campaign, Attribution & CAC", difficulty: "Medium", hours: "4–5 hrs", priority: "High" },
  { order: 23, name: "Logistics & Operations Analytics SQL", difficulty: "Medium", hours: "4–5 hrs", priority: "High" },
  { order: 24, name: "Advanced CASE WHEN — Pivoting & Conditional Aggregation", difficulty: "Medium", hours: "3–4 hrs", priority: "High" },
  { order: 25, name: "Advanced Window Frame Clauses — ROWS BETWEEN, RANGE BETWEEN", difficulty: "Hard", hours: "4–5 hrs", priority: "High" },
  { order: 26, name: "SQL for Dashboard Reporting — Reporting-Ready Queries", difficulty: "Medium", hours: "4–5 hrs", priority: "High" },
  { order: 27, name: "PIVOT / UNPIVOT & Dynamic SQL Concepts", difficulty: "Hard", hours: "4–5 hrs", priority: "High" },
  { order: 28, name: "Cloud SQL Platforms — BigQuery, Redshift, Snowflake, Databricks", difficulty: "Medium", hours: "5–6 hrs", priority: "High" },
  { order: 29, name: "ETL / ELT SQL Patterns — Data Pipeline Queries", difficulty: "Hard", hours: "5–6 hrs", priority: "High" },
  { order: 30, name: "Stored Procedures & User-Defined Functions", difficulty: "Hard", hours: "4–5 hrs", priority: "High" },
  { order: 31, name: "SQL for A/B Testing & Experimentation", difficulty: "Hard", hours: "5–6 hrs", priority: "High" },
  { order: 32, name: "Advanced Analytical Patterns — Sessionization, Gap-and-Island, Running Balance", difficulty: "Hard", hours: "5–6 hrs", priority: "High" },
];

interface IconGroup {
  title: string;
  icon: LucideIcon;
  items: string[];
}

const mustKnowGroups: IconGroup[] = [
  {
    title: "Query Fundamentals",
    icon: Database,
    items: [
      "SELECT with explicit columns (never SELECT *)",
      "WHERE with all filter operators",
      "GROUP BY + HAVING for aggregations",
      "ORDER BY with multiple columns",
      "LIMIT for sampling and testing",
      "Aliases for readability",
    ],
  },
  {
    title: "Joins (Most Critical)",
    icon: Link2,
    items: [
      "INNER JOIN — matching rows only",
      "LEFT JOIN — preserve all left rows",
      "Anti-join pattern (LEFT JOIN + WHERE IS NULL)",
      "Multi-table joins (3+ tables)",
      "Validate row counts before/after every join",
    ],
  },
  {
    title: "Aggregation",
    icon: BarChart3,
    items: [
      "COUNT(*) vs COUNT(col) vs COUNT(DISTINCT)",
      "SUM, AVG, MIN, MAX",
      "GROUP BY with correct column rules",
      "HAVING for post-aggregation filters",
      "Conditional aggregation with CASE WHEN + SUM",
    ],
  },
  {
    title: "Date Operations",
    icon: Calendar,
    items: [
      "DATE_TRUNC for period grouping",
      "DATEDIFF for interval calculation",
      "EXTRACT for year, month, day of week",
      "Filter on date range: > AND <",
      "CURRENT_DATE / NOW() for relative dates",
    ],
  },
  {
    title: "Query Structure",
    icon: Layers,
    items: [
      "CTEs (WITH clause) for readability",
      "Subqueries in FROM and WHERE",
      "UNION ALL for combining datasets",
      "CASE WHEN for conditional logic",
      "NULL handling: IS NULL, COALESCE, NULLIF",
    ],
  },
  {
    title: "Window Functions (Senior-Level)",
    icon: AppWindow,
    items: [
      "ROW_NUMBER() for deduplication and ranking",
      "RANK/DENSE_RANK for leaderboards",
      "LAG/LEAD for period-over-period",
      "SUM() OVER for running totals",
      "PARTITION BY vs GROUP BY distinction",
    ],
  },
];

const queryPatterns: IconGroup[] = [
  {
    title: "Running & Rolling Calculations",
    icon: TrendingUp,
    items: [
      `SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total`,
      `AVG(daily_revenue) OVER (ORDER BY report_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS rolling_7d_avg`,
      `ROUND((revenue - LAG(revenue) OVER(ORDER BY month)) / NULLIF(LAG(revenue) OVER(ORDER BY month), 0) * 100, 2) AS mom_growth_pct`,
      `ROUND(revenue / SUM(revenue) OVER(PARTITION BY category) * 100, 2) AS pct_of_category`,
    ],
  },
  {
    title: "Ranking Functions",
    icon: ListOrdered,
    items: [
      `ROW_NUMBER(): always unique — 1, 2, 3 even on ties`,
      `RANK(): gaps on ties — 1, 1, 3`,
      `DENSE_RANK(): no gaps on ties — 1, 1, 2`,
      `NTILE(4): bucket rows into quartiles 1–4`,
      `PERCENT_RANK(): 0 to 1 percentile rank`,
      `CUME_DIST(): cumulative distribution 0–1`,
    ],
  },
  {
    title: "Navigation Functions",
    icon: Shuffle,
    items: [
      `LAG(col, 1): value from previous row (MoM comparison)`,
      `LEAD(col, 1): value from next row (next-period preview)`,
      `FIRST_VALUE(col): first value in window (first order date)`,
      `LAST_VALUE(col) OVER (... ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)`,
      `NTH_VALUE(col, n): nth value in window`,
    ],
  },
  {
    title: "Common Window Patterns",
    icon: ListOrdered,
    items: [
      `Deduplication: ROW_NUMBER() PARTITION BY key ORDER BY updated_at DESC — WHERE rn = 1`,
      `Top-N per group: RANK() PARTITION BY category ORDER BY revenue DESC — WHERE rnk <= 3`,
      `MoM growth: LAG(revenue) OVER (ORDER BY month) — calculate % change`,
      `First-purchase flag: ROW_NUMBER() PARTITION BY customer ORDER BY order_date — WHERE rn = 1`,
      `% of total: SUM(revenue) OVER () as denominator (no PARTITION)`,
    ],
  },
];

const businessPatterns: IconGroup[] = [
  {
    title: "E-Commerce Analytics",
    icon: ShoppingCart,
    items: [
      "Revenue by category, brand, channel",
      "Average basket size and average order value",
      "Repeat purchase rate: customers with 2+ orders / total",
      "Cart abandonment: added to cart but no purchase",
      "Product affinity: frequently bought together",
      "Discount impact on margin",
    ],
  },
  {
    title: "SaaS/Subscription",
    icon: CreditCard,
    items: [
      "MRR: SUM of recurring revenue this month",
      "Churn rate: cancelled / start-of-period customers",
      "Expansion MRR: upgrades within period",
      "Net Revenue Retention (NRR)",
      "Trial-to-paid conversion rate",
      "Feature adoption by plan tier",
    ],
  },
  {
    title: "Mobile/App Analytics",
    icon: Smartphone,
    items: [
      "DAU/MAU ratio (stickiness)",
      "Day-1/7/30 retention after install",
      "Session duration distribution",
      "Push notification click-through rate",
      "User path analysis (event sequences)",
      "Crash / error rate per app version",
    ],
  },
  {
    title: "Finance Analytics",
    icon: DollarSign,
    items: [
      "Gross margin %: (Rev - COGS) / Rev",
      "Accounts receivable aging buckets",
      "Budget vs Actual variance",
      "Cash conversion cycle",
      "Revenue by cost centre and GL code",
      "YoY and MoM revenue trends",
    ],
  },
  {
    title: "Logistics Analytics",
    icon: Package,
    items: [
      "On-time delivery rate by carrier",
      "Average lead time by route/region",
      "SLA breach count and % by week",
      "Return rate by product category",
      "Inventory turnover and stockout flags",
      "Warehouse throughput by shift",
    ],
  },
  {
    title: "Marketing Analytics",
    icon: Megaphone,
    items: [
      "Cost per acquisition by channel",
      "Campaign ROI: (Rev - Spend) / Spend",
      "Email conversion rate by segment",
      "Attribution modelling (first/last touch)",
      "ROAS by ad set and audience",
      "Multi-touch attribution with window functions",
    ],
  },
];

const interviewPhases = [
  {
    n: "1",
    title: "Foundation — Core SQL Cold",
    when: "Week 1 · Daily 1.5 hrs",
    a: {
      title: "Must write from memory",
      items: [
        "INNER JOIN, LEFT JOIN, anti-join pattern",
        "GROUP BY + HAVING with aggregate filter",
        "CASE WHEN for segmentation",
        "CTE with 2+ steps",
        "ROW_NUMBER() deduplication",
      ],
    },
    b: {
      title: "Practice method",
      items: [
        "LeetCode SQL — Medium difficulty, timed",
        "Write solution, then optimize it",
        "Narrate your thinking out loud",
        "stratascratch.com for real company questions",
      ],
    },
  },
  {
    n: "2",
    title: "Window Functions Sprint",
    when: "Week 2 · Daily 2 hrs",
    a: {
      title: "Master these patterns",
      items: [
        "ROW_NUMBER() deduplication",
        "RANK/DENSE_RANK for leaderboards and Top-N",
        "LAG for MoM/YoY comparison",
        "SUM OVER for running totals",
        "Rolling 7-day average with frame clause",
        "FIRST_VALUE for first-touch attribution",
      ],
    },
    b: {
      title: "Interview tips",
      items: [
        "Explain PARTITION BY vs GROUP BY when asked",
        "Mention ROW_NUMBER vs RANK difference proactively",
        "Discuss frame clause (ROWS BETWEEN) for rolling calcs",
        "Note that window functions can't be used in WHERE — use CTE",
      ],
    },
  },
  {
    n: "3",
    title: "Business Analytics Problems",
    when: "Week 3 · Daily 1.5 hrs",
    a: {
      title: "Common scenario questions",
      items: [
        "Write a cohort retention query for monthly signups",
        "Find the 2nd highest salary in each department",
        "Calculate 7-day rolling average of daily revenue",
        "Find customers who placed an order in Jan but not Feb",
        "Write a funnel query for our sign-up flow",
      ],
    },
    b: {
      title: "Answer framework",
      items: [
        "Restate the question + clarify assumptions",
        "Describe your approach before coding",
        "Build step-by-step using CTEs",
        "Test with edge cases: NULLs, duplicates, empty groups",
        "Mention performance considerations at the end",
      ],
    },
  },
  {
    n: "4",
    title: "Top 40 Interview Questions",
    when: "Week 4 · Daily 1 hr",
    a: {
      title: "Fundamentals & Joins",
      items: [
        "SQL query execution order? (FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT)",
        "Difference between WHERE and HAVING?",
        "INNER JOIN vs LEFT JOIN — when does each produce different results?",
        "How to find rows in Table A with no match in Table B?",
        "A JOIN produces more rows than either input. Why and how to fix it?",
        "What is a self-join? Give a business example.",
        "COUNT(*) vs COUNT(col) vs COUNT(DISTINCT col)?",
        "Why can't you use WHERE col = NULL? What do you use instead?",
      ],
    },
    b: {
      title: "Business Analytics",
      items: [
        "Write a cohort retention query showing Month-0 to Month-3 retention.",
        "How do you build a funnel analysis query?",
        "Find month-over-month revenue growth %.",
        "How do you find the second-highest salary per department?",
        "Find customers who ordered in January but not in February.",
        "How do you calculate DAU, WAU, and MAU?",
        "Write an RFM segmentation query using NTILE.",
        "How do you deduplicate records keeping only the most recent?",
      ],
    },
  },
];

const interviewQs: { section: string; items: string[] }[] = [
  {
    section: "CTEs & Subqueries",
    items: [
      "What is a CTE and how is it different from a subquery?",
      "When would you use a temp table over a CTE?",
      "What is a correlated subquery? Why is it slow?",
      "Can you reference a CTE multiple times in the same query?",
      "What is a recursive CTE? Give a use case.",
    ],
  },
  {
    section: "Window Functions",
    items: [
      "Difference between ROW_NUMBER, RANK, and DENSE_RANK?",
      "What is PARTITION BY vs GROUP BY?",
      "How do you calculate a 7-day rolling average in SQL?",
      "Write a query to find the first order for each customer.",
      "How do you get the Top-3 products per category using window functions?",
      "Write a query to detect consecutive active days (streak).",
    ],
  },
  {
    section: "Performance & Architecture",
    items: [
      "A query that took 10s now takes 10 minutes. How do you debug it?",
      "What is an execution plan and what are hash joins vs nested loops?",
      "Why does applying a function to an indexed column hurt performance?",
      "What is the difference between a view and a materialized view?",
      "What is a star schema? Why is it preferred for analytics?",
      "What is the difference between OLTP and OLAP databases?",
      "What is partition pruning and how does it save query cost?",
      "When would you create an index on a table?",
    ],
  },
];

const learningPlan = [
  {
    phase: "Days 1–30",
    heading: "Foundation + Joins + Aggregations",
    sub: "Target: 80% of real-world SQL work covered",
    weeks: [
      { d: "Days 1–3", t: "SQL Syntax Fundamentals", desc: "SELECT, WHERE, ORDER BY, LIMIT, aliases, DISTINCT — 20 exercises" },
      { d: "Days 4–6", t: "Filtering & CASE WHEN", desc: "AND/OR/IN/BETWEEN/LIKE/IS NULL, COALESCE, CASE WHEN segmentation" },
      { d: "Days 7–9", t: "Aggregate Functions", desc: "COUNT/SUM/AVG/MIN/MAX, GROUP BY, HAVING — 15 business exercises" },
      { d: "Days 10–14", t: "JOINS Mastery", desc: "All 5 join types, anti-join, multi-table, row count validation" },
      { d: "Days 15–16", t: "Weekend Project #1", desc: "Sales analysis: 3 tables, 10 business questions, written in SQL" },
      { d: "Days 17–19", t: "Date & String Functions", desc: "DATE_TRUNC, DATEDIFF, EXTRACT, text cleaning patterns" },
      { d: "Days 20–22", t: "Subqueries & CTEs", desc: "Scalar, table subqueries, EXISTS, multi-step CTEs — rewrite subqueries as CTEs" },
      { d: "Days 23–25", t: "NULL Handling & Cleaning", desc: "Data quality profiling, deduplication, standardization" },
      { d: "Days 26–27", t: "UNION / UNION ALL", desc: "Set operations, combining datasets, INTERSECT, EXCEPT" },
      { d: "Days 28–30", t: "Weekend Project #2", desc: "Customer analytics: joins + aggregation + CTEs + date functions" },
    ],
  },
  {
    phase: "Days 31–60",
    heading: "Window Functions + Business Analytics + Optimization",
    sub: "Target: senior-level query writing and business analytics",
    weeks: [
      { d: "Days 31–36", t: "Window Functions", desc: "ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG, LEAD, SUM OVER, rolling avg — 25 exercises" },
      { d: "Days 37–38", t: "WF Project", desc: "Revenue dashboard: MoM growth, running total, Top-N per category, ranking" },
      { d: "Days 39–43", t: "Business Analytics SQL", desc: "Cohort retention, funnel analysis, RFM segmentation, KPI queries" },
      { d: "Days 44–46", t: "Domain Analytics", desc: "Finance SQL, product analytics (DAU/MAU), marketing attribution" },
      { d: "Days 47–51", t: "Query Optimization", desc: "Execution plans, EXPLAIN ANALYZE, indexing, partition pruning, cost reduction" },
      { d: "Days 52–54", t: "Data Warehouse Concepts", desc: "Star schema, fact/dim tables, OLTP vs OLAP, SCD, ETL patterns" },
      { d: "Days 55–60", t: "Capstone Project", desc: "End-to-end: 5-table model, cohort analysis, funnel, MoM trends, dashboard queries" },
    ],
  },
  {
    phase: "Days 61–90",
    heading: "Advanced Patterns + Cloud SQL + Interview Prep",
    sub: "Target: production-ready SQL + interview confidence",
    weeks: [
      { d: "Days 61–65", t: "Advanced Patterns", desc: "Gap-and-island, sessionization, PIVOT patterns, recursive CTEs, A/B test queries" },
      { d: "Days 66–68", t: "Cloud SQL Platforms", desc: "BigQuery, Snowflake, or Redshift — dialect differences and best practices" },
      { d: "Days 69–72", t: "ETL / Pipeline SQL", desc: "MERGE, upserts, incremental loads, SCD Type 2, data quality gates" },
      { d: "Days 73–75", t: "Views & Materializations", desc: "Create views, materialized views, refresh strategies, dashboard views" },
      { d: "Days 76–82", t: "Interview Prep Sprint", desc: "LeetCode SQL 50, stratascratch top questions, mock interviews, explain out loud" },
      { d: "Days 83–87", t: "Portfolio Projects", desc: "2 portfolio-quality SQL projects with documentation and GitHub" },
      { d: "Days 88–90", t: "Review & Consolidate", desc: "Fill gaps, mock interview practice, review all patterns cold" },
    ],
  },
];

const projects = [
  { code: "P1", tier: "Beginner", h: "3–4hrs", t: "Sales Data Exploration", d: "SELECT, WHERE, ORDER BY, LIMIT, simple aggregations, GROUP BY on a 10K-row sales dataset." },
  { code: "P2", tier: "Beginner", h: "4–5hrs", t: "Customer Segmentation by Region", d: "JOINs (customers + orders), CASE WHEN for segmenting, COUNT and SUM aggregations by region." },
  { code: "P3", tier: "Beginner", h: "3–4hrs", t: "Monthly Revenue Report", d: "DATE_TRUNC, GROUP BY month, SUM revenue, LAG for MoM change, COALESCE for NULL handling." },
  { code: "P4", tier: "Intermediate", h: "6–8hrs", t: "Cohort Retention Analysis", d: "CTEs for cohort definition, DATEDIFF for cohort age, cohort retention matrix with COUNT DISTINCT." },
  { code: "P5", tier: "Intermediate", h: "6–7hrs", t: "Funnel Conversion Analysis", d: "Sessionization CTE, event sequencing, funnel step conversion rates with LEAD/LAG." },
  { code: "P6", tier: "Intermediate", h: "7–9hrs", t: "RFM Customer Segmentation", d: "NTILE(5) for recency, frequency, monetary scores; combined RFM segment assignment." },
  { code: "P7", tier: "Intermediate", h: "5–6hrs", t: "Product Sales Dashboard SQL", d: "Window functions for running totals, RANK for top products, revenue per category." },
  { code: "P8", tier: "Advanced", h: "8–10hrs", t: "User Retention & LTV Analysis", d: "Cohort retention + LTV calculation using SUM OVER, cohort cumulative revenue." },
  { code: "P9", tier: "Advanced", h: "8–10hrs", t: "Marketing Attribution Model", d: "Multi-touch attribution with window functions, FIRST_VALUE for first touch, LAG for sequence." },
  { code: "P10", tier: "Advanced", h: "10–12hrs", t: "Logistics Performance Analytics", d: "On-time delivery, SLA breach analysis, carrier performance ranking (RANK), lead time distribution (NTILE)." },
  { code: "P11", tier: "Advanced", h: "12–15hrs", t: "Finance P&L Analytics", d: "Revenue by cost centre, YoY/MoM trends, gross margin, budget vs actual with CASE WHEN." },
];

const scenarios: {
  icon: LucideIcon;
  title: string;
  cols: { h: string; items: string[] }[];
}[] = [
  {
    icon: TrendingDown,
    title: "Scenario 1 — 'Revenue dropped 15% last week - find out why'",
    cols: [
      { h: "Investigation steps", items: ["Break down by: region, product, channel, customer tier", "Compare last week vs prior week using LAG or date filter", "Check new vs returning customer mix", "Identify if one segment drove entire drop"] },
      { h: "SQL approach", items: ["GROUP BY region + week using DATE_TRUNC", "CASE WHEN to flag current vs prior week", "SUM + conditional aggregation for side-by-side", "Window LAG for % change per dimension"] },
      { h: "Output", items: ["Segment-level variance report", "% contribution to drop per segment", "Executive summary of findings", "Recommended next steps to investigate"] },
    ],
  },
  {
    icon: Users,
    title: "Scenario 2 — 'How many users are still active 30/60/90 days after signing up?'",
    cols: [
      { h: "Approach", items: ["CTE 1: first sign-up date per user", "CTE 2: JOIN to activity table", "Check if activity_date between signup and signup+30/60/90", "COUNT(DISTINCT user_id) per retention window"] },
      { h: "Key functions", items: ["MIN(event_date) OVER — first activity", "DATEDIFF / DATE_ADD for window boundaries", "CASE WHEN for day-30/60/90 flag", "COUNT(DISTINCT) for unique active users"] },
      { h: "Output", items: ["Month 0–3 retention matrix", "Retention curve visualization", "Churn flags by cohort", "Executive retention dashboard"] },
    ],
  },
  {
    icon: Trophy,
    title: "Scenario 3 — 'Identify our top 20% of customers by revenue'",
    cols: [
      { h: "Approach", items: ["SUM revenue per customer", "NTILE(5) to segment into quintiles", "Filter where quintile = 5 (top 20%)", "Join back to orders for behaviour detail"] },
      { h: "Metrics to extract", items: ["Avg order frequency, AOV, preferred category", "Days since last order (recency)", "Geographic distribution", "Acquisition channel using first-touch attribution"] },
      { h: "Output", items: ["VIP customer list", "Behavioural profile of top customers", "Targeted marketing recommendations", "Retention strategy for VIPs"] },
    ],
  },
  {
    icon: RefreshCw,
    title: "Scenario 4 — 'Find customers who bought in January but not in February'",
    cols: [
      { h: "Approach", items: ["CTE jan_buyers: DISTINCT customers who ordered in Jan", "CTE feb_buyers: DISTINCT customers who ordered in Feb", "EXCEPT / LEFT JOIN anti-join to find jan_buyers not in feb_buyers", "Add profile info from customer table"] },
      { h: "Extension", items: ["Add their Jan revenue (how much are we losing?)", "Categorize by last order value tier", "Filter to specific product categories", "This is a winback list for CRM campaigns"] },
      { h: "Output", items: ["Winback customer list", "Revenue at risk report", "Segment-specific offer recommendations", "CRM campaign targeting file"] },
    ],
  },
];

const bestPractices: { h: string; icon: LucideIcon; items: string[] }[] = [
  { h: "Code Style & Readability", icon: FileText, items: ["Uppercase SQL keywords: SELECT, FROM, WHERE, JOIN", "One clause per line, consistent indentation", "Meaningful table aliases: cust not c, monthly_rev not t1", "CTEs for every multi-step query — no deeply nested subqueries", "Comment the WHY: -- Exclude test users (user_id < 8)", "Add a header comment: date, author, purpose, dependencies"] },
  { h: "Data Integrity Checks", icon: ShieldCheck, items: ["Row count before and after every JOIN", "Validate primary key uniqueness: COUNT(*) vs COUNT(DISTINCT id)", "Check for NULLs in key columns before aggregating", "Verify date ranges cover expected period", "Add ASSERT-style checks in data pipeline SQL", "Never assume data is clean — always profile first"] },
  { h: "Performance Standards", icon: Zap, items: ["Never SELECT * in production — name all columns", "Filter on partition/index columns in WHERE", "Push filters as early as possible (before joins)", "Use LIMIT 100 during development/testing", "UNION ALL over UNION unless deduplication is needed", "Run EXPLAIN/EXPLAIN ANALYZE before submitting production queries"] },
  { h: "Production SQL Standards", icon: Factory, items: ["Use views for reusable business logic", "Materialized views for dashboard-serving queries", "Parameterize dates — never hardcode '2024-01-01'", "Version control SQL files in Git (dbt, GitHub)", "Write idempotent queries (safe to re-run)", "Document table grain: 'one row per customer per day'"] },
  { h: "Debugging Approach", icon: Search, items: ["Start simple — add complexity incrementally", "Test CTEs individually before combining", "Use SELECT * on intermediate CTEs to inspect results", "Validate join cardinality at each step", "Check that CASE WHEN ELSE handles all edge cases", "Use NULLIF to prevent division-by-zero errors"] },
  { h: "Anti-Patterns to Avoid", icon: Ban, items: ["Applying functions to indexed columns in WHERE", "Correlated subqueries that run per row (use CTE + JOIN)", "Using DISTINCT as a lazy fix for duplicate rows", "Non-deterministic ORDER BY (same-value ties)", "String concatenation for date filters", "Magic numbers without comments: WHERE status = 4 (what is 4?)"] },
];

const resources: { h: string; icon: LucideIcon; items: { l: string; u: string }[] }[] = [
  { h: "Analytics & Reference", icon: BarChart3, items: [
    { l: "Mode Analytics SQL School", u: "https://mode.com/sql-tutorial/" },
    { l: "SQLBI — Analytics Patterns", u: "https://www.sqlbi.com/" },
    { l: "PostgreSQL Documentation", u: "https://www.postgresql.org/docs/" },
    { l: "W3Schools SQL Reference", u: "https://www.w3schools.com/sql/" },
    { l: "LearnSQL.com — Interactive Courses", u: "https://learnsql.com/" },
  ]},
  { h: "Cloud SQL Platforms", icon: Cloud, items: [
    { l: "BigQuery Sandbox (Free)", u: "https://cloud.google.com/bigquery/public-data" },
    { l: "Snowflake Free Trial", u: "https://www.snowflake.com/free-trial/" },
    { l: "db-fiddle.com — Test Queries", u: "https://www.db-fiddle.com/" },
    { l: "SQLPad — Online SQL Editor", u: "https://sqlpad.io/" },
    { l: "Stack Overflow — SQL Help", u: "https://stackoverflow.com/questions/tagged/sql" },
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

function SQLRoadmap() {
  const storageKey = "roadmap-progress:sql";
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
    const easy = topics.filter((t) => t.difficulty === "Easy").length;
    const med = topics.filter((t) => t.difficulty === "Medium").length;
    const hard = topics.filter((t) => t.difficulty === "Hard").length;
    const totalH = Math.round(topics.reduce((n, t) => n + parseHours(t.hours), 0));
    return { total, easy, med, hard, totalH, done: done.size };
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
          MASTERY CHECKLIST · SQL
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-3 text-gradient-brand">
          SQL Mastery Checklist — Data Analyst Roadmap
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-6">
          The complete SQL journey for aspiring data analysts. 32 priority-ranked topics, query patterns, a 30-60-90 day plan, 11 portfolio projects, real-world scenarios, and interview prep — everything you need to be job-ready.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5"><Signal className="size-4" /> Beginner → Advanced</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="size-4" /> ~130 hrs total</span>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
          <StatBox n={stats.done} label="Done" tone="text-brand" />
          <StatBox n={stats.total} label="Topics" tone="text-foreground" />
          <StatBox n={stats.easy} label="Easy" tone="text-emerald-400" />
          <StatBox n={stats.med} label="Medium" tone="text-amber-400" />
          <StatBox n={stats.hard} label="Hard" tone="text-rose-400" />
          <StatBox n={`~${stats.totalH}h`} label="Total Time" tone="text-brand" />
        </div>
      </section>

      {/* Checklist */}
      <Section id="checklist" title="Priority-Based Topic Checklist" subtitle="Ordered by recommended learning sequence. Expand each for context; check off as you master them.">
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
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge className={diffStyles[t.difficulty]}>{t.difficulty}</Badge>
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
                    Focus this session on <span className="text-foreground">{t.name.split("—")[0].trim()}</span>.
                    Target study time: <span className="text-foreground">{t.hours}</span>. Practice with real datasets
                    (LeetCode, StrataScratch, or company data) and write the query from memory the next day.
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Must Know */}
      <Section id="must-know" eyebrow="Non-Negotiable" eyebrowIcon={Star} title="Must Know for Every Data Analyst" subtitle="You will use all of these in the first week of any data analyst role.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mustKnowGroups.map((g) => (
            <Card key={g.title} icon={g.icon} title={g.title}>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {g.items.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-brand mt-1">›</span>{i}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Window Functions Deep Dive */}
      <Section id="window-functions" eyebrow="Advanced" eyebrowIcon={AppWindow} title="Window Functions — Deep Dive Reference" subtitle="The single most important advanced SQL skill. Master these patterns and you'll stand out in every interview.">
        <div className="grid md:grid-cols-2 gap-4">
          {queryPatterns.map((g) => (
            <Card key={g.title} icon={g.icon} title={g.title}>
              <ul className="space-y-1.5 text-[13px] font-mono text-muted-foreground">
                {g.items.map((i) => (
                  <li key={i} className="leading-relaxed">{i}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Business Patterns */}
      <Section id="business-patterns" eyebrow="Industry" eyebrowIcon={Briefcase} title="Business Analytics SQL — Industry Patterns" subtitle="The analytics patterns every product, growth, and business analyst writes regularly in industry.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businessPatterns.map((g) => (
            <Card key={g.title} icon={g.icon} title={g.title}>
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
      <Section id="plan" eyebrow="Structured" eyebrowIcon={Calendar} title="30-60-90 Day SQL Learning Plan" subtitle="For a working analyst putting in 1–2 hrs/day. Weekends include 3–4 hr project sessions.">
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
      <Section id="interview" eyebrow="Interview Prep" eyebrowIcon={Target} title="4-Phase Interview Preparation Roadmap" subtitle="Expect live SQL exercises — practice for speed and accuracy.">
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
      <Section title="Top SQL Interview Questions" subtitle="Common questions asked at data analyst interviews across tech, finance, and consulting.">
        <div className="grid md:grid-cols-2 gap-4">
          {interviewQs.map((s) => (
            <Card key={s.section} title={s.section}>
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
      <Section id="projects" eyebrow="Portfolio" eyebrowIcon={Hammer} title="Hands-On Projects & Portfolio Ideas" subtitle="Build these to prove real-world SQL mastery. Each covers multiple topic areas.">
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <Card key={p.code}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-brand">{p.code}</span>
                <Badge className={p.tier === "Beginner" ? diffStyles.Easy : p.tier === "Intermediate" ? diffStyles.Medium : diffStyles.Hard}>
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
      <Section id="scenarios" eyebrow="Real-World" eyebrowIcon={Briefcase} title="Business Scenarios You'll Actually Face" subtitle="Common asks from actual analyst roles. Know how to solve each end-to-end.">
        <div className="space-y-4">
          {scenarios.map((s) => (
            <div key={s.title} className="rounded-2xl border border-hairline bg-surface-1/40 p-6">
              <h3 className="font-medium text-foreground mb-4 flex items-center gap-3">
                <span className="shrink-0 size-8 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
                  <s.icon className="size-4 text-brand" />
                </span>
                {s.title}
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
      <Section id="best-practices" eyebrow="Standards" eyebrowIcon={ShieldCheck} title="SQL Best Practices Used at Companies" subtitle="Production-standard SQL habits followed by analytics teams at tech companies, consulting firms, and data-driven organisations.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bestPractices.map((b) => (
            <Card key={b.h} icon={b.icon} title={b.h}>
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
      <Section id="resources" eyebrow="Level Up" eyebrowIcon={BookOpen} title="SQL Toolkit & Resources">
        <div className="grid md:grid-cols-3 gap-4">
          {resources.map((r) => (
            <Card key={r.h} icon={r.icon} title={r.h}>
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
  eyebrowIcon: EyebrowIcon,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="max-w-5xl mx-auto px-6 py-14 border-t border-hairline">
      <div className="mb-8">
        {eyebrow && (
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-brand mb-2">
            {EyebrowIcon && <EyebrowIcon className="size-3.5" />}
            {eyebrow}
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Card({
  icon: Icon,
  title,
  children,
}: {
  icon?: LucideIcon;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface-1/40 p-5 hover:border-brand/30 transition-colors">
      {(Icon || title) && (
        <div className="flex items-center gap-2.5 mb-3">
          {Icon && (
            <span className="shrink-0 size-8 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
              <Icon className="size-4 text-brand" />
            </span>
          )}
          {title && <h3 className="font-medium text-foreground">{title}</h3>}
        </div>
      )}
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