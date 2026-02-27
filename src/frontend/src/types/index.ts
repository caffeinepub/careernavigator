export type {
  Assessment,
  Career,
  Milestone,
  RoadmapYear,
  Skill,
  SkillRating,
  UserProfile,
} from "../backend.d";

export type CategoryKey =
  | "Technical"
  | "Medical"
  | "Creative"
  | "Business"
  | "Government"
  | "Research";

export interface AssessmentAnswers {
  answers: Record<number, number>; // questionIndex -> score (0-3)
  skillRatings: Record<string, number>; // skillName -> 1-5
}

export interface CategoryScores {
  technical: number;
  medical: number;
  creative: number;
  business: number;
  government: number;
  research: number;
}
