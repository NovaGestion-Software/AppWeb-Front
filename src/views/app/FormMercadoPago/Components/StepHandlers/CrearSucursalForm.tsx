import { useState } from "react";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";
import { MercadoPagoService } from "../../services/MercadoPagoService";

export default function CrearSucursalForm() {
  const store = useMercadoPagoStore();
  const {
    userId,
    sucursales,
    setSucursales,
    setUltimaSucursalCreada,
    setError,
  } = store;

  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return console.warn("Falta userId");

    setCreating(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const cantidadActual = sucursales?.length || 0;
      const nuevoNumero = cantidadActual + 1;
      const externalIdGenerado = `SUC${String(nuevoNumero).padStart(4, "0")}`;

      const payload = {
        name,
        external_id: externalIdGenerado,
        location: {
          street_number: "123",
          street_name: "Calle Falsa",
          city_name: "25 de Mayo",
          state_name: "Buenos Aires",
          latitude: -34.6037,
          longitude: -58.3816,
          reference: "Frente a la plaza",
        },
      };

      const data = await MercadoPagoService.crearSucursal(payload);

      setSuccessMsg(`Sucursal creada: ${data.name}`);
      setUltimaSucursalCreada(data);
      setSucursales([...(sucursales || []), data]);

      // ✅ Si querés, podrías guardar `data.store_id` y `data.external_id` en la store acá.
      // Por ejemplo:
      // store.setSucursalSeleccionada({ id: data.id, external_id: data.external_id });
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
        disabled={creating || !name}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {creating ? "Creando..." : "Crear sucursal"}
      </button>

      {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
    </form>
  );
}
