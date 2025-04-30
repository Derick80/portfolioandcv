import { auth } from "@/auth";
import HeroSection from "@/components/hero-section";
import { Metadata } from "next";
import ModeToggle from "./mode-toggle";

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
    <div className="flex flex-col max-w-5xl mx-auto min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <HeroSection />
      {session && (
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">
            Welcome back, {session?.user?.name}!
          </h1>
        </div>
      )}
      <p className="text-lg">
        This is a personal web app for Dr. Hoskinson. You can find various
        resources and tools here.
      </p>
    </div>
  );
}
