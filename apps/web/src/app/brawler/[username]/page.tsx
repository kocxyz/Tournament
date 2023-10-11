import { APIGuildMember, APIUser, Routes, client } from 'discord';
import { prisma } from 'database';
import { getUserById, DEFAULT_AUTH_URL } from 'knockoutcity-auth-client';
import BrawlerTournamentList from '@/components/Brawler-Tournament-List';
import BrawlerAvatar from '@/components/display/avatar/BrawlerAvatar';
import TooltipBadge, { Badge } from '@/components/display/badge/TooltipBadge';
import DiscordNitroIcon from '@/components/display/DiscordNitroIcon';
import UnderConstructionAlert from '@/components/UnderConstruction';
import BrawlerStats from '@/components/display/stats/BrawlerStats';
import { environment } from '@/environment';
import { notFound } from 'next/navigation';

export default async function BrawlerDetailsPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const roleBadges: {
    [roleId: string]: Badge;
  } = {
    [environment.DISCORD_FOUNDER_ROLE_ID]: {
      content: 'Founder',
      color: 'bg-[#FAE392]',
      description: 'This user is a founding Member of KOCity.xyz.',
    },
    [environment.DISCORD_CONTENT_SQUAD_ROLE_ID]: {
      content: 'Content Squad',
      color: 'bg-[#E8A0BF]',
      description:
        'This user creates content and spreads the word of Knockout City Private Server Build.',
    },
    [environment.DISCORD_COMMUNITY_MANAGER_ROLE_ID]: {
      content: 'Community Manager',
      color: 'bg-[#C3EDC0]',
      description: 'This user keeps the community safe.',
    },
    [environment.DISCORD_MODDING_RESEARCHER_ROLE_ID]: {
      content: 'Modding Researcher',
      color: 'bg-[#7CCECE]',
      description:
        'This user is activly involved in researching modding capabilities.',
    },
    [environment.DISCORD_SERVER_HOSTER_ROLE_ID]: {
      content: 'Server Hoster',
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
    return notFound();
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

  const userData = await getUserById(DEFAULT_AUTH_URL, brawler.discordId).catch(
    () => null,
  );

  return (
    <div className="flex-1 flex flex-col py-12 mx-12 md:mx-24 xl:mx-64">
      <div className="mb-12">
        <UnderConstructionAlert />
      </div>
      <div className="flex flex-col">
        <div className="flex-1 flex flex-row items-center">
          <BrawlerAvatar brawler={brawler} member={member} />

          <div className="flex flex-col px-4">
            <div className="flex flex-row items-center gap-x-1">
              <p style={{ color: userData?.data.user.color ?? undefined }}>
                {brawler.username}
              </p>
              {userData && userData?.data.user.premium > 0 ? (
                <div
                  className="tooltip"
                  data-tip={`This user is a Tier ${userData.data.user.premium} Patreon.`}
                >
                  <img
                    src={`/images/patreon-${userData.data.user.premium}.webp`}
                    alt="Patreon Icon"
                    width="25"
                    height="25"
                  />
                </div>
              ) : undefined}
              {member?.roles.includes(
                environment.DISCORD_SERVER_BOOSTER_ROLE_ID,
              ) ? (
                <div className="tooltip" data-tip="kocity.xyz Server Booster">
                  <DiscordNitroIcon />
                </div>
              ) : undefined}
              {userData?.data.user.id === '659767172708564993' ? (
                <div
                  className="tooltip"
                  data-tip="This user played a huge role to make modding possible."
                >
                  <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hammer%20and%20Wrench.png"
                    alt="Hammer and Wrench"
                    width="25"
                    height="25"
                  />
                </div>
              ) : undefined}
            </div>
            <div className="lg:flex lg:flex-row gap-x-2">
              {member?.roles.map((role) => {
                const badge = roleBadges[role];
                if (!badge) {
                  return undefined;
                }

                return <TooltipBadge badge={badge} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className="flex-1 flex flex-col gap-y-12">
        <div className="flex flex-col gap-y-4">
          <h2 className="text-xl">Summary</h2>
          <BrawlerStats brawler={brawler} kocUser={userData?.data} />
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
