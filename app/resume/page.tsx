// app/resume/page.tsx

import { prisma } from "@/prisma";

export default async function ResumePage() {
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
    <main className="mx-auto max-w-4xl bg-white p-6 text-zinc-900 print:p-0">
      {/* Header */}
      <header className="border-b pb-4 print:border-none">
        <h1 className="text-3xl font-semibold tracking-tight">
          {profile?.fullName ?? "Your Name"}
        </h1>
        <p className="mt-1 text-base text-zinc-700">
          {profile?.headline ?? "Professional Headline"}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-600">
          {profile?.location && <span>{profile.location}</span>}
          {profile?.email && <span>{profile.email}</span>}
          {profile?.phone && <span>{profile.phone}</span>}
          {profile?.website && (
            <a
              href={profile.website}
              className="underline decoration-zinc-400 underline-offset-2 hover:decoration-zinc-800"
            >
              {profile.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          {profile?.links?.map((l) => (
            <a
              key={l.id}
              href={l.url}
              className="underline decoration-zinc-400 underline-offset-2 hover:decoration-zinc-800"
            >
              {l.label}
            </a>
          ))}
        </div>
      </header>

      {/* Summary */}
      {profile?.summary && (
        <section className="mt-6">
          <SectionTitle>Summary</SectionTitle>
          <p className="mt-2 leading-relaxed text-zinc-800">{profile.summary}</p>
        </section>
      )}

      {/* Skills */}
      {profile?.skills?.length ? (
        <section className="mt-6">
          <SectionTitle>Skills</SectionTitle>
          <div className="mt-2 grid gap-2">
            {profile.skills.map((g) => (
              <div key={g.id} className="grid grid-cols-[140px_1fr] gap-4">
                <div className="text-sm font-medium text-zinc-700">{g.title}</div>
                <div className="text-sm text-zinc-800">{g.items}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Education */}
      {profile?.education?.length ? (
        <section className="mt-6">
          <SectionTitle>Education</SectionTitle>
          <div className="mt-3 space-y-3">
            {profile.education.map((ed) => (
              <div key={ed.id} className="grid grid-cols-[1fr_auto] items-baseline gap-2">
                <div>
                  <div className="font-medium">{ed.degree}</div>
                  <div className="text-sm text-zinc-700">{ed.school}</div>
                  {ed.details && <div className="mt-1 text-sm text-zinc-700">{ed.details}</div>}
                </div>
                <div className="text-sm text-zinc-600">
                  {formatDate(ed.startDate)}{ed.startDate ? " – " : ""}{formatDate(ed.endDate)}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Professional Experience */}
      <section className="mt-8">
        <SectionTitle>Professional Experience</SectionTitle>

        <div className="mt-4 space-y-8">
          {experiences.map((exp) => (
            <article key={exp.id} className="space-y-2">
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-2">
                <div>
                  <h3 className="text-lg font-medium">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-zinc-700">
                    {exp.company}
                    {exp.location ? ` • ${exp.location}` : ""}
                  </p>
                </div>
                <p className="text-sm text-zinc-600">
                  {formatDate(exp.startDate)} – {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                </p>
              </div>

              {exp.summary && (
                <p className="text-sm leading-relaxed text-zinc-800">{exp.summary}</p>
              )}

              {exp.bullets.length > 0 && (
                <ul className="mt-2 list-disc space-y-2 pl-6">
                  {exp.bullets.map((b) => (
                    <li key={b.id} className="text-sm leading-relaxed text-zinc-900">
                      {b.content}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Print footer */}
      <style>{printCSS}</style>
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold tracking-tight">{children}</h2>;
}

function formatDate(d?: Date | null) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short" });
  } catch {
    return "";
  }
}

const printCSS = `
@media print {
  @page { margin: 0.5in; }
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  a { text-decoration: none; color: inherit; }
  header { border-bottom: none !important; }
}
`;
