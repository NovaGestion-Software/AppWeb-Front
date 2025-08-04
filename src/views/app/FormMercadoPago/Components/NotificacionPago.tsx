// components/NotificacionPago.tsx
import { useEffect, useState } from "react";

type EventoPago = {
  type: string;
  data: any;
};

export default function NotificacionPago() {
  const [evento, setEvento] = useState<EventoPago | null>(null);

  useEffect(() => {
    const source = new EventSource("/api/events");

    source.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "pago_recibido") {
        setEvento(data);
      }
    };

    return () => {
      source.close();
    };
  }, []);

  if (!evento) return null;

  return (
    <div className="bg-green-100 text-green-800 p-4 rounded">
      <h2 className="font-bold">Pago recibido</h2>
      <pre className="text-xs">{JSON.stringify(evento.data, null, 2)}</pre>
    </div>
  );
}
