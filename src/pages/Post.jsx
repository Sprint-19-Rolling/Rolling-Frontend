
import GenericInput from '@/components/common/GenericInput';
import { useInput } from '@/hooks/useInput';

const Post = () => {
  const toInput = useInput('', '받는 사람', '이름을 입력해 주세요');

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

import TabButtonBox from '@/components/post/TabButtonBox';

const Post = () => {
  return <TabButtonBox />;

};

export default Post;
