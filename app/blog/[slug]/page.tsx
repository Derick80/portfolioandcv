
import { getAllPosts, getPostBySlug } from "@/app/actions/mdx-server-functions";

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
  params: Promise<{
    slug: string;
  }>;
}) {
  const params =await  props.params
  
  const post = await getPostBySlug(params.slug);
  if (!post) {
    throw new Error("Post not found");
  }
console.log(post,"post");
  return (
    <article className="relative z-10 mx-auto max-w-4xl space-y-4 overflow-auto px-2 py-4 align-middle md:px-0">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="prose prose-lg dark:prose-invert">
          {post.rawMdx}
      </div>
    </article>
  );
}
