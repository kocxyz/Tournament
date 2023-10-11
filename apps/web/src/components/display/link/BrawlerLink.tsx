import type { Brawler } from 'database';

export default function BrawlerLink(params: { brawler: Brawler }) {
  return (
    <a
      className="hover:text-sky-300 text-gray-600"
      href={`/brawler/${params.brawler.username}`}
    >
      {params.brawler.username}
    </a>
  );
}
