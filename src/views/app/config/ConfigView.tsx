import { useState, useEffect } from "react";
import SwitchHomologacion from "./Componentes/SwitchHomologacion";
import { useEntornoStore } from "./Store/useEntornoStore";
import SwitchEntorno from "./Componentes/SwtichEntorno";
import { ViewTitle } from "@/frontend-resourses/components";

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

  let valorEntorno = entorno === "production" ? "Produccion -> Apinova" : "Desarrollo -> ApinovaDes";
  let valorModo = homologacion === "prod" ? "Produccion" : "Homologacion";

  const userData = [
    { label: "Empresa", value: config.empresa },
    { label: "USUARIO", value: config.usuario },
    { label: "TUSUARIO", value: config.tusuario },
  ];
  const configData = [
    { label: "IPHOST", value: config.iphost },
    { label: "DB", value: config.db },
    { label: "Modo", value: valorModo },
    { label: "Entorno", value: valorEntorno },
  ];

  return (
    <>
      <ViewTitle title="Administracion" />
      {/* contenedor */}
      <div
        className="flex-col h-[36rem] m-2 items-center justify-center ml-8 p-6  bg-white shadow-md rounded-lg
         v1440:w-4/5 v1440:mx-auto v1920:w-2/3 v1440:mt-12"
      >
        <div className="flex gap-10">
          <div className="">
            {/* Imagen Placeholder */}
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center h-24 w-24 bg-gray-200 rounded-lg mb-6">
                <img width={200} height={200} src={`data:image/jpeg;base64,${user.logoemp}`} alt="Nova Logo" className="rounded-full w-full h-full object-contain" />
              </div>
            </div>
            {/**switch */}
            <div className="flex flex-col items-center justify-center">
              {" "}
              {/* Cambio de Entorno */}
              <SwitchEntorno />
              {/* Cambio de Homologacion */}
              <SwitchHomologacion />
            </div>
          </div>
          {/* Información de Usuario */}
          <div className="flex flex-col flex-wrap overflow-hidden gap-2  ">
            {userData.map((item, index) => (
              <div key={index} className="flex flex-col  items-start w-60 gap-4 p-4 border border-gray-300 rounded-lg bg-gray-100 shadow-sm shadow-gray-400">
                <label className="text-sm font-medium underline text-gray-700">{item.label}:</label>
                <p className="text-blue-800 font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
          {/* Información de Configuración */}
          <div className="flex flex-col flex-wrap gap-2   ">
            {configData.map((item, index) => (
              <div key={index} className="flex flex-col  items-start w-60 gap-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
                <label className="text-sm font-medium underline text-gray-700">{item.label}:</label>
                <p className="text-blue-800 font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
