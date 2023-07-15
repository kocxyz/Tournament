'use client';

import React from 'react';

export default function BrawlerSearch() {
  const brawlerInputRef = React.createRef<HTMLInputElement>();

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleClick();
    }
  }

  function handleClick() {
    if (!brawlerInputRef.current || brawlerInputRef.current.value === '')
      return;

    window.location.href = `/brawler/${brawlerInputRef.current.value}`;
  }

  return (
    <div className="flex flex-row w-full items-center justify-center join">
      <input
        ref={brawlerInputRef}
        type="text"
        placeholder="Seach for a brawler"
        className="input w-full h-10 max-w-sm join-item"
        onKeyDown={handleKeyDown}
      />
      <button
        className="btn hover:bg-slate-700 bg-slate-800 text-white border-none join-item w-16"
        onClick={handleClick}
      >
        <svg
          className="pointer-events-none absolute z-10 stroke-current text-white"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </div>
  );
}
