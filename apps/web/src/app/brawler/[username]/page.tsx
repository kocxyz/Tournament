import { Routes, client } from 'discord';
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
    include: {
      team: true,
    },
  });

  if (brawler === null) {
    return <div />;
  }

  const user = await client.get(Routes.user(brawler.discordId));

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
      stages: {
        take: 1,
        orderBy: {
          number: 'asc',
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
          {typeof user === 'object' &&
          user !== undefined &&
          user !== null &&
          'avatar' in user &&
          user!.avatar ? (
            <div className="avatar">
              <div className="w-12 h-12 mask mask-squircle">
                <img
                  src={`https://cdn.discordapp.com/avatars/${brawler.discordId}/${user.avatar}`}
                />
              </div>
            </div>
          ) : (
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-12 h-12">
                <span className="text-xl">
                  {brawler.username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col p-4">
            <p>{brawler.username}</p>
            {brawler.team ? (
              <div className="badge badge-neutral">
                <a
                  className="hover:text-sky-300"
                  href={`/team/${brawler.team.id}`}
                >
                  {brawler.team.name}
                </a>
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
      <div className="divider" />
      <h2 className="text-xl">Tournaments</h2>
      <BrawlerTournamentList brawler={brawler} tournaments={tournaments} />
    </div>
  );
}
