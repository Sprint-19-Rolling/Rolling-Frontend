import { useState } from 'react';
import { useNavigate } from 'react-router';
import { teamApi } from '@/apis/axios';
import Button from '@/components/common/button/Button';
import TextInput from '@/components/common/TextInput';
import TabButtonBox from '@/components/post/TabButtonBox';
import { useInput } from '@/hooks/useInput';

const Post = () => {
  const navigate = useNavigate();
  const toInput = useInput({
    label: '받는 사람',
    customErrorMessage: '이름을 입력해 주세요',
  });

  // API 전송용 Enum 값 + 선택된 이미지 URL
  const [backgroundData, setBackgroundData] = useState({
    backgroundColor: 'beige', // 기본값: API 전송용
    backgroundImageURL: null,
  });
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const isValid = toInput.validate();
    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const data = {
        team: '19-7', // 고정 값
        name: toInput.value,
        backgroundColor: backgroundData.backgroundColor, // Enum 값 전송
        backgroundImageURL: backgroundData.backgroundImageURL, // 선택 이미지
      };

      const res = await teamApi.post('recipients/', data);
      const newPostId = res.data.id;

      navigate(`/post/${newPostId}`);
    } catch (err) {
      console.error('글 생성 실패', err);
      alert('글 생성 실패: 입력값과 API 연결을 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  console.log('backgroundData 값', backgroundData);

  return (
    <div className="mx-auto">
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

      <TabButtonBox
        backgroundData={backgroundData}
        setBackgroundData={setBackgroundData}
      />

      <Button
        type="button"
        onClick={handleCreate}
        theme="primary"
        size={40}
        full="always"
        className="mt-6 w-full"
        disabled={loading}>
        {loading ? '생성 중...' : '생성하기'}
      </Button>
    </div>
  );
};

export default Post;
