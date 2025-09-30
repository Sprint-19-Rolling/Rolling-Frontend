import GenericInput from '@/components/common/GenericInput';
import { useInput } from '@/hooks/useInput';

const Post = () => {
  const toInput = useInput({
    label: '받는 사람',
    customErrorMessage: '이름을 입력해 주세요',
  });

  return (
    <div>
      <label
        htmlFor="To"
        className="font-20-bold md:font-24-bold text-gray-900">
        To.
      </label>
      <GenericInput
        name="To"
        label="받는 사람"
        placeholder="받는 사람 이름을 입력해 주세요"
        {...toInput}
      />
    </div>
  );
};

export default Post;
