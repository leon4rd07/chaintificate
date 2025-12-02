"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Upload, ArrowLeft, Plus, Layers } from "lucide-react";

export default function CreateCertificatePage() {
    const [dragActive, setDragActive] = useState(false);
    const [activeTab, setActiveTab] = useState("mint"); // "mint" | "collection"

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // Handle file upload here
            console.log("File dropped:", e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // Handle file upload here
            console.log("File selected:", e.target.files[0]);
        }
    };

    const handleCreateCollection = () => {
        console.log("Create collection clicked");
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Breadcrumb / Back Navigation */}
                <div className="mb-8">
                    <Link href="/institute/dashboard" className="text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-colors w-fit">
                        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                    </Link>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Certificate Management</h1>
                    <p className="text-gray-500 mt-1">Mint new certificates or create new collections</p>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mb-8 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab("mint")}
                        className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === "mint"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Mint Certificate
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab("collection")}
                        className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === "collection"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Layers className="h-4 w-4" />
                            Create Collection
                        </div>
                    </button>
                </div>

                {/* Content Area */}
                {activeTab === "mint" ? (
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                            {/* Left Column: Upload Area */}
                            <div
                                className={`flex flex-col items-center justify-center h-80 md:h-full min-h-[320px] bg-white border-2 border-dashed rounded-xl transition-colors cursor-pointer relative
                    ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleChange}
                                    accept="image/*,.pdf"
                                />
                                <div className="flex flex-col items-center text-gray-400">
                                    <Upload className="h-16 w-16 mb-4 text-gray-300" />
                                    <p className="text-lg font-medium text-gray-400">Upload Certificate</p>
                                    <p className="text-sm text-gray-300 mt-2">Drag & drop or click to browse</p>
                                </div>
                            </div>

                            {/* Right Column: Form */}
                            <div className="flex flex-col justify-center space-y-6">

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500">Title</label>
                                    <Input
                                        placeholder="e.g. Advanced Web Development"
                                        className="bg-white border-gray-200 focus:border-blue-500 h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500">Nama Penerima</label>
                                    <Input
                                        placeholder="e.g. John Doe"
                                        className="bg-white border-gray-200 focus:border-blue-500 h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500">Tanggal Pengesahan</label>
                                    <Input
                                        type="date"
                                        className="bg-white border-gray-200 focus:border-blue-500 h-12"
                                    />
                                </div>

                                <div className="pt-8 flex justify-end">
                                    <Button className="bg-[#007BFF] hover:bg-[#0056b3] text-white font-bold px-12 py-6 text-lg shadow-md transition-all rounded-lg w-full sm:w-auto">
                                        Minting
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-gray-100 max-w-3xl mx-auto">
                        <div className="space-y-6">
                            <div className="border-b border-gray-100 pb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Create New Collection</h2>
                                <p className="text-gray-500 mt-1">Deploy a new smart contract for a certificate series</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Collection Name</label>
                                    <Input
                                        placeholder="e.g. University of Technology 2024 Graduates"
                                        className="bg-white border-gray-200 focus:border-blue-500 h-12"
                                    />
                                    <p className="text-xs text-gray-400">This will be the name of the NFT collection on the blockchain.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Symbol</label>
                                    <Input
                                        placeholder="e.g. UOT24"
                                        className="bg-white border-gray-200 focus:border-blue-500 h-12 uppercase"
                                        maxLength={5}
                                    />
                                    <p className="text-xs text-gray-400">Short identifier for the collection (max 5 chars).</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        className="flex min-h-[120px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Describe the purpose of this certificate collection..."
                                    />
                                </div>
                            </div>

                            <div className="pt-8 flex justify-end">
                                <Button
                                    onClick={handleCreateCollection}
                                    className="bg-[#007BFF] hover:bg-[#0056b3] text-white font-bold px-8 py-6 text-lg shadow-md transition-all rounded-lg w-full sm:w-auto"
                                >
                                    Create Collection
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
