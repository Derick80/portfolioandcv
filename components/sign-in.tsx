import { auth } from "@/auth";
import { Button } from "./ui/button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function SignIn() {
  const session = await auth();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      {session ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">You are signed in!</h1>
          <p className="mb-8">Welcome back, {session.user?.name}.</p>
          <Link href='/' className="text-blue-500 underline">
            Go to Home Page
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <form action={
            async function signInWithDiscord(formData: FormData) {
              'use server';
              const { signIn } = await import('@/auth');
              await signIn('discord', { callbackUrl: '/' });
            }
          }>
            <Button type="submit">
              <DiscordLogoIcon />
              <span className="ml-2">Sign in with Discord</span>
            </Button>
          </form>
          
          <form action={
            async function signInWithGoogle(formData: FormData) {
              'use server';
              const { signIn } = await import('@/auth');
              await signIn('google', { callbackUrl: '/' });
            }
          }>
            <Button type="submit" variant="outline">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="ml-2">Sign in with Google</span>
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
