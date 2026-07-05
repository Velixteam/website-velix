"use client";
import React from 'react';
import { DocsSidebar } from "../../components/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-transparent">
      {/* Hero Section */}
      <div className="border-b border-white/5 bg-velix-deep">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[rgba(0,232,122,0.1)] text-velix-cyan border border-[rgba(0,232,122,0.2)]">
              v5.2.9 stable
            </span>
            <a href="#" className="text-xs font-bold px-3 py-1 rounded-full bg-velix-dark/40 text-[#6b7068] border border-white/5 hover:text-white transition-colors">
              Changelog
            </a>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Velix Documentation v5.2</h1>
          <p className="text-xl text-slate-400 max-w-2xl mb-8">
            Everything you need to build with Velix — from Hello World to deploying on Velix Cloud.
          </p>
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-white/5 rounded-xl leading-5 bg-velix-dark/40 text-[#e8ebe5] placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-velix-cyan focus:border-velix-cyan sm:text-sm transition-all"
              placeholder="Search documentation..."
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
        <DocsSidebar />
        <div className="flex-1 min-w-0 max-w-full lg:max-w-3xl pb-32">
          {children}
        </div>
      </div>
    </div>
  );
}
