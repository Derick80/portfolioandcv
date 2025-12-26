"use client";

import { useActionState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    updateResumeBasicInfo,
    addExperience, updateExperience, deleteExperience,
    addEducation, updateEducation, deleteEducation,
    addDuty, addEducationDuty, updateDuty, deleteDuty, moveDuty,
    addSkill, deleteSkill
} from "@/app/resume/actions";
import { Plus, Trash, ChevronUp, ChevronDown, Save, Briefcase, GraduationCap, Code } from "lucide-react";
import type { Resume, Experience, Duty, Education, Skill, Publication, Conference } from "@prisma/client";

type ResumeWithRelations = Resume & {
    experiences: (Experience & { duties: Duty[] })[];
    educations: (Education & { duties: Duty[] })[];
    skills: Skill[];
    publications: Publication[];
    conferences: Conference[];
};

export function ResumeEditor({ initialResume, userId }: { initialResume: ResumeWithRelations | null, userId: string }) {

    if (!initialResume) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl mb-4">No resume found.</h2>
                <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
                    <p>Please edit Basic Info below to start your resume.</p>
                    <BasicInfoForm resume={null} />
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-12 pb-20 max-w-4xl mx-auto">
            <section>
                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                    <span className="bg-slate-100 p-2 rounded-full"><Briefcase className="w-5 h-5 text-slate-700" /></span>
                    <h2 className="text-2xl font-bold text-slate-800">Basic Information</h2>
                </div>
                <BasicInfoForm resume={initialResume} />
            </section>

            <section>
                <div className="flex justify-between items-center mb-6 border-b pb-2">
                    <div className="flex items-center gap-2">
                        <span className="bg-slate-100 p-2 rounded-full"><Briefcase className="w-5 h-5 text-slate-700" /></span>
                        <h2 className="text-2xl font-bold text-slate-800">Experience</h2>
                    </div>
                    <AddExperienceButton />
                </div>
                <div className="space-y-6">
                    {initialResume.experiences.sort((a, b) => a.order - b.order).map(exp => (
                        <ExperienceItem key={exp.id} experience={exp} />
                    ))}
                    {initialResume.experiences.length === 0 && (
                        <p className="text-slate-500 italic text-center py-4">No experience added yet.</p>
                    )}
                </div>
            </section>

            <section>
                <div className="flex justify-between items-center mb-6 border-b pb-2">
                    <div className="flex items-center gap-2">
                        <span className="bg-slate-100 p-2 rounded-full"><GraduationCap className="w-5 h-5 text-slate-700" /></span>
                        <h2 className="text-2xl font-bold text-slate-800">Education</h2>
                    </div>
                    <AddEducationButton />
                </div>
                <div className="space-y-6">
                    {initialResume.educations.sort((a, b) => a.order - b.order).map(edu => (
                        <EducationItem key={edu.id} education={edu} />
                    ))}
                    {initialResume.educations.length === 0 && (
                        <p className="text-slate-500 italic text-center py-4">No education added yet.</p>
                    )}
                </div>
            </section>

            <section>
                <div className="flex justify-between items-center mb-6 border-b pb-2">
                    <div className="flex items-center gap-2">
                        <span className="bg-slate-100 p-2 rounded-full"><Code className="w-5 h-5 text-slate-700" /></span>
                        <h2 className="text-2xl font-bold text-slate-800">Skills</h2>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
                    <div className="mb-4">
                        <AddSkillForm />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {initialResume.skills.map(skill => (
                            <SkillBadge key={skill.id} skill={skill} />
                        ))}
                    </div>
                    {initialResume.skills.length === 0 && (
                        <p className="text-slate-500 italic text-center py-4">No skills added yet.</p>
                    )}
                </div>
            </section>
        </div>
    );
}

// --- Basic Info ---

function BasicInfoForm({ resume }: { resume: ResumeWithRelations | null }) {
    const [state, action, isPending] = useActionState(updateResumeBasicInfo, null);

    return (
        <form action={action} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" defaultValue={resume?.name || ""} />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" defaultValue={resume?.email || ""} />
                </div>
                <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" defaultValue={resume?.phone || ""} />
                </div>
                <div>
                    <Label htmlFor="address">Address / Location</Label>
                    <Input id="address" name="address" defaultValue={resume?.address || ""} />
                </div>
            </div>
            <div>
                <Label htmlFor="blurb">Professional Summary</Label>
                <Textarea id="blurb" name="blurb" rows={4} defaultValue={resume?.blurb || ""} />
            </div>
            <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                    <Save className="w-4 h-4 mr-2" />
                    {isPending ? "Saving..." : "Save Basic Info"}
                </Button>
            </div>
            {state?.message && <p className="text-sm text-green-600 font-medium text-right">{state.message}</p>}
        </form>
    );
}

// --- Experience ---

function AddExperienceButton() {
    const [_, action, isPending] = useActionState(addExperience, null);
    return (
        <form action={action}>
            <Button size="sm" variant="default" disabled={isPending}>
                <Plus className="w-4 h-4 mr-1" /> Add Job
            </Button>
        </form>
    )
}

function ExperienceItem({ experience }: { experience: Experience & { duties: Duty[] } }) {
    const [state, action, isPending] = useActionState(updateExperience, null);
    const [isTransitioning, startTransition] = useTransition();

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border hover:border-blue-300 transition-colors">
            <form action={action} className="space-y-4 mb-4">
                <input type="hidden" name="id" value={experience.id} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Company</Label>
                        <Input name="company" defaultValue={experience.company} />
                    </div>
                    <div>
                        <Label>Position</Label>
                        <Input name="position" defaultValue={experience.position} />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input name="location" defaultValue={experience.location || ""} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Label>Start Date</Label>
                            <Input name="startDate" placeholder="YYYY-MM-DD" defaultValue={experience.startDate || ""} />
                        </div>
                        <div>
                            <Label>End Date</Label>
                            <Input name="endDate" placeholder="YYYY-MM-DD" defaultValue={experience.endDate || ""} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        type="button"
                        onClick={() => startTransition(() => deleteExperience(experience.id))}
                    >
                        <Trash className="w-4 h-4 mr-1" /> Delete
                    </Button>
                    <Button variant="outline" size="sm" type="submit" disabled={isPending}>
                        <Save className="w-4 h-4 mr-1" />
                        {isPending ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>

            <div className="pl-4 border-l-2 border-slate-100 mt-6">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Responsibilities</h4>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startTransition(() => addDuty(experience.id))}
                    >
                        <Plus className="w-3 h-3 mr-1" /> Add Bullet
                    </Button>
                </div>
                <div className="space-y-2">
                    {experience.duties.sort((a, b) => a.order - b.order).map(duty => (
                        <DutyItem key={duty.id} duty={duty} />
                    ))}
                </div>
            </div>
        </div>
    )
}

// --- Education ---

function AddEducationButton() {
    const [_, action, isPending] = useActionState(addEducation, null);
    return (
        <form action={action}>
            <Button size="sm" variant="default" disabled={isPending}>
                <Plus className="w-4 h-4 mr-1" /> Add Education
            </Button>
        </form>
    )
}

function EducationItem({ education }: { education: Education & { duties: Duty[] } }) {
    const [state, action, isPending] = useActionState(updateEducation, null);
    const [isTransitioning, startTransition] = useTransition();

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border hover:border-blue-300 transition-colors">
            <form action={action} className="space-y-4 mb-4">
                <input type="hidden" name="id" value={education.id} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <Label>School / University</Label>
                        <Input name="school" defaultValue={education.school} />
                    </div>
                    <div>
                        <Label>Degree</Label>
                        <Input name="degree" defaultValue={education.degree} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Label>Start Date</Label>
                            <Input name="startDate" placeholder="YYYY-MM-DD" defaultValue={education.startDate || ""} />
                        </div>
                        <div>
                            <Label>End Date</Label>
                            <Input name="endDate" placeholder="YYYY-MM-DD" defaultValue={education.endDate || ""} />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <Label>Description</Label>
                        <Input name="description" defaultValue={education.description || ""} />
                    </div>
                </div>
                <div className="flex justify-end gap-2 items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        type="button"
                        onClick={() => startTransition(() => deleteEducation(education.id))}
                    >
                        <Trash className="w-4 h-4 mr-1" /> Delete
                    </Button>
                    <Button variant="outline" size="sm" type="submit" disabled={isPending}>
                        <Save className="w-4 h-4 mr-1" />
                        {isPending ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>

            <div className="pl-4 border-l-2 border-slate-100 mt-6">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Details / Honors</h4>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startTransition(() => addEducationDuty(education.id))}
                    >
                        <Plus className="w-3 h-3 mr-1" /> Add Detail
                    </Button>
                </div>
                <div className="space-y-2">
                    {education.duties.sort((a, b) => a.order - b.order).map(duty => (
                        <DutyItem key={duty.id} duty={duty} />
                    ))}
                </div>
            </div>
        </div>
    )
}

// --- Shared Duty Item (Movable) ---

function DutyItem({ duty }: { duty: Duty }) {
    const [state, action, isPending] = useActionState(updateDuty, null);
    const [isTransitioning, startTransition] = useTransition();

    return (
        <div className="flex items-start gap-2 group">
            <div className="flex flex-col gap-1 mt-2 transition-opacity opacity-50 group-hover:opacity-100">
                <button
                    type="button"
                    onClick={() => startTransition(() => moveDuty(duty.id, "up"))}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
                    title="Move Up"
                >
                    <ChevronUp className="w-3 h-3" />
                </button>
                <button
                    type="button"
                    onClick={() => startTransition(() => moveDuty(duty.id, "down"))}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
                    title="Move Down"
                >
                    <ChevronDown className="w-3 h-3" />
                </button>
            </div>

            <form action={action} className="flex-1">
                <input type="hidden" name="id" value={duty.id} />
                <Textarea
                    name="title"
                    defaultValue={duty.title}
                    className="min-h-[50px] resize-y text-sm leading-relaxed"
                    onBlur={(e) => e.target.form?.requestSubmit()}
                />
            </form>

            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-300 hover:text-red-500 hover:bg-red-50"
                onClick={() => startTransition(() => deleteDuty(duty.id))}
                title="Delete"
            >
                <Trash className="w-4 h-4" />
            </Button>
        </div>
    )
}

// --- Skills ---

function AddSkillForm() {
    const [state, action, isPending] = useActionState(addSkill, null);
    return (
        <form action={action} className="flex gap-2 items-end">
            <div className="flex-1">
                <Label htmlFor="skill-title">Skill</Label>
                <Input id="skill-title" name="title" placeholder="e.g. React" required />
            </div>
            <div className="w-1/3">
                <Label htmlFor="skill-category">Category</Label>
                <Input id="skill-category" name="category" placeholder="Optional" />
            </div>
            <Button type="submit" disabled={isPending}>
                <Plus className="w-4 h-4" />
            </Button>
        </form>
    )
}

function SkillBadge({ skill }: { skill: Skill }) {
    const [isTransitioning, startTransition] = useTransition();

    return (
        <div className="inline-flex items-center bg-slate-100 text-slate-800 rounded-full px-3 py-1 text-sm border">
            <span className="font-medium mr-1">{skill.title}</span>
            {skill.category && <span className="text-xs text-slate-500 mr-2">({skill.category})</span>}
            <button
                onClick={() => startTransition(() => deleteSkill(skill.id))}
                className="text-slate-400 hover:text-red-500"
            >
                <Trash className="w-3 h-3" />
            </button>
        </div>
    )
}
