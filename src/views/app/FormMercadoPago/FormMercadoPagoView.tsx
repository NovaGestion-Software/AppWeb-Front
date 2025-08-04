import { ViewTitle } from "@/frontend-resourses/components";
import PaymentFormNew from "./Components/Payment/PaymentForm";
import TokenFetcher from "./Components/StepHandlers/TokenFetcher";
import SucursalesFetcher from "./Components/StepHandlers/SucursalesFetcher";
import { useState } from "react";
import CrearCajaForm from "./Components/StepHandlers/CrearCajasForm";
import { useMercadoPagoStore } from "./Store/MercadoPagoStore";

export default function FormMercadoPagoView() {
  const [cajas, setCajas] = useState(true);
  const store = useMercadoPagoStore();
  const { ultimaSucursalCreada } = store;

  return (
    <>
      <ViewTitle title="Ordenes de Pago" />
      <div className="m-auto p-12 flex flex-col">
        <TokenFetcher />
        <SucursalesFetcher />
        {ultimaSucursalCreada && <CrearCajaForm />}
        {cajas && <PaymentFormNew />}
      </div>
    </>
  );
}
