import React from 'react';
import { Brawler, Participant, Team, Tournament } from 'database';
import BrawlerTournamentListItem from './Brawler-Tournament-List-Item';

export default function BrawlerTournamentList(params: {
  brawler: Brawler;
  tournaments: (Tournament & {
    participants: (Participant & {
      team: Team | null;
      brawlers: Brawler[];
    })[];
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
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {params.tournaments.map((tournament, index) => {
              const participant = tournament.participants.reduce((acc, cur) => {
                const result = cur.brawlers.find(
                  (brawler) => brawler.id === params.brawler.id,
                );

                if (result !== undefined) {
                  return cur;
                }

                return acc;
              });

              return (
                <BrawlerTournamentListItem
                  index={index}
                  tournament={tournament}
                  participant={participant}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
