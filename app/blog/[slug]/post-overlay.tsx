// components/engagement-overlay.tsx
"use client";

import * as React from "react";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Bookmark, Heart, MessageSquarePlus } from "lucide-react";
import {  addCommentAction, toggleFavorite, toggleLike } from "@/app/actions/blog";
import {Sheet,SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

type Counts = { likes: number; favorites: number; comments: number };
type UserState = { liked: boolean; favorited: boolean ,
  userId?: string
};

type EngagementOverlayProps = {
  postId: string;
  slug?: string;
  initial: Counts;
  userState?: UserState;
  canComment?: boolean;
  className?: string;
};

type OptimisticState = {
  counts: Counts;
  userState: UserState;
};

export default function EngagementOverlay({
  postId,
  slug,
  initial,
  userState = { liked: false, favorited: false },
  canComment = true,
  className,
}: EngagementOverlayProps) {
  const [likeCount, setLikeCount] = React.useState(initial.likes);
  const [hasLiked, setHasLiked] = React.useState(userState.liked);
  const [favoriteCount, setFavoriteCount] = React.useState(initial.favorites);
  const [hasFavorited, setHasFavorited] = React.useState(userState.favorited);
const [commentOpen, setCommentOpen] = React.useState(false);
  const commentRef = React.useRef<HTMLTextAreaElement>(null);


  const [isPending, startTransition] = useTransition();


  function handleToggleLike() {
    if (!userState.userId) {
      alert("You must be logged in to like posts.");
      return;
    }
    // Optimistically update the UI
    setHasLiked(!hasLiked);
    setLikeCount(hasLiked ? likeCount - 1 : likeCount + 1);
    // Call the server action
    startTransition(() => {
      toggleLike(postId, userState.userId!);
    });
  }
  

  function handleToggleFavorite() {
    if (!userState.userId) {
      alert("You must be logged in to favorite posts.");
      return;
    }
    // Optimistically update the UI
    setHasFavorited(!hasFavorited);
    setFavoriteCount(hasFavorited ? favoriteCount - 1 : favoriteCount + 1);
    // Call the server action
    startTransition(() => {
      toggleFavorite(postId, userState.userId!);

    });

  }

  async function submitComment() {
    if (!userState.userId) {
      alert("You must be logged in to comment.");
      return;
    }
    const text = commentRef.current?.value;
    if (!text || !text.trim()) {
      alert("Comment cannot be empty.");
      return;
    }
    // Optionally, you could optimistically update the comment count here
    setCommentOpen(false);
    if (commentRef.current) {
      commentRef.current.value = "";
    }
    // Call the API to submit the comment
    startTransition(async () => {
      try{
        const data = await addCommentAction(postId,  text, null);
      } catch (error) {
        console.error("Error commenting on post:", error);
      }
    });
  }
  
  return (
    <TooltipProvider>
      <div
        className={cn(
          "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-2xl bg-background/80 p-2 shadow-lg ring-1 ring-border backdrop-blur",
          "md:bottom-6 md:right-6",
          className
        )}
        aria-label="Engagement controls"
      >
        <Tooltip>
          <TooltipTrigger asChild>
             <Button
              size="sm"
              onClick={handleToggleLike}
              variant={hasLiked ? "default" : "outline"}
              disabled={isPending}
              aria-pressed={hasLiked}
              className="gap-2"
            >
              <Heart className={cn("h-4 w-4", hasLiked && "fill-current")} />
              <Badge variant="secondary" className="ml-1">{initial.likes}</Badge>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Like</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              onClick={handleToggleFavorite}
              variant={hasFavorited ? "default" : "outline"}
              disabled={isPending}
              aria-pressed={hasFavorited}
              className="gap-2"
            >
              <Bookmark className={cn("h-4 w-4", hasFavorited && "fill-current")} />
              <Badge variant="secondary" className="ml-1">{initial.favorites}</Badge>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Favorite</TooltipContent>
        </Tooltip>
     {canComment && (
          <Sheet open={commentOpen} onOpenChange={setCommentOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger asChild>
                  <Button size="sm" variant="outline" className="gap-2">
                    <MessageSquarePlus className="h-4 w-4" />
                    <Badge variant="secondary" className="ml-1">{initial.comments}</Badge>
                  </Button>
                </SheetTrigger>
              </TooltipTrigger>
              <TooltipContent>Comment</TooltipContent>
            </Tooltip>

            <SheetContent side="bottom" className="max-h-[70vh]">
              <SheetHeader>
                <SheetTitle>Leave a comment</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                <Textarea ref={commentRef} placeholder="Be kind. Constructive comments only." className="min-h-[120px] resize-vertical" />
              </div>
              <SheetFooter className="mt-4">
                <div className="ml-auto flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setCommentOpen(false)}>Cancel</Button>
                  <Button type="button" onClick={submitComment} disabled={isPending}>Post comment</Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )}
       
      </div>
    </TooltipProvider>
  );
}
