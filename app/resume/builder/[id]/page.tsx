
import { prisma } from "@/prisma";
import { notFound } from "next/navigation";
import ExperienceForm from "../../exp-form";

export default async function EditExperiencePage({ params }: { params: { id: string } }) {
  const exp = await prisma.experienceSection.findUnique({ where: { id: params.id } });
  if (!exp) return notFound();

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-xl font-semibold">Edit Experience</h1>
      <ExperienceForm initial={exp} />
    </div>
  );
}
