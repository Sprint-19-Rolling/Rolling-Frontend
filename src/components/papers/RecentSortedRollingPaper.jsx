import RollingPaperDesktopList from '@/components/papers/paper-list/RollingPaperDesktopList';
import useRollingPaperData from '@/hooks/useRollingPaperData';

const RecentSortedRollingPaper = () => {
  const { data, loading, goNext, goPrev } = useRollingPaperData();

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

export default RecentSortedRollingPaper;
