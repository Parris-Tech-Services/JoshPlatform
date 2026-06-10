import { PlatformLayout } from "@/components/PlatformLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { usePlatformWeeklyReviews, platformActions } from "@/features/platform";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  weekStart: z.string().min(1, "Week Start is required"),
  wins: z.string().optional(),
  drains: z.string().optional(),
  lifeGivers: z.string().optional(),
  top3: z.string().optional(),
  oneExperiment: z.string().optional(),
});

export default function WeeklyReviewsPage() {
  const reviews = usePlatformWeeklyReviews();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weekStart: new Date().toISOString().split('T')[0],
      wins: "",
      drains: "",
      lifeGivers: "",
      top3: "",
      oneExperiment: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await platformActions.reviews.add(values);
    form.reset({
        ...values,
        wins: "", drains: "", lifeGivers: "", top3: "", oneExperiment: ""
    });
  };

  return (
    <PlatformLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Weekly Reviews</h2>

        <Card>
          <CardHeader>
            <CardTitle>Current Review</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="weekStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Week Starting</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="wins"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Wins</FormLabel>
                        <FormControl>
                            <Textarea placeholder="What went well?" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="drains"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Drains</FormLabel>
                        <FormControl>
                            <Textarea placeholder="What drained you?" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <FormField
                  control={form.control}
                  name="top3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Top 3 Priorities for Next Week</FormLabel>
                      <FormControl>
                        <Textarea placeholder="1. ...&#10;2. ...&#10;3. ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit">Save Review</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
            <h3 className="text-xl font-semibold">History</h3>
            {reviews.map((review) => (
                <Card key={review.id}>
                    <CardHeader>
                        <CardTitle>Week of {review.weekStart}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm font-semibold text-muted-foreground">Wins</div>
                                <p className="whitespace-pre-wrap">{review.wins || '-'}</p>
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-muted-foreground">Drains</div>
                                <p className="whitespace-pre-wrap">{review.drains || '-'}</p>
                            </div>
                        </div>
                        <div>
                             <div className="text-sm font-semibold text-muted-foreground">Top 3</div>
                             <p className="whitespace-pre-wrap">{review.top3 || '-'}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </PlatformLayout>
  );
}
