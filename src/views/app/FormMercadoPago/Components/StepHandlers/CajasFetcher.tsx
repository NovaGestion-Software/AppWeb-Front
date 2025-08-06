import { useEffect, useState } from "react";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";
import { MercadoPagoService } from "../../services/MercadoPagoService";
import CrearCajaForm from "./CrearCajasForm";
import { EntidadFetcherCard } from "./EntidadFetcherCard";

export default function CajasFetcher() {
  const [mostrarCrearCaja, setMostrarCrearCaja] = useState(false);
  const [retryFetch, setRetryFetch] = useState(false);

  const store = useMercadoPagoStore();
  const { userId, cajas, setCajas, setLoadingCajas, isLoadingCajas, setError, cajaSeleccionada, setCajaSeleccionada, sucursalSeleccionada } = store;

  const normalizarCaja = (caja: any) => ({
    id: caja.id,
    name: caja.name,
    store_id: caja.store_id || caja.external_store_id || "",
    external_id: caja.external_id || "",
    fixed_amount: caja.fixed_amount ?? false,
    qr: caja.qr || null,
    status: caja.status || "",
    site: caja.site || "",
  });

  useEffect(() => {
    const fetchCajas = async () => {
      if (!userId) return;
      setLoadingCajas(true);
      try {
        const data = await MercadoPagoService.obtenerCajas(userId);
        if (Array.isArray(data.results)) {
          const cajasNormalizadas = data.results.map(normalizarCaja);
          setCajas(cajasNormalizadas);
        } else {
          throw new Error("Respuesta inesperada al consultar cajas.");
        }
      } catch (error: any) {
        console.error("Error al consultar cajas:", error);
        setError(error.message || "Error al consultar cajas");
      } finally {
        setLoadingCajas(false);
      }
    };

    if (userId && cajas === null) fetchCajas();
    if (retryFetch) {
      fetchCajas();
      setRetryFetch(false);
    }
  }, [userId, cajas, setCajas, setLoadingCajas, setError, retryFetch]);

  if (isLoadingCajas) return <p className="text-sm text-gray-600 mt-4">Consultando cajas...</p>;

  const cajasFiltradas = cajas?.filter((caja: any) => caja.store_id === sucursalSeleccionada?.id) ?? [];

  const renderCajaItem = (caja: any, isSelected: boolean, onSelect: () => void) => (
    <label key={caja.id} className="flex flex-col text-sm text-gray-800 cursor-pointer border p-2 rounded hover:bg-gray-50">
      <div className="flex items-center gap-2">
        <input type="radio" checked={isSelected} onChange={onSelect} className="form-radio text-blue-600" />
        <span className="font-medium">{caja.name}</span>
      </div>

      <span className="text-xs text-gray-500">ID externo: {caja.external_id}</span>

      {/* <span className="text-xs text-gray-500">
      Estado: {caja.status || "Desconocido"}
    </span> */}
    </label>
  );

  return (
    <EntidadFetcherCard
      titulo="Cajas disponibles:"
      items={cajasFiltradas}
      itemSeleccionado={cajaSeleccionada}
      onSeleccionarItem={setCajaSeleccionada}
      mostrarFormulario={mostrarCrearCaja}
      toggleMostrarFormulario={() => setMostrarCrearCaja(!mostrarCrearCaja)}
      FormularioComponente={<CrearCajaForm />}
      sinResultadosTexto="No se encontraron cajas."
      onRetry={() => setRetryFetch(true)}
      mostrarRetry={true}
      botonCrearTexto="Crear nueva caja"
      renderItem={renderCajaItem}
    />
  );
}
