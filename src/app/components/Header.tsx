// components/Header.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  const LOGO_SRC = "/logo.png"; 

  return (
    <header className="flex justify-between items-center py-4 px-6 md:px-12 lg:px-24 bg-[#2979FF] shadow-lg">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src={LOGO_SRC}
          alt="Chaintificate Logo"
          width={75}
          height={75}
        />
      </Link>

      <nav className="hidden md:flex space-x-10 text-white text-[16px] font-medium">
        <Link
          href="/"
          className="opacity-90 hover:opacity-100 transition-opacity duration-150"
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className="opacity-90 hover:opacity-100 transition-opacity duration-150"
        >
          Dashboard
        </Link>
        <Link
          href="/about-us"
          className="opacity-90 hover:opacity-100 transition-opacity duration-150"
        >
          About Us
        </Link>
      </nav>

      <button className="flex items-center space-x-2 bg-[#0092FF] hover:bg-[#007ACF] text-white font-semibold text-base py-2 px-5 rounded-full transition-colors duration-150 shadow-md">
        <div className="relative flex items-center justify-center">
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF00]"></span>{" "}
        </div>
        <span>Connect Wallet</span>
      </button>
    </header>
  );
};

export default Header;
