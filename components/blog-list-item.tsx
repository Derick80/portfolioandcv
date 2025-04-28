import { MdxCompiled } from "@/lib/types";
import { Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
 } from "./ui/card";
import Link from "next/link";



const BlogListItem = ({ post }:
    { post: MdxCompiled }
) => {
    return(
        <Card>
          <Link href={`/blog/${post.slug}`}>
          <CardHeader
            >
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            </Link>
            <CardContent>
            <p>{post.categories.join(', ')}</p>

            </CardContent>
            <CardFooter>
                <p>{post.date}</p>
                <p>{post.wordCount} words</p>
                <p>{post.author}</p>
            </CardFooter>

        </Card>
    )
}

export default BlogListItem