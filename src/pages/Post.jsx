import TextInput from '@/components/common/TextInput';
import Title from '@/components/common/Title';
import { useInput } from '@/hooks/useInput';

const Post = () => {
  const toInput = useInput({
    label: '받는 사람',
    customErrorMessage: '이름을 입력해 주세요',
  });

  return (
    <div>
      <Title>To.</Title>
      <TextInput
        name="To"
        placeholder="받는 사람 이름을 입력해 주세요"
        {...toInput}
      />
    </div>
  );
};

export default Post;
