import { FlexibleInputField } from "@/frontend-resourses/components";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useDistribucionMensualClientes } from "../Store/Store";

function ResumenCreditos({ disabled = false, data }: { disabled?: boolean; data?: any[] }) {
  return (
    <Card className={`flex flex-col gap-1 text-xs   v1440:text-base font-semibold ${disabled && "text-gray-500 "}`}>
      {data?.map((item, index) => (
        <div key={index} className="flex gap-1 items-center">
          <div className="flex gap-4 items-center w-[30rem] justify-end  border p-1 rounded-sm">
            <span className="text-nowrap ">{item.label} $</span>
            <FlexibleInputField 
            inputClassName={`${item.label === "Total" && "text-green-600"}`} 
            disabled={disabled} value={item.cantidad}
             inputWidth="w-32" containerWidth="w-fit " />
          </div>
        </div>
      ))}
    </Card>
  );
}

export default function Resumen() {
  const { estaProcesado } = useDistribucionMensualClientes();
  const dataTipo = [
    {
      label: "Mercadería",
      cantidad: "0",
    },
    {
      label: "Financiación",
      cantidad: "0",
    },
    {
      label: "Garantía",
      cantidad: "0",
    },
    {
      label: "Armado",
      cantidad: "0",
    },

    {
      label: "Descuentos",
      cantidad: "0",
    },
    {
      label: "Total",
      cantidad: "0",
    },
  ];
  const dataModo = [
    {
      label: "Efectivo",
      cantidad: "0",
    },
    {
      label: "Cheques",
      cantidad: "0",
    },
    {
      label: "Transferencia",
      cantidad: "0",
    },
    {
      label: "Tarjetas",
      cantidad: "0",
    },

    {
      label: "Débito",
      cantidad: "0",
    },
    {
      label: "Credito",
      cantidad: "0",
    },
    {
      label: "Orden de Compra",
      cantidad: "0",
    },
    {
      label: "Total",
      cantidad: "0",
    },
  ];
  return (
    <div className="col-start-7 col-span-7  row-start-5 row-span-3 flex gap-3 ">
      <ResumenCreditos data={dataTipo} disabled={!estaProcesado} />
      <ResumenCreditos data={dataModo} disabled={!estaProcesado} />
    </div>
  );
}
