import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import PlatformDashboard from "@/pages/platform/index";
import MoveOpsPage from "@/pages/platform/moveops";
import DecisionsPage from "@/pages/platform/decisions";
import OpportunitiesPage from "@/pages/platform/opportunities";
import WeeklyReviewsPage from "@/pages/platform/reviews";

function Router() {
  return (
    <Switch>
      {/* Platform Routes */}
      <Route path="/platform" component={PlatformDashboard} />
      <Route path="/platform/moveops" component={MoveOpsPage} />
      <Route path="/platform/decisions" component={DecisionsPage} />
      <Route path="/platform/opportunities" component={OpportunitiesPage} />
      <Route path="/platform/reviews" component={WeeklyReviewsPage} />
      
      {/* Default Routes */}
      <Route path="/" component={PlatformDashboard} /> {/* For now, redirect root to platform for easy access */}
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
