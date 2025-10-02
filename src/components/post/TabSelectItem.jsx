import icons from '@/assets/icons/icons';
import { cn } from '@/utils/style';

/**
 * SelectItem 컴포넌트 props 정의
 * @typedef {Object} SelectItemProps
 * @property {boolean} isSelected - 현재 선택 여부
 * @property {() => void} onClick - 클릭 시 호출되는 콜백
 * @property {string} [className] - 추가적인 TailwindCSS 클래스
 * @property {React.ReactNode} [children] - 내부에 렌더링할 콘텐츠
 */

/**
 * 선택 가능한 아이템 컴포넌트
 * - 클릭 시 선택 상태를 부모 컴포넌트로 전달
 * - 키보드 Enter 또는 Space 키로도 선택 가능 (접근성 지원)
 * - 선택된 경우 중앙에 체크 아이콘 표시
 *
 * @param {SelectItemProps} props
 * @returns {JSX.Element}
 *
 * @example
 * <SelectItem
 *   isSelected={true}
 *   onClick={() => console.log('클릭됨')}
 *   className="bg-blue-200"
 * >
 *   <div>아이템 내용</div>
 * </SelectItem>
 */
const SelectItem = ({ isSelected, onClick, className, children }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      className={cn(
        'relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-[16px] border border-black/10 transition-transform hover:scale-[1.03]',
        className
      )}>
      {children}

      {isSelected && (
        <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
          <icons.CheckIcon width={24} height={24} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default SelectItem;
