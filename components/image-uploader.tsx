'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash, Loader2 } from "lucide-react"
import { PostImageGrid } from "./images/image-grid"
import { CldUploadWidget } from "next-cloudinary"
import { addImageToPost, deleteImage } from "@/app/actions/posts"
import { PostImage } from "@prisma/client"
import { useState, useTransition } from "react"
import { useCallback } from "react"

interface PostImageUploaderProps {
    postId: string
    images: PostImage[]
    onImageAdded?: (image: PostImage) => void
    onImageDeleted?: (imageId: string) => void
}

export function PostImageUploader({ postId, images, onImageAdded, onImageDeleted }: PostImageUploaderProps) {
    const [isPending, startTransition] = useTransition()

    const onUpload = useCallback(
        (result: any) => {
            if (result.info && typeof result.info === "object" && "secure_url" in result.info) {
                const info = result.info
                startTransition(async () => {
                    try {
                        const newImage = await addImageToPost(postId, {
                            publicId: info.public_id,
                            url: info.secure_url,
                            width: info.width,
                            height: info.height,
                            format: info.format,
                            bytes: info.bytes
                        })
                        if (onImageAdded) onImageAdded(newImage)
                    } catch (e) {
                        console.error("Failed to add image to post", e)
                    }
                })
            }
        },
        [postId, onImageAdded]
    )

    const handleDelete = (imageId: string) => {
        startTransition(async () => {
            try {
                await deleteImage(imageId)
                if (onImageDeleted) onImageDeleted(imageId)
            } catch (e) {
                console.error("Failed to delete image", e)
            }
        })
    }

    // We need to pass a custom version of PostImageGrid/Card that supports deletion?
    // The user created `PostImageCard` with a disabled delete button.
    // I should probably update `PostImageCard` to accept onDelete or handle it here.
    // For now, I will map the images manually or update `PostImageGrid` later.
    // Let's use the `PostImageGrid` for display, but wait, `PostImageGrid` doesn't seem to have delete callbacks.
    // I'll rewrite the grid part here to support deletion for now to be quick and correct.

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Post Images</CardTitle>

                <CldUploadWidget
                    onSuccess={onUpload}
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset"}
                    options={{
                        maxFiles: 5,
                        sources: ['local', 'url', 'camera', 'google_drive'],
                    }}
                >
                    {({ open }) => (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => open()}
                            disabled={isPending}
                        >
                            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                            Add image
                        </Button>
                    )}
                </CldUploadWidget>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Images will appear in the order shown.
                </p>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {images.map((image) => (
                        <div key={image.id} className="group relative overflow-hidden rounded-lg border bg-muted aspect-square">
                            {/* We need to use next/image but let's just use img for simplicity or assume Cloudinary URL is valid */}
                            <img
                                src={image.url}
                                alt={image.alt ?? ""}
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleDelete(image.id)}
                                    disabled={isPending}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
