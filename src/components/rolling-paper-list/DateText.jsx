import PropTypes from 'prop-types';
import { formatDate } from '@/utils/formatDate';

const DateText = ({ createdAt }) => {
  return (
    <span className="font-12-regular text-gray-400">
      {formatDate(createdAt)}
    </span>
  );
};

DateText.propTypes = {
  createdAt: PropTypes.string.isRequired,
};

export default DateText;
