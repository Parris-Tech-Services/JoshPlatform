import { PlatformLayout } from "@/components/PlatformLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlatformTasks, usePlatformDecisionCards, platformActions } from "@/features/platform";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dueDate: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

export default function PlatformTasksPage() {
  const tasks = usePlatformTasks();
  const decisions = usePlatformDecisionCards();
  const [creatingTaskFrom, setCreatingTaskFrom] = useState<number | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await platformActions.tasks.add(values);
    form.reset();
  };

  const createTaskFromDecision = async (decision: any) => {
    setCreatingTaskFrom(decision.id);
    try {
      const taskId = await platformActions.tasks.add({
        title: `Decide: ${decision.question}`,
        dueDate: decision.dueBy,
        status: "todo",
        linkedDecisionId: decision.id,
      });
      await platformActions.decisions.update(decision.id, {
        status: "decided",
        notes: `Task created: #${taskId}`,
      });
    } finally {
      setCreatingTaskFrom(null);
    }
  };

  const openDecisions = decisions.filter(d => d.status === 'open').sort((a, b) => (a.dueBy || '') > (b.dueBy || '') ? 1 : -1);
  const sortedTasks = [...tasks].sort((a, b) => {
    const statusOrder = { 'in-progress': 0, todo: 1, done: 2 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const dueSoonTasks = sortedTasks.filter(t => t.status !== 'done').slice(0, 3);
  const dueSoonDecisions = openDecisions.slice(0, 3);

  return (
    <PlatformLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Platform Tasks</h2>

        {/* Today Focus */}
        <Card className="bg-blue-50 dark:bg-blue-950">
          <CardHeader>
            <CardTitle className="text-lg">Today Focus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Next Due Tasks</h4>
              <ul className="space-y-1">
                {dueSoonTasks.map(t => (
                  <li key={t.id} className="text-sm">
                    <span className="font-medium">{t.title}</span>
                    {t.dueDate && <span className="text-xs text-muted-foreground ml-2">(Due: {t.dueDate})</span>}
                  </li>
                ))}
                {dueSoonTasks.length === 0 && <li className="text-sm text-muted-foreground">No tasks due soon.</li>}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Open Decisions</h4>
              <ul className="space-y-1">
                {dueSoonDecisions.map(d => (
                  <li key={d.id} className="text-sm">
                    <span className="font-medium">{d.question}</span>
                    {d.dueBy && <span className="text-xs text-muted-foreground ml-2">(Due: {d.dueBy})</span>}
                  </li>
                ))}
                {dueSoonDecisions.length === 0 && <li className="text-sm text-muted-foreground">No open decisions.</li>}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Create Task Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add Task</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 items-start">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormControl>
                        <Input placeholder="Task title..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-40">
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-32">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="todo">Todo</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Add Task</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Platform Tasks ({sortedTasks.length})</h3>
          <div className="space-y-2">
            {sortedTasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4 flex-1">
                    <Select
                      value={task.status}
                      onValueChange={(val: any) => platformActions.tasks.setStatus(task.id!, val)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">Todo</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex-1">
                      <div className={task.status === 'done' ? 'line-through text-muted-foreground' : 'font-medium'}>
                        {task.title}
                      </div>
                      {task.dueDate && <div className="text-xs text-muted-foreground">Due: {task.dueDate}</div>}
                      {task.linkedDecisionId && <div className="text-xs text-blue-600 dark:text-blue-400">Linked to Decision</div>}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => platformActions.tasks.delete(task.id!)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            {sortedTasks.length === 0 && (
              <Card>
                <CardContent className="p-4 text-center text-muted-foreground">
                  No tasks yet. Create one above or convert a decision below.
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Open Decisions */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Open Decisions ({openDecisions.length})</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {openDecisions.map((d) => (
              <Card key={d.id}>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">{d.question}</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => createTaskFromDecision(d)}
                      disabled={creatingTaskFrom === d.id}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Create Task
                    </Button>
                  </div>
                  {d.dueBy && <div className="text-xs text-muted-foreground">Due: {d.dueBy}</div>}
                  {d.notes && <div className="text-xs text-muted-foreground italic">{d.notes}</div>}
                </CardContent>
              </Card>
            ))}
            {openDecisions.length === 0 && (
              <Card className="col-span-2">
                <CardContent className="p-4 text-center text-muted-foreground">
                  No open decisions. All clear!
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
}
