"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import { FileText, GraduationCap, Award, Clock, Activity, PieChart as PieChartIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

// --- MOCK DATA ---
const degreesData: any[] = [];

// Chart Data
const chartData = [
  { name: "Development", value: 3, color: "#0088FE" },
  { name: "Design", value: 1, color: "#00C49F" },
  { name: "Degree", value: 2, color: "#FFBB28" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CertificateCard: React.FC<{
  id: string;
  imageUrl?: string;
  title: string;
  institute: string;
  date: string;
  isFeatured?: boolean;
  category?: string;
}> = ({ id, imageUrl, title, institute, date, isFeatured = false, category }) => {
  return (
    <Card className={`transition-all duration-300 hover:shadow-lg border border-gray-200 bg-white ${isFeatured ? 'ring-1 ring-blue-500' : ''}`}>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

          {/* Image */}
          {imageUrl && (
            <div className="flex-shrink-0">
              <img src={imageUrl} alt={title} className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-100" />
            </div>
          )}

          {/* Left Side: Info */}
          <div className="flex-grow space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              {isFeatured && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                  Featured
                </span>
              )}
            </div>

            <div className="text-sm text-gray-500 space-y-1">
              <p className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Issuer:</span> {institute}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Issued:</span> {date}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Category:</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">{category || "General"}</span>
              </p>
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="flex-shrink-0">
            <Link href={`/dashboard/student/certificate/${id}`}>
              <button className="bg-[#0092FF] hover:bg-[#007ACF] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors shadow-sm whitespace-nowrap">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  colorClass?: string;
}> = ({ title, value, icon, trend, colorClass = "bg-white" }) => (
  <Card className={`${colorClass} border-none shadow-md hover:shadow-lg transition-shadow`}>
    <CardContent className="p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        {trend && <p className="text-xs text-green-500 mt-1 font-medium">{trend}</p>}
      </div>
      <div className="p-3 bg-blue-50 rounded-full text-blue-600">
        {icon}
      </div>
    </CardContent>
  </Card>
);

import { useAccount } from "wagmi";
import { useGetStudentCertificates } from "../../../hooks/useStudent";

// ... (keep existing imports)

export default function StudentDashboardPage() {
  const { address } = useAccount();
  const { data: certificates, isLoading } = useGetStudentCertificates(address);

  const [activeTab, setActiveTab] = useState<"Certificate" | "Degree">("Certificate");

  const certificatesData = certificates?.map((cert) => ({
    id: cert.id,
    title: cert.name,
    institute: cert.collection.institution?.name || cert.collection.name,
    date: new Date(cert.createdAt).toLocaleDateString(),
    imageUrl: cert.image || cert.tokenUri,
    isFeatured: false, // You might want to add logic for this later
    category: cert.collection.type || "General",
  })) || [];

  const currentData = certificatesData.filter(cert => cert.category === activeTab);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back, Student! Here's your academic portfolio.</p>
        </div>

        {/* Monitoring Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Certificates"
            value={certificatesData.length}
            icon={<Award className="h-6 w-6" />}
            trend="+2 this month"
          />
          <StatCard
            title="Total Degrees"
            value={degreesData.length}
            icon={<GraduationCap className="h-6 w-6" />}
          />
          <StatCard
            title="Expiring Soon"
            value="1"
            icon={<Clock className="h-6 w-6 text-orange-500" />}
            trend="Renew required"
          />
          <StatCard
            title="Verification Requests"
            value="5"
            icon={<Activity className="h-6 w-6 text-purple-500" />}
            trend="3 Pending"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Charts Section */}
          <Card className="lg:col-span-1 shadow-md h-fit">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                <PieChartIcon className="h-5 w-5 mr-2 text-blue-500" />
                Credential Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area (Tabs + List) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">My Credentials</h2>
                <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab("Certificate")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "Certificate"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Certificates
                  </button>
                  <button
                    onClick={() => setActiveTab("Degree")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "Degree"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Degrees
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {currentData.map((cert, index) => (
                  <CertificateCard
                    key={index}
                    id={cert.id}
                    title={cert.title}
                    institute={cert.institute}
                    date={cert.date}
                    imageUrl={cert.imageUrl}
                    isFeatured={cert.isFeatured}
                    category={cert.category}
                  />
                ))}

                {currentData.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-gray-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">No {activeTab} found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
