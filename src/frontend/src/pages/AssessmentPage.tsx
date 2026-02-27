import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "@tanstack/react-router";
import {
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { SkillRating } from "../backend.d";
import { ResultsReveal } from "../components/ResultsReveal";
import {
  useGetAllCareers,
  useSaveAssessment,
  useSaveProfile,
} from "../hooks/useQueries";
import {
  ANSWER_OPTIONS,
  CURRENT_SKILLS,
  EDUCATION_LEVELS,
  INTEREST_QUESTIONS,
  SKILL_NAMES,
  STREAMS,
  computeScores,
} from "../lib/careers";

interface BasicInfo {
  name: string;
  education: string;
  stream: string;
  currentSkills: string[];
}

const SKILL_LABELS: Record<number, string> = {
  1: "Beginner",
  2: "Elementary",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

const SKILL_COLORS: Record<number, string> = {
  1: "oklch(0.65 0.18 35)",
  2: "oklch(0.72 0.2 55)",
  3: "oklch(0.62 0.19 162)",
  4: "oklch(0.56 0.2 230)",
  5: "oklch(0.46 0.21 264)",
};

const STEPS = [
  { id: 0, label: "Profile", shortLabel: "You" },
  { id: 1, label: "Interests", shortLabel: "Interests" },
  { id: 2, label: "Skills", shortLabel: "Skills" },
  { id: 3, label: "Results", shortLabel: "Results" },
];

/* ── Step indicator ─────────────────────────────────── */
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, i) => {
        const isDone = i < current;
        const isActive = i === current;
        return (
          <div key={step.id} className="flex items-center">
            {/* Node */}
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{
                  backgroundColor: isDone
                    ? "oklch(0.46 0.21 264)"
                    : isActive
                      ? "oklch(0.46 0.21 264)"
                      : "oklch(var(--muted))",
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-9 h-9 rounded-full flex items-center justify-center border-2 relative"
                style={{
                  borderColor:
                    isDone || isActive
                      ? "oklch(0.46 0.21 264)"
                      : "oklch(var(--border))",
                }}
              >
                {isDone ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <span
                    className="text-xs font-display font-black"
                    style={{
                      color: isActive
                        ? "white"
                        : "oklch(var(--muted-foreground))",
                    }}
                  >
                    {step.id + 1}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: "2px solid oklch(0.46 0.21 264 / 0.35)" }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                      duration: 1.8,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                )}
              </motion.div>
              <span
                className="text-[10px] font-ui font-semibold hidden sm:block"
                style={{
                  color: isActive
                    ? "oklch(var(--primary))"
                    : "oklch(var(--muted-foreground))",
                }}
              >
                {step.shortLabel}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className="w-12 sm:w-20 mx-1 h-0.5 rounded-full mb-5 overflow-hidden bg-border">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  animate={{ width: i < current ? "100%" : "0%" }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function AssessmentPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    name: "",
    education: "",
    stream: "",
    currentSkills: [],
  });
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [skillRatings, setSkillRatings] = useState<Record<string, number>>(
    Object.fromEntries(SKILL_NAMES.map((s) => [s, 3])),
  );
  const [computedScores, setComputedScores] = useState<ReturnType<
    typeof computeScores
  > | null>(null);

  const saveAssessment = useSaveAssessment();
  const saveProfile = useSaveProfile();
  const { data: careers } = useGetAllCareers();

  function goNext() {
    setDirection(1);
    setStep((s) => s + 1);
  }
  function goPrev() {
    setDirection(-1);
    setStep((s) => s - 1);
  }

  async function handleSubmit() {
    const scores = computeScores(answers);
    setComputedScores(scores);

    const categoryRanking = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([k]) => k);

    const topCategoryNames = categoryRanking.slice(0, 3).map((k) => {
      const map: Record<string, string> = {
        technical: "Technical",
        medical: "Medical",
        creative: "Creative",
        business: "Business",
        government: "Government",
        research: "Research",
      };
      return map[k];
    });

    const matchedCareers = (careers ?? [])
      .filter((c) => topCategoryNames.includes(c.category))
      .slice(0, 3);

    const ratings: SkillRating[] = Object.entries(skillRatings).map(
      ([skillName, rating]) => ({ skillName, userRating: BigInt(rating) }),
    );

    try {
      await Promise.all([
        saveAssessment.mutateAsync({
          technicalScore: BigInt(scores.technical),
          creativeScore: BigInt(scores.creative),
          businessScore: BigInt(scores.business),
          medicalScore: BigInt(scores.medical),
          governmentScore: BigInt(scores.government),
          researchScore: BigInt(scores.research),
          skillRatings: ratings,
          topCareers: matchedCareers.map((c) => c.id),
        }),
        basicInfo.name
          ? saveProfile.mutateAsync({
              name: basicInfo.name,
              education: basicInfo.education,
              stream: basicInfo.stream,
            })
          : Promise.resolve(),
      ]);
      setDirection(1);
      setStep(3);
    } catch {
      toast.error("Failed to save assessment. Please try again.");
    }
  }

  const canProceedStep0 = basicInfo.education !== "" && basicInfo.stream !== "";
  const canProceedStep1 =
    Object.keys(answers).length >= INTEREST_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-display font-black mb-1">
            Career Assessment
          </h1>
          <p className="text-sm text-muted-foreground font-ui">
            ~5 minutes · {STEPS[step]?.label}
          </p>
        </motion.div>

        {/* Step indicator */}
        <StepIndicator current={step} />

        {/* Step content */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── Step 0: Basic Info ───────────────────────── */}
            {step === 0 && (
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="pb-5 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-display font-black text-sm">
                        1
                      </span>
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-lg leading-none mb-0.5">
                        Tell Us About Yourself
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Basic info to personalise your results
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="font-ui font-semibold text-sm"
                    >
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={basicInfo.name}
                      onChange={(e) =>
                        setBasicInfo((p) => ({ ...p, name: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="font-ui font-semibold text-sm">
                        Education Level{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={basicInfo.education}
                        onValueChange={(v) =>
                          setBasicInfo((p) => ({ ...p, education: v }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {EDUCATION_LEVELS.map((e) => (
                            <SelectItem key={e} value={e}>
                              {e}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="font-ui font-semibold text-sm">
                        Stream / Field{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={basicInfo.stream}
                        onValueChange={(v) =>
                          setBasicInfo((p) => ({ ...p, stream: v }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select stream" />
                        </SelectTrigger>
                        <SelectContent>
                          {STREAMS.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <Label className="font-ui font-semibold text-sm">
                      Current Skills{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {CURRENT_SKILLS.map((skill) => {
                        const checked = basicInfo.currentSkills.includes(skill);
                        return (
                          <button
                            type="button"
                            key={skill}
                            onClick={() =>
                              setBasicInfo((p) => ({
                                ...p,
                                currentSkills: checked
                                  ? p.currentSkills.filter((s) => s !== skill)
                                  : [...p.currentSkills, skill],
                              }))
                            }
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm font-ui transition-all ${
                              checked
                                ? "border-primary text-primary"
                                : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
                            }`}
                            style={{
                              backgroundColor: checked
                                ? "oklch(0.38 0.18 264 / 0.07)"
                                : undefined,
                            }}
                          >
                            <Checkbox
                              id={`skill-${skill}`}
                              checked={checked}
                              onCheckedChange={(c) =>
                                setBasicInfo((p) => ({
                                  ...p,
                                  currentSkills: c
                                    ? [...p.currentSkills, skill]
                                    : p.currentSkills.filter(
                                        (s) => s !== skill,
                                      ),
                                }))
                              }
                              className="hidden"
                            />
                            <div
                              className={`w-3.5 h-3.5 rounded flex-shrink-0 flex items-center justify-center border transition-all ${
                                checked
                                  ? "bg-primary border-primary"
                                  : "border-border"
                              }`}
                            >
                              {checked && (
                                <Check className="w-2.5 h-2.5 text-white" />
                              )}
                            </div>
                            <span className="truncate text-xs">{skill}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ── Step 1: Interest Questions ───────────────── */}
            {step === 1 && (
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="pb-5 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-display font-black text-sm">
                          2
                        </span>
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-lg leading-none mb-0.5">
                          Interest Assessment
                        </h2>
                        <p className="text-xs text-muted-foreground">
                          How strongly do you agree?
                        </p>
                      </div>
                    </div>
                    {/* Progress counter */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          animate={{
                            width: `${(answeredCount / INTEREST_QUESTIONS.length) * 100}%`,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <span className="text-xs font-ui text-muted-foreground w-8 text-right">
                        {answeredCount}/{INTEREST_QUESTIONS.length}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  {INTEREST_QUESTIONS.map((q, i) => {
                    const answered = answers[i] !== undefined;
                    return (
                      <div
                        key={q.text}
                        className={`rounded-xl p-4 border transition-all duration-200 ${
                          answered
                            ? "border-primary/25 bg-primary/4"
                            : "border-border/50 bg-muted/30"
                        }`}
                        style={{
                          backgroundColor: answered
                            ? "oklch(0.38 0.18 264 / 0.04)"
                            : undefined,
                        }}
                      >
                        <p className="text-sm font-ui font-medium mb-3 flex items-start gap-2">
                          <span
                            className={`font-display font-black text-xs w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                              answered
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {answered ? <Check className="w-3 h-3" /> : i + 1}
                          </span>
                          {q.text}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {ANSWER_OPTIONS.map((opt) => {
                            const isSelected = answers[i] === opt.value;
                            return (
                              <button
                                type="button"
                                key={opt.value}
                                onClick={() =>
                                  setAnswers((p) => ({ ...p, [i]: opt.value }))
                                }
                                className={`py-2 px-2 rounded-lg text-[11px] font-ui font-semibold transition-all duration-150 border relative ${
                                  isSelected
                                    ? "bg-primary text-primary-foreground border-primary shadow-glow-sm scale-[1.02]"
                                    : "bg-card border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-primary/5"
                                }`}
                              >
                                {isSelected && (
                                  <motion.div
                                    layoutId={`check-${i}`}
                                    className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white/30 flex items-center justify-center"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                  >
                                    <Check className="w-2 h-2 text-white" />
                                  </motion.div>
                                )}
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            {/* ── Step 2: Skill Rating ─────────────────────── */}
            {step === 2 && (
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="pb-5 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-display font-black text-sm">
                        3
                      </span>
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-lg leading-none mb-0.5">
                        Rate Your Skills
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Drag each slider to your honest level
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-7 pt-6">
                  {SKILL_NAMES.map((skill) => {
                    const rating = skillRatings[skill] ?? 3;
                    const levelLabel = SKILL_LABELS[rating];
                    const levelColor = SKILL_COLORS[rating];
                    return (
                      <div key={skill}>
                        <div className="flex items-center justify-between mb-3">
                          <Label className="font-ui font-semibold text-sm">
                            {skill}
                          </Label>
                          <motion.span
                            key={rating}
                            initial={{ opacity: 0, y: -4, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="text-xs font-ui font-bold px-2.5 py-1 rounded-full"
                            style={{
                              color: levelColor,
                              backgroundColor: `${levelColor.replace(")", " / 0.12)")}`,
                            }}
                          >
                            {rating}/5 · {levelLabel}
                          </motion.span>
                        </div>
                        {/* Dot scale */}
                        <div className="flex gap-1.5 mb-3">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <motion.div
                              key={n}
                              animate={{
                                backgroundColor:
                                  n <= rating
                                    ? levelColor
                                    : "oklch(var(--muted))",
                                scale: n === rating ? 1.25 : 1,
                              }}
                              transition={{ duration: 0.2 }}
                              className="h-2 flex-1 rounded-full"
                            />
                          ))}
                        </div>
                        <Slider
                          value={[rating]}
                          min={1}
                          max={5}
                          step={1}
                          onValueChange={([v]) =>
                            setSkillRatings((p) => ({ ...p, [skill]: v }))
                          }
                          className="w-full"
                        />
                        <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5 font-ui">
                          <span>Beginner</span>
                          <span>Expert</span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            {/* ── Step 3: Results ──────────────────────────── */}
            {step === 3 && computedScores && (
              <ResultsReveal
                scores={computedScores}
                careers={careers ?? []}
                topCareerIds={[]}
                onNavigate={() => void navigate({ to: "/results" })}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {step < 3 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-3 mt-8"
          >
            {step > 0 && (
              <Button
                variant="outline"
                onClick={goPrev}
                className="font-ui gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
            )}
            <div className="flex-1" />
            {step < 2 ? (
              <Button
                onClick={goNext}
                disabled={step === 0 ? !canProceedStep0 : !canProceedStep1}
                className="font-display font-bold gap-1.5 min-w-32"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={saveAssessment.isPending}
                className="font-display font-bold gap-2 min-w-40"
              >
                {saveAssessment.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Get My Results
                  </>
                )}
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
