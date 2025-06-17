import { TablaDefault } from "@/frontend-resourses/components";
import { ExtendedColumn } from "@/frontend-resourses/components/Tables/types";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { VentasUnidadNegocioStore } from "../Store/store";
import { importesUnidadNegocioData, importesUnidadNegocioDataDiario, importesUnidadNegocioFooterData } from "../Data/data";

interface TablaImportesProps {
  className?: string;
}

export default function TablaImportes({ className }: TablaImportesProps) {
  const { status, setId, estaProcesado, checkboxSeleccionados } = VentasUnidadNegocioStore();

  const cobranzasColumns: Array<ExtendedColumn<any>> = [
    { key: "fecha", label: "Fecha", minWidth: "90", maxWidth: "120", resaltar: true },
    { key: "comprob", label: "Comprob.", minWidth: "120", maxWidth: "220", },
    { key: "vende", label: "Vende", minWidth: "120", maxWidth: "120",  },
    { key: "cuenta", label: "Cuenta", minWidth: "90", maxWidth: "120",  },
    { key: "nombre", label: "Nombre", minWidth: "190", maxWidth: "220", },
    { key: "importe", label: "importe $", minWidth: "130", maxWidth: "220", resaltar: true },
  ];

  let data = checkboxSeleccionados.grupo2 === "Diario" ? importesUnidadNegocioDataDiario :  importesUnidadNegocioData 

  const tablaProps = {
    datosParaTabla: estaProcesado ? data : [],
    objectColumns: cobranzasColumns,
    estaProcesado: estaProcesado,
    status: status,
    setIdTabla: setId,
    selectFn: false,
    objectStyles: {
      columnasNumber: [ 3, 4, 5, 6, 7, 8, 9, 10],
      heightContainer: "24rem",
      widthContainer: "",
      addCellClass: "max-height: 45px; padding: 4px 8px 4px 12px;",
      withoutPadding: true,
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
    objectFooter:{
        footer: true,
        footerHeight: "h-8",
        datosFooter: estaProcesado ? importesUnidadNegocioFooterData[0] : [],
    }
  };

  return (
    <Card   className={`${className} `}>
      <TablaDefault props={tablaProps} />
    </Card>
  );
}
