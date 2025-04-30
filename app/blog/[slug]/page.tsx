import { getAllPosts, getPostBySlug } from "@/app/actions/mdx-server-functions";
import { blogPostSchema } from "@/lib/types";
import { Suspense } from "react";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  if (!posts) {
    throw new Error("Post not found");
  }
  return posts.map((post) => ({
    params: { slug: post.slug },
  }));
}
export default async function Page(props: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const params = await props.params;

  const { slug } = blogPostSchema.parse(params);
  if (!slug) {
    throw new Error("No slug provided");
  }
  const post = await getPostBySlug(slug);
  if (!post) {
    throw new Error("Post not found");
  }
  const { rawMdx, ...rest } = post;

  return (
    <article className="prose relative z-10 mx-auto max-w-4xl space-y-4 overflow-auto px-2 py-4 align-middle dark:prose-invert md:px-0">
      <Suspense fallback={<>Loading...</>}>
        <h1 className="text-3xl font-bold">{rest.title}</h1>
        {rawMdx}
      </Suspense>
    </article>
  );
}
