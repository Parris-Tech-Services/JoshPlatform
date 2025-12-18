import { PlatformLayout } from "@/components/PlatformLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePlatformMoveOps, usePlatformDecisionCards, usePlatformOpportunities, platformActions } from "@/features/platform";

export default function PlatformDashboard() {
  const moveOps = usePlatformMoveOps();
  const decisions = usePlatformDecisionCards();
  const opportunities = usePlatformOpportunities();

  const openDecisions = decisions.filter(d => d.status === 'open');
  const nextMoveOps = moveOps.filter(op => op.status !== 'done').sort((a, b) => (a.dueDate || '') > (b.dueDate || '') ? 1 : -1).slice(0, 5);

  return (
    <PlatformLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <Button onClick={() => platformActions.seed()}>Seed Demo Data</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MoveOps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{moveOps.length}</div>
              <p className="text-xs text-muted-foreground">
                {moveOps.filter(op => op.status === 'done').length} completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Decisions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{decisions.length}</div>
              <p className="text-xs text-muted-foreground">
                {openDecisions.length} open
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{opportunities.length}</div>
              <p className="text-xs text-muted-foreground">
                {opportunities.filter(o => o.stage === 'committed').length} committed
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Today Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Open Decisions</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {openDecisions.slice(0, 3).map(d => (
                      <li key={d.id} className="text-sm">{d.question} <span className="text-xs text-muted-foreground">(Due: {d.dueBy || 'None'})</span></li>
                    ))}
                    {openDecisions.length === 0 && <li className="text-sm text-muted-foreground">No open decisions.</li>}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Upcoming MoveOps</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {nextMoveOps.map(op => (
                      <li key={op.id} className="text-sm">{op.title} <span className="text-xs text-muted-foreground">({op.dueDate || 'No date'})</span></li>
                    ))}
                    {nextMoveOps.length === 0 && <li className="text-sm text-muted-foreground">All caught up!</li>}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PlatformLayout>
  );
}
