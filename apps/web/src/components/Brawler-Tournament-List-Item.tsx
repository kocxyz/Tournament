import React from 'react';
import {
  Participant,
  Stage,
  Team,
  Tournament,
  TournamentStatus,
} from 'database';
import { manager } from 'brackets';
import type { FinalStandingsItem } from 'brackets';

function getNumberWithOrdinal(n: number): string {
  var s = ['th', 'st', 'nd', 'rd'],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default async function BrawlerTournamentListItem(params: {
  tournament: Tournament & { stages: Stage[] };
  participant: Participant & { team: Team | null };
  label?: string;
}) {
  const team = params.participant.team;
  const stage = params.tournament.stages.reduce<Stage | null>((acc, cur) => {
    if (cur.number < (acc?.number ?? Number.POSITIVE_INFINITY)) {
      return cur;
    }

    return acc;
  }, null);

  if (stage === null) {
    return <div />;
  }

  const standings =
    params.tournament.status === TournamentStatus.FINISHED
      ? await manager.get.finalStandings(stage.id)
      : [];
  const rank = standings.reduce<FinalStandingsItem | null>((acc, cur) => {
    if (cur.id === params.participant.id) {
      return cur;
    }

    return acc;
  }, null);

  return (
    <tr className="bg-base-200">
      <th>{rank ? getNumberWithOrdinal(rank.rank) : '-'}</th>
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
