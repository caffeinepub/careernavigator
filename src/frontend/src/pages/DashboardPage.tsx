import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Clock,
  ExternalLink,
  Flag,
  Globe,
  GraduationCap,
  Play,
  Sparkles,
  Target,
  Trophy,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import type { Reminder, StudyMaterial } from "../backend.d";
import { CareerCard } from "../components/CareerCard";
import {
  useGetAllCareers,
  useGetAllStudyMaterials,
  useGetLatestAssessment,
  useGetProfile,
  useGetQuestionHistory,
  useGetReminders,
  useGetStudyMaterials,
} from "../hooks/useQueries";
import { SCORE_LABELS } from "../lib/careers";

function getMaterialIcon(type: string) {
  switch (type?.toLowerCase()) {
    case "course":
      return GraduationCap;
    case "youtube":
    case "video":
      return Play;
    case "website":
      return Globe;
    default:
      return BookOpen;
  }
}

function getDifficultyStyle(difficulty: string) {
  switch (difficulty?.toLowerCase()) {
    case "beginner":
      return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400";
    case "intermediate":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400";
    case "advanced":
      return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400";
    default:
      return "bg-secondary text-secondary-foreground";
  }
}

function getTopCategory(
  assessment:
    | {
        technicalScore: bigint;
        creativeScore: bigint;
        businessScore: bigint;
        medicalScore: bigint;
        governmentScore: bigint;
        researchScore: bigint;
      }
    | null
    | undefined,
): string {
  if (!assessment) return "";
  const scores: Record<string, number> = {
    Technical: Number(assessment.technicalScore),
    Medical: Number(assessment.medicalScore),
    Creative: Number(assessment.creativeScore),
    Business: Number(assessment.businessScore),
    Government: Number(assessment.governmentScore),
    Research: Number(assessment.researchScore),
  };
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function formatDueDateShort(dueDate: bigint): string {
  const ms = Number(dueDate) / 1_000_000;
  const date = new Date(ms);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function isOverdue(dueDate: bigint, completed: boolean): boolean {
  if (completed) return false;
  return Number(dueDate) / 1_000_000 < Date.now();
}

function isToday(dueDate: bigint, completed: boolean): boolean {
  if (completed) return false;
  const ms = Number(dueDate) / 1_000_000;
  const now = Date.now();
  if (ms < now) return false;
  const d = new Date(ms);
  const t = new Date();
  return (
    d.getDate() === t.getDate() &&
    d.getMonth() === t.getMonth() &&
    d.getFullYear() === t.getFullYear()
  );
}

function StudyMaterialCard({ material }: { material: StudyMaterial }) {
  const Icon = getMaterialIcon(material.materialType);
  return (
    <a
      href={material.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
    >
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-ui font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {material.title}
          </p>
          <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-xs text-muted-foreground font-ui leading-snug mt-0.5 line-clamp-2">
          {material.description}
        </p>
        <span
          className={`inline-block text-xs px-1.5 py-0.5 rounded-md mt-1 font-ui font-semibold ${getDifficultyStyle(material.difficulty)}`}
        >
          {material.difficulty}
        </span>
      </div>
    </a>
  );
}

export function DashboardPage() {
  const { data: assessment, isLoading: loadingAssessment } =
    useGetLatestAssessment();
  const { data: careers, isLoading: loadingCareers } = useGetAllCareers();
  const { data: profile } = useGetProfile();
  const { data: reminders, isLoading: loadingReminders } = useGetReminders();
  const { data: questionHistory } = useGetQuestionHistory();

  const topCategory = getTopCategory(assessment);

  // Study materials: by category if assessment exists, else all
  const { data: categoryMaterials } = useGetStudyMaterials(topCategory);
  const { data: allMaterials } = useGetAllStudyMaterials();

  const studyMaterials = topCategory
    ? (categoryMaterials ?? []).slice(0, 3)
    : (allMaterials ?? []).slice(0, 3);

  const scores = assessment
    ? {
        technical: Number(assessment.technicalScore),
        medical: Number(assessment.medicalScore),
        creative: Number(assessment.creativeScore),
        business: Number(assessment.businessScore),
        government: Number(assessment.governmentScore),
        research: Number(assessment.researchScore),
      }
    : null;

  const maxScore = scores ? Math.max(...Object.values(scores), 1) : 1;

  const topCareers = assessment
    ? (careers ?? [])
        .filter((c) => assessment.topCareers.includes(c.id))
        .slice(0, 3)
    : (careers ?? []).slice(0, 3);

  // Upcoming reminders (incomplete, sorted by due date)
  const upcomingReminders = (reminders ?? [])
    .filter((r) => !r.completed)
    .sort((a, b) => Number(a.dueDate) - Number(b.dueDate))
    .slice(0, 3);

  const overdueCount = (reminders ?? []).filter((r) =>
    isOverdue(r.dueDate, r.completed),
  ).length;

  // Last quiz attempt for today's category
  const lastAttempt = topCategory
    ? (questionHistory ?? [])
        .filter((a) => a.category === topCategory)
        .slice(-1)[0]
    : undefined;

  const QUICK_ACTIONS = [
    {
      to: "/assessment",
      label: "Take Assessment",
      desc: "Discover your career strengths",
      icon: Sparkles,
      color: "bg-primary/10 text-primary",
    },
    {
      to: "/careers",
      label: "Explore Careers",
      desc: "Browse all career paths",
      icon: BarChart3,
      color: "bg-chart-2/15 text-chart-2",
    },
    {
      to: "/milestones",
      label: "View Milestones",
      desc: "Track your progress",
      icon: Flag,
      color: "bg-chart-3/15 text-chart-3",
    },
    {
      to: "/skill-gap",
      label: "Skill Gap Analysis",
      desc: "See what you need to improve",
      icon: Target,
      color: "bg-chart-4/15 text-chart-4",
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-primary text-primary-foreground overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-display font-black mb-1">
                  Welcome back{profile?.name ? `, ${profile.name}` : ""}! 👋
                </h1>
                <p className="text-primary-foreground/80 font-ui text-sm">
                  {assessment
                    ? "You've completed your assessment. Check your results and career matches below."
                    : "Take your career assessment to get personalized recommendations."}
                </p>
              </div>
              <div className="hidden md:flex w-12 h-12 rounded-full bg-white/10 items-center justify-center flex-shrink-0">
                <User className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main grid: 2/3 left + 1/3 right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── LEFT: Assessment Results ── */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="font-display text-base">
                  Assessment Results
                </CardTitle>
                {assessment && (
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                  >
                    <Link to="/results">
                      View Full Results{" "}
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {loadingAssessment ? (
                  <div className="space-y-3">
                    {["1", "2", "3", "4", "5", "6"].map((k) => (
                      <Skeleton key={k} className="h-8" />
                    ))}
                  </div>
                ) : !assessment ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Sparkles className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-bold mb-1">
                        No assessment yet
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Take the assessment to get personalized career
                        recommendations
                      </p>
                    </div>
                    <Button asChild className="font-display font-bold">
                      <Link to="/assessment">Take Assessment Now</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {SCORE_LABELS.map((item) => {
                      const score = scores?.[item.key] ?? 0;
                      const pct = Math.round((score / (maxScore || 1)) * 100);
                      return (
                        <div key={item.key} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-ui font-medium">
                              {item.label}
                            </span>
                            <span className="text-muted-foreground font-ui">
                              {score} pts
                            </span>
                          </div>
                          <Progress value={pct} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ── Daily Challenge ── */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-base">
                        Daily Challenge
                      </p>
                      <p className="text-xs text-muted-foreground font-ui mt-0.5">
                        {topCategory
                          ? `Today's topic: ${topCategory} — based on your interests`
                          : "Real-world questions for 10th-grade students"}
                      </p>
                      {lastAttempt && (
                        <p className="text-xs text-muted-foreground font-ui mt-1">
                          Last score:{" "}
                          <span className="font-semibold text-primary">
                            {Number(lastAttempt.score)}/
                            {Number(lastAttempt.total)}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="font-display font-bold flex-shrink-0"
                  >
                    <Link to="/questions">
                      {lastAttempt ? "Try Again" : "Start Quiz"}{" "}
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── RIGHT: Quick Actions + Reminders ── */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="font-display text-base">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {QUICK_ACTIONS.map((action) => (
                  <Link
                    key={action.to}
                    to={action.to}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors group"
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${action.color}`}
                    >
                      <action.icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-ui font-semibold group-hover:text-primary transition-colors">
                        {action.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {action.desc}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Reminders Widget */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display text-base flex items-center gap-2">
                    <Bell className="w-4 h-4 text-primary" />
                    Reminders
                    {overdueCount > 0 && (
                      <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 h-5 rounded-full">
                        {overdueCount}
                      </Badge>
                    )}
                  </CardTitle>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-primary h-7 text-xs"
                  >
                    <Link to="/reminders">
                      View All <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {loadingReminders ? (
                  <div className="space-y-2">
                    {[1, 2].map((k) => (
                      <Skeleton key={k} className="h-12 rounded-lg" />
                    ))}
                  </div>
                ) : upcomingReminders.length === 0 ? (
                  <div className="text-center py-4 space-y-2">
                    <Bell className="w-6 h-6 text-muted-foreground mx-auto opacity-50" />
                    <p className="text-xs text-muted-foreground font-ui">
                      No upcoming reminders
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="font-ui text-xs h-7"
                    >
                      <Link to="/reminders">Add Reminder</Link>
                    </Button>
                  </div>
                ) : (
                  upcomingReminders.map((r) => {
                    const overdue = isOverdue(r.dueDate, r.completed);
                    const today = isToday(r.dueDate, r.completed);
                    return (
                      <Link
                        key={r.title}
                        to="/reminders"
                        className={`flex items-start gap-2.5 p-2.5 rounded-lg border transition-colors hover:bg-accent group ${
                          overdue
                            ? "border-red-300/50 bg-red-50/50 dark:bg-red-950/10"
                            : today
                              ? "border-amber-300/50 bg-amber-50/50 dark:bg-amber-950/10"
                              : "border-border"
                        }`}
                      >
                        {overdue ? (
                          <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                        ) : today ? (
                          <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Bell className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-ui font-semibold leading-tight truncate">
                            {r.title}
                          </p>
                          <p
                            className={`text-xs font-ui ${overdue ? "text-red-500" : "text-muted-foreground"}`}
                          >
                            {overdue ? "Overdue · " : today ? "Today · " : ""}
                            {formatDueDateShort(r.dueDate)}
                          </p>
                        </div>
                      </Link>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ── Study Materials ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-display font-black">
                Recommended Study Materials
              </h2>
              <p className="text-sm text-muted-foreground font-ui mt-0.5">
                {topCategory
                  ? `Curated for your top interest: ${topCategory}`
                  : "Explore resources across all career paths"}
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/careers">
                View All <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>

          {studyMaterials.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground font-ui">
                  {loadingAssessment
                    ? "Loading materials..."
                    : "Take your assessment to get personalized study materials."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {studyMaterials.map((material, i) => (
                <motion.div
                  key={material.url}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <StudyMaterialCard material={material} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* ── Recommended Careers ── */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-display font-black">
              {assessment ? "Recommended for You" : "Popular Careers"}
            </h2>
            <Button asChild variant="outline" size="sm">
              <Link to="/careers">
                View All <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
          {loadingCareers ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {["1", "2", "3"].map((k) => (
                <Skeleton key={k} className="h-44 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {topCareers.map((career) => (
                <CareerCard key={career.id.toString()} career={career} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
