// app/resume/builder/new/page.tsx

import ExperienceForm from "../../exp-form";

export default function NewExperiencePage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-xl font-semibold">New Experience</h1>
      <ExperienceForm />
    </div>
  );
}
