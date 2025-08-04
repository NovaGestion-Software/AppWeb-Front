import { useState } from "react";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";

export default function CrearSucursalForm() {
  const store = useMercadoPagoStore();
  const { token, userId, setError, sucursales, setSucursales, setUltimaSucursalCreada } = store;

  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !userId) return console.log("no token or userId");

    setCreating(true);
    setError(null);
    setSuccessMsg(null);

    try {
      // Obtener cantidad actual de sucursales
      const cantidadActual = sucursales?.length || 0;

      // Calcular el próximo número de sucursal (empezando desde 1)
      const nuevoNumero = cantidadActual + 1;

      // Formatear como SUC0001, SUC0002, etc.
      const externalIdGenerado = `SUC${String(nuevoNumero).padStart(4, "0")}`;

      const payload = {
        name,
        external_id: externalIdGenerado,
        business_hours: {
          monday: [{ open: "08:00", close: "12:00" }],
          tuesday: [{ open: "09:00", close: "18:00" }],
        },
        location: {
          street_number: "0123",
          street_name: "Example Street Name.",
          city_name: "City name.",
          state_name: "State name.",
          latitude: 27.175193925922862,
          longitude: 78.04213533235064,
          reference: "Near to Mercado Pago",
        },
      };

      const res = await fetch(`https://api.mercadopago.com/users/${userId}/stores`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("No se pudo crear la sucursal");

      const data = await res.json();
      setSuccessMsg(`Sucursal creada: ${data.name}`);
      setUltimaSucursalCreada(data);

      // Agregar la nueva sucursal al listado actual
      setSucursales([...(sucursales || []), data]);
    } catch (err: any) {
      setError(err.message || "Error al crear sucursal");
    } finally {
      setCreating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4 max-w-md bg-gray-50 p-4 rounded">
      <label className="block text-sm font-medium text-gray-700">
        Nombre de la sucursal:
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded px-2 py-1" />
      </label>

      <button type="submit" disabled={creating || !name} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
        {creating ? "Creando..." : "Crear sucursal"}
      </button>

      {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
    </form>
  );
}
