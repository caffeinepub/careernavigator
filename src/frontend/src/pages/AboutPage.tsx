import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  Flag,
  Globe,
  Target,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const PROBLEMS = [
  "Students lack proper career awareness and knowledge of available paths",
  "Peer and parental pressure drives career choices instead of aptitude",
  "Industry skill requirements are unclear and constantly evolving",
  "Students choose careers without understanding the required roadmap",
  "There is no personalized, data-driven guidance available at scale",
];

const SOLUTIONS = [
  { icon: Target, label: "Interest & Aptitude Assessment" },
  { icon: CheckCircle, label: "Personalized Career Recommendations" },
  { icon: AlertTriangle, label: "Skill Gap Analysis" },
  { icon: BookOpen, label: "Detailed Career Roadmap" },
  { icon: Globe, label: "Salary Insights & Industry Trends" },
  { icon: Flag, label: "Milestone Tracking & PDF Download" },
];

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 mesh-bg border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-display font-black mb-4">
              About <span className="text-primary">CareerNavigator</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-ui leading-relaxed">
              We're on a mission to empower every student — especially those in
              rural and underserved communities — to make informed, data-driven
              career decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-ui font-semibold text-primary mb-2 uppercase tracking-wider">
                Our Mission
              </p>
              <h2 className="text-3xl font-display font-black mb-4">
                Discover Your Path. Build Your Future.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                CareerNavigator is an AI-powered student career guidance
                platform designed to bridge the gap between academic learning
                and professional success. We help students understand their
                strengths, explore career options, and build actionable plans.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Aligned with the{" "}
                <strong className="text-foreground">Skill India Mission</strong>
                , we believe every student deserves access to quality career
                guidance — regardless of geography or background.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-primary/5 border-primary/20">
                <CardContent className="p-0 space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-bold">Who We Serve</h3>
                  </div>
                  {[
                    "High school students (Grades 9–12)",
                    "College freshmen and sophomores",
                    "Career changers and re-skilling professionals",
                    "Rural students with limited counseling access",
                    "First-generation college students",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-sm font-ui font-semibold text-destructive mb-2 uppercase tracking-wider">
              The Problem
            </p>
            <h2 className="text-3xl font-display font-black">
              Why Students Struggle with Career Choices
            </h2>
          </div>
          <div className="space-y-3 max-w-2xl mx-auto">
            {PROBLEMS.map((problem, i) => (
              <motion.div
                key={problem}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20"
              >
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{problem}</span>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8 p-6 rounded-xl bg-card border border-border">
            <p className="text-muted-foreground font-ui">
              <strong className="text-foreground">Result:</strong> Skill
              mismatch → Unemployment → Career dissatisfaction
            </p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-sm font-ui font-semibold text-primary mb-2 uppercase tracking-wider">
              Our Solution
            </p>
            <h2 className="text-3xl font-display font-black">
              Comprehensive Career Guidance Platform
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOLUTIONS.map((sol, i) => (
              <motion.div
                key={sol.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-5 hover:shadow-card transition-all">
                  <CardContent className="p-0 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <sol.icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <span className="text-sm font-ui font-medium">
                      {sol.label}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill India Callout */}
      <section className="py-10 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="rounded-2xl overflow-hidden border border-primary/30 bg-primary/5 p-8 text-center">
            <Flag className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-display font-black mb-3">
              Aligned with{" "}
              <span className="text-primary">Skill India Mission</span>
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-xl mx-auto">
              CareerNavigator directly supports India's vision of reducing
              unemployment and bridging the skill gap by providing accessible,
              personalized career guidance to every student — especially those
              in rural and underserved communities.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs font-ui mb-6">
              {[
                "Rural Student Empowerment",
                "Reducing Unemployment",
                "Skill Gap Bridging",
                "Data-Driven Decisions",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Button asChild className="font-display font-bold">
              <Link to="/register">Join the Mission</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
