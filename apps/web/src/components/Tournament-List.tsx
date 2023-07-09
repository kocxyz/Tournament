import React from 'react';
import { Tournament } from 'database';
import TournamentListItem from './Tournament-List-Item';

export default function TournamentList(params: { tournaments: Tournament[] }) {
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
            {params.tournaments.map((tournament, index) => (
              <TournamentListItem index={index} tournament={tournament} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
