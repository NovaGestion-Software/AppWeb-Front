interface BusquedaInputsProps {
  className?: string;
  data?: any[];
  buscado: boolean;
  setBuscado: (valor: boolean) => void;
  setNavegandoCoincidentes: (valor: boolean) => void;
  setModoNavegacion: (modo: "normal" | "busqueda") => void;
  setUltimoIndiceBusqueda: (index: number | null) => void;
  indiceSeleccionado: number | null;
  setIndiceSeleccionado: (indice: number | null) => void;
  idsCoincidentes: (string | number)[];
  setIdsCoincidentes: (ids: (string | number)[]) => void;
  setIndiceGlobal: (index: number) => void;
  inputsLength?: number;
  keysBusqueda?: {
    subItemsProperty?: string;
    subItemKeyProperty?: string;
    subItemLabelProperty?: string;
    textLabelProperty?: string;
    codeLabelProperty?: string;
    itemKey?: string;
    busquedaKeyText?: string[];
    busquedaKeyCode?: string[];
  };
}

export default function BusquedaItems({ props }: { props: BusquedaInputsProps }) {

    return ( <>
    </> );
}
