import { ViewTitle } from "@/frontend-resourses/components";
import PaymentFormNew from "./Components/Payment/PaymentForm";
import TokenFetcher from "./Components/StepHandlers/TokenFetcher";
import SucursalesFetcher from "./Components/StepHandlers/SucursalesFetcher";
import CajasFetcher from "./Components/StepHandlers/CajasFetcher";
import { useMercadoPagoStore } from "./Store/MercadoPagoStore";

export default function FormMercadoPagoView() {
  const { token,cajaSeleccionada, sucursalSeleccionada } = useMercadoPagoStore();

  return (
    <>
      <ViewTitle title="Ordenes de Pago" />
      <div className="m-auto p-12 flex flex-col">
        <div className="flex flex-row gap-3 items-stretch m-auto my-2">
          <TokenFetcher />
          
        {token && <SucursalesFetcher />}
        {sucursalSeleccionada && <CajasFetcher />}
          
          
        </div>

        {/* ✅ solo mostrar el formulario si hay caja seleccionada */}
        {cajaSeleccionada && <PaymentFormNew />}
      </div>
    </>
  );
}
