// lib/schemas/resume.ts
import { z } from "zod";

export const experienceUpsertSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().min(2).max(120),
  company: z.string().min(2).max(120),
  location: z.string().max(120).optional().or(z.literal("")),
  startDate: z.string().datetime().or(z.string().min(4)), // allow "YYYY-MM" -> normalize in action
  endDate: z.string().datetime().optional().or(z.string().min(4)).or(z.literal("")),
  isCurrent: z.boolean().default(false),
  summary: z.string().max(2000).optional().or(z.literal("")),
  order: z.number().int().nonnegative().default(0),
});

export const bulletCreateSchema = z.object({
  experienceId: z.string().cuid(),
  content: z.string().min(2).max(2000),
});

export const bulletUpdateSchema = z.object({
  id: z.string().cuid(),
  content: z.string().min(2).max(2000),
});

export const bulletReorderSchema = z.object({
  experienceId: z.string().cuid(),
  orderedIds: z.array(z.string().cuid()).min(1),
});

export type ExperienceUpsertInput = z.infer<typeof experienceUpsertSchema>;
