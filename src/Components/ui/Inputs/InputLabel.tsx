import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputLabelProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  required: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputLabel: React.FC<InputLabelProps> = ({
  id,
  label,
  type,
  placeholder,
  register,
  required,
  onKeyDown,
}) => {
  return (
    <div className="w-3/4">
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="block w-full px-2 py-1 mt-1 text-gray-600 rounded bg-gray-50 border focus:border-transparent placeholder:text-sm placeholder:text-gray-400 placeholder:font-semibold focus:ring-2 focus:ring-blue-400"
        onKeyDown={onKeyDown}
        {...register(id, { required: required ? 'Este campo es obligatorio' : false })}
      />
    </div>
  );
};

export default InputLabel;
