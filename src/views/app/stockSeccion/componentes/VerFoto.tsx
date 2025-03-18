import ActionButton from '@/Components/ui/Buttons/ActionButton';
import { BiZoomIn } from 'react-icons/bi';
import { useState } from 'react';
import { useStockPorSeccion } from '@/store/useStockPorSeccion';
import CheckboxInput from '@/Components/ui/Inputs/Checkbox';

export default function VerFoto() {
  const [verFotoCheckbox, setVerFotoCheckbox] = useState(false);
  const { clearRubrosFetch, clearSeccionesFetch } = useStockPorSeccion();
  const handleClearStore = () => {
    clearRubrosFetch();
    clearSeccionesFetch();
  };
  return (
    <div className=" flex gap-2 w-60 border rounded-lg p-2 bg-slate-400">
      <div className="bg-white rounded-lg w-24 h-20 "></div>
      <div className=" flex flex-col gap-1 items-center justify-center">
        <CheckboxInput
          onChange={() => setVerFotoCheckbox((prev) => !prev)}
          checked={verFotoCheckbox}
          label="Mostrar foto"
          disabled={false}
        />
        <ActionButton
          color="greenSoft"
          onClick={() => handleClearStore()}
          size="sm"
          icon={<BiZoomIn />}
        />
      </div>
    </div>
  );
}
