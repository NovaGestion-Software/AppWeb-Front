import { TablaSecciones, TableColumn } from "@/types";
import ModalInforme from "../../informes/_components/ModalInforme";
import TablaExpandible from "./TablaExpandible";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useStockPorSeccion } from "@/store/useStockPorSeccion";

interface TablaSeccionRubroProps {
  data: TablaSecciones[];
  showRubrosModal: boolean;
  setShowRubrosModal: Dispatch<SetStateAction<boolean>>;
}
export default function TablaSeccionRubro({
  data,
  showRubrosModal,
  setShowRubrosModal,
}: TablaSeccionRubroProps) {
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false); // Estado para habilitar el botón de confirmar
  const [isCancelEnabled, setIsCancelEnabled] = useState(false); // Estado para habilitar el botón de cancelar

  const {
    seccionesSeleccionadas,
    rubrosSeleccionados,
    rubrosToFetch,
    seccionesToFetch,
    setSeccionesToFetch,
    setRubrosToFetch,
    setRubrosSeleccionados,
    setSeccionesSeleccionadas,
    clearRubrosSeleccionados,
    clearSeccionesSeleccionadas,
  } = useStockPorSeccion();
 
  const COLUMNS: TableColumn<TablaSecciones>[] = [
    {
      label: "Codigo",
      renderCell: (item: TablaSecciones) => item.seccion, // Renderiza los rubros como una lista de elementos JSX
    },
    {
      label: "Seccion",
      renderCell: (item: TablaSecciones) => item.nseccion, // Esto es válido porque `item.nseccion` es un string
    },
  ];
  const customTheme = {
    Table: `
          grid-template-columns: minmax(30px, 110px) minmax(40px, 500px);
          border-radius: 12px;
          width: 36rem;
          max-height: 500px; /* Altura máxima de la tabla */
          overflow-y: scroll; /* Habilitar scroll vertical */
          scrollbar-width: thin;
          scroll-behavior: smooth;
          border: 1px solid black;
          font-variant-numeric: tabular-nums;
          @media (min-width: 1280px) and (max-width: 1380px) {
            height: 500px;
          }
        `,

    Row: `
          &:nth-of-type(odd) { background-color: #fff; }
          &:nth-of-type(even) { background-color: #eaf5fd; }
          
          &.row-select-single-selected { background-color: #CAE0BC !important; }
          border-bottom: 1px solid #ccc;
           &.called { background-color: #ffecb3; } 
        `,

    HeaderCell: `
          background: #2973B2;
          color: white;
          height: 10px;
          &:nth-of-type(n+3) {
            text-align: center;
          }
        `,

    Cell: `
          padding: 8px;
          border-right: 1px solid #ccc;
      
          &:last-child {
            border-right: none;
          }
      
          &:nth-of-type(n+3) {
            text-align: right;
          }
        `,

    FooterCell: `
          position: sticky;
          bottom: 0px;
          padding: 8px;
          border-right: 1px solid #ccc;
          background-color: #fff;
          text-align: right;
      
          &:last-child {
            border-right: none;
          }
      
          &:nth-of-type(3) {
            border-right: 1px solid black;
            background-color: #A5C9FF;
            font-weight: bold;
          }
      
          &:nth-of-type(5) {
            border-right: 1px solid black;
            background-color: #A5C9FF;
            font-weight: bold;
          }
      
          &:nth-of-type(7) {
            border-right: 1px solid black;
            background-color: #A5C9FF;
            font-weight: bold;
          }
        `,
  };
  const handleCloseModal = () => {
    // console.log("handle close");
    clearRubrosSeleccionados();
    clearSeccionesSeleccionadas();

   setShowRubrosModal(false);
//     console.log("2", seccionesToFetch, rubrosToFetch);
  };

  const handleConfirm = (
    selectedItems: { [key: string]: boolean },
    selectedSubItems: string[]
  ) => {
    setSeccionesToFetch(selectedItems);
    setRubrosToFetch(selectedSubItems);
  };
  
  const handleModalConfirm = () => {
    handleConfirm(seccionesSeleccionadas ?? {}, rubrosSeleccionados ?? []);
    setShowRubrosModal(false);
  };


  // Función para comparar si dos arrays son iguales (independientemente del orden)
const areArraysEqual = (array1: any[], array2: any[]) => {
  if (array1.length !== array2.length) return false;
  return array1.every((item) => array2.includes(item));
};
  useEffect(() => {
    // Si rubrosSeleccionados tiene contenido, habilitar el botón de confirmar
    if (rubrosSeleccionados.length > 0 && !areArraysEqual(rubrosSeleccionados, rubrosToFetch)) {
      setIsConfirmEnabled(true);
   //   console.log('Habilitar confirmar:', isConfirmEnabled, rubrosSeleccionados, rubrosToFetch, seccionesSeleccionadas, seccionesToFetch);
    } else {
      setIsConfirmEnabled(false);
    }
  
    // Si rubrosToFetch no tiene contenido, deshabilitar el botón de cancelar
    if (rubrosToFetch.length <= 0) {
      setIsCancelEnabled(false);
      console.log('Deshabilitar cancelar:', rubrosToFetch);
    } else {
      setIsCancelEnabled(true); 
    }
  }, [rubrosSeleccionados, rubrosToFetch]);

  return (
    <>
      {" "}
      <ModalInforme
        show={showRubrosModal}
        title="Seccion y Rubro"
        onClose={handleCloseModal}
        onConfirm={handleModalConfirm}
        buttons={true}
        disabled={isConfirmEnabled}
        disabled2={isCancelEnabled}
      >
        <TablaExpandible
          columnas={COLUMNS}
          datosParaTabla={data}
          estilos={customTheme}
          procesado={false}
          onSubmit={handleConfirm}
          subItemsProperty="rubros" // Nombre de la propiedad que contiene los subítems
          subItemKeyProperty="rubro" // Nombre de la propiedad que identifica la clave única de los subítems
          subItemLabelProperty="nrubro" // Nombre de la propiedad que identifica la etiqueta de los subítems
          subItemToFetch={rubrosToFetch}
          itemToFetch={seccionesToFetch}
          setItemsStore={setSeccionesSeleccionadas}
          setSubItemsStore={setRubrosSeleccionados}
       />
      </ModalInforme>
    </>
  );
}
