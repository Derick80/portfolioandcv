"use client";

import * as React from "react";
import { Link as LinkModel } from "@/prisma/prisma/generated";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { upsertLink, deleteLink, reorderLinks } from "@/app/actions/resume";


export default function LinksEditor({
  profileId,
  initial,
}: {
  profileId: string;
  initial: LinkModel[];
}) {
  const [items, setItems] = React.useState(initial);

  async function add(label: string, url: string) {
    if (!profileId || !label || !url) return;
    const optimistic: LinkModel = {
      id: `tmp-${Math.random().toString(36).slice(2)}`,
      label,
      url,
      order: items.length,
      profileId,
    };
    setItems((s) => [...s, optimistic]);
    const saved = await upsertLink({ profileId, label, url });
    setItems((s) => s.map((x) => (x.id === optimistic.id ? saved : x)));
  }

  async function save(id: string, label: string, url: string) {
    setItems((s) => s.map((x) => (x.id === id ? { ...x, label, url } : x)));
    await upsertLink({ id, profileId, label, url });
  }

  async function remove(id: string) {
    setItems((s) => s.filter((x) => x.id !== id).map((x, i) => ({ ...x, order: i })));
    await deleteLink({ id });
    await reorderLinks({ profileId, orderedIds: items.filter((x) => x.id !== id).map((x) => x.id) });
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
    await reorderLinks({ profileId, orderedIds: items.map((x) => x.id) });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.sort((a, b) => a.order - b.order).map((l) => (
          <Row
            key={l.id}
            label={l.label}
            url={l.url}
            onSave={(label, url) => save(l.id, label, url)}
            onDelete={() => remove(l.id)}
            onUp={() => move(l.id, -1)}
            onDown={() => move(l.id, +1)}
          />
        ))}
        <AddRow onAdd={(label, url) => add(label, url)} disabled={!profileId} />
      </CardContent>
    </Card>
  );
}

function Row({
  label, url, onSave, onDelete, onUp, onDown,
}: {
  label: string; url: string;
  onSave: (label: string, url: string) => void;
  onDelete: () => void;
  onUp: () => void;
  onDown: () => void;
}) {
  const [a, setA] = React.useState(label);
  const [b, setB] = React.useState(url);
  return (
    <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-2">
      <Input value={a} onChange={(e) => setA(e.target.value)} placeholder="Label" />
      <Input value={b} onChange={(e) => setB(e.target.value)} placeholder="https://…" />
      <div className="flex gap-1">
        <Button size="sm" variant="outline" onClick={() => onSave(a, b)}>Save</Button>
        <Button size="icon" variant="ghost" onClick={onUp}>↑</Button>
        <Button size="icon" variant="ghost" onClick={onDown}>↓</Button>
        <Button size="icon" variant="ghost" onClick={onDelete}>✕</Button>
      </div>
    </div>
  );
}

function AddRow({ onAdd, disabled }: { onAdd: (label: string, url: string) => void; disabled?: boolean }) {
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");
  return (
    <form
      className="grid grid-cols-[1fr_1fr_auto] items-center gap-2"
      onSubmit={(e) => { e.preventDefault(); onAdd(a.trim(), b.trim()); setA(""); setB(""); }}
    >
      <Input value={a} onChange={(e) => setA(e.target.value)} placeholder="Label" disabled={disabled} />
      <Input value={b} onChange={(e) => setB(e.target.value)} placeholder="https://…" disabled={disabled} />
      <Button type="submit" disabled={disabled}>Add</Button>
    </form>
  );
}
