import { getAllPosts, getPostBySlug } from "@/app/actions/mdx-server-functions";
import PostOverlay from "./post-overlay";
import { z } from "zod";

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
  const slug =await  props.params
  if (!slug) {
    throw new Error("Slug is required");
  }
  const post = await getPostBySlug(slug.slug);
  if (!post) {
    throw new Error("Post not found");
  }

  return (
    <article className=" relative z-10 mx-auto max-w-4xl space-y-4 overflow-auto px-2 py-4 align-middle md:px-0">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p>{post.slug}</p>
      {post.rawMdx}
    </article>
  );
}
