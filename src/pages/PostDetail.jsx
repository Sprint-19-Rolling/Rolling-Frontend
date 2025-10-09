import { Link, useParams } from 'react-router';
import MessageList from '@/components/rolling-paper-list/MessageList';

const PostDetail = () => {
  const { id } = useParams();
  return (
    <>
      {/* TODO: 토글 버튼 추가 필요 */}
      <div className="mb-4 flex h-10 items-center">
        <Link to={`/post/${id}/edit`}>토글 버튼 자리</Link>
      </div>
      <MessageList recipientId={id} />
    </>
  );
};

export default PostDetail;
