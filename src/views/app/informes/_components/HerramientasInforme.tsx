import { RiFileExcel2Fill, RiPrinterFill } from '@remixicon/react';
import ActionButton from '@/frontend-resourses/components/Buttons/ActionButton';
import { useEffect } from 'react';
import { IoTrash } from 'react-icons/io5';

interface HerramientasInformeProps<T> {
  data: T[]; // ✅ Ahora acepta cualquier tipo de datos
  isProcessing: boolean;
  handleExportExcel: () => void;
  handlePrint: () => void;
  handleClean?: () => void;
  disabledExportExcel?: boolean;
  disabledPrint?: boolean;
  disabledClean?: boolean;
}

export default function HerramientasInforme<T>({ data, isProcessing, handleExportExcel, handlePrint,handleClean, disabledExportExcel, disabledPrint,disabledClean }: HerramientasInformeProps<T>) {
  useEffect(() => {
    // Para evitar console.log (solo para deployar en vercel)
  }, [data]);

  return (
    <div className="flex items-center justify-center gap-6  h-10    w-fit rounded-lg ">
      <ActionButton onClick={handleExportExcel} disabled={disabledExportExcel} size="xs" addClassName="rounded-md 2xl:h-8" color={isProcessing ? 'green' : 'grayDeshab'} icon={<RiFileExcel2Fill size={20} />} />
      <ActionButton onClick={handlePrint} disabled={disabledPrint} size="xs" addClassName="rounded-md 2xl:h-8" color={isProcessing ? 'blue' : 'grayDeshab'} icon={<RiPrinterFill size={20} />} />
      <ActionButton icon={<IoTrash size={18} />}  color={isProcessing ? 'red' : 'grayDeshab'} addClassName="rounded-md 2xl:h-8 2xl:w-12" size="xs" onClick={handleClean || (() => {})} disabled={disabledClean} />
    </div>
  );
}
