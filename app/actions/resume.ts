// app/actions/experience.ts
"use server";
import { revalidatePath } from "next/cache";
import { parseISO } from "date-fns";
import { experienceUpsertSchema, bulletCreateSchema, bulletUpdateSchema, bulletReorderSchema, resumeProfileUpsertSchema } from "@/lib/resumeschema";
import { prisma } from "@/prisma";
import { z } from "zod";
/** -------- Profile -------- */
export async function upsertResumeProfile(input: unknown) {
  const data = resumeProfileUpsertSchema.parse(input);
  const row = data.id
    ? await prisma.resumeProfile.update({ where: { id: data.id }, data })
    : await prisma.resumeProfile.create({ data });
  revalidatePath("/resume");
  revalidatePath("/resume/edit");
  return row;
}

/** -------- Links -------- */
const linkUpsertSchema = z.object({
  id: z.string().cuid().optional(),
  profileId: z.string().cuid(),
  label: z.string().min(2).max(60),
  url: z.string().url(),
});
const idSchema = z.object({ id: z.string().cuid() });
const reorderSchema = z.object({
  profileId: z.string().cuid(),
  orderedIds: z.array(z.string().cuid()).min(1),
});

export async function upsertLink(input: unknown) {
  const data = linkUpsertSchema.parse(input);
  let row;
  if (data.id) {
    row = await prisma.link.update({ where: { id: data.id }, data: { label: data.label, url: data.url } });
  } else {
    const max = await prisma.link.aggregate({ where: { profileId: data.profileId }, _max: { order: true } });
    row = await prisma.link.create({
      data: { profileId: data.profileId, label: data.label, url: data.url, order: (max._max.order ?? -1) + 1 },
    });
  }
  revalidatePath("/resume/edit");
  revalidatePath("/resume");
  return row;
}

export async function deleteLink(input: unknown) {
  const { id } = idSchema.parse(input);
  await prisma.link.delete({ where: { id } });
  revalidatePath("/resume/edit"); revalidatePath("/resume");
}

export async function reorderLinks(input: unknown) {
  const { profileId, orderedIds } = reorderSchema.parse(input);
  await prisma.$transaction(orderedIds.map((id, i) => prisma.link.update({ where: { id }, data: { order: i } })));
  revalidatePath("/resume/edit"); revalidatePath("/resume");
}

/** -------- Skill Groups -------- */
const skillUpsertSchema = z.object({
  id: z.string().cuid().optional(),
  profileId: z.string().cuid(),
  title: z.string().min(2).max(120),
  items: z.string().min(2),
});

export async function upsertSkillGroup(input: unknown) {
  const data = skillUpsertSchema.parse(input);
  let row;
  if (data.id) {
    row = await prisma.skillGroup.update({
      where: { id: data.id }, data: { title: data.title, items: data.items },
    });
  } else {
    const max = await prisma.skillGroup.aggregate({ where: { profileId: data.profileId }, _max: { order: true } });
    row = await prisma.skillGroup.create({
      data: { profileId: data.profileId, title: data.title, items: data.items, order: (max._max.order ?? -1) + 1 },
    });
  }
  revalidatePath("/resume/edit"); revalidatePath("/resume");
  return row;
}

export async function deleteSkillGroup(input: unknown) {
  const { id } = idSchema.parse(input);
  await prisma.skillGroup.delete({ where: { id } });
  revalidatePath("/resume/edit"); revalidatePath("/resume");
}

export async function reorderSkillGroups(input: unknown) {
  const { profileId, orderedIds } = reorderSchema.parse(input);
  await prisma.$transaction(orderedIds.map((id, i) => prisma.skillGroup.update({ where: { id }, data: { order: i } })));
  revalidatePath("/resume/edit"); revalidatePath("/resume");
}

/** -------- Education -------- */
const eduUpsertSchema = z.object({
  id: z.string().cuid().optional(),
  profileId: z.string().cuid(),
  school: z.string().min(2),
  degree: z.string().min(2),
  startDate: z.string().optional().or(z.literal("")),
  endDate: z.string().optional().or(z.literal("")),
  details: z.string().optional().or(z.literal("")),
});

function dateOrNull(s?: string) {
  if (!s) return null;
  try { return new Date(s); } catch { return null; }
}

export async function upsertEducation(input: unknown) {
  const data = eduUpsertSchema.parse(input);
  const payload = {
    school: data.school,
    degree: data.degree,
    startDate: dateOrNull(data.startDate || undefined),
    endDate: dateOrNull(data.endDate || undefined),
    details: data.details || null,
  };

  let row;
  if (data.id) {
    row = await prisma.education.update({ where: { id: data.id }, data: payload });
  } else {
    const max = await prisma.education.aggregate({ where: { profileId: data.profileId }, _max: { order: true } });
    row = await prisma.education.create({
      data: { ...payload, profileId: data.profileId, order: (max._max.order ?? -1) + 1 },
    });
  }
  revalidatePath("/resume/edit"); revalidatePath("/resume");
  return row;
}

export async function deleteEducation(input: unknown) {
  const { id } = idSchema.parse(input);
  await prisma.education.delete({ where: { id } });
  revalidatePath("/resume/edit"); revalidatePath("/resume");
}

export async function reorderEducation(input: unknown) {
  const { profileId, orderedIds } = reorderSchema.parse(input);
  await prisma.$transaction(orderedIds.map((id, i) => prisma.education.update({ where: { id }, data: { order: i } })));
  revalidatePath("/resume/edit"); revalidatePath("/resume");
}


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
