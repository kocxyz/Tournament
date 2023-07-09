import React from 'react';
import { Participant, Stage, Team, Tournament } from 'database';
import TeamTournamentListItem from './Team-Tournament-List-Item';

export default function TeamTournamentList(params: {
  team: Team;
  tournaments: (Tournament & {
    participants: (Participant & {
      team: Team | null;
    })[];
    stages: Stage[];
  })[];
}) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="w-24"></th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {params.tournaments.map((tournament) => {
              const participant = tournament.participants.reduce((acc, cur) => {
                if (cur.teamId === params.team.id) {
                  return cur;
                }

                return acc;
              });

              return (
                <TeamTournamentListItem
                  participant={participant}
                  tournament={tournament}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
