import { Routes, client } from 'discord';
import { TournamentStatus, prisma } from 'database';
import { getUser, DEFAULT_AUTH_URL } from 'knockoutcity-auth-client';
import BrawlerTournamentList from '@/components/Brawler-Tournament-List';
import UnderConstructionAlert from '@/components/UnderConstruction';
import moment from 'moment';

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

  const userData = await getUser(DEFAULT_AUTH_URL, brawler.discordId).catch(
    () => null,
  );

  return (
    <div className="flex-1 flex flex-col py-12 mx-12 md:mx-24 xl:mx-64">
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

          <div className="flex flex-col px-4">
            <p>{brawler.username}</p>
            <div className="flex flex-row gap-x-2">
              {brawler.team ? (
                <div className="badge border-none badge-neutral">
                  <a
                    className="hover:text-sky-300"
                    href={`/team/${brawler.team.id}`}
                  >
                    {brawler.team.name}
                  </a>
                </div>
              ) : undefined}
              {(userData?.data.ownedServers.length ?? 0) > 0 ? (
                <div className="badge border-none bg-orange-300">
                  <p>Server Hoster</p>
                </div>
              ) : undefined}
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className="flex-1 flex flex-col gap-y-12">
        <div className="flex flex-col gap-y-4">
          <h2 className="text-xl">Summary</h2>
          <div className="w-2/3 lg:w-2/5 flex flex-col sm:flex-row stats stats-vertical sm:stats-horizontal bg-base-200">
            <div className="flex-1 stat">
              <div className="stat-title">Member Since</div>
              <div className="stat-value text-sm">
                {userData
                  ? moment(Date.parse(userData?.data.registeredat)).format(
                      'DD / MM / YYYY',
                    )
                  : '-'}
              </div>
            </div>

            <div className="flex-1 stat">
              <div className="stat-title">Last Seen</div>
              <div className="stat-value text-sm">
                {userData
                  ? moment(Date.parse(userData?.data.lastlogin)).format(
                      'DD / MM / YYYY',
                    )
                  : '-'}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <h2 className="text-xl">Tournaments</h2>
          <BrawlerTournamentList brawler={brawler} tournaments={tournaments} />
        </div>
      </div>
    </div>
  );
}
