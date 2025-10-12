const RollingPaperCardSkeleton = () => {
  return (
    <div className="rolling-paper-card-style shrink-0">
      <div className="flex w-full flex-col gap-4">
        <div className="card-skeleton-style h-9 w-1/2" />
        <div className="card-skeleton-style h-7 w-1/3" />
        <div className="card-skeleton-style h-6 w-2/3" />
      </div>
      <div className="card-skeleton-style h-14 w-full" />
    </div>
  );
};

export default RollingPaperCardSkeleton;
