"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import { ArrowLeft, ExternalLink, ShieldCheck, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { useGetCertificateById } from "@/hooks/useStudent";
import { useState } from "react";

export default function CertificateDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: certificate, isLoading, error } = useGetCertificateById(id);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (certificate?.tokenUri) {
            navigator.clipboard.writeText(certificate.tokenUri);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
                <Header />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (error || !certificate) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
                <Header />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-red-500">
                    Failed to load certificate details.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Back Button */}
                <Link href="/dashboard/student" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Dashboard
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Image */}
                    <div className="space-y-6">
                        <Card className="overflow-hidden border-2 border-gray-100 shadow-md">
                            <CardContent className="p-0 bg-gray-50 flex items-center justify-center min-h-[400px]">
                                {certificate.image ? (
                                    <img
                                        src={certificate.image}
                                        alt={certificate.name}
                                        className="w-full h-full object-contain max-h-[600px]"
                                    />
                                ) : (
                                    <div className="text-gray-400 flex flex-col items-center">
                                        <ShieldCheck className="h-20 w-20 mb-4 opacity-20" />
                                        <span>No Preview Available</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Details */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide 
                                    ${certificate.collection.type === "Degree" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                                    {certificate.collection.type || "Certificate"}
                                </span>
                                <span className="text-sm text-gray-500">Issued on {new Date(certificate.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4">{certificate.name}</h1>
                            <p className="text-lg text-gray-600 font-medium">
                                Issued by <span className="text-gray-900">{certificate.collection.institution?.name || certificate.collection.name}</span>
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                            <h3 className="font-semibold text-gray-900">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {certificate.collection.description || "No description provided."}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                            <h3 className="font-semibold text-gray-900">Blockchain Verification</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Token ID</p>
                                    <p className="font-mono text-sm text-gray-700 bg-gray-50 p-2 rounded">{certificate.tokenId}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Collection Address</p>
                                    <p className="font-mono text-sm text-gray-700 bg-gray-50 p-2 rounded truncate" title={certificate.collection.address}>
                                        {certificate.collection.address}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 mt-4">
                                <button
                                    onClick={handleCopy}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                >
                                    {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                                    {copied ? "Copied Link!" : "Copy Verification Link"}
                                </button>

                                <a
                                    href={`https://base-sepolia.blockscout.com/address/${certificate.collection.address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    View on Blockscout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
