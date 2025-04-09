import { ReactNode, useRef, useEffect } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

type InputType = 'text' | 'number' | 'tel' | 'email' | 'date' | 'textarea' | 'select' | 'checkbox' 
import InputField1 from './InputField1';

interface FlexibleInputFieldProps {
  // Props basicas para el input
  label?: string;
  inputType?: InputType;
  value?: string ;
  onChange?: (value: string | boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  options?: { value: string; label: string }[]; // Para el select
  onFocus?: () => void;
  onBlur?: () => void;


  // Width control
  labelWidth?: string;
  inputWidth?: string;
  containerWidth?: string;

  // Layout custom
  middleComponent?: ReactNode;
  rightComponent?: ReactNode;
  fullWidth?: boolean;

  // Estilo
  labelClassName?: string;
  inputClassName?: string;
  containerClassName?: string;
  widthMiddleColumn?: string;

  // Otros
  required?: boolean;
  id?: string;
  maxLength?: number;
   onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; 

   //tooltip
   showHint?: boolean;
  setShowHint?: (show: boolean) => void;
  mensajeTooltip?: string;
}

export default function FlexibleInputField({
  label,
  inputType,
  value,
  onChange,
  placeholder,
  disabled = false,
  options = [],
  onBlur,
  onFocus,

  // Width control - defaults
  labelWidth = '120px',
  inputWidth = 'w-full',
  containerWidth = 'w-full',
  widthMiddleColumn = '1fr',

  // Layout custom
  middleComponent,
  rightComponent,
  // fullWidth = false,

  // Estilos
  labelClassName = '',
  inputClassName = '',
  containerClassName = '',

  // Tooltip
  showHint = false,
  setShowHint = () => {},
  mensajeTooltip = '',

  // Otros
  required = false,
  id,
  maxLength,
  onKeyDown,
}: FlexibleInputFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // PReviene scroll en input number
  useEffect(() => {
    if (inputType === 'number' && inputRef.current) {
      const preventScroll = (e: Event) => {
        if (e instanceof WheelEvent) {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      const input = inputRef.current;
      input.addEventListener('wheel', preventScroll, { passive: false });

      return () => {
        input.removeEventListener('wheel', preventScroll);
      };
    }

    // return para cuando no se cumplan las condiciones
    return () => {};
  }, [inputType]);

  /*
      Si solo hay un label y un input, usa 2 columnas → [label] [input]
      Si hay un label, middleComponent e input, usa 3 columnas → [label] [middleComponent] [input]
      Si tiene label, middleComponent, input y rightComponent, usa 4 columnas.
  */

  const getGridColumns = () => {
    if (!label && !middleComponent && !rightComponent) return 'grid-cols-1';
    if (label && !middleComponent && !rightComponent) return 'grid-cols-[var(--label-width)_1fr]';
    if (label && middleComponent && !rightComponent) return 'grid-cols-[var(--label-width)_auto_1fr]';
    if (label && !middleComponent && rightComponent) return `grid-cols-[var(--label-width)_auto_1fr]`;
    if (label && !middleComponent && rightComponent && widthMiddleColumn) return `grid-cols-[var(--label-width)_${widthMiddleColumn}_1fr]`;
    if (label && middleComponent && rightComponent) return 'grid-cols-[var(--label-width)_auto_1fr_auto]';
    if (!label && middleComponent && !rightComponent) return 'grid-cols-[auto_1fr]';
    if (!label && !middleComponent && rightComponent) return 'grid-cols-[1fr_auto]';
    if (!label && middleComponent && rightComponent) return 'grid-cols-[auto_1fr_auto]';
    return 'grid-cols-1';
  };

  const baseInputClasses = `px-2 py-1 focus:outline-none transition ${inputClassName}
  ${
    disabled
      ? 'bg-gray-200 border-gray-300 cursor-not-default'
      : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
  }
  `;

  const renderInput = () => {
    switch (inputType) {
      case 'textarea':
        return (
          <textarea
            id={id}
            placeholder={placeholder}
            className={`border ${baseInputClasses} ${inputWidth}`}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
          />
        );
      case 'select':
        return (
          <select
            id={id}
            className={`border ${baseInputClasses} ${inputWidth}`}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            required={required}
            // maxLength={maxLength}
          >
            {!required && <option value="">Seleccione</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        case 'date':
          return (
            <DatePicker
              placeholder="Seleccionar Fecha"
              className={`focus:border-amber-900 ${inputWidth}`}
              value={value ? dayjs(value, 'DD/MM/YYYY') : null}
              onChange={(date, dateString) => {
                console.log('Nuevo valor seleccionado:', dateString, date);
                onChange?.(Array.isArray(dateString) ? dateString[0] : dateString);
              }}              
              format={'DD/MM/YYYY'}
              size="middle"
              disabled={disabled}
            />
          );
        case 'checkbox':
          return (
            <input
              type="checkbox"
              id={id}
              className={`w-5 h-5 p-1 focus:ring-0 cursor-pointer ${baseInputClasses} ${inputWidth}`}
              checked={!!value} // Asegúrate de que 'value' sea un booleano
              onChange={(e) => onChange?.(e.target.checked)} // Maneja el cambio de estado
              disabled={disabled}
              required={required}
            />
          );
      default:
        return (
          <InputField1
            ref={inputRef}
            type={inputType || 'text'}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            className={`border rounded-lg ${baseInputClasses} ${inputWidth}`}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        );
    }
  };

  return (
    <div
      className={`grid items-center gap-3 ${getGridColumns()} ${containerWidth} ${containerClassName}`}
      style={{ '--label-width': labelWidth } as React.CSSProperties}
    >
      {showHint && (
        <div className="absolute  mt-16 z-50 text-sm bg-black text-white p-1 rounded shadow">
          {mensajeTooltip}
        </div>
      )}
      {label && (
        <label
          htmlFor={id}
          className={`text-right whitespace-nowrap ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''} ${labelClassName}`}
        >
          {label}
        </label>
      )}

      {middleComponent && <div className="flex items-center">{middleComponent}</div>}

      {renderInput()}

      {rightComponent && <div className="flex items-center">{rightComponent}</div>}
    </div>
  );
}
