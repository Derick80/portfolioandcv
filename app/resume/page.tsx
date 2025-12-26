
import { prisma } from "@/prisma";
import { ResumeView } from "@/components/resume/ResumeView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume | Derick Hoskinson",
    description: "Senior Clinical Scientist Resume",
};

export default async function ResumePage() {
    const resume = await prisma.resume.findFirst({
        include: {
            experiences: {
                include: {
                    duties: true,
                },
            },
            educations: {
                include: {
                    duties: true,
                },
            },
            skills: true,
            publications: true,
            conferences: true,
        },
    });

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <ResumeView resume={resume} />
        </div>
    );
}