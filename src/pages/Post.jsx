import { useState } from 'react';
import GenericInput from '@/components/common/GenericInput';

const Post = () => {
  const [toValue, setToValue] = useState('');

  return (
    <>
      <div>
        <GenericInput
          label="To."
          name="To"
          placeholder="받는 사람 이름을 입력해 주세요"
          errorMessage="이름을 입력해 주세요"
          value={toValue}
          onChange={setToValue}
        />
      </div>
    </>
  );
};

export default Post;
