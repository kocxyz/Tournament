import BracketsViewers from '@/components/Brackets-Viewer';
import UnderConstructionAlert from '@/components/UnderConstruction';
import { type DataTypes, type ValueToArray, manager } from 'brackets';
import { TournamentStatus, prisma } from 'database';
import { notFound } from 'next/navigation';

export default async function TournamentDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const tournament = await prisma.tournament.findFirst({
    where: { id },
    include: {
      participants: {
        include: {
          brawlers: true,
        },
      },
    },
  });

  if (tournament === null) {
    return notFound();
  }

  const data: ValueToArray<DataTypes> | undefined = Array<TournamentStatus>(
    TournamentStatus.IN_PROGRESS,
    TournamentStatus.FINISHED,
  ).includes(tournament.status)
    ? await manager.get.tournamentData(tournament.managerTournamentId)
    : undefined;
  return (
    <div className="flex-1 flex flex-col py-12 mx-12 md:mx-24 xl:mx-64">
      <UnderConstructionAlert />
      {data !== undefined ? (
        <div className="flex flex-col justify-center items-center">
          <BracketsViewers data={data} tournament={tournament} />
        </div>
      ) : undefined}
    </div>
  );
}
