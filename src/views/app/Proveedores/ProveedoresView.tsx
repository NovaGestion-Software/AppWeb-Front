import { ViewTitle } from "@/frontend-resourses/components";
import { useEscapeShortcut } from "../informes/_Hooks/useEscapeShortcut";
import { useProovedoresStore } from "./Store/Store";
import BotoneraPrincipal from "./Components/Botoneras/BotoneraPrincipal";
import BotoneraSecundaria from "./Components/Botoneras/BotoneraSecundaria";
import ProovedorForm from "./Components/Form/ProovedorForm";

export default function ProvedoresView() {
  const { estaProcesado, setEstaProcesado } = useProovedoresStore();
console.log('first')
  const handleClearData = () => {
    setEstaProcesado(false);
  };

  useEscapeShortcut({
    estaProcesado,
    handleClearData,
  });

  return (
    <div>
      <ViewTitle title="Proovedores" />
      <div className="grid2 gap-1 px-6 py-2 bg-white">
        <BotoneraPrincipal />
        <BotoneraSecundaria />
        {/* <BotoneraTest /> */}
        <ProovedorForm />
      </div>

    </div>
  );
}
