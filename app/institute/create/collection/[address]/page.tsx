"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../../../components/Header";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Upload, ArrowLeft, Loader2 } from "lucide-react";
import { useGetCollectionDetail, useCreateCertificate } from "../../../../../hooks/useCertificate";
import { usePinata } from "../../../../../hooks/usePinata";

export default function MintCertificatePage() {
    const params = useParams();
    const address = params.address as string;
    const { collection, isLoading, error } = useGetCollectionDetail(address);

    // Hooks must be called at the top level, before any early returns
    const { uploadImageAndMetadata, isUploading, error: pinataError } = usePinata();
    const { createCertificate, isWritePending, isConfirming, error: contractError } = useCreateCertificate();

    const [dragActive, setDragActive] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Form State
    const [recipientName, setRecipientName] = useState("");
    const [recipientWallet, setRecipientWallet] = useState("");
    const [issuanceDate, setIssuanceDate] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

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
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        // Create preview URL
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
    };

    const handleMint = async () => {
        if (!collection || !recipientName || !recipientWallet || !issuanceDate || !selectedFile) {
            alert("Please fill in all fields");
            return;
        }

        try {
            // 1. Construct Metadata Base
            const metadataBase = {
                name: collection.name,
                description: collection.description,
                attributes: [
                    {
                        trait_type: "created_at",
                        value: issuanceDate
                    },
                    {
                        trait_type: "recipient",
                        value: recipientName
                    },
                    {
                        trait_type: "issuer",
                        value: collection.institution?.name || "Unknown Institution"
                    }
                ]
            };

            // 2. Upload to Pinata (Image + Metadata)
            const uploadResult = await uploadImageAndMetadata(selectedFile, metadataBase);

            if (!uploadResult || !uploadResult.url) {
                throw new Error("Failed to upload metadata to IPFS");
            }

            const tokenURI = uploadResult.url;
            console.log("Metadata uploaded to IPFS:", tokenURI);

            // 3. Mint Certificate on Blockchain
            const tx = await createCertificate(address, recipientWallet, tokenURI, collection.name);
            console.log("Transaction sent:", tx);

            alert("Certificate minted successfully! Transaction Hash: " + tx);

        } catch (err: any) {
            console.error("Minting failed:", err);
            alert("Minting failed: " + (err.message || "Unknown error"));
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex justify-center items-center h-[60vh]">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </main>
            </div>
        );
    }

    if (error || !collection) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="text-center text-red-500">
                        Error: {error || "Collection not found"}
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Breadcrumb / Back Navigation */}
                <div className="mb-8">
                    <Link href={`/institute/dashboard/collection/${address}`} className="text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-colors w-fit">
                        <ArrowLeft className="h-4 w-4" /> Back to Collection
                    </Link>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Mint New Certificate</h1>
                    <p className="text-gray-500 mt-1">Issue a new certificate for <span className="font-semibold text-gray-900">{collection.name}</span></p>
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Left Column: Upload Area */}
                        <div
                            className={`group flex flex-col items-center justify-center h-80 md:h-full min-h-[320px] bg-white border-2 border-dashed rounded-xl transition-colors cursor-pointer relative overflow-hidden
                    ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                onChange={handleChange}
                                accept="image/*"
                            />

                            {previewUrl ? (
                                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-50 z-10">
                                    <img src={previewUrl} alt="Certificate Preview" className="max-w-full max-h-full object-contain p-4" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                        <p className="text-white font-medium px-4 py-2 rounded-full border border-white">Change Image</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                    <Upload className="h-16 w-16 mb-4 text-gray-300" />
                                    <p className="text-lg font-medium text-gray-400">Upload Certificate Image</p>
                                    <p className="text-sm text-gray-300 mt-2">Drag & drop or click to browse</p>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Form */}
                        <div className="flex flex-col justify-center space-y-6">

                            {/* Collection Info (Read-only) */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500">Certificate Name</label>
                                <Input
                                    value={collection.name}
                                    disabled
                                    className="bg-gray-50 border-gray-200 text-gray-600 h-12"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500">Description</label>
                                <textarea
                                    value={collection.description}
                                    disabled
                                    className="flex min-h-[80px] w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500">Issuer Name</label>
                                <Input
                                    value={collection.institution?.name || "Loading..."}
                                    disabled
                                    className="bg-gray-50 border-gray-200 text-gray-600 h-12"
                                />
                            </div>

                            {/* Input Fields */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Nama Penerima</label>
                                <Input
                                    placeholder="e.g. John Doe"
                                    className="bg-white border-gray-200 focus:border-blue-500 h-12"
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Wallet Address Penerima</label>
                                <Input
                                    placeholder="e.g. 0x123..."
                                    className="bg-white border-gray-200 focus:border-blue-500 h-12"
                                    value={recipientWallet}
                                    onChange={(e) => setRecipientWallet(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Tanggal Pengesahan</label>
                                <Input
                                    type="date"
                                    className="bg-white border-gray-200 focus:border-blue-500 h-12"
                                    value={issuanceDate}
                                    onChange={(e) => setIssuanceDate(e.target.value)}
                                />
                            </div>

                            <div className="pt-8 flex justify-end">
                                <Button
                                    onClick={handleMint}
                                    className="bg-[#007BFF] hover:bg-[#0056b3] text-white font-bold px-12 py-6 text-lg shadow-md transition-all rounded-lg w-full sm:w-auto"
                                >
                                    Minting (Prototype)
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
