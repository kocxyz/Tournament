import React from 'react';
import { Participant, Stage, Team, Tournament } from 'database';
import { getRank, getRankIcon } from '@/utils';

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

  const rank = await getRank(
    stage.id,
    params.participant.id,
    params.tournament,
  );

  return (
    <tr className="bg-base-200">
      <th align="center">{getRankIcon(rank)}</th>
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
            params.participant.name
          )}
        </p>
      </td>
    </tr>
  );
}
