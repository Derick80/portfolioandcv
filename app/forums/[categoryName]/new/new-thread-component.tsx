"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createThreadAction, getCategoryByName } from "@/app/actions/forum"; // server action

export default function NewThreadForm({
  categoryName,
}: {
  categoryName: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {

      await createThreadAction({ title, content, categoryName });
      router.push(`/forums/${categoryName}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={isPending}
      >
        {isPending ? "Posting..." : "Post Thread"}
      </button>
    </form>
  );
}
