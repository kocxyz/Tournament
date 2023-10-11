import type { Brawler, Team } from 'database';
import type { KOCUser } from 'knockoutcity-auth-client';
import moment from 'moment';
import BrawlerStatsItem from './BrawlerStatsItem';
import TeamLink from '../link/TeamLink';

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
          ? moment(Date.parse(kocUser.user.registeredat)).format(
              'DD / MM / YYYY',
            )
          : '-'}
      </BrawlerStatsItem>

      <BrawlerStatsItem title="Last Seen">
        {kocUser
          ? moment(Date.parse(kocUser.user.lastlogin)).format('DD / MM / YYYY')
          : '-'}
      </BrawlerStatsItem>

      <BrawlerStatsItem title="Team">
        {brawler.team ? <TeamLink team={brawler.team} /> : '-'}
      </BrawlerStatsItem>
    </div>
  );
}
