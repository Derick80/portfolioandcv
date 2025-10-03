import { getCategoryByName } from "@/app/actions/forum";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page(
props: {
  params: Promise<{
    categoryName: string;
  }>;
}){
    const categoryName = await props.params
    if (!categoryName) return null;
    const category = await getCategoryByName(categoryName.categoryName);
    if (!category) {
        return <div>Category not found</div>;
    }
    return(
         <div className="max-w-4xl mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <Link href={`/forums/${category.name}/new`}>
          <Button>New Thread</Button>
        </Link>
      </div>

      {/* Threads List */}
      {category.threads.length === 0 ? (
        <p className="text-muted-foreground">No threads yet. Be the first to post!</p>
      ) : (
        <ul className="space-y-4">
          {category.threads.map((thread) => (
            <li
              key={thread.id}
              className="p-4 border rounded-lg hover:bg-accent transition"
            >
              <Link
                href={`/forums/thread/${thread.id}`}
                className="text-xl font-semibold hover:underline"
              >
                {thread.title}
              </Link>
              <p className="text-sm text-muted-foreground mt-1">
                by {thread.author?.name ?? "Anonymous"} ·{" "}
                {new Date(thread.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
    )
}