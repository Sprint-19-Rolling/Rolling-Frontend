import DesktopPaperList from '@/components/papers/paper-list/DesktopPaperList';
import MobilePaperList from '@/components/papers/paper-list/MobilePaperList';

const RollingPaperListContainer = ({ sort }) => {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopPaperList sort={sort} />
      </div>
      <div className="block lg:hidden">
        <MobilePaperList sort={sort} />
      </div>
    </>
  );
};

export default RollingPaperListContainer;
