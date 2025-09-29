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

export const linkSchema = z.object({
  id: z.string().cuid().optional(),
  label: z.string().min(2).max(60),
  url: z.string().url(),
  order: z.number().int().nonnegative().default(0),
});

export const skillGroupSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string().min(2).max(120),
  items: z.string().min(2), // comma-separated (e.g., "ACMG, ClinVar, LOF/GOF…")
  order: z.number().int().nonnegative().default(0),
});

export const educationSchema = z.object({
  id: z.string().cuid().optional(),
  school: z.string().min(2),
  degree: z.string().min(2),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  details: z.string().optional().or(z.literal("")),
  order: z.number().int().nonnegative().default(0),
});

export const resumeProfileUpsertSchema = z.object({
  id: z.string().cuid().optional(),
  fullName: z.string().min(2),
  headline: z.string().min(2),
  location: z.string().optional().or(z.literal("")),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  summary: z.string().optional(),
  // For initial bootstrap you could post arrays, but typical editing will manage these separately.
});

export type ResumeProfileUpsertInput = z.infer<typeof resumeProfileUpsertSchema>;