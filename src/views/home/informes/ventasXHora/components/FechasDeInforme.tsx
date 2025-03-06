import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DatePicker, ConfigProvider } from "antd";
import dayjs, { Dayjs } from "dayjs";
import locale from "antd/locale/es_ES";
import "dayjs/locale/es";
import { RiPlayCircleFill, RiCloseCircleFill } from "@remixicon/react";
interface Fechas {
  from: string | null;
  to: string | null;
}
interface DateRange {
  from: Dayjs | null;
  to: Dayjs | null;
}
interface FechasProps {
  onFetchData: (params: Fechas) => Promise<void>;
  onClearData: () => void;
  isProcessing: boolean;
  placeholders?: [string, string];
  buttonText?: { fetch: string; clear: string };
  whitButttons?: boolean;
  presets?: { label: string; value: [dayjs.Dayjs, dayjs.Dayjs] }[];
  setFocus: boolean;
}

function FechasInforme({
  onFetchData,
  onClearData,
  isProcessing = false,
  placeholders = ["Fecha inicio", "Fecha fin"],
  buttonText = { fetch: "Procesar", clear: "Limpiar" },
  whitButttons,
  presets,
  setFocus,
}: FechasProps) {
  dayjs.locale("es");
  const [isLoading, setIsLoading] = useState(true);
  const defaultDate = {
    from: dayjs().startOf("month"),
    to: dayjs(),
  };
  const [dateRange, setDateRange] = useState<DateRange>(defaultDate);
  const rangePickerRef = useRef<any>(null);
  const activeInput = document.querySelector(".ant-picker-input-active");
  // Deshabilitar días después de la fecha actual
  const disabledFutureDates = (current: dayjs.Dayjs) =>
    current && current > dayjs().endOf("day");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (setFocus) {
      console.log("focus picker");
      focusDatePicker();
    }
  }, [setFocus]);

  useEffect(() => {
    if (!isLoading) {
      focusDatePicker();
    }
  }, [isLoading]);

  const focusDatePicker = () => {
    // Buscar los dos inputs
    const inputs = document.querySelectorAll(".ant-picker input");
    if (inputs.length > 0) {
      // Colocar el foco en el primer input
      const input1 = inputs[0] as HTMLInputElement;
      input1.focus();
  
      // Añadir un pequeño retraso para asegurarnos de que el foco se haya establecido
      setTimeout(() => {
        console.log('Foco en el primer input establecido');
      }, 500);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Buscar los dos inputs
    const inputs = document.querySelectorAll(".ant-picker input");
  
    if (inputs.length === 2) {
      // Si estamos en el primer input y presionamos Enter, pasamos al siguiente
      if (e.key === "Enter" && document.activeElement === inputs[0]) {
        console.log('paso por input 1');
        e.preventDefault();
        (inputs[1] as HTMLInputElement).focus();
        return;
      }
  
      // Si estamos en el segundo input y presionamos Enter, procesamos los datos
      if (e.key === "Enter" && document.activeElement === inputs[1]) {
        console.log('paso por input 2');
        e.preventDefault();
        handleData(); // Procesamos los datos
      }
    }
  };
  


  useEffect(() => {
    // Establecer foco en el primer input al renderizar el componente
    if (isProcessing) {
      activeInput?.classList.remove("ant-picker-input-active");
    }
  }, [isProcessing]);

  
    // Procesar datos
    const handleData = async () => {
      if (!dateRange?.from || !dateRange?.to) {
        alert("Rango de fechas inválido");
        focusDatePicker();
        return;
      }
      const periodoIni = dateRange.from.format("YYYY-MM-DD");
      const periodoFin = dateRange.to.format("YYYY-MM-DD");
      await onFetchData({ from: periodoIni, to: periodoFin });
    };
  
    const handleClear = () => {
      onClearData();
    }

  // Funcion para hacer poder procesar apenas se entra a la visual. (va a ser inneesaria si al ingresar el foco esta en los inputs.)
  // const handleKeyDownGlobal = (e: KeyboardEvent) => {
  //   if (e.key === "Enter" && dateRange.from && dateRange.to) {
  //     e.preventDefault();
  //     handleData();
  //   }
  // };

  // // Usamos useEffect para escuchar el evento 'keydown' global
  // useEffect(() => {
  //   document.addEventListener("keydown", handleKeyDownGlobal);

  //   // Limpiamos el evento cuando el componente se desmonta
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDownGlobal);
  //   };
  // }, [dateRange]);

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
            onChange={(dates) =>
              setDateRange({ from: dates?.[0] ?? null, to: dates?.[1] ?? null })
            }
            className="w-[35rem] 2xl:w-60 2xl:h-10 disabled:text-black"
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
            isProcessing
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
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
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-500 cursor-not-allowed border-none"
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

export default FechasInforme;
