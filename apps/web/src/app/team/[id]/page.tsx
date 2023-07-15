import TeamTeamMemberList from '@/components/Team-Member-List';
import TeamTournamentList from '@/components/Team-Tournament-List';
import UnderConstructionAlert from '@/components/UnderConstruction';
import TeamAvatar from '@/components/display/avatar/TeamAvatar';
import { TournamentStatus, prisma } from 'database';
import { notFound } from 'next/navigation';

export default async function BrawlerDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const team = await prisma.team.findFirst({
    where: { id },
    include: {
      members: true,
    },
  });

  if (team === null) {
    return notFound();
  }

  const tournaments = await prisma.tournament.findMany({
    where: {
      participants: {
        some: {
          teamId: team.id,
        },
      },
      status: {
        in: [TournamentStatus.IN_PROGRESS, TournamentStatus.FINISHED],
      },
    },
    include: {
      participants: {
        include: {
          team: true,
        },
      },
      stages: {
        take: 1,
        orderBy: {
          number: 'asc',
        },
      },
    },
  });

  return (
    <div className="flex-1 flex flex-col py-12 mx-12 md:mx-24 xl:mx-64">
      <div className="mb-12">
        <UnderConstructionAlert />
      </div>
      <div className="flex flex-col">
        <div className="flex-1 flex flex-row items-center">
          <TeamAvatar team={team} />
          <p className="p-4">{team.name}</p>
        </div>
      </div>
      <div className="divider pt-2 pb-8" />
      <h2 className="text-xl">Members</h2>
      <TeamTeamMemberList team={team} />
      {tournaments.length > 0 ? (
        <div className="flex flex-col gap-y-4">
          <h2 className="pt-12 text-xl">Tournaments</h2>
          <TeamTournamentList team={team} tournaments={tournaments} />
        </div>
      ) : undefined}
    </div>
  );
}
