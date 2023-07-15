'use client';

import React from 'react';
import BrawlerSearch from './BrawlerSearch';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const path = usePathname();

  return (
    <div className="flex flex-row justify-between navbar bg-base-100 px-8">
      <a
        className="font-[Baloo] normal-case text-3xl hover:text-slate-600"
        href="/"
      >
        Brawler
      </a>
      {path !== '/' ? (
        <div className="hidden lg:flex flex-1">
          <BrawlerSearch />
        </div>
      ) : undefined}
    </div>
  );
}
