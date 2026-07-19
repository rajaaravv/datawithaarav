import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Book,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  Dices,
  Factory,
  FileText,
  FlaskConical,
  Hammer,
  Lightbulb,
  ClipboardList,
  type LucideIcon,
  Microscope,
  RefreshCw,
  ShieldCheck,
  Signal,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/Statistics")({
  head: () => ({
    meta: [
      { title: "Statistics Mastery Checklist — Data Analyst Roadmap" },
      {
        name: "description",
        content:
          "The complete statistics roadmap for aspiring data analysts — 32 priority-based topics, key concepts, 30-60-90 plan, projects, interview questions, and real-world scenarios.",
      },
      { property: "og:title", content: "Statistics Mastery Checklist — Data Analyst Roadmap" },
      {
        property: "og:description",
        content:
          "32 priority-ranked topics, must-know concepts, tests, projects, interview prep, and a 30-60-90 day plan.",
      },
    ],
  }),
  component: StatisticsRoadmap,
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
  { order: 1, name: "Descriptive Statistics — Mean, Median, Mode, Variance, Standard Deviation", difficulty: "Easy", hours: "2–3 hrs", priority: "Critical", mustKnow: true, mostCritical: true },
  { order: 2, name: "Data Types & Scales — Qualitative/Quantitative, Nominal, Ordinal, Interval, Ratio", difficulty: "Easy", hours: "2–3 hrs", priority: "Critical", mustKnow: true },
  { order: 3, name: "Population vs Sample — Sampling Basics", difficulty: "Easy", hours: "1–2 hrs", priority: "Critical", mustKnow: true },
  { order: 4, name: "Frequency Distributions & Histograms", difficulty: "Easy", hours: "2–3 hrs", priority: "Critical", mustKnow: true },
  { order: 5, name: "Percentiles, Quartiles & IQR (Interquartile Range)", difficulty: "Easy", hours: "2–3 hrs", priority: "Critical", mustKnow: true },
  { order: 6, name: "Skewness & Kurtosis — Understanding Distributions", difficulty: "Easy", hours: "2–3 hrs", priority: "High", mustKnow: true },
  { order: 7, name: "Probability Basics — Events, Outcomes, Probability Rules", difficulty: "Easy", hours: "3–4 hrs", priority: "Critical", mustKnow: true },
  { order: 8, name: "Conditional Probability & Bayes' Theorem", difficulty: "Medium", hours: "3–4 hrs", priority: "High", mustKnow: true },
  { order: 9, name: "Probability Distributions — Normal, Binomial, Poisson, Uniform", difficulty: "Medium", hours: "4–5 hrs", priority: "Critical", mustKnow: true, mostCritical: true },
  { order: 10, name: "Central Limit Theorem (CLT) — Why Samples Behave Normally", difficulty: "Medium", hours: "3–4 hrs", priority: "Critical", mustKnow: true },
  { order: 11, name: "Law of Large Numbers & Sampling Distributions", difficulty: "Medium", hours: "2–3 hrs", priority: "High" },
  { order: 12, name: "Sampling Techniques — Random, Stratified, Systematic, Cluster", difficulty: "Medium", hours: "3–4 hrs", priority: "Critical", mustKnow: true },
  { order: 13, name: "Sampling Bias & Sample Size Determination", difficulty: "Medium", hours: "2–3 hrs", priority: "High", mustKnow: true },
  { order: 14, name: "Inferential Statistics Overview — Making Predictions from Samples", difficulty: "Medium", hours: "2–3 hrs", priority: "Critical", mustKnow: true },
  { order: 15, name: "Confidence Intervals — Estimation & Interpretation", difficulty: "Medium", hours: "3–4 hrs", priority: "Critical", mustKnow: true },
  { order: 16, name: "Hypothesis Testing — Null (H₀) vs Alternative (H₁)", difficulty: "Medium", hours: "3–4 hrs", priority: "Critical", mustKnow: true, mostCritical: true },
  { order: 17, name: "p-Values & Significance Levels (Alpha)", difficulty: "Medium", hours: "3–4 hrs", priority: "Critical", mustKnow: true },
  { order: 18, name: "Type I & Type II Errors — False Positives vs False Negatives", difficulty: "Medium", hours: "2–3 hrs", priority: "Critical", mustKnow: true },
  { order: 19, name: "Statistical Power & Effect Size", difficulty: "Medium", hours: "2–3 hrs", priority: "High" },
  { order: 20, name: "Z-Test — When Population Variance is Known", difficulty: "Medium", hours: "3–4 hrs", priority: "Critical", mustKnow: true },
  { order: 21, name: "T-Test — When Population Variance is Unknown (1-Sample, 2-Sample, Paired)", difficulty: "Medium", hours: "4–5 hrs", priority: "Critical", mustKnow: true },
  { order: 22, name: "ANOVA — Analysis of Variance (1-Way & 2-Way)", difficulty: "Medium", hours: "4–5 hrs", priority: "Critical", mustKnow: true },
  { order: 23, name: "Chi-Square Test — For Categorical Data (Goodness of Fit & Independence)", difficulty: "Medium", hours: "3–4 hrs", priority: "Critical", mustKnow: true },
  { order: 24, name: "Parametric vs Non-Parametric Tests — Wilcoxon, Mann-Whitney U, Kruskal-Wallis", difficulty: "Hard", hours: "4–5 hrs", priority: "High" },
  { order: 25, name: "Correlation — Pearson & Spearman", difficulty: "Medium", hours: "3–4 hrs", priority: "Critical", mustKnow: true },
  { order: 26, name: "Correlation vs Causation — Avoiding a Common Pitfall", difficulty: "Medium", hours: "2–3 hrs", priority: "Critical", mustKnow: true, mostCritical: true },
  { order: 27, name: "Linear Regression — Simple & Multiple", difficulty: "Hard", hours: "5–6 hrs", priority: "Critical", mustKnow: true },
  { order: 28, name: "Regression Assumptions — Linearity, Homoscedasticity, Normality of Residuals", difficulty: "Hard", hours: "3–4 hrs", priority: "High" },
  { order: 29, name: "Logistic Regression — Binary Classification", difficulty: "Hard", hours: "4–5 hrs", priority: "High" },
  { order: 30, name: "Time Series Basics — Trends, Seasonality, Stationarity", difficulty: "Hard", hours: "4–5 hrs", priority: "Medium" },
  { order: 31, name: "A/B Testing & Experimental Design", difficulty: "Hard", hours: "4–5 hrs", priority: "High", mustKnow: true },
  { order: 32, name: "Bayesian Statistics Basics — Prior, Likelihood, Posterior", difficulty: "Hard", hours: "3–4 hrs", priority: "Medium" },
];

interface IconGroup {
  title: string;
  icon: LucideIcon;
  items: string[];
}

const mustKnowGroups: IconGroup[] = [
  {
    title: "Descriptive Statistics (Day 1)",
    icon: BarChart3,
    items: [
      "Mean — Average of dataset",
      "Median — Middle value (robust to outliers)",
      "Mode — Most frequent value",
      "Variance — Average squared deviation from mean",
      "Standard Deviation — Spread of data in original units",
      "Range & IQR — Spread of middle 50% of data",
    ],
  },
  {
    title: "Probability & Distributions (Every Analysis)",
    icon: Dices,
    items: [
      "Normal Distribution — Bell curve, mean=median=mode",
      "Binomial Distribution — Success/failure experiments",
      "Poisson Distribution — Count events over time/space",
      "Central Limit Theorem — Sample means become normal",
      "Conditional Probability — P(A|B) formula",
      "Bayes' Theorem — Updating beliefs with new evidence",
    ],
  },
  {
    title: "Inferential Statistics (Every Project)",
    icon: Microscope,
    items: [
      "Hypothesis Testing — H₀ vs H₁ framework",
      "p-Value — Probability of observing data if H₀ is true",
      "Confidence Intervals — Range containing population parameter",
      "Significance Level (α) — Usually 0.05",
      "Type I Error — False positive (reject H₀ when true)",
      "Type II Error — False negative (fail to reject H₀ when false)",
    ],
  },
  {
    title: "Regression & Correlation (Predictive Work)",
    icon: TrendingUp,
    items: [
      "Pearson Correlation — Linear relationship strength",
      "Spearman Correlation — Monotonic relationship",
      "Correlation ≠ Causation — Always remember",
      "Linear Regression — Predict Y from X",
      "R² — Proportion of variance explained",
      "Residuals — Differences between predicted and actual",
    ],
  },
  {
    title: "Statistical Tests (Comparing Groups)",
    icon: FlaskConical,
    items: [
      "Z-Test — Large sample, known σ",
      "T-Test — Small sample, unknown σ",
      "ANOVA — Compare 3+ group means",
      "Chi-Square Test — Categorical data analysis",
      "Mann-Whitney U — Non-parametric alternative to t-test",
      "Wilcoxon Test — Paired non-parametric test",
    ],
  },
  {
    title: "Sampling & Data Collection",
    icon: ClipboardList,
    items: [
      "Random Sampling — Every unit has equal chance",
      "Stratified Sampling — Divide population into strata",
      "Systematic Sampling — Every k-th unit",
      "Cluster Sampling — Random clusters then sample all",
      "Sampling Bias — Non-representative samples",
      "Sample Size — Balance between precision and cost",
    ],
  },
];

const probabilityConcepts: IconGroup[] = [
  {
    title: "Basic Probability Rules",
    icon: Dices,
    items: [
      `P(A) = Number of favorable outcomes / Total outcomes`,
      `P(A ∪ B) = P(A) + P(B) - P(A ∩ B) — Addition Rule`,
      `P(A ∩ B) = P(A) × P(B) — For independent events`,
      `P(A|B) = P(A ∩ B) / P(B) — Conditional Probability`,
      `P(B|A) = P(A|B) × P(B) / P(A) — Bayes' Theorem`,
      `Law of Total Probability: P(A) = Σ P(A|B_i) × P(B_i)`,
    ],
  },
  {
    title: "Key Probability Distributions",
    icon: BarChart3,
    items: [
      `Normal: f(x) = (1/σ√(2π)) × e^(-(x-μ)²/(2σ²))`,
      `Standard Normal: Mean=0, Variance=1 (Z-score)`,
      `Binomial: P(X=k) = C(n,k) × p^k × (1-p)^(n-k)`,
      `Poisson: P(X=k) = (λ^k × e^(-λ)) / k!`,
      `Uniform: All outcomes equally likely`,
      `Exponential: Models time between Poisson events`,
    ],
  },
  {
    title: "Central Limit Theorem (CLT)",
    icon: TrendingDown,
    items: [
      `Sample mean distribution approaches normal as n increases`,
      `Independent of population distribution shape`,
      `Mean of sample means = population mean (μ)`,
      `Standard error = σ/√n — decreases with sample size`,
      `Enables hypothesis testing and confidence intervals`,
      `Critical for: Z-tests, t-tests, ANOVA, regression inference`,
    ],
  },
];

const hypothesisTests: IconGroup[] = [
  {
    title: "Hypothesis Testing Framework",
    icon: Microscope,
    items: [
      `Step 1: State H₀ (null) and H₁ (alternative)`,
      `Step 2: Choose significance level (α = 0.05)`,
      `Step 3: Collect data and calculate test statistic`,
      `Step 4: Compute p-value`,
      `Step 5: Decision: Reject H₀ if p < α`,
      `Step 6: Conclusion in plain language`,
    ],
  },
  {
    title: "Statistical Tests Comparison",
    icon: BarChart3,
    items: [
      `Z-Test: Large sample (n > 30), known σ`,
      `T-Test: Small sample (n < 30), unknown σ`,
      `Paired T-Test: Same subjects measured twice (before/after)`,
      `1-Way ANOVA: Compare 3+ groups on 1 factor`,
      `2-Way ANOVA: Compare 3+ groups on 2 factors`,
      `Chi-Square: Categorical data (e.g., survey responses)`,
    ],
  },
  {
    title: "Test Assumptions & When to Use",
    icon: AlertTriangle,
    items: [
      `Parametric tests: Normal distribution, homogeneity of variance`,
      `Non-parametric: Use when assumptions violated`,
      `Mann-Whitney U: Alternative to independent t-test`,
      `Wilcoxon: Alternative to paired t-test`,
      `Kruskal-Wallis: Alternative to 1-way ANOVA`,
      `Check assumptions before choosing test — always`,
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
        "Mean vs Median vs Mode — when to use each",
        "Standard deviation vs variance",
        "Population vs sample — key differences",
        "Normal distribution properties",
        "Central Limit Theorem — explain in plain English",
      ],
    },
    b: {
      title: "Practice method",
      items: [
        "Explain each concept to a non-technical friend",
        "Calculate stats by hand from a small dataset",
        "Use Python/Excel to verify your manual work",
        "Draw normal distribution and mark key points",
        "Create flashcards for all key formulas",
      ],
    },
  },
  {
    n: "2",
    title: "Hypothesis Testing Mastery",
    when: "Week 2 · Daily 2 hrs",
    a: {
      title: "Master these scenarios",
      items: [
        "Formulate H₀ and H₁ for any business problem",
        "Choose the right test (Z, T, ANOVA, Chi-Square)",
        "Calculate p-value and interpret correctly",
        "Explain Type I vs Type II errors with examples",
        "When to use 1-tailed vs 2-tailed tests",
      ],
    },
    b: {
      title: "Interview tips",
      items: [
        "Always mention assumptions before using a test",
        "Explain what alpha=0.05 means in plain English",
        "Connect p-value to business decision-making",
        "Discuss sample size and statistical power",
        "Note limitations and caveats of your test choice",
      ],
    },
  },
  {
    n: "3",
    title: "Regression & Correlation",
    when: "Week 3 · Daily 1.5 hrs",
    a: {
      title: "Regression essentials",
      items: [
        "Explain R² — what it means and its limitations",
        "Correlation vs Causation — give a real example",
        "Simple vs Multiple Regression — when to use which",
        "Interpret regression coefficients",
        "Check regression assumptions",
      ],
    },
    b: {
      title: "Portfolio talking points",
      items: [
        "Real project where regression helped make a decision",
        "Quantify impact: 'R² of 0.85 explains customer churn'",
        "Mention handling multicollinearity and outliers",
        "Explain model validation (train/test split)",
        "Visualize residuals to check assumptions",
      ],
    },
  },
  {
    n: "4",
    title: "A/B Testing & Business Application",
    when: "Week 4 · 4–6 hrs per task",
    a: {
      title: "A/B testing framework",
      items: [
        "Design an A/B test from business question to analysis",
        "Calculate required sample size before running test",
        "Analyze results using appropriate statistical test",
        "Interpret p-value and confidence intervals",
        "Make a business recommendation based on results",
      ],
    },
    b: {
      title: "Standout elements",
      items: [
        "Real A/B test example with all steps documented",
        "Power analysis to justify sample size",
        "Segmentation analysis (subgroups within test)",
        "Ethical considerations in experimentation",
        "Recommendation with clear next steps",
      ],
    },
  },
];

const interviewQs: { section: string; items: string[] }[] = [
  {
    section: "Descriptive Statistics",
    items: [
      "What is the difference between mean, median, and mode?",
      "What is standard deviation, and why is it important?",
      "What is the difference between variance and standard deviation?",
      "How do you interpret skewness in a dataset?",
      "What is kurtosis, and how does it affect a distribution?",
      "What is the five-number summary in statistics?",
      "How do you handle outliers in a dataset?",
    ],
  },
  {
    section: "Probability & Distributions",
    items: [
      "What is the difference between discrete and continuous probability distributions?",
      "What is the Central Limit Theorem, and why is it important?",
      "Explain the Law of Large Numbers.",
      "What is a normal distribution, and why is it significant?",
      "What are the key properties of a Poisson distribution?",
      "What is the difference between a Binomial and a Poisson distribution?",
      "How do you calculate the probability of independent events?",
    ],
  },
  {
    section: "Inferential Statistics",
    items: [
      "What is hypothesis testing?",
      "What are Type I and Type II errors?",
      "What is the p-value, and how do you interpret it?",
      "What is a confidence interval, and how do you calculate it?",
      "What is the difference between parametric and non-parametric tests?",
      "What is the significance level (alpha) in hypothesis testing?",
      "What is statistical power, and why is it important?",
    ],
  },
  {
    section: "Regression & Correlation",
    items: [
      "What is linear regression, and how is it used in data analysis?",
      "What is the difference between correlation and regression?",
      "How do you interpret the R-squared value in regression analysis?",
      "What are multicollinearity and heteroscedasticity?",
      "What is the difference between simple and multiple linear regression?",
      "What are residuals in regression analysis?",
      "What is logistic regression, and when should you use it?",
    ],
  },
  {
    section: "Sampling & Experimental Design",
    items: [
      "What is sampling, and why is it important?",
      "What is the difference between stratified and random sampling?",
      "What is a sampling bias?",
      "How do you determine an appropriate sample size?",
      "What is A/B testing, and how is it used in data analysis?",
      "What is the difference between a control group and a treatment group?",
      "What are some common pitfalls in A/B testing?",
    ],
  },
];

const learningPlan = [
  {
    phase: "Days 1–30",
    heading: "Foundation & Descriptive Statistics",
    sub: "Descriptive Stats, Probability, Sampling, Distributions",
    weeks: [
      { d: "Days 1–3", t: "Descriptive Statistics Basics", desc: "Mean, median, mode, variance, standard deviation, range, IQR" },
      { d: "Days 4–6", t: "Data Types & Data Visualization", desc: "Qualitative vs quantitative, scales of measurement, histograms, box plots" },
      { d: "Days 7–9", t: "Probability Fundamentals", desc: "Basic probability rules, conditional probability, Bayes' Theorem" },
      { d: "Days 10–12", t: "Probability Distributions", desc: "Normal, Binomial, Poisson, Uniform distributions" },
      { d: "Days 13–14", t: "Weekend Project #1", desc: "Analyze a dataset: calculate all descriptive stats, create visualizations" },
      { d: "Days 15–17", t: "Sampling & CLT", desc: "Sampling techniques, Central Limit Theorem, Law of Large Numbers" },
      { d: "Days 18–20", t: "Introduction to Inference", desc: "Population vs sample, sampling distributions, standard error" },
      { d: "Days 21–23", t: "Confidence Intervals", desc: "CI for mean, proportion; interpretation in business context" },
      { d: "Days 24–26", t: "Hypothesis Testing Part 1", desc: "H₀ vs H₁, p-values, significance levels, Type I & II errors" },
      { d: "Days 27–30", t: "Weekend Project #2", desc: "Hypothesis testing project: formulate, test, and interpret results" },
    ],
  },
  {
    phase: "Days 31–60",
    heading: "Inferential Statistics & Tests",
    sub: "Z-Test, T-Test, ANOVA, Chi-Square, Non-Parametric Tests",
    weeks: [
      { d: "Days 31–33", t: "Z-Test & One-Sample T-Test", desc: "When to use each, assumptions, manual calculation with real data" },
      { d: "Days 34–36", t: "Two-Sample & Paired T-Tests", desc: "Independent samples, paired designs, equal vs unequal variance" },
      { d: "Days 37–38", t: "T-Test Project", desc: "Compare two groups in a real dataset: formulate, test, interpret" },
      { d: "Days 39–42", t: "ANOVA (1-Way & 2-Way)", desc: "Comparing 3+ groups, post-hoc tests, interaction effects" },
      { d: "Days 43–44", t: "ANOVA Project", desc: "Compare multiple groups, interpret F-statistic and p-value" },
      { d: "Days 45–48", t: "Chi-Square Tests", desc: "Goodness of fit, test of independence, effect size" },
      { d: "Days 49–50", t: "Chi-Square Project", desc: "Analyze categorical data: survey responses, customer preferences" },
      { d: "Days 51–54", t: "Non-Parametric Tests", desc: "Mann-Whitney U, Wilcoxon, Kruskal-Wallis — when to use and how" },
      { d: "Days 55–60", t: "Capstone Project #1", desc: "Choose the right test for a business problem, run it, present results" },
    ],
  },
  {
    phase: "Days 61–90",
    heading: "Regression, Correlation & Advanced Topics",
    sub: "Correlation, Linear/Logistic Regression, A/B Testing, Bayesian Stats",
    weeks: [
      { d: "Days 61–64", t: "Correlation Analysis", desc: "Pearson vs Spearman, scatter plots, correlation matrix" },
      { d: "Days 65–68", t: "Simple Linear Regression", desc: "Model building, interpretation, R², residuals analysis" },
      { d: "Days 69–72", t: "Multiple Linear Regression", desc: "Multiple predictors, multicollinearity, variable selection" },
      { d: "Days 73–74", t: "Regression Project", desc: "Build and interpret a regression model on real data" },
      { d: "Days 75–78", t: "Logistic Regression", desc: "Binary classification, odds ratio, confusion matrix" },
      { d: "Days 79–80", t: "A/B Testing", desc: "Design, sample size calculation, analysis, business decisions" },
      { d: "Days 81–83", t: "Time Series Basics", desc: "Trends, seasonality, stationarity, simple forecasts" },
      { d: "Days 84–86", t: "Bayesian Statistics Intro", desc: "Prior, likelihood, posterior; when to use Bayesian approach" },
      { d: "Days 87–90", t: "Capstone Project #2", desc: "End-to-end analysis: descriptive + inference + regression + AB testing" },
    ],
  },
];

const projects = [
  { code: "P1", tier: "Beginner", h: "3–4hrs", t: "Employee Salary Analysis", d: "Calculate mean, median, mode, standard deviation; visualize salary distribution; identify outliers." },
  { code: "P2", tier: "Beginner", h: "4–5hrs", t: "Customer Survey Analysis", d: "Analyze survey responses: descriptive stats, frequency distributions, visualize with bar charts and histograms." },
  { code: "P3", tier: "Beginner", h: "3–4hrs", t: "Sales Data Exploration", d: "Calculate central tendency and spread; create box plots; identify and handle outliers." },
  { code: "P4", tier: "Intermediate", h: "6–8hrs", t: "Hypothesis Testing — Product A vs Product B", d: "Formulate H₀/H₁, choose t-test, run analysis, interpret p-value, make business recommendation." },
  { code: "P5", tier: "Intermediate", h: "6–7hrs", t: "ANOVA — Regional Sales Comparison", d: "Compare sales across 4+ regions, run 1-way ANOVA, post-hoc tests, interpret results." },
  { code: "P6", tier: "Intermediate", h: "7–9hrs", t: "Chi-Square — Customer Preference by Category", d: "Analyze categorical data: chi-square test of independence, measure association strength." },
  { code: "P7", tier: "Intermediate", h: "5–6hrs", t: "Correlation Study — Marketing Spend vs Revenue", d: "Calculate Pearson and Spearman correlation, interpret, visualize relationships." },
  { code: "P8", tier: "Advanced", h: "8–10hrs", t: "Linear Regression — Revenue Prediction", d: "Build multiple linear regression model, check assumptions, interpret coefficients, report R²." },
  { code: "P9", tier: "Advanced", h: "8–10hrs", t: "A/B Test Analysis", d: "Design an A/B test, calculate sample size, analyze results, make data-driven recommendation." },
  { code: "P10", tier: "Advanced", h: "10–12hrs", t: "Logistic Regression — Churn Prediction", d: "Build a logistic regression model to predict customer churn, interpret odds ratios, evaluate performance." },
  { code: "P11", tier: "Advanced", h: "12–15hrs", t: "End-to-End Business Analytics", d: "Descriptive + inference + regression + AB testing on a single business problem." },
];

const scenarios: {
  icon: LucideIcon;
  title: string;
  cols: { h: string; items: string[] }[];
}[] = [
  {
    icon: BarChart3,
    title: "Scenario 1 — 'Sales are down 15% this quarter - is this significant?'",
    cols: [
      { h: "Approach", items: ["Collect sales data from current vs previous quarters", "Check if data meets normality assumptions", "Run appropriate hypothesis test (paired t-test)", "Calculate confidence interval for the difference"] },
      { h: "Statistical method", items: ["H₀: No difference in sales", "H₁: Sales have decreased", "Paired t-test (same periods year-over-year)", "Interpret p-value, consider business context"] },
      { h: "Output", items: ["Test statistic and p-value", "Confidence interval for % change", "Statistical significance + practical significance", "Recommendation to investigate further"] },
    ],
  },
  {
    icon: FlaskConical,
    title: "Scenario 2 — 'Our A/B test shows 5% higher conversion — should we launch?'",
    cols: [
      { h: "A/B test analysis", items: ["Calculate conversion rates for A and B", "Run 2-sample t-test for proportions", "Check if p-value < 0.05", "Calculate confidence interval for lift"] },
      { h: "Decision factors", items: ["Statistical significance → p-value", "Practical significance → minimum detectable effect", "Sample size adequacy → power", "Cost/benefit analysis of launching"] },
      { h: "Recommendation", items: ["Launch if statistically and practically significant", "Run for longer if under-powered", "Segment analysis for subgroups", "Monitoring plan after launch"] },
    ],
  },
  {
    icon: TrendingUp,
    title: "Scenario 3 — 'Which marketing channel drives the most revenue?'",
    cols: [
      { h: "Approach", items: ["Collect spend and revenue by channel", "Run ANOVA to compare revenue across channels", "If significant, run post-hoc tests", "Build regression model to understand drivers"] },
      { h: "Statistical method", items: ["1-Way ANOVA (channel as factor)", "Tukey HSD for pair comparisons", "Multiple regression with channel variables", "Check for multicollinearity and interaction"] },
      { h: "Output", items: ["Statistical significance of channel differences", "Revenue per dollar spent by channel", "Recommendation for budget allocation", "Attribution model for multi-touch"] },
    ],
  },
  {
    icon: Factory,
    title: "Scenario 4 — 'Our defect rate increased — is this just random variation?'",
    cols: [
      { h: "Investigation", items: ["Collect defect rate data pre and post change", "Check if data meets assumptions", "Run appropriate test (chi-square or t-test)", "Calculate practical significance"] },
      { h: "Statistical method", items: ["Chi-square test for proportion change", "Confidence interval for defect rate difference", "Control chart to monitor variation", "Determine if special cause or common cause"] },
      { h: "Output", items: ["Statistical significance of increase", "Root cause investigation recommendation", "Process improvement recommendations", "Monitoring plan going forward"] },
    ],
  },
];

const bestPractices: { h: string; icon: LucideIcon; items: string[] }[] = [
  { h: "Know Your Data", icon: BarChart3, items: ["Always start with EDA — understand your data", "Check for missing values and outliers", "Know your data types and scales", "Visualize before you analyze", "Document your assumptions", "Never trust data without validation"] },
  { h: "Choose the Right Test", icon: Target, items: ["Know your data type (continuous vs categorical)", "Check assumptions before testing", "Consider sample size (power analysis)", "Match test to research question", "Parametric only if assumptions met", "Consider non-parametric alternatives"] },
  { h: "Interpret Results Responsibly", icon: Microscope, items: ["Statistical significance ≠ practical significance", "Don't p-hack or cherry-pick results", "Report confidence intervals alongside p-values", "Always discuss limitations", "Connect results to business decisions", "Be honest about uncertainty"] },
  { h: "Document Everything", icon: FileText, items: ["Write down your hypotheses before testing", "Document data sources and cleaning steps", "Record all decisions made during analysis", "Include assumptions and caveats", "Use reproducible code (Jupyter, R Markdown)", "Share methodology with stakeholders"] },
  { h: "Validate & Replicate", icon: RefreshCw, items: ["Run sensitivity analyses", "Cross-validate results on different data", "Test alternative models", "Peer review your analysis", "Validate with business domain experts", "Watch for overfitting and extrapolation"] },
  { h: "Communicate Clearly", icon: Lightbulb, items: ["Lead with the business insight, not p-value", "Use visualizations to tell the story", "Avoid jargon with non-technical audiences", "Explain 'why this matters' for the business", "Be transparent about uncertainty", "Recommend clear next steps"] },
];

const resources: { h: string; icon: LucideIcon; items: { l: string; u: string }[] }[] = [
  { h: "Free Learning Resources", icon: BookOpen, items: [
    { l: "Khan Academy — Statistics & Probability", u: "https://www.khanacademy.org/math/statistics-probability" },
    { l: "StatQuest (YouTube) — Visual Statistics", u: "https://www.youtube.com/@statquest" },
    { l: "DataCamp — Statistics Cheat Sheets", u: "https://www.datacamp.com/cheat-sheet" },
    { l: "OpenIntro Statistics — Free Textbook", u: "https://www.openintro.org/book/os/" },
    { l: "3Blue1Brown — Probability Visualizations", u: "https://www.youtube.com/@3blue1brown" },
  ]},
  { h: "Books & Reference", icon: Book, items: [
    { l: "Think Stats — Allen B. Downey", u: "https://greenteapress.com/thinkstats/" },
    { l: "Statistics in Plain English — Timothy C. Urdan", u: "https://www.routledge.com/Statistics-in-Plain-English/Urdan/p/book/9780367342838" },
    { l: "Naked Statistics — Charles Wheelan", u: "https://www.nakedstatistics.com/" },
    { l: "Statistical Inference — Casella & Berger", u: "https://www.cengage.co.uk/books/9788131503942/" },
  ]},
  { h: "Practice Platforms", icon: Wrench, items: [
    { l: "Kaggle — Datasets & Competitions", u: "https://www.kaggle.com/" },
    { l: "Google Dataset Search", u: "https://datasetsearch.research.google.com/" },
    { l: "StatsPractice.com — Interactive Problems", u: "https://www.statspractice.com/" },
    { l: "W3Schools — Statistics Tutorial", u: "https://www.w3schools.com/statistics/" },
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

function StatisticsRoadmap() {
  const storageKey = "roadmap-progress:statistics";
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
          MASTERY CHECKLIST · STATISTICS
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-3 text-gradient-brand">
          Statistics Mastery Checklist — Data Analyst Roadmap
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-6">
          The complete statistics journey for aspiring data analysts. 32 priority-ranked topics, key concepts, a 30-60-90 day plan, 11 portfolio projects, real-world scenarios, and interview prep — everything you need to be job-ready.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5"><Signal className="size-4" /> Beginner → Advanced</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="size-4" /> ~120 hrs total</span>
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
                    (Kaggle, Google Dataset Search, or company data) and explain the concept to someone else to lock it in.
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

      {/* Probability */}
      <Section id="probability" eyebrow="Core" eyebrowIcon={Dices} title="Probability & Distributions — Deep Dive" subtitle="Understanding randomness is the foundation of inference and decision-making.">
        <div className="grid md:grid-cols-2 gap-4">
          {probabilityConcepts.map((g) => (
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

      {/* Hypothesis Tests */}
      <Section id="tests" eyebrow="Core" eyebrowIcon={Microscope} title="Hypothesis Testing & Statistical Tests" subtitle="The tools for making data-driven decisions and comparing groups.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hypothesisTests.map((g) => (
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
      <Section id="plan" eyebrow="Structured" eyebrowIcon={Calendar} title="30-60-90 Day Statistics Learning Plan" subtitle="For a working analyst putting in 1–2 hrs/day. Weekends include 3–4 hr project sessions.">
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
      <Section id="interview" eyebrow="Interview Prep" eyebrowIcon={Target} title="4-Phase Interview Preparation Roadmap" subtitle="Expect live stats questions — practice explaining concepts and calculations.">
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
      <Section title="Top Statistics Interview Questions" subtitle="Common questions asked at data analyst interviews across tech, finance, and consulting.">
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
      <Section id="projects" eyebrow="Portfolio" eyebrowIcon={Hammer} title="Hands-On Projects & Portfolio Ideas" subtitle="Build these to prove real-world statistics mastery. Each covers multiple topic areas.">
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
      <Section id="best-practices" eyebrow="Standards" eyebrowIcon={ShieldCheck} title="Statistics Best Practices Used at Companies" subtitle="Standards followed by professional analysts at consulting firms, banks, tech companies, and research orgs.">
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
      <Section id="resources" eyebrow="Level Up" eyebrowIcon={BookOpen} title="Statistics Learning Resources">
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