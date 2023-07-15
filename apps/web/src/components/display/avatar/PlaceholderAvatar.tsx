export default function PlaceholderAvatar({ name }: { name: string }) {
  return (
    <div className="avatar placeholder">
      <div className="bg-neutral-focus text-neutral-content rounded-full w-12 h-12">
        <span className="text-xl">{name.charAt(0).toUpperCase()}</span>
      </div>
    </div>
  );
}
