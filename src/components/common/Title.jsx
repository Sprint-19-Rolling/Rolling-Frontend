import PropTypes from 'prop-types';

const Title = ({ children }) => {
  return <h2 className="font-24-bold text-gray-900">{children}</h2>;
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
