"use client";
import React, { useState } from 'react';
import { Link, usePathname } from '@teamvelix/velix/client';

function SidebarLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || (pathname === '/docs' && href === '/docs/getting-started');

  return (
    <Link href={href} className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${active ? "text-velix-cyan bg-velix-cyan/5 font-medium" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"}`}>
      {children}
    </Link>
  );
}

export function DocsSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="lg:hidden w-full flex items-center justify-between p-4 bg-velix-dark/40 border border-white/5 rounded-xl mb-4 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-sm">Documentation Menu</span>
        <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
      </button>

      <aside className={`w-full lg:w-64 shrink-0 lg:block lg:border-r lg:border-white/5 lg:pr-6 bg-transparent ${isOpen ? 'block' : 'hidden'} mb-8 lg:mb-0`}>
        <nav className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto flex flex-col gap-6 py-2">
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 px-3">Start</h4>
          <div className="space-y-0.5">
            <SidebarLink href="/docs">Getting Started</SidebarLink>
            <SidebarLink href="/docs/routing">Routing</SidebarLink>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 px-3">Server</h4>
          <div className="space-y-0.5">
            <SidebarLink href="/docs/api-routes">API Routes</SidebarLink>
            <SidebarLink href="/docs/loaders">Loaders</SidebarLink>
            <SidebarLink href="/docs/actions">Server Actions</SidebarLink>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 px-3">Core</h4>
          <div className="space-y-0.5">
            <SidebarLink href="/docs/error-handling">Error Handling</SidebarLink>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 px-3">Production</h4>
          <div className="space-y-0.5">
            <SidebarLink href="/docs/deployment">Deployment</SidebarLink>
          </div>
        </div>
      </nav>
    </aside>
    </>
  );
}
