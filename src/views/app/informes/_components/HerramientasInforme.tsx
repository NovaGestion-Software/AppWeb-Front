import { RiFileExcel2Fill, RiPrinterFill } from '@remixicon/react';
import ActionButton from '@/frontend-resourses/components/Buttons/ActionButton';
import { useEffect } from 'react';
import { IoTrash } from 'react-icons/io5';


interface HerramientasInformeProps<T> {
  data: T[]; // ✅ Ahora acepta cualquier tipo de datos
  estaProcesado: boolean;
  handleExportExcel: () => void;
  handlePrint: () => void;
  handleClean?: () => void;
  disabledExportExcel?: boolean;
  disabledPrint?: boolean;
  disabledClean?: boolean;
}

export default function HerramientasInforme<T>({ data, handleExportExcel, handlePrint,handleClean, disabledExportExcel, disabledPrint,disabledClean }: HerramientasInformeProps<T>) {
  useEffect(() => {
    // Para evitar console.log (solo para deployar en vercel)
  }, [data]);

  return (
    <div className="flex items-center justify-center gap-6  h-10    w-fit rounded-lg ">
      <ActionButton onClick={handleExportExcel} disabled={disabledExportExcel} 
      addClassName="h-7  rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm" 
      color="green" icon={<RiFileExcel2Fill className='h-4 w-4 v1536:h-6 v1536:w-6' />} />
      <ActionButton onClick={handlePrint} disabled={disabledPrint} 
      addClassName="h-7  rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm" 
      color="blue" icon={<RiPrinterFill  className='h-4 w-4 v1536:h-6 v1536:w-6' />} />
      <ActionButton icon={<IoTrash  className='h-4 w-4 v1536:h-6 v1536:w-6' />}  color="red" 
      addClassName="h-7  rounded-md text-xs v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm 2xl:w-12" 
      onClick={handleClean || (() => {})} disabled={disabledClean} />
    </div>
  );
}
