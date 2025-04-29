
import Link from "next/link"
import CldImage from "./client-cloudinary";
import { auth } from "@/auth";




export interface NavLink {
    label: string;
    href: string;
    icon?: React.ReactNode;
  }

  const navLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    {label: 'Resume', href: '/cv'},
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    
  ];


  
  interface NavBarProps {
    user?: {
      name: string;
      image?: string;
      imageUrl?: string;
    };
  }
  
  const MAX_MOBILE_LINKS = 2


const NavigationBar   = async (
) => {
const session = await auth();
if(!session) {
    return null}
    return(
        <nav className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Section 1: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              {/* Replace with your Logo/Icon */}
              MyApp
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
                {/* Section 3: User Profile */}
                <div className="hidden md:flex items-center space-x-4">
                    {session && (
                        <>
                            <CldImage
                            key={session.user?.id}
                            //@ts-expect-error need to fix this 
                                src={session.user?.image || session.user?.imageUrl || '/asset/images/placeholder-user.jpg'}
                                alt='/asset/images/placeholder-user.jpg'
                                className="w-8 h-8 rounded-full"
                                width={32}
                                height={32}
                            />
                            <span className="text-gray-900 dark:text-white">{session.user?.name}</span>
                        </>
                    )}

                    </div>
          </div>
          </nav>
    
    )
}

export default NavigationBar