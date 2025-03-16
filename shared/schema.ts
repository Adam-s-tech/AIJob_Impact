import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  impactLevel: integer("impact_level").notNull(), // 1-5 scale
  aiImpact: text("ai_impact").notNull(),
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
});

export const insertToolSchema = createInsertSchema(tools).pick({
  name: true,
  description: true,
  url: true,
  jobId: true,
});

export type Job = typeof jobs.$inferSelect;
export type Tool = typeof tools.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type InsertTool = z.infer<typeof insertToolSchema>;
