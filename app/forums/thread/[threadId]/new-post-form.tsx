"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createPostAction } from "@/app/actions/forum";

export default function NewPostForm({ threadId }: { threadId: string }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await createPostAction({ threadId, content });
      setContent("");
      router.refresh(); // refreshes thread page to show new post
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-medium">Your Reply</label>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        placeholder="Write your reply..."
        rows={4}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Posting..." : "Reply"}
      </Button>
    </form>
  );
}
