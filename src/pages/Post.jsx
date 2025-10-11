import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { teamApi } from '@/apis/axios';
import Button from '@/components/common/button/Button';
import TextInput from '@/components/common/TextInput';
import TabButtonBox from '@/components/post/TabButtonBox';
import ToastContainer from '@/components/rolling-paper-list/toast/ToastContainer';
import useError from '@/hooks/useError';
import { useInput } from '@/hooks/useInput';
import useToast from '@/hooks/useToast';

const TEAM_ID = '19-7';

const Post = () => {
  const navigate = useNavigate();
  const { setError } = useError();
  const { toasts, showToast, removeToast } = useToast();

  const toInput = useInput({
    label: '받는 사람',
    customErrorMessage: '이름을 입력해 주세요',
  });

  const [backgroundData, setBackgroundData] = useState({
    backgroundColor: 'beige', // API enum 기본값
    backgroundImageURL: null,
  });
  const [loading, setLoading] = useState(false);

  // useCallback으로 메모이제이션 (리렌더링 최적화)
  const handleSelectChange = useCallback((selection) => {
    if (!selection) {
      setBackgroundData({
        backgroundColor: 'beige',
        backgroundImageURL: null,
      });
      return;
    }

    if (selection.type === 'color') {
      // 컬러 선택: 이미지는 null로 초기화
      setBackgroundData({
        backgroundColor: selection.value, // enum 값 (예: 'beige', 'blue' 등)
        backgroundImageURL: null,
      });
    } else if (selection.type === 'image') {
      // 이미지 선택: 멘토님 가이드대로 기본 컬러 설정
      setBackgroundData({
        backgroundColor: 'beige', // API 필수값이므로 기본값 유지
        backgroundImageURL: selection.value,
      });
    }
  }, []);

  const handleCreate = async () => {
    const isValid = toInput.validate();
    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const data = {
        team: TEAM_ID,
        name: toInput.value,
        backgroundColor: backgroundData.backgroundColor,
        backgroundImageURL: backgroundData.backgroundImageURL,
      };

      const res = await teamApi.post('recipients/', data);
      const newPostId = res.data.id;
      navigate(`/post/${newPostId}`);
    } catch (err) {
      console.error('글 생성 실패', err);
      setError({
        status: err.response?.status || 500,
        message: err.response?.data?.message || '글 생성 중 오류가 발생했어요.',
      });
      showToast(
        '글 생성 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-[720px] py-[50px] md:py-[60px]">
      <label
        htmlFor="To"
        className="font-20-bold md:font-24-bold text-gray-900">
        To.
      </label>

      <TextInput
        name="To"
        placeholder="받는 사람 이름을 입력해 주세요"
        {...toInput}
      />

      <TabButtonBox onSelectChange={handleSelectChange} />

      <Button
        type="button"
        onClick={handleCreate}
        theme="primary"
        size={40}
        full="always"
        className="font-18-bold h-[56px] w-full"
        disabled={loading}>
        {loading ? '생성 중...' : '생성하기'}
      </Button>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Post;
