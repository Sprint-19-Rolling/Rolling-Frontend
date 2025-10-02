import TextInput from '@/components/common/TextInput';
import TabButtonBox from '@/components/post/TabButtonBox';
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
      <TextInput
        name="To"
        placeholder="받는 사람 이름을 입력해 주세요"
        {...toInput}
      />
      <TabButtonBox />
    </div>
  );
};

export default Post;
