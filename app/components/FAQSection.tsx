// components/FAQSection.tsx
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

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

        <Accordion type="single" collapsible className="w-full">
          {/* FAQ Item 1 */}
          <AccordionItem value="item-1" className="bg-white border border-gray-200 rounded-lg shadow-lg mb-4">
            <AccordionTrigger className="p-5 text-lg font-semibold text-gray-800 hover:no-underline">
              Apa Itu Chaintificate ?
            </AccordionTrigger>
            <AccordionContent className="p-5 pt-0 text-gray-600 text-[15px] leading-relaxed">
              Chaintificate adalah platform manajemen sertifikat dan ijazah berbasis NFT yang mempermudah institusi pendidikan & siswa dalam proses penerbitan serta penyimpanan sertifikat dalam bentuk NFT.
            </AccordionContent>
          </AccordionItem>

          {/* FAQ Item 2 */}
          <AccordionItem value="item-2" className="bg-white border border-gray-200 rounded-lg shadow-lg mb-4">
            <AccordionTrigger className="p-5 text-lg font-semibold text-gray-800 hover:no-underline">
              Bagaimana Cara kerja Chaintificate?
            </AccordionTrigger>
            <AccordionContent className="p-5 pt-0 text-gray-600 text-[15px] leading-relaxed">
              Chaintificate menggunakan teknologi blockchain untuk mencatat dan mengelola sertifikat sebagai NFT. Setiap sertifikat memiliki identitas unik yang diverifikasi di blockchain, memastikan keaslian dan mencegah pemalsuan.
            </AccordionContent>
          </AccordionItem>

          {/* FAQ Item 3 (Dummy) */}
          <AccordionItem value="item-3" className="bg-white border border-gray-200 rounded-lg shadow-lg mb-4">
            <AccordionTrigger className="p-5 text-lg font-semibold text-gray-800 hover:no-underline">
              Apa keuntungan menggunakan Chaintificate?
            </AccordionTrigger>
            <AccordionContent className="p-5 pt-0 text-gray-600 text-[15px] leading-relaxed">
              Keuntungan termasuk keamanan data yang tinggi, verifikasi instan, penghapusan perantara, dan kepemilikan digital yang tidak dapat disangkal atas sertifikat Anda.
            </AccordionContent>
          </AccordionItem>

          {/* FAQ Item 4 (Dummy) */}
          <AccordionItem value="item-4" className="bg-white border border-gray-200 rounded-lg shadow-lg mb-4">
            <AccordionTrigger className="p-5 text-lg font-semibold text-gray-800 hover:no-underline">
              Apakah Chaintificate aman?
            </AccordionTrigger>
            <AccordionContent className="p-5 pt-0 text-gray-600 text-[15px] leading-relaxed">
              Ya, Chaintificate dibangun di atas teknologi blockchain yang aman dan terdesentralisasi, membuatnya sangat sulit untuk dimanipulasi atau diretas.
            </AccordionContent>
          </AccordionItem>

          {/* FAQ Item 5 (Dummy) */}
          <AccordionItem value="item-5" className="bg-white border border-gray-200 rounded-lg shadow-lg mb-4">
            <AccordionTrigger className="p-5 text-lg font-semibold text-gray-800 hover:no-underline">
              Bagaimana cara memverifikasi sertifikat di Chaintificate?
            </AccordionTrigger>
            <AccordionContent className="p-5 pt-0 text-gray-600 text-[15px] leading-relaxed">
              Anda dapat memverifikasi sertifikat dengan memasukkan tautan unik sertifikat ke dalam kolom pencarian di situs web Chaintificate. Sistem akan secara otomatis mengambil dan menampilkan detail sertifikat dari blockchain.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
