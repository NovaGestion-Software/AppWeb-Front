import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type UseEscapeShortcutProps = {
  estaProcesado: boolean;
  handleClearData: () => void;
};

export function useEscapeShortcut({ estaProcesado, handleClearData }: UseEscapeShortcutProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !estaProcesado) {
        navigate("/home");
        return;
      }
      if (e.key === "Escape" && estaProcesado) {
        handleClearData();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [ estaProcesado, handleClearData]);
}
