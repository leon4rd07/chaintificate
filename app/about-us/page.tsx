"use client";

import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer"; // Assuming a Footer component exists based on page.tsx
import { Target, Lightbulb, Shield, Zap, Globe, Users, Award, Briefcase } from "lucide-react";
import Image from "next/image";

// --- Mock Data ---
const features = [
    {
        icon: Shield,
        title: "Immutability",
        description: "Certificates are stored on the blockchain, ensuring they cannot be tampered with or forged.",
    },
    {
        icon: Zap,
        title: "Instant Verification",
        description: "Employers can verify credentials in seconds without intermediaries or background checks.",
    },
    {
        icon: Globe,
        title: "Global Recognition",
        description: "A standardized, decentralized system that is recognized and accessible worldwide.",
    },
    {
        icon: Users,
        title: "Student Ownership",
        description: "Students own their data and control who has access to their academic achievements.",
    },
];

const founders = [
    {
        name: "Alex Rivera",
        role: "CEO & Co-Founder",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400", // Placeholder
    },
    {
        name: "Sarah Chen",
        role: "CTO & Co-Founder",
        image: "https://images.unsplash.com/photo-1573496359-136d47558363?auto=format&fit=crop&q=80&w=400&h=400", // Placeholder
    },
    {
        name: "Marcus Johnson",
        role: "Head of Blockchain",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400", // Placeholder
    },
    {
        name: "Emily Davis",
        role: "Head of Design",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400", // Placeholder
    },
];

const partners = [
    "TechUniversity", "GlobalEd", "BlockAcademy", "FutureSkills", "EduChain", "CertifyNow"
];

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans">
            <Header />

            <main className="overflow-hidden">
                {/* --- Hero Section --- */}
                <section className="relative py-24 bg-white overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-purple-400 opacity-20 blur-[100px]"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-16">
                        <div className="w-full md:w-1/2 animate-fade-in-up">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-sm mb-6 tracking-wider uppercase">
                                Our Story
                            </span>
                            <h1 className="text-5xl md:text-6xl font-space font-bold text-gray-900 leading-[1.1] mb-6">
                                Redefining Trust in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Digital Credentials</span>
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                Chaintificate is building the future of academic verification. We empower institutions to issue tamper-proof certificates and enable students to truly own their achievements on the blockchain.
                            </p>
                            <div className="flex gap-4">
                                <button className="px-8 py-3.5 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-blue-500/20">
                                    Get Started
                                </button>
                                <button className="px-8 py-3.5 bg-white text-gray-900 font-bold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    Learn More
                                </button>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 relative animate-fade-in-up [animation-delay:200ms]">
                            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-600 to-purple-700 p-1">
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                                {/* Placeholder for Hero Image - using a gradient/abstract div for now if image is missing */}
                                <div className="w-full h-full bg-gray-900 relative flex items-center justify-center overflow-hidden rounded-xl">
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-70 mix-blend-overlay"></div>
                                    <div className="text-center p-8 z-10">
                                        <Shield className="w-24 h-24 text-white mx-auto mb-4 opacity-90" strokeWidth={1} />
                                        <h3 className="text-2xl font-space font-bold text-white tracking-widest uppercase">Secured by Blockchain</h3>
                                    </div>
                                </div>
                            </div>
                            {/* Floating Elements */}
                            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100 hidden md:block animate-bounce [animation-duration:3s]">
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <CheckSquareIcon className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Verification Status</p>
                                        <p className="text-lg font-bold text-gray-900">100% Authentic</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Vision & Mission --- */}
                <section className="py-24 bg-[#F8FAFC]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Vision */}
                            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                                <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Lightbulb className="w-7 h-7 text-purple-600" />
                                </div>
                                <h2 className="text-3xl font-space font-bold text-gray-900 mb-4">Our Vision</h2>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    To create a world where academic and professional achievements are universally instantly verifiable, permanently accessible, and completely owned by the individual, eliminating credential fraud forever.
                                </p>
                            </div>

                            {/* Mission */}
                            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Target className="w-7 h-7 text-blue-600" />
                                </div>
                                <h2 className="text-3xl font-space font-bold text-gray-900 mb-4">Our Mission</h2>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    We bridge the gap between education and employment by providing a seamless, decentralized infrastructure that connects universities, students, and employers through trust-less blockchain technology.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Features Section --- */}
                <section className="py-24 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl font-space font-bold text-gray-900 mb-4">Why Choose Chaintificate?</h2>
                            <p className="text-xl text-gray-600">Built on advanced blockchain technology to solve real-world problems.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, idx) => (
                                <div key={idx} className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-100">
                                    <feature.icon className="w-10 h-10 text-blue-600 mb-6" />
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Partnerships --- */}
                <section className="py-20 border-y border-gray-100 bg-[#F8FAFC]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">Trusted by Innovative Institutions</p>
                        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {partners.map((partner, idx) => (
                                <span key={idx} className="text-2xl font-space font-bold text-gray-800 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div> {/* Placeholder Icon */}
                                    {partner}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Founders Section --- */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-space font-bold text-gray-900 mb-4">Meet The Minds</h2>
                            <p className="text-xl text-gray-600">The passionate team behind the revolution.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {founders.map((founder, idx) => (
                                <div key={idx} className="group relative">
                                    <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-gray-100">
                                        <img
                                            src={founder.image}
                                            alt={founder.name}
                                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <h3 className="text-xl font-bold text-white font-space">{founder.name}</h3>
                                            <p className="text-blue-300 font-medium text-sm">{founder.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    );
}

// Icon component needed for the section above
function CheckSquareIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
    )
}
