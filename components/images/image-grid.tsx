import PostImageCard from "./post-image"

export interface PostImage {
    id: string
    url: string
    alt?: string | null
}

interface PostImageGridProps {
    images: PostImage[]
}

export function PostImageGrid({ images }: PostImageGridProps) {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((image) => (
                <PostImageCard key={image.id} image={image} />
            ))}
        </div>
    )
}
