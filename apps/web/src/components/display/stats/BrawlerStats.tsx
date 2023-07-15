import type { Brawler, Team } from 'database';
import type { KOCUser } from 'knockoutcity-auth-client';
import moment from 'moment';
import BrawlerStatsItem from './BrawlerStatsItem';

export default function BrawlerStats({
  brawler,
  kocUser,
}: {
  brawler: Brawler & { team: Team | null };
  kocUser: KOCUser | undefined;
}) {
  return (
    <div className="flex flex-col sm:flex-row stats stats-vertical sm:stats-horizontal bg-base-200">
      <BrawlerStatsItem title="Member Since">
        {kocUser
          ? moment(Date.parse(kocUser.registeredat)).format('DD / MM / YYYY')
          : '-'}
      </BrawlerStatsItem>

      <BrawlerStatsItem title="Last Seen">
        {kocUser
          ? moment(Date.parse(kocUser.lastlogin)).format('DD / MM / YYYY')
          : '-'}
      </BrawlerStatsItem>

      <BrawlerStatsItem title="Team">
        {brawler.team ? (
          <a className="hover:text-sky-300" href={`/team/${brawler.team.id}`}>
            {brawler.team.name}
          </a>
        ) : (
          '-'
        )}
      </BrawlerStatsItem>
    </div>
  );
}
