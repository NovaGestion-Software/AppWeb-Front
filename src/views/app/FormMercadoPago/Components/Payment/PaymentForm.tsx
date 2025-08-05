import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PaymentMethodSelector from "./PaymentMethodSelector";
import ItemsForm from "./ItemsForm";
import BuyerInfoForm from "./BuyerInfoForm";
import PaymentMethodConfig from "./PaymentMethodConfig";
import ActionButtons from "./ActionButtons";
import PaymentResponseDisplay from "./PaymentResponseDisplay";
import LoadingOverlay from "../LoadingOverlay";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";
import { MercadoPagoService } from "../../services/MercadoPagoService";

type PaymentMethod = "qr" | "pos";

type Item = {
  title: string;
  unit_price: number;
  quantity: number;
  description?: string;
  picture_url?: string;
  unit_measure?: string;
  external_code?: string;
};

type Payer = {
  email: string;
  identification_type?: string;
  identification_number?: string;
  address?: {
    zip_code?: string;
    street_name?: string;
    street_number?: string;
  };
};

type QRConfig = {
  mode?: "dynamic" | "static" | "hybrid";
  external_pos_id?: string;
};

export type PaymentData = {
  // Campos base
  items: Item[];
  payer: Payer;
  payment_methods?: {
    excluded_payment_types?: { id: string }[];
    installments?: number;
    default_payment_method_id?: string;
  };
  back_urls?: {
    success: string;
    failure: string;
    pending: string;
  };
  auto_return?: string;
  notification_url?: string;
  external_reference?: string;
  statement_descriptor?: string;
  binary_mode?: boolean;
  payment_type?: PaymentMethod;

  // Campos para QR (nueva implementación)
  config?: {
    qr?: QRConfig;
  };
  expiration_time?: string;
  total_amount?: number | string;
  description?: string;

  // Campos legacy (antigua implementación)
  point_of_interaction?: {
    type?: string;
    linked_to?: string;
    pos_id?: string;
  };
};

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "pos">("qr");
  const [formData, setFormData] = useState<PaymentData>({
    items: [{ title: "", unit_price: 0, quantity: 1 }],
    payer: { email: "" },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const store = useMercadoPagoStore();
  const { sucursalSeleccionada, setUltimaOrdenCreada, cajas } = store;

  // Obtener la caja activa para la sucursal seleccionada
  const cajaSeleccionada = cajas?.find((caja) => caja.store_id === sucursalSeleccionada?.external_id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setQrCode(null);
    setResponse(null);

    try {
      const totalAmount = formData.items.reduce((acc, item) => acc + item.unit_price * item.quantity, 0);

      const payload = {
        type: paymentMethod, // "qr" o "point"
        total_amount: totalAmount.toFixed(2),
        description: formData.items[0]?.title || "Compra en local",
        external_reference: `REF_${uuidv4()}`,
        expiration_time: "PT30M",
        config: {
          qr: {
            external_pos_id: formData.config?.qr?.external_pos_id,
            mode: formData.config?.qr?.mode || "dynamic",
          },
        },
        transactions: {
          payments: [
            {
              amount: totalAmount.toFixed(2),
            },
          ],
        },
        items: formData.items.map((item) => ({
          title: item.title,
          unit_price: item.unit_price.toFixed(2),
          quantity: item.quantity,
          unit_measure: item.unit_measure || "unit",
          external_code: item.external_code || `EXT_${Date.now()}`,
        })),
      };

      const data = await MercadoPagoService.crearOrden(payload);
      setResponse(data);

      setUltimaOrdenCreada({
        ...data,
        caja_id: cajaSeleccionada?.id,
        sucursal_id: sucursalSeleccionada?.id,
      } as any);

      if (paymentMethod === "qr") {
        const qr = data?.type_response?.qr_data;
        if (qr) {
          setQrCode(qr);
        } else {
          console.warn("No se encontró qr_data en la respuesta:", data);
        }
      }

      setShowLoading(true);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fillRandomData = () => {
    setFormData({
      items: [
        {
          title: "Producto de prueba",
          unit_price: 1234,
          quantity: 1,
          unit_measure: "unit",
        },
      ],
      payer: { email: `test_${Date.now()}@test.com` },
      external_reference: `REF_${uuidv4()}`,
      expiration_time: "PT30M",
      config: { qr: { mode: "dynamic", external_pos_id: "POS_TEST" } },
      point_of_interaction: { pos_id: "POS_TEST" },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string, isItem = false, index = 0) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;

    setFormData((prev) => {
      const newData = { ...prev };

      if (isItem) {
        const newItems = [...newData.items];
        newItems[index] = {
          ...newItems[index],
          [field]: field === "quantity" || field === "unit_price" ? Number(value) : value,
        };
        newData.items = newItems;
      } else {
        const fields = field.split(".");
        if (fields.length > 1) {
          let current: any = newData;
          for (let i = 0; i < fields.length - 1; i++) {
            current = current[fields[i]] = current[fields[i]] || {};
          }
          current[fields[fields.length - 1]] = value;
        } else {
          if (field in newData) {
            (newData as any)[field] = value;
          }
        }
      }

      return newData;
    });
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { title: "", unit_price: 0, quantity: 1 }],
    }));
  };

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Crear Orden de Pago</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <PaymentMethodSelector paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />

        <ItemsForm items={formData.items} handleInputChange={handleInputChange} addItem={addItem} removeItem={removeItem} />

        <BuyerInfoForm payer={formData.payer} handleInputChange={handleInputChange} />

        <PaymentMethodConfig paymentMethod={paymentMethod} formData={formData} handleInputChange={handleInputChange} setFormData={setFormData} />

        <ActionButtons isLoading={isLoading} handleSubmit={handleSubmit} fillRandomData={fillRandomData} />
      </form>

      {error && <div className="mt-4 text-red-600 font-medium">{String(error)}</div>}

      {response && <PaymentResponseDisplay response={response} paymentMethod={paymentMethod} />}

      {showLoading && <LoadingOverlay paymentMethod={paymentMethod} qrCode={qrCode || ""} orderId={response?.id || ""} onCancel={() => setShowLoading(false)} />}
    </div>
  );
};

export default PaymentForm;
