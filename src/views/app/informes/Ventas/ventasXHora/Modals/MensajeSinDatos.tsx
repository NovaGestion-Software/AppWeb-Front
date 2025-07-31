import { FechasRango } from "@/types";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs"; // si estás usando dayjs

interface MensajeSinDatosProps {
  fechas: FechasRango;
  onClose: () => void;
}

export function MensajeSinDatos({ fechas, onClose }: MensajeSinDatosProps) {
  const [visible, setVisible] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const desde = dayjs(fechas.from).format("DD-MM-YYYY");
  const hasta = dayjs(fechas.to).format("DD-MM-YYYY");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500);
    }, 3000);

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        clearTimeout(timeout);
        setVisible(false);
        setTimeout(onClose, 300); // cerramos más rápido si es por click
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`fixed inset-0 flex items-center justify-center transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"} bg-black/30 z-50`}>
      <div ref={modalRef} className={`bg-white p-6 rounded-2xl shadow-lg text-center transform transition-all duration-500 ${visible ? "scale-100 translate-y-0" : "scale-95 -translate-y-4"}`}>
        <h2 className="text-lg font-semibold mb-2">Sin registros en este período</h2>
        <p className="text-sm text-gray-600">
          No se encontraron datos entre el
          <span className="font-medium text-blue-600"> {desde}</span> y el <span className="font-medium text-blue-600">{hasta}</span>.
        </p>
      </div>
    </div>
  );
}
