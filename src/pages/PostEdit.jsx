import { useParams } from 'react-router';
import Button from '@/components/common/button/Button';
import MessageList from '@/components/rolling-paper-list/MessageList';
import ToggleSwitch from '@/components/rolling-paper-list/ToggleSwitch';

const PostEdit = () => {
  const { id } = useParams();

  const handleDeleteRollingPaper = () => {
    // TODO: 롤링페이퍼 삭제 기능 구현
    console.log('롤링페이퍼 삭제');
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <ToggleSwitch to={`/post/${id}`} isEditMode />
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
