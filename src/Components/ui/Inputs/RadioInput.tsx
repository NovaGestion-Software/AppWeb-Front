import { Dispatch, SetStateAction } from 'react';
import { Radio } from 'antd';

interface RadioInputProps {
  checked?: boolean;
  disabled?: boolean;
  setChecked?: Dispatch<SetStateAction<boolean>>;
  setDisabled?: Dispatch<SetStateAction<boolean>>;
  onChange: () => void;
  label?: string | null;
}

export default function RadioInput({
  checked = false,
  disabled = false,
  label,
  onChange,
}: RadioInputProps) {
  return (
    <div className="flex items-center justify-start p-0.5">
      <Radio checked={checked} disabled={disabled} onChange={onChange} className="text-xs">
        {label ? label : null}
      </Radio>
    </div>
  );
}
