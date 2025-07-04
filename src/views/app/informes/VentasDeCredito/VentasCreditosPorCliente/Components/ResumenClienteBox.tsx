import { FlexibleInputField } from "@/frontend-resourses/components";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useVentasCreditoPorCliente } from "../Store/Store";

function ResumenClientes({disabled = false}) {
  const data = [
    {
      label: "Clientes Nuevos",
      cantidad: "0",
      cantidadPorcentaje: "01",
      importe: "0",
      importePorcentaje: "01",
    },
    {
      label: "Existentes sin Compras 12",
      cantidad: "0",
      cantidadPorcentaje: "01",
      importe: "0",
      importePorcentaje: "01",
    },
    {
      label: "Existentes",
      cantidad: "0",
      cantidadPorcentaje: "01",
      importe: "0",
      importePorcentaje: "01",
    },
    {
      label: "Sin Compras",
      cantidad: "0",
    },
    {
      label: "Totales",
      cantidad: "0",
      importe: "0",
    },
  ];
  return (
    <Card className={`flex flex-col gap-1 text-xs   v1440:text-base font-semibold ${disabled && "text-gray-500 "}`}>
      {data.map((item, index) => (
        <div key={index} className="flex gap-1 items-center">
          <div className="flex gap-4 items-center w-[30rem] justify-end  border p-1 rounded-sm">
            <span className="text-nowrap ">{item.label}</span>
            <FlexibleInputField disabled={disabled} value={item.cantidad} inputWidth="w-32" containerWidth="w-fit " />
            {item.cantidadPorcentaje && (
              <>
                <FlexibleInputField disabled={disabled} value={item.cantidadPorcentaje} inputWidth="w-20" containerWidth="w-fit " />
                <span>%</span>
              </>
            )}
          </div>
               {item.importe && (
          <div className="flex gap-2 items-center border p-1 rounded-sm w-[19rem] w">
       
              <>
                <span className="text-nowrap mx-2">$</span>
                <FlexibleInputField disabled={disabled} value={item.importe} inputWidth="w-32" containerWidth="w-fit " />
              </>
          
            {item.importePorcentaje && (
              <>
                {" "}
                <FlexibleInputField disabled={disabled} value={item.importePorcentaje} inputWidth="w-20" containerWidth="w-fit" />
                <span>%</span>
              </>
            )}
          </div>  )}
        </div>
      ))}
    </Card>
  );
}

export default function Resumen() {
  const {estaProcesado} = useVentasCreditoPorCliente();
  return (
    <div className="col-start-1 row-start-7 row-span-6">
      <ResumenClientes disabled={!estaProcesado} />
    </div>
  );
}
