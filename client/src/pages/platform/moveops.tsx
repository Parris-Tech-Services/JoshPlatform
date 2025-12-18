import { PlatformLayout } from "@/components/PlatformLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { usePlatformMoveOps, platformActions } from "@/features/platform";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dueDate: z.string().optional(),
  status: z.enum(["todo", "doing", "done"]),
});

export default function MoveOpsPage() {
  const moveOps = usePlatformMoveOps();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      status: "todo",
      dueDate: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await platformActions.moveOps.add(values);
    form.reset();
  };

  const sortedOps = [...moveOps].sort((a, b) => {
    const statusOrder = { doing: 0, todo: 1, done: 2 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <PlatformLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">MoveOps</h2>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 items-start">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormControl>
                        <Input placeholder="New task..." {...field} />
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
                          <SelectItem value="doing">Doing</SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Add</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-2">
          {sortedOps.map((op) => (
            <Card key={op.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4 flex-1">
                  <Select
                    value={op.status}
                    onValueChange={(val: any) => platformActions.moveOps.setStatus(op.id!, val)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="doing">Doing</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex-1">
                    <div className={op.status === 'done' ? 'line-through text-muted-foreground' : 'font-medium'}>
                      {op.title}
                    </div>
                    {op.dueDate && <div className="text-xs text-muted-foreground">Due: {op.dueDate}</div>}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => platformActions.moveOps.delete(op.id!)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PlatformLayout>
  );
}
