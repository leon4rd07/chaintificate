// components/Header.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button"; // Import the custom Button component

const Header: React.FC = () => {
  const LOGO_SRC = "/logo.png"; 

  return (
    <header className="sticky top-0 z-50 w-full bg-[#2979FF] shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src={LOGO_SRC}
            alt="Chaintificate Logo"
            width={50}
            height={50}
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-white text-base font-medium">
          <Link
            href="/"
            className="opacity-90 hover:opacity-100 transition-opacity duration-200"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="opacity-90 hover:opacity-100 transition-opacity duration-200"
          >
            Dashboard
          </Link>
          <Link
            href="/about-us"
            className="opacity-90 hover:opacity-100 transition-opacity duration-200"
          >
            About Us
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
           <Button asChild variant="outline" className="text-white border-white hover:bg-white hover:text-[#2979FF]">
            <Link href="/login/student">Login</Link>
          </Button>
          <Button asChild className="bg-[#4DCEFF] hover:bg-[#0092FF]">
            <Link href="/register/student">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
