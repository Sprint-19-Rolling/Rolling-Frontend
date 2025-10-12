import RollingPaperList from '@/components/papers/RollingPaperList';
import useRollingPaperData from '@/hooks/useRollingPaperData';

const LikeSortedRollingPaper = () => {
  const { data, loading, goNext, goPrev } = useRollingPaperData('like');

  return (
    <RollingPaperList
      data={data}
      loading={loading}
      onNext={goNext}
      onPrev={goPrev}
    />
  );
};

export default LikeSortedRollingPaper;
