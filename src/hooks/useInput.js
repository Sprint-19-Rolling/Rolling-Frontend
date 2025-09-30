import { useState } from 'react';

export const useInput = ({
  initialValue = '',
  label,
  customErrorMessage,
  validator = (v) => v.trim() !== '',
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  const errorMessage =
    customErrorMessage ||
    (label ? `${label}을(를) 입력해 주세요` : '값을 입력해주세요.');

  const validate = (v = value) => {
    if (!validator(v)) {
      setError(errorMessage);
      return false;
    }
    setError('');
    return true;
  };

  const handleChange = (v) => {
    setValue(v);
    if (error) {
      validate(v);
    }
  };

  const handleBlur = () => validate();

  return {
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    error: !!error,
    errorMessage: error,
    validate,
  };
};
