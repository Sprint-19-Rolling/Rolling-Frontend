import PropTypes from 'prop-types';
import { formatDate } from '@/utils/formatDate';

const DateText = ({ createdAt }) => {
  return (
    <time dateTime={createdAt} className="font-12-regular text-gray-400">
      {formatDate(createdAt)}
    </time>
  );
};

DateText.propTypes = {
  createdAt: PropTypes.string.isRequired,
};

export default DateText;
