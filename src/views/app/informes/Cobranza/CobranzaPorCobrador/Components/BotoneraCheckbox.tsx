import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import CheckboxInput from "@/frontend-resourses/components/Inputs/Checkbox";
import { useCobranzasPorCobrador } from "../Store/Store";

export default function BotoneraCheckbox() {

    const {estaProcesado} = useCobranzasPorCobrador()
  const checkboxs = [
    {
      label: "Cobrador",
    },
    {
      label: "Crédito",
    },
    {
      label: "Caja",
    },
    {
      label: "Plan Pago",
    },
  ];
  return (
    <Card className="p-1 !w-56 rounded-md border grid grid-cols-2 gap-2 row-start-2 relative bottom-12 col-start-12">
      {checkboxs.map((item, index) => {
        return <CheckboxInput onChange={() => {}} key={index} label={item.label} disabled={estaProcesado} />;
      })}
    </Card>
  );
}
