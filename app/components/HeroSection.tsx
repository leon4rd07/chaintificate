
import React from "react";
import { Search, Link as LinkIcon } from "lucide-react"; // Re-add LinkIcon

const HeroSection: React.FC = () => {
  return (
    <section className="relative text-center pt-24 pb-32 overflow-hidden">
      {/* Background Illustration */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('https://img.freepik.com/free-photo/friends-using-laptop-learn-study-session_23-2149285399.jpg?ga=GA1.1.1471941365.1762528201&semt=ais_hybrid&w=740&q=80')" }}
      >
        <div className="absolute inset-0 w-full h-full bg-black opacity-50"></div>
      </div>
      <div className="absolute inset-0 w-full h-full backdrop-blur-sm"></div>

      <div className="relative z-10">
        <h1 className="text-[48px] font-extrabold mb-4 text-white tracking-tight drop-shadow-lg">
          Welcome to <span className="text-[#4DCEFF]">Chaintificate</span>
        </h1>
        <p className="text-xl text-gray-200 mb-16 max-w-2xl mx-auto drop-shadow-md">
          Verify blockchain certificates instantly or manage your credentials
          securely
        </p>

        {/* Re-introducing the search input and verify button */}
        <div className="max-w-xl mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 mt-8">
          <h3 className="text-2xl font-bold mb-3 text-white">
            Search Certificate By Link
          </h3>
          <p className="text-md text-gray-300 mb-8">
            Enter a blockchain link to verify any certificate instantly
          </p>

          <div className="relative mb-6">
            <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300" />
            <input
              type="text"
              placeholder="Paste Blockchain Certificate link here..."
              className="w-full py-4 pl-12 pr-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4DCEFF] transition-all duration-300"
            />
          </div>

          <button className="flex items-center justify-center w-full bg-[#0092FF] hover:bg-[#007ACF] text-white font-bold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
            <Search className="h-6 w-6 mr-3" />
            Verify Certificate
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
