import TextInput from '@/components/common/TextInput';
import { useInput } from '@/hooks/useInput';

const PostMessage = () => {
  const fromInput = useInput({
    label: '보내는 사람',
    customErrorMessage: '이름을 입력해 주세요',
  });
  return (
    <div>
      <label
        htmlFor="From"
        className="font-20-bold md:font-24-bold text-gray-900">
        From.
      </label>
      <TextInput
        name="From"
        placeholder="보내는 사람 이름을 입력해 주세요"
        {...fromInput}
      />
    </div>
  );
};

export default PostMessage;
