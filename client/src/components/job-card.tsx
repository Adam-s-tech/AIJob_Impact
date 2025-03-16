import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Job } from "@shared/schema";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <a className="block hover:no-underline">
        <Card className="h-full hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{job.title}</CardTitle>
              <Badge variant="secondary">Impact Level {job.impactLevel}</Badge>
            </div>
            <CardDescription className="line-clamp-2">{job.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">{job.aiImpact}</p>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
