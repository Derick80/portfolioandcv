"use client";

import { useState, useTransition } from "react";
import { toggleThreadLikeAction } from "@/app/actions/forum";
import { Button } from "@/components/ui/button";

export function ThreadLikeButton({
  threadId,
  initialLiked,
  initialCount,
}: {
  threadId: string;
  initialLiked: boolean;
  initialCount: number;
}) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const result = await toggleThreadLikeAction(threadId);
      setIsLiked(result.liked);
      setCount((c) => (result.liked ? c + 1 : c - 1));
    });
  };

  return (
    <Button
      size="sm"
        variant='outline'
      disabled={isPending}
      onClick={handleClick}
    >
      ⭐ {count}
    </Button>
  );
}
