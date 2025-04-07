import { RiFileExcel2Fill, RiPrinterFill } from '@remixicon/react';
import ActionButton from '@/Components/ui/Buttons/ActionButton';
import { useEffect } from 'react';

interface HerramientasInformeProps<T> {
  data: T[]; // ✅ Ahora acepta cualquier tipo de datos
  isProcessing: boolean;
  handleExportExcel: () => void;
  handlePrint: () => void;
  children: React.ReactNode;
  disabled1?: boolean;
  disabled2?: boolean;
}

export default function HerramientasInforme<T>({
  data,
  isProcessing,
  handleExportExcel,
  handlePrint,
  disabled1,
  disabled2,
  children,
}: HerramientasInformeProps<T>) {
  useEffect(() => {
    // Para evitar console.log (solo para deployar en vercel)
  }, [data]);

  return (
    <div className="flex items-center justify-center gap-6 py-1 h-10 px-4 bg-white w-fit rounded-lg ">
      {children}
      <ActionButton
        onClick={handleExportExcel}
        disabled={disabled1}
        size="xs"
        className="rounded-md"
        color={isProcessing ? 'green' : 'grayDeshab'}
        icon={<RiFileExcel2Fill size={20} />}
      />
      <ActionButton
        onClick={handlePrint}
        disabled={disabled2}
        size="xs"
        className="rounded-md"
        color={isProcessing ? 'blue' : 'grayDeshab'}
        icon={<RiPrinterFill size={20} />}
      />
    </div>
  );
}
