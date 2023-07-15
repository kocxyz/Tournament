'use client';

import React from 'react';
import BrawlerSearch from './BrawlerSearch';

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between navbar bg-base-100 px-8">
      <a
        className="font-[Baloo] normal-case text-3xl hover:text-slate-600"
        href="/"
      >
        Brawler
      </a>
      {window.location.pathname !== '/' ? (
        <div className="hidden lg:flex">
          <BrawlerSearch />
        </div>
      ) : undefined}
    </div>
  );
}
