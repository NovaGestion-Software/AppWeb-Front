import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { movCajaData, movCajaFooter } from "../Data/data";
import BotoneraTabla from "./BotoneraTabla";
import { useMovCajaTotalesStore } from "../Store/store";

interface TablaProps {
  className?: string;
}

export default function Tabla({ className }: TablaProps) {
  const { status, setId, estaProcesado } = useMovCajaTotalesStore();
  const total = "0.00";

  const rentabilidadColumns: Array<ExtendedColumn<any>> = [
    { key: "autor", label: "Autor", minWidth: "80", maxWidth: "100" },
    { key: "un", label: "UN", minWidth: "50", maxWidth: "40" },
    { key: "caja", label: "Caja", minWidth: "50", maxWidth: "40" },
    { key: "fecha", label: "Fecha", minWidth: "100", maxWidth: "120", resaltar: true },
    { key: "hora", label: "Hora", minWidth: "70", maxWidth: "110" },
    { key: "comprobante", label: "N° Comprob.", minWidth: "140", maxWidth: "140" },
    { key: "vende", label: "Vende", minWidth: "100", maxWidth: "120" },
    { key: "cliente", label: "Cliente", minWidth: "70", maxWidth: "130" },
    { key: "nombre", label: "Nombre", minWidth: "150", maxWidth: "150" },
    { key: "ingresos", label: "Ingresos $", minWidth: "110", maxWidth: "140" },
    { key: "egresos", label: "Egresos $", minWidth: "110", maxWidth: "140" },
    { key: "otrosIngresos", label: "Otros Ing.", minWidth: "110", maxWidth: "140" },
  ];

  const tablaProps = {
    datosParaTabla: estaProcesado ? movCajaData : [],
    objectColumns: rentabilidadColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: true,
    objectStyles: {
      columnasNumber: [10, 11, 12],
      heightContainer: "24rem",
      widthContainer: "70rem",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 16px;",
      addHeaderCellClass: "padding: 4px 8px 4px 16px;",
      viewport1440: {
        widthContainer1440px: "",
        heightContainer1440px: "35rem",
        addCellClass1440px: "max-height: 40px;",
      },
      viewport1536: {
        heightContainer1536px: "35rem",
        widthContainer1536px: "",
        addCellClass1536px: "max-height: 60px;",
      },
      viewport1920: {
        widthContainer1920px: "",
        heightContainer1920px: "40rem",
      },
    },
    objectFooter: {
      footer: true,
      footerHeight: "h-8",
      datosFooter: estaProcesado ? movCajaFooter[0] : [],
    },
  };

  return (
    <Card className={`${className} row-start-3 col-auto row-span-10 `}>
      <div className="flex justify-between">
        <BotoneraTabla />
        <div className="flex-col relative h-12 bottom-3">
          <span className="relative top-1 left-14 text-xs text-red-900 font-semibold">Saldo $</span>
          <div className="bg-white w-36 h-8 self-start m-1 mt-0 rounded-md border-2 border-blue-500">
            <div className="text-blue-500 tabular-nums text-end text-xl v1920:text-2xl font-bold  ">{total}</div>
          </div>
        </div>{" "}
      </div>
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
