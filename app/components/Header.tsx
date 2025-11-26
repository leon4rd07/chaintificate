// components/Header.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button"; // Import the custom Button component

const Header: React.FC = () => {
  const LOGO_SRC = "/logo.png";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#2979FF] shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Left Side: Logo + Nav */}
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center">
            <Image
              src={LOGO_SRC}
              alt="Chaintificate Logo"
              width={50}
              height={50}
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-white text-sm font-bold tracking-wide uppercase">
            <Link
              href="/"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              href="/job-market"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Job Market
            </Link>
            <Link
              href="/about-us"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              About Us
            </Link>
          </nav>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white font-semibold">
            <Link href="/login/student">LOG IN</Link>
          </Button>
          <Button asChild className="bg-[#4DCEFF] hover:bg-[#0092FF] text-white rounded-full px-8 font-bold shadow-md">
            <Link href="/register/student">REGISTER</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
