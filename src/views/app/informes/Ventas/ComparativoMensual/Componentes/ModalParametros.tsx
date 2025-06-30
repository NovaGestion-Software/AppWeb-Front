import ModalBase from "@/frontend-resourses/components/Modales/ModalBase";
import { useComparativoMensual } from "../Store/Store";
import { ActionButton, FlexibleInputField } from "@/frontend-resourses/components";
import { useState } from "react";

const INPUT_COUNT = 6;

export default function ModalParametros() {
  const { showParametros, setShowParametros, setParametros, setEstaProcesado } = useComparativoMensual();
  const [type, setType] = useState<"meses" | "años">("meses");

  const [formValues, setFormValues] = useState<{
    meses: string[];
    años: string[];
  }>({
    meses: Array(INPUT_COUNT).fill(""),
    años: Array(INPUT_COUNT).fill(""),
  });

  const handleChange = (index: number, value: string) => {
    console.log("first,", value);
    setFormValues((prev) => ({
      ...prev,
      [type]: prev[type].map((val, i) => (i === index ? value : val)),
    }));
  };

  const titulo = type === "meses" ? "Meses" : "Años";
  const singular = type === "meses" ? "Mes" : "Año";

  const handleGuardar = () => {
    setParametros(type, formValues[type]);
    setFormValues({
      meses: Array(INPUT_COUNT).fill(""),
      años: Array(INPUT_COUNT).fill(""),
    });
    setShowParametros(false);
    setEstaProcesado(true);
  };

  return (
    <ModalBase title="Parámetros de Comparación" onClose={() => setShowParametros(false)} show={showParametros}>
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-lg font-semibold">{titulo}</h1>

        <div className="flex flex-col md:flex-row justify-around gap-4">
          {/* Input Fields */}
          <div className="p-4 border rounded-lg shadow-md bg-white">
            {formValues[type].map((value, i) => (
              <div key={`${type}-${i}`} className="mb-2">
                <FlexibleInputField
                  value={value}
                  label={`${singular} ${i + 1}`}
                  placeholder={`${singular} ${i + 1}`}
                  labelWidth="3rem"
                  labelClassName="text-xs"
                  inputClassName="rounded-md bg-white w-52 text-xs v1440:h-8 v1536:h-10 v1536:w-60 v1536:text-base v1920:w-[19rem]"
                  containerClassName="w-[16rem] v1920:w-[20rem]"
                  onChange={(val) => handleChange(i, val)}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 items-center justify-start  h-fit rounded-lg p-4 shadow-sm">
            <ActionButton addClassName="text-xs w-24 h-7" color="blue" text="Meses" add onClick={() => setType("meses")} />
            <ActionButton addClassName="text-xs w-24 h-7" color="blue" text="Años" add onClick={() => setType("años")} />
          </div>
        </div>
        <div className="flex justify-end mt-4 w-full">
          <ActionButton text="Comparar" className="px-4 py-2 font-bold tracking-wider  bg-blue-600 text-white rounded hover:bg-blue-700 transition-all" onClick={handleGuardar} />
        </div>
      </div>
    </ModalBase>
  );
}
