import { cva } from 'class-variance-authority';
import PropTypes from 'prop-types';
import { formatDate } from '@/utils/formatDate';
import { cn } from '@/utils/style';

const dataTextVariants = cva(`text-gray-400`, {
  variants: {
    size: {
      card: 'font-12-regular',
      modal: 'font-14-regular',
    },
  },
});

const DateText = ({ createdAt, size = 'card', className }) => {
  return (
    <time
      dateTime={createdAt}
      className={cn(dataTextVariants({ size }), className)}>
      {formatDate(createdAt)}
    </time>
  );
};

DateText.propTypes = {
  createdAt: PropTypes.string.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default DateText;
