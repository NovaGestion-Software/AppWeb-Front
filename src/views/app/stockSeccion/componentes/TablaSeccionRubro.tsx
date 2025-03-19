import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
import { obtenerProductos } from '@/services/ApiPhpService';
import { TablaSecciones, TablaStock1, TableColumn } from '@/types';
import TablaExpandible from './TablaExpandible';
import ModalInforme from '../../informes/_components/ModalInforme';

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
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false); // habilitar botón confirmar
  const [isCancelEnabled, setIsCancelEnabled] = useState(false); // habilitar botón cancelar

  const {
    // stockRenderizado,
    setFooter,
    seccionesSeleccionadas,
    rubrosSeleccionados,
    rubrosToFetch,
    seccionesToFetch,
    setSeccionesToFetch,
    setTablaStock,
    setRubrosToFetch,
    setRubrosSeleccionados,
    setStockRenderizado,
    setSeccionesSeleccionadas,
    clearRubrosSeleccionados,
    clearSeccionesSeleccionadas,
  } = useStockPorSeccion();

  const COLUMNS: TableColumn<TablaSecciones>[] = [
    {
      label: 'Codigo',
      renderCell: (item: TablaSecciones) => item.seccion, // Renderiza los rubros como una lista de elementos JSX
    },
    {
      label: 'Seccion',
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
        height: 400px;
      }
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

    Row: `
      &:nth-of-type(odd) { background-color: #fff; }
      &:nth-of-type(even) { background-color: #eaf5fd; }
      
      &.row-select-single-selected { background-color: #CAE0BC !important; }
      border-bottom: 1px solid #ccc;
        &.called { background-color: #ffecb3; } 
    `,
  };

  const { mutate } = useMutation({
    mutationFn: () => {
      // Filtrar solo las claves que tienen valor true en seccionesSeleccionadas
      const seccionesSeleccionadasKeys = Object.keys(seccionesSeleccionadas ?? {}).filter(
        (key) => seccionesSeleccionadas?.[key] === true
      );

      // Llamar a obtenerProductos con las claves filtradas
      return obtenerProductos(seccionesSeleccionadasKeys, rubrosSeleccionados);
    },
    // mutationFn: () => obtenerStock(rubrosSeleccionados),
    onError: (error) => {
      console.error('Error al obtener los productos:', error);
    },
    onSuccess: (data) => {
      // console.log(data.data);
      const arrayDeRubros: TablaStock1[] = Object.values(data.data);
      setFooter(true);
      setStockRenderizado(arrayDeRubros);
      setTablaStock(arrayDeRubros);
    },
  });

  // console.log(parseFloat(stockRenderizado[0].productos[0].depositos[0].talles[2].stock));
  // console.log(stockRenderizado);

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
      // console.log('Deshabilitar cancelar:', rubrosToFetch);
    } else {
      setIsCancelEnabled(true);
    }
  }, [rubrosSeleccionados, rubrosToFetch]);

  const handleCloseModal = () => {
    // console.log("handle close");
    clearRubrosSeleccionados();
    clearSeccionesSeleccionadas();

    setShowRubrosModal(false);
    //     console.log("2", seccionesToFetch, rubrosToFetch);
  };

  function handleConfirm(selectedItems: { [key: string]: boolean }, selectedSubItems: string[]) {
    setSeccionesToFetch(selectedItems);
    setRubrosToFetch(selectedSubItems);
  }

  const handleModalConfirm = () => {
    // setFooter(true);
    mutate();

    handleConfirm(seccionesSeleccionadas ?? {}, rubrosSeleccionados ?? []);
    setShowRubrosModal(false);
  };

  // Función para comparar si dos arrays son iguales (independientemente del orden)
  const areArraysEqual = (array1: any[], array2: any[]) => {
    if (array1.length !== array2.length) return false;
    return array1.every((item) => array2.includes(item));
  };

  return (
    <>
      <ModalInforme
        show={showRubrosModal}
        title="Secciones y Rubros"
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
          subItemsProperty="rubros" // Nombre que contiene los subítems
          subItemKeyProperty="rubro" // Nombre que identifica la clave única de los subítems
          subItemLabelProperty="nrubro" // Nombre que identifica la etiqueta de los subítems
          subItemToFetch={rubrosToFetch}
          itemToFetch={seccionesToFetch}
          setItemsStore={setSeccionesSeleccionadas}
          setSubItemsStore={setRubrosSeleccionados}
        />
      </ModalInforme>
    </>
  );
}
