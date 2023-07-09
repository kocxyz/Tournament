import BracketsViewers from '@/components/Brackets-Viewer';
import { manager } from 'brackets';

export default async function TournamentDetailsPage({ params: { id } }: { params: { id: string } }) {
  const data = await manager.get.tournamentData(parseInt(id));
  return (
    <div className="flex-1 flex justify-center items-center">
      <BracketsViewers data={data} />
    </div>
  );
}
