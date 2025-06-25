'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-yellow-400 animate-spin-slow"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-yellow-300 text-xl sm:text-2xl font-extrabold">
            Artistly
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className={`text-white font-medium hover:underline ${pathname === "/" ? "underline underline-offset-4" : ""}`}>
            Home
          </Link>
          {/* <Link href="/Screens/ArtistListing" className={`text-white font-medium hover:underline ${pathname === "/artist-listing" ? "underline underline-offset-4" : ""}`}>
            Artists
          </Link> */}
          <Link href="/Screens/ManagerDashboard" className={`text-white font-medium hover:underline ${pathname === "/dashboard" ? "underline underline-offset-4" : ""}`}>
            Manager Dashboard
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Link href="/Screens/Onboarding">
            <button className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold">
              Become an Artist
            </button>
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link href="/Screens/Onboarding">
            <button className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-purple-50 transition">
              Become an Artist
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
