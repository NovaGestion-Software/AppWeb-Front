import { DatCaja } from "@/types";
import CardSucursales from "./CardSucursales";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

import { calcularDisponibilidadNumerica, calcularEfectivo, calcularTotal,  } from "./../../_shared/domain/totals";
import { formatCurrency, formatISO } from "../../_shared/domain/format";

type Props = {
  sucursalId: number;
  cajas: DatCaja[];
  nombreSucursal: string;
  // API del hook compartido
  carousel: {
    setRef: (id: number) => (el: HTMLDivElement | null) => void;
    handleScroll: (id: number) => void;
    scrollLeft: (id: number) => void;
    scrollRight: (id: number) => void;
    scrollToIndex: (id: number, idx: number) => void;
  };
};

const ARROW_BTN_CLASS = "sticky flex items-center h-8 p-1 bg-blue-500 bg-opacity-5 hover:bg-opacity-20 rounded-full border border-blue-200 top-1/2 z-20";

export default function SucursalCarousel({ sucursalId, cajas, nombreSucursal, carousel }: Props) {
  const showArrows = cajas.length > 1;

  return (
    <div ref={carousel.setRef(sucursalId)} onScroll={() => carousel.handleScroll(sucursalId)} className="flex overflow-x-scroll noneScroll items-center h-[26rem] v1536:h-[26rem] gap-4 relative snap-x snap-mandatory">
      {showArrows && (
        <button aria-label="Anterior caja" onClick={() => carousel.scrollLeft(sucursalId)} className={`${ARROW_BTN_CLASS} left-2`}>
          <FaLongArrowAltLeft />
        </button>
      )}

      {cajas.map((caja, index) => (
        <div key={`${sucursalId}-${caja.ncaja}`} onClick={() => carousel.scrollToIndex(sucursalId, index)}>
          <CardSucursales
            estado={caja.fecha_c === null}
            nombre={nombreSucursal}
            sucursal={String(sucursalId)}
            numero={caja.ncaja}
            apertura={formatISO(caja.fecha_a)}
            ultimaVenta={formatISO(caja.fecha_c || "")}
            efectivo={calcularEfectivo(caja)}
            ventas={calcularTotal(caja, "ventas")}
            cobranza={calcularTotal(caja, "cobranza")}
            planP={calcularTotal(caja, "planpago")}
            egresos={caja.retiro}
            saldo={formatCurrency(calcularDisponibilidadNumerica(caja))}
          />
        </div>
      ))}

      {showArrows && (
        <button aria-label="Siguiente caja" onClick={() => carousel.scrollRight(sucursalId)} className={`${ARROW_BTN_CLASS} right-2`}>
          <FaLongArrowAltRight />
        </button>
      )}
    </div>
  );
}
