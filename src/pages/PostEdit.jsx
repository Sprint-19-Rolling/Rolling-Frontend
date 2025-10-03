import { Link, useParams } from 'react-router';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import MessageList from '@/components/rolling-paper-list/MessageList';

const PostEdit = () => {
  const { id } = useParams();
  return (
    <>
      <Header />
      {/* TODO: 서브 헤더 추가 필요 */}
      <div>서브헤더 자리</div>
      {/* TODO: !아래 main 태그 배경 컴포넌트로 변경 필요! */}
      <main className="bg-beige-200 wrapper-px min-h-[calc(100dvh-297px)] w-full">
        <div className="content pt-15 pb-25">
          {/* TODO: 토글 버튼 추가 필요 */}
          <Link to={`/post/${id}`}>토글 버튼 자리</Link>
          <MessageList recipientId={id} isEditPage />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PostEdit;
