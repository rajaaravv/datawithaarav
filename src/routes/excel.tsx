import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  Briefcase,
  Brush,
  Calculator,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  DollarSign,
  FolderOpen,
  Hammer,
  Hash,
  LayoutDashboard,
  Lock,
  type LucideIcon,
  Palette,
  Rocket,
  Search,
  Share2,
  ShieldCheck,
  Signal,
  Star,
  Table2,
  Target,
  BookOpen,
  TrendingUp,
  Type,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/excel")({
  head: () => ({
    meta: [
      { title: "Excel Mastery Checklist — Data Analyst Roadmap" },
      {
        name: "description",
        content:
          "The complete Excel roadmap for aspiring data analysts — 32 priority-based topics, formula bible, 30-60-90 plan, projects, interview questions, and real-world scenarios.",
      },
      { property: "og:title", content: "Excel Mastery Checklist — Data Analyst Roadmap" },
      {
        property: "og:description",
        content:
          "32 priority-ranked topics, must-know skills, formula bible, projects, interview prep, and a 30-60-90 day plan.",
      },
    ],
  }),
  component: ExcelRoadmap,
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
  { order: 1, name: "Excel Fundamentals — Interface, Navigation & Data Types", difficulty: "Easy", hours: "2–3 hrs", priority: "Critical", mustKnow: true },
  { order: 2, name: "Essential Lookup & Reference Formulas — XLOOKUP, INDEX-MATCH", difficulty: "Medium", hours: "5–6 hrs", priority: "Critical", mustKnow: true },
  { order: 3, name: "Logical & Conditional Formulas — IF, IFS, AND, OR, SWITCH", difficulty: "Easy", hours: "3–4 hrs", priority: "Critical", mustKnow: true },
  { order: 4, name: "Aggregation Formulas — SUMIF, COUNTIF, AVERAGEIF & Array Variants", difficulty: "Medium", hours: "4–5 hrs", priority: "Critical", mustKnow: true },
  { order: 5, name: "Text Functions — Cleaning, Extracting & Combining Text", difficulty: "Easy", hours: "3–4 hrs", priority: "Critical", mustKnow: true },
  { order: 6, name: "Date & Time Functions — Calculations, Formatting & Business Days", difficulty: "Medium", hours: "3–4 hrs", priority: "High" },
  { order: 7, name: "Dynamic Array Formulas — FILTER, SORT, UNIQUE, SEQUENCE", difficulty: "Medium", hours: "4–5 hrs", priority: "Critical", mustKnow: true },
  { order: 8, name: "Data Cleaning & Preparation — Techniques & Tools", difficulty: "Medium", hours: "4–5 hrs", priority: "Critical", mustKnow: true },
  { order: 9, name: "Pivot Tables — The Most Powerful Analytical Tool in Excel", difficulty: "Medium", hours: "6–8 hrs", priority: "Critical", mustKnow: true, mostCritical: true },
  { order: 10, name: "Charts & Visualizations — Choosing, Building & Formatting", difficulty: "Medium", hours: "5–6 hrs", priority: "High" },
  { order: 11, name: "Dashboard Creation — KPI, Executive & Interactive Dashboards", difficulty: "Hard", hours: "8–10 hrs", priority: "Critical", mustKnow: true },
  { order: 12, name: "What-If Analysis — Goal Seek, Scenario Manager & Solver", difficulty: "Medium", hours: "4–5 hrs", priority: "High" },
  { order: 13, name: "Statistical & Financial Formulas — Analysis & Reporting", difficulty: "Medium", hours: "4–5 hrs", priority: "High" },
  { order: 14, name: "Advanced Filtering — Advanced Filter, Criteria Ranges & FILTER formula", difficulty: "Medium", hours: "2–3 hrs", priority: "Medium" },
  { order: 15, name: "Power Query — Modern ETL for Excel Analysts", difficulty: "Hard", hours: "8–10 hrs", priority: "Critical", mustKnow: true },
  { order: 16, name: "Power Pivot & Data Model — In-Memory Analytics in Excel", difficulty: "Hard", hours: "8–10 hrs", priority: "High" },
  { order: 17, name: "VBA & Macros — Automation Without Coding Background", difficulty: "Hard", hours: "8–10 hrs", priority: "Medium" },
  { order: 18, name: "OFFSET, INDIRECT & Volatile Functions — Dynamic References", difficulty: "Hard", hours: "3–4 hrs" },
  { order: 19, name: "Financial Reporting — P&L, Cash Flow & Budget Models", difficulty: "Hard", hours: "8–10 hrs" },
  { order: 20, name: "MIS Reporting & Daily/Weekly/Monthly Automation", difficulty: "Medium", hours: "5–6 hrs" },
  { order: 21, name: "Data Reconciliation & Validation Techniques", difficulty: "Medium", hours: "3–4 hrs" },
  { order: 22, name: "Performance & Workbook Optimization", difficulty: "Medium", hours: "3–4 hrs" },
  { order: 23, name: "Error Auditing & Formula Tracing", difficulty: "Easy", hours: "2 hrs" },
  { order: 24, name: "Excel + SQL Integration — Importing & Refreshing Data", difficulty: "Medium", hours: "4–5 hrs" },
  { order: 25, name: "Excel + Power BI Integration — Bridge Between Tools", difficulty: "Medium", hours: "3–4 hrs" },
  { order: 26, name: "Customer & Sales Analytics — CRM & Revenue Reporting", difficulty: "Medium", hours: "5–6 hrs" },
  { order: 27, name: "HR Analytics — Workforce Reporting", difficulty: "Medium", hours: "4–5 hrs" },
  { order: 28, name: "Inventory & Supply Chain Analysis", difficulty: "Medium", hours: "4–5 hrs" },
  { order: 29, name: "Forecasting & Trend Analysis", difficulty: "Medium", hours: "4–5 hrs" },
  { order: 30, name: "Advanced Conditional Formatting & Heatmaps", difficulty: "Easy", hours: "2–3 hrs" },
  { order: 31, name: "Form Controls & Interactive Elements (No VBA)", difficulty: "Medium", hours: "3–4 hrs" },
  { order: 32, name: "Advanced Excel — LET, LAMBDA, BYROW, MAP & Custom Functions", difficulty: "Hard", hours: "5–6 hrs" },
];

interface IconGroup {
  title: string;
  icon: LucideIcon;
  items: string[];
}

const mustKnowGroups: IconGroup[] = [
  {
    title: "PivotTable (Day 1)",
    icon: Table2,
    items: [
      "Create from any tabular data in < 30 seconds",
      "Group dates by month, quarter, year",
      "Show Values As: % of Total, Running Total, Rank",
      "Add Slicers + Timelines for interactivity",
      "Connect multiple PivotTables to one slicer",
      "Calculated field for derived metrics",
    ],
  },
  {
    title: "Lookup Formulas (Every Project)",
    icon: Search,
    items: [
      "XLOOKUP for all new work",
      "VLOOKUP for legacy compatibility",
      "INDEX+MATCH for 2-way and multi-criteria",
      "IFERROR/IFNA to handle not-found gracefully",
      "Nested XLOOKUP for hierarchical lookup",
    ],
  },
  {
    title: "Aggregation (Every Report)",
    icon: BarChart3,
    items: [
      "SUMIFS with multiple criteria including dates",
      "COUNTIFS for frequency analysis",
      "AVERAGEIFS for conditional averages",
      "MAXIFS/MINIFS for range extremes",
      "SUMPRODUCT for weighted calculations",
    ],
  },
  {
    title: "Data Cleaning (Before Any Analysis)",
    icon: Brush,
    items: [
      "TRIM + CLEAN for text",
      "Remove Duplicates (with subset)",
      "Text to Columns for splitting",
      "Flash Fill (Ctrl+E) for pattern recognition",
      "Find & Replace with wildcards",
      "Go To Special → Blanks",
    ],
  },
  {
    title: "Dynamic Arrays (Modern Excel)",
    icon: Zap,
    items: [
      "FILTER for dynamic lists",
      "UNIQUE for distinct value extraction",
      "SORT / SORTBY for ranked output",
      "SEQUENCE for generating number/date series",
      "Spill range reference: A1# syntax",
    ],
  },
  {
    title: "Date Functions (Reporting)",
    icon: Calendar,
    items: [
      "TODAY(), EOMONTH() for dynamic dates",
      "DATEDIF for tenure/age calculation",
      "NETWORKDAYS for working day counts",
      "TEXT() for date formatting in labels",
      "YEAR/MONTH for period grouping",
    ],
  },
];

const formulaBible: IconGroup[] = [
  {
    title: "Lookup & Reference",
    icon: Search,
    items: [
      `=XLOOKUP(val, look_rng, ret_rng, "NF", 0) — modern standard`,
      `=XLOOKUP(val, rng, rng2:rng3) — return multiple columns`,
      `=INDEX(rng, MATCH(val, look, 0)) — classic flexible`,
      `=MATCH(1,(A1=r1)*(B1=r2),0) — multi-criteria`,
      `=VLOOKUP(val, range, col, 0) — legacy`,
      `=CHOOSE(n, opt1, opt2, opt3) — pick by index`,
      `=OFFSET(ref, r, c, h, w) — dynamic range`,
      `=INDIRECT(text_ref) — reference from string`,
    ],
  },
  {
    title: "Dynamic Arrays",
    icon: Zap,
    items: [
      `=FILTER(arr, include, "empty")`,
      `=SORT(arr, col_index, 1)`,
      `=SORTBY(arr, by_col, -1)`,
      `=UNIQUE(arr, by_col, once)`,
      `=SEQUENCE(r, c, start, step)`,
      `=VSTACK(arr1, arr2)`,
      `=LET(x, val, x*2) — named variables`,
      `=LAMBDA(x, x^2) — custom function`,
    ],
  },
  {
    title: "Date & Time",
    icon: Calendar,
    items: [
      `=TODAY(), =NOW()`,
      `=DATE(y,m,d), =DATEVALUE(text)`,
      `=YEAR/MONTH/DAY/WEEKDAY(date)`,
      `=DATEDIF(start, end, "YMD")`,
      `=NETWORKDAYS(start, end, hols)`,
      `=WORKDAY(start, n, hols)`,
      `=EOMONTH(date, months)`,
      `=TEXT(date, "DD-MMM-YYYY")`,
    ],
  },
  {
    title: "Aggregation",
    icon: BarChart3,
    items: [
      `=SUMIFS(sum, r1, c1, r2, c2)`,
      `=COUNTIFS(r1, c1, r2, c2)`,
      `=AVERAGEIFS(avg, r1, c1)`,
      `=MAXIFS(max_rng, r1, c1)`,
      `=MINIFS(min_rng, r1, c1)`,
      `=SUMPRODUCT(arr1, arr2)`,
      `=SUBTOTAL(9, range) — respects filter`,
      `=AGGREGATE(func, 5, range) — ignores errors`,
    ],
  },
  {
    title: "Text Functions",
    icon: Type,
    items: [
      `=TRIM(text) — remove extra spaces`,
      `=CLEAN(text) — remove non-printable`,
      `=PROPER/UPPER/LOWER(text)`,
      `=LEFT/RIGHT/MID(text, n)`,
      `=FIND / =SEARCH(find, within, start)`,
      `=SUBSTITUTE(text, old, new)`,
      `=TEXTJOIN(", ", TRUE, range)`,
      `=TEXTSPLIT(text, ",", ";")`,
    ],
  },
  {
    title: "Statistical",
    icon: Calculator,
    items: [
      `=MEDIAN(range)`,
      `=MODE.SNGL(range)`,
      `=STDEV.S / STDEV.P(range)`,
      `=PERCENTILE.INC(range, 0.9)`,
      `=QUARTILE.INC(range, 1)`,
      `=RANK.EQ(val, range, 0)`,
      `=LARGE / SMALL(range, k)`,
      `=CORREL(arr1, arr2)`,
    ],
  },
  {
    title: "Error Handling",
    icon: AlertTriangle,
    items: [
      `=IFERROR(formula, fallback) — catch all errors`,
      `=IFNA(formula, "Not Found") — catch #N/A only`,
      `=ISERROR(val), =ISNA(val)`,
      `=ISNUMBER / ISTEXT / ISBLANK(val)`,
      `Errors: #REF!, #N/A, #VALUE!, #DIV/0!, #NAME?, #SPILL!`,
    ],
  },
  {
    title: "Financial",
    icon: DollarSign,
    items: [
      `=NPV(rate, val1, val2, ...)`,
      `=IRR(values, guess)`,
      `=PMT(rate, nper, pv) — loan payment`,
      `=XNPV(rate, vals, dates) — irregular cashflows`,
      `=XIRR(vals, dates, guess)`,
      `CAGR = (End/Start)^(1/n) - 1`,
      `=SLN(cost, salvage, life) — depreciation`,
    ],
  },
];

const interviewPhases = [
  {
    n: "1",
    title: "Foundation — Core Formulas Cold",
    when: "Week 1 · Daily 1.5 hrs",
    a: {
      title: "Must nail without looking",
      items: [
        "Write XLOOKUP with not-found handler",
        "Write SUMIFS with 3 criteria including dates",
        "Explain absolute vs relative reference",
        "Build a PivotTable from scratch in under 2 min",
        "Write IF/IFS with 4+ tiers",
      ],
    },
    b: {
      title: "Speed practice",
      items: [
        "Time yourself: each task in < 60 seconds",
        "Practice on unfamiliar datasets",
        "Explain keystrokes out loud",
        "Make and fix deliberate errors",
      ],
    },
  },
  {
    n: "2",
    title: "Live Exercise Practice — Do-This-Now Problems",
    when: "Week 2 · Daily 2 hrs",
    a: {
      title: "Common live tasks",
      items: [
        "Revenue by region and month → PivotTable + Slicer in 5 min",
        "VLOOKUP the customer name from this table",
        "Remove duplicates and clean this column",
        "Make this formula not show an error",
        "Why does this SUMIFS return 0?",
      ],
    },
    b: {
      title: "What interviewers assess",
      items: [
        "Plan before acting",
        "Keyboard shortcut fluency",
        "Error recovery / debugging",
        "Communication while working",
        "Design decisions & tradeoffs",
      ],
    },
  },
  {
    n: "3",
    title: "Advanced — Power Query & Dashboard",
    when: "Week 3 · Daily 1.5 hrs",
    a: {
      title: "Advanced questions",
      items: [
        "Combine multiple Excel files automatically?",
        "Power Query vs VLOOKUP for merging?",
        "Interactive dashboard without VBA?",
        "Prevent users from breaking formulas?",
        "Automate a monthly MIS report?",
      ],
    },
    b: {
      title: "Portfolio talking points",
      items: [
        "Real project where Excel saved significant time",
        `Quantify impact: "3-hour task → 10-min refresh"`,
        "Mention Power Query, PivotTable, Macros by name",
        "Know when to use SQL / Power BI instead",
      ],
    },
  },
  {
    n: "4",
    title: "Take-Home Task — Deliver Interview Quality",
    when: "Week 4 · 4–6 hrs per task",
    a: {
      title: "Delivery checklist",
      items: [
        "Clean layout with clear sheet tabs",
        "Dashboard: no gridlines, consistent colors",
        "All formulas wrapped with IFERROR",
        "Named cells + formula sheet comments",
        "Protect sheets; unlock only inputs",
        "File under 5MB, saved as .xlsx",
      ],
    },
    b: {
      title: "Standout elements",
      items: [
        "Power Query for import (not copy-paste)",
        "Dynamic chart with dropdown selection",
        "RAG conditional formatting on KPIs",
        "Summary PivotTable + Slicer",
        `A "README" sheet explaining the model`,
      ],
    },
  },
];

const interviewQs: { section: string; items: string[] }[] = [
  {
    section: "Formulas & Functions",
    items: [
      "Difference between VLOOKUP and XLOOKUP?",
      "Do a two-criteria lookup — two methods.",
      "Limitations of VLOOKUP that INDEX-MATCH solves?",
      "When does SUMIFS return 0 unexpectedly?",
      "SUMPRODUCT vs SUMIFS — when to use which?",
      "Absolute vs relative vs mixed references — examples.",
      "IFERROR vs IFNA?",
      "Business days between two dates?",
      "Dynamic array formula & spill range?",
      "FILTER vs Advanced Filter?",
    ],
  },
  {
    section: "PivotTables & Analysis",
    items: [
      "Live: revenue by region and month PivotTable in 3 min.",
      "Add a calculated field to a PivotTable?",
      "Connect multiple PivotTables to one slicer?",
      `"Show Values As → % of Parent Total" — when?`,
      "PivotTable with blank column header — why & fix?",
    ],
  },
  {
    section: "Data Cleaning",
    items: [
      "Clean duplicates across 3 columns?",
      "Fill blanks with value above (Go To Special)?",
      "Flash Fill — usage & limitations?",
      `Split "First Last" into two columns?`,
      "Highlight rows where date is past due?",
    ],
  },
  {
    section: "Advanced & Power Tools",
    items: [
      "Power Query vs VLOOKUP for merging?",
      "Combine 12 monthly CSV files automatically?",
      "Excel Data Model — when to use it?",
      "Interactive dashboard without VBA?",
      "Prevent editing formula cells in a shared workbook?",
    ],
  },
  {
    section: "Performance & Real-World",
    items: [
      "80MB Excel file is slow — diagnose & fix?",
      "Volatile functions and their performance impact?",
      "Automate a 3-hour monthly report?",
      "Reconcile data from two different systems?",
      "When to use Power BI or SQL instead of Excel?",
    ],
  },
];

const learningPlan = [
  {
    phase: "Days 1–30",
    heading: "Foundation & Core Skills",
    sub: "Fundamentals, Formulas, PivotTables, Data Cleaning, Basic Dashboard",
    weeks: [
      { d: "Week 1 · Days 1–5", t: "Excel Fundamentals + Lookup Formulas", desc: "Cell refs, Tables, Named Ranges, XLOOKUP, INDEX-MATCH, VLOOKUP" },
      { d: "Days 6–7", t: "Weekend Project", desc: "Product pricing lookup: XLOOKUP + INDEX-MATCH side by side" },
      { d: "Week 2 · Days 8–12", t: "Aggregation + Text + Date", desc: "SUMIFS, COUNTIFS, all text functions, DATEDIF, NETWORKDAYS" },
      { d: "Days 13–14", t: "Project: Employee Report", desc: "Tenure, age band, salary analysis, department headcount" },
      { d: "Week 3 · Days 15–19", t: "PivotTables + Charts", desc: "10 PivotTables; calculated fields; slicers; combo charts; sparklines" },
      { d: "Days 20–21", t: "Project: Sales PivotTable Suite", desc: "5 PivotTables + 3 slicers + 3 connected charts" },
      { d: "Week 4 · Days 22–26", t: "Data Cleaning + Dynamic Arrays", desc: "TRIM/CLEAN, Flash Fill, FILTER, SORT, UNIQUE, LET" },
      { d: "Days 27–30", t: "Project: First Dashboard", desc: "1-page sales KPI dashboard with 6 KPIs, 3 charts, 1 dropdown" },
    ],
  },
  {
    phase: "Days 31–60",
    heading: "Intermediate — Power Query, VBA, Advanced Analysis",
    sub: "Power Query, What-If, Financial Formulas, Advanced Dashboards, Automation",
    weeks: [
      { d: "Days 31–36", t: "Power Query Deep Dive", desc: "Connect 5 sources; append 12 files; merge, unpivot, parameters" },
      { d: "Days 37–38", t: "Power Query Project", desc: "Monthly CSV folder → combined → cleaned → loaded pipeline" },
      { d: "Days 39–43", t: "What-If + Financial", desc: "Goal Seek, Data Tables, Scenario Manager, Solver, NPV, IRR, XIRR" },
      { d: "Days 44–45", t: "Financial Model Project", desc: "5-year P&L with Base/Best/Worst + NPV/IRR" },
      { d: "Days 46–50", t: "VBA & Macros Basics", desc: "Recorder; edit code; loops; automate formatting + PDF export" },
      { d: "Days 51–52", t: "Automation Project", desc: "One-click monthly report: PQ refresh + format + PDF + timestamp" },
      { d: "Days 53–57", t: "Advanced Dashboard Design", desc: "Form controls, dynamic charts, bookmark navigation" },
      { d: "Days 58–60", t: "Portfolio Dashboard #2", desc: "HR analytics: headcount, attrition, tenure, department breakdown" },
    ],
  },
  {
    phase: "Days 61–90",
    heading: "Advanced — Power Pivot, DAX, Business Analytics, SQL",
    sub: "Power Pivot, DAX, Domain Dashboards, SQL, Python/PBI Integration",
    weeks: [
      { d: "Days 61–66", t: "Power Pivot + Data Model", desc: "Multi-table model, relationships, DAX measures, CALCULATE, time intelligence" },
      { d: "Days 67–68", t: "Power Pivot Project", desc: "Star schema: fact + 3 dimensions + 10 DAX measures" },
      { d: "Days 69–73", t: "Advanced DAX + LAMBDA/LET", desc: "CALCULATE, FILTER, RELATED, TOTALYTD, BYROW, MAP" },
      { d: "Days 74–75", t: "SQL + Excel Integration", desc: "PQ to SQL Server; native SQL query; parameterized queries" },
      { d: "Days 76–80", t: "Business Domain Dashboards", desc: "Finance P&L, Supply Chain, Customer Analytics, Forecasting" },
      { d: "Days 81–83", t: "Performance Optimization", desc: "Remove volatiles; reduce size; calc mode; formula audit" },
      { d: "Days 84–87", t: "Excel + Power BI Bridge", desc: "Analyze in Excel; rebuild in PBI; compare DAX transfer" },
      { d: "Days 88–90", t: "Capstone Project", desc: "PQ pipeline → Power Pivot model → 30+ formulas → 3-page dashboard → Macros" },
    ],
  },
];



const shortcuts = [
  { group: "Navigation", items: ["Ctrl+Home — A1", "Ctrl+End — last cell", "Ctrl+Arrow — jump to edge", "Ctrl+Shift+Arrow — select to edge", "Ctrl+Space — entire column", "Shift+Space — entire row", "Ctrl+A — select all", "Ctrl+PgUp/Dn — switch sheets"] },
  { group: "Formatting", items: ["Ctrl+B — Bold", "Ctrl+1 — Format cells", "Ctrl+Shift+4 — Currency", "Ctrl+Shift+5 — Percent", "Alt+H+O+I — Autofit col", "Alt+H+O+A — Autofit row", "Alt+H+M+C — Merge & center", "Alt+H+F+P — Format painter"] },
  { group: "Formulas & Auditing", items: ["Alt+M+V — Evaluate", "Alt+M+P — Trace precedents", "Alt+M+D — Trace dependents", "Ctrl+` — Show formulas", "F9 — Step into formula", "Alt+= — AutoSum", "Ctrl+Shift+Enter — Legacy array", "Tab — Enter & move right"] },
  { group: "Editing", items: ["F4 — Toggle $ ref", "Ctrl+D — Fill down", "Ctrl+R — Fill right", "Ctrl+E — Flash Fill", "Ctrl+H — Find & Replace", "F5 — Go To Special", "Ctrl+Alt+V then V — Paste values", "Ctrl+Shift++ — Insert row/col"] },
  { group: "Data & Analysis", items: ["Ctrl+T — Create Table", "Alt+N+V — Insert PivotTable", "Alt+F5 — Refresh Pivot", "Ctrl+Shift+L — AutoFilter", "Alt+A+M — Remove Duplicates", "Alt+A+S+S — Sort dialog", "Ctrl+F3 — Name Manager", "F9 — Recalculate"] },
  { group: "File & View", items: ["Ctrl+S — Save", "F12 — Save As", "Ctrl+F2 — Print Preview", "Alt+W+F+F — Freeze panes", "Alt+F11 — VBA editor", "Alt+F8 — Run macro", "Alt+W+G — Zoom to selection", "Shift+F11 — New sheet"] },
];

const scenarios: {
  icon: LucideIcon;
  title: string;
  cols: { h: string; items: string[] }[];
}[] = [
  {
    icon: BarChart3,
    title: "Scenario 1 — Monthly Sales MIS Report",
    cols: [
      { h: "Data source", items: ["12 regional managers submit Excel files", "Combine into one master", "Old way: manual copy (3 hrs)", "New way: Power Query folder connector"] },
      { h: "Solution build", items: ["PQ: connect to folder → append", "Filter current month, clean names", "PivotTable: region × product × metric", "SUMIFS cross-check totals", "Conditional formatting RAG"] },
      { h: "Automation", items: ["VBA: refresh PQ → format → PDF → email", "Result: 3-hour task → 5-minute refresh", `Add "Last Refreshed: "&TEXT(NOW(),...)`] },
    ],
  },
  {
    icon: Search,
    title: "Scenario 2 — Data Reconciliation",
    cols: [
      { h: "Problem", items: ["CRM: 1,250 orders, ERP: 1,247", "Revenue differs by ₹45,000", "Find the differing records"] },
      { h: "Excel solution", items: ["XLOOKUP across sheets", "ISNA to flag one-side-only records", "SUMIFS on matched → amount diff", "Conditional formatting mismatches"] },
      { h: "Output", items: ["Matched / unmatched counts", "Variance amount column", "Filter to mismatches only", "Notes for finance review"] },
    ],
  },
  {
    icon: TrendingUp,
    title: "Scenario 3 — CFO Revenue Target",
    cols: [
      { h: "Request", items: ["Current margin: 12%", "Target: ₹5 Cr EBITDA", "Fixed & variable cost known", "What revenue target is needed?"] },
      { h: "Excel solution", items: ["Simple P&L model with inputs", "Goal Seek: EBITDA = 5Cr → Revenue", "2-way Data Table: Revenue × Margin", "Scenario Manager: conservative/base/stretch"] },
      { h: "Presentation", items: ["Interactive sensitivity table", "Waterfall: revenue → EBITDA bridge", "Scenario summary report"] },
    ],
  },
  {
    icon: Users,
    title: "Scenario 4 — HR Headcount by Dept & Grade",
    cols: [
      { h: "Data available", items: ["Employee master: dept, grade, join/exit", "No monthly snapshots — must derive", "Movement data: hire & exit dates"] },
      { h: "Solution", items: ["Active flag: =IF(OR(exit blank, exit>EOM),1,0)", "COUNTIFS per dept, grade, month", "Opening + Add − Exits = Closing", "Attrition = Exits / ((Open+Close)/2)"] },
      { h: "Dashboard", items: ["Headcount waterfall", "Attrition trend line", "Matrix: department × grade w/ color scale", "Slicer for department view"] },
    ],
  },
];

const bestPractices: { h: string; icon: LucideIcon; items: string[] }[] = [
  { h: "File Structure", icon: FolderOpen, items: ["Separate sheets: Data, Calculations, Dashboard, Assumptions", "Color-code tabs: blue=data, green=output, yellow=input", "Always use Tables (not ranges)", "Never mix data, calcs, output on one sheet", "All hardcoded inputs on one Assumptions sheet", "Use a README sheet"] },
  { h: "Dashboard Standards", icon: LayoutDashboard, items: ["One focused question per dashboard page", "No more than 7 visuals per view", "Consistent brand color palette", "Remove gridlines from dashboards", "Business-focused chart titles", `Include "As of [date]" on every dashboard`] },
  { h: "Performance", icon: Rocket, items: ["Manual calc mode (F9) for heavy models", "Replace volatile functions with Table-based alternatives", "Power Query instead of in-sheet storage", "Delete unused names/styles/dead columns", "Limit CF to specific ranges, not whole columns", "Compress images"] },
  { h: "Formula Standards", icon: Palette, items: ["Blue = input, black = formula, green = external link", "Always wrap lookups with IFERROR/IFNA", "Avoid volatile functions in large models", "Named ranges for key assumptions", "Comments on complex logic", "Never nest 2–3+ functions deep without LET"] },
  { h: "Data Integrity", icon: Lock, items: ["Lock formula cells; unlock only inputs", "Data Validation on all manual inputs", "Row count checks atop each data sheet", "CF to flag anomalies", "Verify: source total = calculated total", "Never delete rows — hide or filter"] },
  { h: "Sharing", icon: Share2, items: [".xlsx (not .xls)", "File version + date in filename", "No spaces in script-friendly filenames", "Protect sheets before sharing for editing", "OneDrive/SharePoint for version control", `"How to Use" guide for shared templates`] },
];

const resources: { h: string; icon: LucideIcon; items: { l: string; u: string }[] }[] = [
  { h: "Free Resources", icon: BookOpen, items: [
    { l: "Microsoft Excel Support", u: "https://support.microsoft.com/excel" },
    { l: "ExcelJet — formula reference", u: "https://exceljet.net/" },
    { l: "Chandoo.org — dashboards", u: "https://chandoo.org/" },
    { l: "Excel Campus (YouTube)", u: "https://www.youtube.com/@ExcelCampus" },
    { l: "MyExcelOnline", u: "https://www.myexcelonline.com/" },
  ]},
  { h: "Practice Datasets", icon: Wrench, items: [
    { l: "Kaggle Datasets", u: "https://www.kaggle.com/datasets" },
    { l: "AdventureWorks Sample", u: "https://learn.microsoft.com/sql/samples/adventureworks-install-configure" },
    { l: "data.world", u: "https://data.world/" },
    { l: "data.gov", u: "https://www.data.gov/" },
  ]},
  { h: "Certifications", icon: Award, items: [
    { l: "MO-201 Excel Expert", u: "https://learn.microsoft.com/certifications/exams/mo-201/" },
    { l: "MO-200 Excel Associate", u: "https://learn.microsoft.com/certifications/exams/mo-200/" },
    { l: "Coursera — Excel Skills for Business (Macquarie)", u: "https://www.coursera.org/specializations/excel" },
    { l: "LinkedIn Learning — Excel Essential Training", u: "https://www.linkedin.com/learning/topics/microsoft-excel" },
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

function ExcelRoadmap() {
  const storageKey = "roadmap-progress:excel";
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
          MASTERY CHECKLIST · EXCEL
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-3 text-gradient-brand">
          Excel Mastery Checklist — Data Analyst Roadmap
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-6">
          The complete Excel journey for aspiring data analysts. 32 priority-ranked topics, a
          formula bible, a 30-60-90 day plan, 11 portfolio projects, real-world scenarios, and
          interview prep — everything you need to be job-ready.
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
                    Target study time: <span className="text-foreground">{t.hours}</span>. Practice on a real dataset
                    (Kaggle, Northwind, or your own operational data) and rebuild from scratch tomorrow to lock it in.
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

      {/* Formula Bible */}
      <Section id="formulas" eyebrow="Reference" eyebrowIcon={Hash} title="Excel Formula Bible" subtitle="The most important formulas organized by category. Master these and you'll handle 95% of real-world analysis tasks.">
        <div className="grid md:grid-cols-2 gap-4">
          {formulaBible.map((g) => (
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

      {/* 30-60-90 plan */}
      <Section id="plan" eyebrow="Structured" eyebrowIcon={Calendar} title="30-60-90 Day Excel Learning Plan" subtitle="For a working analyst putting in 1–2 hrs/day. Weekends include 3–4 hr project sessions.">
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
      <Section id="interview" eyebrow="Interview Prep" eyebrowIcon={Target} title="4-Phase Interview Preparation Roadmap" subtitle="Expect live Excel exercises — practice for speed and accuracy.">
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
      <Section title="Top Excel Interview Questions" subtitle="30 common questions asked at data analyst interviews across finance, FMCG, consulting, and tech.">
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



      {/* Shortcuts */}
      <Section id="shortcuts" eyebrow="Speed" eyebrowIcon={Zap} title="Top Excel Shortcuts Every Analyst Should Know" subtitle="Shortcut fluency signals experience. Practice these until they're muscle memory.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shortcuts.map((g) => (
            <Card key={g.group} title={g.group}>
              <ul className="space-y-1.5 text-[13px] font-mono text-muted-foreground">
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
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
      <Section id="best-practices" eyebrow="Standards" eyebrowIcon={ShieldCheck} title="Excel Best Practices Used at Real Companies" subtitle="Standards followed by professional analysts at consulting firms, banks, FMCG, and tech orgs.">
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
      <Section id="resources" eyebrow="Level Up" eyebrowIcon={BookOpen} title="Excel Toolkit & Resources">
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