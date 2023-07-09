import { TournamentStatus, prisma } from 'database';
import BrawlerTournamentList from '@/components/Brawler-Tournament-List';
import UnderConstructionAlert from '@/components/UnderConstruction';

export default async function BrawlerDetailsPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const brawler = await prisma.brawler.findFirst({
    where: {
      username: {
        equals: username,
        mode: 'insensitive',
      },
    },
  });

  if (brawler === null) {
    return <div />;
  }

  const tournaments = await prisma.tournament.findMany({
    where: {
      participants: {
        some: {
          brawlers: {
            some: {
              id: brawler.id,
            },
          },
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
          brawlers: true,
        },
      },
    },
  });

  return (
    <div className="flex-1 flex flex-col py-12 mx-12 md:mx-64">
      <div className="mb-12">
        <UnderConstructionAlert />
      </div>
      <div className="flex flex-col">
        <div className="flex-1 flex flex-row items-center">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12 h-12">
              <span className="text-xl">
                {brawler.username.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <p className="p-4">{brawler.username}</p>
        </div>
      </div>
      <div className="divider" />
      <h2 className="text-xl">Tournaments</h2>
      <BrawlerTournamentList brawler={brawler} tournaments={tournaments} />
    </div>
  );
}
