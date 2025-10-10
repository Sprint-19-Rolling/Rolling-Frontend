import { useNavigate, useParams } from 'react-router';
import { teamApi } from '@/apis/axios';
import Button from '@/components/common/button/Button';
import MessageList from '@/components/rolling-paper-list/MessageList';
import ToggleSwitch from '@/components/rolling-paper-list/ToggleSwitch';

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteRollingPaper = async () => {
    if (!window.confirm('정말 롤링페이퍼를 삭제하시겠습니까?')) {
      return;
    }

    try {
      await teamApi.delete(`recipients/${id}`);
      alert('롤링페이퍼가 삭제되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('롤링페이퍼 삭제 실패:', error);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      {/* 상단 영역 (PC에서만 보여짐) */}
      <div className="mb-4 flex items-center justify-between">
        <ToggleSwitch to={`/post/${id}`} isEditMode />

        {/* PC용 삭제 버튼 (고정 X, 상단 오른쪽 위치) */}
        <Button
          size={40}
          className="hidden w-[92px] lg:inline-flex"
          onClick={handleDeleteRollingPaper}>
          삭제하기
        </Button>
      </div>

      {/* 메시지 리스트 */}
      <MessageList recipientId={id} isEditPage />

      {/* 모바일 전용 하단 고정 버튼 */}
      <div className="fixed bottom-6 left-1/2 z-50 h-[56px] w-[320px] -translate-x-1/2 sm:hidden">
        <div className="flex justify-center">
          <Button
            size={56}
            className="h-[56px] w-[320px] rounded-xl text-white"
            onClick={handleDeleteRollingPaper}>
            삭제하기
          </Button>
        </div>
      </div>
      {/* 태블릿 전용 하단 고정 버튼 */}
      <div className="fixed bottom-6 left-1/2 z-50 hidden h-[55px] w-[720px] -translate-x-1/2 justify-center px-4 sm:flex lg:hidden">
        <div className="flex h-[55px] w-[720px] items-center justify-center gap-2.5 overflow-hidden rounded-xl px-[91px] py-3.5">
          <Button
            size={56}
            className="h-[55px] w-[720px] text-lg font-bold text-white"
            onClick={handleDeleteRollingPaper}>
            삭제하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default PostEdit;
