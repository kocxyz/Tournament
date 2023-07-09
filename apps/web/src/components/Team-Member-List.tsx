import React from 'react';
import { Brawler, Team } from 'database';
import TeamMemberListItem from './Team-Member-List-Item';

export default function TeamMemberList(params: {
  team: Team & { members: Brawler[] };
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
            {params.team.members.map((brawler, index) => (
              <TeamMemberListItem
                index={index}
                brawler={brawler}
                label={params.team.ownerId === brawler.id ? 'Owner' : undefined}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
