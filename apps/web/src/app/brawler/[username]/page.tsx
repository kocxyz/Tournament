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
  const badges: {
    [roleId: string]: {
      label: string | JSX.Element;
      color: string;
      description: string;
    };
  } = {
    [environment.DISCORD_DEVELOPER_ROLE_ID]: {
      label: 'Developer',
      color: 'bg-[#FAE392]',
      description:
        'This user creates and/or maintaines tools for the Knockout City Private Server Build.',
    },
    [environment.DISCORD_CONTENT_SQUAD_ROLE_ID]: {
      label: 'Content Squad',
      color: 'bg-[#E8A0BF]',
      description:
        'This user creates content and spreads the word of Knockout City Private Server Build.',
    },
    [environment.DISCORD_COMMUNITY_MANAGER_ROLE_ID]: {
      label: 'Community Manager',
      color: 'bg-[#C3EDC0]',
      description: 'This user keeps the community safe.',
    },
    [environment.DISCORD_MODDING_RESEARCHER_ROLE_ID]: {
      label: 'Modding Researcher',
      color: 'bg-[#7CCECE]',
      description:
        'This user is activly involved in researching modding capabilities.',
    },
    [environment.DISCORD_SERVER_HOSTER_ROLE_ID]: {
      label: 'Server Hoster',
      color: 'bg-[#FFB07F]',
      description: 'This user hosts a public server to brawl on.',
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
            <div className="flex flex-row items-center gap-x-1">
              <p>{brawler.username}</p>
              {member?.roles.includes(
                environment.DISCORD_SERVER_BOOSTER_ROLE_ID,
              ) ? (
                <div className="tooltip" data-tip="kocity.xyz Server Booster">
                  <div className="text-[#FA73FF]">
                    <svg role="img" width="16" height="16" viewBox="0 0 8 12">
                      <path
                        d="M4 0L0 4V8L4 12L8 8V4L4 0ZM7 7.59L4 10.59L1 7.59V4.41L4 1.41L7 4.41V7.59Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M2 4.83V7.17L4 9.17L6 7.17V4.83L4 2.83L2 4.83Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
              ) : undefined}
            </div>
            <div className="flex flex-row gap-x-2">
              {member?.roles.map((role) => {
                const badge = badges[role];
                if (!badge) {
                  return undefined;
                }

                return (
                  <div className="tooltip" data-tip={badge.description}>
                    <div className={`badge border-none ${badge.color}`}>
                      <p>{badge.label}</p>
                    </div>
                  </div>
                );
              })}
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
