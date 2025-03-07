import { RiFileExcel2Fill, RiPrinterFill } from '@remixicon/react';
import ActionButton from '@/Components/ui/Buttons/ActionButton';
import { useEffect } from 'react';

interface DataItem {
  id: number;
  hora: string;
  nOperaciones: number |  string;
  porcentajeOperaciones: number | string;
  importe: string;
  porcentajeImporte: number | string;
  pares: number | string;
  porcentajePares: number | string;
}

interface HerramientasInformeProps {
  data: DataItem[];
  isProcessing: boolean;
  handleExportExcel: () => void;
  handlePrint: () => void;
  children: React.ReactNode;
}

export default function HerramientasInforme({
  data,
  isProcessing,
  handleExportExcel,
  handlePrint,
  children,
}: HerramientasInformeProps) {
  useEffect(() => {
    // Para evitar console.log (solo para deployar en vercel)
  }, [data]);
  return (
    <div className="flex items-center justify-center gap-6 h-14 py-2 px-4 bg-white rounded-lg border">
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
