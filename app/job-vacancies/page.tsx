"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Search, MapPin, Bookmark, CheckSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { useJobVacancy } from "@/hooks/useJobVacancy";

const FilterSection = ({
    title,
    options,
    selectedOption,
    onSelect
}: {
    title: string,
    options: string[],
    selectedOption: string | undefined,
    onSelect: (option: string) => void
}) => (
    <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">{title}</h3>
        <div className="space-y-2">
            {options.map((option, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer group">
                    <div
                        className={`w-4 h-4 border rounded flex items-center justify-center group-hover:border-blue-500 ${selectedOption === option ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}
                        onClick={() => onSelect(option === selectedOption ? "" : option)}
                    >
                        {selectedOption === option && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="text-gray-600 text-sm group-hover:text-blue-600">{option}</span>
                </label>
            ))}
        </div>
    </div>
);

export default function JobMarketPage() {
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);

    const { data, isLoading, isError } = useJobVacancy(page, selectedCategory, selectedType);

    const handlePrevPage = () => {
        setPage((prev) => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        if (data?.meta && page < data.meta.lastPage) {
            setPage((prev) => prev + 1);
        }
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category === "" ? undefined : category);
        setPage(1); // Reset to page 1 when filter changes
    };

    const handleTypeSelect = (type: string) => {
        setSelectedType(type === "" ? undefined : type);
        setPage(1); // Reset to page 1 when filter changes
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
            <Header />

            {/* Search Bar Section */}
            <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                placeholder="Cari Nama Pekerjaan, Skill, dan Perusahaan"
                                className="pl-10 bg-gray-50 border-gray-200 h-12 text-base"
                            />
                        </div>
                        <div className="relative flex-grow md:max-w-md">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                placeholder="All Cities/Provinces"
                                className="pl-10 bg-gray-50 border-gray-200 h-12 text-base"
                            />
                        </div>
                        <Button className="bg-[#0092FF] hover:bg-[#007ACF] text-white font-bold px-8 h-12 text-base rounded-lg shadow-md">
                            CARI
                        </Button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Lowongan Kerja Terbaru</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Left Sidebar: Filters */}
                    <div className="hidden lg:block lg:col-span-1">

                        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                            <FilterSection
                                title="Kategori"
                                options={["Technology", "Business", "Health", "Education", "Entertainment"]}
                                selectedOption={selectedCategory}
                                onSelect={handleCategorySelect}
                            />
                            <hr className="my-4 border-gray-100" />
                            <FilterSection
                                title="Tipe Pekerjaan"
                                options={["FullTime", "PartTime"]}
                                selectedOption={selectedType}
                                onSelect={handleTypeSelect}
                            />
                        </div>
                    </div>

                    {/* Right Content: Job List */}
                    <div className="lg:col-span-3 space-y-4">
                        {isLoading ? (
                            <div className="text-center py-10">Loading...</div>
                        ) : isError ? (
                            <div className="text-center py-10 text-red-500">Error loading jobs.</div>
                        ) : (
                            <>
                                {data?.data.map((job) => (
                                    <div key={job.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.position}</h2>
                                            <span className="text-blue-600 font-bold text-sm whitespace-nowrap">{job.salary || "Gaji tidak ditampilkan"}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">{job.category}</span>
                                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">{job.type}</span>
                                        </div>

                                        {/* Required Certificate Section - Placeholder if data not available */}
                                        <div className="flex items-start gap-2 mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                                            <CheckSquare className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-1">Syarat Sertifikat / Ijazah</p>
                                                <p className="text-sm text-gray-700">Lihat detail untuk persyaratan</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                                {/* Logo Placeholder */}
                                                <div className="text-xs font-bold text-gray-400">Logo</div>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-blue-600 hover:underline">{job.companyName}</p>
                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" /> {job.location}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                                            <p className="text-xs text-green-600 font-medium">
                                                {new Date(job.createdAt).toLocaleDateString()}
                                            </p>
                                            <Bookmark className="h-5 w-5 text-gray-400 hover:text-blue-600" />
                                        </div>
                                    </div>
                                ))}

                                {/* Pagination Controls */}
                                <div className="flex justify-center items-center gap-4 mt-8">
                                    <Button
                                        variant="outline"
                                        onClick={handlePrevPage}
                                        disabled={page === 1}
                                        className="flex items-center gap-2"
                                    >
                                        <ChevronLeft className="h-4 w-4" /> Previous
                                    </Button>
                                    <span className="text-sm text-gray-600">
                                        Page {page} of {data?.meta.lastPage || 1}
                                    </span>
                                    <Button
                                        variant="outline"
                                        onClick={handleNextPage}
                                        disabled={!data?.meta || page >= data.meta.lastPage}
                                        className="flex items-center gap-2"
                                    >
                                        Next <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
