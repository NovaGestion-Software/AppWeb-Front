import ActionButton from "@/Components/ui/Buttons/ActionButton";
import FlexibleInputField from "@/Components/ui/Inputs/FlexibleInputs";
import { useStockPorSeccion } from "@/store/useStockPorSeccion";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";

export default function BusquedaStock({ data }: any) {
  const [codigoBusqueda, setCodigoBusqueda] = useState<string>("");
  const [textoBusqueda, setTextoBusqueda] = useState<string>("");

  //STORE
  const {
    buscado,
    setBuscado,
    indiceSeleccionado,
    idsCoincidentes,
    setIndiceSeleccionado,
    setIdsCoincidentes,
  } = useStockPorSeccion();

  // FUNCION DE FILTRO
  useEffect(() => {
    const filtered = data.filter((item: any) => {
      const matchesCodigo = item.codigo.includes(codigoBusqueda);
      const matchesTexto =
        item.descripcion.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
        item.marca.toLowerCase().includes(textoBusqueda.toLowerCase());
      return matchesCodigo && matchesTexto;
    });

    const ids = filtered.map((item: any) => item.id);
    //console.log("IDs Coincidentes:", ids);

    setIdsCoincidentes(ids);
    setIndiceSeleccionado(0); // Resetear la selección al primer ítem de la lista filtrada
  }, [codigoBusqueda, textoBusqueda, data]);

  const handleSiguienteClick = () => {
    if (idsCoincidentes.length > 0) {
      const nuevoIndice = (indiceSeleccionado + 1) % idsCoincidentes.length;
      setIndiceSeleccionado(nuevoIndice);
    }
  };

  const handleSearch = () => {
    if (idsCoincidentes.length > 0) {
      setBuscado(true);
    } else {
      setBuscado(false);
    }
  };

  const handleButton = () => {
    if (buscado) {
      handleSiguienteClick();
    } else {
      handleSearch();
    }
  };

  useEffect(() => {
    if (codigoBusqueda.length <= 0 && textoBusqueda.length <= 0) {
      setBuscado(false);
    }
  }, [idsCoincidentes]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Verificar si alguno de los inputs tiene contenido
      if (codigoBusqueda || textoBusqueda) {
        event.preventDefault(); // Evitar el comportamiento por defecto de Enter
        handleButton(); // Ejecutar la función handleButton
      }
    }
    if (event.key === "Escape") {
      // Verificar si alguno de los inputs tiene contenido
      if (codigoBusqueda || textoBusqueda) {
        event.preventDefault(); // Evitar el comportamiento por defecto de Enter
        setCodigoBusqueda("");
        setTextoBusqueda(""); // Ejecutar la función handleButton
      }
    }
  };

  return (
    <div className="flex gap-1 items-center border p-1 px-3 rounded-lg bg-slate-50">
      <FlexibleInputField
        placeholder="Codigo"
        label="Buscar"
        labelWidth="3rem"
        labelClassName=" text-start w-12 "
        inputClassName="w-24"
        containerWidth="w-[12rem]"
        disabled={false}
        key={"codigo"}
        value={codigoBusqueda || ""}
        onChange={(value) => {
          if (typeof value === "string") {
            setCodigoBusqueda(value);
          }
        }}
        onKeyDown={handleKeyDown}
      />
      <FlexibleInputField
        placeholder="Descripcion o Marca"
        inputClassName="w-52"
        disabled={false}
        containerWidth="w-56 "
        onChange={(value) => {
          if (typeof value === "string") {
            setTextoBusqueda(value);
          }
        }}
        onKeyDown={handleKeyDown}
      />
      <ActionButton
        icon={buscado ? <TbArrowBigRightLinesFilled /> : <BiSearch />}
        color="blue"
        size="xs"
        onClick={handleButton}
      />
    </div>
  );
}
