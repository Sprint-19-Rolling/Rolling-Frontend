import PropTypes from 'prop-types';
import { formatDate } from '@/hooks/formatDate';

const DateText = ({ createdAt }) => {
  return (
    <span className="font-12-regular text-gray-400">
      {formatDate(createdAt)}
    </span>
  );
};

DateText.propsType = {
  createdAt: PropTypes.string.isRequired,
};

export default DateText;
