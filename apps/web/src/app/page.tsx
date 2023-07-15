'use client';

import BrawlerSearch from '@/components/BrawlerSearch';
import React from 'react';

export default function Home() {
  const brawlerInputRef = React.createRef<HTMLInputElement>();

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleClick();
    }
  }

  function handleClick() {
    window.location.href = `/brawler/${brawlerInputRef.current?.value}`;
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <div
        className="hero flex-1"
        style={{
          backgroundImage:
            'url(https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/02/KnockoutCity.jpg?q=50&fit=contain&w=1140&h=570&dpr=1.5)',
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center">
          <div className="flex flex-col gap-y-4 max-w-lg">
            <div className="flex flex-col gap-y-4 text-white">
              <h1 className="text-5xl font-bold font-[Baloo]">
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
