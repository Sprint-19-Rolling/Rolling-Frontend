import Icons from '@/assets/icons/icons';
import EmojiBadge from '@/components/common/badge/EmojiBadge';
import { cn } from '@/utils/style';

const EmojiSummary = ({ className, topReactions }) => {
  if (topReactions.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {topReactions.map((item) => {
        return (
          <EmojiBadge
            size="s"
            key={item.id}
            emoji={item.emoji}
            count={item.count}
            className={'sm:font-16-regular sm:h-[36px] sm:px-3 sm:py-2'}
          />
        );
      })}
      <button type="button" className="cursor-pointer">
        <Icons.ArrowDownIcon />
      </button>
    </div>
  );
};

export default EmojiSummary;
