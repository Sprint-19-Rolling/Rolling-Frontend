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

  const [backgroundData, setBackgroundData] = useState({
    backgroundColor: 'bg-beige-200', // 기본값
    backgroundImageURL: null,
  });
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const isValid = toInput.validate();
    if (!isValid) {
      return;
    }

    setLoading(true);
    const data = {
      team: '19-7',
      name: toInput.value,
      backgroundColor: backgroundData.backgroundColor || 'bg-beige-200',
      backgroundImageURL: backgroundData.backgroundImageURL || null,
    };

    try {
      const res = await teamApi.post('recipients/', data);
      const newPostId = res.data.id;
      navigate(`/post/${newPostId}`);
    } catch (err) {
      console.error('글 생성 실패', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
        onSelectChange={(tabData) => {
          setBackgroundData((prev) => {
            const newData = {
              backgroundColor:
                tabData.type === 'color'
                  ? tabData.value
                  : prev.backgroundColor || 'bg-beige-200',
              backgroundImageURL:
                tabData.type === 'image'
                  ? tabData.value
                  : prev.backgroundImageURL || null,
            };

            // 이전 값과 같으면 업데이트 X -> 무한로딩 방지
            if (
              prev.backgroundColor === newData.backgroundColor &&
              prev.backgroundImageURL === newData.backgroundImageURL
            ) {
              return prev;
            }

            return newData;
          });
        }}
      />

      <Button
        type="button"
        onClick={handleCreate}
        theme="primary"
        size={40}
        full="always">
        {loading ? '생성 중...' : '생성하기'}
      </Button>
    </div>
  );
};

export default Post;
