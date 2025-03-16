import { type Job, type Tool, type InsertJob, type InsertTool } from "@shared/schema";

export interface IStorage {
  getJobs(): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  getToolsByJobId(jobId: number): Promise<Tool[]>;
  searchJobs(query: string): Promise<Job[]>;
}

export class MemStorage implements IStorage {
  private jobs: Map<number, Job>;
  private tools: Map<number, Tool[]>;
  private currentJobId: number;
  private currentToolId: number;

  constructor() {
    this.jobs = new Map();
    this.tools = new Map();
    this.currentJobId = 1;
    this.currentToolId = 1;
    this.initializeData();
  }

  private initializeData() {
    // Sample data
    const jobs: InsertJob[] = [
      {
        title: "Software Developer",
        description: "Develops and maintains software applications",
        impactLevel: 4,
        aiImpact: "AI is transforming software development through code generation, testing automation, and intelligent debugging tools.",
      },
      {
        title: "Digital Marketing Manager",
        description: "Manages digital marketing campaigns and strategies",
        impactLevel: 3,
        aiImpact: "AI tools are automating content creation, analytics, and campaign optimization.",
      }
    ];

    const tools: InsertTool[] = [
      {
        name: "GitHub Copilot",
        description: "AI-powered code completion tool",
        url: "https://github.com/features/copilot",
        jobId: 1,
      },
      {
        name: "ChatGPT",
        description: "Large language model for code assistance",
        url: "https://chat.openai.com",
        jobId: 1,
      },
      {
        name: "Copy.ai",
        description: "AI content generation platform",
        url: "https://www.copy.ai",
        jobId: 2,
      }
    ];

    jobs.forEach(job => {
      const id = this.currentJobId++;
      this.jobs.set(id, { ...job, id });
    });

    tools.forEach(tool => {
      const id = this.currentToolId++;
      const tool_list = this.tools.get(tool.jobId) || [];
      tool_list.push({ ...tool, id });
      this.tools.set(tool.jobId, tool_list);
    });
  }

  async getJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getToolsByJobId(jobId: number): Promise<Tool[]> {
    return this.tools.get(jobId) || [];
  }

  async searchJobs(query: string): Promise<Job[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.jobs.values()).filter(job => 
      job.title.toLowerCase().includes(lowercaseQuery) ||
      job.description.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const storage = new MemStorage();
