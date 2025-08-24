"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Download, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CVData, Skill } from "@/lib/types";

interface CVDisplayProps {
  cvData: CVData;
}

export default function CVDisplay({ cvData }: CVDisplayProps) {
  const cvRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: cvRef,
    documentTitle: `${cvData.name} - Curriculum Vitae`,
  });

  const skillArray = Object.values(cvData.skills).flat();
  //   reorganize skills by category
  const skillsByCategory = skillArray.reduce(
    (acc: Record<string, Skill[]>, skill: Skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {},
  );

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white text-primary shadow-lg rounded-lg overflow-hidden mb-6">
      <div className="p-6 bg-primary text-primary-foreground flex justify-between items-center">
        <h1 className="text-2xl font-bold">Curriculum Vitae</h1>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePrint()}
            className="flex items-center gap-1"
          >
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">Print</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePrint()}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </Button>
        </div>
      </div>

      {/* Printable CV Content */}
      <div
        ref={cvRef}
        className="p-8 print:p-6 print:max-w-full print:shadow-none"
      >
        {/* Header */}
        <div className="mb-8 text-center print:mb-6">
          <h1 className="text-3xl text-black font-bold mb-2 print:text-2xl">
            {cvData.name === "first_cv"
              ? "Derick Hoskinson, Ph.D."
              : cvData.name}
          </h1>
          <div className="text-black space-y-1">
            <p>{cvData.address}</p>
            <p>
              {cvData.phone} | {cvData.email}
            </p>
          </div>
        </div>

        <Separator className="my-6 print:my-4 bg-black" />

        {/* Skills Section */}
        <section className="mb-8 print:mb-6">
          <h2 className="text-xl font-bold mb-4 text-black print:text-lg print:mb-3">
            Skills & Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-3">
            {Object.entries(skillsByCategory)
              .sort(([categoryA], [categoryB]) =>
                categoryA.localeCompare(categoryB),
              )
              .map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-lg text-black font-bold mb-2 print:text-base">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .sort((a, b) => a.title.localeCompare(b.title))
                      .map((skill) => (
                        <Badge
                          key={skill.title}
                          variant="default"
                          className="text-sm print:text-xs"
                        >
                          {skill.title}
                        </Badge>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </section>

        <Separator className="my-6 print:my-4 bg-black" />

        {/* Experience Section */}
        <section className="mb-8 print:mb-6">
          <h2 className="text-xl font-bold mb-4 text-black print:text-lg print:mb-3">
            Professional Experience
          </h2>

          {cvData.experience.map((job, index) => (
            <div key={index} className="mb-6 print:mb-4 last:mb-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <div>
                  <h3 className="font-bold text-black text-lg print:text-base">
                    {job.position}
                  </h3>
                  <p className="text-gray-700">{job.company}</p>
                  <p className="text-muted-foreground text-sm">
                    {job.location}
                  </p>
                </div>
                <p className="text-muted-foreground text-sm mt-1 sm:mt-0 print:text-xs">
                  {formatDate(job.startDate)} -{" "}
                  {job.endDate ? formatDate(job.endDate) : "Present"}
                </p>
              </div>

              <ul className="list-disc pl-5 text-gray-700 space-y-1 print:text-sm">
                {job.duties
                  .sort((a, b) => a.order - b.order)
                  .map((duty, dutyIndex) => (
                    <li key={dutyIndex}>{duty.title}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        <Separator className="my-6 print:my-4 bg-black" />

        {/* Education Section */}
        <section className="mb-8 print:mb-6">
          <h2 className="text-xl font-bold mb-4 text-black print:text-lg print:mb-3">
            Education
          </h2>

          {cvData.education.map((edu, index) => (
            <div key={index} className="mb-6 print:mb-4 last:mb-0 text-black">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg print:text-base">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-700">{edu.school}</p>
                </div>
                <p className="text text-sm mt-1 sm:mt-0 print:text-xs">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
              </div>

              {edu.description && (
                <p className="text-gray-700 italic mb-2 print:text-sm">
                  {edu.description}
                </p>
              )}

              {edu.duties && edu.duties.length > 0 && (
                <ul className="list-disc pl-5 text-gray-700 space-y-1 print:text-sm">
                  {edu.duties
                    .sort((a, b) => a.order - b.order)
                    .map((duty, dutyIndex) => (
                      <li key={dutyIndex}>{duty.title}</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <Separator className="my-6 print:my-4 bg-black" />

        {/* Conferences Section */}
        <section className="mb-8 print:mb-6 text-black space-y-4">
          <h2 className="text-xl font-bold mb-4 text-black print:text-lg print:mb-3">
            Conferences
          </h2>
          {cvData?.conferences?.map((conf) => (
            <div key={conf.title} className="text-sm">
              <p className="font-medium">{conf.title}</p>
              <p className="text-gray-700">{conf.conference}</p>
              <p className="text-gray-700">{conf.authors.join(", ")}</p>
            </div>
          ))}
        </section>

        <Separator className="my-6 print:my-4 bg-black" />

        {/* Publications Section */}
        <section className="mb-8 print:mb-6 text-black">
          <h2 className="text-xl font-bold mb-4 print:text-lg print:mb-3">
            Publications
          </h2>

          <Accordion type="single" collapsible className="print:hidden">
            <AccordionItem value="publications">
              <AccordionTrigger className="text-base font-medium">
                View All Publications ({cvData.publications.length})
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {cvData.publications
                    .sort(
                      (a, b) =>
                        new Date(b.publicationDate).getTime() -
                        new Date(a.publicationDate).getTime(),
                    )
                    .map((pub, index) => (
                      <div key={pub.pmid} className="text-sm">
                        <p className="font-medium">{pub.title}</p>
                        <p className="text-gray-700">
                          {pub.authors.join(", ")}
                        </p>
                        <p className="">
                          {pub.journal} {pub.journalInfo}
                        </p>
                        {pub.doi && <p className="">DOI: {pub.doi}</p>}
                      </div>
                    ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Print-friendly publications list */}
          <div className="hidden print:block space-y-3">
            {cvData.publications
              .sort(
                (a, b) =>
                  b.publicationDate.getTime() - a.publicationDate.getTime(),
              )
              .map((pub, index) => (
                <div key={index} className="text-xs">
                  <p className="font-medium">{pub.title}</p>
                  <p className="text-gray-700">{pub.authors.join(", ")}</p>
                  <p className="text-muted-foreground">
                    {pub.journal} {pub.journalInfo}
                  </p>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
