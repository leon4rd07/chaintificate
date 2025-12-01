// components/Header.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button"; // Import the custom Button component
import { ConnectButton } from '@rainbow-me/rainbowkit';
import WalletRedirect from "./WalletRedirect";

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
              href="/job-vacancies"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Job Vacancies
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
          <ConnectButton />
          <WalletRedirect />
        </div>
      </div>
    </header>
  );
};

export default Header;
