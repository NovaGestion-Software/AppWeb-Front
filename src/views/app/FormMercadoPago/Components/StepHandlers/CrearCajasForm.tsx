import { useState } from "react";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";
import { MercadoPagoService } from "../../services/MercadoPagoService";

export default function CrearCajaForm() {
  const store = useMercadoPagoStore();
  const {
    cajas,
    setCajas,
    setUltimaCajaCreada,
    setLoadingCajas,
    isLoadingCajas,
    setError,
    sucursalSeleccionada,
  } = store;

  const [name, setName] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!sucursalSeleccionada?.external_id || !sucursalSeleccionada.id) {
    return (
      <p className="text-sm text-yellow-600">
        Seleccioná una sucursal para crear la caja.
      </p>
    );
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingCajas(true);
    setSuccessMsg(null);
    setError?.(null);

    try {
      const existingCount = cajas?.length || 0;
      const newPosNumber = existingCount + 1;
      const external_id = `${sucursalSeleccionada.external_id}POS${String(
        newPosNumber
      ).padStart(3, "0")}`;

      const payload = {
        name,
        fixed_amount: false,
        store_id: Number(sucursalSeleccionada.id),
        external_store_id: sucursalSeleccionada.external_id,
        external_id,
        category: 621102,
      };

      const data = await MercadoPagoService.crearCaja(payload);
      const cajaNormalizada = normalizarCaja(data);

      setUltimaCajaCreada(cajaNormalizada);
      setCajas([...(cajas ?? []), cajaNormalizada]);
      setSuccessMsg(`Caja creada: ${cajaNormalizada.name}`);
      setName("");
    } catch (err: any) {
      setError?.(err.message || "Error al crear caja");
    } finally {
      setLoadingCajas(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-50 p-4 rounded mt-4 max-w-md"
    >
      <label className="block text-sm font-medium text-gray-700">
        Nombre de la caja:
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
        />
      </label>

      <button
        type="submit"
        disabled={isLoadingCajas || !name}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoadingCajas ? "Creando..." : "Crear caja"}
      </button>

      {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
    </form>
  );
}
