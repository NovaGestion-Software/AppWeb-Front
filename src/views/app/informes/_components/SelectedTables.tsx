import { ActionButton } from "@/frontend-resourses/components";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useEffect, useRef, useState } from "react";

interface Item {
  id: string | number;
  nombre: string;
}

interface SelectedTablesProps {
  itemsDisponibles?: Item[];
  className?: string;
  funcion?: string;
  setShowSelectedTables?: (show: boolean) => void;
  onConfirm?: (selectedIds: (string | number)[]) => void; // Nueva prop
}

export default function SelectedTables({ itemsDisponibles, className, funcion = "Imprimir", setShowSelectedTables, onConfirm }: SelectedTablesProps) {
  const [seleccionados, setSeleccionados] = useState<Set<string | number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleSeleccion = (id: string | number) => {
    setSeleccionados((prev) => {
      const nuevosSeleccionados = new Set(prev);
      if (nuevosSeleccionados.has(id)) {
        nuevosSeleccionados.delete(id);
      } else {
        nuevosSeleccionados.add(id);
      }
      return nuevosSeleccionados;
    });
  };

  const handleConfirm = () => {
    // Convertir el Set a un array y llamar al callback
    const selectedIdsArray = Array.from(seleccionados);
    onConfirm?.(selectedIdsArray);

    // Cerrar el modal si existe la función
    setShowSelectedTables?.(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSelectedTables?.(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowSelectedTables]);

  return (
    <Card ref={containerRef} className={`${className} w-fit p-4 overflow-visible  absolute top-20  v1440:top-24 v1920:top-[6.5rem] 
    before:absolute before:-top-4 ${funcion === "Exportar" ? "before:left-14 v1440:before:left-[3.65rem] v1536:before:left-[1.65rem] " : "before:left-24 v1440:before:left-[6.1rem] v1536:before:left-[6.5rem]" } 
    before:border-8 before:border-transparent before:border-b-white`}>
      <h1 className="text-base font-semibold mb-4 px-1">Seleccionar para {funcion}</h1>

      <ul className="space-y-2 mx-2 ">
        {itemsDisponibles?.map((item) => (
          <li key={item.id} className="flex items-center">
            <input
              type="checkbox"
              id={`item-${item.id}`}
              checked={seleccionados.has(item.id)}
              onChange={() => toggleSeleccion(item.id)}
              className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor={`item-${item.id}`} className="text-xs text-gray-700">
              {item.nombre}
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-end">
        <ActionButton onClick={handleConfirm} text="Confirmar" size="xs" color="blue" />
      </div>

      {/* Opcional: Mostrar cantidad seleccionada
      <div className="mt-4 text-sm text-gray-500">
        {seleccionados.size} {seleccionados.size === 1 ? 'item seleccionado' : 'items seleccionados'}
      </div> */}
    </Card>
  );
}
