// app/forum/thread/[threadId]/page.tsx
import { getThreadById } from "@/app/actions/forum";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewPostForm from "./new-post-form";
import { ForumLikeButton } from "@/components/forums/forum-like-button";
import { auth } from "@/auth";
import { ThreadLikeButton } from "@/components/forums/thread-like-button";

export default async function ThreadPage(
    props: {
    params: Promise<{ threadId: string }>;
}) {
    const threadId = await props.params;
    if (!threadId) return null;
    const thread = await getThreadById(threadId.threadId);
    if (!thread) return notFound();
    const session = await auth();
    const currentUser = session?.user || null;
  return (
    <div className="mx-auto py-8 px-4 space-y-8">
      {/* Thread Header */}
      <div className="p-6 border rounded-lg bg-card">
        <h1 className="text-3xl font-bold">{thread.title}</h1>
         <ThreadLikeButton
    threadId={thread.id}
    initialLiked={thread.likes.some((l) => l.userId === currentUser?.id)}
    initialCount={thread.likes.length}
  />
        <p className="text-muted-foreground text-sm mt-1">
          Posted by {thread.author?.name ?? "Anonymous"} in{" "}
          <Link
            href={`/forums/${thread.category.name}`}
            className="underline hover:text-blue-600"
          >
            {thread.category.name}
          </Link>{" "}
          · {new Date(thread.createdAt).toLocaleDateString()}
        </p>
        <div className="mt-4 text-base whitespace-pre-line">{thread.content}</div>
      </div>

      {/* Replies */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          {thread.posts.length} {thread.posts.length === 1 ? "Reply" : "Replies"}
        </h2>
        {thread.posts.length === 0 ? (
          <p className="text-muted-foreground">No replies yet.</p>
        ) : (
          <ul className="space-y-4">
            {thread.posts.map((post) => (
              <li
                key={post.id}
                className="p-4 border rounded-lg bg-background"
              >
                <p>{post.content}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  by {post.author?.name ?? "Anonymous"} ·{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                 <ForumLikeButton
        postId={post.id}
        initialLiked={post.likes.some((l) => l.userId === currentUser?.id)}
        initialCount={post.likes.length}
      />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* New Reply Form */}
      <NewPostForm threadId={thread.id} />
    </div>
  );
}
