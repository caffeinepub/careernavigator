import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  Globe,
  Loader2,
  RefreshCw,
  Stethoscope,
  Trophy,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  useGetLatestAssessment,
  useGetQuestionHistory,
  useGetRandomQuestions,
  useSaveQuestionAttempt,
} from "../hooks/useQueries";
import { mergeQuestions } from "../lib/questionBank";
import type { LocalQuestion } from "../lib/questionBank";

const CATEGORIES = [
  {
    key: "Technical",
    label: "Technical",
    icon: Brain,
    description: "Computers, coding, internet & technology",
    color: "bg-cat-technical/10 border-cat-technical/30 text-cat-technical",
    hoverColor: "hover:bg-cat-technical/20 hover:border-cat-technical/50",
  },
  {
    key: "Medical",
    label: "Medical",
    icon: Stethoscope,
    description: "Health, biology, human body & medicine",
    color: "bg-cat-medical/10 border-cat-medical/30 text-cat-medical",
    hoverColor: "hover:bg-cat-medical/20 hover:border-cat-medical/50",
  },
  {
    key: "Creative",
    label: "Creative",
    icon: BookOpen,
    description: "Art, design, writing & media",
    color: "bg-cat-creative/10 border-cat-creative/30 text-cat-creative",
    hoverColor: "hover:bg-cat-creative/20 hover:border-cat-creative/50",
  },
  {
    key: "Business",
    label: "Business",
    icon: Briefcase,
    description: "Finance, marketing & entrepreneurship",
    color: "bg-cat-business/10 border-cat-business/30 text-cat-business",
    hoverColor: "hover:bg-cat-business/20 hover:border-cat-business/50",
  },
  {
    key: "Government",
    label: "Government",
    icon: Globe,
    description: "Civics, law, public service & exams",
    color: "bg-cat-government/10 border-cat-government/30 text-cat-government",
    hoverColor: "hover:bg-cat-government/20 hover:border-cat-government/50",
  },
  {
    key: "Research",
    label: "Research",
    icon: FlaskConical,
    description: "Science, experiments & discovery",
    color: "bg-cat-research/10 border-cat-research/30 text-cat-research",
    hoverColor: "hover:bg-cat-research/20 hover:border-cat-research/50",
  },
];

const QUESTIONS_COUNT = 5;

function getMotivationalMessage(
  score: number,
  total: number,
): { message: string; emoji: string } {
  const pct = (score / total) * 100;
  if (pct === 100)
    return {
      message: "PERFECT SCORE! You're absolutely brilliant! Keep it up!",
      emoji: "🏆",
    };
  if (pct >= 80)
    return {
      message: "Excellent work! You really know your stuff!",
      emoji: "🌟",
    };
  if (pct >= 60)
    return {
      message: "Good job! With a bit more practice, you'll be unstoppable!",
      emoji: "👍",
    };
  if (pct >= 40)
    return {
      message: "Nice try! Every expert started as a beginner. Keep practicing!",
      emoji: "💪",
    };
  return {
    message:
      "Don't give up! Review the explanations and try again — you'll improve!",
    emoji: "🌱",
  };
}

function getCategoryTopInterest(
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
  if (!assessment) return "Technical";
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

// Quiz runner component
function QuizRunnerFull({
  category,
  onFinish,
  onBack,
}: {
  category: string;
  onFinish: (
    score: number,
    questions: LocalQuestion[],
    answers: number[],
  ) => void;
  onBack: () => void;
}) {
  const { data: backendQuestions, isLoading } = useGetRandomQuestions(
    category,
    BigInt(QUESTIONS_COUNT),
  );

  const [questions, setQuestions] = useState<LocalQuestion[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [lockedIndex, setLockedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (backendQuestions !== undefined) {
      const merged = mergeQuestions(
        backendQuestions,
        category,
        QUESTIONS_COUNT,
      );
      setQuestions(merged);
      setCurrentIndex(0);
      setSelectedAnswers([]);
      setLockedIndex(null);
    }
  }, [backendQuestions, category]);

  if (isLoading || questions === null) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-muted-foreground font-ui text-sm">
          Loading your questions...
        </p>
      </div>
    );
  }

  const current = questions[currentIndex];
  const progress =
    ((currentIndex + (lockedIndex !== null ? 1 : 0)) / QUESTIONS_COUNT) * 100;
  const isLastQuestion = currentIndex === QUESTIONS_COUNT - 1;

  const handleSelect = (optionIndex: number) => {
    if (lockedIndex !== null) return;
    setLockedIndex(optionIndex);
    setSelectedAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = optionIndex;
      return next;
    });
  };

  const handleNext = () => {
    const finalAnswers = [...selectedAnswers];
    if (isLastQuestion) {
      let score = 0;
      questions.forEach((q, i) => {
        if (finalAnswers[i] === q.correctIndex) score++;
      });
      onFinish(score, questions, finalAnswers);
    } else {
      setCurrentIndex((i) => i + 1);
      setLockedIndex(null);
    }
  };

  const isCorrect =
    lockedIndex !== null && lockedIndex === current.correctIndex;
  const isWrong = lockedIndex !== null && lockedIndex !== current.correctIndex;

  return (
    <div className="space-y-5">
      {/* Progress header */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm font-ui">
          <button
            type="button"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground transition-colors text-xs"
          >
            ← Change category
          </button>
          <Badge variant="secondary" className="font-ui">
            {category} · Q{currentIndex + 1}/{QUESTIONS_COUNT}
          </Badge>
        </div>
        <Progress value={progress} className="h-2.5" />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="border-border shadow-card">
            <CardContent className="p-6 space-y-5">
              <p className="font-display font-bold text-lg leading-snug">
                {current.text}
              </p>

              <div className="space-y-3">
                {current.options.map((option, i) => {
                  let optionClass =
                    "w-full text-left p-4 rounded-xl border-2 transition-all duration-150 font-ui text-sm leading-relaxed ";

                  if (lockedIndex === null) {
                    optionClass +=
                      "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
                  } else if (i === current.correctIndex) {
                    optionClass +=
                      "border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400";
                  } else if (i === lockedIndex && isWrong) {
                    optionClass +=
                      "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400";
                  } else {
                    optionClass +=
                      "border-border opacity-50 cursor-not-allowed";
                  }

                  return (
                    <button
                      key={option.slice(0, 20)}
                      type="button"
                      className={optionClass}
                      onClick={() => handleSelect(i)}
                      disabled={lockedIndex !== null}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 border-current">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{option}</span>
                        {lockedIndex !== null && i === current.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0 text-green-500 mt-0.5" />
                        )}
                        {lockedIndex !== null &&
                          i === lockedIndex &&
                          isWrong && (
                            <XCircle className="w-4 h-4 ml-auto flex-shrink-0 text-red-500 mt-0.5" />
                          )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {lockedIndex !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-sm font-ui leading-relaxed ${
                      isCorrect
                        ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300"
                        : "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300"
                    }`}
                  >
                    <p className="font-semibold mb-1">
                      {isCorrect
                        ? "✅ Correct!"
                        : "💡 Here's what you should know:"}
                    </p>
                    <p>{current.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {lockedIndex !== null && (
                <Button
                  onClick={handleNext}
                  className="w-full font-display font-bold"
                >
                  {isLastQuestion ? (
                    "See My Results 🎯"
                  ) : (
                    <>
                      Next Question <ChevronRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Results view
function QuizResults({
  questions,
  answers,
  score,
  onTryAgain,
  onNewCategory,
}: {
  questions: LocalQuestion[];
  answers: number[];
  score: number;
  onTryAgain: () => void;
  onNewCategory: () => void;
}) {
  const { message, emoji } = getMotivationalMessage(score, questions.length);
  const pct = Math.round((score / questions.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      {/* Score card */}
      <Card className="border-primary/30 bg-primary/5 overflow-hidden">
        <CardContent className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1,
            }}
            className="text-6xl mb-3"
          >
            {emoji}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-display font-black text-primary mb-1"
          >
            {score}/{questions.length}
          </motion.p>
          <p className="text-muted-foreground font-ui text-sm mb-3">
            {pct}% correct
          </p>
          <p className="font-ui text-sm font-medium max-w-sm mx-auto leading-relaxed">
            {message}
          </p>
        </CardContent>
      </Card>

      {/* Question review */}
      <div className="space-y-3">
        <h3 className="font-display font-bold text-lg">Review Your Answers</h3>
        {questions.map((q, i) => {
          const userAnswer = answers[i];
          const correct = userAnswer === q.correctIndex;
          return (
            <Card
              key={q.text.slice(0, 30)}
              className={`border ${correct ? "border-green-400/30 bg-green-50/50 dark:bg-green-950/10" : "border-red-400/30 bg-red-50/50 dark:bg-red-950/10"}`}
            >
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start gap-2">
                  {correct ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="font-ui font-semibold text-sm leading-snug">
                    {q.text}
                  </p>
                </div>
                {!correct && (
                  <p className="text-xs font-ui text-muted-foreground pl-6">
                    Your answer:{" "}
                    <span className="text-red-500">
                      {q.options[userAnswer] ?? "No answer"}
                    </span>{" "}
                    · Correct:{" "}
                    <span className="text-green-600 dark:text-green-400">
                      {q.options[q.correctIndex]}
                    </span>
                  </p>
                )}
                <p className="text-xs font-ui text-muted-foreground pl-6 leading-relaxed">
                  💡 {q.explanation}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pb-4">
        <Button
          onClick={onTryAgain}
          variant="outline"
          className="flex-1 font-display font-bold"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <Button
          onClick={onNewCategory}
          className="flex-1 font-display font-bold"
        >
          Try Another Category
        </Button>
      </div>
    </motion.div>
  );
}

export function QuestionsPage() {
  const { data: assessment } = useGetLatestAssessment();
  const { data: history } = useGetQuestionHistory();
  const saveAttempt = useSaveQuestionAttempt();

  const [step, setStep] = useState<"select" | "quiz" | "results">("select");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [quizKey, setQuizKey] = useState(0);

  // For results
  const [finalScore, setFinalScore] = useState(0);
  const [finalQuestions, setFinalQuestions] = useState<LocalQuestion[]>([]);
  const [finalAnswers, setFinalAnswers] = useState<number[]>([]);

  const topCategory = getCategoryTopInterest(assessment);

  const handleQuizFinish = async (
    score: number,
    questions: LocalQuestion[],
    answers: number[],
  ) => {
    setFinalScore(score);
    setFinalQuestions(questions);
    setFinalAnswers(answers);
    setStep("results");

    try {
      await saveAttempt.mutateAsync({
        category: selectedCategory,
        score: BigInt(score),
        total: BigInt(QUESTIONS_COUNT),
      });
    } catch {
      // Silently fail — don't disrupt the results view
    }
  };

  const handleTryAgain = () => {
    setQuizKey((k) => k + 1);
    setStep("quiz");
  };

  const handleNewCategory = () => {
    setSelectedCategory("");
    setStep("select");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-black">
                Daily Challenge
              </h1>
              <p className="text-muted-foreground font-ui text-sm">
                Real-world questions made for 10th-grade students
              </p>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Category Select */}
        {step === "select" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <p className="font-ui text-sm text-muted-foreground">
              Choose a category to start your 5-question quiz. Questions change
              every time!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const lastAttempt = history
                  ?.filter((a) => a.category === cat.key)
                  .slice(-1)[0];
                const isRecommended = cat.key === topCategory;

                return (
                  <motion.button
                    key={cat.key}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedCategory(cat.key);
                      setQuizKey((k) => k + 1);
                      setStep("quiz");
                    }}
                    className={`relative w-full text-left p-4 rounded-xl border-2 transition-all ${cat.color} ${cat.hoverColor} cursor-pointer`}
                  >
                    {isRecommended && (
                      <span className="absolute -top-2.5 left-3 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-ui font-bold">
                        Recommended
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-display font-bold text-sm">
                          {cat.label}
                        </p>
                        <p className="text-xs opacity-80 font-ui leading-snug">
                          {cat.description}
                        </p>
                        {lastAttempt && (
                          <p className="text-xs opacity-70 font-ui mt-1">
                            Last: {Number(lastAttempt.score)}/
                            {Number(lastAttempt.total)}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2: Quiz */}
        {step === "quiz" && selectedCategory && (
          <QuizRunnerFull
            key={quizKey}
            category={selectedCategory}
            onFinish={handleQuizFinish}
            onBack={() => setStep("select")}
          />
        )}

        {/* Step 3: Results */}
        {step === "results" && (
          <QuizResults
            questions={finalQuestions}
            answers={finalAnswers}
            score={finalScore}
            onTryAgain={handleTryAgain}
            onNewCategory={handleNewCategory}
          />
        )}
      </div>
    </div>
  );
}
