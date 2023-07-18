'use client';

import BrawlerSearch from '@/components/BrawlerSearch';
import { Baloo } from '@/fonts';
import React from 'react';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <div
        className="min-h-[93vh] hero flex-1"
        style={{
          backgroundImage:
            'url(https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/02/KnockoutCity.jpg?q=50&fit=contain&w=1140&h=570&dpr=1.5)',
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center">
          <div className="flex flex-col gap-y-4 max-w-lg">
            <div className="flex flex-col gap-y-4 text-white">
              <h1 className={`text-5xl font-bold ${Baloo.className}`}>
                The Brawl continues!
              </h1>
            </div>
            <BrawlerSearch />
          </div>
        </div>
      </div>
    </main>
  );
}
