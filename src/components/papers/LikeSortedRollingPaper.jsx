import RollingPaperDesktopList from '@/components/papers/paper-list/RollingPaperDesktopList';
import RollingPaperMobileList from '@/components/papers/paper-list/RollingPaperMobileList';
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
      <RollingPaperMobileList data={data} loading={loading} />
    </>
  );
};

export default RecentSortedRollingPaper;
