import { Dispatch } from "react";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { SucursalCaja } from "@/types";

import CardCaja from "./ui/CardCaja";
import { useRefetchOnFlag } from "@/Hooks/useRefetchOnFlag";
import { useCajasKPIs } from "./hooks/useCajasKPIs";
import { formatCurrency, formatNumber } from "../_shared/domain/format";
import { CARD_DEFS } from "./config/cards";
import SkCajaComponent from "./skeleton/SkCajaComponent";

type CardComponentProps = {
  handleRefetch: boolean;
  setHandleRefetch: Dispatch<React.SetStateAction<boolean>>;
  cajas: SucursalCaja[] | undefined;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<SucursalCaja[], Error>>;
  isFetching: boolean;
};

export default function CardComponent({ handleRefetch, setHandleRefetch, cajas, refetch, isFetching }: CardComponentProps) {
  // 1) Efecto de refetch aislado
  useRefetchOnFlag(handleRefetch, setHandleRefetch, refetch);

  // 2) KPIs puros (números)
  const kpis = useCajasKPIs(cajas);

  // 3) Mapeo a tarjetas (formato en la UI, no en el dominio)
  const cards = CARD_DEFS.map(({ key, label, bg, currency }) => {
    const value = kpis[key];
    if (value === undefined || value === null) return null;

    const title = currency ? formatCurrency(value) : formatNumber(value);

    return { title, subtitle: label, bg };
  }).filter(Boolean) as { title: string; subtitle: string; bg: string }[];

  // 4) Helper para secciones
  function renderCardSection(start: number, end?: number) {
    return (
      <div className="flex flex-row flex-wrap gap-2 mb-3 w-full h-full">
        {cards.slice(start, end).map((card, id) => (
          <CardCaja key={`${card.subtitle}-${id}`} {...card} />
        ))}
      </div>
    );
  }
  // 5) Loading skeleton
  if (isFetching) return <SkCajaComponent />;

  // 6) Layout final (ajustá cortes según tu CARD_DEFS)
  return (
    <div className="flex flex-col gap-4">
      {renderCardSection(0, 5)} {/* métricas generales */}
      {renderCardSection(5, 17)} {/* medios de pago */}
      {renderCardSection(17)} {/* movimientos y disponibilidades */}
    </div>
  );
}
