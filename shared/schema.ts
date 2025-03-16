import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  impactLevel: integer("impact_level").notNull(), // 1-5 scale
  aiImpact: text("ai_impact").notNull(),
  imageUrl: text("image_url").notNull(),
  domain: text("domain").notNull(), // Nouveau champ pour le domaine d'activité
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  jobId: integer("job_id").notNull(),
});

export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  jobId: integer("job_id").notNull(),
});

export const insertJobSchema = createInsertSchema(jobs).pick({
  title: true,
  description: true,
  impactLevel: true,
  aiImpact: true,
  imageUrl: true,
  domain: true,
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  name: true,
  description: true,
  jobId: true,
});

export const insertToolSchema = createInsertSchema(tools).pick({
  name: true,
  description: true,
  url: true,
  jobId: true,
});

export type Job = typeof jobs.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type Tool = typeof tools.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type InsertTool = z.infer<typeof insertToolSchema>;

// Constantes pour les domaines d'activité
export const DOMAINS = [
  "Tech",
  "Santé",
  "Finance",
  "Marketing",
  "Éducation",
  "Juridique",
  "RH",
  "Industrie",
] as const;

export type Domain = typeof DOMAINS[number];