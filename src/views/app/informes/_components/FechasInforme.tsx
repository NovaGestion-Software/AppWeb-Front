import { useEffect, useRef, useState } from 'react';
import { useVentasHoraStore } from '@/store/useVentasHoraStore';
import { DatePicker, ConfigProvider } from 'antd';
import { FechasRango } from '@/types';
import { RiPlayCircleFill, RiCloseCircleFill } from '@remixicon/react';
import 'dayjs/locale/es';
import dayjs, { Dayjs } from 'dayjs';
import locale from 'antd/locale/es_ES';
import ActionButton from '@/Components/ui/Buttons/ActionButton';
import showAlert from '@/utils/showAlert';

interface DateRange {
  from: Dayjs | null;
  to: Dayjs | null;
}

interface FechasInformeProps {
  onFetchData: (params: FechasRango) => Promise<void>;
  onClearData: () => void;
  isProcessing: boolean;
  buttonText?: { fetch: string; clear: string };
  whitButttons?: boolean;
  showPresets?: boolean;
  setFocus: boolean;
}

export default function FechasInforme({
  onFetchData,
  onClearData,
  isProcessing = false,
  buttonText,
  whitButttons,
  showPresets = true,
  setFocus,
}: FechasInformeProps) {
  dayjs.locale('es');
  const defaultDate = {
    from: dayjs().startOf('month'),
    to: dayjs(),
  };
  const [dateRange, setDateRange] = useState<DateRange>(defaultDate);
  const disabledFutureDates = (current: dayjs.Dayjs) => current && current > dayjs().endOf('day');
  const rangePickerRef = useRef<any>(null);
  const { status, setFechas } = useVentasHoraStore();

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      const periodoIni = dateRange.from.format('YYYY-MM-DD');
      const periodoFin = dateRange.to.format('YYYY-MM-DD');
      setFechas({ from: periodoIni, to: periodoFin });
    } else {
      setFechas({ from: '', to: '' });
    }
  }, [dateRange]);

  useEffect(() => {
    if (setFocus) {
      // console.log('focus picker');
      focusDatePicker();
    }
  }, [setFocus]);

  // Usamos useEffect para escuchar el evento 'keydown' global
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownGlobal);

    // Limpiamos el evento cuando el componente se desmonta
    return () => {
      document.removeEventListener('keydown', handleKeyDownGlobal);
    };
  }, [dateRange]);

  const focusDatePicker = () => {
    rangePickerRef.current?.focus();
  };

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
      label: 'Este Año',
      value: [dayjs().startOf('year'), dayjs()],
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

  const handleData = async () => {
    try {
      const { from, to } = dateRange;

      if (!from || !to) {
        showAlert({
          text: 'Debes elegir un rango de fechas',
          icon: 'warning',
          confirmButtonText: 'OK',
          showConfirmButton: true,
          timer: 1800,
          willClose: () => focusDatePicker(),
        });
        return;
      }

      const dates = {
        from: from.format('YYYY-MM-DD'),
        to: to.format('YYYY-MM-DD'),
      };

      await onFetchData(dates);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setDateRange({ from: null, to: null });
    onClearData();
  };

  return (
    <div className="flex items-center justify-center h-14 py-2 px-4 gap-6 bg-white rounded-lg">
      <ConfigProvider locale={locale}>
        <DatePicker.RangePicker
          ref={rangePickerRef}
          value={[dateRange.from, dateRange.to]}
          format="DD/MM/YYYY"
          onChange={(dates) => setDateRange({ from: dates?.[0] ?? null, to: dates?.[1] ?? null })}
          className="w-[35rem] 2xl:w-56 2xl:h-10"
          placeholder={['Inicio', 'Fin']}
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
            text={status === 'pending' ? 'Procesando...' : buttonText?.fetch || ''}
            icon={<RiPlayCircleFill className="w-5 h-5" />}
            color="green"
            onClick={handleData}
            disabled={isProcessing || status === 'pending'}
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
