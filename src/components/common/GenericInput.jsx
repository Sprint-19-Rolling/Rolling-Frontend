import TextInput from '@/components/common/TextInput';

const GenericInput = ({
  name,
  placeholder,
  label,
  value,
  onChange,
  onBlur,
  error,
  errorMessage,
}) => {
  const finalPlaceholder =
    placeholder ?? (label ? `${label}을(를) 입력해 주세요` : '');

  return (
    <div className="w-full">
      <TextInput
        name={name}
        placeholder={finalPlaceholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default GenericInput;
