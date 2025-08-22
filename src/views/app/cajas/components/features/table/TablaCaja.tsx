import { Dispatch } from "react";
import { useQuery } from "@tanstack/react-query";
import { obtenerCajasSecciones } from "@/services/AppService";
import { useRefetchOnFlag } from "@/Hooks/useRefetchOnFlag";
import { CajasSeccionResponse } from "../_shared/types/types";
import { buildTablaSeccion } from "./domain/totals";
import ViewTitle from "@/frontend-resourses/components/Labels/ViewTitle";
import SkeletonTablaCaja from "./skeletons/SkTableComponent";
import Tabla from "./ui/Tabla";

type TablaCajaProps = {
  handleRefetch: boolean;
  setHandleRefetch: Dispatch<React.SetStateAction<boolean>>;
};

export default function TablaCaja({ handleRefetch, setHandleRefetch }: TablaCajaProps) {
  const {
    data: cajasSeccion,
    refetch,
    isFetching,
  } = useQuery<CajasSeccionResponse>({
    queryKey: ["cajas-seccion"],
    queryFn: obtenerCajasSecciones,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
  });
  useRefetchOnFlag(handleRefetch, setHandleRefetch, refetch);

  const { totalVentas, totalVentasNetas, result } = buildTablaSeccion(cajasSeccion || []);

  const dataFooter = {
    nseccion: "",
    venta: totalVentas,
    porcentaje: "",
    porcentajeNeto: totalVentasNetas,
  };

  return (
    <div className="w-fit p-5 pb-1">
      {isFetching ? (
        <SkeletonTablaCaja />
      ) : (
        <>
          <ViewTitle title="Venta por Sección" addClassName="rounded-t-md " />
          <Tabla data={result} footer={dataFooter} />
        </>
      )}
    </div>
  );
}
