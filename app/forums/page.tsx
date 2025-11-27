import { getAllCategories, getRecentThreads } from "../actions/forum";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function ForumLandingPage() {
  const categories = await getAllCategories();
  const recentThreads = await getRecentThreads(5); // limit to 5 latest

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-8 px-4">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Genetics Forum</h1>
        <p className="text-muted-foreground">
          A place for discussions on cancer genomics, variant interpretation, and bioinformatics.
        </p>
      </div>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Card key={cat.id} className="hover:shadow-md transition">
              <CardHeader>
                <CardTitle>{cat.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/forums/${cat.name}`}
                  className="text-blue-600 hover:underline"
                >
                  View Threads →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Threads */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Discussions</h2>
        <ul className="space-y-3">
          {recentThreads.map((thread) => (
            <li
              key={thread.id}
              className="p-4 border rounded-lg hover:bg-accent transition"
            >
              <Link href={`/forums/thread/${thread.id}`}>
                <h3 className="text-lg font-semibold">{thread.title}</h3>
              </Link>
              <p className="text-sm text-muted-foreground">
                in{" "}
                <Link
                  href={`/forums/${thread.categoryId}`}
                  className="hover:underline"
                >
                  {thread.category.name}
                </Link>{" "}
                · by {thread.author.name}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Stats */}
      <section className="text-center text-sm text-muted-foreground">
        <p>🚀 42 Threads · 200 Posts · 120 Members</p>
      </section>
    </div>
  );
}
