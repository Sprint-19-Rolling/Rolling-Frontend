import { cva } from 'class-variance-authority';
import { cn } from '@/utils/style';

const inputWrapper = cva(
  'flex w-full items-center gap-2.5 rounded-lg border-2 bg-white px-3 py-3 focus-within:outline-none active:outline-none',
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

const TextInput = ({
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
  ...props
}) => {
  return (
    <div className="w-full">
      <div className={inputWrapper({ error })}>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onBlur && onBlur(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'font-pretendard flex-1 bg-transparent text-base font-normal leading-[26px] tracking-[-0.16px] text-gray-900 outline-none placeholder:text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
      </div>
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default TextInput;
