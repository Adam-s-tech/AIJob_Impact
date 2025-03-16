import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { type Job, type Tool, type Task } from "@shared/schema";
import { ExternalLink, CheckCircle2 } from "lucide-react";

export default function JobPage() {
  const { id } = useParams();

  const { data: job, isLoading: isLoadingJob } = useQuery<Job>({
    queryKey: [`/api/jobs/${id}`],
  });

  const { data: tasks, isLoading: isLoadingTasks } = useQuery<Task[]>({
    queryKey: [`/api/jobs/${id}/tasks`],
  });

  const { data: tools, isLoading: isLoadingTools } = useQuery<Tool[]>({
    queryKey: [`/api/jobs/${id}/tools`],
  });

  if (isLoadingJob || isLoadingTasks || isLoadingTools) {
    return <div className="animate-pulse h-96 bg-muted rounded-lg" />;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <Badge variant="secondary" className="text-lg">
            Impact Level {job.impactLevel}
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground mb-4">{job.description}</p>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Impact de l'IA</h2>
            <p>{job.aiImpact}</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tâches Principales</h2>
        <div className="grid gap-4">
          {tasks?.map((task) => (
            <Card key={task.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-violet-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold">{task.name}</h3>
                    <p className="text-muted-foreground">{task.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-8" />

      <div>
        <h2 className="text-2xl font-bold mb-4">Outils IA Pertinents</h2>
        <div className="grid gap-4">
          {tools?.map((tool) => (
            <Card key={tool.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{tool.name}</h3>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </div>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-600 hover:text-violet-700"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}