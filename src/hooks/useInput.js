import { useState } from 'react';

export const validateText = (text) => {
  if (!text || text.trim() === '') {
    return '값을 입력해주세요.';
  }
  const trimmed = text.trim();
  if (trimmed.length < 2) {
    return '최소 2자 이상 입력해주세요.';
  }
  const isKorean = /[가-힣]/.test(trimmed);
  const maxLength = isKorean ? 4 : 12;
  if (trimmed.length > maxLength) {
    return `최대 ${maxLength}자까지 입력 가능합니다.`;
  }
  if (!/^[가-힣a-zA-Z]+$/.test(trimmed)) {
    return '이름은 한글 또는 영어만 입력 가능합니다.';
  }
  return '';
};

export const useInput = ({
  initialValue = '',
  label,
  customErrorMessage,
  validator = validateText,
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  const validate = (v = value) => {
    const result = validator(v);
    if (typeof result === 'string') {
      setError(result || '');
      return result === '';
    }
    if (!result) {
      setError(customErrorMessage || `${label}을(를) 입력해 주세요.`);
      return false;
    }
    setError('');
    return true;
  };

  return {
    value,
    onChange: (v) => {
      setValue(v);
      if (error) {
        validate(v);
      }
    },
    onBlur: () => validate(),
    error: !!error,
    errorMessage: error,
    validate,
  };
};
