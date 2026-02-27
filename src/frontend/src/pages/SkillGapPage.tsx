import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { CategoryBadge } from "../components/CategoryBadge";
import { useGetAllCareers, useGetLatestAssessment } from "../hooks/useQueries";

export function SkillGapPage() {
  const { data: assessment, isLoading: loadingAssessment } =
    useGetLatestAssessment();
  const { data: careers, isLoading: loadingCareers } = useGetAllCareers();

  const isLoading = loadingAssessment || loadingCareers;

  // Get top recommended career
  const topCareer = assessment
    ? ((careers ?? []).find((c) => assessment.topCareers.includes(c.id)) ??
      (careers ?? [])[0])
    : null;

  const skillRatings = assessment?.skillRatings ?? [];

  // Build gap analysis
  const gapData = skillRatings.map((sr) => {
    const required = topCareer?.requiredSkills.find(
      (rs) => rs.skillName.toLowerCase() === sr.skillName.toLowerCase(),
    );
    const userRating = Number(sr.userRating);
    const requiredLevel = required ? Number(required.requiredLevel) : 3;
    const gap = requiredLevel - userRating;
    return {
      skillName: sr.skillName,
      userRating,
      requiredLevel,
      gap,
      status: gap <= 0 ? "on-track" : gap <= 1 ? "close" : "needs-improvement",
    };
  });

  const totalGap = gapData.reduce((acc, g) => acc + Math.max(0, g.gap), 0);
  const maxPossibleGap = gapData.length * 5;
  const overallScore =
    maxPossibleGap > 0
      ? Math.round((1 - totalGap / maxPossibleGap) * 100)
      : 100;

  const adviceMap: Record<string, string> = {
    Communication:
      "Practice public speaking, join debate clubs, and work on written communication through blogs or essays.",
    Coding:
      "Start with Python or JavaScript tutorials on freeCodeCamp or LeetCode. Build small projects daily.",
    "Analytical Thinking":
      "Solve puzzles, practice case studies, and take courses in statistics or logic.",
    Creativity:
      "Explore design tools like Figma, take art classes, or start a creative side project.",
    Leadership:
      "Volunteer for team lead roles, read leadership books, and mentor peers.",
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-black mb-2">
            Skill Gap Analysis
          </h1>
          <p className="text-muted-foreground font-ui text-sm">
            See how your skills compare to what's required for your top career
            match
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {["1", "2", "3", "4", "5"].map((k) => (
              <Skeleton key={k} className="h-20" />
            ))}
          </div>
        ) : !assessment ? (
          <Card className="py-12 text-center">
            <CardContent className="space-y-4">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto" />
              <p className="font-display font-bold">No assessment data found</p>
              <p className="text-sm text-muted-foreground">
                Complete the career assessment first to see your skill gap
                analysis.
              </p>
              <Button asChild className="font-display font-bold">
                <Link to="/assessment">Take Assessment</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Career being compared */}
            {topCareer && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-ui mb-1">
                      Comparing skills for
                    </p>
                    <div className="flex items-center gap-2">
                      <h2 className="font-display font-bold text-lg">
                        {topCareer.title}
                      </h2>
                      <CategoryBadge category={topCareer.category} />
                    </div>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                  >
                    <Link
                      to="/careers/$id"
                      params={{ id: topCareer.id.toString() }}
                    >
                      View Career <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Overall score */}
            <Card>
              <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg
                    aria-label="Readiness score gauge"
                    className="w-24 h-24 -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <title>Readiness score gauge</title>
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-muted/50"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                      className="text-primary"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                      animate={{
                        strokeDashoffset:
                          2 * Math.PI * 40 * (1 - overallScore / 100),
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-display font-black">
                      {overallScore}%
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-1">
                    Overall Readiness Score
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {overallScore >= 80
                      ? "You're well-prepared for this career! Keep building on your strengths."
                      : overallScore >= 60
                        ? "You have a good foundation. Focus on the highlighted skill gaps."
                        : "There are several areas to develop. Start with the critical skills below."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skill gap bars */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <h3 className="font-display font-bold">Skill Comparison</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground ml-auto">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-2 rounded-full bg-primary inline-block" />{" "}
                      Your Rating
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-2 rounded-full bg-muted-foreground/40 inline-block" />{" "}
                      Required
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {gapData.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No skill rating data available.
                  </p>
                ) : (
                  gapData.map((g, i) => (
                    <motion.div
                      key={g.skillName}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-ui font-medium">
                          {g.skillName}
                        </span>
                        <span
                          className={`flex items-center gap-1 text-xs font-ui font-semibold px-2 py-0.5 rounded-full ${
                            g.status === "on-track"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                              : g.status === "close"
                                ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          }`}
                        >
                          {g.status === "on-track" ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              On Track
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-3 h-3" />
                              Needs Improvement
                            </>
                          )}
                        </span>
                      </div>

                      {/* User bar */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-20">
                            Your rating
                          </span>
                          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary rounded-full"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(g.userRating / 5) * 100}%`,
                              }}
                              transition={{
                                delay: i * 0.1 + 0.3,
                                duration: 0.5,
                              }}
                            />
                          </div>
                          <span className="text-xs font-ui font-semibold w-8 text-right">
                            {g.userRating}/5
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-20">
                            Required
                          </span>
                          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-muted-foreground/50 rounded-full"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(g.requiredLevel / 5) * 100}%`,
                              }}
                              transition={{
                                delay: i * 0.1 + 0.45,
                                duration: 0.5,
                              }}
                            />
                          </div>
                          <span className="text-xs font-ui font-semibold w-8 text-right">
                            {g.requiredLevel}/5
                          </span>
                        </div>
                      </div>

                      {/* Advice */}
                      {g.status !== "on-track" && adviceMap[g.skillName] && (
                        <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-2 leading-relaxed">
                          💡 {adviceMap[g.skillName]}
                        </p>
                      )}
                    </motion.div>
                  ))
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
