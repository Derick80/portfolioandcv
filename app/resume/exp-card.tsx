"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Bullet, ExperienceSection } from "@/prisma/prisma/generated";
import { createBullet, updateBullet, deleteBullet, reorderBullets } from "@/app/actions/resume";

type ExperienceWithBullets = ExperienceSection & { bullets: Bullet[] };

export default function ExperienceCard({ experience }: { experience: ExperienceWithBullets }) {
  const [bullets, setBullets] = React.useState<Bullet[]>(experience.bullets);

  async function handleAdd(content: string) {
    if (!content.trim()) return;
    const optimistic: Bullet = {
      id: `tmp-${Math.random().toString(36).slice(2)}`,
      experienceId: experience.id,
      content,
      order: bullets.length,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setBullets((b) => [...b, optimistic]);

    const saved = await createBullet({ experienceId: experience.id, content });
    setBullets((b) => b.map((x) => (x.id === optimistic.id ? saved : x)));
  }

  async function handleSave(id: string, content: string) {
    setBullets((b) => b.map((x) => (x.id === id ? { ...x, content } : x)));
    await updateBullet({ id, content });
  }

  async function handleDelete(id: string) {
    setBullets((b) => b.filter((x) => x.id !== id).map((x, i) => ({ ...x, order: i })));
    await deleteBullet(id);
    await reorderBullets({ experienceId: experience.id, orderedIds: bullets.filter((x) => x.id !== id).map((x) => x.id) });
  }

  async function move(id: string, dir: -1 | 1) {
    setBullets((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx < 0) return prev;
      const target = idx + dir;
      if (target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[target]] = [copy[target], copy[idx]];
      return copy.map((b, i) => ({ ...b, order: i }));
    });

    const orderedIds = bullets
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((b) => b.id);

    // Defer to next tick to capture updated order
    setTimeout(() => {
      const latestIds = document // quick read from state without stale closure
        ? null
        : null; // no-op; TS placater
      void reorderBullets({
        experienceId: experience.id,
        orderedIds: (function getIds() {
          // safer: recompute from current state
          const current = Array.from(document.querySelectorAll(`[data-bullet-id]`)).map((el) =>
            (el as HTMLElement).dataset.bulletId!
          );
          return current.length ? current : orderedIds;
        })(),
      });
    }, 0);
  }

  return (
    <Card className="rounded-2xl border">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">
              {experience.title} — {experience.company}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {experience.location ? `${experience.location} • ` : ""}
              {formatDate(experience.startDate)} – {experience.isCurrent ? "Present" : formatDate(experience.endDate)}
            </p>
          </div>
          <Link href={`/resume/builder/${experience.id}`}>
            <Button size="sm" variant="outline">Edit</Button>
          </Link>
        </div>
        {experience.summary && (
          <p className="mt-2 text-sm leading-relaxed">{experience.summary}</p>
        )}
      </CardHeader>

      <CardContent>
        <ul className="space-y-2">
          {bullets
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((b) => (
              <li
                key={b.id}
                data-bullet-id={b.id}
                className="group grid grid-cols-[1fr_auto] items-start gap-2 rounded-lg p-2 hover:bg-muted/40"
              >
                <InlineBulletEditor
                  value={b.content}
                  onChange={(val) => handleSave(b.id, val)}
                />
                <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button size="icon" variant="ghost" onClick={() => move(b.id, -1)} aria-label="Move up">↑</Button>
                  <Button size="icon" variant="ghost" onClick={() => move(b.id, +1)} aria-label="Move down">↓</Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(b.id)} aria-label="Delete">✕</Button>
                </div>
              </li>
            ))}
        </ul>

        <AddBullet onAdd={handleAdd} />
      </CardContent>
    </Card>
  );
}

function formatDate(d?: Date | null) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short" });
  } catch {
    return "";
  }
}

function InlineBulletEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [text, setText] = React.useState(value);
  React.useEffect(() => setText(value), [value]);

  return (
    <Textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={() => text !== value && onChange(text)}
      className="min-h-10 w-full resize-y text-sm"
    />
  );
}

function AddBullet({ onAdd }: { onAdd: (content: string) => void }) {
  const [content, setContent] = React.useState("");
  return (
    <form
      className="mt-4 flex items-start gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(content.trim());
        setContent("");
      }}
    >
      <Input
        placeholder="Add a bullet point…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">Add</Button>
    </form>
  );
}
