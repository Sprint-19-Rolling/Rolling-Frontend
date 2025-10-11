import { cva } from 'class-variance-authority';
import { cn } from '@/utils/style';

const inputWrapper = cva(
  'flex w-full items-center gap-2.5 rounded-lg border-1 bg-white px-3 py-3 focus-within:outline-none active:outline-none',
  {
    variants: {
      error: {
        true: 'border-red-500 focus-within:border-red-500 active:border-red-500',
        false:
          'border-gray-300 focus-within:border-gray-500 active:border-gray-700',
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

const TextInput = (props) => {
  const {
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    error = false,
    errorMessage,
    className = '',
    disabled = false,
    validate: _validate,
    ...restProps
  } = props;

  return (
    <div className="w-full">
      <div className={inputWrapper({ error })}>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'font-16-regular flex-1 bg-transparent text-gray-900 outline-none placeholder:text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...restProps}
        />
      </div>
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  validate: PropTypes.func,
};

export default TextInput;
