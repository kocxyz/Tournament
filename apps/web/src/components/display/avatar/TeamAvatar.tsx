import type { Team } from 'database';
import PlaceholderAvatar from './PlaceholderAvatar';

export default function TeamAvatar({ team }: { team: Team }) {
  return <PlaceholderAvatar name={team.name} />;
}
