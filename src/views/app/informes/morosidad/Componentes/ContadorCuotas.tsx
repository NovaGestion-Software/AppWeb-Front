import { FlexibleInputField } from "@/frontend-resourses/components";
import { useState } from "react";

export default function ContadorCuotas({ className, disabled }: { className?: string; disabled?: boolean }) {
  const [value, setValue] = useState(1);

  const handleChange = (value: string | boolean) => {
    const newValue = parseInt(value as string);
    if (!isNaN(newValue) && newValue >= 1) {
      // Solo actualiza si es ≥1
      setValue(newValue);
    }
  };
  return (
    <div className={`${className} `}>
      <FlexibleInputField
        arrows={true}
        label="Cuotas"
        min={1}
        inputType="number"
        value={value.toString()}
        onChange={handleChange}
        stacked={true}
        containerClassName="bg-white p-2 rounded-lg relative -top-6 v1440:top-0 "
        labelAlign="left"
        disabled={disabled}
        labelClassName="w-fit -mb-1 text-[0.625rem] relative"
        inputClassName={`focus:ring-0 h-[1.4rem] text-[0.480rem] 
       rounded-sm py-0 text-[0.525rem] ${disabled ? "text-gray-400" : ""}`}
      />
    </div>
  );
}
