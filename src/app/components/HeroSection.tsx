
import React from "react";
import { Search, Link as LinkIcon } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="text-center pt-24 pb-16">
      <h1 className="text-[40px] font-extrabold mb-3 text-gray-800 tracking-tight">
        Welcome to{" "}
        <span className="text-[#4DCEFF] relative inline-block">
          Chaintificate
        </span>
      </h1>
      <p className="text-lg text-gray-600 mb-16">
        Verify blockchain certificates instantly or manage your credentials
        securely
      </p>

      <div className="max-w-xl mx-auto p-10 bg-white rounded-lg shadow-xl border border-gray-100">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Search Certificate By link
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Enter a blockchain link to verify any certificate instantly
        </p>

        <div className="relative mb-5">
          <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Paste Blockchain Certificate link here..."
            className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0092FF] focus:border-[#0092FF] transition-all duration-200 text-gray-700 placeholder:text-gray-400"
          />
        </div>

        <button className="flex items-center justify-center w-full bg-[#0092FF] hover:bg-[#007ACF] text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg text-base">
          <Search className="h-5 w-5 mr-2" />
          Verify Certificate
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
