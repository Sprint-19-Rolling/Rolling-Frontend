import { useState } from 'react';
import TextEditor from '@/components/common/TextEditor';
import TextInput from '@/components/common/TextInput';
import Title from '@/components/common/Title';
import { useInput } from '@/hooks/useInput';

const PostMessage = () => {
  const fromInput = useInput({
    label: '보내는 사람',
    customErrorMessage: '이름을 입력해 주세요',
  });

  const [content, setContent] = useState('');

  return (
    <div>
      <div>
        <Title>From.</Title>
        <TextInput
          name="From"
          placeholder="보내는 사람 이름을 입력해 주세요"
          {...fromInput}
        />
      </div>

      <div>
        <Title>내용을 입력해 주세요</Title>
        <TextEditor value={content} onChange={setContent} />
      </div>
    </div>
  );
};

export default PostMessage;
