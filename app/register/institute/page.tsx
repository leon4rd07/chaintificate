
import React from "react";
import Link from "next/link";
import Header from "../../components/Header";

const BACKGROUND_IMAGE_URL = "/institute.png";

export default function InstituteRegistrationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex min-h-[calc(100vh-69px)]">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 text-left">
              Register your Institute
            </h1>

            <form>
              <input
                type="text"
                placeholder="Institute Name"
                className="w-full p-3 border border-gray-300 placeholder-gray-600 text-gray-800 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              />

              <textarea
                placeholder="Description"
                rows={3}
                className="w-full p-3 border border-gray-300 placeholder-gray-600 text-gray-800 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 resize-none"
              ></textarea>

              <input
                type="text"
                placeholder="Wallet"
                className="w-full p-3 border border-gray-300 placeholder-gray-600 text-gray-800 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              />

              <input
                type="text"
                placeholder="Contact"
                className="w-full p-3 border border-gray-300 placeholder-gray-600 text-gray-800 rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              />

              <Link href="/institute/dashboard">
                <button
                  type="button"
                  className="w-full bg-blue-500 text-white font-bold p-3 rounded-lg hover:bg-blue-600 transition duration-150"
                >
                  Create
                </button>
              </Link>
            </form>
          </div>
        </div>

        <div className="hidden lg:block w-1/2 relative">
          {" "}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-l from-white/0 via-transparent to-white"></div>
        </div>
      </div>
    </div>
  );
}
