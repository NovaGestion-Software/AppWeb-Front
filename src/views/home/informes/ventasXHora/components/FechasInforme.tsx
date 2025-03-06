import { useEffect, useRef, useState } from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import { RiPlayCircleFill, RiCloseCircleFill } from '@remixicon/react';
import dayjs, { Dayjs } from 'dayjs';
import locale from 'antd/locale/es_ES';
import 'dayjs/locale/es';

interface Fechas {
  from: string | null;
  to: string | null;
}

interface DateRange {
  from: Dayjs | null;
  to: Dayjs | null;
}

interface FechasInformeProps {
  onFetchData: (params: Fechas) => Promise<void>;
  onClearData: () => void;
  isProcessing: boolean;
  placeholders?: [string, string];
  buttonText?: { fetch: string; clear: string };
  whitButttons?: boolean;
  presets?: { label: string; value: [dayjs.Dayjs, dayjs.Dayjs] }[];
  setFocus: boolean;
  clearTrigger: boolean;
}

export default function FechasInforme({
  onFetchData,
  onClearData,
  isProcessing = false,
  placeholders = ['Fecha inicio', 'Fecha fin'],
  buttonText = { fetch: 'Procesar', clear: 'Limpiar' },
  whitButttons,
  presets,
  setFocus,
  clearTrigger,
}: FechasInformeProps) {
  dayjs.locale('es');
  const [isLoading, setIsLoading] = useState(true);
  const defaultDate = {
    from: dayjs().startOf('month'),
    to: dayjs(),
  };
  const [dateRange, setDateRange] = useState<DateRange>(defaultDate);
  // Deshabilitar días después de la fecha actual
  const disabledFutureDates = (current: dayjs.Dayjs) => current && current > dayjs().endOf('day');
  const rangePickerRef = useRef<any>(null);
  const focusDatePicker = () => {
    rangePickerRef.current?.focus();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (setFocus) {
      console.log('focus picker');
      focusDatePicker();
    }
  }, [setFocus]);

  useEffect(() => {
    if (clearTrigger) {
      setDateRange({ from: null, to: null }); // Limpiar estado
    }
  }, [clearTrigger]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Comprobamos si ambos campos están llenos y si la tecla presionada es Enter
    if (e.key === 'Enter' && dateRange.from && dateRange.to) {
      e.preventDefault();
      handleData();
    }
  };

  const handleKeyDownGlobal = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && dateRange.from && dateRange.to) {
      e.preventDefault(); // Prevenimos la acción predeterminada
      handleData();
    }
  };

  // Procesar datos
  const handleData = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      alert('Rango de fechas inválido');
      focusDatePicker();
      return;
    }
    const periodoIni = dateRange.from.format('YYYY-MM-DD');
    const periodoFin = dateRange.to.format('YYYY-MM-DD');
    await onFetchData({ from: periodoIni, to: periodoFin });
  };

  const handleClear = () => {
    setDateRange({ from: null, to: null });
    console.log('handle clear usado en el hijo');
    onClearData();
  };

  // Usamos useEffect para escuchar el evento 'keydown' global
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownGlobal);

    // Limpiamos el evento cuando el componente se desmonta
    return () => {
      document.removeEventListener('keydown', handleKeyDownGlobal);
    };
  }, [dateRange]);

  return (
    <div className="flex flex-row gap-6 items-center justify-center py-2 h-14 px-4 bg-white rounded-lg">
      {isLoading ? (
        <div className="animate-pulse">
          <div className="w-60 h-10 bg-gray-200 rounded-lg"></div>
        </div>
      ) : (
        <ConfigProvider locale={locale}>
          <DatePicker.RangePicker
            ref={rangePickerRef}
            value={[dateRange?.from, dateRange?.to]}
            format="DD/MM/YYYY"
            onChange={(dates) => setDateRange({ from: dates?.[0] ?? null, to: dates?.[1] ?? null })}
            className="w-[35rem] 2xl:w-56 2xl:h-10"
            placeholder={placeholders}
            disabled={isProcessing}
            disabledDate={disabledFutureDates}
            presets={presets}
            onKeyDown={handleKeyDown}
            needConfirm
          />
        </ConfigProvider>
      )}

      {whitButttons && (
        <>
          <button
            onClick={handleData}
            disabled={isProcessing}
            className={`w-52 h-8 2xl:w-44 2xl:h-10  px-2
          rounded-md flex flex-row gap-1 items-center justify-center text-xs 2xl:text-base  ${
            isProcessing ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
          >
            {buttonText.fetch}
            <RiPlayCircleFill className="w-5 h-5 " />
          </button>

          <button
            disabled={!isProcessing}
            onClick={handleClear}
            className={`w-52 h-8 2xl:w-44 2xl:h-10  px-1 rounded-md text-white flex flex-row items-center justify-center gap-2 text-xs 2xl:text-base  ${
              isProcessing
                ? 'bg-blue-500 hover:bg-blue-700'
                : 'bg-gray-500 cursor-not-allowed border-none'
            }`}
          >
            {buttonText.clear}
            <RiCloseCircleFill className="w-5 h-5 " />
          </button>
        </>
      )}
    </div>
  );
}
