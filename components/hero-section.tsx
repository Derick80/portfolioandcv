import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CldImage from "./client-cloudinary";
import ContactForm from "./about/contact-form";
import { LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
                Clinical Geneticist & Developer
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Hi, I&apos;m Derick
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                Passionate clinical geneticist keen on leveraging my clinical
                genetics background to develop new tools to improve patient
                care.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button
                className="inline-flex h-12 items-center justify-center rounded-full px-8 text-base font-medium shadow-lg transition-transform hover:scale-105"
                asChild
              >
                <Link href="/cv">
                  View Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <div className="flex items-center gap-4 px-4">
                <Link
                  href="https://www.github.com/Derick80"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <GitHubLogoIcon className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/dhoskinson/"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LinkedInLogoIcon className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center relative">
            {/* Decorative background blob */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl scale-110 -z-10" />
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card">
              <CldImage
                src="https://res.cloudinary.com/dch-photo/image/upload/v1745945878/derickglasses_2025_fuqha5.jpg"
                alt="Derick Hoskinson"
                width={500}
                height={500}
                className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <ContactForm />
      </div>
    </section>
  );
}
