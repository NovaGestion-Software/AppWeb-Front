import { useEffect, useState } from "react";
import { useStockPorSeccion } from "@/store/useStockPorSeccion";
import { useFiltros } from "../hooks/useFiltros";
import CheckboxInput from "@/Components/ui/Inputs/Checkbox";

export default function FiltrarPorTipo() {
  const {
    checkboxSeleccionados,
    setCheckboxSeleccionados,
    setStockRenderizado,
  } = useStockPorSeccion();
  const [disabled, setDisabled] = useState(false);
  const { aplicarFiltros } = useFiltros();

  const handleCheckboxChange = (
    grupo: keyof typeof checkboxSeleccionados,
    value: string
  ) => {
    const nuevoValor = checkboxSeleccionados[grupo] === value ? null : value;

    setCheckboxSeleccionados(grupo, nuevoValor);
  };

  // Aplicar filtros cada vez que cambie checkboxSeleccionados
  useEffect(() => {
    const datosFiltrados = aplicarFiltros();
    setStockRenderizado(datosFiltrados);
  }, [checkboxSeleccionados]);

  return (
    <div className="flex gap-1 border p-1 rounded-lg bg-white">
      <CheckboxInput
        onChange={() => handleCheckboxChange("grupo1", "Talles")}
        checked={checkboxSeleccionados.grupo1 === "Talles"}
        disabled={disabled}
        setDisabled={setDisabled}
        label="Talles"
      />
      <CheckboxInput
        onChange={() => handleCheckboxChange("grupo1", "Articulos")}
        checked={checkboxSeleccionados.grupo1 === "Articulos"}
        disabled={disabled}
        setDisabled={setDisabled}
        label="Articulos"
      />{" "}
    </div>
  );
}
