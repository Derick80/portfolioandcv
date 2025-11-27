export const runtime = "nodejs";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import BlogListItem from "@/components/blog-list-item";
import { Metadata } from "next";
import { getAllPosts } from "../actions/mdx-server-functions";

export const metadata: Metadata = {
  title: "Dr. Hoskinson's Blog",
  description: "A personal web app for Dr. Hoskinson",
  keywords: [
    "clinical genetics",
    "genetics phd",
    "acmg",
    "variant classification",
    "somatic",
    "germline",
    "tufts genetics phd",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default async function Blog() {
  const posts = await getAllPosts();
  if (!posts.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto items-center py-2 md:gap-6">
      <p className="text-lg text-muted-foreground">
        Welcome to my blog! This blog is a collection of thoughts and ideas on
        clinical genetics, bioinformatics, and other topics that interest me.
        You may filter the posts by category and read the entire post by
        clicking on the Read More button.
      </p>

      {posts && posts.map((post:any) => <BlogListItem key={post.slug} post={post} />)}
    </div>
  );
}
