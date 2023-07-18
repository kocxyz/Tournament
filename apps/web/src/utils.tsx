import { manager, FinalStandingsItem } from 'brackets';
import { Id } from 'brackets-model';
import { Tournament, TournamentStatus } from 'database';

function getNumberWithOrdinal(n: number): string {
  var s = ['th', 'st', 'nd', 'rd'],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export async function getRank(
  stageId: Id,
  participantId: Id,
  tournament: Tournament,
): Promise<FinalStandingsItem | null> {
  const standings =
    tournament.status === TournamentStatus.FINISHED
      ? await manager.get.finalStandings(stageId)
      : [];
  return standings.reduce<FinalStandingsItem | null>((acc, cur) => {
    if (cur.id === participantId) {
      return cur;
    }

    return acc;
  }, null);
}

export function getRankIcon(rank: FinalStandingsItem | null): JSX.Element {
  if (!rank) {
    return <p>-</p>;
  }

  const rankWithOrdinal = getNumberWithOrdinal(rank.rank);
  switch (rank.rank) {
    case 1:
    case 2:
    case 3:
      return (
        <img
          src={`https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/${rankWithOrdinal}%20Place%20Medal.png`}
          alt={`${rankWithOrdinal} Place Medal`}
          width="25"
          height="25"
        />
      );
    default:
      return <p>{rankWithOrdinal}</p>;
  }
}
