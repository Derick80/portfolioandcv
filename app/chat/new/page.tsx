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
  return (
    <div className="flex flex-col max-w-5xl mx-auto min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     
    </div>
  );
}
