import { RiFileExcel2Fill, RiPrinterFill } from '@remixicon/react';
import ActionButton from '@/Components/ui/Buttons/ActionButton';
import { useEffect } from 'react';

interface HerramientasInformeProps<T> {
  data: T[]; // ✅ Ahora acepta cualquier tipo de datos
  isProcessing: boolean;
  handleExportExcel: () => void;
  handlePrint: () => void;
  children: React.ReactNode;
}

export default function HerramientasInforme<T>({
  data,
  isProcessing,
  handleExportExcel,
  handlePrint,
  children,
}: HerramientasInformeProps<T>) {
  useEffect(() => {
    // Para evitar console.log (solo para deployar en vercel)
  }, [data]);

  return (
    <div className="flex items-center justify-center gap-6 py-2 h-14  px-4 bg-white w-fit rounded-lg border">
      {children}
      <ActionButton
        onClick={handleExportExcel}
        disabled={!isProcessing}
        color={isProcessing ? 'green' : 'grayDeshab'}
        icon={<RiFileExcel2Fill />}
      />
      <ActionButton
        onClick={handlePrint}
        disabled={!isProcessing}
        color={isProcessing ? 'blue' : 'grayDeshab'}
        icon={<RiPrinterFill />}
      />
    </div>
  );
}
