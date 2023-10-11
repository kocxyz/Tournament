import type { Team } from 'database';

export default function TeamLink(params: { team: Team }) {
  return (
    <a className="hover:text-sky-300" href={`/team/${params.team.id}`}>
      {params.team.name}
    </a>
  );
}
