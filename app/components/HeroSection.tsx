
import React, { useState } from "react";
import { Search, Link as LinkIcon, ArrowUpRight } from "lucide-react";
import { useVerify } from "@/hooks/useCertificate";

const HeroSection: React.FC = () => {
  const [tokenUri, setTokenUri] = useState("");
  const { verifyCertificate, isLoading } = useVerify();

  const handleVerify = async () => {
    if (!tokenUri) return;
    try {
      await verifyCertificate(tokenUri);
    } catch (error) {
      // Error handling is already done in the hook via toast
      console.error("Verification error:", error);
    }
  };

  return (
    <section className="relative h-[calc(100vh-80px)] flex flex-col justify-end pb-12 overflow-hidden">
      {/* Background Illustration */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('https://img.freepik.com/free-photo/friends-using-laptop-learn-study-session_23-2149285399.jpg?ga=GA1.1.1471941365.1762528201&semt=ais_hybrid&w=740&q=80')" }}
      >
        <div className="absolute inset-0 w-full h-full bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Text Area */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tight">
            Secure and <br />
            verifiable <br />
            certificate tracker
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-md text-right font-medium leading-relaxed">
            An essential tool for global universities, students, and employers to verify credentials instantly.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full bg-white rounded-full p-2 md:p-3 flex items-center shadow-2xl transform transition-all hover:scale-[1.005]">
          <div className="pl-6 pr-4 hidden sm:block">
            <LinkIcon className="w-6 h-6 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Paste Blockchain Certificate link here..."
            className="flex-grow bg-transparent text-gray-800 placeholder-gray-400 text-lg md:text-xl font-bold focus:outline-none px-4"
            value={tokenUri}
            onChange={(e) => setTokenUri(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            suppressHydrationWarning
          />
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className={`flex items-center gap-2 bg-[#0092FF] text-white rounded-full px-8 py-4 font-bold text-lg hover:bg-[#007ACF] transition-colors shadow-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span>VERIFYING...</span>
            ) : (
              <>
                <span>VERIFY</span>
                <ArrowUpRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
