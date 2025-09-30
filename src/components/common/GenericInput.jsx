import { useState } from 'react';
import TextInput from '@/components/common/TextInput';

export default function GenericInput({
  name,
  placeholder,
  errorMessage,
  value,
  onChange,
  label,
}) {
  const [error, setError] = useState('');

  const finalPlaceholder =
    placeholder ?? (label ? `${label}을(를) 입력해 주세요` : '');
  const finalErrorMessage =
    errorMessage ?? (label ? `${label}을(를) 입력해 주세요` : '');

  const validate = (v) => {
    if (!v.trim()) {
      setError(finalErrorMessage);
      return false;
    }
    setError('');
    return true;
  };

  return (
    <div className={`w-full`}>
      <TextInput
        name={name}
        placeholder={finalPlaceholder}
        value={value}
        onChange={(v) => {
          onChange(v);

          if (v.trim()) {
            setError('');
          }
        }}
        onBlur={(v) => validate(v)}
        error={!!error}
        errorMessage={error}
      />
    </div>
  );
}
