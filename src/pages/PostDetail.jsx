import { Link, useParams } from 'react-router';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import MessageList from '@/components/rolling-paper-list/MessageList';
import SubHeader from '@/components/rolling-paper-list/sub-header/SubHeader';

const PostDetail = () => {
  const { id } = useParams();
  return (
    <>
      <Header />
      <SubHeader recipientId={id} />
      {/* TODO: !아래 main 태그 배경 컴포넌트로 변경 필요! */}
      <main className="bg-beige-200 wrapper-px min-h-[calc(100dvh-297px)] w-full">
        <div className="content pt-15 pb-25">
          {/* TODO: 토글 버튼 추가 필요 */}
          <Link to={`/post/${id}/edit`}>토글 버튼 자리</Link>
          <MessageList recipientId={id} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PostDetail;
