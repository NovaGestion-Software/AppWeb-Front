import { useEffect, useRef } from 'react';

interface InputFieldProps {
  label?: string;
  inputType?: 'text' | 'number' | 'tel' | 'email' | 'textarea';
  value?: string;
  onChange?: (value: string) => void;
  inputWidth?: string;
  componentWidth?: string;
  widthLabel?: string;
  setDisabled?: boolean;
  placeholder?: string;
  name?: string;
  textAlign?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  inputType = 'text',
  textAlign = 'text-right',
  value,
  onChange,
  setDisabled = true,
  componentWidth = 'w-full',
  inputWidth = 'w-full',
  widthLabel = '150px ',
  placeholder,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Prevenir que scroll modifique el valor del input number
  useEffect(() => {
    if (inputType === 'number' && inputRef.current) {
      const preventScroll = (e: Event) => {
        if (e instanceof WheelEvent) {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      const input = inputRef.current;
      input.addEventListener('wheel', preventScroll as EventListener, { passive: false });

      return () => {
        input.removeEventListener('wheel', preventScroll as EventListener);
      };
    }

    // Agregamos un return explícito para cuando no se cumplan las condiciones
    return () => {};
  }, [inputType]);

  return (
    <div
      className={`grid items-center ${componentWidth}
       ${label ? 'grid-cols-2 gap-2' : 'grid-cols-1'}`}
      style={{ gridTemplateColumns: ` ${widthLabel} auto` }}
    >
      {label && (
        <label
          className={`${textAlign} min-w-[${widthLabel}] `} // Aplica text-slate-400 si el modeShort es 'I'${modeShort === 'I' ? 'text-slate-400' : ''}
        >
          {label}
        </label>
      )}

      <div>
        <input
          name={name}
          ref={inputRef}
          disabled={setDisabled}
          type={inputType}
          placeholder={placeholder}
          className={`border rounded-md px-3 py-1 focus:outline-none transition 
          ${
            setDisabled
              ? 'bg-gray-200 border-gray-400 cursor-default'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          } 
          ${inputWidth}
         
        `}
        // ${modeShort === 'I' ? 'text-slate-400' : ''}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          // onWheel={inputType === 'number' ? handleWheel : undefined}
        />
        {error && <p className="text-red-500 text-sm mt-1  w-max">{error}</p>}
      </div>
    </div>
  );
};

export default InputField;
