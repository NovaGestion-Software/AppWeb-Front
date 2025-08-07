import React, { useEffect } from "react";
import type { PaymentData } from "./PaymentForm";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";

type PaymentMethod = "online" | "qr" | "pos";

type PaymentMethodConfigProps = {
  paymentMethod: PaymentMethod;
  formData: PaymentData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<PaymentData>>;
};

const PaymentMethodConfig: React.FC<PaymentMethodConfigProps> = ({ paymentMethod, formData, handleInputChange, setFormData }) => {
const store = useMercadoPagoStore();
const {  cajaSeleccionada } = store;

useEffect(() => {
  if (paymentMethod === "pos" && cajaSeleccionada?.external_id) {
    console.log("Asignando POS ID:", cajaSeleccionada.external_id);
    setFormData((prev) => ({
      ...prev,
      point_of_interaction: {
        ...prev.point_of_interaction,
        pos_id: cajaSeleccionada.external_id,
      },
    }));
  }
}, [paymentMethod, cajaSeleccionada]);

useEffect(() => {
  if (
    paymentMethod === "qr" &&
    cajaSeleccionada?.external_id &&
    formData.config?.qr?.external_pos_id !== cajaSeleccionada.external_id
  ) {
    console.log("Asignando external_pos_id:", cajaSeleccionada.external_id);
    setFormData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        qr: {
          ...prev.config?.qr,
          external_pos_id: cajaSeleccionada.external_id,
        },
      },
    }));
  }
}, [paymentMethod, cajaSeleccionada, formData.config?.qr?.external_pos_id]);

  if (paymentMethod === "online") {
    return (
      <div className="border-b pb-4">
        <h2 className="text-lg font-semibold mb-3">Configuración de Pagos Online</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Métodos Excluidos</label>
            <div className="mt-2 space-y-2">
              {["ticket", "atm", "credit_card", "debit_card"].map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.payment_methods?.excluded_payment_types?.some((t) => t.id === type) || false}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setFormData((prev: any) => {
                        const newExcluded = [...(prev.payment_methods?.excluded_payment_types || [])];
                        if (isChecked) {
                          newExcluded.push({ id: type });
                        } else {
                          const index = newExcluded.findIndex((t) => t.id === type);
                          if (index !== -1) {
                            newExcluded.splice(index, 1);
                          }
                        }
                        return {
                          ...prev,
                          payment_methods: {
                            ...prev.payment_methods,
                            excluded_payment_types: newExcluded,
                          },
                        };
                      });
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    {type === "ticket" && "Efectivo (Rapipago/Pago Fácil)"}
                    {type === "atm" && "Cajeros Automáticos"}
                    {type === "credit_card" && "Tarjetas de Crédito"}
                    {type === "debit_card" && "Tarjetas de Débito"}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Máximo de Cuotas</label>
            <input
              type="number"
              value={formData.payment_methods?.installments || 6}
              onChange={(e) => handleInputChange(e, "payment_methods.installments")}
              min="1"
              max="36"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    );
  }

  if (paymentMethod === "qr") {
    return (
      <div className="border-b pb-4">
        <h2 className="text-lg font-semibold mb-3">Configuración de QR</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tipo de QR */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de QR</label>
            <select
              value={formData.config?.qr?.mode || "dynamic"}
              onChange={(e) => handleInputChange(e, "config.qr.mode")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="dynamic">Dinámico</option>
              <option value="static">Estático</option>
              <option value="hybrid">Híbrido</option>
            </select>
          </div>

          {/* External POS ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">ID del POS (Obligatorio)</label>
            <input
              type="text"
              value={formData.config?.qr?.external_pos_id || ""}
              onChange={(e) => handleInputChange(e, "config.qr.external_pos_id")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="SUCURSAL_01_POS_01"
              required
            />
          </div>

          {/* Expiración */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tiempo de expiración</label>
            <select
              value={formData.expiration_time || "PT30M"}
              onChange={(e) => handleInputChange(e, "expiration_time")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="PT15M">15 minutos</option>
              <option value="PT30M">30 minutos</option>
              <option value="PT1H">1 hora</option>
              <option value="PT2H">2 horas</option>
              <option value="PT4H">4 horas</option>
            </select>
          </div>

          {/* Referencia externa */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Referencia Externa (Opcional)</label>
            <input
              type="text"
              value={formData.external_reference || ""}
              onChange={(e) => handleInputChange(e, "external_reference")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="REF_12345"
            />
          </div>
        </div>
      </div>
    );
  }

  if (paymentMethod === "pos") {
    return (
      <div className="border-b pb-4">
        <h2 className="text-lg font-semibold mb-3">Configuración de POS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID del POS*</label>
            <input
              type="text"
              value={formData.point_of_interaction?.pos_id || ""}
              onChange={(e) => handleInputChange(e, "point_of_interaction.pos_id")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="POS-12345"
              required
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentMethodConfig;
