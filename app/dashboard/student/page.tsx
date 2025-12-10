"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import {
  FileText,
  Award,
  Building2,
  Calendar,
  TrendingUp,
  PieChart as PieChartIcon,
  ExternalLink,
  Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useAccount } from "wagmi";
import { useGetStudentCertificates } from "../../../hooks/useStudent";

// --- CONSTANTS ---
const COLORS = ["#3B82F6", "#06B6D4", "#6366F1", "#0EA5E9", "#2563EB"]; // Blue/Cyan/Indigo palette

// --- COMPONENTS ---

const CertificateCard: React.FC<{
  id: string;
  imageUrl?: string;
  title: string;
  institute: string;
  date: string;
  category: string;
  index: number;
}> = ({ id, imageUrl, title, institute, date, category, index }) => {
  return (
    <Card
      className="group relative overflow-hidden border-0 bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row h-full">
          {/* Image Section */}
          <div className="sm:w-48 h-48 sm:h-auto relative bg-gray-100 overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                <FileText className="w-12 h-12" />
              </div>
            )}
            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-blue-700 shadow-sm">
              {category}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 flex flex-col justify-between relative z-10">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold font-space text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium flex items-center mt-1">
                    <Building2 className="w-4 h-4 mr-1.5 text-blue-400" />
                    {institute}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500 bg-gray-50 w-fit px-3 py-1.5 rounded-full border border-gray-100">
                <Calendar className="w-4 h-4 mr-2 text-cyan-500" />
                Issued on {date}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <Link href={`/dashboard/student/certificate/${id}`}>
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors group/btn">
                  View Credential
                  <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </Link>
            </div>
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
  subtitle?: string;
  gradient: string;
  delay?: number;
}> = ({ title, value, icon, subtitle, gradient, delay = 0 }) => (
  <div
    className={`animate-fade-in-up rounded-2xl p-6 text-white shadow-lg transform transition-all hover:scale-105 duration-300 ${gradient}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
        {icon}
      </div>
      {subtitle && (
        <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-medium">
          {subtitle}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-3xl font-bold font-space mb-1">{value}</h3>
      <p className="text-white/80 text-sm font-medium">{title}</p>
    </div>
  </div>
);

export default function StudentDashboardPage() {
  const { address } = useAccount();
  const { data, isLoading } = useGetStudentCertificates(address);

  // Combine and format data for global stats/charts
  const allCredentials = useMemo(() => {
    if (!data) return [];
    const certs = (data.certificates || []).map((c) => ({ ...c, type: "Certificate" }));
    const degrees = (data.degrees || []).map((d) => ({ ...d, type: "Degree" }));
    return [...certs, ...degrees];
  }, [data]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "certificate" | "degree">("all");

  // --- DERIVED STATE ---
  const stats = useMemo(() => {
    if (allCredentials.length === 0) return { total: 0, institutions: 0, latest: "N/A" };

    const uniqueInsts = new Set(allCredentials.map((c) => c.institution)).size;
    const sortedCerts = [...allCredentials].sort(
      (a, b) => new Date(b.mintingDate).getTime() - new Date(a.mintingDate).getTime()
    );
    const latestDate =
      sortedCerts.length > 0
        ? new Date(sortedCerts[0].mintingDate).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        : "N/A";

    return {
      total: allCredentials.length,
      institutions: uniqueInsts,
      latest: latestDate,
    };
  }, [allCredentials]);

  const chartData = useMemo(() => {
    if (allCredentials.length === 0) return [];

    const distribution: Record<string, number> = {};
    allCredentials.forEach((cert) => {
      const type = cert.type || "General";
      distribution[type] = (distribution[type] || 0) + 1;
    });

    return Object.entries(distribution).map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length],
    }));
  }, [allCredentials]);

  const filteredCertificates = useMemo(() => {
    if (!data) return [];

    let sourceList: typeof allCredentials = [];

    // Select source based on tab
    if (activeTab === "all") {
      sourceList = allCredentials;
    } else if (activeTab === "certificate") {
      sourceList = (data.certificates || []).map((c) => ({ ...c, type: "Certificate" }));
    } else if (activeTab === "degree") {
      sourceList = (data.degrees || []).map((d) => ({ ...d, type: "Degree" }));
    }

    return sourceList
      .filter((item) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.institution.toLowerCase().includes(searchLower)
        );
      })
      .map((item) => ({
        id: item.id,
        title: item.name,
        institute: item.institution,
        date: new Date(item.mintingDate).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        imageUrl: item.image || item.tokenUri,
        category: item.type,
      }));
  }, [data, allCredentials, activeTab, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans pb-20">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Page Header */}
        <div className="mb-12 animate-fade-in-down">
          <h1 className="text-4xl font-bold text-gray-900 font-space tracking-tight">
            Student Dashboard
          </h1>
          <p className="text-lg text-gray-500 mt-2 max-w-2xl">
            Track your academic achievements, manage your digital credentials, and showcase your verified success on the blockchain.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard
            title="Total Certificates"
            value={stats.total}
            icon={<Award className="h-6 w-6 text-white" />}
            gradient="bg-gradient-to-br from-blue-500 to-blue-700"
            delay={0}
            subtitle={stats.total > 0 ? "Growing Portfolio" : "Start Collecting"}
          />
          <StatCard
            title="Issuing Institutions"
            value={stats.institutions}
            icon={<Building2 className="h-6 w-6 text-white" />}
            gradient="bg-gradient-to-br from-cyan-500 to-blue-600"
            delay={100}
          />
          <StatCard
            title="Latest Achievement"
            value={stats.latest}
            icon={<TrendingUp className="h-6 w-6 text-white" />}
            gradient="bg-gradient-to-br from-sky-500 to-indigo-600"
            delay={200}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content - Certificate List */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>

            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
              <h2 className="text-2xl font-bold font-space text-gray-900">
                My Credentials
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                {/* Tabs */}
                <div className="flex p-1 bg-gray-100/80 backdrop-blur-sm rounded-xl self-start sm:self-auto">
                  {(["all", "certificate", "degree"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize
                        ${activeTab === tab
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"}
                      `}
                    >
                      {tab === "all" ? "All" : tab + "s"}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full transition-all bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {isLoading ? (
                // Loading Skeleton
                [1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-gray-200 rounded-2xl animate-pulse" />
                ))
              ) : filteredCertificates.length > 0 ? (
                filteredCertificates.map((cert, index) => (
                  <CertificateCard
                    key={cert.id}
                    {...cert}
                    index={index}
                  />
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                  <div className="bg-blue-50 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-10 w-10 text-blue-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">No certificates found</h3>
                  <p className="text-gray-500 mt-1">
                    {searchTerm ? "Try adjusting your search terms." : "You haven't earned any certificates yet."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Charts */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <Card className="border-0 shadow-lg bg-white overflow-hidden">
              <CardHeader className="border-b border-gray-50 pb-4">
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center font-space">
                  <PieChartIcon className="h-5 w-5 mr-2 text-blue-500" />
                  Credential Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {chartData.length > 0 ? (
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
                          stroke="none"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
                    No data to display
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Promo / Info Card (Static for now, but fits the theme) */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-lg font-bold font-space mb-2">Blockchain Verified</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Your certificates are secured on the blockchain, ensuring they are tamper-proof and verifiable instantly.
                </p>
                <button className="text-xs font-bold text-blue-300 hover:text-white transition-colors uppercase tracking-wider">
                  Learn more →
                </button>
              </div>
              {/* Decorative circle */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
