import { PlatformLayout } from "@/components/PlatformLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { usePlatformOpportunities, platformActions } from "@/features/platform";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  stage: z.enum(['seed', 'shaped', 'experiment', 'validated', 'committed', 'parked']),
  expectedValuePerMonth: z.coerce.number().optional(),
});

export default function OpportunitiesPage() {
  const opportunities = usePlatformOpportunities();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      stage: "seed",
      expectedValuePerMonth: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await platformActions.opportunities.add(values);
    form.reset();
  };

  const sortedOps = [...opportunities].sort((a, b) => {
    const stageOrder = { committed: 0, validated: 1, experiment: 2, shaped: 3, seed: 4, parked: 5 };
    if (stageOrder[a.stage] !== stageOrder[b.stage]) {
      return stageOrder[a.stage] - stageOrder[b.stage];
    }
    if ((a.expectedValuePerMonth || 0) !== (b.expectedValuePerMonth || 0)) {
        return (b.expectedValuePerMonth || 0) - (a.expectedValuePerMonth || 0);
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <PlatformLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Opportunities</h2>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 items-start">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormControl>
                        <Input placeholder="Opportunity Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="expectedValuePerMonth"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-32">
                      <FormControl>
                        <Input type="number" placeholder="Value/mo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stage"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-40">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="seed">Seed</SelectItem>
                          <SelectItem value="shaped">Shaped</SelectItem>
                          <SelectItem value="experiment">Experiment</SelectItem>
                          <SelectItem value="validated">Validated</SelectItem>
                          <SelectItem value="committed">Committed</SelectItem>
                          <SelectItem value="parked">Parked</SelectItem>
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
                    value={op.stage}
                    onValueChange={(val: any) => platformActions.opportunities.setStage(op.id!, val)}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="seed">Seed</SelectItem>
                        <SelectItem value="shaped">Shaped</SelectItem>
                        <SelectItem value="experiment">Experiment</SelectItem>
                        <SelectItem value="validated">Validated</SelectItem>
                        <SelectItem value="committed">Committed</SelectItem>
                        <SelectItem value="parked">Parked</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex-1">
                    <div className="font-medium">{op.name}</div>
                    {op.expectedValuePerMonth && op.expectedValuePerMonth > 0 ? (
                        <div className="text-xs text-muted-foreground">${op.expectedValuePerMonth}/mo</div>
                    ) : null}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => platformActions.opportunities.delete(op.id!)}>
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
