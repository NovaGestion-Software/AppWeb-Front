import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useStockPorSeccion } from '@/views/app/stockSeccion/store/useStockPorSeccion';
import { obtenerProductos } from '@/services/ApiPhpService';
import { TablaSecciones, TablaStock1, TableColumn } from '@/types';
import ModalInforme from '../../informes/_components/ModalInforme';
import BusquedaRubros from './BusquedaRubros';
import TablaExpandible from '@/frontend-resourses/components/Tables/TablaExpandible';
import { TableUtils } from '@/frontend-resourses/components/Tables/TableUtils';

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
    setStatus,
    setFooter,
    seccionesSeleccionadas,
    rubrosSeleccionados,
    rubrosToFetch,
    seccionesToFetch,
    setSeccionesToFetch,
    setTablaStock,
    setRubrosToFetch,
    setRubrosSeleccionados,
    setSeccionesSeleccionadas,
    clearRubrosSeleccionados,
    clearSeccionesSeleccionadas,
     buscado, modoNavegacion, idsCoincidentes, indiceSeleccionado 
  } = useStockPorSeccion();
  type ExtendedColumn<T = any> = {
    key: keyof T;
    label?: string;
    renderCell?: (item: T) => React.ReactNode;
    cellProps?: (item: T) => React.HTMLAttributes<HTMLElement>;
    withCellProps?: boolean; // 👈 nueva prop opcional
  };

  type seccionRubros = {
    seccion: string;
    nseccion: string;
  };



    const SeccionRubrosColumns: Array<ExtendedColumn<seccionRubros>> = [
      { key: "seccion", label: "Codigo"},
      { key: "nseccion", label: "Seccion" },
    ];
  
    const COLUMNS = TableUtils.generateTableColumns<seccionRubros>(
      SeccionRubrosColumns.map((column) => ({
        ...column
      }))
    );
  
  const customTheme = {
    Table: `
      grid-template-columns: minmax(30px, 110px) minmax(40px, 500px);
      border-radius: 12px;
      width: 36rem;
      max-height: 500px; /* Altura máxima de la tabla */
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
      padding: 8px; // esto quiero conservar
      border-right: 1px solid #ccc;
  
      &:last-of-type {
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
        (key) => seccionesSeleccionadas?.[key] === true);
      // Llamar a obtenerProductos con las claves filtradas
      return obtenerProductos(seccionesSeleccionadasKeys, rubrosSeleccionados);
    },
    onMutate: () => {
      setStatus('pending');
    },
    onError: (error) => {
      console.error('Error al obtener los productos:', error);
      setStatus('error');
    },
    onSuccess: (data) => {
      // console.log(data.data);
      const arrayDeRubros: TablaStock1[] = Object.values(data.data);
    //  console.log('array de rubros',arrayDeRubros)
      setFooter(true);
      setTablaStock(arrayDeRubros);
      setStatus('success');
    },
    onSettled: () => {
      setStatus('idle');
    },
  });

  useEffect(() => {
    // Si rubrosSeleccionados tiene contenido, habilitar el botón de confirmar
    if (rubrosSeleccionados.length > 0 && !areArraysEqual(rubrosSeleccionados, rubrosToFetch)) {
      setIsConfirmEnabled(false);
    } else {
      setIsConfirmEnabled(true);
    }

    // Si rubrosToFetch no tiene contenido, deshabilitar el botón de cancelar
    if (rubrosToFetch.length <= 0) {
      setIsCancelEnabled(true);
      // console.log('Deshabilitar cancelar:', rubrosToFetch);
    } else {
      setIsCancelEnabled(false);
    }
  }, [rubrosSeleccionados, rubrosToFetch]);

  const handleCloseModal = () => {
    clearRubrosSeleccionados();
    clearSeccionesSeleccionadas();
    setShowRubrosModal(false);
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
      <ModalInforme
        show={showRubrosModal}
        title="Secciones y Rubros"
        onClose={handleCloseModal}
        onConfirm={handleModalConfirm}
        buttons={true}
        disabled={isConfirmEnabled}
        disabled2={isCancelEnabled}
        classModal='bottom-56 w-3/5 h-1/4 2xl:bottom-0 2xl:w-fit 2xl:h-fit'
      >
       <div className='flex flex-col gap-8  2xl:w-fit  p-2  overflow-hidden  h-auto  mx-auto'>
       <BusquedaRubros />
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
          buscado={buscado}
          modoNavegacion={modoNavegacion}
          idsCoincidentes={idsCoincidentes}
          indiceSeleccionado={indiceSeleccionado ?? 0}
        />
       </div>
      </ModalInforme>
   
  );
}
