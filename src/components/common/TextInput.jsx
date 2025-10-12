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
/**
 * 텍스트 입력 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.name - input name
 * @param {string} [props.type='text'] - input type
 * @param {string} [props.placeholder] - placeholder text
 * @param {string} props.value - input value
 * @param {(value: string) => void} props.onChange - 값 변경 콜백
 * @param {() => void} [props.onBlur] - blur 이벤트 콜백
 * @param {boolean} [props.error=false] - 에러 여부
 * @param {string} [props.errorMessage] - 에러 메시지
 * @param {string} [props.className] - 추가 클래스
 * @param {boolean} [props.disabled=false] - 비활성화 여부
 */
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
    validate,
    ...restProps
  } = props;

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (validate) {
      validate(newValue);
    }
  };

  return (
    <div className="w-full">
      <div className={inputWrapper({ error })}>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
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

export default TextInput;
