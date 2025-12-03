"use client";

import React from "react";
import { useParams } from "next/navigation";
import Header from "../../../../components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useGetCollectionDetail } from "../../../../../hooks/useCertificate";
import { Calendar, FileText, Hash, ArrowLeft, Copy, Plus } from "lucide-react";
import Link from "next/link";

export default function CollectionDetailPage() {
    const params = useParams();
    const address = params.address as string;
    const { collection, isLoading, error } = useGetCollectionDetail(address);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You might want to add a toast notification here
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex items-center justify-center h-64">
                        <p className="text-gray-500">Loading collection details...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error || !collection) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                        <p className="text-red-500">Error: {error || "Collection not found"}</p>
                        <Link href="/institute/dashboard">
                            <Button variant="outline">Back to Dashboard</Button>
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Back Button */}
                <div className="mb-6">
                    <Link href="/institute/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Link>
                </div>

                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{collection.name}</h1>
                            <p className="text-gray-500 max-w-2xl">{collection.description}</p>
                        </div>
                        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-blue-900">
                                {collection.certificates?.length || 0} Certificates Issued
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Link href={`/institute/create/collection/${address}`}>
                            <Button className="bg-[#0092FF] hover:bg-[#007ACF] text-white font-semibold px-6 py-2 rounded-lg shadow-md flex items-center gap-2">
                                <Plus className="h-5 w-5" /> Mint New Certificate
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Details Section - Merged Card */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <Hash className="h-5 w-5 text-gray-500" />
                            Collection Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contract Info */}
                        <div>
                            <label className="text-sm font-medium text-gray-500 block mb-2">Contract Address</label>
                            <div className="flex items-center gap-2">
                                <code className="bg-gray-100 px-3 py-2 rounded-md text-sm font-mono text-gray-800 break-all border border-gray-200 w-full">
                                    {collection.address}
                                </code>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0"
                                    onClick={() => copyToClipboard(collection.address)}
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Metadata */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500 block mb-1">Created At</label>
                                <p className="text-gray-900 font-medium">
                                    {new Date(collection.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 block mb-1">Collection ID</label>
                                <p className="text-gray-900 font-mono text-sm truncate" title={collection.id}>{collection.id}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Certificates List */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Issued Certificates</h2>
                        <span className="text-sm text-gray-500">{collection.certificates?.length || 0} items</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {collection.certificates?.map((cert: any) => (
                            <Card key={cert.id} className="overflow-hidden hover:shadow-md transition-all border-gray-200 group">
                                <CardContent className="p-0">
                                    <div className="flex flex-col sm:flex-row h-full">
                                        {/* Image Thumbnail */}
                                        <div className="w-full sm:w-48 h-48 sm:h-auto bg-gray-100 relative shrink-0 border-r border-gray-100">
                                            <img
                                                src={cert.tokenUri.startsWith('ipfs://')
                                                    ? cert.tokenUri.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')
                                                    : cert.tokenUri}
                                                alt={cert.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                                                }}
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col justify-center">
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{cert.name}</h3>
                                                    <p className="text-sm text-gray-500 mt-1">Token ID: <span className="font-mono text-gray-700">#{cert.tokenId}</span></p>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(cert.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto pt-4 border-t border-gray-50">
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Recipient Name</p>
                                                    <p className="text-sm font-medium text-gray-900">{cert.student?.name || 'Unknown'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Wallet Address</p>
                                                    <code className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-700 font-mono block w-fit">
                                                        {cert.student?.wallet ? `${cert.student.wallet.substring(0, 6)}...${cert.student.wallet.substring(cert.student.wallet.length - 4)}` : 'Unknown'}
                                                    </code>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {(!collection.certificates || collection.certificates.length === 0) && (
                            <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
                                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No certificates issued yet</h3>
                                <p className="text-gray-500 mt-1 max-w-sm mx-auto">Start minting certificates to see them listed here.</p>
                                <Link href={`/institute/create/collection/${address}`} className="mt-6 inline-block">
                                    <Button variant="outline">Mint Your First Certificate</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
