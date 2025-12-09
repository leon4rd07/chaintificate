"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useCreateCollection } from "../../../hooks/useCertificate";

export default function CreateCollectionPage() {
    // Collection Form State
    const [collectionName, setCollectionName] = useState("");
    const [collectionSymbol, setCollectionSymbol] = useState("");
    const [collectionDescription, setCollectionDescription] = useState("");
    const [collectionType, setCollectionType] = useState<"Certificate" | "Degree">("Certificate");

    const {
        createCertificateCollection,
        isWritePending,
        isConfirming,
        isApiPending,
        isConfirmed,
        error: hookError
    } = useCreateCollection();
    const router = useRouter();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Reset form on success
    useEffect(() => {
        if (isConfirmed && !isApiPending) {
            setCollectionName("");
            setCollectionSymbol("");
            setCollectionDescription("");
            setCollectionType("Certificate");
            router.push("/dashboard/institute");
        }
    }, [isConfirmed, isApiPending]);

    if (!mounted) {
        return null;
    }

    const handleCreateCollection = async () => {
        if (!collectionName || !collectionSymbol || !collectionDescription || !collectionType) {
            alert("Please fill in all fields");
            return;
        }
        try {
            await createCertificateCollection(collectionName, collectionSymbol, collectionDescription, collectionType);
        } catch (e) {
            console.error("Failed to create collection", e);
        }
    };

    const isLoading = isWritePending || isConfirming || isApiPending;

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Breadcrumb / Back Navigation */}
                <div className="mb-8">
                    <Link href="/dashboard/institute" className="text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-colors w-fit">
                        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                    </Link>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Create New Collection</h1>
                    <p className="text-gray-500 mt-1">Deploy a new smart contract for a certificate series</p>
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-gray-100 max-w-3xl mx-auto">
                    <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Collection Details</h2>
                            <p className="text-gray-500 mt-1">Enter the details for your new certificate collection</p>
                        </div>

                        {hookError && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                                {hookError.message}
                            </div>
                        )}

                        {isConfirmed && !isApiPending && (
                            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
                                Collection created successfully!
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Collection Name</label>
                                <Input
                                    placeholder="e.g. University of Technology 2024 Graduates"
                                    className="bg-white border-gray-200 focus:border-blue-500 h-12"
                                    value={collectionName}
                                    onChange={(e) => setCollectionName(e.target.value)}
                                    disabled={isLoading}
                                />
                                <p className="text-xs text-gray-400">This will be the name of the NFT collection on the blockchain.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Symbol</label>
                                <Input
                                    placeholder="e.g. UOT24"
                                    className="bg-white border-gray-200 focus:border-blue-500 h-12 uppercase"
                                    maxLength={5}
                                    value={collectionSymbol}
                                    onChange={(e) => setCollectionSymbol(e.target.value)}
                                    disabled={isLoading}
                                />
                                <p className="text-xs text-gray-400">Short identifier for the collection (max 5 chars).</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    className="flex min-h-[120px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Describe the purpose of this certificate collection..."
                                    value={collectionDescription}
                                    onChange={(e) => setCollectionDescription(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-gray-700">Type</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        onClick={() => setCollectionType("Certificate")}
                                        className={`cursor-pointer rounded-lg border p-4 flex items-center justify-center gap-2 transition-all ${collectionType === "Certificate"
                                            ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500 ring-offset-2"
                                            : "border-gray-200 hover:border-gray-300 bg-white text-gray-700"
                                            }`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${collectionType === "Certificate" ? "border-blue-500" : "border-gray-400"
                                            }`}>
                                            {collectionType === "Certificate" && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                                        </div>
                                        <span className="font-medium">Certificate</span>
                                    </div>

                                    <div
                                        onClick={() => setCollectionType("Degree")}
                                        className={`cursor-pointer rounded-lg border p-4 flex items-center justify-center gap-2 transition-all ${collectionType === "Degree"
                                            ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500 ring-offset-2"
                                            : "border-gray-200 hover:border-gray-300 bg-white text-gray-700"
                                            }`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${collectionType === "Degree" ? "border-blue-500" : "border-gray-400"
                                            }`}>
                                            {collectionType === "Degree" && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                                        </div>
                                        <span className="font-medium">Degree</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400">Select the type of credentials this collection will issue.</p>
                            </div>
                        </div>

                        <div className="pt-8 flex justify-end">
                            <Button
                                onClick={handleCreateCollection}
                                disabled={isLoading}
                                className="bg-[#007BFF] hover:bg-[#0056b3] text-white font-bold px-8 py-6 text-lg shadow-md transition-all rounded-lg w-full sm:w-auto flex items-center gap-2 justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        {isWritePending ? "Check Wallet..." : isConfirming ? "Confirming..." : "Syncing..."}
                                    </>
                                ) : (
                                    "Create Collection"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
