import type { CategoryKey } from "../types";

export const CATEGORY_COLORS: Record<string, string> = {
  Technical: "cat-technical",
  Medical: "cat-medical",
  Creative: "cat-creative",
  Business: "cat-business",
  Government: "cat-government",
  Research: "cat-research",
};

export const CATEGORY_BG: Record<string, string> = {
  Technical: "bg-cat-technical border-cat-technical",
  Medical: "bg-cat-medical border-cat-medical",
  Creative: "bg-cat-creative border-cat-creative",
  Business: "bg-cat-business border-cat-business",
  Government: "bg-cat-government border-cat-government",
  Research: "bg-cat-research border-cat-research",
};

export const CATEGORY_TEXT: Record<string, string> = {
  Technical: "cat-technical",
  Medical: "cat-medical",
  Creative: "cat-creative",
  Business: "cat-business",
  Government: "cat-government",
  Research: "cat-research",
};

export const SCORE_LABELS: {
  key: keyof CategoryScores;
  label: CategoryKey;
  color: string;
}[] = [
  { key: "technical", label: "Technical", color: "#6366f1" },
  { key: "medical", label: "Medical", color: "#22c55e" },
  { key: "creative", label: "Creative", color: "#a855f7" },
  { key: "business", label: "Business", color: "#f59e0b" },
  { key: "government", label: "Government", color: "#f97316" },
  { key: "research", label: "Research", color: "#06b6d4" },
];

export interface CategoryScores {
  technical: number;
  medical: number;
  creative: number;
  business: number;
  government: number;
  research: number;
}

// 10 interest questions mapped to categories
export const INTEREST_QUESTIONS = [
  {
    text: "I enjoy solving complex mathematical or logical problems",
    category: "technical" as keyof CategoryScores,
  },
  {
    text: "I like building or fixing things with technology",
    category: "technical" as keyof CategoryScores,
  },
  {
    text: "I am passionate about helping people stay healthy",
    category: "medical" as keyof CategoryScores,
  },
  {
    text: "I want to contribute to medical research or patient care",
    category: "medical" as keyof CategoryScores,
  },
  {
    text: "I love expressing ideas through art, design, or storytelling",
    category: "creative" as keyof CategoryScores,
  },
  {
    text: "I enjoy creating visuals, animations, or multimedia content",
    category: "creative" as keyof CategoryScores,
  },
  {
    text: "I am interested in managing teams and business strategies",
    category: "business" as keyof CategoryScores,
  },
  {
    text: "I want to start my own company or lead ventures",
    category: "business" as keyof CategoryScores,
  },
  {
    text: "I am interested in serving the nation through public service",
    category: "government" as keyof CategoryScores,
  },
  {
    text: "I enjoy investigating, experimenting, and discovering new things",
    category: "research" as keyof CategoryScores,
  },
];

export const ANSWER_OPTIONS = [
  { label: "Strongly Agree", value: 3 },
  { label: "Agree", value: 2 },
  { label: "Neutral", value: 1 },
  { label: "Disagree", value: 0 },
];

export const SKILL_NAMES = [
  "Communication",
  "Coding",
  "Analytical Thinking",
  "Creativity",
  "Leadership",
];

export const EDUCATION_LEVELS = [
  "10th (Secondary)",
  "12th (Higher Secondary)",
  "Undergraduate",
  "Postgraduate",
  "Diploma",
  "PhD",
];

export const STREAMS = [
  "Science (PCM)",
  "Science (PCB)",
  "Commerce",
  "Arts / Humanities",
  "Engineering",
  "Medical",
  "Computer Science",
  "Management",
  "Other",
];

export const CURRENT_SKILLS = [
  "Coding",
  "Design",
  "Communication",
  "Analysis",
  "Leadership",
  "Research",
  "Medicine",
  "Business",
];

export function computeScores(answers: Record<number, number>): CategoryScores {
  const scores: CategoryScores = {
    technical: 0,
    medical: 0,
    creative: 0,
    business: 0,
    government: 0,
    research: 0,
  };

  INTEREST_QUESTIONS.forEach((q, i) => {
    scores[q.category] += answers[i] ?? 0;
  });

  return scores;
}
