import React from 'react';
import { Tournament } from 'database';

export default function TeamTournamentListItem(params: {
  index: number;
  tournament: Tournament;
  label?: string;
}) {
  return (
    <tr className="bg-base-200">
      <th>{params.index + 1}</th>
      <td>
        <a
          className="hover:text-sky-300 text-gray-600"
          href={`/tournament/${params.tournament.id}`}
        >
          {params.tournament.title}
        </a>
      </td>
    </tr>
  );
}
