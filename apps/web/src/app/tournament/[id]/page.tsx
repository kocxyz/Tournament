import BracketsViewers from '@/components/Brackets-Viewer';
import { manager } from 'brackets';
import { prisma } from 'database';

export default async function TournamentDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const tournament = await prisma.tournament.findFirst({
    where: { id },
  });

  if (tournament === null) {
    return <div>Tournament not found!</div>;
  }

  const data = await manager.get.tournamentData(tournament.managerTournamentId);
  return (
    <div className="flex-1 flex justify-center items-center">
      <BracketsViewers data={data} />
    </div>
  );
}
