

"use client"; 

import React, { useState } from "react";
import Header from "../../components/Header"; 
import { FileText, GraduationCap } from "lucide-react";

// --- MOCK DATA ---
const certificatesData = [
  {
    title: "Certif 1",
    institute: "Tech Institute",
    date: "2024-09-15",
    imageUrl: "/sertif.png", 
    isFeatured: true,
  },
  {
    title: "Certif 2 (HTML/CSS)",
    institute: "Online Academy",
    date: "2024-08-01",
    isFeatured: false,
  },
  {
    title: "Certif 3 (JS Basics)",
    institute: "Code School",
    date: "2024-07-20",
    isFeatured: false,
  },
  {
    title: "Certif 4 (Web Dev)",
    institute: "Tech Institute",
    date: "2024-06-10",
    isFeatured: false,
  },
];

const degreesData = [
  {
    title: "Bachelor of Computer Science",
    institute: "University of Excellence",
    date: "2023-06-30",
    imageUrl: "/degree-sample.png", 
    isFeatured: true,
  },
  {
    title: "Master of Business Administration",
    institute: "Global University",
    date: "2021-12-15",
    isFeatured: false,
  },
  {
    title: "Associate of Arts",
    institute: "Community College",
    date: "2019-05-20",
    isFeatured: false,
  },
];

const CertificateCard: React.FC<{
  imageUrl?: string;
  title: string;
  institute: string;
  date: string;
  isFeatured?: boolean;
}> = ({ imageUrl, title, institute, date, isFeatured = false }) => {
  return (
    <div
      className={`relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden ${
        isFeatured ? "border-2 border-blue-500" : "border border-gray-200"
      }`}
    >
      {isFeatured && imageUrl ? (
        <div
          className="relative h-40 bg-cover bg-center flex items-center justify-center p-4 text-white"
          style={{
            backgroundImage: `url(${imageUrl})`,
           
          }}
        >
          <div className="absolute inset-0"></div>
          <div className="relative text-left w-full z-10">
            <p className="text-xs">{isFeatured ? "FEATURED" : "CERTIFICATE"}</p>
            <h3 className="text-xl font-semibold mb-1 truncate">{title}</h3>
            <p className="text-xs opacity-80 truncate">{institute}</p>
          </div>
          <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
            {date}
          </span>
        </div>
      ) : (
        <div className="p-4 h-40 flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {title}
          </h3>
          <p className="text-sm text-gray-600 truncate">{institute}</p>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-xs text-gray-500">{date}</span>
          </div>
          <button className="flex items-center justify-center w-full text-blue-600 hover:text-blue-800 text-sm mt-2">
            <FileText className="h-4 w-4 mr-1" /> View Details
          </button>
          <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {date}
          </span>
        </div>
      )}

      {isFeatured && (
        <div className="p-4 pt-0">
          <button className="flex items-center justify-center w-full text-blue-600 hover:text-blue-800 text-sm mt-2">
            <FileText className="h-4 w-4 mr-1" /> View Details
          </button>
        </div>
      )}
    </div>
  );
};

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState<"certificates" | "degrees">(
    "certificates"
  );

  const currentData =
    activeTab === "certificates" ? certificatesData : degreesData;

  const getTabClasses = (tabName: "certificates" | "degrees") => {
    return activeTab === tabName
      ? "flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200"
      : "flex items-center px-6 py-3 bg-white text-gray-700 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Student's Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          View and manage your certificates and degrees
        </p>

        <div className="flex space-x-4 mb-10">
          <button
            className={getTabClasses("certificates")}
            onClick={() => setActiveTab("certificates")} 
          >
            <FileText className="h-5 w-5 mr-2" /> Certificates
          </button>
          <button
            className={getTabClasses("degrees")}
            onClick={() => setActiveTab("degrees")} 
          >
            <GraduationCap className="h-5 w-5 mr-2" /> Degrees
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentData.map((cert, index) => (
            <CertificateCard
              key={index}
              title={cert.title}
              institute={cert.institute}
              date={cert.date}
              imageUrl={cert.imageUrl}
              isFeatured={cert.isFeatured}
            />
          ))}

          {currentData.length === 0 && (
            <p className="col-span-4 text-center text-gray-500 p-8">
              No {activeTab} found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
