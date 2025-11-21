// components/FAQSection.tsx
import React from "react";
import { ChevronDown } from "lucide-react";

const FAQSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-[32px] font-extrabold text-center mb-3 text-gray-800">
          Frequently Asked Question
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12">
          Temukan Jawaban Untuk pertanyaan Chaintificate
        </p>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Apa Itu Chaintificate ?
          </h3>
          <p className="text-gray-600 text-[15px] leading-relaxed">
            Chaintificate adalah platform manajemen sertifikat dan ijazah
            berbasis NFT yang mempermudah institusi pendidikan & siswa dalam
            proses penerbitan serta penyimpanan sertifikat dalam bentuk NFT
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5 cursor-pointer hover:bg-gray-50 transition-colors duration-150 shadow-md">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Bagaimana Cara kerja Chaintificate?
            </h3>
            <ChevronDown className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
