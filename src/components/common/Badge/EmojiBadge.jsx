export function EmojiBadge({ emoji, count }) {
  return (
    <span className="inline-flex h-[36px] w-[66px] items-center justify-center gap-2 rounded-full bg-black/50 px-3 py-2 font-16-regular text-white">
      <span>{emoji}</span>
      <span>{count}</span>
    </span>
  );
}
