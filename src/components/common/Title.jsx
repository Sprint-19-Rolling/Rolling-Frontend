import PropTypes from 'prop-types';
import { cn } from '@/utils/style';

const Title = ({ children, className, as: Component = 'h2' }) => {
  return (
    <Component
      className={cn('font-20-bold md:font-24-bold text-gray-900', className)}>
      {children}
    </Component>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.oneOf(['h2', 'h3', 'h4', 'h5', 'h6']),
};

export default Title;
