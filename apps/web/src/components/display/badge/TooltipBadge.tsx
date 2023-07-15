export type Badge = {
  content: string | JSX.Element;
  color: string;
  description: string;
};

export default function TooltipBadge({ badge }: { badge: Badge }) {
  return (
    <div className="tooltip" data-tip={badge.description}>
      <div className={`badge border-none ${badge.color}`}>
        <p>{badge.content}</p>
      </div>
    </div>
  );
}
