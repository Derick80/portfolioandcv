// app/actions/experience.ts
"use server";

import { revalidatePath } from "next/cache";
import { parseISO } from "date-fns";
import { experienceUpsertSchema, bulletCreateSchema, bulletUpdateSchema, bulletReorderSchema } from "@/lib/resumeschema";
import { prisma } from "@/prisma";



export const getExperience =async()=>{
    const experiences = await prisma.experienceSection.findMany({
    orderBy: { order: "asc" },
    include: { bullets: { orderBy: { order: "asc" } } },
  });
 
  if (!experiences) {
    return [];
  }
    return experiences;
}
function normalizeDateMaybe(input?: string | null) {
  if (!input) return null;
  // Accept "YYYY" or "YYYY-MM" and coerce to first day of period
  if (/^\d{4}$/.test(input)) return new Date(`${input}-01-01T00:00:00.000Z`);
  if (/^\d{4}-\d{2}$/.test(input)) return new Date(`${input}-01T00:00:00.000Z`);
  try { return parseISO(input); } catch { return null; }
}

export async function upsertExperience(form: unknown) {
  const parsed = experienceUpsertSchema.parse(form);

  const startDate = normalizeDateMaybe(parsed.startDate) ?? new Date();
  const endDate = parsed.isCurrent ? null : normalizeDateMaybe(parsed.endDate ?? null);

  const data = {
    title: parsed.title,
    company: parsed.company,
    location: parsed.location || null,
    startDate,
    endDate,
    isCurrent: parsed.isCurrent,
    summary: parsed.summary || null,
    order: parsed.order,
    
  };

  const exp = parsed.id
    ? await prisma.experienceSection.update({ where: { id: parsed.id }, data })
    : await prisma.experienceSection.create({ data });

  revalidatePath("/resume/builder");
  return exp;
}

export async function deleteExperience(id: string) {
  await prisma.experienceSection.delete({ where: { id } });
  revalidatePath("/resume/builder");
}

export async function createBullet(input: unknown) {
  const { experienceId, content } = bulletCreateSchema.parse(input);

  const max = await prisma.bullet.aggregate({
    where: { experienceId },
    _max: { order: true },
  });

  const b = await prisma.bullet.create({
    data: { experienceId, content, order: (max._max.order ?? -1) + 1 },
  });

  revalidatePath("/resume/builder");
  return b;
}

export async function updateBullet(input: unknown) {
  const { id, content } = bulletUpdateSchema.parse(input);
  const b = await prisma.bullet.update({ where: { id }, data: { content } });
  revalidatePath("/resume/builder");
  return b;
}

export async function deleteBullet(id: string) {
  await prisma.bullet.delete({ where: { id } });
  revalidatePath("/resume/builder");
}

export async function reorderBullets(input: unknown) {
  const { experienceId, orderedIds } = bulletReorderSchema.parse(input);

  // Batch reindex
  await prisma.$transaction(
    orderedIds.map((id, idx) =>
      prisma.bullet.update({ where: { id }, data: { order: idx } })
    )
  );

  revalidatePath("/resume/builder");
  return { ok: true };
}
