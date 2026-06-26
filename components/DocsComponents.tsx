"use client";
import React, { useState } from 'react';

export function CodeBlock({ filename, children }: { filename?: string; children: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-white/5 bg-velix-deep">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-velix-dark/40">
        <div className="text-xs text-slate-500 font-mono">{filename || 'Code'}</div>
        <button onClick={copy} className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1">
          {copied ? <span>✓ Copied</span> : <span>Copy</span>}
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-sm leading-relaxed text-[#e8ebe5]"><code>{children}</code></pre>
      </div>
    </div>
  );
}

export function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-20 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 pb-4 border-b border-white/5">{title}</h2>
      {children}
    </section>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-slate-400 leading-relaxed mb-4">{children}</p>;
}

export function IC({ children }: { children: React.ReactNode }) {
  return <code className="text-sm px-1.5 py-0.5 rounded bg-velix-dark/40 text-velix-cyan font-mono border border-white/5 break-words">{children}</code>;
}

export function Callout({ type, title, children }: { type: "info" | "warning" | "danger" | "tip"; title?: string; children: React.ReactNode }) {
  const styles = {
    info: "border-[#3b82f6] bg-[rgba(59,130,246,0.05)]",
    warning: "border-[#f59e0b] bg-[rgba(245,158,11,0.05)]",
    danger: "border-[#ff6b6b] bg-[rgba(255,107,107,0.05)]",
    tip: "border-velix-cyan bg-[rgba(0,232,122,0.05)]"
  };
  const icons = { info: "ℹ️", warning: "⚠️", danger: "🛑", tip: "💡" };
  const titleColors = { info: "text-[#3b82f6]", warning: "text-[#f59e0b]", danger: "text-[#ff6b6b]", tip: "text-velix-cyan" };

  return (
    <div className={`border-l-4 ${styles[type]} rounded-r-xl p-4 my-6`}>
      <div className="flex items-start gap-3">
        <span className="shrink-0 mt-0.5">{icons[type]}</span>
        <div>
          {title && <h5 className={`text-sm font-bold mb-1 ${titleColors[type]}`}>{title}</h5>}
          <div className="text-sm text-slate-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function PageNavigation({ prev, next }: { prev?: { title: string, href: string }, next?: { title: string, href: string } }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-white/5 gap-4">
      <div className="flex-1 w-full">
        {prev && (
          <a href={prev.href} className="flex flex-col items-start p-4 rounded-xl border border-white/5 bg-velix-dark/40 hover:bg-white/5 transition-colors group">
            <span className="text-xs text-slate-500 mb-1 flex items-center gap-1 group-hover:text-slate-400 transition-colors">
              <span>←</span> Previous
            </span>
            <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{prev.title}</span>
          </a>
        )}
      </div>
      <div className="flex-1 w-full flex justify-end">
        {next && (
          <a href={next.href} className="flex flex-col items-end p-4 rounded-xl border border-white/5 bg-velix-dark/40 hover:bg-white/5 transition-colors group">
            <span className="text-xs text-slate-500 mb-1 flex items-center gap-1 group-hover:text-slate-400 transition-colors">
              Next <span>→</span>
            </span>
            <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{next.title}</span>
          </a>
        )}
      </div>
    </div>
  );
}
