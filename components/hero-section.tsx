import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, GitBranchIcon } from "lucide-react"
import CldImage from "./client-cloudinary"
import ContactForm from "./about/contact-form"
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  TwitterLogoIcon
} from '@radix-ui/react-icons'
export default function HeroSection() {
  return (
    <section className="w-full py-6 md:py-12  bg-primary-foreground">
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
                    <Link href="/cv" className="flex items-center"
                    
                    >
                        Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
               
              </div>
              <div className="flex items-center justify-between gap-4">
              <Button variant="ghost" size="icon" asChild>
              <Link
                title='Github'
                target="_blank"
                referrerPolicy='no-referrer'
                href="https://www.github.com/Derick80" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                <GitHubLogoIcon />
                <p>
                  Github
                </p>
                  <span className="sr-only">GitHub</span>
                </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                <Link
                href='https://www.linkedin.com/in/dhoskinson/'
                title='LinkedIn'
                target="_blank"
                referrerPolicy='no-referrer'
                >
                <LinkedInLogoIcon />
                <p>
                  LinkedIn
                </p>
                <span className="sr-only">LinkedIn</span>

                </Link>
                </Button>
              </div>

            </div>
          </div>
            {/* Profile Picture */}

          <div className="flex items-center justify-center">
            
              <CldImage src="https://res.cloudinary.com/dch-photo/image/upload/v1745945878/derickglasses_2025_fuqha5.jpg" alt="Profile picture"  
            width={400} height={400} 
              className="object-cover rounded-lg" priority />
            </div>
          </div>
        </div>
        <ContactForm />

    </section>
  )
}
