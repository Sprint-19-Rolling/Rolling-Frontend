import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { createRecipient } from '@/apis/recipients';
import Button from '@/components/common/button/Button';
import TextInput from '@/components/common/TextInput';
import TabButtonBox from '@/components/post/TabButtonBox';
import useError from '@/hooks/useError';
import { useInput, validateText } from '@/hooks/useInput';
import useToast from '@/hooks/useToast';

const Post = () => {
  const navigate = useNavigate();
  const { setError } = useError();
  const { showToast } = useToast();

  const toInput = useInput({
    label: '받는 사람',
    customErrorMessage: '이름을 입력해 주세요',
  });

  const [backgroundData, setBackgroundData] = useState({
    backgroundColor: 'beige', // API enum 기본값
    backgroundImageURL: null,
  });
  const [loading, setLoading] = useState(false);

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
      const res = await createRecipient({
        name: toInput.value,
        backgroundColor: backgroundData.backgroundColor,
        backgroundImageURL: backgroundData.backgroundImageURL,
      });
      const newPostId = res.id;
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
        disabled={loading || validateText(toInput.value) !== ''}>
        {loading ? '생성 중...' : '생성하기'}
      </Button>
    </div>
  );
};

export default Post;
