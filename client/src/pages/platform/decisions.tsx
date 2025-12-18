import { PlatformLayout } from "@/components/PlatformLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { usePlatformDecisionCards, platformActions } from "@/features/platform";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";

const formSchema = z.object({
  question: z.string().min(1, "Question is required"),
  dueBy: z.string().optional(),
  status: z.enum(["open", "parked", "decided"]),
});

export default function DecisionsPage() {
  const decisions = usePlatformDecisionCards();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      status: "open",
      dueBy: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await platformActions.decisions.add(values);
    form.reset();
  };

  const sortedDecisions = [...decisions].sort((a, b) => {
    const statusOrder = { open: 0, parked: 1, decided: 2 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    if (a.dueBy && b.dueBy) return a.dueBy.localeCompare(b.dueBy);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <PlatformLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Decision Cards</h2>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 items-start">
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormControl>
                        <Input placeholder="What do you need to decide?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueBy"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-40">
                      <FormControl>
                        <Input type="date" placeholder="Due By" {...field} />
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
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="parked">Parked</SelectItem>
                          <SelectItem value="decided">Decided</SelectItem>
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

        <div className="grid gap-4 md:grid-cols-2">
          {sortedDecisions.map((d) => (
            <Card key={d.id}>
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{d.question}</h3>
                  <Button variant="ghost" size="icon" onClick={() => platformActions.decisions.delete(d.id!)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                   <Select
                    value={d.status}
                    onValueChange={(val: any) => platformActions.decisions.setStatus(d.id!, val)}
                  >
                    <SelectTrigger className="w-32 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="parked">Parked</SelectItem>
                      <SelectItem value="decided">Decided</SelectItem>
                    </SelectContent>
                  </Select>
                  {d.dueBy && <span className="text-xs text-muted-foreground">Due: {d.dueBy}</span>}
                </div>

                <div className="space-y-2">
                    <Input 
                        placeholder="Decision..." 
                        defaultValue={d.decision || ''} 
                        className="text-sm"
                        onBlur={(e) => platformActions.decisions.update(d.id!, { decision: e.target.value })}
                    />
                    <Textarea 
                        placeholder="Notes..." 
                        defaultValue={d.notes || ''} 
                        className="text-xs min-h-[60px]"
                        onBlur={(e) => platformActions.decisions.update(d.id!, { notes: e.target.value })}
                    />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PlatformLayout>
  );
}
