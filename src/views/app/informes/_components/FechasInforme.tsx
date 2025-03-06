import { Dispatch, useEffect, useRef, useState } from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import { RiPlayCircleFill, RiCloseCircleFill } from '@remixicon/react';
import 'dayjs/locale/es';
import dayjs, { Dayjs } from 'dayjs';
import locale from 'antd/locale/es_ES';
import ActionButton from '@/Components/ui/Buttons/ActionButton';
import { FechasRango } from '@/types';

interface DateRange {
  from: Dayjs | null;
  to: Dayjs | null;
}

interface FechasInformeProps {
  setFechas: Dispatch<React.SetStateAction<FechasRango>>;
  onFetchData: (params: FechasRango) => Promise<void>;
  onClearData: () => void;
  isProcessing: boolean;
  placeholders?: [string, string];
  buttonText?: { fetch: string; clear: string };
  whitButttons?: boolean;
  showPresets?: boolean;
  setFocus: boolean;
  clearTrigger: boolean;
}

export default function FechasInforme({
  setFechas,
  onFetchData,
  onClearData,
  isProcessing = false,
  placeholders = ['Fecha inicio', 'Fecha fin'],
  buttonText,
  whitButttons,
  showPresets = true,
  setFocus,
  clearTrigger,
}: FechasInformeProps) {
  dayjs.locale('es');
  const defaultDate = {
    from: dayjs().startOf('month'),
    to: dayjs(),
  };
  console.log(onFetchData);
  const [dateRange, setDateRange] = useState<DateRange>(defaultDate);
  const disabledFutureDates = (current: dayjs.Dayjs) => current && current > dayjs().endOf('day');
  const rangePickerRef = useRef<any>(null);
  const focusDatePicker = () => {
    rangePickerRef.current?.focus();
  };

  useEffect(() => {
    if (setFocus) {
      // console.log('focus picker');
      focusDatePicker();
    }
  }, [setFocus]);

  useEffect(() => {
    if (clearTrigger) {
      setDateRange({ from: null, to: null }); // Limpiar estado
    }
  }, [clearTrigger]);

  // Usamos useEffect para escuchar el evento 'keydown' global
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownGlobal);

    // Limpiamos el evento cuando el componente se desmonta
    return () => {
      document.removeEventListener('keydown', handleKeyDownGlobal);
    };
  }, [dateRange]);

  const rangePresets: { label: string; value: [dayjs.Dayjs, dayjs.Dayjs] }[] = [
    {
      label: 'Ayer',
      value: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')],
    },
    { label: 'Últimos 7 Días', value: [dayjs().subtract(7, 'days'), dayjs()] },
    {
      label: 'Últimos 15 Días',
      value: [dayjs().subtract(15, 'days'), dayjs()],
    },
    {
      label: 'Últimos 30 Días',
      value: [dayjs().subtract(30, 'days'), dayjs()],
    },
    {
      label: 'Últimos 90 Días',
      value: [dayjs().subtract(90, 'days'), dayjs()],
    },
    { label: 'Este Mes', value: [dayjs().startOf('month'), dayjs()] },
    {
      label: 'Mes Pasado',
      value: [
        dayjs().subtract(1, 'month').startOf('month'),
        dayjs().subtract(1, 'month').endOf('month'),
      ],
    },
    {
      label: 'Año Pasado',
      value: [
        dayjs().subtract(1, 'year').startOf('year'),
        dayjs().subtract(1, 'year').endOf('year'),
      ],
    },
  ];

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

  const handleChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    // Si dates es nulo, limpiar el estado
    if (!dates) {
      setDateRange({ from: null, to: null });
      setFechas({ from: null, to: null });
      return;
    }

    const [newFrom, newTo] = dates;

    // Establecer el nuevo rango de fechas
    setDateRange({ from: newFrom, to: newTo });

    // Solo establecer las fechas en setFechas si ambas fechas son válidas
    if (newFrom && newTo) {
      const periodoIni = newFrom.format('YYYY-MM-DD');
      const periodoFin = newTo.format('YYYY-MM-DD');
      setFechas({ from: periodoIni, to: periodoFin });
      // } else {
      //   // Si alguna fecha es null, limpiar las fechas
      //   setFechas({ from: null, to: null });
    }
  };

  const handleData = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      alert('Rango de fechas inválido');
      focusDatePicker();
      return;
    }
    const periodoIni = dateRange.from.format('YYYY-MM-DD');
    const periodoFin = dateRange.to.format('YYYY-MM-DD');
    // await onFetchData({ from: periodoIni, to: periodoFin });
    setFechas({ from: periodoIni, to: periodoFin });
  };

  const handleClear = () => {
    setDateRange({ from: null, to: null });
    // console.log('handle clear usado en el hijo');
    onClearData();
  };

  return (
    <div className="flex items-center justify-center h-14 py-2 px-4 gap-6 bg-white rounded-lg">
      <ConfigProvider locale={locale}>
        <DatePicker.RangePicker
          ref={rangePickerRef}
          value={[dateRange.from, dateRange.to]}
          format="DD/MM/YYYY"
          onChange={handleChange}
          className="w-[35rem] 2xl:w-56 2xl:h-10"
          placeholder={placeholders}
          disabled={isProcessing}
          disabledDate={disabledFutureDates}
          presets={showPresets ? rangePresets : undefined}
          onKeyDown={handleKeyDown}
          needConfirm
        />
      </ConfigProvider>

      {whitButttons && (
        <>
          <ActionButton
            text={buttonText?.fetch || ''}
            icon={<RiPlayCircleFill className="w-5 h-5" />}
            color="green"
            onClick={handleData}
            disabled={isProcessing}
          />

          <ActionButton
            text={buttonText?.clear || ''}
            icon={<RiCloseCircleFill className="w-5 h-5" />}
            color="red"
            onClick={handleClear}
            disabled={!isProcessing}
          />
        </>
      )}
    </div>
  );
}
