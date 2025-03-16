import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Search from "@/components/search";
import JobCard from "@/components/job-card";
import { type Job } from "@shared/schema";

export default function Jobs() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split("?")[1] || "");
  const initialQuery = params.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs/search", searchQuery],
    queryFn: async () => {
      const url = `/api/jobs/search${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch jobs");
      return response.json();
    },
  });

  return (
    <div>
      <div className="max-w-xl mx-auto mb-8">
        <Search value={searchQuery} onChange={setSearchQuery} />
      </div>

      {isLoading ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {jobs?.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}