import Link from "next/link";
import { auth } from "@/auth";
import { BrandIcon } from "@/lib/icons/brand-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import ModeToggle from "@/app/mode-toggle";
import { UserMenu } from "./user-menu";
import { unstable_ViewTransition as ViewTransition } from "react";

// not sure if the view transition is working

export interface NavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const navLinks: NavLink[] = [
  { label: "Resume", href: "/cv" },
];

const MAX_MOBILE_LINKS = 2;

const NavigationBar = async () => {
  const session = await auth();
  const mobileLinks = navLinks.slice(0, MAX_MOBILE_LINKS);
  const dropdownLinks = navLinks.slice(MAX_MOBILE_LINKS);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-6xl">
        {/* Section 1: Logo */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-foreground transition-colors hover:text-primary"
          >
            <BrandIcon />
            <span className="hidden sm:inline-block">Dr. Hoskinson</span>
          </Link>
        </div>
        {/* Section 2: Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <ViewTransition key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-primary text-foreground/60"
              >
                {link.label}
              </Link>
            </ViewTransition>
          ))}
        </div>
        {/* Mobile Links + Dropdown */}
        <div className="flex md:hidden items-center space-x-2 justify-center">
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/60 hover:text-foreground transition text-sm"
            >
              {link.label}
            </Link>
          ))}
          {dropdownLinks.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MenuIcon className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {dropdownLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {/* Section 3: User Profile & Theme */}
        <div className="flex items-center gap-4">
          <UserMenu user={session?.user} />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
