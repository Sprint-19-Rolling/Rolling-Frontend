import { Link, useParams } from 'react-router';
import Button from '@/components/common/button/Button';
import MessageList from '@/components/rolling-paper-list/MessageList';

const PostEdit = () => {
  const { id } = useParams();

  const handleDeleteRollingPaper = () => {
    // TODO: 롤링페이퍼 삭제 기능 구현
    console.log('롤링페이퍼 삭제');
  };

  return (
    <>
      {/* TODO: 토글 버튼 추가 필요 */}
      <div className="mb-4 flex items-center justify-between">
        <Link to={`/post/${id}`}>토글 버튼 자리</Link>
        {/* TODO: 삭제 버튼 반응형 구현 필요 */}
        <Button
          size={40}
          className="w-[92px]"
          onClick={handleDeleteRollingPaper}>
          삭제하기
        </Button>
      </div>
      <MessageList recipientId={id} isEditPage />
    </>
  );
};

export default PostEdit;
