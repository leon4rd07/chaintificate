// app/page.tsx
'use client'
import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

const testimonials = [
  {
    quote: "Chaintificate has revolutionized how we issue and verify academic credentials. The security and ease of use are unparalleled.",
    author: "Jane Doe",
    title: "University Registrar",
  },
  {
    quote: "As a student, having my certificates on the blockchain gives me peace of mind. Verification is instant, no more waiting!",
    author: "John Smith",
    title: "Graduate Student",
  },
  {
    quote: "The implementation process was seamless, and the support from the Chaintificate team has been outstanding. Highly recommended!",
    author: "Dr. Emily White",
    title: "Head of Certifications",
  },
  {
    quote: "A truly innovative solution that brings much-needed trust and efficiency to the world of digital credentials.",
    author: "Michael Brown",
    title: "Tech Entrepreneur",
  },
  {
    quote: "Managing thousands of certificates used to be a nightmare. Now, it's a simple, secure, and automated process.",
    author: "Sarah Green",
    title: "IT Director, Technical College",
  },
  {
    quote: "The best part is the ownership. I truly own my achievements, and I can share them with anyone, anywhere.",
    author: "David Lee",
    title: "Alumnus",
  },
];

export default function HomePage() {
  return (
    // Background keseluruhan halaman (sesuai bagian bawah gambar)
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      {/* Keyframes for the infinite scroll animation */}
      <style jsx global>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
      
      {/* 1. Header (Navigation Bar) */}
      <Header />

      <main className="flex-grow">
        {/* 2. Hero Section (Welcome & Search) */}
        <HeroSection />

        {/* Main Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-12">Main Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Secure Certification</h3>
                <p className="text-gray-600">Leverage blockchain technology to ensure the authenticity and immutability of every certificate.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Instant Verification</h3>
                <p className="text-gray-600">Quickly verify any certificate with a simple link, providing immediate trust and transparency.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Decentralized Management</h3>
                <p className="text-gray-600">Manage your credentials with full control, securely stored on a decentralized network.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-12">What Our Users Say</h2>
          </div>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <div className="flex w-max animate-infinite-scroll group-hover:animation-pause">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-80 sm:w-96 mx-4">
                  <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 h-full">
                    <p className="text-lg italic text-gray-700 mb-4">"{testimonial.quote}"</p>
                    <p className="font-bold text-gray-800">- {testimonial.author}, {testimonial.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. FAQ Section */}
        <FAQSection />
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
