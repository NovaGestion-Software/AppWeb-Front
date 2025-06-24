import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import CardSucursales from "./CardSucursales";
import SkListComponent from "./SkListComponent";
import { Dispatch, useEffect, useRef, useState } from "react";
import { DatCaja, Importes, SucursalCaja } from "@/types";
import ViewTitle from "@/frontend-resourses/components/Labels/ViewTitle";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

type CajasListProps = {
  handleRefetch: boolean;
  setHandleRefetch: Dispatch<React.SetStateAction<boolean>>;
  cajas: SucursalCaja[];
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<SucursalCaja[], Error>>;
  isFetching: boolean;
};

export default function CajasList({ handleRefetch, setHandleRefetch, cajas, refetch, isFetching }: CajasListProps) {
  useEffect(() => {
    if (handleRefetch) {
      refetch();
      setHandleRefetch(false);
    }
  }, [handleRefetch, refetch]);

  const calcularEfectivoTotal = (caja: DatCaja) => {
    const efectivoVentas = parseFloat(caja.ventas?.importe01 || "0");
    const efectivoCobranza = parseFloat(caja.cobranza?.importe01 || "0");
    const efectivoPlanPago = parseFloat(caja.planpago?.importe01 || "0");

    // Sumar los importes de ventas, cobranza y plan de pago
    const efectivo = efectivoCobranza + efectivoPlanPago + efectivoVentas;

    return efectivo;
    // .toLocaleString(undefined, {
    //   maximumFractionDigits: 0,
    // });
  };

  const calcularTotal = (caja: DatCaja, tipo: keyof DatCaja) => {
    const importes = ["importe01", "importe02", "importe03", "importe04", "importe06", "importe07", "importe08", "importe09", "importe10", "importe11", "importeva"];

    // Aseguramos que caja[tipo] es de tipo Importes, para evitar el error de tipo
    const importesCaja = caja[tipo] as Importes;

    // Sumamos los importes del tipo seleccionado (ventas, cobranza, o planpago)
    const total = importes.reduce((sum, key) => sum + (parseFloat(importesCaja[key as keyof Importes]) || 0), 0);

    return total.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  };

  const calcularDisponibilidad = (caja: DatCaja) => {
    const efectivo = calcularEfectivoTotal(caja);
    const ingresos = parseFloat(caja.ingresos || "0");
    const gastos = parseFloat(caja.gastos || "0");
    const retiros = parseFloat(caja.retiro || "0");

    const totalCajaActual = efectivo + ingresos - gastos - retiros;

    return totalCajaActual.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  };
  const calcularDisponibilidadNumerica = (caja: DatCaja) => {
    const efectivo = calcularEfectivoTotal(caja); // ya es número
    const ingresos = parseFloat(caja.ingresos || "0");
    const gastos = parseFloat(caja.gastos || "0");
    const retiros = parseFloat(caja.retiro || "0");

    return efectivo + ingresos - gastos - retiros;
  };

  const calcularEfectivo = (caja: DatCaja) => {
    const efectivo = calcularEfectivoTotal(caja); // Retorna un valor numérico
    return efectivo.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  };
  const calcularTotalVentas = (caja: DatCaja) => calcularTotal(caja, "ventas");
  const calcularTotalCobranza = (caja: DatCaja) => calcularTotal(caja, "cobranza");
  const calcularTotalPlanP = (caja: DatCaja) => calcularTotal(caja, "planpago");

  const formatearFecha = (fechaISO: string) => {
    if (!fechaISO) return "";

    // Crear un objeto Date desde la cadena ISO
    const fecha = new Date(fechaISO);

    // Extraer los componentes de la fecha
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses son base 0
    const dia = String(fecha.getDate()).padStart(2, "0");
    const horas = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");

    // Devolver el formato deseado: YYYY-MM-DD HH:mm
    return `${año}-${mes}-${dia} ${horas}:${minutos}`;
  };
  const arrowClass = `sticky flex items-center h-8 p-1 bg-blue-500 bg-opacity-5 hover:bg-opacity-20 rounded-full border border-blue-200
                         top-1/2 z-20`;

  const containerRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [currentIndices, setCurrentIndices] = useState<Record<number, number>>({});

  const scrollRight = (sucursalId: number) => {
    const container = containerRefs.current[sucursalId];
    container?.scrollBy({ left: 350, behavior: "smooth" });
  };

  const scrollLeft = (sucursalId: number) => {
    const container = containerRefs.current[sucursalId];
    container?.scrollBy({ left: -350, behavior: "smooth" });
  };

  const handleScroll = (sucursalId: number) => {
    const container = containerRefs.current[sucursalId];
    if (!container) return;

    const children = Array.from(container.children).filter((child) => !(child as HTMLElement).tagName.toLowerCase().includes("button"));

    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, index) => {
      const el = child as HTMLElement;
      const rect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const distance = Math.abs(rect.left - containerRect.left);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentIndices((prev) => ({ ...prev, [sucursalId]: closestIndex }));
  };

  const scrollToIndex = (sucursalId: number, index: number) => {
    const container = containerRefs.current[sucursalId];
    if (!container) return;

    const children = Array.from(container.children).filter((child) => !(child as HTMLElement).tagName.toLowerCase().includes("button"));

    const item = children[index];
    if (item) {
      container.scrollTo({
        left: (item as HTMLElement).offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-1/2 p-5 pb-1 ">
      {isFetching ? (
        <SkListComponent />
      ) : (
        <>
          <ViewTitle title="Detalle de Cajas" addClassName="rounded-t-md" />
          <div className="flex flex-col gap-2 bg-white h-[40rem]  shadow-md rounded-b-md">
            <div className="flex flex-col gap-y-5 scrollbar-thin  overflow-auto p-4">
              {cajas
                .slice()
                .sort((a: any, b: any) => a.sucursal - b.sucursal)
                .map((sucursal) => {
                  const totalSucursal = sucursal.datcaja.reduce((sum, caja) => sum + calcularDisponibilidadNumerica(caja), 0);
                  const totalSucursalFormatted = totalSucursal.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  });
                  return (
                    <div
                      key={sucursal.sucursal}
                      className=" p-3 pl-1 pr-1 rounded-md border 
                   border-gray-500 z-50 "
                    >
                     <div className="flex gap-2 items-center px-2 v1536:items-end ">
                       <div className="font-bold  text-base v1536:text-lg  underline-offset-2 underline">
                        Sucursal: {String(sucursal.sucursal).padStart(4, "0")} - {sucursal.nsucursal}
                      </div>
                      <div>
                        -
                      </div>
                      <div className="text-base font-semibold text-blue-600  text-end ">Disp. :
                        <span className="font-bold text-lg"> ${totalSucursalFormatted}</span></div>

                     </div>
                      <div
                        ref={(el) => (containerRefs.current[Number(sucursal.sucursal)] = el)}
                        onScroll={() => handleScroll(Number(sucursal.sucursal))}
                        className="flex overflow-x-scroll noneScroll items-center 
                      h-[26rem] v1536:h-[26rem] gap-4 relative snap-x snap-mandatory "
                      >
                        {sucursal.datcaja.length > 1 && (
                          <button onClick={() => scrollLeft(Number(sucursal.sucursal))} className={`${arrowClass} left-2 `}>
                            <FaLongArrowAltLeft />
                          </button>
                        )}

                        {sucursal.datcaja.map((caja: DatCaja, index) => (
                          <div key={`${sucursal.sucursal}-${caja.ncaja}`} onClick={() => scrollToIndex(Number(sucursal.sucursal), index)}>
                            <CardSucursales
                              estado={caja.fecha_c === null}
                              nombre={sucursal.nsucursal}
                              sucursal={sucursal.sucursal}
                              numero={caja.ncaja}
                              apertura={formatearFecha(caja.fecha_a)}
                              ultimaVenta={formatearFecha(caja.fecha_c || "")}
                              efectivo={calcularEfectivo(caja)}
                              ventas={calcularTotalVentas(caja)}
                              cobranza={calcularTotalCobranza(caja)}
                              planP={calcularTotalPlanP(caja)}
                              egresos={caja.retiro}
                              saldo={calcularDisponibilidad(caja)}
                            />
                          </div>
                        ))}

                        {sucursal.datcaja.length > 1 && (
                          <button onClick={() => scrollRight(Number(sucursal.sucursal))} className={`${arrowClass}  right-2`}>
                            <FaLongArrowAltRight />
                          </button>
                        )}
                      </div>

                      {sucursal.datcaja.length > 1 && (
                        <div className="flex justify-center mt-2 gap-2">
                          {sucursal.datcaja.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => scrollToIndex(Number(sucursal.sucursal), index)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndices[Number(sucursal.sucursal)] ? "bg-blue-600 scale-125" : "bg-gray-400"}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
