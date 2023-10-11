import type { Brawler, Participant } from 'database';

export default function ParticipantLink(params: {
  participant: Participant & { brawlers: Brawler[] };
}) {
  return (
    <a
      className="hover:text-sky-300"
      href={
        params.participant.teamId
          ? `/team/${params.participant.teamId}`
          : `/brawler/${params.participant.brawlers[0].username}`
      }
    >
      {params.participant.name}
    </a>
  );
}
