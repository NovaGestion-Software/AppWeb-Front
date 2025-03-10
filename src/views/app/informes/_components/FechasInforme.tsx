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
  const [isLoading, setIsLoading] = useState(true);
  const { status, setFechas } = useVentasHoraStore();
  const rangePickerRef = useRef<any>(null);
  const activeInput = document.querySelector('.ant-picker-input-active');
  const disabledFutureDates = (current: dayjs.Dayjs) => current && current > dayjs().endOf('day');
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // shorcut
  useEffect(() => {
    const inputs = document.querySelectorAll('.ant-picker input');

    const handleKeyDown = (e: Event) => {
      const keyboardEvent = e as KeyboardEvent; // Hacemos un type assertion aquí
      if (inputs.length === 2) {
        if (document.activeElement === inputs[0] && keyboardEvent.key === 'Enter') {
          keyboardEvent.preventDefault();
          (inputs[1] as HTMLInputElement).focus();
          return;
        }

        if (keyboardEvent.key === 'Enter' && document.activeElement === inputs[1]) {
          keyboardEvent.preventDefault();
          handleData();
        }

        // Nuevo atajo: Escape para volver al primer input
        if (keyboardEvent.key === 'Escape' && document.activeElement === inputs[1]) {
          keyboardEvent.preventDefault();
          (inputs[0] as HTMLInputElement).focus();
        }
      }
    };

    inputs.forEach((input) => input.addEventListener('keydown', handleKeyDown as EventListener));
    return () => {
      inputs.forEach((input) =>
        input.removeEventListener('keydown', handleKeyDown as EventListener)
      );
    };
  }, []);

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      const periodoIni = dateRange.from.format('YYYY-MM-DD');
      const periodoFin = dateRange.to.format('YYYY-MM-DD');
      setFechas({ from: periodoIni, to: periodoFin });
      // console.log('fechas steads', fechas);
    }
  }, [dateRange]);

  useEffect(() => {
    if (setFocus) {
      focusDatePicker();
    }
  }, [setFocus]);

  useEffect(() => {
    if (!isLoading) {
      focusDatePicker();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isProcessing) {
      activeInput?.classList.remove('ant-picker-input-active');
    }
  }, [isProcessing]);

  const focusDatePicker = () => {
    const inputs = document.querySelectorAll('.ant-picker input');
    if (inputs.length > 0) {
      const input1 = inputs[0] as HTMLInputElement;
      input1.focus();
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
    /*
    const periodoIni = dateRange.from.format('YYYY-MM-DD');
    const periodoFin = dateRange.to.format('YYYY-MM-DD');
    await onFetchData({ from: periodoIni, to: periodoFin });
*/
  };

  const handleClear = () => {
    // setDateRange({ from: null, to: null });
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
          className="w-[35rem] xl:w-60 2xl:w-64 2xl:h-10"
          placeholder={['Inicio', 'Fin']}
          disabled={isProcessing}
          disabledDate={disabledFutureDates}
          presets={showPresets ? rangePresets : undefined}
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
