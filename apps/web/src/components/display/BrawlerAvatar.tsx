import type { Brawler } from 'database';
import type { APIGuildMember } from 'discord';
import PlaceholderAvatar from './PlaceholderAvatar';
import ImageAvatar from './ImageAvatar';

export default function BrawlerAvatar({
  brawler,
  member,
}: {
  brawler: Brawler;
  member: APIGuildMember | undefined;
}) {
  return member?.user?.avatar ? (
    <ImageAvatar
      src={`https://cdn.discordapp.com/avatars/${brawler.discordId}/${member.user.avatar}`}
    />
  ) : (
    <PlaceholderAvatar name={brawler.username} />
  );
}
