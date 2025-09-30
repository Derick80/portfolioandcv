// app/blog/[slug]/PostComments.tsx
import prisma from "@/prisma";
import CommentsThread from "./comments-thread";
import { FlatComment } from "./comments-thread";

export default async function PostComments({ postId, userId }: { postId: string, userId: string }) {
  const rows = await prisma.comment.findMany({
    where: { postId },
    orderBy: [{ createdAt: "asc" }],
    select: {
      id: true,
      body: true,
      createdAt: true,
      parentId: true,
      user: { select: { name: true, image: true } },
      post: { select: { id: true,
        slug: true
       } },
      likes:true
    },
  });
  // Flatten for easier handling in the thread component



  const flat: FlatComment[] = rows.map((r) => ({
    id: r.id,
    parentId: r.parentId ?? null,
    body: r.body,
    createdAt: r.createdAt.toISOString(),
    authorName: r.user?.name ?? "Anonymous",
    avatarUrl: r.user?.image ?? undefined, // optional, not used below
    postId: r.post.id,
    postSlug: r.post.slug,
    likes: r.likes || [], // add the likes array to each comment, can be empty
    currentUserId: userId || undefined, // pass current user ID for like gating
  }));

  return <CommentsThread postId={postId} comments={flat} />;
}
