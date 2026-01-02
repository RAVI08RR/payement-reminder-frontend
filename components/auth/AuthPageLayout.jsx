'use client';

import React from 'react';
import Link from 'next/link';

export default function AuthPageLayout({ children, title, subtitle, footerLink }) {
  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-gray-900 relative overflow-hidden font-sans">
      
      {/* 1. Left Section (Illustration) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center relative p-12 lg:p-20">
        
        {/* Logo (Absolute Top-Left of Left Section) */}
        <div className="absolute top-10 left-10">
            <Link href="/" className="block">
                 {/* Adjust height if necessary to match the 103px from user snippet or just use strict h-12 */}
                 <img src="/Payremind logo.svg" alt="PayRemind" className="h-[103px] object-contain" />
            </Link>
        </div>

        {/* Main Illustration */}
        <div className="w-full max-w-lg mt-10">
            <img 
              src="/auth-illustration.png" 
              alt="Secure Login Illustration" 
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
        </div>
      </div>

      {/* 2. Right Section (Login/Signup Form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        {/* Mobile Logo (Visible only on small screens) */}
        <div className="lg:hidden mb-8">
            <img src="/Payremind logo.svg" alt="PayRemind" className="h-12" />
        </div>

        {/* Card Container */}
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-700 p-8 sm:p-10">
           {/* Header */}
           <div className="mb-8">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
             <p className="text-gray-500 dark:text-gray-400 text-sm">{subtitle}</p>
           </div>
           
           {/* Form Area */}
           {children}

           {/* Footer Link (New User?) */}
           {footerLink && (
             <div className="mt-8 text-center text-sm font-medium text-gray-500">
               {footerLink}
             </div>
           )}
        </div>

        {/* Bottom Footer */}
        <div className="absolute bottom-6 w-full px-12 flex justify-between text-xs text-gray-400">
            <p>Copyright Reserved @2025</p>
            <div className="flex gap-4">
                <a href="#" className="hover:text-gray-600 transition-colors">Terms and Conditions</a>
                <span>|</span>
                <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            </div>
        </div>
      </div>
    </div>
  );
}
