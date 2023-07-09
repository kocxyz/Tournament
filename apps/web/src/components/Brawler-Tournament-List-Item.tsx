import React from 'react';
import { Participant, Team, Tournament } from 'database';

export default function BrawlerTournamentListItem(params: {
  index: number;
  tournament: Tournament;
  participant: Participant & { team: Team | null };
  label?: string;
}) {
  const team = params.participant.team;

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
      <td>
        <p>
          {team ? (
            <a
              className="hover:text-sky-300 text-gray-600"
              href={`/team/${team.id}`}
            >
              {team.name}
            </a>
          ) : (
            '-'
          )}
        </p>
      </td>
    </tr>
  );
}
