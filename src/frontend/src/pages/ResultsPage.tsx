import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { CareerCard } from "../components/CareerCard";
import { useGetAllCareers, useGetLatestAssessment } from "../hooks/useQueries";
import { SCORE_LABELS } from "../lib/careers";

export function ResultsPage() {
  const { data: assessment, isLoading } = useGetLatestAssessment();
  const { data: careers } = useGetAllCareers();

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
    : [];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-black">Your Results</h1>
            <p className="text-muted-foreground font-ui text-sm mt-1">
              {assessment
                ? `Assessment taken on ${new Date(Number(assessment.timestamp) / 1_000_000).toLocaleDateString()}`
                : "No assessment found"}
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/assessment">
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Retake
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {["1", "2", "3", "4", "5", "6"].map((k) => (
              <Skeleton key={k} className="h-10" />
            ))}
          </div>
        ) : !assessment ? (
          <Card className="py-12 text-center">
            <CardContent className="space-y-4">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto" />
              <p className="font-display font-bold">No assessment found</p>
              <p className="text-sm text-muted-foreground">
                Take the assessment to see your results here.
              </p>
              <Button asChild className="font-display font-bold">
                <Link to="/assessment">Take Assessment</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Score bars */}
            <Card>
              <CardHeader>
                <h2 className="font-display font-bold">Category Scores</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {SCORE_LABELS.map((item, i) => {
                  const score = scores?.[item.key] ?? 0;
                  const pct = Math.round((score / maxScore) * 100);
                  return (
                    <div key={item.key} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="font-ui font-medium">
                          {item.label}
                        </span>
                        <span className="text-muted-foreground font-ui">
                          {score} pts
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{
                            delay: i * 0.1,
                            duration: 0.6,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Skill Ratings */}
            {assessment.skillRatings.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <h2 className="font-display font-bold">Your Skill Ratings</h2>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                  >
                    <Link to="/skill-gap">
                      Gap Analysis <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {assessment.skillRatings.map((sr) => (
                    <div key={sr.skillName} className="flex items-center gap-3">
                      <span className="text-sm font-ui w-36 flex-shrink-0">
                        {sr.skillName}
                      </span>
                      <div className="flex gap-1 flex-1">
                        {(["1", "2", "3", "4", "5"] as const).map((k, i) => (
                          <div
                            key={k}
                            className={`h-2 flex-1 rounded-full ${
                              i < Number(sr.userRating)
                                ? "bg-primary"
                                : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground font-ui w-8 text-right">
                        {Number(sr.userRating)}/5
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Recommended Careers */}
            <div>
              <h2 className="text-xl font-display font-black mb-4">
                Top Career Matches
              </h2>
              {topCareers.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Complete your assessment to see career matches.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {topCareers.map((career) => (
                    <CareerCard key={career.id.toString()} career={career} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
