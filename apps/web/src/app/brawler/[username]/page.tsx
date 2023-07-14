import { APIGuildMember, APIUser, Routes, client } from 'discord';
import { TournamentStatus, prisma } from 'database';
import { getUser, DEFAULT_AUTH_URL } from 'knockoutcity-auth-client';
import BrawlerTournamentList from '@/components/Brawler-Tournament-List';
import UnderConstructionAlert from '@/components/UnderConstruction';
import moment from 'moment';
import { environment } from '@/environment';

export default async function BrawlerDetailsPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const badges: { [roleId: string]: { label: string; color: string } } = {
    [environment.DISCORD_DEVELOPER_ROLE_ID]: {
      label: 'Developer',
      color: 'bg-[#F5F0BB]',
    },
    [environment.DISCORD_CONTENT_SQUAD_ROLE_ID]: {
      label: 'Content Squad',
      color: 'bg-[#E8A0BF]',
    },
    [environment.DISCORD_COMMUNITY_MANAGER_ROLE_ID]: {
      label: 'Community Manager',
      color: 'bg-[#C3EDC0]',
    },
    [environment.DISCORD_MODDING_RESEARCHER_ROLE_ID]: {
      label: 'Modding Researcher',
      color: 'bg-[#7CCECE]',
    },
  };

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

  const member: APIGuildMember = (await client
    .get(Routes.guildMember(environment.DISCORD_GUILD_ID, brawler.discordId))
    .catch(
      () =>
        ({
          joined_at: '',
          flags: 1,
          deaf: false,
          mute: false,
          roles: [],
        } satisfies APIGuildMember),
    )) as APIGuildMember;

  if (!member.user) {
    member.user = (await client
      .get(Routes.user(brawler.discordId))
      .catch(() => undefined)) as APIUser | undefined;
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
          {member?.user?.avatar ? (
            <div className="avatar">
              <div className="w-12 h-12 mask mask-squircle">
                <img
                  src={`https://cdn.discordapp.com/avatars/${brawler.discordId}/${member.user.avatar}`}
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
              {member?.roles.map((role) => {
                const badge = badges[role];
                if (!badge) {
                  return undefined;
                }

                return (
                  <div className={`badge border-none ${badge.color}`}>
                    <p>{badge.label}</p>
                  </div>
                );
              })}
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
          <div className="flex flex-col sm:flex-row stats stats-vertical sm:stats-horizontal bg-base-200">
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

            <div className="flex-1 stat">
              <div className="stat-title">Team</div>
              <div className="stat-value text-sm">
                {brawler.team ? (
                  <a
                    className="hover:text-sky-300"
                    href={`/team/${brawler.team.id}`}
                  >
                    {brawler.team.name}
                  </a>
                ) : (
                  '-'
                )}
              </div>
            </div>
          </div>
        </div>
        {tournaments.length > 0 ? (
          <div className="flex flex-col gap-y-4">
            <h2 className="text-xl">Tournaments</h2>
            <BrawlerTournamentList
              brawler={brawler}
              tournaments={tournaments}
            />
          </div>
        ) : undefined}
      </div>
    </div>
  );
}
