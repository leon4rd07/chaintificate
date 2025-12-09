"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Plus, FileText, Users, Activity } from "lucide-react";
import { useGetAllCertificateCollection } from "../../../hooks/useCertificate";

const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: string;
}> = ({ title, value, icon, trend }) => (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
                {trend && <p className="text-xs text-green-600 mt-1 font-medium">{trend}</p>}
            </div>
            <div className="p-3 bg-gray-50 rounded-full">
                {icon}
            </div>
        </CardContent>
    </Card>
);

export default function InstituteDashboardPage() {
    const [page, setPage] = useState(1);
    const [activeTab, setActiveTab] = useState<"Certificate" | "Degree">("Certificate");
    const { collections, pagination, isLoading, error } = useGetAllCertificateCollection(page, 10, activeTab);

    // Calculate stats
    // Note: Total Certificates Issued is calculated from the current page only due to API limitations.
    const totalIssued = collections.reduce((acc: number, curr: any) => acc + (curr._count?.certificates || 0), 0);
    const activeTypes = pagination?.total || 0;

    const statsData = [
        {
            title: "Total Certificates Issued",
            value: totalIssued,
            icon: <FileText className="h-6 w-6 text-blue-600" />,
            trend: "Based on recent collections",
        },
        {
            title: "Active Certificate Types",
            value: activeTypes,
            icon: <Activity className="h-6 w-6 text-green-600" />,
            trend: "Total collections",
        },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Institute Dashboard</h1>
                        <p className="text-gray-500 mt-1">Manage your issued certificates and track performance.</p>
                    </div>
                    <Link href="/collection/create">
                        <Button className="bg-[#0092FF] hover:bg-[#007ACF] text-white font-semibold px-6 py-6 rounded-lg shadow-md flex items-center gap-2">
                            <Plus className="h-5 w-5" /> Create New Collection
                        </Button>
                    </Link>
                </div>

                {/* Monitoring Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {statsData.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                {/* Certificate Types List */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
                        <div className="flex space-x-2 bg-white p-1 rounded-lg border border-gray-200">
                            <button
                                onClick={() => { setActiveTab("Certificate"); setPage(1); }}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "Certificate"
                                    ? "bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-500"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                Certificates
                            </button>
                            <button
                                onClick={() => { setActiveTab("Degree"); setPage(1); }}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "Degree"
                                    ? "bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-500"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                Degrees
                            </button>
                        </div>
                    </div>

                    {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : collections.length === 0 ? (
                        <p className="text-gray-500">No certificate collections found.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {collections.map((collection: any) => (
                                <Card key={collection.address} className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Image Section - Placeholder */}
                                        {/* <div className="w-full md:w-48 h-48 md:h-auto relative bg-gray-100 flex items-center justify-center">
                                            <FileText className="h-12 w-12 text-gray-300" />
                                        </div> */}

                                        {/* Content Section */}
                                        <div className="flex-1 p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900">{collection.name}</h3>
                                                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                                                        {collection._count?.certificates || 0} Issued
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-4 line-clamp-2">{collection.description}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4 md:mt-0">
                                                <p className="text-sm text-gray-500">
                                                    Created: <span className="font-medium text-gray-700">{new Date(collection.createdAt).toLocaleDateString()}</span>
                                                </p>
                                                <Link href={`/collection/${collection.address}`}>
                                                    <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                                                        View Details
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="flex justify-center mt-6 gap-2">
                            <Button
                                variant="outline"
                                disabled={pagination.page <= 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                            >
                                Previous
                            </Button>
                            <span className="flex items-center px-4">Page {pagination.page} of {pagination.totalPages}</span>
                            <Button
                                variant="outline"
                                disabled={pagination.page >= pagination.totalPages}
                                onClick={() => setPage(p => p + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}
