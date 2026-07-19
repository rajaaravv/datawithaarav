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
  Database,
  Code,
  BarChart3,
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
  BookOpen,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/python")({
  head: () => ({
    meta: [
      { title: "Python Mastery Checklist — DataWithAarav" },
      {
        name: "description",
        content:
          "The complete Python roadmap for aspiring data analysts — Phase 1 (0-2 yrs) and Phase 2 (2-3+ yrs), 30-60-90 plan, projects, interview questions, and real-world scenarios.",
      },
      { property: "og:title", content: "Python Mastery Checklist — DataWithAarav" },
      {
        property: "og:description",
        content:
          "Phase 1 and Phase 2 topics, must-know skills, automation, ETL, APIs, performance, interview prep, and a 30-60-90 day plan.",
      },
    ],
  }),
  component: PythonRoadmap,
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
  googleCritical?: boolean;
}

const topics: Topic[] = [
  // Phase 1 Topics
  { order: 1, name: "Python Fundamentals — Syntax, Data Structures, Functions", difficulty: "Easy", hours: "2–3 weeks", phase: "Phase 1", priority: "Critical", mustKnow: true, mostCritical: true },
  { order: 2, name: "Pandas & NumPy — The Core Analytics Engine", difficulty: "Easy", hours: "4–5 weeks", phase: "Phase 1", priority: "Critical", mustKnow: true, mostCritical: true },
  { order: 3, name: "Data Cleaning — Real-World Dirty Data Workflows", difficulty: "Medium", hours: "3–4 weeks", phase: "Phase 1", priority: "Critical", mustKnow: true },
  { order: 4, name: "Data Visualization — Matplotlib, Seaborn & Plotly", difficulty: "Medium", hours: "3–4 weeks", phase: "Phase 1", priority: "High", mustKnow: true },
  { order: 5, name: "Daily Analyst Skills — Excel Automation, CSV, Reports", difficulty: "Medium", hours: "2–3 weeks", phase: "Phase 1", priority: "Critical", mustKnow: true },
  { order: 6, name: "Git & Version Control — Non-Negotiable", difficulty: "Medium", hours: "1–2 weeks", phase: "Phase 1", priority: "Critical", mustKnow: true, googleCritical: true },
  { order: 7, name: "Project Structure, venv & Reproducible Environments", difficulty: "Medium", hours: "1 week", phase: "Phase 1", priority: "Critical", mustKnow: true },
  { order: 8, name: "Testing, Type Hints & Code Quality — Senior-Level Craft", difficulty: "Medium", hours: "2 weeks", phase: "Phase 1", priority: "High", seniorLevel: true },

  // Phase 2 Topics
  { order: 9, name: "Automation — Reporting, Email, Scheduling, ETL Pipelines", difficulty: "Medium", hours: "3–4 weeks", phase: "Phase 2", priority: "High", mustKnow: true },
  { order: 10, name: "SQL + Python Integration — Databases, Queries, Workflows", difficulty: "Medium", hours: "3–4 weeks", phase: "Phase 2", priority: "Critical", mustKnow: true },
  { order: 11, name: "APIs & Web Scraping — External Data Ingestion", difficulty: "Medium", hours: "2–3 weeks", phase: "Phase 2", priority: "High", mustKnow: true },
  { order: 12, name: "Performance — Large Datasets, Memory, Optimization", difficulty: "Hard", hours: "3–4 weeks", phase: "Phase 2", priority: "High", seniorLevel: true },
  { order: 13, name: "BI Integration — Power BI, Dashboards, Data Refresh", difficulty: "Medium", hours: "2–3 weeks", phase: "Phase 2", priority: "High", mustKnow: true },
  { order: 14, name: "Advanced Analytics — Statistics, A/B Testing, Forecasting, ML Basics", difficulty: "Hard", hours: "4–6 weeks", phase: "Phase 2", priority: "High", seniorLevel: true },
  { order: 15, name: "BigQuery + Python — Google's Core Analytics Stack", difficulty: "Hard", hours: "3–4 weeks", phase: "Phase 2", priority: "High", googleCritical: true, seniorLevel: true },
  { order: 16, name: "Jupyter Best Practices — Papermill, nbconvert & Production Notebooks", difficulty: "Medium", hours: "1–2 weeks", phase: "Phase 2", priority: "High", mustKnow: true },
  { order: 17, name: "Automated EDA — ydata-profiling, Looker & Google Workspace APIs", difficulty: "Medium", hours: "1–2 weeks", phase: "Phase 2", priority: "High", googleCritical: true },
];

const phase1Topics: { icon: any; title: string; items: string[] }[] = [
  {
    icon: Code,
    title: "Python Fundamentals",
    items: [
      "Variables and data types: int, float, str, bool, None",
      "Collections: lists, tuples, dictionaries, sets",
      "Control flow: if/elif/else, for loops, while loops",
      "Functions: def, args/kwargs, return, lambda",
      "List comprehensions and dict comprehensions",
      "File handling: open, read, write, with context manager",
      "Exception handling: try/except/finally",
      "Modules and imports (os, sys, datetime, re)",
      "OOP basics: class, __init__, methods, inheritance",
    ],
  },
  {
    icon: Database,
    title: "Pandas Core Operations",
    items: [
      "DataFrame and Series creation, indexing, slicing",
      "loc vs iloc — label vs position based selection",
      "Filtering: boolean masks, query(), isin()",
      "Sorting: sort_values(), sort_index()",
      "GroupBy: .groupby().agg(), transform(), apply()",
      "Merge, join, concat — combining DataFrames",
      "Pivot tables: pivot_table(), crosstab()",
      "Date/time: pd.to_datetime(), .dt accessor",
      "String operations: .str accessor",
      "Missing values: isnull(), fillna(), dropna()",
    ],
  },
  {
    icon: FlaskRound,
    title: "Data Cleaning Patterns",
    items: [
      "Duplicate removal: drop_duplicates(subset=, keep=)",
      "Text cleaning: .str.strip(), .str.lower(), .str.replace()",
      "Type casting: pd.to_numeric(errors='coerce')",
      "Outlier detection: IQR method, Z-score, clip()",
      "Standardization: regex-based normalization",
      "Data validation: pandera, great_expectations",
      "Encoding issues: encoding='utf-8-sig'",
      "Production cleaning pipeline with copy()",
    ],
  },
  {
    icon: BarChart3,
    title: "Visualization Libraries",
    items: [
      "Matplotlib: foundation, full control, static reports",
      "Seaborn: statistical charts, heatmaps, distribution plots",
      "Plotly: interactive charts for notebooks and web dashboards",
      "Plotly Express: high-level API, one-line charts",
      "Chart selection: trend→line, comparison→bar, distribution→histogram",
      "Best practices: labels, titles, units, consistent colors",
    ],
  },
  {
    icon: Box,
    title: "Excel & File Automation",
    items: [
      "openpyxl — read/write Excel with formatting",
      "xlsxwriter — create formatted Excel reports",
      "pandas.ExcelWriter — multi-sheet Excel output",
      "pandas.read_csv with all parameters mastered",
      "glob, os — process multiple files",
      "Batch CSV processing pattern",
    ],
  },
  {
    icon: GitBranch,
    title: "Git & Version Control",
    items: [
      "git init, clone, status, add, commit — daily workflow",
      "git branch, checkout, merge — feature branching",
      "git pull, push, fetch — remote repos (GitHub/GitLab)",
      "git log --oneline, git diff — inspect history",
      "git stash — save work in progress",
      ".gitignore — never commit credentials or large files",
      "Conventional commit messages: feat:, fix:, chore:, docs:",
      "nbstripout — strip notebook outputs before commit",
    ],
  },
];

const phase2Topics: { icon: any; title: string; items: string[] }[] = [
  {
    icon: Workflow,
    title: "Automation & ETL",
    items: [
      "Email: smtplib, email.mime — send reports with attachments",
      "Scheduling: schedule library, cron (Linux), Windows Task Scheduler",
      "ETL: Extract → Transform → Load pipeline pattern",
      "Logging: Python logging module — essential for production",
      "Config files: .env, YAML, JSON — never hardcode",
      "Error alerts: try/except + email notification on failure",
      "Production pipeline pattern with logging",
    ],
  },
  {
    icon: Database,
    title: "SQL + Python Integration",
    items: [
      "sqlalchemy — database engine, works with all databases",
      "psycopg2 — PostgreSQL native driver",
      "pyodbc — SQL Server connection",
      "pandas.read_sql() — query to DataFrame directly",
      "DataFrame.to_sql() — write results back to DB",
      "Parameterized queries — SQL injection prevention",
      "Connection pooling for repeated queries",
      "Environment variables for credentials",
    ],
  },
  {
    icon: FileJson,
    title: "APIs & Web Scraping",
    items: [
      "requests — HTTP requests, REST APIs",
      "BeautifulSoup4 — HTML parsing",
      "Scrapy — production web scraping",
      "httpx — async HTTP (faster for many requests)",
      "json — parse API responses",
      "pandas.json_normalize() — flatten nested JSON",
      "Pagination pattern for collecting all pages",
      "Rate limiting and exponential backoff",
    ],
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    items: [
      "Dtype optimization: int32 vs int64, category for strings",
      "Chunked reading: pd.read_csv(chunksize=50000)",
      "Vectorization: replace apply() with numpy/pandas operations",
      "Parquet format: 10× faster than CSV, 5× smaller",
      "Polars library: Rust-based DataFrame, 5–50× faster than Pandas",
      "DuckDB: in-process SQL on DataFrames",
      "numba @jit: JIT-compile Python loops to machine code",
    ],
  },
  {
    icon: Presentation,
    title: "BI Integration & Dashboards",
    items: [
      "Python in Power Query: custom transforms using Python script",
      "Power BI REST API: trigger refresh, manage datasets",
      "Streamlit: build Python-native interactive dashboards in hours",
      "Dash (Plotly): full production dashboard apps",
      "Parquet/Delta files: Python writes → Power BI reads",
      "Streamlit dashboard with KPI cards and interactive filters",
    ],
  },
  {
    icon: Brain,
    title: "Advanced Analytics",
    items: [
      "Statistical tests: scipy.stats — t-test, chi-square, ANOVA",
      "A/B testing: power analysis, p-value, confidence intervals",
      "Forecasting: Prophet, statsmodels ARIMA, exponential smoothing",
      "Regression: scikit-learn LinearRegression, feature importance",
      "Clustering: K-Means for customer segmentation",
      "Correlation analysis: Pearson, Spearman, Kendall",
    ],
  },
  {
    icon: Cloud,
    title: "BigQuery + Python",
    items: [
      "google-cloud-bigquery — official BQ Python client",
      "pandas-gbq — lightweight BQ ↔ DataFrame bridge",
      "google-cloud-storage — read/write GCS buckets",
      "Cost-aware queries: use dry_run=True first",
      "Partitioned tables: always filter on partition column",
      "Clustering: cluster on high-cardinality columns",
      "pd.read_gbq() — single-line BQ → DataFrame",
    ],
  },
  {
    icon: Notebook,
    title: "Jupyter Production Workflows",
    items: [
      "papermill — execute notebooks with parameters from CLI or Python",
      "nbconvert — convert notebooks to HTML, PDF, Markdown, slides",
      "nbstripout — strip outputs before git commit",
      "Notebook structure: title → imports → parameters → sections → output",
      "Parameters cell: tag one cell as 'parameters' for Papermill",
      "Automated notebook execution over multiple parameters",
    ],
  },
  {
    icon: FileSearch,
    title: "Automated EDA & Google APIs",
    items: [
      "ydata-profiling — full EDA report in 2 lines",
      "Minimal mode for large datasets (>500K rows)",
      "Google Sheets API (gspread) — Python to Sheets",
      "Looker/Looker Studio — BQ-native dashboards",
      "Google Workspace APIs — Drive, Sheets automation",
      "Automated data exports to Google Sheets",
    ],
  },
];

const interviewPhases = [
  {
    n: "1",
    title: "Phase 1 — Fundamentals Cold",
    when: "Week 1 · Daily 1.5 hrs",
    a: {
      title: "Must write from memory",
      items: [
        "List vs tuple vs dict vs set — when to use each",
        "loc vs iloc — demonstrate both with examples",
        "GroupBy + agg vs groupBy + transform — business examples",
        "Clean a column with mixed formats to numeric",
        "Write a function with proper type hints and docstring",
      ],
    },
    b: {
      title: "Practice method",
      items: [
        "LeetCode Python — Easy/Medium problems timed",
        "Write Pandas operations without documentation",
        "Explain code out loud as you write it",
        "Practice with real datasets (Kaggle, StrataScratch)",
      ],
    },
  },
  {
    n: "2",
    title: "Pandas & Data Manipulation Sprint",
    when: "Week 2 · Daily 2 hrs",
    a: {
      title: "Master these patterns",
      items: [
        "Filtering with boolean masks and query()",
        "Merge, join, concat — know all 3 and when to use",
        "Pivot tables and crosstab for business reporting",
        "Date operations: to_datetime, .dt accessor, date arithmetic",
        "Apply vs vectorized operations — performance implications",
      ],
    },
    b: {
      title: "Interview tips",
      items: [
        "Explain SettingWithCopyWarning and how to avoid it",
        "Mention memory optimization (dtype downcasting)",
        "Discuss when to use apply() and when not to",
        "Always mention .copy() when working with slices",
      ],
    },
  },
  {
    n: "3",
    title: "Phase 2 — Automation & ETL",
    when: "Week 3 · Daily 1.5 hrs",
    a: {
      title: "Production patterns",
      items: [
        "Design an ETL pipeline with logging and error handling",
        "Parameterized SQL queries in Python (security)",
        "API integration with pagination and rate limiting",
        "Email automation with attachments",
        "Scheduling with schedule library or cron",
      ],
    },
    b: {
      title: "Standout elements",
      items: [
        "Show logging in every pipeline",
        "Use .env files for credentials",
        "Write tests for ETL functions",
        "Document with READMEs and docstrings",
        "Version control with clean git commits",
      ],
    },
  },
  {
    n: "4",
    title: "Performance & Advanced Analytics",
    when: "Week 4 · 4–6 hrs per task",
    a: {
      title: "Senior-level skills",
      items: [
        "Optimize a 50M row DataFrame (dtypes, chunking, DuckDB)",
        "Build an A/B test analysis function",
        "Create a forecasting model (Prophet or ARIMA)",
        "Build a Streamlit dashboard with interactive filters",
        "Integrate BigQuery with Python (cost-aware queries)",
      ],
    },
    b: {
      title: "Portfolio talking points",
      items: [
        "Real project where Python saved significant time",
        'Quantify impact: "4-hour manual task → 30-second script"',
        "Production features: logging, error handling, config files",
        "Testing and code quality practices",
        "Git workflow with feature branches and PRs",
      ],
    },
  },
];

const interviewQs: { section: string; items: string[] }[] = [
  {
    section: "Python Fundamentals",
    items: [
      "What is the GIL in Python and how does it affect multi-threaded data processing?",
      "What are list comprehensions? Write one to extract emails from a list of strings.",
      "What is the difference between a shallow copy and a deep copy? When does it matter in Pandas?",
      "How do decorators work? Write a timing decorator for an analytics function.",
      "What is the difference between a list and a tuple? When would you use each?",
    ],
  },
  {
    section: "Pandas Core",
    items: [
      "What is SettingWithCopyWarning? How do you avoid it?",
      "What is the difference between merge() and join()? When would you use each?",
      "How does groupby + transform differ from groupby + agg? Give a business example.",
      "How would you find and handle outliers in a revenue column? Write the code.",
      "How do you calculate a 7-day rolling average in Pandas?",
      "What is pd.cut() and pd.qcut()? When would you use each for analytics?",
    ],
  },
  {
    section: "Data Cleaning",
    items: [
      "A column contains '£1,200', '1200.00', 'N/A'. Clean it to float in one pipeline.",
      "How would you standardize inconsistent date formats across 50,000 rows?",
      "What is the difference between fillna(method='ffill') and fillna(value=0)?",
    ],
  },
  {
    section: "Automation & Production",
    items: [
      "Design a Python script that reads SQL, creates a report, and emails it every Monday.",
      "How do you prevent hardcoded credentials in Python scripts?",
      "What logging best practices do you follow for production analytics scripts?",
      "How do you handle an API that returns paginated results?",
    ],
  },
  {
    section: "Performance",
    items: [
      "A Pandas apply() on 10M rows takes 45 minutes. How do you fix it?",
      "How do you process a 5GB CSV that doesn't fit in RAM?",
      "When would you use Polars instead of Pandas?",
    ],
  },
  {
    section: "Analytics & Statistics",
    items: [
      "What is p-value? In an A/B test, p=0.04 with 10 variants. Is the result significant?",
      "How do you calculate customer lifetime value in Python from a transaction dataset?",
      "What is the difference between correlation and causation? Give a real analytics example.",
      "Write a Python function to calculate month-over-month revenue growth for each product.",
    ],
  },
];

const learningPlan = [
  {
    phase: "Days 1–30",
    heading: "Phase 1 Foundation",
    sub: "Python Fundamentals, Pandas, NumPy, Data Cleaning",
    weeks: [
      { d: "Days 1–6", t: "Python Fundamentals", desc: "Data types, loops, functions, list comprehensions, exception handling" },
      { d: "Days 7–12", t: "NumPy + Pandas I", desc: "DataFrames, loc/iloc, filtering, sorting, reading CSV/Excel" },
      { d: "Days 13–18", t: "Pandas II — Analysis", desc: "GroupBy, merge, pivot tables, date operations, apply/map" },
      { d: "Days 19–24", t: "Data Cleaning", desc: "Duplicates, text cleaning, outliers, validation, reusable pipelines" },
      { d: "Days 25–30", t: "Weekend Project", desc: "Sales analysis pipeline: CSV → clean → analyze → Excel report" },
    ],
  },
  {
    phase: "Days 31–60",
    heading: "Phase 1 Complete",
    sub: "Visualization, Excel Automation, Daily Analyst Tasks",
    weeks: [
      { d: "Days 31–36", t: "Data Visualization", desc: "Matplotlib, Seaborn, Plotly, chart selection, business storytelling" },
      { d: "Days 37–42", t: "Excel Automation", desc: "openpyxl, ExcelWriter, multi-sheet reports, conditional formatting" },
      { d: "Days 43–48", t: "Daily Analyst Tasks", desc: "Scheduled reports, KPI tracking, ad-hoc analysis workflows" },
      { d: "Days 49–54", t: "Project 2", desc: "Automated EDA report generator class" },
      { d: "Days 55–60", t: "Phase 1 Review", desc: "Interview prep: 20 Pandas questions cold, code review, portfolio polish" },
    ],
  },
  {
    phase: "Days 61–90",
    heading: "Phase 2 — Advanced",
    sub: "SQL, Automation, APIs, Performance, Advanced Analytics",
    weeks: [
      { d: "Days 61–66", t: "SQL + Python", desc: "SQLAlchemy, parameterized queries, read_sql, to_sql, DB patterns" },
      { d: "Days 67–72", t: "Automation + ETL", desc: "Logging, scheduling, email automation, full pipeline design" },
      { d: "Days 73–78", t: "Project 3", desc: "Automated weekly report system: DB → transform → Excel → email" },
      { d: "Days 79–84", t: "APIs + Performance", desc: "requests, pagination, dtype optimization, chunking, DuckDB" },
      { d: "Days 85–90", t: "Advanced Analytics + Dashboard", desc: "A/B testing, forecasting basics, Streamlit dashboard — Project 4" },
    ],
  },
];

const projects = [
  { code: "P1", tier: "Beginner", h: "4–6hrs", t: "Sales Analysis Pipeline — E-Commerce Dataset", d: "Read CSV, clean data (duplicates, nulls, outliers), calculate KPIs (revenue, AOV, MoM growth), create 5 visualizations, output formatted Excel report." },
  { code: "P2", tier: "Intermediate", h: "6–8hrs", t: "Automated EDA Report Generator", d: "Build a DataProfiler class that accepts any DataFrame and outputs HTML EDA report: data profiling, correlation heatmap, outlier detection, and business commentary." },
  { code: "P3", tier: "Advanced", h: "10–12hrs", t: "Automated Weekly Business Report System", d: "ETL pipeline: connect to SQL, run queries, transform with Pandas, create Plotly charts, format Excel with openpyxl, email to stakeholders at 7am every Monday." },
  { code: "P4", tier: "Advanced", h: "12–15hrs", t: "Customer Churn Analysis + A/B Test Framework", d: "RFM segmentation, cohort retention heatmap, churn prediction with logistic regression, A/B test analysis, Streamlit dashboard with interactive filters." },
  { code: "P5", tier: "Hard", h: "15–20hrs", t: "Supply Chain Demand Forecasting", d: "Pull historical sales via API, enrich with external APIs, train Prophet/ARIMA model, build Streamlit dashboard with actuals vs forecast and confidence intervals." },
];

const scenarios = [
  {
    icon: "📊",
    title: "Scenario 1 — 'Our weekly report takes 4 hours manually — automate it'",
    cols: [
      { h: "Current process", items: ["Download CSVs from 5 systems", "Manual copy-paste into Excel", "Create pivot tables", "Format charts and KPIs", "Email to 20 stakeholders"] },
      { h: "Python solution", items: ["Write a pandas script to combine sources", "Power Query style cleaning pipeline", "Automate pivot tables with groupby", "Plotly charts with consistent branding", "smtplib email with attachments"] },
      { h: "Business impact", items: ["4-hour manual → 30-second script", "Zero copy-paste errors", "Audit trail with logging", "Stakeholder confidence in data quality", "Free time for deeper analytics"] },
    ],
  },
  {
    icon: "🗄",
    title: "Scenario 2 — 'Query a database and build a dashboard for stakeholders'",
    cols: [
      { h: "Challenge", items: ["Stakeholders need daily KPI visibility", "Data lives in SQL database", "Dashboards must be interactive", "No budget for Power BI licenses"] },
      { h: "Python solution", items: ["SQLAlchemy to connect and query", "Pandas for transformation", "Streamlit for interactive dashboard", "Deploy on Streamlit Cloud for free"] },
      { h: "Output", items: ["Interactive dashboard with filters", "KPI cards with metrics", "Trend charts with date range", "CSV download for stakeholders"] },
    ],
  },
  {
    icon: "🌐",
    title: "Scenario 3 — 'Pull data from an external API for competitive intelligence'",
    cols: [
      { h: "Requirements", items: ["Pull competitor pricing data daily", "API has rate limits (100/min)", "Need historical trend analysis", "Alert when price changes >10%"] },
      { h: "Python solution", items: ["requests with exponential backoff", "Pagination for all pages", "Store in Parquet for efficiency", "Schedule with cron job"] },
      { h: "Output", items: ["Daily competitor price snapshot", "Trend analysis with Plotly", "Automated price change alerts", "Clean data ready for analysis"] },
    ],
  },
  {
    icon: "⚡",
    title: "Scenario 4 — 'Our 50M row Python script crashes with MemoryError'",
    cols: [
      { h: "Diagnosis", items: ["Dataset is 5GB CSV", "Pandas loads entire file into RAM", "Apply operations are slow", "Script runs out of memory"] },
      { h: "Optimization", items: ["Use dtype downcasting (30-50% memory reduction)", "Process in chunks with pd.read_csv(chunksize=)", "Switch to Polars or DuckDB for 10× speedup", "Save intermediate as Parquet"] },
      { h: "Results", items: ["Script runs on 4GB RAM", "Processing time: 45min → 5min", "No more memory errors", "Pattern reusable for other datasets"] },
    ],
  },
];

const bestPractices = [
  { h: "Code Organization", items: ["One function = one responsibility", "Separate concerns: extract.py, transform.py, load.py", "Config files (YAML/JSON) for all parameters", "requirements.txt + virtual environment for every project", "Follow PEP8: use flake8 or black formatter", "Docstrings on every function: purpose, params, returns", "Type hints everywhere"] },
  { h: "Security & Reliability", items: ["Never hardcode credentials — use python-dotenv + .env", "Always use parameterized SQL — never string concatenation", "Validate all inputs before processing", "Log every pipeline step with timestamps and row counts", "Test data quality assertions before downstream use"] },
  { h: "Performance Standards", items: ["Profile before optimizing — use %timeit and memory_profiler", "Avoid apply() — use vectorized operations always", "Set correct dtypes at read time — saves 50-70% memory", "Use Parquet over CSV for intermediate files", "Process in chunks for > 1M rows", "Use DuckDB for complex SQL-like aggregations"] },
  { h: "Testing & Documentation", items: ["Write pytest tests for every transformation function", "Test with edge cases: empty DataFrame, all-null column", "README in every project: setup, usage, data sources", "Jupyter Notebooks: use markdown to explain decisions", "Version control: commit after every working feature"] },
  { h: "Anti-Patterns to Avoid", items: ["Chained assignment: df['a']['b'] = 1 — use .loc always", "Iterating rows with iterrows() — use vectorized alternatives", "apply() with a lambda that could be vectorized", "Reading entire files when only specific columns needed", "No error handling in production scripts", "Magic numbers everywhere — define as named constants"] },
  { h: "Data Standards", items: ["Always validate row counts before/after merge", "Log 'before' and 'after' counts for every cleaning step", "Save intermediate checkpoints to Parquet", "Never overwrite source files", "Use UTC timestamps internally", "Store raw, clean, and aggregated data at different stages"] },
];

const resources = [
  { h: "Free Learning Resources", items: [
    { l: "Kaggle — Python for Data Science", u: "https://www.kaggle.com/learn/python" },
    { l: "Pandas Documentation", u: "https://pandas.pydata.org/docs/" },
    { l: "DataCamp — Python Cheat Sheets", u: "https://www.datacamp.com/cheat-sheet" },
    { l: "Real Python — Tutorials", u: "https://realpython.com/" },
    { l: "LeetCode Python — Practice Problems", u: "https://leetcode.com/problemset/all/" },
  ]},
  { h: "Books & Reference", items: [
    { l: "Python for Data Analysis — Wes McKinney", u: "https://wesmckinney.com/book/" },
    { l: "Effective Python — Brett Slatkin", u: "https://effectivepython.com/" },
    { l: "Fluent Python — Luciano Ramalho", u: "https://www.fluentpython.com/" },
    { l: "Think Python — Allen B. Downey", u: "https://greenteapress.com/thinkpython/" },
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

function PythonRoadmap() {
  const storageKey = "roadmap-progress:python";
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
          MASTERY CHECKLIST · PYTHON
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-3 text-gradient-brand">
          Python for Data Analytics
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-6">
          The complete Python journey for aspiring data analysts. Phase 1 (0–2 yrs) and Phase 2 (2–3+ yrs) topics, 
          17 priority-ranked topics, a 30-60-90 day plan, 5 portfolio projects, real-world scenarios, and interview prep.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5"><Signal className="size-4" /> Beginner → Senior</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="size-4" /> ~200 hrs total</span>
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
                      {t.googleCritical && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-400">
                          <Zap className="size-3" /> Google Critical
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
                    <p className="mt-1">Practice with real datasets (Kaggle, company data) and build a reusable function/class.</p>
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
      <Section id="phase1" eyebrow="Phase 1 · 0–2 Years" title="Must Know for Early Data Analysts" subtitle="Core Python skills every data analyst must master in their first two years. Tested in interviews and used daily.">
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
      <Section id="phase2" eyebrow="Phase 2 · 2–3+ Years" title="Advanced Python Skills for Senior Analysts" subtitle="Automation, SQL integration, APIs, performance optimization, BI tools, and advanced analytics.">
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
      <Section id="plan" eyebrow="Structured" title="30-60-90 Day Python Learning Plan" subtitle="For a working analyst putting in 2–3 hrs/day. Phase 1 in Days 1–60. Phase 2 in Days 61–90 and beyond.">
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
      <Section id="interview" eyebrow="Interview Prep" title="4-Phase Interview Preparation Roadmap" subtitle="Expect live coding exercises — practice for speed and accuracy.">
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
      <Section title="Top Python Interview Questions" subtitle="Common questions asked at data analyst interviews across tech, finance, and consulting.">
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
      <Section id="projects" eyebrow="Portfolio" title="Hands-On Projects & Portfolio Ideas" subtitle="Build these to prove real-world Python mastery. Each covers multiple topic areas.">
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <Card key={p.code}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-brand">{p.code}</span>
                <Badge className={p.tier === "Beginner" ? diffStyles.Easy : p.tier === "Intermediate" ? diffStyles.Medium : p.tier === "Hard" ? diffStyles.Hard : "bg-rose-500/10 text-rose-400 border-rose-500/20"}>
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
      <Section id="best-practices" eyebrow="Standards" title="Python Best Practices Used at Companies" subtitle="Standards followed by professional analysts at product companies, consulting firms, and data-driven enterprises.">
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
      <Section id="resources" eyebrow="Level Up" title="Python Learning Resources">
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