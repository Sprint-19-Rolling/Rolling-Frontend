import { Outlet, useParams } from 'react-router';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import SubHeader from '@/components/rolling-paper-list/sub-header/SubHeader';

const PostLayout = () => {
  const { id } = useParams();
  return (
    <>
      <Header />
      <SubHeader recipientId={id} />
      {/* TODO: !아래 main 태그 배경 컴포넌트로 변경 필요! */}
      <main className="bg-beige-200 wrapper-px min-h-[calc(100dvh-297px)] w-full">
        <div className="content pt-15 pb-25">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PostLayout;
