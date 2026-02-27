import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Building2,
  ChevronDown,
  DollarSign,
  ExternalLink,
  Globe,
  GraduationCap,
  Loader2,
  MapPin,
  Play,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { StudyMaterial } from "../backend.d";
import { CategoryBadge } from "../components/CategoryBadge";
import {
  useGetCareerById,
  useGetStudyMaterials,
  useInitMilestones,
} from "../hooks/useQueries";

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

function StudyMaterialCard({ material }: { material: StudyMaterial }) {
  const Icon = getMaterialIcon(material.materialType);
  return (
    <a
      href={material.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
    >
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-ui font-semibold leading-tight group-hover:text-primary transition-colors">
            {material.title}
          </p>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-xs text-muted-foreground font-ui leading-snug mt-1 line-clamp-2">
          {material.description}
        </p>
        <span
          className={`inline-block text-xs px-1.5 py-0.5 rounded-md mt-2 font-ui font-semibold ${getDifficultyStyle(material.difficulty)}`}
        >
          {material.difficulty}
        </span>
      </div>
    </a>
  );
}

export function CareerDetailPage() {
  const { id } = useParams({ from: "/careers/$id" });
  const navigate = useNavigate();
  const careerId = BigInt(id);

  const { data: career, isLoading } = useGetCareerById(careerId);
  const initMilestones = useInitMilestones();
  const { data: studyMaterials } = useGetStudyMaterials(career?.category ?? "");

  const handleStartRoadmap = async () => {
    if (!career) return;
    try {
      await initMilestones.mutateAsync(career.id);
      toast.success("Roadmap started! Redirecting to milestones...");
      void navigate({ to: "/milestones" });
    } catch {
      toast.error("Failed to start roadmap. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-72" />
        </div>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="min-h-screen py-8 text-center">
        <p className="text-muted-foreground">Career not found.</p>
        <Button
          variant="outline"
          onClick={() => void navigate({ to: "/careers" })}
          className="mt-4"
        >
          Back to Careers
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl space-y-6">
        {/* Back */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => void navigate({ to: "/careers" })}
          className="text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Careers
        </Button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <CategoryBadge category={career.category} />
              <h1 className="text-3xl font-display font-black">
                {career.title}
              </h1>
              <p className="text-muted-foreground font-ui">
                {career.description}
              </p>
            </div>
            <Button
              onClick={handleStartRoadmap}
              disabled={initMilestones.isPending}
              className="font-display font-bold flex-shrink-0"
            >
              {initMilestones.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Starting...
                </>
              ) : (
                "Start My Roadmap"
              )}
            </Button>
          </div>
        </motion.div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Entry Salary",
              value: career.salaryEntry,
              icon: DollarSign,
            },
            { label: "Mid-Level", value: career.salaryMid, icon: DollarSign },
            { label: "Senior", value: career.salarySenior, icon: DollarSign },
          ].map((stat) => (
            <Card key={stat.label} className="p-4 text-center">
              <p className="text-xs text-muted-foreground font-ui mb-1">
                {stat.label}
              </p>
              <p className="text-sm font-display font-bold text-primary">
                {stat.value}
              </p>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="w-full grid grid-cols-5">
            <TabsTrigger value="overview" className="text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="text-xs">
              Roadmap
            </TabsTrigger>
            <TabsTrigger value="salary" className="text-xs">
              Salary
            </TabsTrigger>
            <TabsTrigger value="companies" className="text-xs">
              Companies
            </TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">
              Skills
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <h3 className="font-display font-bold">Career Overview</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {career.description}
                </p>
              </CardContent>
            </Card>
            {career.educationPath.length > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="font-display font-bold">Education Path</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {career.educationPath.map((edu, i) => (
                      <li key={edu} className="flex items-center gap-2 text-sm">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        {edu}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Roadmap */}
          <TabsContent value="roadmap" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="font-display font-bold">Year-by-Year Roadmap</h3>
                <MapPin className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                {career.roadmapYears.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No roadmap available for this career.
                  </p>
                ) : (
                  <Accordion type="multiple" defaultValue={["year-0"]}>
                    {career.roadmapYears
                      .slice()
                      .sort((a, b) => Number(a.year) - Number(b.year))
                      .map((ry, i) => (
                        <AccordionItem
                          key={ry.year.toString()}
                          value={`year-${i}`}
                        >
                          <AccordionTrigger className="font-display font-bold">
                            Year {Number(ry.year)}
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 pt-1">
                              {ry.tasks.map((task) => (
                                <li
                                  key={task}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <ChevronDown className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0 rotate-[-90deg]" />
                                  <span className="text-muted-foreground">
                                    {task}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Salary */}
          <TabsContent value="salary" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Entry Level",
                  value: career.salaryEntry,
                  color: "bg-chart-2/10 border-chart-2/30 text-chart-2",
                },
                {
                  label: "Mid Level",
                  value: career.salaryMid,
                  color: "bg-primary/10 border-primary/30 text-primary",
                },
                {
                  label: "Senior Level",
                  value: career.salarySenior,
                  color: "bg-chart-4/10 border-chart-4/30 text-chart-4",
                },
              ].map((sal) => (
                <Card
                  key={sal.label}
                  className={`border ${sal.color.split(" ")[1]}`}
                >
                  <CardContent className="p-6 text-center">
                    <p className="text-xs font-ui font-semibold uppercase tracking-wide opacity-70 mb-2">
                      {sal.label}
                    </p>
                    <p
                      className={`text-2xl font-display font-black ${sal.color.split(" ")[2]}`}
                    >
                      {sal.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Companies */}
          <TabsContent value="companies" className="mt-4">
            <Card>
              <CardHeader>
                <h3 className="font-display font-bold flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Top Hiring Companies
                </h3>
              </CardHeader>
              <CardContent>
                {career.topCompanies.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No company data available.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {career.topCompanies.map((company) => (
                      <span
                        key={company}
                        className="px-4 py-2 rounded-full bg-card border border-border text-sm font-ui font-medium hover:border-primary/40 hover:text-primary transition-colors"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills */}
          <TabsContent value="skills" className="mt-4">
            <Card>
              <CardHeader>
                <h3 className="font-display font-bold">Required Skills</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {career.requiredSkills.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No skill requirements available.
                  </p>
                ) : (
                  career.requiredSkills.map((skill) => {
                    const level = Number(skill.requiredLevel);
                    const pct = (level / 5) * 100;
                    return (
                      <div key={skill.skillName} className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <span className="font-ui font-medium">
                            {skill.skillName}
                          </span>
                          <span className="text-muted-foreground font-ui">
                            {level}/5
                          </span>
                        </div>
                        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Study Materials Section */}
        {(studyMaterials?.length ?? 0) > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div>
              <h2 className="text-xl font-display font-black flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Study Materials
              </h2>
              <p className="text-sm text-muted-foreground font-ui mt-1">
                Recommended resources for {career.category} careers
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(studyMaterials ?? []).map((material) => (
                <StudyMaterialCard key={material.url} material={material} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
