
import SwitchEntorno from "../../informes/_components/Switch";
import { useEntornoStore } from "../Store/useEntornoStore";
import Cookies from "js-cookie";


export default function SwitchCambioEntorno() {
  const { entorno, setEntorno } = useEntornoStore();

  const toggleEntorno = () => {
    const nuevo = entorno === "production" ? "development" : "production";
    setEntorno(nuevo);
    console.log("Entorno activo:", nuevo);

    const tokenAcceso = Cookies.get(`token_acceso_${nuevo === "production" ? "production" : "development"}`);
    const tokenRefresh = Cookies.get(`token_refresh_${nuevo === "production" ? "production" : "development"}`);

    if (tokenAcceso && tokenRefresh) {
      Cookies.set("token_acceso", tokenAcceso, { path: "/", secure: true, sameSite: "Strict" });
      Cookies.set("token_refresh", tokenRefresh, { path: "/", secure: true, sameSite: "Strict" });
    }
  };

  return (
    <div>
      <SwitchEntorno
        label="Entorno"
        valueOff="Desarrollo"
        valueOn="Producción"
        onToggle={toggleEntorno}
        isChecked={entorno === "production"}
      />
    </div>
  );
}
