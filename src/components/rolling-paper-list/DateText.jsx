import PropTypes from 'prop-types';

const DateText = ({ date }) => {
  return <span className="font-12-regular text-gray-400">{date}</span>;
};

DateText.propsType = {
  date: PropTypes.string.isRequired,
};

export default DateText;
