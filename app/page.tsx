import { auth } from "@/auth";
import HeroSection from "@/components/hero-section";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileTextIcon, NewspaperIcon, FlaskConicalIcon, DnaIcon } from "lucide-react";

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

      <div className="container px-4 md:px-6 py-12 space-y-20">

        {/* Welcome Section */}
        {session && (
          <div className="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-2xl transition-all hover:shadow-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Welcome back, {session?.user?.name}!</h2>
                <p className="text-muted-foreground mt-2 text-lg">
                  You have access to exclusive tools and resources.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <DnaIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bento Grid Section */}
        <section>
          <div className="flex flex-col space-y-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Explore</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Discover my latest work, research, and thoughts on clinical genetics and software development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">

            {/* CV Card - Large */}
            <Link href="/cv" className="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 md:col-span-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 w-fit">
                    <FileTextIcon className="h-6 w-6" />
                  </div>
                  <ArrowUpRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Curriculum Vitae</h3>
                  <p className="text-muted-foreground">
                    A comprehensive overview of my academic background, clinical experience, and research contributions.
                  </p>
                </div>
              </div>
            </Link>

            {/* Blog Card */}
            <Link href="#" className="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 md:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-green-500/10 text-green-500 w-fit">
                    <NewspaperIcon className="h-6 w-6" />
                  </div>
                  <ArrowUpRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-green-600 transition-colors">Blog</h3>
                  <p className="text-muted-foreground line-clamp-2">
                    Insights and updates on genetics.
                  </p>
                </div>
              </div>
            </Link>

            {/* Research / Projects Card - Placeholder for now */}
            <div className="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 md:col-span-1 bg-muted/30">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 w-fit">
                    <FlaskConicalIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-2">Research</h3>
                  <p className="text-muted-foreground">
                    Coming soon...
                  </p>
                </div>
              </div>
            </div>

            {/* GitHub / Socials or Other Content */}
            <div className="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 md:col-span-2 flex items-center justify-between">
              <div className="relative z-10 flex flex-col justify-center h-full max-w-md">
                <h3 className="text-2xl font-bold mb-2">Open Source</h3>
                <p className="text-muted-foreground">
                  Check out my contributions to the open-source community on GitHub.
                </p>
              </div>
              <div className="relative z-10 hidden sm:block">
                <Link href="https://github.com/Derick80" target="_blank" className="px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/80 transition-colors">
                  View GitHub
                </Link>
              </div>
            </div>

          </div>
        </section>

        <div className="text-center text-sm text-muted-foreground mt-12 pb-8">
          <p>
            Designed & Built by Dr. Hoskinson.
          </p>
        </div>
      </div>
    </div>
  );
}
