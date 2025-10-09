import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { Link, useParams } from 'react-router';
import MessageList from '@/components/rolling-paper-list/MessageList';


const PostDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Header />
      <SubHeader recipientId={id} />
      {/* TODO: 아래 main 태그 배경 컴포넌트를 변경 필요 */}
      <main className="bg-beige-200 wrapper-px min-h-[calc(100dvh-297px)] w-full">
        <div className="content pt-15 pb-25">
          {/* TODO: 토글 버튼 추가 필요 */}
          <Link to={`/post/${id}/edit`}>토글 버튼 자리</Link>
          {/* MessageList - 각 메시지 카드 클릭 시 모달이 자동으로 열림 */}
          <MessageList recipientId={id} />
        </div>
      </main>
      <Footer />

      {/* TODO: 토글 버튼 추가 필요 */}
      <div className="mb-4 flex h-10 items-center">
        <Link to={`/post/${id}/edit`}>토글 버튼 자리</Link>
      </div>
      <MessageList recipientId={id} />

    </>
  );
};

export default PostDetail;
