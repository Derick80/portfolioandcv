"use client";

import * as React from "react";
import { SkillGroup } from "@/prisma/prisma/generated";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { upsertSkillGroup, deleteSkillGroup, reorderSkillGroups } from "@/app/actions/resume";

export default function SkillsEditor({
  profileId, initial,
}: { profileId: string; initial: SkillGroup[] }) {
  const [items, setItems] = React.useState(initial);

  async function add(title: string, itemsText: string) {
    if (!profileId || !title || !itemsText) return;
    const optimistic: SkillGroup = {
      id: `tmp-${Math.random().toString(36).slice(2)}`,
      profileId, title, items: itemsText, order: items.length,
    };
    setItems((s) => [...s, optimistic]);
    const saved = await upsertSkillGroup({ profileId, title, items: itemsText });
    setItems((s) => s.map((x) => (x.id === optimistic.id ? saved : x)));
  }

  async function save(id: string, title: string, itemsText: string) {
    setItems((s) => s.map((x) => (x.id === id ? { ...x, title, items: itemsText } : x)));
    await upsertSkillGroup({ id, profileId, title, items: itemsText });
  }

  async function remove(id: string) {
    setItems((s) => s.filter((x) => x.id !== id).map((x, i) => ({ ...x, order: i })));
    await deleteSkillGroup({ id });
    await reorderSkillGroups({ profileId, orderedIds: items.filter((x) => x.id !== id).map((x) => x.id) });
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
    await reorderSkillGroups({ profileId, orderedIds: items.map((x) => x.id) });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Groups</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.sort((a, b) => a.order - b.order).map((g) => (
          <Row
            key={g.id}
            title={g.title}
            items={g.items}
            onSave={(title, items) => save(g.id, title, items)}
            onDelete={() => remove(g.id)}
            onUp={() => move(g.id, -1)}
            onDown={() => move(g.id, +1)}
          />
        ))}
        <AddRow onAdd={(title, items) => add(title, items)} disabled={!profileId} />
      </CardContent>
    </Card>
  );
}

function Row({
  title, items, onSave, onDelete, onUp, onDown,
}: {
  title: string; items: string;
  onSave: (title: string, items: string) => void;
  onDelete: () => void; onUp: () => void; onDown: () => void;
}) {
  const [t, setT] = React.useState(title);
  const [i, setI] = React.useState(items);
  return (
    <div className="grid gap-2 rounded-lg border p-3">
      <Input value={t} onChange={(e) => setT(e.target.value)} placeholder="Group title (e.g., Genomics)" />
      <Textarea value={i} onChange={(e) => setI(e.target.value)} placeholder="Comma-separated items" rows={3} />
      <div className="flex gap-1">
        <Button size="sm" variant="outline" onClick={() => onSave(t, i)}>Save</Button>
        <Button size="icon" variant="ghost" onClick={onUp}>↑</Button>
        <Button size="icon" variant="ghost" onClick={onDown}>↓</Button>
        <Button size="icon" variant="ghost" onClick={onDelete}>✕</Button>
      </div>
    </div>
  );
}

function AddRow({ onAdd, disabled }: { onAdd: (title: string, items: string) => void; disabled?: boolean }) {
  const [t, setT] = React.useState("");
  const [i, setI] = React.useState("");
  return (
    <form
      className="grid gap-2"
      onSubmit={(e) => { e.preventDefault(); onAdd(t.trim(), i.trim()); setT(""); setI(""); }}
    >
      <Input value={t} onChange={(e) => setT(e.target.value)} placeholder="Group title" disabled={disabled} />
      <Textarea value={i} onChange={(e) => setI(e.target.value)} placeholder="Comma-separated items" rows={3} disabled={disabled} />
      <Button type="submit" disabled={disabled}>Add group</Button>
    </form>
  );
}
