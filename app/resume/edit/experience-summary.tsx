"use client";

import * as React from "react";
import { ExperienceSection, Bullet } from "@/prisma/prisma/generated";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ExWithBullets = ExperienceSection & { bullets: Bullet[] };

export default function ExperienceSummary({ experiences }: { experiences: ExWithBullets[] }) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Professional Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {experiences.map((e) => (
          <div key={e.id} className="grid grid-cols-[1fr_auto] items-start gap-2 rounded-lg border p-3">
            <div>
              <div className="font-medium">{e.title} — {e.company}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(e.startDate).toLocaleDateString(undefined, { year: "numeric", month: "short" })} – {e.isCurrent ? "Present" : (e.endDate ? new Date(e.endDate).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "")}
              </div>
              {e.summary && <p className="mt-1 text-sm">{e.summary}</p>}
              <ul className="mt-1 list-disc pl-6 text-sm">
                {e.bullets.slice(0, 3).map((b) => <li key={b.id}>{b.content}</li>)}
                {e.bullets.length > 3 && <li className="text-muted-foreground">…</li>}
              </ul>
            </div>
            <Link href={`/resume/builder/${e.id}`}>
              <Button variant="outline" size="sm">Edit</Button>
            </Link>
          </div>
        ))}
        <div className="flex justify-end">
          <Link href="/resume/builder/new">
            <Button>New Experience</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
