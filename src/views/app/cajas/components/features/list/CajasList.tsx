import { Dispatch, useMemo } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { SucursalCaja } from "@/types";
import { useHorizontalCarousel } from "./hooks/useHorizontalCarousel";
import { useRefetchOnFlag } from "@/Hooks/useRefetchOnFlag";
import ViewTitle from "@/frontend-resourses/components/Labels/ViewTitle";
import SkListComponent from "./skeletons/SkListComponent";
import SucursalSection from "./ui/SucursalSection";

type CajasListProps = {
  handleRefetch: boolean;
  setHandleRefetch: Dispatch<React.SetStateAction<boolean>>;
  cajas: SucursalCaja[];
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<SucursalCaja[], Error>>;
  isFetching: boolean;
};

export default function CajasList({ handleRefetch, setHandleRefetch, cajas, refetch, isFetching }: CajasListProps) {
  useRefetchOnFlag(handleRefetch, setHandleRefetch, refetch);
  const carousel = useHorizontalCarousel();

  const cajasOrdenadas = useMemo(() => (cajas ?? []).slice().sort((a, b) => Number(a.sucursal) - Number(b.sucursal)), [cajas]);

  if (isFetching) {
    return (
      <div className="w-1/2 p-5 pb-1 mb-3">
        <SkListComponent />
      </div>
    );
  }

  return (
    <div className="w-1/2 p-5 pb-1 mb-3">
      <ViewTitle title="Detalle de Cajas" addClassName="rounded-t-md" />
      <div className="flex flex-col gap-2 bg-white h-[32rem] v1536:h-[38.5rem] v1920:h-[47.5rem] shadow-md rounded-b-md">
        <div className="flex flex-col gap-y-5 scrollbar-thin overflow-auto p-4">
          {cajasOrdenadas.map((sucursal) => (
            <SucursalSection key={sucursal.sucursal} sucursal={sucursal} carousel={carousel} />
          ))}
        </div>
      </div>
    </div>
  );
}
