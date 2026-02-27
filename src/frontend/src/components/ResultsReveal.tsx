import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Career } from "../backend.d";
import { SCORE_LABELS } from "../lib/careers";
import type { CategoryScores } from "../lib/careers";
import { CareerCard } from "./CareerCard";

interface ResultsRevealProps {
  scores: CategoryScores;
  careers: Career[];
  topCareerIds: bigint[];
  onNavigate: () => void;
}

export function ResultsReveal({
  scores,
  careers,
  onNavigate,
}: ResultsRevealProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const maxScore = Math.max(...Object.values(scores), 1);

  // Top 3 career categories by score
  const topCategories = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([key]) => {
      const map: Record<string, string> = {
        technical: "Technical",
        medical: "Medical",
        creative: "Creative",
        business: "Business",
        government: "Government",
        research: "Research",
      };
      return map[key];
    });

  const recommendedCareers = careers
    .filter((c) => topCategories.includes(c.category))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Trophy animation */}
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-center py-4"
      >
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-3">
          <Trophy className="w-8 h-8 text-amber-500" />
        </div>
        <h2 className="text-2xl font-display font-black">
          Your Results Are Ready!
        </h2>
        <p className="text-muted-foreground text-sm font-ui mt-1">
          Here's what we discovered about you
        </p>
      </motion.div>

      {/* Score Bars */}
      <Card>
        <CardHeader>
          <h3 className="font-display font-bold">Category Scores</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {SCORE_LABELS.map((item, i) => {
            const score = scores[item.key];
            const pct = Math.round((score / maxScore) * 100);
            return (
              <div key={item.key} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-ui font-medium">{item.label}</span>
                  <span className="text-muted-foreground font-ui font-semibold">
                    {score} pts
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    animate={revealed ? { width: `${pct}%` } : { width: 0 }}
                    transition={{
                      delay: i * 0.15,
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

      {/* Recommended Careers */}
      {recommendedCareers.length > 0 && (
        <div>
          <h3 className="font-display font-bold text-base mb-3">
            Top Career Matches
          </h3>
          <div className="space-y-3">
            {recommendedCareers.map((career) => (
              <CareerCard key={career.id.toString()} career={career} />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={onNavigate} className="flex-1 font-display font-bold">
          View Full Results <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
