// app/resume/builder/page.tsx
import { getExperience } from "@/app/actions/resume";
import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma";
import Link from "next/link";
import ExperienceCard from "../exp-card";

export default async function ResumeBuilderPage() {
  const experiences = await getExperience();
    if (!experiences) { 
        return null;
    }

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Resume Builder</h1>
        <Link href="/resume/builder/new">
          <Button variant="default">New Experience</Button>
        </Link>
      </div>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}

        {experiences.length === 0 && (
          <p className="text-sm text-muted-foreground">No experiences yet. Create one to begin.</p>
        )}
      </div>
    </div>
  );
}
