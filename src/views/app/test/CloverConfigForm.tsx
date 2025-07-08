import { useState } from "react";
import axios from "axios";

const camposIniciales = {
  REMOTE_APP_ID: "",
  CLOVER_WS_URI: "",
  CLOVER_DEVICE_ID: "",
  CLOVER_MERCHANT_ID: "",
  CLOVER_ACCESS_TOKEN: ""
};

export default function CloverConfigForm() {
  const [modo, setModo] = useState<"LAN" | "CLOUD">("LAN");
  const [campos, setCampos] = useState(camposIniciales);
  const [estado, setEstado] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCampos({ ...campos, [e.target.name]: e.target.value });
  };

  const iniciarConexion = async () => {
    try {
      const res = await axios.post("http://localhost:4000/configurar", {
        modo,
        ...campos
      });
      console.log('res',res)
      setEstado("✅ Conexión iniciada correctamente");
    } catch (error) {
      console.error(error);
      setEstado("❌ Error al iniciar conexión");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded-xl bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Configurar Clover</h2>

      <div className="mb-4">
        <label className="mr-4">
          <input type="radio" value="LAN" checked={modo === "LAN"} onChange={() => setModo("LAN")} />
          LAN
        </label>
        <label className="ml-4">
          <input type="radio" value="CLOUD" checked={modo === "CLOUD"} onChange={() => setModo("CLOUD")} />
          Cloud
        </label>
      </div>

      <div className="grid gap-3">
        <input
          className="border p-2 rounded"
          placeholder="REMOTE_APP_ID"
          name="REMOTE_APP_ID"
          value={campos.REMOTE_APP_ID}
          onChange={handleChange}
        />

        {modo === "LAN" && (
          <input
            className="border p-2 rounded"
            placeholder="CLOVER_WS_URI (wss://...)"
            name="CLOVER_WS_URI"
            value={campos.CLOVER_WS_URI}
            onChange={handleChange}
          />
        )}

        {modo === "CLOUD" && (
          <>
            <input
              className="border p-2 rounded"
              placeholder="CLOVER_DEVICE_ID"
              name="CLOVER_DEVICE_ID"
              value={campos.CLOVER_DEVICE_ID}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded"
              placeholder="CLOVER_MERCHANT_ID"
              name="CLOVER_MERCHANT_ID"
              value={campos.CLOVER_MERCHANT_ID}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded"
              placeholder="CLOVER_ACCESS_TOKEN"
              name="CLOVER_ACCESS_TOKEN"
              value={campos.CLOVER_ACCESS_TOKEN}
              onChange={handleChange}
            />
          </>
        )}
      </div>

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={iniciarConexion}
      >
        Iniciar conexión
      </button>

      {estado && <p className="mt-4">{estado}</p>}
    </div>
  );
}
