import RollingPaperList from '@/components/papers/RollingPaperList';
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
