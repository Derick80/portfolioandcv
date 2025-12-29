import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface PostImageCardProps {
    image: {
        id: string
        url: string
        alt?: string | null
    }
}

const PostImageCard = ({ image }: PostImageCardProps) => {
    return (
        <div className="group relative overflow-hidden rounded-lg border bg-muted">
            <div className="aspect-square relative">
                <Image
                    src={image.url}
                    alt={image.alt ?? ""}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Delete button placeholder */}
            <Button
                type="button"
                size="icon"
                variant="destructive"
                disabled
                aria-disabled
                className="absolute right-2 top-2 opacity-0 transition group-hover:opacity-100"
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default PostImageCard

