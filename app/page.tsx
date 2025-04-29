import { auth } from "@/auth";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dr. Hoskinson's Blog",
  description: 'A personal web app for Dr. Hoskinson',
  keywords: [
      'clinical genetics',
      'genetics phd',
      'acmg',
      'variant classification',
      'somatic',
      'germline',
      'tufts genetics phd'
  ],
  robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
          index: true,
          follow: true
      }
  }
}

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {session && (
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">Welcome back, {session?.user?.name}!</h1>
            <p className="text-lg">
              This is a personal web app for Dr. Hoskinson. You can find various
              resources and tools here.
            </p>
           </div>
        )}

        </main>
    </div>
  );
}
