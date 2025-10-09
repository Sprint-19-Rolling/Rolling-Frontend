import { Link, useParams } from 'react-router';
import MessageList from '@/components/rolling-paper-list/MessageList';

const PostDetail = () => {
  const { id } = useParams();

  return (
    <>
      {/* TODO: !아래 main 태그 배경 컴포넌트로 변경 필요! */}
      <main className="bg-beige-200 wrapper-px min-h-[calc(100dvh-297px)] w-full">
        <div className="content pt-15 pb-25">
          {/* TODO: 토글 버튼 추가 필요 */}
          <Link to={`/post/${id}/edit`}>토글 버튼 자리</Link>
          <MessageList recipientId={id} />
        </div>
      </main>
    </>
  );
};

export default PostDetail;
