import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SkillRating {
    skillName: string;
    userRating: bigint;
}
export interface Reminder {
    title: string;
    completed: boolean;
    dueDate: bigint;
    description: string;
}
export interface Skill {
    requiredLevel: bigint;
    skillName: string;
}
export interface Assessment {
    governmentScore: bigint;
    topCareers: Array<bigint>;
    businessScore: bigint;
    skillRatings: Array<SkillRating>;
    medicalScore: bigint;
    creativeScore: bigint;
    timestamp: bigint;
    technicalScore: bigint;
    researchScore: bigint;
}
export interface StudyMaterial {
    url: string;
    title: string;
    difficulty: string;
    description: string;
    materialType: string;
}
export interface QuestionAttempt {
    total: bigint;
    score: bigint;
    timestamp: bigint;
    category: string;
}
export interface Career {
    id: bigint;
    title: string;
    salarySenior: string;
    educationPath: Array<string>;
    salaryEntry: string;
    description: string;
    topCompanies: Array<string>;
    category: string;
    salaryMid: string;
    requiredSkills: Array<Skill>;
    roadmapYears: Array<RoadmapYear>;
}
export interface Question {
    correctIndex: bigint;
    explanation: string;
    text: string;
    options: Array<string>;
}
export interface RoadmapYear {
    tasks: Array<string>;
    year: bigint;
}
export interface Milestone {
    completed: boolean;
    year: bigint;
    taskText: string;
    careerTitle: string;
}
export interface UserProfile {
    stream: string;
    name: string;
    education: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addReminder(title: string, description: string, dueDate: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    careerChat(userQuery: string): Promise<string>;
    deleteReminder(title: string): Promise<void>;
    getAllCareers(): Promise<Array<Career>>;
    getAllStudyMaterials(): Promise<Array<StudyMaterial>>;
    getAssessments(): Promise<Array<Assessment>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCareerById(id: bigint): Promise<Career | null>;
    getCareersByCategory(category: string): Promise<Array<Career>>;
    getLatestAssessment(): Promise<Assessment | null>;
    getMilestones(careerTitle: string): Promise<Array<Milestone>>;
    getProfile(): Promise<UserProfile | null>;
    getQuestionHistory(): Promise<Array<QuestionAttempt>>;
    getRandomQuestions(category: string, count: bigint): Promise<Array<Question>>;
    getReminders(): Promise<Array<Reminder>>;
    getStudyMaterials(category: string): Promise<Array<StudyMaterial>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initMilestones(careerId: bigint): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveAssessment(technicalScore: bigint, creativeScore: bigint, businessScore: bigint, medicalScore: bigint, governmentScore: bigint, researchScore: bigint, skillRatings: Array<SkillRating>, topCareers: Array<bigint>): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveProfile(name: string, education: string, stream: string): Promise<void>;
    saveQuestionAttempt(category: string, score: bigint, total: bigint): Promise<void>;
    toggleMilestone(careerTitle: string, year: bigint, taskText: string): Promise<void>;
    toggleReminderComplete(title: string): Promise<void>;
}
