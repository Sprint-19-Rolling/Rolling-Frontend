import { cva } from 'class-variance-authority';
import PropTypes from 'prop-types';
import { useState } from 'react';
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

const validateText = (text) => {
  // 빈값 체크
  if (!text || text.trim() === '') {
    return '값을 입력해주세요.';
  }

  const trimmedText = text.trim();

  // 2자 이상 체크
  if (trimmedText.length < 2) {
    return '최소 2자 이상 입력해주세요.';
  }

  // 한글과 영어 각각 다른 최대 길이 적용
  const isKorean = /[가-힣]/.test(trimmedText);
  const maxLength = isKorean ? 4 : 12; // 한글 4자, 영어 12자

  if (trimmedText.length > maxLength) {
    return `최대 ${maxLength}자까지 입력 가능합니다.`;
  }

  // 한글, 영어만 허용 (숫자 및 특수문자 불허)
  const validPattern = /^[가-힣a-zA-Z]+$/;
  if (!validPattern.test(trimmedText)) {
    return '이름은 한글 또는 영어만 입력 가능합니다.';
  }

  return ''; // 에러 없으면 빈 문자열 반환
};

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
  const [localError, setLocalError] = useState('');

  const handleBlur = (val) => {
    const validationMessage = validateText(val);
    setLocalError(validationMessage);

    if (onBlur) {
      onBlur(val, validationMessage);
    }
  };

  return (
    <div className="w-full">
      <div className={inputWrapper({ error: error || !!localError })}>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (localError) {
              setLocalError('');
            }
          }}
          onBlur={(e) => handleBlur(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'font-pretendard flex-1 bg-transparent text-base font-normal leading-[26px] tracking-[-0.16px] text-gray-900 outline-none placeholder:text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
      </div>
      {(error || localError) && (
        <p className="mt-1 text-sm text-red-500">
          {errorMessage || localError}
        </p>
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
};

export default TextInput;
