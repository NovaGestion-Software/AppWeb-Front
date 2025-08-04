import { useState } from "react";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";

export default function CrearCajaForm() {
  const store = useMercadoPagoStore();
  const {
    token,
    cajas,
    setCajas,
    setUltimaCajaCreada,
    setLoadingCajas,
    isLoadingCajas,
    setError, // si lo tenés en un slice global
    ultimaSucursalCreada,
  } = store;

  const [name, setName] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!token || !ultimaSucursalCreada?.external_id || !ultimaSucursalCreada.id) {
    return <p className="text-sm text-yellow-600">No hay una sucursal activa para crear la caja.</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingCajas(true);
    setSuccessMsg(null);
    setError?.(null); // si usás manejo global de error

    try {
      // Generar external_id único
      const existingCount = cajas?.length || 0;
      const newPosNumber = existingCount + 1;
      const external_id = `${ultimaSucursalCreada.external_id}POS${String(newPosNumber).padStart(3, "0")}`;

      const payload = {
        name,
        fixed_amount: false,
        store_id: Number(ultimaSucursalCreada.id),
        external_store_id: ultimaSucursalCreada.external_id,
        external_id,
        category: 621102, // categoría ejemplo
      };

      const res = await fetch("https://api.mercadopago.com/pos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("No se pudo crear la caja (POS)");

      const data = await res.json();

      setUltimaCajaCreada(data);
      setCajas([...(cajas ?? []), data]);
      setSuccessMsg(`Caja creada: ${data.name}`);
      setName("");
    } catch (err: any) {
      setError?.(err.message || "Error al crear caja");
    } finally {
      setLoadingCajas(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded mt-4 max-w-md">
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
