import { Link } from 'react-router-dom';
import { cn } from '@/utils/style';

/**
 * ToggleSwitch 컴포넌트
 *
 * '기본'과 '편집' 두 상태를 전환하는 링크 버튼입니다.
 * 페이지 전환을 위해 react-router의 Link를 사용합니다.
 *
 * @param {Object} props
 * @param {boolean} props.isEditMode - 현재 편집 모드 여부
 * @param {string} props.to - 이동할 경로
 * @returns {JSX.Element}
 */
const ToggleSwitch = ({ isEditMode, to }) => {
  return (
    <Link
      to={to}
      className={cn(
        'relative flex h-[30px] w-[70px] cursor-pointer items-center justify-end gap-0.5 overflow-hidden rounded-full p-0.5',
        isEditMode ? 'bg-[#181818cc]' : 'scale-x-[-1] bg-neutral-200'
      )}>
      <div className="relative aspect-[1] h-[26px] w-[26px] rounded-full bg-white" />
      <div
        className={cn(
          'font-14-bold absolute left-2.5 top-[calc(50%-10px)] flex h-5 items-center justify-center whitespace-nowrap text-sm',
          isEditMode ? 'text-white' : 'scale-x-[-1] text-gray-400'
        )}>
        {isEditMode ? '편집' : '기본'}
      </div>
    </Link>
  );
};

export default ToggleSwitch;
