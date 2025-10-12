import RollingPaperList from '@/components/papers/RollingPaperDesktopList';
import useRollingPaperData from '@/hooks/useRollingPaperData';

const RecentSortedRollingPaper = () => {
  const { data, loading, goNext, goPrev } = useRollingPaperData();

  return (
    <RollingPaperList
      data={data}
      loading={loading}
      onNext={goNext}
      onPrev={goPrev}
    />
  );
};

export default RecentSortedRollingPaper;
