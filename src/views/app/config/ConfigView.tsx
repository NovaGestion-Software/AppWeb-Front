import { useState, useEffect } from "react";
import SwitchHomologacion from "./Componentes/SwitchHomologacion";
import { useEntornoStore } from "./Store/useEntornoStore";
import SwitchCambioEntorno from "./Componentes/SwtichEntorno";

export default function ConfigView() {
const [config, setConfig] = useState({
  empresa: "",
  usuario: "",
  tusuario: "",
  iphost: "",
  db: "",
});

const dbNameDev = localStorage.getItem("_dbd") || "";
const dbNameProd = localStorage.getItem("_dbp") || "";
const user = JSON.parse(localStorage.getItem("_u") || "{}");
const homologacion = useEntornoStore((state) => state.homologacion);
const entorno = useEntornoStore((state) => state.entorno);

useEffect(() => {
  setConfig({
    empresa: user.nfantasia || "",
    usuario: user.usuario || "",
    tusuario: user.tusuario || "",
    iphost: "46.202.146.93",
    db: entorno === "production" ? dbNameProd : dbNameDev,
  });
}, [entorno, homologacion]);


  const configData = [
    { label: "Empresa", value: config.empresa },
    { label: "USUARIO", value: config.usuario },
    { label: "TUSUARIO", value: config.tusuario },
    { label: "IPHOST", value: config.iphost },
    { label: "DB", value: config.db },
    { label: "Homologacion", value: homologacion },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 ml-5 mt-4">Administración</h2>
      <div className="flex justify-between items-center max-w-5xl p-6 bg-white shadow-md rounded-lg ml-10 gap-10">
        {/* Título */}

        {/* Imagen Placeholder */}
        <div className="flex items-center justify-center h-60 w-60 bg-gray-200 rounded-lg mb-6">
          <span className="text-gray-600">Imagen Placeholder</span>
        </div>

        {/* Información de Configuración */}
        <div className="space-y-4">
          {configData.map((item, index) => (
            <div key={index} className="flex flex-col items-start w-60 gap-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
              <label className="text-sm font-medium underline text-gray-700">{item.label}:</label>
              <p className="text-blue-800 font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center">
          {" "}
          {/* Cambio de Entorno */}
          <div className="flex flex-col items-center justify-center gap-5">
            <SwitchCambioEntorno />
          </div>
          {/* Cambio de Homologacion */}
          <div className="flex flex-col items-center justify-center mt-6 gap-5 ">
            <SwitchHomologacion />
          </div>
        </div>
      </div>
    </>
  );
}
