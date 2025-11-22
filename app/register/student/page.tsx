
import React from "react";
import Link from "next/link";
import Header from "../../components/Header"; 

const BACKGROUND_IMAGE_URL = "/login.png";

export default function StudentRegisterPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex min-h-[calc(100vh-69px)]">
        <div className="hidden lg:block w-1/2 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white"></div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-20 bg-white">
          <div className="w-full max-w-sm space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center lg:text-left">
              Register your account
            </h2>

            <form className="mt-8 space-y-6">
              <div className="rounded-md -space-y-px">
                <div>
                  <input
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#2979FF] focus:border-[#2979FF] focus:z-10 sm:text-base"
                    placeholder="Username"
                  />
                </div>

                <div className="pt-4">
                  <input
                    type="email"
                    required
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#2979FF] focus:border-[#2979FF] focus:z-10 sm:text-base"
                    placeholder="Email Address"
                  />
                </div>

                <div className="pt-4">
                  <input
                    type="password"
                    required
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#2979FF] focus:border-[#2979FF] focus:z-10 sm:text-base"
                    placeholder="Password"
                  />
                </div>

                <div className="pt-4">
                  <input
                    type="password"
                    required
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#2979FF] focus:border-[#2979FF] focus:z-10 sm:text-base"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-[#2979FF] hover:bg-[#2563D0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2979FF]"
                >
                  Register
                </button>
              </div>

              <div className="text-center text-sm pt-2">
                <Link
                  href="/login/student"
                  className="font-medium text-[#2979FF] hover:text-[#2563D0]"
                >
                  Login to your account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
