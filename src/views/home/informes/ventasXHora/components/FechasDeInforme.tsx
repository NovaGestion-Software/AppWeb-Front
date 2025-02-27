import { useState } from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import locale from 'antd/locale/es_ES';
import 'dayjs/locale/es';
import { RiPlayCircleFill, RiCloseCircleFill } from '@remixicon/react';

interface FechasInformeProps {
  onFetchData: (params: { from: string; to: string }) => void;
  onClearData: () => void;
  isProcessing?: boolean;
  placeholders: [string, string];
  buttonText?: { fetch: string; clear: string };
  whitButttons: boolean;
  presets?: any[];
}

export default function FechasInforme({
  onFetchData,
  onClearData,
  isProcessing = false,
  placeholders = ['Fecha inicio', 'Fecha fin'],
  buttonText = { fetch: 'Procesar', clear: 'Limpiar' },
  whitButttons,
  presets,
}: FechasInformeProps) {
  dayjs.locale('es');

  const [dateRange, setDateRange] = useState<{
    from: dayjs.Dayjs | null;
    to: dayjs.Dayjs | null;
  }>({
    from: null,
    to: null,
  });

  const dateFormat = 'DD/MM/YYYY';

  // Deshabilitar días después de la fecha actual
  const disabledFutureDates = (current: any) => current && current > dayjs().endOf('day');

  // Procesar datos
  const handleData = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      alert('Rango de fechas inválido');
      return;
    }
    const periodoIni = dateRange.from.format('YYYY-MM-DD');
    const periodoFin = dateRange.to.format('YYYY-MM-DD');
    await onFetchData({ from: periodoIni, to: periodoFin });
  };

  const handleClear = () => {
    setDateRange({ from: null, to: null });
    onClearData();
  };

  //console.log(dateRange)
  return (
    <div className="flex flex-row gap-6 items-center justify-center py-2 h-14 px-4 bg-white rounded-lg">
      <ConfigProvider locale={locale}>
        <DatePicker.RangePicker
          value={[dateRange.from, dateRange.to]}
          format={dateFormat}
          onChange={(dates) => {
            if (dates) {
              setDateRange({ from: dates[0] ?? null, to: dates[1] ?? null });
            } else {
              setDateRange({ from: null, to: null });
            }
          }}
          className="w-[35rem] 2xl:w-56 2xl:h-10"
          placeholder={placeholders}
          disabled={isProcessing}
          disabledDate={disabledFutureDates}
          presets={presets}
        />
      </ConfigProvider>

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
