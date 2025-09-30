"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";
import { addCommentAction, toggleCommentLikeAction } from "@/app/actions/blog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type FlatComment = {
  id: string;
  parentId: string | null;
  body: string;
  createdAt: string; // ISO string
  authorName: string;
  avatarUrl?: string;
  postId: string;
  postSlug: string;
  currentUserId?: string;
  likes:{
    userId: string;
    id: string;
    commentId: string;
  }[];
};

type CommentNode = FlatComment & { children: CommentNode[] };

export default function CommentsThread({
  postId,
  comments,
}: {
  postId: string;
  comments: FlatComment[];
}) {
  const initialTree = React.useMemo(() => buildTree(comments), [comments]);
  const [tree, setTree] = React.useState<CommentNode[]>(initialTree);

  // Keep in sync if server refreshes
  React.useEffect(() => setTree(initialTree), [initialTree]);

  const addReplyOptimistic = React.useCallback(
    (parentId: string | null, newNode: CommentNode) => {
      setTree((prev) => insertNode(prev, parentId, newNode));
    },
    []
  );

  const rollbackOptimistic = React.useCallback((tempId: string) => {
    setTree((prev) => removeNode(prev, tempId));
  }, []);

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-lg font-semibold">Comments</h2>
      <div className="space-y-4">
        {tree.length === 0 && (
          <p className="text-sm text-muted-foreground">Be the first to comment.</p>
        )}
        {tree.map((n) => (
          <CommentItem
            key={n.id}
            node={n}
            postId={postId}
            addReplyOptimistic={addReplyOptimistic}
            rollbackOptimistic={rollbackOptimistic}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------- CommentItem ------------------- */

function CommentItem({
  node,
  postId,
  addReplyOptimistic,
  rollbackOptimistic,
  depth = 0,
  maxDepth = 6,
}: {
  node: CommentNode;
  postId: string;
  addReplyOptimistic: (parentId: string | null, newNode: CommentNode) => void;
  rollbackOptimistic: (tempId: string) => void;
  depth?: number;
  maxDepth?: number;
}) {
  console.log(node,"node");
  const [likesCount, setLikesCount] = React.useState(node.likes.length || 0);
  const [hasLiked, setHasLiked] = React.useState(
    node.currentUserId ? node.likes.some((like) => like.userId === node.currentUserId) : false
  );
  const [showReply, setShowReply] = React.useState(false);
  const [replyText, setReplyText] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const [isLiking, startLikeTransition] = React.useTransition();

  const dateLabel = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(node.createdAt));

  const canReply = depth < maxDepth - 1;

  const toggleLike = () => {
    if (!node.currentUserId) {
      alert("You must be logged in to like comments.");
      return;
    }
    const next = !hasLiked;
    const prevLikes = likesCount;

    // optimistic
    setHasLiked(next);
    setLikesCount((c) => c + (next ? 1 : -1));

    startLikeTransition(async () => {
      try {
        const res = await toggleCommentLikeAction(node.id, next, node.postSlug);
        if (typeof res?.likes === "number") setLikesCount(res.likes);
      } catch {
        // rollback
        setHasLiked(!next);
        setLikesCount(prevLikes);
      }
    });
  };

  const submitReply = async () => {
    const text = replyText.trim();
    if (!text) return;
    setIsPending(true);

    const tempId = `temp-${Date.now()}`;
    const optimisticNode: CommentNode = {
      id: tempId,
      parentId: node.id,
      body: text,
      createdAt: new Date().toISOString(),
      authorName: "You",
      postId: node.postId,
      postSlug: node.postSlug,
      currentUserId: node.currentUserId,
      likes: [],
      children: [],
    };
    addReplyOptimistic(node.id, optimisticNode);
    setReplyText("");
    setShowReply(false);

    try {
      const saved = await addCommentAction(postId, text, node.id);
      rollbackOptimistic(tempId);
      const persisted: CommentNode = {
        ...optimisticNode,
        id: saved.id,
        createdAt: saved.createdAt,
        authorName: saved.authorName ?? "You",
      };
      addReplyOptimistic(node.id, persisted);
    } catch {
      rollbackOptimistic(tempId);
      setReplyText(text);
      setShowReply(true);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="rounded-lg border p-4">
       {/* Avatar */}
      <Avatar className="h-10 w-10">
        {node.avatarUrl ? (
          <AvatarImage src={node.avatarUrl} alt={node.authorName} />
        ) : (
          <AvatarFallback>
            {node.authorName.charAt(0).toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>

      {/* Header */}
      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{node.authorName}</span>
        <span aria-hidden>•</span>
        <time dateTime={node.createdAt}>{dateLabel}</time>
      </div>

      {/* Body */}
      <p className="whitespace-pre-wrap leading-relaxed">{node.body}</p>

      {/* Actions */}
      <div className="mt-2 flex items-center gap-3">
        <Button
          variant={hasLiked ? "default" : "ghost"}
          size="sm"
          onClick={toggleLike}
          disabled={isLiking}
          className="gap-2"
          aria-pressed={hasLiked}
          aria-label={hasLiked ? "Unlike comment" : "Like comment"}
        >
          <Heart className={`h-4 w-4 ${hasLiked ? "fill-red-500" : ""}`} />
          <span>{likesCount}</span>
        </Button>

        {canReply && (
          <Button variant="ghost" size="sm" onClick={() => setShowReply((s) => !s)}>
            {showReply ? "Cancel" : "Reply"}
          </Button>
        )}

        {node.children.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed((c) => !c)}
            aria-expanded={!collapsed}
          >
            {collapsed
              ? `Show ${node.children.length} repl${node.children.length > 1 ? "ies" : "y"}`
              : "Hide replies"}
          </Button>
        )}
      </div>

      {/* Reply form */}
      {showReply && canReply && (
        <div className="mt-3 space-y-2">
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a thoughtful reply…"
            className="min-h-[90px]"
          />
          <div className="flex gap-2">
            <Button onClick={submitReply} disabled={isPending || replyText.trim().length === 0}>
              {isPending ? "Posting…" : "Post reply"}
            </Button>
            <Button variant="outline" onClick={() => setShowReply(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Children */}
      {!collapsed && node.children.length > 0 && (
        <div className="mt-4 space-y-3 border-l pl-4">
          {node.children.map((child) => (
            <CommentItem
              key={child.id}
              node={child}
              postId={postId}
              depth={depth + 1}
              maxDepth={maxDepth}
              addReplyOptimistic={addReplyOptimistic}
              rollbackOptimistic={rollbackOptimistic}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------- Helpers ------------------- */

function buildTree(rows: FlatComment[]): CommentNode[] {
  const map = new Map<string, CommentNode>();
  rows.forEach((r) =>
    map.set(r.id, {
      ...r,
      children: [],
    })
  );
  const roots: CommentNode[] = [];
  for (const node of map.values()) {
    if (node.parentId && map.has(node.parentId)) {
      map.get(node.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

function insertNode(tree: CommentNode[], parentId: string | null, newNode: CommentNode): CommentNode[] {
  if (parentId === null) return [...tree, newNode];
  return tree.map((n) =>
    n.id === parentId
      ? { ...n, children: [...n.children, newNode] }
      : { ...n, children: insertNode(n.children, parentId, newNode) }
  );
}

function removeNode(tree: CommentNode[], id: string): CommentNode[] {
  return tree
    .filter((n) => n.id !== id)
    .map((n) => ({ ...n, children: removeNode(n.children, id) }));
}
