import { Checkbox } from 'antd';
import { Dispatch, SetStateAction } from 'react';

interface InputCheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  setChecked?: Dispatch<SetStateAction<boolean>>;
  setDisabled?: Dispatch<SetStateAction<boolean>>;
  onChange: () => void;
  label?: string | null;
}
export default function CheckboxInput({
  checked = true,
  disabled = true,
  label,
  onChange,
}: InputCheckboxProps) {
  return (
    <div className="flex items-center justify-start p-0.5 ">
      <Checkbox checked={checked} disabled={disabled} onChange={onChange} className="text-xs">
        {label ? label : null}
      </Checkbox>
    </div>
  );
}
