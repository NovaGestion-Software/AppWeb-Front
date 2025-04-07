import { useStockPorSeccion } from "@/views/app/stockSeccion/store/useStockPorSeccion";

// import CheckboxInput from '@/Components/ui/Inputs/Checkbox';
import RadioInput from "@/Components/ui/Inputs/RadioInput";

export default function OrdenarPorCheckbox() {
  const {
    checkboxSeleccionados,
    setCheckboxSeleccionados,
    status
  } = useStockPorSeccion();
  // const { aplicarFiltros } = useFiltros();

  // // Aplicar filtros cada vez que cambie checkboxSeleccionados
  // useEffect(() => {
  //   const datosFiltrados = aplicarFiltros();
  //   //setStockRenderizado(datosFiltrados);
  //   setProductos(datosFiltrados)
  // //  setStockRenderizado(datosFiltrados)
  // }, [checkboxSeleccionados.grupo4]);

  const handleCheckboxChange = (
    grupo: keyof typeof checkboxSeleccionados,
    value: string
  ) => {
    const nuevoValor = checkboxSeleccionados[grupo] === value ? null : value;
    setCheckboxSeleccionados(grupo, nuevoValor);
  };

  return (
    <>
      <div className="flex gap-1 border p-1 rounded-lg bg-white">
        <RadioInput
          onChange={() => handleCheckboxChange("grupo4", "Codigo")}
          checked={checkboxSeleccionados.grupo4 === "Codigo"}
          label="Código"
          disabled={status === "idle"}
        />
        <RadioInput
          onChange={() => handleCheckboxChange("grupo4", "Descripcion")}
          checked={checkboxSeleccionados.grupo4 === "Descripcion"}
          label="Descripción"
          disabled={status === "idle"}
        />
        <RadioInput
          onChange={() => handleCheckboxChange("grupo4", "Marca")}
          checked={checkboxSeleccionados.grupo4 === "Marca"}
          label="Marca"
          disabled={status === "idle"}
        />
      </div>
    </>
  );
}
