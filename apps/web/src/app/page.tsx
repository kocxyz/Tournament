'use client';

import React from 'react';

export default function Home() {
  const brawlerInputRef = React.createRef<HTMLInputElement>();

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleClick()
    }
  }

  function handleClick() {
    window.location.href = `/brawler/${brawlerInputRef.current?.value}`;
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-24 bg-slate-600">
      <div className="flex flex-row w-full items-center justify-center join">
        <input
          ref={brawlerInputRef}
          type="text"
          placeholder="Seach for a brawler"
          className="input w-full max-w-lg join-item"
          onKeyDown={handleKeyDown}
        />
        <button className="btn hover:bg-slate-700 bg-slate-800 text-white border-none join-item" onClick={handleClick}>
          Search
        </button>
      </div>
    </main>
  );
}
