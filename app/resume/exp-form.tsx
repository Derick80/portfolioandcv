"use client";

import * as React from "react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { deleteExperience, upsertExperience } from "@/app/actions/resume";
import { ExperienceSection } from "@/prisma/prisma/generated";

export default function ExperienceForm({ initial }: { initial?: ExperienceSection }) {
  const [pending, start] = useTransition();
  const router = useRouter();

  const [form, setForm] = React.useState({
    id: initial?.id,
    title: initial?.title ?? "",
    company: initial?.company ?? "",
    location: initial?.location ?? "",
    startDate: initial ? initial.startDate.toISOString().slice(0, 10) : "",
    endDate: initial?.endDate ? initial.endDate.toISOString().slice(0, 10) : "",
    isCurrent: initial?.isCurrent ?? false,
    summary: initial?.summary ?? "",
    order: initial?.order ?? 0,
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          await upsertExperience(form);
          router.push("/resume/builder");
        });
      }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Title</label>
          <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Company</label>
          <Input value={form.company} onChange={(e) => set("company", e.target.value)} required />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <label className="text-sm font-medium">Location</label>
          <Input value={form.location} onChange={(e) => set("location", e.target.value)} />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Start Date</label>
          <Input type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">End Date</label>
          <Input
            type="date"
            value={form.endDate}
            onChange={(e) => set("endDate", e.target.value)}
            disabled={form.isCurrent}
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="isCurrent"
            checked={form.isCurrent}
            onCheckedChange={(v) => set("isCurrent", Boolean(v))}
          />
          <label htmlFor="isCurrent" className="text-sm">Current role</label>
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <label className="text-sm font-medium">Summary (optional)</label>
          <Textarea value={form.summary} onChange={(e) => set("summary", e.target.value)} rows={4} />
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <label className="text-sm font-medium">Display Order</label>
          <Input type="number" value={form.order} onChange={(e) => set("order", Number(e.target.value))} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {initial ? "Save Changes" : "Create Experience"}
        </Button>

        {initial && (
          <Button
            type="button"
            variant="destructive"
            onClick={() =>
              start(async () => {
                await deleteExperience(initial.id);
                router.push("/resume/builder");
              })
            }
            disabled={pending}
          >
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
