import { SucursalCaja } from "@/types";
import { calcularDisponibilidadNumerica } from "../../_shared/domain/totals";
import { formatNumber } from "../../_shared/domain/format";
import SucursalCarousel from "./SucursalCarousel";
import DotsNav from "./DotsNav";

type Props = {
  sucursal: SucursalCaja;
  carousel: {
    setRef: (id: number) => (el: HTMLDivElement | null) => void;
    handleScroll: (id: number) => void;
    scrollLeft: (id: number) => void;
    scrollRight: (id: number) => void;
    scrollToIndex: (id: number, idx: number) => void;
    activeIndex: Record<number, number>;
  };
};

export default function SucursalSection({ sucursal, carousel }: Props) {
  const sucId = Number(sucursal.sucursal);
  const totalSucursal = sucursal.datcaja.reduce((sum, c) => sum + calcularDisponibilidadNumerica(c), 0);
  const totalSucursalFormatted = formatNumber(totalSucursal);

  return (
    <div className="p-3 pl-1 pr-1 rounded-md border bg-gray-100 border-gray-500 z-50">
      <div className="flex gap-2 items-center px-2 v1536:items-end">
        <div className="font-bold text-base v1536:text-lg underline underline-offset-2">
          Sucursal: {String(sucursal.sucursal).padStart(4, "0")} - {sucursal.nsucursal}
        </div>
        <div>-</div>
        <div className="text-base font-semibold text-blue-600 text-end">
          Disp.: <span className="font-bold text-lg">${totalSucursalFormatted}</span>
        </div>
      </div>

      <SucursalCarousel
        sucursalId={sucId}
        cajas={sucursal.datcaja}
        nombreSucursal={sucursal.nsucursal}
        carousel={carousel}
      />

      <DotsNav
        sucursalId={sucId}
        count={sucursal.datcaja.length}
        activeIndex={carousel.activeIndex}
        scrollToIndex={carousel.scrollToIndex}
      />
    </div>
  );
}
