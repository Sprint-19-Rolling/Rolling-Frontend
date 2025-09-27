import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { buttonVariants } from '@/style/button-style';
import { cn } from '@/utils/style';

const LinkButton = ({
  to,
  children,
  theme = 'primary',
  size = null,
  full = false,
  ...props
}) => {
  return (
    <Link
      to={to}
      className={cn(buttonVariants({ theme, size, full }))}
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
  full: PropTypes.bool,
};

export default LinkButton;
