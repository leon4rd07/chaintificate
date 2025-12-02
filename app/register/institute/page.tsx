"use client";

import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const BACKGROUND_IMAGE_URL = "/institute.png";

export default function InstituteRegistrationPage() {
  const { address } = useAccount();
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    contact: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    setLoading(true);
    try {
      const response = await fetch("/api/register/institute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          wallet: address,
        }),
      });

      if (response.ok) {
        router.push("/institute/dashboard");
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
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 text-left">
              Register your Institute
            </h1>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Institute Name"
                className="w-full p-3 border border-gray-300 placeholder-gray-600 text-gray-800 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              />

              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows={3}
                className="w-full p-3 border border-gray-300 placeholder-gray-600 text-gray-800 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 resize-none"
              ></textarea>

              <input
                type="text"
                disabled
                value={address || "Connect Wallet"}
                placeholder="Wallet"
                className="w-full p-3 border border-gray-300 placeholder-gray-600 text-gray-500 bg-gray-100 rounded-lg mb-6 focus:outline-none transition duration-150"
              />

              <input
                type="text"
                name="contact"
                required
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact"
                className="w-full p-3 border border-gray-300 placeholder-gray-600 text-gray-800 rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              />

              <button
                type="submit"
                disabled={loading || !address}
                className="block w-full bg-blue-500 text-white font-bold p-3 rounded-lg hover:bg-blue-600 transition duration-150 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create"}
              </button>
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
