import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import Link from "next/link";
import { Badge } from "./ui/badge";

const BlogListItem = ({
  post,
}: {
  post: {
    id: string;
    title: string;
    slug: string;
    description: string;
    author: string;
    date: Date;
    imageUrl?: string | null;
    wordCount: number;
    categories: string | string[];
    likes: {
      id: string;
      userId: string;
      postId: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  };
}) => {
  function SplitAndSortCategories(input: string | string[]) {
    // 1) check if input is a string or an array
    const categories = typeof input === "string" ? input.split(",") : input;
    // 2) sort categories alphabetically
    const sortedCategories = categories.sort((a, b) => a.localeCompare(b));
    // 3) remove duplicates
    const uniqueCategories = Array.from(new Set(sortedCategories));
    // 4) remove empty strings
    const filteredCategories: string[] = (uniqueCategories as string[]).filter(
      (category: string) => category.trim() !== "",
    );
    // 3) return badges
    return (
      <>
        {filteredCategories.map((category: string) => (
          <Badge key={category} className="mr-2" asChild>
            <Link href={`/blog/category/${category}`}>{category}</Link>
          </Badge>
        ))}
      </>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer">
      <Link href={`/blog/${post.slug}`}>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.description}</CardDescription>
        </CardHeader>
      </Link>
      <CardContent className="pt-0 flex flex-col gap-2">
        <h5 className="text-sm ">Categories:</h5>
        <div className="flex flex-wrap gap-2">
          {SplitAndSortCategories(post.categories)}
        </div>
        <div className="flex flex-col gap-2 justify-end mt-2">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Written by:</p>
            <p>{post.author}</p>
          </div>
          <div className="flex justify-end items-center gap-2">
            <p className="text-sm text-muted-foreground">Posted on:</p>
            <p className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t"></CardFooter>
    </Card>
  );
};

export default BlogListItem;
