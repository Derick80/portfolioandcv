
import { cvData } from "@/lib/cv_data";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function CVPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-950 shadow-lg my-8 rounded-lg print:shadow-none print:my-0 print:py-0">
      {/* Header */}
      <header className="mb-8 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
          Derick Hoskinson PhD
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          {cvData.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${cvData.email}`} className="hover:underline">
                {cvData.email}
              </a>
            </div>
          )}
          {cvData.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{cvData.phone}</span>
            </div>
          )}
          {cvData.address && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{cvData.address}</span>
            </div>
          )}
        </div>
        {cvData.blurb && (
          <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {cvData.blurb}
          </p>
        )}
      </header>

      {/* Experience */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-2">
          Professional Experience
        </h2>
        <div className="space-y-8">
          {cvData.experience.map((job, index) => (
            <div key={index} className="relative pl-4 border-l-2 border-zinc-200 dark:border-zinc-800">
              <div className="mb-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  {job.position}
                </h3>
                <div className="flex flex-wrap justify-between items-baseline text-zinc-600 dark:text-zinc-400 mt-1">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">{job.company}</span>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {job.startDate} — {job.endDate}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
                  {job.location}
                </div>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-2 text-zinc-700 dark:text-zinc-300">
                {job.duties.sort((a, b) => a.order - b.order).map((duty, i) => (
                  <li key={i} className="pl-1">
                    {duty.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Education */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
          Education
        </h2>
        <div className="space-y-6">
          {cvData.education.map((edu, index) => (
            <div key={index}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  {edu.school}
                </h3>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
              <div className="text-zinc-800 dark:text-zinc-200 font-medium mb-2">
                {edu.degree}
              </div>
              {edu.description && (
                <p className="text-zinc-700 dark:text-zinc-300 italic mb-2">
                  {edu.description}
                </p>
              )}
              {edu.duties && edu.duties.length > 0 && (
                <ul className="list-disc list-outside ml-4 space-y-1 text-zinc-700 dark:text-zinc-300 text-sm">
                  {edu.duties.sort((a, b) => a.order - b.order).map((duty, i) => (
                    <li key={i}>{duty.title}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Skills */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {cvData.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
              {skill.title}
            </Badge>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Publications */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
          Publications
        </h2>
        <div className="space-y-4">
          {cvData.publications.map((pub, index) => (
            <div key={index} className="text-zinc-700 dark:text-zinc-300">
              <p className="font-medium text-zinc-900 dark:text-zinc-50">
                {pub.title}
              </p>
              <p className="text-sm mt-1">
                <span className="italic">{pub.journal}</span>. {pub.journalInfo}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {pub.authors.join(", ")}
              </p>
              <div className="flex gap-3 mt-1 text-xs text-blue-600 dark:text-blue-400">
                {pub.doi && (
                  <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    DOI
                  </a>
                )}
                {pub.pmid && (
                  <a href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    PMID: {pub.pmid}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conferences */}
      {cvData.conferences && cvData.conferences.length > 0 && (
        <>
          <Separator className="my-8" />
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
              Conferences
            </h2>
            <div className="space-y-4">
              {cvData.conferences.map((conf, index) => (
                <div key={index} className="text-zinc-700 dark:text-zinc-300">
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">
                    {conf.title}
                  </p>
                  <p className="text-sm italic mt-1">{conf.conference}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {conf.authors.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}