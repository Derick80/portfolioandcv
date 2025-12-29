'use client'

import React, { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createUnpublishedPost, updatePost } from "@/app/actions/posts"
import { PostImageUploader } from "./image-uploader"
import SlugViewer from "./slug-viewer"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Post, PostImage } from "@prisma/client"
import { PlusIcon, Loader2 } from "lucide-react"

type PostWithImages = Post & { images: PostImage[] }

export default function PostCreator() {
    const [open, setOpen] = useState(false)
    const [currentPost, setCurrentPost] = useState<PostWithImages | null>(null)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleCreatePost = () => {
        startTransition(async () => {
            try {
                // Casting the result because the server action returns a Post with images included
                // but the return type inferred might just be Post if not explicit.
                // However, our action `createUnpublishedPost` definitely includes images.
                const post = await createUnpublishedPost() as unknown as PostWithImages
                setCurrentPost(post)
                setOpen(true)
            } catch (error) {
                console.error("Failed to create post", error)
            }
        })
    }

    const handleUpdateField = (field: keyof Post, value: string | boolean) => {
        if (!currentPost) return

        // Optimistic update locally
        const updatedPost = { ...currentPost, [field]: value }

        // Special handling for title to auto-update slug
        let dataToUpdate: any = { [field]: value }
        if (field === 'title') {
            const newSlug = slugify(value as string)
            updatedPost.slug = newSlug
            dataToUpdate.slug = newSlug
        }

        setCurrentPost(updatedPost as PostWithImages)

        // Server update
        startTransition(async () => {
            // We can ignore the return value or update state again if needed
            await updatePost(currentPost.id, dataToUpdate)
        })
    }

    const handleImageAdded = (newImage: PostImage) => {
        if (!currentPost) return
        setCurrentPost({
            ...currentPost,
            images: [...(currentPost.images || []), newImage]
        })
    }

    const handleImageDeleted = (imageId: string) => {
        if (!currentPost) return
        setCurrentPost({
            ...currentPost,
            images: (currentPost.images || []).filter(img => img.id !== imageId)
        })
    }

    // Helper for slug generation
    const slugify = (text: string) => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const timestamp = `${year}-${month}-${day}`;
        return `${text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-')}-${timestamp}`;
    }

    return (
        <>
            <Button onClick={handleCreatePost} disabled={isPending}>
                {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <PlusIcon className="mr-2 h-4 w-4" />
                )}
                Create New Post
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Post</DialogTitle>
                        <DialogDescription>
                            Make changes to your post here. It saves automatically.
                        </DialogDescription>
                    </DialogHeader>

                    {currentPost && (
                        <div className="grid gap-6 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={currentPost.title}
                                    onChange={(e) => handleUpdateField('title', e.target.value)}
                                    placeholder="Enter post title..."
                                />
                                <SlugViewer title={currentPost.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    value={currentPost.content}
                                    onChange={(e) => handleUpdateField('content', e.target.value)}
                                    placeholder="Write your post content..."
                                    className="min-h-[300px]"
                                />
                            </div>

                            {/* Pass postId to uploader so it can attach images */}
                            <div className="grid gap-2">
                                <Label>Images</Label>
                                <PostImageUploader
                                    postId={currentPost.id}
                                    images={currentPost.images || []}
                                    onImageAdded={handleImageAdded}
                                    onImageDeleted={handleImageDeleted}
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setOpen(false)}>
                                    Close
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
