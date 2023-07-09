import { Brawler } from 'database';
import React, { useEffect } from 'react';

export default function TeamMemberListItem(params: {
  index: number;
  brawler: Brawler;
  label?: string;
}) {
  return (
    <tr className="bg-base-200">
      <th>{params.index + 1}</th>
      <td>
        <p>
          <a href={`/brawler/${params.brawler.username}`}>
            {params.brawler.username}
          </a>
          {params.label !== undefined ? (
            <div className="inline text-gray-400 pl-4">{params.label}</div>
          ) : undefined}
        </p>
      </td>
    </tr>
  );
}
