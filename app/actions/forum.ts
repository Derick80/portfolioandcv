// app/actions/forum.ts
"use server";

import { auth } from "@/auth";
import prisma from "@/prisma";
import { revalidatePath } from "next/cache";

export const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}


export const getRecentThreads = async (limit: number = 5) => {
  return prisma.thread.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      category: true,
    },
  });
}

export const getCategoryByName = async (name: string) => {
  return prisma.category.findUnique({
    where: { name },
    include: {
      threads: {
        orderBy: { createdAt: "desc" },
        include: {
          author: true,
        },
      },
    },
  });
};



export const createThreadAction = async ({
  title,
  content,
  categoryName,
}: {
  title: string;
  content: string;
  categoryName: string;
}) => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  const category = await prisma.category.findUnique({
    where: { name: categoryName },
  });
  if (!category) throw new Error("Category not found");
  const categoryId = category.id;
  
  const thread = await prisma.thread.create({
    data: {
      title,
      content,
      categoryId,
      authorId: session.user.id,
    },
  });

  revalidatePath(`/forums/${categoryId}`);
  return thread;
}

export const getAllThreadsByCategory = async (categoryName: string) => {
  return prisma.thread.findMany({
    where: { category: { name: categoryName } },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });
}

export const getThreadById = async (threadId: string) => {
  return prisma.thread.findUnique({
    where: { id: threadId },
    include: {  
      author: true,
      category: true,
      likes: true,
      posts: {
        orderBy: { createdAt: "asc" },
        include: { author: true,
          likes: true,
         },
      },
    },
  });
}



export const createPostAction = async ({
  threadId,
  content,
}: {
  threadId: string;
  content: string;
}) => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const post = await prisma.post.create({
    data: {
      content,
      threadId,
      authorId: session.user.id,
    },
  });

  revalidatePath(`/forums/thread/${threadId}`);
  return post;
} 


export const toggleForumLikeAction = async (postId: string) => {
  const session = await auth();
  
const userId = session?.user?.id;
  if (!userId) throw new Error("Not authenticated");

  const existing = await prisma.forumLike.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (existing) {
    await prisma.forumLike.delete({ where: { id: existing.id } });
    revalidatePath(`/forums/thread/${postId}`);
    return { liked: false };
  }

  await prisma.forumLike.create({
    data: { postId, userId},
  });
  revalidatePath(`/forums/thread/${postId}`);
  return { liked: true };
}



export const toggleThreadLikeAction = async (threadId: string) => {
  const session = await auth();

  const user = session?.user;
  if (!user) throw new Error("Not authenticated");
  const userId = user.id;
  if (!userId) throw new Error("Not authenticated");

  const existing = await prisma.threadLike.findUnique({
    where: { userId_threadId: { userId, threadId } },
  });

  if (existing) {
    await prisma.threadLike.delete({ where: { id: existing.id } });
    revalidatePath(`/forums/thread/${threadId}`);
    return { liked: false };
  }

  await prisma.threadLike.create({
    data: { threadId, userId },
  });

  revalidatePath(`/forums/thread/${threadId}`);
  return { liked: true };
}
