import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Assessment,
  Career,
  Milestone,
  Question,
  QuestionAttempt,
  Reminder,
  SkillRating,
  StudyMaterial,
  UserProfile,
} from "../backend.d";
import { useActor } from "./useActor";

// ─── Careers ─────────────────────────────────────────────
export function useGetAllCareers() {
  const { actor, isFetching } = useActor();
  return useQuery<Career[]>({
    queryKey: ["careers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCareers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCareerById(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Career | null>({
    queryKey: ["career", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getCareerById(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useGetCareersByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Career[]>({
    queryKey: ["careers", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCareersByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Assessments ─────────────────────────────────────────
export function useGetLatestAssessment() {
  const { actor, isFetching } = useActor();
  return useQuery<Assessment | null>({
    queryKey: ["latestAssessment"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getLatestAssessment();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAssessments() {
  const { actor, isFetching } = useActor();
  return useQuery<Assessment[]>({
    queryKey: ["assessments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAssessments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveAssessment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      technicalScore: bigint;
      creativeScore: bigint;
      businessScore: bigint;
      medicalScore: bigint;
      governmentScore: bigint;
      researchScore: bigint;
      skillRatings: SkillRating[];
      topCareers: bigint[];
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.saveAssessment(
        params.technicalScore,
        params.creativeScore,
        params.businessScore,
        params.medicalScore,
        params.governmentScore,
        params.researchScore,
        params.skillRatings,
        params.topCareers,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestAssessment"] });
      queryClient.invalidateQueries({ queryKey: ["assessments"] });
    },
  });
}

// ─── Profile ─────────────────────────────────────────────
export function useGetProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: {
      name: string;
      education: string;
      stream: string;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.saveProfile(profile.name, profile.education, profile.stream);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

// ─── Milestones ───────────────────────────────────────────
export function useGetMilestones(careerTitle: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Milestone[]>({
    queryKey: ["milestones", careerTitle],
    queryFn: async () => {
      if (!actor || !careerTitle) return [];
      return actor.getMilestones(careerTitle);
    },
    enabled: !!actor && !isFetching && !!careerTitle,
  });
}

export function useInitMilestones() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (careerId: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.initMilestones(careerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
    },
  });
}

export function useToggleMilestone() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      careerTitle: string;
      year: bigint;
      taskText: string;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.toggleMilestone(
        params.careerTitle,
        params.year,
        params.taskText,
      );
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["milestones", variables.careerTitle],
      });
    },
  });
}

// ─── Chat ─────────────────────────────────────────────────
export function useCareerChat() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (query: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.careerChat(query);
    },
  });
}

// ─── Study Materials ──────────────────────────────────────
export function useGetStudyMaterials(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<StudyMaterial[]>({
    queryKey: ["studyMaterials", category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.getStudyMaterials(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useGetAllStudyMaterials() {
  const { actor, isFetching } = useActor();
  return useQuery<StudyMaterial[]>({
    queryKey: ["studyMaterials", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStudyMaterials();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Reminders ────────────────────────────────────────────
export function useGetReminders() {
  const { actor, isFetching } = useActor();
  return useQuery<Reminder[]>({
    queryKey: ["reminders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReminders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddReminder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      dueDate: bigint;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.addReminder(
        params.title,
        params.description,
        params.dueDate,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });
}

export function useDeleteReminder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deleteReminder(title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });
}

export function useToggleReminderComplete() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.toggleReminderComplete(title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });
}

// ─── Questions ────────────────────────────────────────────
export function useGetRandomQuestions(category: string, count: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<Question[]>({
    queryKey: ["questions", category, count.toString()],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.getRandomQuestions(category, count);
    },
    enabled: !!actor && !isFetching && !!category,
    staleTime: 0, // Always fresh — want different questions each time
  });
}

export function useSaveQuestionAttempt() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      category: string;
      score: bigint;
      total: bigint;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.saveQuestionAttempt(
        params.category,
        params.score,
        params.total,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionHistory"] });
    },
  });
}

export function useGetQuestionHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<QuestionAttempt[]>({
    queryKey: ["questionHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuestionHistory();
    },
    enabled: !!actor && !isFetching,
  });
}
