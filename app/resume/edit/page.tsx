// app/resume/edit/page.tsx

import { prisma } from "@/prisma";
import ProfileEditor from "./profile-editor";
import LinksEditor from "./links-editor";
import SkillsEditor from "./skills-editor";
import EducationEditor from "./education-editor";
import ExperienceSummary from "./experience-summary";


export default async function ResumeEditPage() {
  const profile = await prisma.resumeProfile.findFirst({
    include: {
      links: { orderBy: { order: "asc" } },
      skills: { orderBy: { order: "asc" } },
      education: { orderBy: { order: "asc" } },
    },
  });

  const experiences = await prisma.experienceSection.findMany({
    orderBy: { order: "asc" },
    include: { bullets: { orderBy: { order: "asc" } } },
  });

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Resume — Edit</h1>

      <ProfileEditor initial={profile ?? null} />

      <div className="grid gap-6 md:grid-cols-2">
        <LinksEditor profileId={profile?.id ?? ""} initial={profile?.links ?? []} />
        <SkillsEditor profileId={profile?.id ?? ""} initial={profile?.skills ?? []} />
      </div>

      <EducationEditor profileId={profile?.id ?? ""} initial={profile?.education ?? []} />

      <ExperienceSummary experiences={experiences} />
    </main>
  );
}
