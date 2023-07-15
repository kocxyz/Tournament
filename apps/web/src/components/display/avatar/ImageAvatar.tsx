export default function ImageAvatar({ src }: { src: string }) {
  return (
    <div className="avatar">
      <div className="w-12 h-12 mask mask-squircle">
        <img src={src} />
      </div>
    </div>
  );
}
