import { Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
 } from "./ui/card";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Like } from "@prisma/client";



const BlogListItem = ({ post }:
    { post: {
        id: string;
        title: string;
        slug: string;
        description: string;
        author: string;
        date: Date;
        imageUrl?: string | null;
        wordCount: number;
        categories: string | string[];
        published: boolean;
        createdAt: Date;
        updatedAt: Date;
        likes: Like[];

    }
     }

    
) => {
    function SplitAndSortCategories(input: string | string[]) {
        // 1) check if input is a string or an array
        const categories = typeof input === 'string' ? input.split(',') : input;
        // 2) sort categories alphabetically
        const sortedCategories = categories.sort((a, b) => a.localeCompare(b));
        // 3) remove duplicates
        const uniqueCategories = Array.from(new Set(sortedCategories));
        // 4) remove empty strings
        const filteredCategories: string[] = (uniqueCategories as string[]).filter((category: string) => category.trim() !== '');
        // 3) return badges
        return (
            <>
                {filteredCategories.map((category: string) => (
                    <Badge key={category} className="mr-2" asChild>
                        <Link href={`/blog/category/${category}`}>
                            {category}
                        </Link>
                    </Badge>    ))}
            </>
        )

    }

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
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
                <div className="flex flex-wrap gap-2">
                    {SplitAndSortCategories(post.categories)}
                </div>
                <p>{post.wordCount} words</p>
                <p>{post.author}</p>
            </CardContent>
            <CardFooter>
                
               
            </CardFooter>

        </Card>
    )
}

export default BlogListItem