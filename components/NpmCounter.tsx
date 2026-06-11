'use client';

import React, { useState, useEffect } from 'react';

export function NpmCounter() {
  const [stats, setStats] = useState<{
    totalDownloads: number | null;
    weeklyDownloads: number | null;
    githubStars: number | null;
  }>({
    totalDownloads: null,
    weeklyDownloads: null,
    githubStars: null,
  });

  useEffect(() => {
    // Fetch Github stars
    fetch('https://api.github.com/repos/Velixteam/velix')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.stargazers_count === 'number') {
          setStats((s) => ({ ...s, githubStars: data.stargazers_count }));
        }
      })
      .catch((err) => console.error("Failed to fetch Github stars", err));

    // Fetch NPM weekly
    fetch('https://api.npmjs.org/downloads/point/last-week/@teamvelix/velix')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.downloads === 'number') {
          setStats((s) => ({ ...s, weeklyDownloads: data.downloads }));
        }
      })
      .catch((err) => console.error("Failed to fetch npm weekly downloads", err));

    // Fetch NPM Total (Using last-year to simulate all-time for a recent framework)
    fetch('https://api.npmjs.org/downloads/point/last-year/@teamvelix/velix')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.downloads === 'number') {
          setStats((s) => ({ ...s, totalDownloads: data.downloads }));
        }
      })
      .catch((err) => console.error("Failed to fetch npm total downloads", err));
  }, []);

  const formatNumber = (num: number | null) => {
    if (num === null) return '-';
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + ' Billion';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + ' Million';
    return num.toLocaleString('en-US');
  };

  return (
    <div className="flex flex-wrap items-center gap-6 sm:gap-8 rounded-2xl p-4 w-fit">
      {/* Total Downloads */}
      <div className="flex items-center gap-3 pl-4 border-l-[3px] border-teal-500">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">{formatNumber(stats.totalDownloads)}</span>
          </div>
          <span className="text-xs sm:text-sm font-medium text-slate-400 italic">NPM Downloads</span>
        </div>
      </div>

      {/* Weekly Downloads */}
      <div className="flex items-center gap-3 pl-4 border-l-[3px] border-cyan-500">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">{formatNumber(stats.weeklyDownloads)}</span>
          </div>
          <span className="text-xs sm:text-sm font-medium text-slate-400 italic">Weekly Downloads</span>
        </div>
      </div>

      {/* GitHub Stars */}
      <div className="flex items-center gap-3 pl-4 border-l-[3px] border-yellow-500">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">{formatNumber(stats.githubStars)}</span>
          </div>
          <span className="text-xs sm:text-sm font-medium text-slate-400 italic">GitHub Stars</span>
        </div>
      </div>
    </div>
  );
}
