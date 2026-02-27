import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CareerCard } from "../components/CareerCard";
import { useGetAllCareers } from "../hooks/useQueries";

// Counter hook
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { count, ref };
}

function StatCard({
  value,
  label,
  suffix = "",
}: { value: number; label: string; suffix?: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center group">
      <div className="font-display text-5xl font-black text-primary mb-1 tabular-nums">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground font-ui tracking-wide">
        {label}
      </div>
    </div>
  );
}

/* ─── Animated career path orbs ────────────────────────── */
const ORBIT_ITEMS = [
  { label: "Software Dev", color: "oklch(0.62 0.22 264)", angle: 0 },
  { label: "Data Scientist", color: "oklch(0.65 0.19 162)", angle: 72 },
  { label: "UI/UX Designer", color: "oklch(0.65 0.22 290)", angle: 144 },
  { label: "Doctor", color: "oklch(0.65 0.18 155)", angle: 216 },
  { label: "Entrepreneur", color: "oklch(0.78 0.2 55)", angle: 288 },
];

function CareerOrb() {
  return (
    <div
      className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto select-none"
      aria-hidden="true"
    >
      {/* Centre core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-glow"
        >
          <Sparkles className="w-8 h-8 text-primary-foreground" />
        </motion.div>
      </div>

      {/* Orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute inset-4 rounded-full border border-primary/20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 28,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute inset-10 rounded-full border border-primary/10"
      />

      {/* Career nodes */}
      {ORBIT_ITEMS.map((item, i) => {
        const rad = (item.angle * Math.PI) / 180;
        const r = 108;
        const cx = 50 + (r / 1.6) * Math.cos(rad);
        const cy = 50 + (r / 1.6) * Math.sin(rad);
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4 + i * 0.12,
              type: "spring",
              stiffness: 200,
            }}
            style={{
              left: `${cx}%`,
              top: `${cy}%`,
              transform: "translate(-50%,-50%)",
            }}
            className="absolute"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 2.5 + i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="px-2.5 py-1.5 rounded-full text-[10px] font-ui font-bold text-white shadow-md whitespace-nowrap"
              style={{ backgroundColor: item.color }}
            >
              {item.label}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

const HOW_IT_WORKS = [
  {
    icon: BookOpen,
    title: "Take the Assessment",
    desc: "Answer 10 questions about your interests and rate your skills across key areas.",
  },
  {
    icon: Sparkles,
    title: "Get Career Matches",
    desc: "Our algorithm maps your responses to the best-fit career paths for you.",
  },
  {
    icon: Target,
    title: "Follow Your Roadmap",
    desc: "Get a year-by-year plan with milestones, skill targets, and salary insights.",
  },
];

const WHY_US = [
  {
    icon: BarChart3,
    title: "Data-Driven Analysis",
    desc: "Weighted scoring across 6 career categories gives objective, personalized results.",
  },
  {
    icon: Target,
    title: "Personalized Roadmap",
    desc: "Year-by-year career plans tailored to your unique profile and goals.",
  },
  {
    icon: Zap,
    title: "Skill Gap Detection",
    desc: "Instantly see where you stand vs. industry requirements.",
  },
  {
    icon: TrendingUp,
    title: "Industry Insights",
    desc: "Real salary data, top companies, and trending careers across all sectors.",
  },
];

const FEATURES = [
  "10 Interest Questions",
  "Skill Gap Analysis",
  "Salary Insights",
  "PDF Roadmap",
  "AI Chatbot",
];

export function HomePage() {
  const { data: careers, isLoading } = useGetAllCareers();
  const trendingCareers = careers?.slice(0, 6) ?? [];

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
        {/* Deep gradient background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.38 0.18 264 / 0.18) 0%, transparent 70%), " +
              "radial-gradient(ellipse 60% 50% at 90% 50%, oklch(0.52 0.18 195 / 0.10) 0%, transparent 60%), " +
              "radial-gradient(ellipse 50% 40% at 10% 80%, oklch(0.52 0.22 290 / 0.08) 0%, transparent 60%)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.38 0.18 264) 1px, transparent 1px), linear-gradient(90deg, oklch(0.38 0.18 264) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-1"
            >
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-xs font-ui font-semibold mb-6"
                style={{ backgroundColor: "oklch(0.38 0.18 264 / 0.08)" }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered Career Guidance
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-[3.75rem] xl:text-[4.5rem] font-display font-black text-foreground leading-[1.05] mb-5">
                Confused About{" "}
                <span className="relative inline-block">
                  <span className="text-primary">Your Career?</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: 0.8,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-primary/40 origin-left block"
                  />
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed font-ui">
                Get AI-powered career recommendations based on your skills and
                interests. Discover your path, bridge skill gaps, and build your
                future — with data.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Button
                  asChild
                  size="lg"
                  className="font-display font-bold text-base h-12 px-8 shadow-glow group"
                >
                  <Link to="/register">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="font-display font-bold text-base h-12 px-8"
                >
                  <Link to="/careers">Explore Careers</Link>
                </Button>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2">
                {FEATURES.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-ui text-muted-foreground"
                  >
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: Animated orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <CareerOrb />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STATS ───────────────────────────────────────── */}
      <section className="py-14 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto divide-x divide-border">
            <StatCard value={10000} label="Career Assessments" suffix="+" />
            <StatCard value={50} label="Career Paths" suffix="+" />
            <StatCard value={95} label="Student Satisfaction" suffix="%" />
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-ui font-bold text-primary mb-3 uppercase tracking-[0.15em]">
              Simple Process
            </p>
            <h2 className="text-4xl font-display font-black mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto font-ui">
              Three steps to discover your ideal career path
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto relative">
            {/* Connector line — desktop only */}
            <div className="hidden md:block absolute top-14 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px border-t border-dashed border-primary/30 -z-0" />

            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18 }}
              >
                <Card className="text-center p-7 hover:shadow-glow-sm hover:-translate-y-1 transition-all duration-300 border-border/60 relative z-10 bg-card">
                  <CardContent className="p-0 space-y-4">
                    {/* Step number badge overlapping icon */}
                    <div className="relative w-fit mx-auto">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <step.icon className="w-7 h-7 text-primary" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-display font-black flex items-center justify-center shadow-sm">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ──────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ backgroundColor: "oklch(var(--card) / 0.4)" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-ui font-bold text-primary mb-3 uppercase tracking-[0.15em]">
              Why CareerNavigator
            </p>
            <h2 className="text-4xl font-display font-black mb-3">
              Built for Student Success
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-0 space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-sm leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRENDING CAREERS ────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-ui font-bold text-primary mb-2 uppercase tracking-[0.15em]">
                Popular Now
              </p>
              <h2 className="text-4xl font-display font-black">
                Trending Careers
              </h2>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/careers">
                View All <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {["1", "2", "3", "4", "5", "6"].map((k) => (
                <Skeleton key={k} className="h-52 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {trendingCareers.map((career, i) => (
                <motion.div
                  key={career.id.toString()}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <CareerCard career={career} trending={i < 3} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────────────── */}
      <section className="py-16 pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground px-8 py-16 text-center"
          >
            {/* Inner glow layers */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-5">
                <Users className="w-7 h-7" />
              </div>
              <h2 className="text-4xl font-display font-black mb-4">
                Start Your Career Journey Today
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto font-ui text-lg">
                CareerNavigator reduces confusion, bridges skill gaps, and
                empowers students to make data-driven career decisions.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="font-display font-bold h-12 px-8"
                >
                  <Link to="/register">Create Free Account</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="font-display font-bold h-12 px-8 border-white/30 text-primary-foreground hover:bg-white/10"
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
