import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { FaPlusCircle, FaSyncAlt } from "react-icons/fa";

interface EntidadBase {
  id: string | number;
  name: string;
}

type Props<T extends EntidadBase> = {
  titulo: string;
  items: T[] | null;
  itemSeleccionado: T | null;
  onSeleccionarItem: (item: T) => void;
  mostrarFormulario: boolean;
  toggleMostrarFormulario: () => void;
  FormularioComponente: React.ReactNode;
  sinResultadosTexto: string;
  onRetry?: () => void;
  mostrarRetry?: boolean;
  botonCrearTexto: string;
  renderItem?: (item: T, isSelected: boolean, onSelect: () => void) => React.ReactNode;
};

export function EntidadFetcherCard<T extends EntidadBase>({
  titulo,
  items,
  itemSeleccionado,
  onSeleccionarItem,
  mostrarFormulario,
  toggleMostrarFormulario,
  FormularioComponente,
  sinResultadosTexto,
  onRetry,
  mostrarRetry = false,
  botonCrearTexto,
  renderItem,
}: Props<T>) {
  const tieneItems = items && items.length > 0;

  return (
    <Card padding={false} className="p-6 h-full min-h-[260px]
     min-w-[205px] flex flex-col 
     rounded-lg shadow bg-white ">
      {tieneItems ? (
        <>
          <div className="space-y-4">
            <p className="text-green-700 text-sm font-medium">{titulo}</p>
            <div className="space-y-2 overflow-y-auto h-32 p-1 rounded-sm border noneScroll">
              {items!.map((item) => {
                const isSelected = itemSeleccionado?.id === item.id;
                const handleSelect = () => onSeleccionarItem(item);

                return renderItem ? (
                  <div key={item.id}>
                    {renderItem(item, isSelected, handleSelect)}
                  </div>
                ) : (
                  <label
                    key={item.id}
                    className="flex items-center space-x-2 text-sm text-gray-800"
                  >
                    <input
                      type="radio"
                      name="entidad"
                      value={item.id}
                      checked={isSelected}
                      onChange={handleSelect}
                      className="form-radio text-blue-600"
                    />
                    <span>{item.name}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-auto space-y-4 pt-4">
            <button
              onClick={toggleMostrarFormulario}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
            >
              <FaPlusCircle className="w-4 h-4" />
              {mostrarFormulario ? "Ocultar formulario" : botonCrearTexto}
            </button>

            {mostrarFormulario && FormularioComponente}
          </div>
        </>
      ) : (
        <div className="space-y-3">
          <p className="text-yellow-700 text-sm">{sinResultadosTexto}</p>
          {FormularioComponente}
          {mostrarRetry && onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-3 py-1 text-blue-600 border border-blue-500 rounded-md text-sm hover:bg-blue-50 transition"
            >
              <FaSyncAlt className="w-4 h-4" />
              Intentar nuevamente
            </button>
          )}
        </div>
      )}
    </Card>
  );
}
