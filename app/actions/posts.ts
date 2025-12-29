'use server'

import { prisma } from "@/prisma"
import { revalidatePath } from "next/cache"

export async function createUnpublishedPost() {
    const post = await prisma.post.create({
        data: {
            title: "",
            content: "",
            slug: `draft-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            published: false,
        },
        include: { images: true }
    })
    revalidatePath('/blog')
    return post
}

export async function updatePost(id: string, data: { title?: string; content?: string; slug?: string; published?: boolean }) {
    const post = await prisma.post.update({
        where: { id },
        data,
        include: { images: true }
    })
    revalidatePath('/blog')
    if (post.slug) revalidatePath(`/blog/${post.slug}`)
    return post
}

export async function getPost(id: string) {
    return await prisma.post.findUnique({
        where: { id },
        include: {
            images: true
        }
    })
}

export async function addImageToPost(postId: string, image: {
    publicId: string,
    url: string,
    width: number,
    height: number,
    format: string,
    bytes: number
}) {
    const newImage = await prisma.postImage.create({
        data: {
            postId,
            publicId: image.publicId,
            url: image.url,
            width: image.width,
            height: image.height,
            format: image.format,
            bytes: image.bytes
        }
    })
    revalidatePath('/blog')
    return newImage
}

export async function deleteImage(imageId: string) {
    await prisma.postImage.delete({ where: { id: imageId } })
    revalidatePath('/blog')
}
