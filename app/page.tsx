import { auth } from "@/auth";
import HeroSection from "@/components/hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Hoskinson's Blog",
  description: "A personal web app for Dr. Hoskinson",
  keywords: [
    "clinical genetics",
    "genetics phd",
    "acmg",
    "variant classification",
    "somatic",
    "germline",
    "tufts genetics phd",
    "derick hoskinson",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <HeroSection />

      <div className="container px-4 md:px-6 py-12 space-y-12">
        {session && (
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <h1 className="text-2xl font-semibold leading-none tracking-tight">
              Welcome back, {session?.user?.name}!
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              You have access to exclusive tools and resources.
            </p>
          </div>
        )}

        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Example Feature Card 1 */}
          <div className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-md transition-all">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-xl">Curriculum vitae</h3>
              <p className="text-muted-foreground">
                View Dr. Hoskinson&apos;s curriculum vitae.
              </p>
            </div>
          </div>

          {/* Example Feature Card 3 */}
          <div className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-md transition-all">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-xl">Blog</h3>
              <p className="text-muted-foreground">
                Read the latest updates and insights from Dr. Hoskinson.
              </p>
            </div>
          </div>
        </section>

        <div className="text-center text-sm text-muted-foreground mt-12">
          <p>
            This is a personal web app for Dr. Hoskinson.
          </p>
        </div>
      </div>
    </div>
  );
}
