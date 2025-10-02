import { Link } from 'react-router';
import Icons from '@/assets/icons/icons';
import { cn } from '@/utils/style';

const iconWrapperStyles = cn(
  'rounded-full p-4 text-white bg-gray-500',
  'hover:bg-gray-600 active:bg-gray-700',
  'focus-visible:bg-gray-700 focus-visible:outline focus-visible:outline-gray-800'
);

/**
 * 롤링페이퍼에 메시지 카드를 추가하는 버튼 컴포넌트입니다.
 * 클릭 시 롤링페이지 메시지 작성 페이지로 이동합니다.
 * @param {object} props
 * @param {string} props.id - 메시지 카드를 추가할 롤링페이퍼의 ID (필수)
 * @returns {JSX.Element} - React Router의 Link 컴포넌트를 반환합니다.
 */

const AddMessageCardButton = ({ id }) => {
  return (
    <Link
      to={`/post/${id}/message`}
      className="card-style items-center justify-center"
      aria-label="롤링페이퍼 메세지 추가 페이지로 이동">
      <div className={iconWrapperStyles}>
        <Icons.PlusIcon />
      </div>
    </Link>
  );
};

export default AddMessageCardButton;
