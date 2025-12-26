"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Printer, Download, Mail, Phone, MapPin, Linkedin, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Resume, Experience, Duty, Education, Skill, Publication, Conference } from "@prisma/client";

type ResumeWithRelations = Resume & {
    experiences: (Experience & { duties: Duty[] })[];
    educations: (Education & { duties: Duty[] })[];
    skills: Skill[];
    publications: Publication[];
    conferences: Conference[];
};

interface ResumeViewProps {
    resume: ResumeWithRelations | null;
}

export function ResumeView({ resume }: ResumeViewProps) {
    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef, // Updated for newer react-to-print versions if needed, or stick to content: () => componentRef.current
    } as any);
    // Note: react-to-print API varies. Standard is content: () => componentRef.current. 
    // But verifying package.json version 3.1.0 uses hook.

    // Custom print handler if useReactToPrint has issues with types in this environment
    const triggerPrint = () => {
        // Basic window print if hook fails setup, but hook is better for selecting content.
        // We will try standard useReactToPrint usage.
        handlePrint();
    };

    if (!resume) {
        return <div className="p-8 text-center">No resume found.</div>;
    }

    return (
        <div className="container mx-auto max-w-5xl py-8 px-4 sm:px-6">
            <div className="mb-6 flex justify-end gap-2 print:hidden">
                <Button variant="outline" onClick={() => triggerPrint()}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print / Save PDF
                </Button>
            </div>

            <div
                ref={componentRef}
                className="bg-white text-slate-900 p-8 md:p-12 shadow-sm print:shadow-none print:p-0 mx-auto max-w-4xl"
                id="resume-content"
            >
                {/* Header */}
                <header className="border-b pb-6 mb-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                        {resume.name}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-sm md:text-base text-slate-600">
                        {resume.email && (
                            <a href={`mailto:${resume.email}`} className="flex items-center gap-1 hover:text-blue-600 print:text-slate-900">
                                <Mail className="h-4 w-4" />
                                {resume.email}
                            </a>
                        )}
                        {resume.phone && (
                            <span className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                {resume.phone}
                            </span>
                        )}
                        {resume.address && (
                            <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {resume.address}
                            </span>
                        )}
                    </div>
                    {resume.blurb && (
                        <p className="mt-4 text-lg text-slate-700 leading-relaxed max-w-3xl">
                            {resume.blurb}
                        </p>
                    )}
                </header>

                {/* Experience */}
                {resume.experiences.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center border-b pb-2">
                            Professional Experience
                        </h2>
                        <div className="space-y-6">
                            {resume.experiences
                                .sort((a, b) => a.order - b.order)
                                .map((exp) => (
                                    <div key={exp.id} className="break-inside-avoid">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                                            <h3 className="text-xl font-semibold text-slate-900">
                                                {exp.position}
                                            </h3>
                                            <span className="text-slate-600 font-medium">
                                                {exp.startDate} – {exp.endDate || "Present"}
                                            </span>
                                        </div>
                                        <div className="text-lg text-slate-800 font-medium mb-2">
                                            {exp.company} <span className="text-slate-500 font-normal text-sm">| {exp.location}</span>
                                        </div>
                                        <ul className="list-disc list-outside ml-5 space-y-1 text-slate-700">
                                            {exp.duties
                                                .sort((a, b) => a.order - b.order)
                                                .map((duty) => (
                                                    <li key={duty.id} className="leading-snug">
                                                        {duty.title}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {resume.educations.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center border-b pb-2">
                            Education
                        </h2>
                        <div className="space-y-6">
                            {resume.educations
                                .sort((a, b) => a.order - b.order)
                                .map((edu) => (
                                    <div key={edu.id} className="break-inside-avoid">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                                            <h3 className="text-xl font-semibold text-slate-900">
                                                {edu.school}
                                            </h3>
                                            <span className="text-slate-600">
                                                {edu.startDate} – {edu.endDate || "Present"}
                                            </span>
                                        </div>
                                        <div className="text-lg font-medium text-slate-800 mb-2">
                                            {edu.degree}
                                        </div>
                                        {edu.description && (
                                            <p className="text-slate-700 italic mb-2">{edu.description}</p>
                                        )}
                                        {edu.duties.length > 0 && (
                                            <ul className="list-disc list-outside ml-5 space-y-1 text-slate-700">
                                                {edu.duties
                                                    .sort((a, b) => a.order - b.order)
                                                    .map((duty) => (
                                                        <li key={duty.id} className="leading-snug">
                                                            {duty.title}
                                                        </li>
                                                    ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </section>
                )}

                {/* Publications */}
                {resume.publications.length > 0 && (
                    <section className="mb-8 break-inside-avoid">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center border-b pb-2">
                            Selected Publications
                        </h2>
                        <ul className="space-y-3">
                            {resume.publications
                                .sort((a, b) => a.order - b.order)
                                .map((pub) => (
                                    <li key={pub.id} className="text-slate-700">
                                        <p>
                                            <span className="font-semibold">{pub.title}</span>. {pub.authors.join(", ")}.{" "}
                                            <span className="italic">{pub.journal}</span>. {pub.journalInfo}.
                                            {pub.pmid && <span> PMID: {pub.pmid}.</span>}
                                        </p>
                                    </li>
                                ))}
                        </ul>
                    </section>
                )}

                {/* Conferences */}
                {resume.conferences.length > 0 && (
                    <section className="mb-8 break-inside-avoid">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center border-b pb-2">
                            Conference Abstracts
                        </h2>
                        <ul className="space-y-3">
                            {resume.conferences
                                .sort((a, b) => a.order - b.order)
                                .map((conf) => (
                                    <li key={conf.id} className="text-slate-700">
                                        <p>
                                            <span className="font-semibold">{conf.title}</span>. {conf.authors.join(", ")}.{" "}
                                            <span className="italic">{conf.conference}</span>.
                                        </p>
                                    </li>
                                ))}
                        </ul>
                    </section>
                )}

                {/* Skills */}
                {resume.skills.length > 0 && (
                    <section className="break-inside-avoid">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center border-b pb-2">
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {resume.skills
                                .sort((a, b) => a.order - b.order)
                                .map((skill) => (
                                    <Badge key={skill.id} variant="secondary" className="text-sm px-3 py-1">
                                        {skill.title}
                                    </Badge>
                                ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
