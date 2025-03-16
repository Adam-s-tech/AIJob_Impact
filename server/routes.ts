import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/jobs", async (_req, res) => {
    const jobs = await storage.getJobs();
    res.json(jobs);
  });

  app.get("/api/jobs/search", async (req, res) => {
    const query = req.query.q as string;
    if (!query) {
      return res.json(await storage.getJobs());
    }
    const jobs = await storage.searchJobs(query);
    res.json(jobs);
  });

  app.get("/api/jobs/:id", async (req, res) => {
    const job = await storage.getJob(parseInt(req.params.id));
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  });

  app.get("/api/jobs/:id/tasks", async (req, res) => {
    const tasks = await storage.getTasksByJobId(parseInt(req.params.id));
    res.json(tasks);
  });

  app.get("/api/jobs/:id/tools", async (req, res) => {
    const tools = await storage.getToolsByJobId(parseInt(req.params.id));
    res.json(tools);
  });

  const httpServer = createServer(app);
  return httpServer;
}