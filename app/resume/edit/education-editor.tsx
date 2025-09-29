"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { upsertEducation, deleteEducation, reorderEducation } from "@/app/actions/resume";
import { EducationalEntry } from "@/prisma/prisma/generated";

export default function EducationEditor({
  profileId, initial,
}: { profileId: string; initial: EducationalEntry[] }) {
  const [items, setItems] = React.useState(initial);

  async function add(school: string, degree: string, startDate?: string, endDate?: string, details?: string) {
    if (!profileId || !school || !degree) return;
    const optimistic: EducationalEntry = {
      id: `tmp-${Math.random().toString(36).slice(2)}`,
      profileId, school, degree,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      details: details || null,
      order: items.length,
    };
    setItems((s) => [...s, optimistic]);
    const saved = await upsertEducation({ profileId, school, degree, startDate, endDate, details });
    setItems((s) => s.map((x) => (x.id === optimistic.id ? saved : x)));
  }

  async function save(id: string, payload: Partial<EducationalEntry> & { startDateStr?: string; endDateStr?: string }) {
    setItems((s) => s.map((x) => (x.id === id ? { ...x, ...payload } : x)));
    await upsertEducation({
      id,
      profileId,
      school: String(payload.school ?? ""),
      degree: String(payload.degree ?? ""),
      startDate: payload.startDateStr ?? "",
      endDate: payload.endDateStr ?? "",
      details: (payload.details as string) ?? "",
    });
  }

  async function remove(id: string) {
    setItems((s) => s.filter((x) => x.id !== id).map((x, i) => ({ ...x, order: i })));
    await deleteEducation({ id });
    await reorderEducation({ profileId, orderedIds: items.filter((x) => x.id !== id).map((x) => x.id) });
  }

  async function move(id: string, dir: -1 | 1) {
    setItems((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx < 0) return prev;
      const t = idx + dir;
      if (t < 0 || t >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[t]] = [copy[t], copy[idx]];
      return copy.map((b, i) => ({ ...b, order: i }));
    });
    await reorderEducation({ profileId, orderedIds: items.map((x) => x.id) });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.sort((a, b) => a.order - b.order).map((ed) => (
          <Row
            key={ed.id}
            school={ed.school}
            degree={ed.degree}
            startDate={ed.startDate ? ed.startDate.toISOString().slice(0, 10) : ""}
            endDate={ed.endDate ? ed.endDate.toISOString().slice(0, 10) : ""}
            details={ed.details ?? ""}
            onSave={(payload) => save(ed.id, payload)}
            onDelete={() => remove(ed.id)}
            onUp={() => move(ed.id, -1)}
            onDown={() => move(ed.id, +1)}
          />
        ))}
        <AddRow onAdd={(...args) => add(...args)} disabled={!profileId} />
      </CardContent>
    </Card>
  );
}

function Row({
  school, degree, startDate, endDate, details, onSave, onDelete, onUp, onDown,
}: {
  school: string; degree: string; startDate?: string; endDate?: string; details?: string;
  onSave: (payload: { school?: string; degree?: string; startDateStr?: string; endDateStr?: string; details?: string }) => void;
  onDelete: () => void; onUp: () => void; onDown: () => void;
}) {
  const [s, setS] = React.useState(school);
  const [d, setD] = React.useState(degree);
  const [st, setSt] = React.useState(startDate || "");
  const [en, setEn] = React.useState(endDate || "");
  const [dt, setDt] = React.useState(details || "");

  return (
    <div className="grid gap-2 rounded-lg border p-3">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="grid gap-1">
          <label className="text-sm font-medium">School</label>
          <Input value={s} onChange={(e) => setS(e.target.value)} />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium">Degree</label>
          <Input value={d} onChange={(e) => setD(e.target.value)} />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium">Start date</label>
          <Input type="date" value={st} onChange={(e) => setSt(e.target.value)} />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium">End date</label>
          <Input type="date" value={en} onChange={(e) => setEn(e.target.value)} />
        </div>
      </div>
      <div className="grid gap-1">
        <label className="text-sm font-medium">Details</label>
        <Textarea value={dt} onChange={(e) => setDt(e.target.value)} rows={3} />
      </div>
      <div className="flex gap-1">
        <Button size="sm" variant="outline" onClick={() => onSave({ school: s, degree: d, startDateStr: st, endDateStr: en, details: dt })}>Save</Button>
        <Button size="icon" variant="ghost" onClick={onUp}>↑</Button>
        <Button size="icon" variant="ghost" onClick={onDown}>↓</Button>
        <Button size="icon" variant="ghost" onClick={onDelete}>✕</Button>
      </div>
    </div>
  );
}

function AddRow({
  onAdd, disabled,
}: {
  onAdd: (school: string, degree: string, start?: string, end?: string, details?: string) => void;
  disabled?: boolean;
}) {
  const [s, setS] = React.useState("");
  const [d, setD] = React.useState("");
  const [st, setSt] = React.useState("");
  const [en, setEn] = React.useState("");
  const [dt, setDt] = React.useState("");

  return (
    <form
      className="grid gap-2 rounded-lg border p-3"
      onSubmit={(e) => { e.preventDefault(); onAdd(s.trim(), d.trim(), st || undefined, en || undefined, dt || undefined); setS(""); setD(""); setSt(""); setEn(""); setDt(""); }}
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Input placeholder="School" value={s} onChange={(e) => setS(e.target.value)} disabled={disabled} />
        <Input placeholder="Degree" value={d} onChange={(e) => setD(e.target.value)} disabled={disabled} />
        <Input type="date" value={st} onChange={(e) => setSt(e.target.value)} disabled={disabled} />
        <Input type="date" value={en} onChange={(e) => setEn(e.target.value)} disabled={disabled} />
      </div>
      <Textarea placeholder="Details (optional)" rows={3} value={dt} onChange={(e) => setDt(e.target.value)} disabled={disabled} />
      <Button type="submit" disabled={disabled}>Add education</Button>
    </form>
  );
}
