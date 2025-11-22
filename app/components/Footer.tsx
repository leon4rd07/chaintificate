// components/Footer.tsx
import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0092FF] border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Contact Section */}
          <div className="col-span-2 md:col-span-1 mb-8 md:mb-0">
             <Image src="/logo.png" alt="Chaintificate Logo" width={50} height={50} className="mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
            <ul className="text-gray-200 space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-1 text-gray-200" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-gray-200" />
                <span>123 Blockchain St, Web3 City, 12345</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-1 text-gray-200" />
                <span>hello@chaintificate.com</span>
              </li>
            </ul>
          </div>

          {/* Navigate Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Navigate</h3>
            <ul className="text-gray-200 space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Discover</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Care</a></li>
            </ul>
          </div>

          {/* Solution Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Solution</h3>
            <ul className="text-gray-200 space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Get in Touch</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Technology</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Who are We?</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Expertise</a></li>
            </ul>
          </div>

          {/* Discover Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Discover</h3>
            <ul className="text-gray-200 space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Latest News</a></li>
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career</a></li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
            <ul className="text-gray-200 space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-400 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-200">
          <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Chaintificate. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:text-white transition-colors">Privacy & Policy</a>
            <a href="#" className="text-sm hover:text-white transition-colors">Terms & Condition</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
