import icons from '@/assets/icons/icons';

const SelectItem = ({ isSelected, onClick, className, children }) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-[16px] border border-black/10 ${className} transition-transform hover:scale-[1.03]`}>
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
