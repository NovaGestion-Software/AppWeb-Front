import dayjs from "dayjs";

type PaymentMethod = {
  id: string;
  type: string;
  installments: number;
};

type Payment = {
  id: string;
  amount: string;
  paid_amount: string;
  reference_id: string;
  status: string;
  status_detail: string;
  payment_method: PaymentMethod;
};

type Item = {
  title: string;
  unit_price: string;
  unit_measure: string;
  external_code: string;
  quantity: number;
};

type Orden = {
  id: string;
  description: string;
  total_amount: string;
  total_paid_amount: string;
  currency: string;
  created_date: string;
  last_updated_date: string;
  external_reference: string;
  transactions: {
    payments: Payment[];
  };
  items: Item[];
};

type Props = {
  orden: Orden;
};

export default function PagoAcreditadoInfo({ orden }: Props) {
  if (!orden || typeof orden !== "object") return null;

  const pago = orden.transactions?.payments?.[0];
  const item = orden.items?.[0];

  // Formateo de fecha seguro
  let fechaFormateada = "Fecha no disponible";
  try {
    if (orden.created_date) {
      fechaFormateada = dayjs(orden.created_date).format("DD/MM/YYYY HH:mm");
    }
  } catch (error) {
    console.warn("Error al formatear la fecha:", error);
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4 text-green-600 text-center">✅ Pago Acreditado</h2>

      <ul className="text-sm text-gray-700 space-y-2">
        <li>
          <strong>Orden ID:</strong> {orden.id ?? "No disponible"}
        </li>
        <li>
          <strong>Referencia externa:</strong> {orden.external_reference ?? "No disponible"}
        </li>
        <li>
          <strong>Descripción:</strong> {orden.description ?? "Sin descripción"}
        </li>
        <li>
          <strong>Fecha:</strong> {fechaFormateada}
        </li>
        <li>
          <strong>Monto total:</strong> {orden.total_amount ?? "-"} {orden.currency ?? ""}
        </li>
        <li>
          <strong>Monto pagado:</strong> {orden.total_paid_amount ?? "-"} {orden.currency ?? ""}
        </li>

        {item && (
          <>
            <li>
              <strong>Producto:</strong> {item.title ?? "Sin nombre"}
            </li>
            <li>
              <strong>Cantidad:</strong> {item.quantity ?? "-"}
            </li>
            <li>
              <strong>Precio unitario:</strong> {item.unit_price ?? "-"} {orden.currency ?? ""}
            </li>
          </>
        )}

        {pago?.payment_method && (
          <>
            <li>
              <strong>Método de pago:</strong> {pago.payment_method.type ?? "Desconocido"}
            </li>
            <li>
              <strong>ID del pago:</strong> {pago.id ?? "-"}
            </li>
            <li>
              <strong>Referencia del pago:</strong> {pago.reference_id ?? "-"}
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
