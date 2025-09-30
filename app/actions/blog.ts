'use server' 
import { auth } from "@/auth";
import {prisma} from "@/prisma";
import { revalidatePath } from "next/cache";

export const getPosts = async () => {
  return await prisma.mdxPost.findMany({
    include: {
      likes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPostDataById = async (slug: string) => {
  const data =await  prisma.mdxPost.findUnique({
    where: {
     slug: slug,
    },
    include: {
      likes: true,
      favorites: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: { createdAt: "desc" }
      },  

      _count: {
        select: { likes: true, favorites: true, comments: true },
      },
    },    
  });
  //user liked
  const userliked = data?.likes.map(like => like.userId);
  const userfavorited = data?.favorites.map(fav => fav.userId);

  return {
    ...data,
    userliked,
    userfavorited,
  };

}





export const toggleLike = async (postId: string, userId: string) => {
  const existingLike = await prisma.like.findUnique({
    where: { userId_postId : { userId, postId } },
  });

  if (existingLike) {
    // User has already liked the post, so we remove the like
    await prisma.like.delete({
      where: { id: existingLike.id },
    });
    revalidatePath(`/blog/${postId}`);
    return false; // Indicate that the post is now unliked
  } else {
    // User has not liked the post yet, so we add a like
    await prisma.like.create({
      data: { postId, userId },
    });
    revalidatePath(`/blog/${postId}`);
    return true; // Indicate that the post is now liked
  } 

};


export const toggleFavorite = async (postId: string, userId: string) => {
  const existingFavorite = await prisma.favorite.findUnique({
    where: { postId_userId : { postId, userId } },
  });

  if (existingFavorite) {
    // User has already favorited the post, so we remove the favorite
    await prisma.favorite.delete({
      where: { id: existingFavorite.id },
    });
    revalidatePath(`/blog/${postId}`);
    return false; // Indicate that the post is now unfavorited
  } else {
    // User has not favorited the post yet, so we add a favorite
    await prisma.favorite.create({
      data: { postId, userId },
    });
    revalidatePath(`/blog/${postId}`);
    return true; // Indicate that the post is now favorited
  }

};


export const addCommentAction = async (postId: string, text: string, parentId?:string | null

) => {
const session = await auth();
const userId = session?.user?.id;
if (!userId) throw new Error("Unauthorized");

const body = text.trim();
if (!body) throw new Error("Comment cannot be empty");

  const comment = await prisma.comment.create({
    data: { postId, userId, body, parentId: parentId ?? null },
    select:{
      id:true,
      createdAt:true,
      user:{
        select:{
          name:true,
          userImages:true,
        }
      }
    }
  });
  revalidatePath(`/blog/${postId}`);
  return {
    id: comment.id,
    createdAt: comment.createdAt.toISOString(),
    authorName: comment.user?.name || "Anonymous",
    authorImages: comment.user?.userImages || null,
  }

}



export async function toggleCommentLikeAction(
  commentId: string,
  next: boolean,
  slug?: string // optional, if your page is /blog/[slug] and you want RSC revalidation
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized");
  console.log("Toggling like for comment:", commentId, "to", next, "by user:", userId, "on post:", slug);
  if (next) {
    await prisma.commentLike.upsert({
      where: { commentId_userId: { commentId: commentId, userId } },
      update: {},
      create: { commentId: commentId, userId },
    });
  } else {
    await prisma.commentLike.deleteMany({
      where: { commentId: commentId, userId },
    });
  }

  const count = await prisma.commentLike.count({ where: { commentId: commentId } });

  // Only needed if a SERVER-rendered section reads comment like counts from DB
  if (slug) revalidatePath(`/blog/${slug}`);

  return { likes: count };
}