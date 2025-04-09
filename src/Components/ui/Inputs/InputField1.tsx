import React, { ForwardedRef } from 'react';

interface InputFieldProps {
  type: 'text' | 'number' | 'tel' | 'email' | 'date';
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  className?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; 
}

const InputField1 = React.forwardRef(
  (
    { type, value, onChange, placeholder, disabled, required, maxLength, className = '',onKeyDown, onBlur, onFocus }: InputFieldProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const baseClasses = `px-2 py-1 focus:outline-none  transition border ${
      disabled
        ? 'bg-gray-200 border-gray-300 cursor-not-default'
        : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 '
    } ${className}`;

    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        required={required}
        maxLength={type === 'text' ? maxLength : undefined}
        className={baseClasses}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    );
  },
);

export default InputField1;
