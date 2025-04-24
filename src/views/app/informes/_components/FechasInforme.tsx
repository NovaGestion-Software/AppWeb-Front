import { useEffect, useRef, useState } from "react";
import { useVentasHoraStore } from "@/store/useVentasHoraStore";
import { DatePicker, ConfigProvider } from "antd";
import { FechasRango } from "@/types";
import { RiPlayCircleFill, RiCloseCircleFill } from "@remixicon/react";
import "dayjs/locale/es";
import dayjs, { Dayjs } from "dayjs";
import locale from "antd/locale/es_ES";
import ActionButton from "@/Components/ui/Buttons/ActionButton";
import showAlert from "@/utils/showAlert";

interface DateRange {
  from: Dayjs | null;
  to: Dayjs | null;
}

interface FechasInformeProps {
  onFetchData: (dates: FechasRango) => Promise<void>;
  onClearData: () => void;
  estaProcesado?: boolean;
  conBotones?: boolean;
  textoBotones?: { fetch: string; clear: string };
  showPresets?: boolean;
  setFocus?: boolean;
  setFechas?: (data: FechasRango) => void;
}

export default function FechasInforme({
  onFetchData,
  onClearData,
  estaProcesado = false,
  textoBotones,
  conBotones,
  showPresets = true,
  setFocus,
  setFechas,
}: FechasInformeProps) {
  dayjs.locale("es");
  const [isLoading, setIsLoading] = useState(true);
  // setea del primero del mes a la fecha del dia actual como estado inicial.
  const defaultDate = {
    from: dayjs().startOf("month"),
    to: dayjs(),
  };
  const [dateRange, setDateRange] = useState<DateRange>(defaultDate);

  // seteador de fechas del componente padre.
  const setFechasSetter = setFechas;

  // desahbilitar dias posteriores a la fecha
  const disabledFutureDates = (current: dayjs.Dayjs) =>
    current && current > dayjs().endOf("day");

  // referencia al input
  const rangePickerRef = useRef<any>(null);

  // BRANCH INFORME -- esto tiene que ser props
  const { status } = useVentasHoraStore();
console.log('status', status)
  // Rangos de fechas
  const rangePresets: { label: string; value: [dayjs.Dayjs, dayjs.Dayjs] }[] = [
    {
      label: "Ayer",
      value: [dayjs().subtract(1, "day"), dayjs().subtract(1, "day")],
    },
    { label: "Últimos 7 Días", value: [dayjs().subtract(7, "days"), dayjs()] },
    {
      label: "Últimos 15 Días",
      value: [dayjs().subtract(15, "days"), dayjs()],
    },
    {
      label: "Últimos 30 Días",
      value: [dayjs().subtract(30, "days"), dayjs()],
    },
    // {
    //   label: 'Últimos 90 Días',
    //   value: [dayjs().subtract(90, 'days'), dayjs()],
    // },
    { label: "Este Mes", value: [dayjs().startOf("month"), dayjs()] },
    {
      label: "Mes Pasado",
      value: [
        dayjs().subtract(1, "month").startOf("month"),
        dayjs().subtract(1, "month").endOf("month"),
      ],
    },
    {
      label: "Este Año",
      value: [dayjs().startOf("year"), dayjs()],
    },
    {
      label: "Año Pasado",
      value: [
        dayjs().subtract(1, "year").startOf("year"),
        dayjs().subtract(1, "year").endOf("year"),
      ],
    },
  ];

  // Simula estado de carga
  useEffect(() => {
    // evita que el input se rompa al cargar los estilos.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);
  // inputs con clases  .ant-picker input (se los identifica asi porque son los unicos de esta libreria. Posible falla en compartir varios.)
  const inputs = document.querySelectorAll(".ant-picker input");

  // shorcut
  useEffect(() => {
    // seteo los inputs de basandome en la clase.
  const inputs = document.querySelectorAll(".ant-picker input");

    console.log("general active", document.activeElement);

    const handleKeyDown = (e: Event) => {
      const keyboardEvent = e as KeyboardEvent;
      // solo si estan los dos inputs de este componente
      if (inputs.length === 2) {
        // solo si esta activado el inputs[0]
        // se pasa el focus al inputs[1]
        if (
          document.activeElement === inputs[0] &&
          keyboardEvent.key === "Enter"
        ) {
          console.log("active1", document.activeElement);
          keyboardEvent.preventDefault();
          (inputs[1] as HTMLInputElement).focus();
          return;
        }

        // si aprietan enter y el input[1] esta activo, inicia handleData();
        if (
          document.activeElement === inputs[1] &&
          keyboardEvent.key === "Enter"
        ) {
          console.log("active2", document.activeElement);
          keyboardEvent.preventDefault();
          handleData();
          deselectText(inputs[1] as HTMLInputElement);
          handleRemoveFocus(inputs);
        }

        // Escape para volver al primer input
        if (
          keyboardEvent.key === "Escape" &&
          document.activeElement === inputs[1]
        ) {
          focusDatePicker(inputs);
        }
      }
    };

    // Añadir event listeners
    inputs.forEach((input) => {
      const htmlInput = input as HTMLInputElement;
      // Seleccionar todo el texto cuando el input recibe el foco
      input.addEventListener("focus", () => selectAllText(htmlInput));
      // Manejar atajos de teclado
      input.addEventListener("keydown", handleKeyDown);
    });
    return () => {
      inputs.forEach((input) => {
        const htmlInput = input as HTMLInputElement;
        input.removeEventListener("focus", () => selectAllText(htmlInput));
        input.removeEventListener("keydown", handleKeyDown);
      });
    };
  }, []);

  // -------- entonces este setea las fechas al padre de manera automatica.

  // si cambío el date range, separa las partes y lo setea.
  useEffect(() => {
    if (dateRange.from && dateRange.to && setFechasSetter) {
      const periodoIni = dateRange.from.format("YYYY-MM-DD");
      const periodoFin = dateRange.to.format("YYYY-MM-DD");

      setFechasSetter({ from: periodoIni, to: periodoFin });
      // console.log('fechas steads', fechas);
    }
  }, [dateRange]);

  // todo focusDatePicker puede ser una funcion donde le pases los inputs, y los setFocus.
  // donde le pases todas las variables cuando queres que se active,
  //  si isloading es false, si focus es true, si estate es idle.
  // quitar foco puede correr si cierta variable es true.
  // volver el foco al input date.

  // FUNCIONES
  // seleciconar el texto del input.
  function selectAllText(input: HTMLInputElement) {
    if (input) input.select();
  }
  // deseleccionar el texto del input
  function deselectText(input: HTMLInputElement) {
    if (input) {
      input.setSelectionRange(0, 0); // Deselecciona el texto
    }
  }

  // funcion para poner el foco en el input.
  function focusDatePicker(inputs: NodeListOf<Element>): void {
    if (inputs.length > 0) {
      const input1 = inputs[0] as HTMLInputElement;
      console.log("active funcion");
      input1.focus();
    }
  }
  // quitar foco al input
  function handleRemoveFocus(inputs: NodeListOf<Element>) {
    inputs.forEach((input) => {
      if (document.activeElement === input) {
        (input as HTMLInputElement).blur();
      }
    });
  }


  // correr focusDatePicker
  useEffect(() => {
    if (setFocus) {
      focusDatePicker(inputs);
    }
  }, [setFocus]);

  // poner el foco en el input cuando se termina de cargar.
  useEffect(() => {
    if (!isLoading) {
      focusDatePicker(inputs);
    }
  }, [isLoading]);

  // ------ y aca lo seteamos con el handle click para hacer el fetch de data.
  //-------  y en el use effect se usa para cambiar la store.
  // ----- el proceso es el mismo?
  // esto pregunta si las fechas son validas y si lo son,
  const handleData = async () => {
    try {
      const { from, to } = dateRange;
      // si hay una fecha que no tenga valor, tirar swal.
      // es decir en este boton comprobamos que las fechas sean correctas, sino tiramos error
      // y luego seteamos el objeto dates con las fechas actuales.
      // y con dates se lo pasamos al onfetchdata.
      // el tema es que el onfetch data no usa el dates.
      if (!from || !to) {
        showAlert({
          text: "Debes elegir un rango de fechas",
          icon: "warning",
          confirmButtonText: "OK",
          showConfirmButton: true,
          timer: 1800,
          willClose: () => focusDatePicker(inputs),
        });
        return;
      }

      const dates = {
        from: from.format("YYYY-MM-DD"),
        to: to.format("YYYY-MM-DD"),
      };
      // aca va el handlefetch del padre.
      // entonces   la declaracion del dates es al pedo.
      // digamos que esto sirve para comprobar que las fechas sean validas antes de mandar el handleData que le pases.-
      await onFetchData(dates);
    } catch (error) {
      console.log(error);
      focusDatePicker(inputs);
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

  // entonces lo que hay que pasarle es:
  // activeFoco, para poner el foco en el input cuando se quiera.
  // posibilidad: evitar pasarselo como props, sino tenerlo en el inicio del componente, cuando salen errores, y con el escape


  return (
    <div className="flex items-center justify-around h-10 bg-white rounded-lg 2xl:h-14">
      <ConfigProvider locale={locale}>
        <DatePicker.RangePicker
          ref={rangePickerRef}
          value={[dateRange.from, dateRange.to]}
          format="DD/MM/YYYY"
          onChange={(dates) =>
            setDateRange({ from: dates?.[0] ?? null, to: dates?.[1] ?? null })
          }
          className="h-6 w-64 2xl:h-8"
          placeholder={["Inicio", "Fin"]}
          disabled={estaProcesado}
          disabledDate={disabledFutureDates}
          presets={showPresets ? rangePresets : undefined}
        />
      </ConfigProvider>

      {conBotones && (
        <div className="flex gap-3">
          <ActionButton
            text={
              status === "pending" ? "Procesando..." : textoBotones?.fetch || ""
            }
            icon={<RiPlayCircleFill className="w-5 h-5" />}
            color="green"
            size="xs"
            className="2xl:h-8 2xl:text-sm rounded-md"
            onClick={handleData}
            disabled={estaProcesado || status === "pending"}
          />

          <ActionButton
            text={textoBotones?.clear || ""}
            icon={<RiCloseCircleFill className="w-5 h-5" />}
            color="red"
            size="xs"
            className="2xl:h-8 2xl:text-sm rounded-md"
            onClick={handleClear}
            disabled={!estaProcesado}
          />
        </div>
      )}
    </div>
  );
}
