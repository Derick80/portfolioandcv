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
import SignIn from "./sign-in";
import ModeToggle from "@/app/mode-toggle";
import { UserMenu } from "./user-menu";

export interface NavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Resume", href: "/cv" },
  { label: "Blog", href: "/blog" },
];

const MAX_MOBILE_LINKS = 2;

const NavigationBar = async () => {
  const session = await auth();
  const mobileLinks = navLinks.slice(0, MAX_MOBILE_LINKS);
  const dropdownLinks = navLinks.slice(MAX_MOBILE_LINKS);

  return (
    <nav className="w-full max-w-7xl mx-auto bg-primary-foreground  border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Section 1: Logo */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            {/* Replace with your Logo/Icon */}
            <BrandIcon />
          </Link>
        </div>
        {/* Section 2: Navigation Links */}
        <div className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400"
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Mobile Links + Dropdown */}
        <div className="flex md:hidden items-center space-x-2 justify-center">
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition text-sm"
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
        {/* Section 3: User Profile */}
        <div className=" md:flex items-center space-x-4">
          <UserMenu user={session?.user} />
        </div>
        {/* Section 4: Theme Toggle */}
        <div className="hidden md:flex items-center">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
