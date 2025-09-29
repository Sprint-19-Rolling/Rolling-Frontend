import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { buttonVariants } from '@/style/components/button-style';
import { cn } from '@/utils/style';

const LinkButton = ({
  to,
  children,
  theme = 'primary',
  size = null,
  full = null,
  className,
  ...props
}) => {
  return (
    <Link
      to={to}
      className={cn(buttonVariants({ theme, size, full }), className)}
      {...props}>
      {children}
    </Link>
  );
};

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['primary', 'secondary', 'outlined', 'icon']),
  size: PropTypes.oneOf([28, 32, 36, 40, 56, null]),
  full: PropTypes.oneOf(['mobile', 'tablet', 'always', null]),
  className: PropTypes.string,
};

export default LinkButton;
