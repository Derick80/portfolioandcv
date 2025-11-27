import {prisma}  from '../prisma'
import { MdxCompiled } from "@/lib/types";
import { getAllPosts } from "@/app/actions/mdx-server-functions";

// Do not import prisma instance from the prisma.ts file
// This is because the prisma instance is not available in the scripts folder
// it's ok to import the blog actions because they do not use the prisma instance


// Helper function to map post frontmatter to Prisma's upsert input
const mapPostToPrismaData = ({ post }: { post: MdxCompiled }) => ({
  title: post.title,
  slug: post.slug,
  description: post.description,
  author: post.author,
  date: new Date(post.date),
  imageUrl: post.imageUrl,
  wordCount: post.wordCount,
  categories: {
    set: post.categories,
  },
  published: post.published,
});
// using AI to help me update the script to check if there are any new or missing slugs in the database and update them
const shouldUpdate = async (): Promise<boolean> => {
  const posts = await getAllPosts();
  if (!posts || posts.length === 0) return false;

  console.log(
    "Got the posts. Checking for new or missing slugs in the database",
  );
  const dbPosts = await prisma.mdxPost.findMany();

  const dbSlugs = new Set(dbPosts.map((post) => post.slug));
  console.log("here are the db slugs", dbSlugs);
  const newSlugs = new Set(posts.map((post) => post.slug));

  console.log("here are the new slugs", newSlugs);

  // Are the new slugs similar to the old slugs?

  function similar(a: string[], b: string[]) {
    const setA = new Set(a);
    const setB = new Set(b);
    const intersection = new Set([...setA].filter((x) => setB.has(x)));
    return intersection.size > 0;
  }
  // changed the !similar to similar and that worked. Neigher myself or AI were smart enough to figure this out on our own.
  const shouldUpdate = similar([...dbSlugs], [...newSlugs]);
  return shouldUpdate;
};

const syncWithDb = async () => {
  const needsUpdating = await shouldUpdate();
  console.log("needsUpdating", needsUpdating);
  if (!needsUpdating) {
    return { message: "Database is already up to date" };
  }

  const posts = await getAllPosts();
  if (!posts || posts.length === 0) {
    return { message: "No posts were found" };
  }
  const updated = await Promise.all(
    posts.map(async (post) => {
      const prismaData = mapPostToPrismaData({ post });
      return prisma.mdxPost.upsert({
        where: { slug: post.slug },
        update: prismaData,
        create: {
          ...prismaData,
          imageUrl: post.imageUrl ?? "",
        },
      });
    }),
  );

  return {
    message: "Database updated successfully",
    updatedSlugs: updated.map((post) => post.slug),
  };
};

syncWithDb().then(console.log).catch(console.error);

await syncWithDb();

// Run the script with the following command
// npm run seed_posts
// remove the export default syncWithDb
export default syncWithDb;
