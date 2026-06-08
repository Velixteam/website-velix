'use client';

import { useState, useEffect } from 'react';

export function NpmCounter() {
  const [downloads, setDownloads] = useState<number | null>(null);

  useEffect(() => {
    // Fetch downloads from npm API for the last month
    fetch('https://api.npmjs.org/downloads/point/last-month/@teamvelix/velix')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.downloads) {
          setDownloads(data.downloads);
        }
      })
      .catch((err) => console.error("Failed to fetch npm downloads", err));
  }, []);

  if (downloads === null) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300 animate-fade-in-up">
      <svg viewBox="0 0 780 250" className="w-6 h-auto fill-red-500">
        <path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"></path>
      </svg>
      <span><strong className="text-white">{downloads.toLocaleString()}</strong> downloads this month</span>
    </div>
  );
}
