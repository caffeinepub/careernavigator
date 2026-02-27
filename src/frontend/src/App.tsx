import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ChatBot } from "./components/ChatBot";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { AboutPage } from "./pages/AboutPage";
import { AssessmentPage } from "./pages/AssessmentPage";
import { CareerDetailPage } from "./pages/CareerDetailPage";
import { CareersPage } from "./pages/CareersPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { MilestonesPage } from "./pages/MilestonesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { QuestionsPage } from "./pages/QuestionsPage";
import { RegisterPage } from "./pages/RegisterPage";
import { RemindersPage } from "./pages/RemindersPage";
import { ResultsPage } from "./pages/ResultsPage";
import { SkillGapPage } from "./pages/SkillGapPage";

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
      <Toaster position="top-right" richColors />
    </div>
  ),
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const careersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/careers",
  component: CareersPage,
});

const careerDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/careers/$id",
  component: CareerDetailPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

// Protected routes
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
});

const assessmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/assessment",
  component: () => (
    <ProtectedRoute>
      <AssessmentPage />
    </ProtectedRoute>
  ),
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/results",
  component: () => (
    <ProtectedRoute>
      <ResultsPage />
    </ProtectedRoute>
  ),
});

const skillGapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/skill-gap",
  component: () => (
    <ProtectedRoute>
      <SkillGapPage />
    </ProtectedRoute>
  ),
});

const milestonesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/milestones",
  component: () => (
    <ProtectedRoute>
      <MilestonesPage />
    </ProtectedRoute>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  ),
});

const remindersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reminders",
  component: () => (
    <ProtectedRoute>
      <RemindersPage />
    </ProtectedRoute>
  ),
});

const questionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/questions",
  component: () => (
    <ProtectedRoute>
      <QuestionsPage />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  careersRoute,
  careerDetailRoute,
  loginRoute,
  registerRoute,
  dashboardRoute,
  assessmentRoute,
  resultsRoute,
  skillGapRoute,
  milestonesRoute,
  profileRoute,
  remindersRoute,
  questionsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
