export default function BrawlerStatsItem({
  title,
  children,
}: { title: string } & React.PropsWithChildren) {
  return (
    <div className="flex-1 stat">
      <div className="stat-title">{title}</div>
      <div className="stat-value text-sm">{children}</div>
    </div>
  );
}
