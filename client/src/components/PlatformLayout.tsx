import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PlatformLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const tabs = [
    { name: "Overview", path: "/platform" },
    { name: "Tasks", path: "/platform/tasks" },
    { name: "MoveOps", path: "/platform/moveops" },
    { name: "Decisions", path: "/platform/decisions" },
    { name: "Opportunities", path: "/platform/opportunities" },
    { name: "Reviews", path: "/platform/reviews" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">JoshPlatform</h1>
            <Link href="/">
              <Button variant="ghost" size="sm">Back to Hub</Button>
            </Link>
          </div>
          <nav className="flex space-x-2 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <Link key={tab.path} href={tab.path}>
                <a
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                    location === tab.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  {tab.name}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
