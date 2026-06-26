"use client";
import React from 'react';
import { Link, usePathname } from '@teamvelix/velix/client';

function SidebarLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || (pathname === '/docs' && href === '/docs');

  return (
    <Link href={href} className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${active ? "text-velix-cyan bg-velix-cyan/5 font-medium" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"}`}>
      {children}
    </Link>
  );
}

export function DocsSidebar() {
  return (
    <>
      {/* Mobile: native <details> so it works without JS hydration */}
      <details className="lg:hidden mb-4 group">
        <summary className="w-full flex items-center justify-between p-4 bg-velix-dark/40 border border-white/5 rounded-xl text-white cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <span className="font-semibold text-sm">Documentation Menu</span>
          <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
        </summary>
        <nav className="flex flex-col gap-4 pt-4 pb-2">
          <SidebarSection title="Start">
            <SidebarLink href="/docs">Getting Started</SidebarLink>
            <SidebarLink href="/docs/routing">Routing</SidebarLink>
          </SidebarSection>
          <SidebarSection title="Server">
            <SidebarLink href="/docs/api-routes">API Routes</SidebarLink>
            <SidebarLink href="/docs/loaders">Loaders</SidebarLink>
            <SidebarLink href="/docs/actions">Server Actions</SidebarLink>
          </SidebarSection>
          <SidebarSection title="Core">
            <SidebarLink href="/docs/error-handling">Error Handling</SidebarLink>
          </SidebarSection>
          <SidebarSection title="Production">
            <SidebarLink href="/docs/deployment">Deployment</SidebarLink>
          </SidebarSection>
        </nav>
      </details>

      {/* Desktop: always visible */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-white/5 pr-6">
        <nav className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto flex flex-col gap-6 py-2">
          <SidebarSection title="Start">
            <SidebarLink href="/docs">Getting Started</SidebarLink>
            <SidebarLink href="/docs/routing">Routing</SidebarLink>
          </SidebarSection>
          <SidebarSection title="Server">
            <SidebarLink href="/docs/api-routes">API Routes</SidebarLink>
            <SidebarLink href="/docs/loaders">Loaders</SidebarLink>
            <SidebarLink href="/docs/actions">Server Actions</SidebarLink>
          </SidebarSection>
          <SidebarSection title="Core">
            <SidebarLink href="/docs/error-handling">Error Handling</SidebarLink>
          </SidebarSection>
          <SidebarSection title="Production">
            <SidebarLink href="/docs/deployment">Deployment</SidebarLink>
          </SidebarSection>
        </nav>
      </aside>
    </>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 px-3">{title}</h4>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}
