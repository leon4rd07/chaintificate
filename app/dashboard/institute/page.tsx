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
    Plus,
    Users,
    Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useGetAllCertificateCollection } from "../../../hooks/useCertificate";

// --- COMPONENTS ---

const CollectionCard: React.FC<{
    address: string;
    name: string;
    description: string;
    count: number;
    createdAt: string;
    type: string;
    index: number;
}> = ({ address, name, description, count, createdAt, type, index }) => {
    return (
        <Card
            className="group relative overflow-hidden border-0 bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row h-full">
                    {/* Icon/Image Section */}
                    <div className="sm:w-32 h-32 sm:h-auto relative bg-blue-50/50 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-gray-100">
                        <div className="p-4 rounded-full bg-white shadow-sm text-blue-500 group-hover:scale-110 transition-transform duration-300">
                            {type === 'Degree' ? <Award className="w-8 h-8" /> : <FileText className="w-8 h-8" />}
                        </div>
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-blue-700 shadow-sm">
                            {type}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6 flex flex-col justify-between relative z-10">
                        <div className="space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold font-space text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {name}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-medium flex items-center mt-1 line-clamp-2">
                                        {description}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                    <Calendar className="w-4 h-4 mr-2 text-cyan-500" />
                                    Created {new Date(createdAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 text-blue-700 font-semibold">
                                    <Users className="w-4 h-4 mr-2" />
                                    {count} Issued
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                            <Link href={`/collection/${address}`}>
                                <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors group/btn">
                                    View Details
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

export default function InstituteDashboardPage() {
    const [page, setPage] = useState(1);
    const [activeTab, setActiveTab] = useState<"All" | "Certificate" | "Degree">("All");

    // Using the hook with the correct parameters
    const { collections, pagination, isLoading, error } = useGetAllCertificateCollection(page, 10, activeTab);

    // Calculate stats
    const totalIssued = useMemo(() => {
        if (!collections) return 0;
        return collections.reduce((acc: number, curr: any) => acc + (curr._count?.certificates || 0), 0);
    }, [collections]);

    const activeTypes = pagination?.total || 0;

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans pb-20">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 animate-fade-in-down gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 font-space tracking-tight">
                            Institute Dashboard
                        </h1>
                        <p className="text-lg text-gray-500 mt-2 max-w-2xl">
                            Manage your academic collections, issue credentials, and track institutional performance on the blockchain.
                        </p>
                    </div>
                    <Link href="/collection/create">
                        <Button className="bg-[#0092FF] hover:bg-[#007ACF] text-white font-semibold px-6 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5">
                            <Plus className="h-5 w-5" />
                            Create New Collection
                        </Button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <StatCard
                        title="Total Certificates Issued"
                        value={totalIssued}
                        icon={<FileText className="h-6 w-6 text-white" />}
                        gradient="bg-gradient-to-br from-blue-500 to-blue-700"
                        delay={0}
                        subtitle="Across visible collections"
                    />
                    <StatCard
                        title="Active Collections"
                        value={activeTypes}
                        icon={<Activity className="h-6 w-6 text-white" />}
                        gradient="bg-gradient-to-br from-cyan-500 to-blue-600"
                        delay={100}
                        subtitle="Total Types"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content - Collection List */}
                    <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>

                        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                            <h2 className="text-2xl font-bold font-space text-gray-900">
                                My Collections
                            </h2>

                            <div className="flex p-1 bg-gray-100/80 backdrop-blur-sm rounded-xl self-start sm:self-auto">
                                {(["All", "Certificate", "Degree"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => { setActiveTab(tab); setPage(1); }}
                                        className={`
                                            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                            ${activeTab === tab
                                                ? "bg-white text-blue-600 shadow-sm"
                                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"}
                                        `}
                                    >
                                        {tab === "All" ? "All" : tab + "s"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            {isLoading ? (
                                // Loading Skeleton
                                [1, 2, 3].map((i) => (
                                    <div key={i} className="h-48 bg-gray-200 rounded-2xl animate-pulse" />
                                ))
                            ) : error ? (
                                <div className="text-center py-12 bg-white rounded-2xl border border-red-100">
                                    <p className="text-red-500 font-medium">Error: {error}</p>
                                </div>
                            ) : collections.length > 0 ? (
                                <>
                                    {collections.map((collection: any, index: number) => (
                                        <CollectionCard
                                            key={collection.address}
                                            address={collection.address}
                                            name={collection.name}
                                            description={collection.description}
                                            count={collection._count?.certificates || 0}
                                            createdAt={collection.createdAt}
                                            type={collection.type}
                                            index={index}
                                        />
                                    ))}

                                    {/* Pagination Controls */}
                                    {pagination && pagination.totalPages > 1 && (
                                        <div className="flex justify-center mt-6 gap-2">
                                            <Button
                                                variant="outline"
                                                disabled={pagination.page <= 1}
                                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                                className="rounded-xl"
                                            >
                                                Previous
                                            </Button>
                                            <span className="flex items-center px-4 text-sm font-medium text-gray-600">
                                                Page {pagination.page} of {pagination.totalPages}
                                            </span>
                                            <Button
                                                variant="outline"
                                                disabled={pagination.page >= pagination.totalPages}
                                                onClick={() => setPage(p => p + 1)}
                                                className="rounded-xl"
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                                    <div className="bg-blue-50 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                                        <FileText className="h-10 w-10 text-blue-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">No collections found</h3>
                                    <p className="text-gray-500 mt-1">
                                        {activeTab !== "All" ? `No ${activeTab.toLowerCase()} collections found.` : "Create your first collection to get started."}
                                    </p>
                                    {activeTab === "All" && (
                                        <Link href="/collection/create" className="mt-4 inline-block">
                                            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                                                Create Collection
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Promo/Info */}
                    <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        {/* Promo / Info Card */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold font-space mb-2">Verified Issuer</h3>
                                <p className="text-gray-300 text-sm mb-4">
                                    As a verified institute, all certificates you issue are cryptographically signed and permanently recorded on the blockchain.
                                </p>
                                <button className="text-xs font-bold text-blue-300 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1">
                                    Learn about verification <ExternalLink className="w-3 h-3" />
                                </button>
                            </div>
                            {/* Decorative circle */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl" />
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-green-500" />
                                Quick Tips
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                                    Use clear, descriptive names for your collections.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                                    Certificates are immutable once issued. Double check details.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                                    You can verify any certificate using the public verification tool.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
