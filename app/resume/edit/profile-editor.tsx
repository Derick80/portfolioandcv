"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { upsertResumeProfile } from "@/app/actions/resume";
import { ResumeProfileUpsertInput } from "@/lib/resumeschema";

export default function ProfileEditor({ initial }: { initial: ResumeProfileUpsertInput | null }) {
  const [form, setForm] = React.useState({
    id: initial?.id,
    fullName: initial?.fullName ?? "",
    headline: initial?.headline ?? "",
    location: initial?.location ?? "",
    email: initial?.email ?? "",
    phone: initial?.phone ?? "",
    website: initial?.website ?? "",
    summary: initial?.summary ?? "",
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            await upsertResumeProfile({
              ...form,
              location: form.location || undefined,
              email: form.email || undefined,
              phone: form.phone || undefined,
              website: form.website || undefined,
              summary: form.summary || undefined,
            });
          }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Full name">
              <Input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} required />
            </Field>
            <Field label="Headline">
              <Input value={form.headline} onChange={(e) => set("headline", e.target.value)} required />
            </Field>
            <Field label="Location">
              <Input value={form.location} onChange={(e) => set("location", e.target.value)} />
            </Field>
            <Field label="Email">
              <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <Field label="Phone">
              <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} />
            </Field>
            <Field label="Website">
              <Input value={form.website} onChange={(e) => set("website", e.target.value)} />
            </Field>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Summary</label>
            <Textarea rows={4} value={form.summary} onChange={(e) => set("summary", e.target.value)} />
          </div>

          <div>
            <Button type="submit">{initial ? "Save Profile" : "Create Profile"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
