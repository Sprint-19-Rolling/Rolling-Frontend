import RollingPaperDesktopList from '@/components/papers/paper-list/RollingPaperDesktopList';
import useRollingPaperData from '@/hooks/useRollingPaperData';

const LikeSortedRollingPaper = () => {
  const { data, loading, goNext, goPrev } = useRollingPaperData('like');

  return (
    <>
      <RollingPaperDesktopList
        data={data}
        loading={loading}
        onNext={goNext}
        onPrev={goPrev}
      />
    </>
  );
};

export default LikeSortedRollingPaper;
