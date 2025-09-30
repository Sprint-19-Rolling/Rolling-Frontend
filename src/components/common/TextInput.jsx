function TextInput({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  errorMessage,
  className = '',
  disabled = false,
}) {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="w-full">
        <label htmlFor={name} className="mb-3 block text-2xl font-bold">
          {label}
        </label>

        <div
          className={`flex w-full items-center gap-2.5 rounded-lg border-2 bg-white px-3 py-3 ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus-within:border-[#555] active:border-[#3A3A3A]`}>
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) => onBlur && onBlur(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={`Pretendard, 16px, 400, 26px, -0.16px (var(--gray-900)) (var(--gray-500)) flex-1 bg-transparent font-['Pretendard'] text-base leading-[26px] font-normal tracking-[-0.16px] text-[#181818] outline-none placeholder:text-gray-400 hover:text-[#555] disabled:cursor-not-allowed disabled:opacity-50 ${className} `}
          />
        </div>
        {error && errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default TextInput;
