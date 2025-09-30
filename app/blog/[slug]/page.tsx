
import { getAllPosts, getPostBySlug } from "@/app/actions/mdx-server-functions";
import prisma from "@/prisma";
import EngagementOverlay from "./post-overlay";
import { auth } from "@/auth";
import {  getPostDataById } from "@/app/actions/blog";
import PostComments from "./post-comments";

// export async function generateStaticParams() {
//   const posts = await getAllPosts();
//   if (!posts) {
//     throw new Error("Post not found");
//   }
//   return posts.map((post) => ({
//     params: { slug: post.slug },
//   }));
// }

// IT appears that static params are preventing this page from loading properly. I'm not sure why. 



export default async function Page(props: {
  params: { slug: string };
}) {
  const params = await props.params
  
  const post = await getPostBySlug(params.slug);
  if (!post) {
    throw new Error("Post not found");
  }

  const postData = await getPostDataById(params.slug);
  if (!postData) {
    throw new Error("Post not found");
  }

  // Get current user id (null if logged out)
  const session = await auth(); // or your own getSession()
  const userId = session?.user?.id ?? null;

  // console.log(postData,"postData");
  const postId = postData?.id;
  if (!postId) {
    throw new Error("Post ID not found");
  }

  const userState = {
    liked: postData.likes?.some((like) => like.userId === userId ) || false,
    favorited: postData.favorites?.some((fav) => fav.userId === userId) || false,
    userId: userId || undefined,
  };
  
  
  return (
    <article className="relative z-10 mx-auto max-w-4xl space-y-4 overflow-auto px-2 py-4 align-middle md:px-0">
      <EngagementOverlay
        postId={postId!}
        slug={params.slug!}
        initial={{
          likes: postData._count?.likes || 0,
          comments: postData._count?.comments || 0,
          favorites: postData._count?.favorites || 0,

        }}
        userState={userState}
    
      />
      <div className="prose prose-lg dark:prose-invert">
          {post.rawMdx}
      </div>
      <PostComments postId={postId} userId={userId} />

    </article>
  );
}
