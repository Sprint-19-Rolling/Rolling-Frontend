import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '@/components/common/TextInput';
import Title from '@/components/common/Title';
import TabButtonBox from '@/components/post/TabButtonBox';
import { useInput } from '@/hooks/useInput';

const Post = () => {
  const navigate = useNavigate();
  const toInput = useInput({
    label: '받는 사람',
    customErrorMessage: '이름을 입력해 주세요',
  });

  const [backgroundData, setBackgroundData] = useState(null);

  const handleCreate = () => {
    const isValid = toInput.validate();
    if (!isValid) {
      return;
    }

    navigate('/list', {
      state: {
        to: toInput.value,
        backgroundData,
      },
    });
  };

  return (
    <div>
      <Title>To.</Title>
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

      <TabButtonBox onSelectChange={setBackgroundData} />

      <button
        type="button"
        onClick={handleCreate}
        className="font-16-bold w-full rounded-lg bg-purple-600 px-4 py-3 text-white transition-colors hover:bg-purple-700 active:bg-purple-800 disabled:cursor-not-allowed disabled:bg-gray-300">
        생성하기
      </button>
    </div>
  );
};

export default Post;
