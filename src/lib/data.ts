export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type TopicDifficulty = "Easy" | "Medium" | "Hard";
export type Priority = "Critical" | "Important" | "Nice to have";

export interface RoadmapTopic {
  name: string;
  description?: string;
  resources?: { label: string; url: string }[];
  practice?: { label: string; url: string }[];
  interview?: string[];
  difficulty?: TopicDifficulty;
  hours?: string;
  priority?: Priority;
  mustKnow?: boolean;
}

export interface RoadmapStage {
  title: string;
  topics: RoadmapTopic[];
}


export interface Roadmap {
  slug: string;
  title: string;
  tagline: string;
  overview: string;
  difficulty: Difficulty;
  estimatedTime: string;
  skills: string[];
  stages: RoadmapStage[];
}

export const roadmaps: Roadmap[] = [
  {
    slug: "data-analyst",
    title: "Data Analyst Roadmap",
    tagline: "The complete zero-to-hired path.",
    overview:
      "A structured eight-stage sequence covering every skill a modern data analyst needs, from spreadsheets to production dashboards.",
    difficulty: "Beginner",
    estimatedTime: "4–6 months",
    skills: ["Probability & Statistics", "Excel", "SQL", "Python & Libraries", "Visualization Tools"],
    stages: [
      {
        title: "Probability & Statistics",
        topics: [
          { name: "Descriptive Stats", description: "Mean, median, mode, variance, std dev." },
          { name: "Probability" },
          { name: "Sampling & Distributions" },
          { name: "Hypothesis Testing", description: "t-test, chi-square, p-values." },
        ],
      },
      {
        title: "Excel Basics",
        topics: [
          {
            name: "Formulas & Functions",
            description: "SUM, IF, VLOOKUP, XLOOKUP, INDEX/MATCH — the foundation.",
            resources: [
              { label: "ExcelJet reference", url: "https://exceljet.net/" },
              { label: "Microsoft Excel docs", url: "https://support.microsoft.com/excel" },
            ],
            practice: [{ label: "Chandoo challenges", url: "https://chandoo.org/" }],
            interview: [
              "Difference between VLOOKUP and XLOOKUP?",
              "How do you handle errors in formulas?",
            ],
          },
          { name: "Pivot Tables & Charts", description: "Summarize and visualize quickly." },
          { name: "Data Cleaning", description: "Text-to-columns, Power Query, deduping." },
        ],
      },
      {
        title: "SQL",
        topics: [
          {
            name: "SELECT · WHERE · GROUP BY · HAVING",
            resources: [
              { label: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/" },
              { label: "PostgreSQL docs", url: "https://www.postgresql.org/docs/" },
            ],
            practice: [
              { label: "LeetCode SQL", url: "https://leetcode.com/problemset/database/" },
              { label: "StrataScratch", url: "https://www.stratascratch.com/" },
            ],
            interview: ["Difference between WHERE and HAVING?", "Explain GROUP BY."],
          },
          { name: "Joins (INNER, LEFT, RIGHT, FULL)" },
          { name: "Window Functions", description: "ROW_NUMBER, RANK, LEAD, LAG." },
          { name: "CTEs & Subqueries" },
        ],
      },
      {
        title: "Python & Libraries",
        topics: [
          { name: "Core Python", description: "Variables, loops, functions, comprehensions." },
          {
            name: "Pandas",
            resources: [{ label: "Pandas docs", url: "https://pandas.pydata.org/docs/" }],
          },
          { name: "NumPy" },
          { name: "Matplotlib & Seaborn" },
        ],
      },
      {
        title: "Visualization Tools",
        topics: [
          { name: "Data Modeling (Power BI/Tableau)", description: "Star schema, relationships." },
          { name: "DAX & Calculations", description: "Measures, calculated columns, time intelligence." },
          { name: "Building Dashboards", description: "Create interactive dashboards with both tools." },
          { name: "Storytelling with Data", description: "Effective visualization storytelling techniques." },
        ],
      },
      {
        title: "Portfolio",
        topics: [
          { name: "Pick 3–5 end-to-end projects" },
          { name: "Publish on GitHub & Tableau Public" },
          { name: "Write a case study for each" },
        ],
      },
      {
        title: "Job Ready",
        topics: [
          { name: "Resume tuned for ATS" },
          { name: "Behavioral & case interview prep" },
          { name: "LinkedIn & networking" },
        ],
      },
    ],
  },
  {
    slug: "statistics",
    title: "Statistics Roadmap",
    tagline: "Think in distributions, not spreadsheets.",
    overview: "The stats every analyst is expected to know.",
    difficulty: "Intermediate",
    estimatedTime: "5–7 weeks",
    skills: ["Descriptive", "Probability", "Inference", "A/B Testing"],
    stages: [
      { title: "Descriptive", topics: [{ name: "Central tendency" }, { name: "Dispersion" }] },
      { title: "Probability", topics: [{ name: "Distributions" }, { name: "Bayes" }] },
      { title: "Inference", topics: [{ name: "Confidence intervals" }, { name: "Hypothesis testing" }] },
      { title: "A/B Testing", topics: [{ name: "Experiment design" }, { name: "Power & sample size" }] },
    ],
  },
  {
    slug: "excel",
    title: "Excel Roadmap",
    tagline: "Still the world's #1 analytics tool.",
    overview: "Formulas, Pivot Tables, Power Query, and dashboards.",
    difficulty: "Beginner",
    estimatedTime: "3–4 weeks",
    skills: ["Formulas", "Pivots", "Power Query", "Charts"],
    stages: [
      { title: "Foundations", topics: [{ name: "Formulas" }, { name: "References" }] },
      { title: "Analysis", topics: [{ name: "Pivot Tables" }, { name: "Power Query" }] },
      { title: "Dashboards", topics: [{ name: "Charts" }, { name: "Interactive dashboards" }] },
    ],
  },
  {
    slug: "sql",
    title: "SQL Roadmap",
    tagline: "The universal language of data.",
    overview: "From SELECT to window functions and query optimization.",
    difficulty: "Beginner",
    estimatedTime: "4–6 weeks",
    skills: ["Queries", "Joins", "Aggregation", "Windows", "Optimization"],
    stages: [
      { title: "Foundations", topics: [{ name: "SELECT, WHERE, ORDER BY" }, { name: "Filtering & operators" }] },
      { title: "Aggregation", topics: [{ name: "GROUP BY & HAVING" }, { name: "Aggregate functions" }] },
      { title: "Joins", topics: [{ name: "INNER, LEFT, RIGHT, FULL" }, { name: "Self joins" }] },
      { title: "Advanced", topics: [{ name: "Window functions" }, { name: "CTEs & recursion" }, { name: "Indexes & EXPLAIN" }] },
    ],
  },
  {
    slug: "python",
    title: "Python for Data Analysis",
    tagline: "Automate cleaning, analysis, and reporting.",
    overview: "Practical Python centered on Pandas, NumPy, and visualization.",
    difficulty: "Intermediate",
    estimatedTime: "6–8 weeks",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Jupyter"],
    stages: [
      { title: "Core Python", topics: [{ name: "Syntax & control flow" }, { name: "Functions & modules" }] },
      { title: "Pandas", topics: [{ name: "Series & DataFrames" }, { name: "GroupBy & merges" }] },
      { title: "NumPy", topics: [{ name: "Arrays & vectorization" }] },
      { title: "Visualization", topics: [{ name: "Matplotlib" }, { name: "Seaborn" }, { name: "Plotly" }] },
    ],
  },
  {
    slug: "visualization-tools",
    title: "Visualization Tools Roadmap",
    tagline: "Ship stakeholder-ready dashboards.",
    overview: "Data modeling, DAX, calculations, and storytelling with Power BI & Tableau.",
    difficulty: "Intermediate",
    estimatedTime: "6–8 weeks",
    skills: ["Modeling", "DAX", "Calculations", "Dashboards", "Storytelling"],
    stages: [
      { title: "Foundations", topics: [{ name: "Connecting to data" }, { name: "Star schema & relationships" }] },
      { title: "Power BI Deep Dive", topics: [{ name: "DAX measures" }, { name: "Time intelligence" }, { name: "Power BI publishing" }] },
      { title: "Tableau Advanced", topics: [{ name: "LOD expressions" }, { name: "Parameters" }, { name: "Tableau publishing" }] },
      { title: "Storytelling", topics: [{ name: "Dashboards" }, { name: "Story points" }] },
    ],
  },
];

export interface Project {
  name: string;
  category: string;
  difficulty: Difficulty;
  tools: string[];
  description: string;
  skills: string[];
  dataset?: string;
}

export const projects: Project[] = [
  {
    name: "Netflix Content Analysis",
    category: "SQL",
    difficulty: "Beginner",
    tools: ["SQL", "Tableau"],
    description: "Analyze content trends, genres, and country of production over 20 years.",
    skills: ["Aggregation", "String parsing", "Visualization"],
    dataset: "https://www.kaggle.com/datasets/shivamb/netflix-shows",
  },
  {
    name: "Amazon Sales Analysis",
    category: "Python",
    difficulty: "Intermediate",
    tools: ["Python", "Pandas"],
    description: "Explore revenue, categories, and top sellers from Amazon transaction data.",
    skills: ["Pandas", "EDA", "Visualization"],
  },
  {
    name: "HR Analytics Dashboard",
    category: "Power BI",
    difficulty: "Intermediate",
    tools: ["Power BI", "DAX"],
    description: "Attrition, tenure, and diversity KPIs in an executive-ready dashboard.",
    skills: ["Modeling", "DAX", "Design"],
  },
  {
    name: "Customer Churn Analysis",
    category: "End-to-End",
    difficulty: "Advanced",
    tools: ["Python", "SQL", "Tableau"],
    description: "Identify churn drivers with cohort analysis and predictive modeling.",
    skills: ["Cohorts", "Logistic Regression", "Storytelling"],
  },
  {
    name: "Retail Sales Dashboard",
    category: "Tableau",
    difficulty: "Intermediate",
    tools: ["Tableau"],
    description: "A multi-page dashboard breaking down sales by region, category, and time.",
    skills: ["Dashboards", "LOD", "Parameters"],
  },
  {
    name: "Olympics Data Analysis",
    category: "SQL",
    difficulty: "Beginner",
    tools: ["SQL", "Python"],
    description: "120 years of Olympic history — medals, nations, and athlete demographics.",
    skills: ["Joins", "Window functions", "EDA"],
  },
  {
    name: "IPL Data Analysis",
    category: "Python",
    difficulty: "Intermediate",
    tools: ["Python", "Pandas", "Seaborn"],
    description: "Batting, bowling, and team performance across every IPL season.",
    skills: ["Pandas", "Visualization"],
  },
  {
    name: "Spotify Streaming Dashboard",
    category: "Power BI",
    difficulty: "Intermediate",
    tools: ["Power BI"],
    description: "Track top artists, genres, and listening habits over time.",
    skills: ["Modeling", "DAX", "Dashboards"],
  },
  {
    name: "HR Attrition — Excel",
    category: "Excel",
    difficulty: "Beginner",
    tools: ["Excel"],
    description: "Build a fully interactive HR dashboard using only Excel.",
    skills: ["Pivots", "Charts", "Slicers"],
  },
];

export const projectCategories = ["All", "Probability & Statistics", "Excel", "SQL", "Python & Libraries", "Visualization Tools", "End-to-End"] as const;

export interface QAItem {
  q: string;
  a: string;
  level: Difficulty;
}

export interface QACategory {
  category: string;
  slug: string;
  items: QAItem[];
}

export const interviewQuestions: QACategory[] = [
  {
    category: "Probability & Statistics",
    slug: "statistics",
    items: [
      { level: "Beginner", q: "Mean vs Median?", a: "Mean is the arithmetic average; median is the middle value and is robust to outliers." },
      { level: "Beginner", q: "Basic probability concepts?", a: "Independent events, conditional probability, Bayes' theorem." },
      { level: "Intermediate", q: "What is a p-value?", a: "The probability of observing data at least as extreme as the sample, assuming the null is true." },
      { level: "Intermediate", q: "Sampling distributions & confidence intervals?", a: "Understanding sample vs population, CLT, and calculating confidence levels." },
      { level: "Advanced", q: "Type I vs Type II error?", a: "Type I: rejecting a true null. Type II: failing to reject a false null." },
    ],
  },
  {
    category: "Excel",
    slug: "excel",
    items: [
      { level: "Beginner", q: "VLOOKUP vs XLOOKUP?", a: "XLOOKUP supports left lookups, exact match by default, and returns arrays." },
      { level: "Intermediate", q: "What is Power Query used for?", a: "ETL inside Excel — connecting, transforming, and loading data reproducibly." },
    ],
  },
  {
    category: "SQL",
    slug: "sql",
    items: [
      { level: "Beginner", q: "Difference between WHERE and HAVING?", a: "WHERE filters rows before aggregation; HAVING filters groups after aggregation." },
      { level: "Beginner", q: "What is a primary key?", a: "A column (or set) uniquely identifying each row, non-null and unique." },
      { level: "Intermediate", q: "Explain the different types of JOINs.", a: "INNER returns matches; LEFT/RIGHT keep all rows from one side; FULL keeps everything; CROSS is Cartesian." },
      { level: "Intermediate", q: "What is a window function?", a: "A function computed over a set of rows related to the current row without collapsing them." },
      { level: "Advanced", q: "How would you find the second highest salary?", a: "Use DENSE_RANK() OVER (ORDER BY salary DESC) and filter where rank = 2." },
    ],
  },
  {
    category: "Python & Libraries",
    slug: "python",
    items: [
      { level: "Beginner", q: "List vs Tuple?", a: "Lists are mutable; tuples are immutable and hashable." },
      { level: "Intermediate", q: "Difference between loc and iloc in Pandas?", a: "loc is label-based; iloc is integer position-based." },
      { level: "Advanced", q: "How do you optimize a slow Pandas pipeline?", a: "Vectorize, avoid apply, use categorical dtypes, chunk reads, and consider Polars/DuckDB." },
    ],
  },
  {
    category: "Visualization Tools",
    slug: "visualization-tools",
    items: [
      { level: "Beginner", q: "What is DAX?", a: "Data Analysis Expressions — the formula language for Power BI, Power Pivot, and SSAS." },
      { level: "Beginner", q: "Dimensions vs Measures?", a: "Dimensions are qualitative; measures are quantitative values you aggregate." },
      { level: "Intermediate", q: "Calculated column vs measure?", a: "Columns are row-level and stored; measures are computed at query time based on filter context." },
      { level: "Intermediate", q: "What is an LOD expression?", a: "Level of Detail — override the visualization's granularity for a specific calculation." },
    ],
  },
];

export interface ResourceSection {
  title: string;
  slug: string;
  items: { label: string; url: string; note?: string }[];
}

export const practiceResources: ResourceSection[] = [
  {
    title: "Statistics Practice",
    slug: "statistics",
    items: [
      { label: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability" },
      { label: "StatQuest (YouTube)", url: "https://www.youtube.com/@statquest" },
    ],
  },
  {
    title: "Excel Practice",
    slug: "excel",
    items: [
      { label: "Chandoo", url: "https://chandoo.org/" },
      { label: "Excel Jet", url: "https://exceljet.net/" },
    ],
  },
  {
    title: "SQL Practice",
    slug: "sql",
    items: [
      { label: "LeetCode SQL", url: "https://leetcode.com/problemset/database/" },
      { label: "StrataScratch", url: "https://www.stratascratch.com/" },
      { label: "HackerRank SQL", url: "https://www.hackerrank.com/domains/sql" },
      { label: "SQLZoo", url: "https://sqlzoo.net/" },
    ],
  },
  {
    title: "Python Practice",
    slug: "python",
    items: [
      { label: "HackerRank Python", url: "https://www.hackerrank.com/domains/python" },
      { label: "Kaggle Learn", url: "https://www.kaggle.com/learn" },
      { label: "Exercism", url: "https://exercism.org/tracks/python" },
    ],
  },
  {
    title: "Power BI Practice",
    slug: "power-bi",
    items: [
      { label: "Enterprise DNA", url: "https://enterprisedna.co/" },
      { label: "Data Stories Gallery", url: "https://community.fabric.microsoft.com/t5/Data-Stories-Gallery/bd-p/DataStoriesGallery" },
    ],
  },
  {
    title: "Tableau Practice",
    slug: "tableau",
    items: [
      { label: "Makeover Monday", url: "https://www.makeovermonday.co.uk/" },
      { label: "Workout Wednesday", url: "https://workout-wednesday.com/" },
    ],
  },
];

export const learningResources: ResourceSection[] = [
  {
    title: "Statistics",
    slug: "statistics",
    items: [
      { label: "Khan Academy — Statistics & Probability", url: "https://www.khanacademy.org/math/statistics-probability" },
      { label: "StatQuest (YouTube) — Visual Statistics", url: "https://www.youtube.com/@statquest" },
      { label: "DataCamp — Statistics Cheat Sheets", url: "https://www.datacamp.com/cheat-sheet" },
      { label: "OpenIntro Statistics — Free Textbook", url: "https://www.openintro.org/book/os/" },
      { label: "3Blue1Brown — Probability Visualizations", url: "https://www.youtube.com/@3blue1brown" },
      { label: "Seeing Theory — Interactive Statistics", url: "https://seeing-theory.brown.edu/" },
    ],
  },
  {
    title: "Excel",
    slug: "excel",
    items: [
      { label: "Microsoft Excel Support", url: "https://support.microsoft.com/excel" },
      { label: "ExcelJet — Formula Reference", url: "https://exceljet.net/" },
      { label: "Chandoo.org — Dashboards", url: "https://chandoo.org/" },
      { label: "Excel Campus (YouTube)", url: "https://www.youtube.com/@ExcelCampus" },
      { label: "MyExcelOnline", url: "https://www.myexcelonline.com/" },
    ],
  },
  {
    title: "SQL",
    slug: "sql",
    items: [
      { label: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/" },
      { label: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs/" },
      { label: "SQLBolt", url: "https://sqlbolt.com/" },
    ],
  },
  {
    title: "Python",
    slug: "python",
    items: [
      { label: "Kaggle — Python for Data Science", url: "https://www.kaggle.com/learn/python" },
      { label: "Pandas Documentation", url: "https://pandas.pydata.org/docs/" },
      { label: "DataCamp — Python Cheat Sheets", url: "https://www.datacamp.com/cheat-sheet" },
      { label: "Real Python — Tutorials", url: "https://realpython.com/" },
      { label: "LeetCode Python — Practice Problems", url: "https://leetcode.com/problemset/all/" },
      { label: "Python Docs", url: "https://docs.python.org/3/" },
    ],
  },
  {
    title: "Power BI",
    slug: "power-bi",
    items: [
      { label: "Power BI Documentation", url: "https://docs.microsoft.com/en-us/power-bi/" },
      { label: "DAX Reference Guide", url: "https://dax.guide/" },
      { label: "Power Query Documentation", url: "https://docs.microsoft.com/en-us/power-query/" },
      { label: "SQLBI — DAX Patterns", url: "https://www.sqlbi.com/" },
      { label: "Microsoft Learn — Power BI", url: "https://learn.microsoft.com/power-bi/" },
    ],
  },
  {
    title: "Tableau",
    slug: "tableau",
    items: [
      { label: "Tableau Learning", url: "https://www.tableau.com/learn" },
      { label: "Tableau Public Gallery", url: "https://public.tableau.com/app/discover" },
    ],
  },
];

export interface Dashboard {
  title: string;
  tool: string;
  category: string;
  description: string;
  skills: string[];
}

export const dashboards: Dashboard[] = [
  { title: "Global Sales Command Center", tool: "Power BI", category: "Sales", description: "Executive view of revenue, pipeline, and forecasts across regions.", skills: ["DAX", "Modeling"] },
  { title: "People Analytics", tool: "Tableau", category: "HR", description: "Headcount, attrition, and DEI metrics.", skills: ["LOD", "Dashboards"] },
  { title: "Finance Close Tracker", tool: "Power BI", category: "Finance", description: "Track the monthly close, accruals, and variances.", skills: ["Modeling", "DAX"] },
  { title: "Marketing Attribution", tool: "Tableau", category: "Marketing", description: "Multi-touch attribution across paid, organic, and email.", skills: ["Blending", "Parameters"] },
  { title: "Customer Cohorts", tool: "Python + Plotly", category: "Customer Analytics", description: "Retention cohorts, LTV, and churn.", skills: ["Pandas", "Plotly"] },
  { title: "CEO Weekly", tool: "Power BI", category: "Executive Dashboard", description: "One-page KPI dashboard for weekly leadership review.", skills: ["Design", "DAX"] },
];

export const dashboardCategories = ["All", "Sales", "HR", "Finance", "Marketing", "Customer Analytics", "Executive Dashboard"] as const;