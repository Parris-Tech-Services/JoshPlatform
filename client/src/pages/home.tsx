import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">JoshHub</h1>
          <p className="text-lg text-muted-foreground">Personal operating system for Josh</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/platform">
            <a className="block">
              <Card className="hover-elevate">
                <CardHeader>
                  <CardTitle>Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Manage tasks, decisions, opportunities, and weekly reviews for the move and more.</p>
                </CardContent>
              </Card>
            </a>
          </Link>

          <Card className="opacity-50">
            <CardHeader>
              <CardTitle>More Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Additional modules coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
