import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { ResumeEditor } from "@/components/resume/ResumeEditor";

export default async function ResumeEditPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/api/auth/signin");
    }

    // Ensure user has a resume if not create one? 
    // For now fetch first or user's.
    // Since we seeded one for a specific user, we might want to ensure the logged in user sees THAT resume or their own.
    // If the logged in user doesn't have a resume, we should probably create an empty one or show empty editor.

    let resume = await prisma.resume.findUnique({
        where: { userId: session.user.id },
        include: {
            experiences: { include: { duties: true } },
            educations: { include: { duties: true } },
            skills: true,
            publications: true,
            conferences: true,
        },
    });

    // If no resume found for this user, and since we are in "Update my application" mode where I might be logging in as a new user or the seeded user.
    // If I log in as the seeded user (derickhoskinson@gmail.com), I'll see it.
    // If I log in as new user, I see nothing. 
    // I will implement a "create" button inside the editor or just auto-create on first save.
    // Better: auto-create empty resume if missing so UI works.

    if (!resume) {
        // Check if we already have a resume for this user created in the seed (if the IDs match).
        // The seed created a user. If I log in via GitHub/Discord/etc, it might be a different user ID unless email matches and linking happens.
        // NextAuth usually handles account linking if email matches.

        // For now, pass null and let editor handle "Create".
    }

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6">Edit Resume</h1>
                <ResumeEditor initialResume={resume} userId={session.user.id!} />
            </div>
        </div>
    );
}
