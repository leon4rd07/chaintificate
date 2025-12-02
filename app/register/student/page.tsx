"use client";

import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const BACKGROUND_IMAGE_URL = "/login.png";

export default function StudentRegisterPage() {
  const { address } = useAccount();
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    setLoading(true);
    try {
      const response = await fetch("/api/register/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          wallet: address,
        }),
      });

      if (response.ok) {
        router.push("/student/dashboard");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
    } finally {
      setLoading(false);
    }
  };

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

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md -space-y-px">
                <div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#2979FF] focus:border-[#2979FF] focus:z-10 sm:text-base"
                    placeholder="Username"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    disabled
                    value={address || "Connect Wallet"}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-500 bg-gray-100 rounded-lg focus:outline-none sm:text-base"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading || !address}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-[#2979FF] hover:bg-[#2563D0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2979FF] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Registering..." : "Register"}
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
