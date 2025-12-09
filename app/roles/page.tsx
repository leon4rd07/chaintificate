'use client';

import React from "react";
import Link from "next/link";
import Header from "../components/Header";
import { GraduationCap, Landmark } from "lucide-react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RoleCard: React.FC<{
  Icon: React.ElementType;
  title: string;
  description: string;
  href: string;
}> = ({ Icon, title, description, href }) => {
  return (
    <Link
      href={href}
      className="flex flex-col items-center p-8 border border-gray-200 rounded-xl w-64 h-56 text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-[#2979FF] bg-white shadow-md"
    >
      <div className="p-4 bg-[#F2F8FF] border border-[#D5E8FF] rounded-xl mb-6">
        <Icon className="h-10 w-10 text-[#2979FF]" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 leading-snug">{description}</p>
    </Link>
  );
};

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkRegistration = async () => {
      if (isConnected && address) {
        try {
          const response = await fetch(`/api/check-wallet?wallet=${address}`);
          const data = await response.json();

          if (data.exists) {
            if (data.role === 'student') {
              router.push('/dashboard/student');
            } else if (data.role === 'institute') {
              router.push('/dashboard/institute');
            }
          }
        } catch (error) {
          console.error("Error checking registration:", error);
        } finally {
          setChecking(false);
        }
      } else {
        setChecking(false);
      }
    };

    checkRegistration();
  }, [address, isConnected, router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          {/* Optional: Add a spinner here if desired */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <div className="flex flex-col items-center justify-start pt-28 min-h-[calc(100vh-69px)] bg-white">
        <h1 className="text-[32px] font-bold mb-3 text-gray-900">
          Choose Your Role
        </h1>
        <p className="text-lg text-gray-600 mb-16">
          Select how you want to use Certificate
        </p>

        <div className="flex space-x-12">
          <RoleCard
            Icon={GraduationCap}
            title="Student"
            description="View and manage your certificates and degrees"
            href="/register/student"
          />
          <RoleCard
            Icon={Landmark}
            title="Institute"
            description="Create and manage certificates for students"
            href="/register/institute"
          />
        </div>
      </div>
    </div>
  );
}
