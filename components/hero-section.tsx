import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import CldImage from "./client-cloudinary"

export default function HeroSection() {
  return (
    <section className="w-full border-2 py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Hi, I&apos;m Derick</h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Passionate clinical geneticist &  developer with a keen interest in bioinformatics and variant classification in a clinical context. 
              </p>
            </div>
            <div className="space-y-4 md:space-y-6">
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400">
                With over 8 years of experience in clinical genetics and 3+ years of experience developing FDA approved devices, new next generation sequencing tests, and variant support for the production team. I specialize in using variant science to develop new tests, ready tests for FDA approval, and provide evidence-baed support variant classfication and reporting. My approach combines genetics expertise with
                creative problem-solving and data science to deliver solutions that will impact a patients journey. 
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="inline-flex h-10 items-center justify-center" asChild>
                    <Link href="/cv" className="flex items-center">
                        Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                <Button variant="outline" className="inline-flex h-10 items-center justify-center">
                  Contact Me
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </div>
            {/* Profile Picture */}

          <div className="flex items-center justify-center">
            
              <CldImage src="https://res.cloudinary.com/dch-photo/image/upload/v1745945878/derickglasses_2025_fuqha5.jpg" alt="Profile picture"  
            width={400} height={400} 
              className="object-cover" priority />
            </div>
          </div>
        </div>
    </section>
  )
}
