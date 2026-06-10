import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import PlatformDashboard from "@/pages/platform/index";
import PlatformTasksPage from "@/pages/platform/tasks";
import MoveOpsPage from "@/pages/platform/moveops";
import DecisionsPage from "@/pages/platform/decisions";
import OpportunitiesPage from "@/pages/platform/opportunities";
import WeeklyReviewsPage from "@/pages/platform/reviews";
import SocialPage from "@/pages/social/index";

function Router() {
  return (
    <Switch>
      {/* Home */}
      <Route path="/" component={HomePage} />
      
      {/* Platform Routes */}
      <Route path="/platform" component={PlatformDashboard} />
      <Route path="/platform/tasks" component={PlatformTasksPage} />
      <Route path="/platform/moveops" component={MoveOpsPage} />
      <Route path="/platform/decisions" component={DecisionsPage} />
      <Route path="/platform/opportunities" component={OpportunitiesPage} />
      <Route path="/platform/reviews" component={WeeklyReviewsPage} />

      {/* Social Routes */}
      <Route path="/social" component={SocialPage} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
