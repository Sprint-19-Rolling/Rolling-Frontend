import { useNavigate, useParams } from 'react-router';
import { teamApi } from '@/apis/axios';
import Button from '@/components/common/button/Button';
import MessageList from '@/components/rolling-paper-list/MessageList';
import ToggleSwitch from '@/components/rolling-paper-list/ToggleSwitch';

const PostEdit = () => {
  const { team, id } = useParams();
  const navigate = useNavigate();

  const handleDeleteRollingPaper = async () => {
    if (!window.confirm('정말 롤링페이퍼를 삭제하시겠습니까?')) {
      return;
    }

    try {
      await teamApi.delete(`/${team}/recipients/${id}`);
      alert('롤링페이퍼가 삭제되었습니다.');
      navigate('/'); // 삭제 후 이동할 경로로 수정하세요
    } catch (error) {
      console.error('롤링페이퍼 삭제 실패:', error);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
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
