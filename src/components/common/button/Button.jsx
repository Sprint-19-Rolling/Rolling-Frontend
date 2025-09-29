import PropTypes from 'prop-types';
import { buttonVariants } from '@/style/button-style';
import { cn } from '@/utils/style';

const Button = ({
  children,
  type = 'button',
  theme = 'primary',
  size = null,
  full = null,
  disabled = false,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ theme, size, full }), className)}
      type={type}
      {...props}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  theme: PropTypes.oneOf(['primary', 'secondary', 'outlined', 'icon']),
  size: PropTypes.oneOf([28, 32, 36, 40, 56, null]),
  full: PropTypes.oneOf(['mobile', 'tablet', 'always', null]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
