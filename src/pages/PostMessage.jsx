import { useState } from 'react';
import GenericInput from '@/components/common/GenericInput';

const PostMessage = () => {
  const [myValue, setMyValue] = useState('');

  return (
    <>
      <div>
        <GenericInput
          label="From."
          name="From"
          placeholder="이름을 입력해 주세요"
          errorMessage="이름을 입력해 주세요"
          value={myValue}
          onChange={setMyValue}
        />
      </div>
    </>
  );
};

export default PostMessage;
