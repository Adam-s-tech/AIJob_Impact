import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Search from "@/components/search";
import JobCard from "@/components/job-card";
import JobFilters from "@/components/job-filters";
import { type Job } from "@shared/schema";

export default function Jobs() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split("?")[1] || "");
  const initialQuery = params.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [impactLevel, setImpactLevel] = useState<number | null>(null);
  const [domain, setDomain] = useState("all");

  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs/search", searchQuery, impactLevel, domain],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append("q", searchQuery);
      if (impactLevel) params.append("impact", impactLevel.toString());
      if (domain && domain !== "all") params.append("domain", domain);

      const url = `/api/jobs/search${params.toString() ? `?${params.toString()}` : ""}`;
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

      <JobFilters
        impactLevel={impactLevel}
        domain={domain}
        onImpactLevelChange={setImpactLevel}
        onDomainChange={setDomain}
      />

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