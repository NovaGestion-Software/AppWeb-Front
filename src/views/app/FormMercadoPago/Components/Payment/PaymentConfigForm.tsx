import React from "react";

type PaymentData = {
  back_urls?: {
    success: string;
    failure: string;
    pending: string;
  };
  notification_url?: string;
  external_reference?: string;
  statement_descriptor?: string;
  binary_mode?: boolean;
  auto_return?: string;
};

type PaymentConfigFormProps = {
  formData: PaymentData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => void;
};

const PaymentConfigForm: React.FC<PaymentConfigFormProps> = ({
  formData,
  handleInputChange,
}) => (
  <div className="border-b pb-4">
    <h2 className="text-lg font-semibold mb-3">Configuración de Pago</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL de Éxito*
        </label>
        <input
          type="url"
          value={formData.back_urls?.success || ""}
          onChange={(e) => handleInputChange(e, "back_urls.success")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL de Falla*
        </label>
        <input
          type="url"
          value={formData.back_urls?.failure || ""}
          onChange={(e) => handleInputChange(e, "back_urls.failure")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL Pendiente
        </label>
        <input
          type="url"
          value={formData.back_urls?.pending || ""}
          onChange={(e) => handleInputChange(e, "back_urls.pending")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL de Notificación
        </label>
        <input
          type="url"
          value={formData.notification_url || ""}
          onChange={(e) => handleInputChange(e, "notification_url")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Referencia Externa
        </label>
        <input
          type="text"
          value={formData.external_reference || ""}
          onChange={(e) => handleInputChange(e, "external_reference")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción en Factura (max 13 chars)
        </label>
        <input
          type="text"
          value={formData.statement_descriptor || ""}
          onChange={(e) => handleInputChange(e, "statement_descriptor")}
          maxLength={13}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.binary_mode || false}
          onChange={(e) => handleInputChange(e, "binary_mode")}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">
          Modo Binario (solo aprobado/rechazado)
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.auto_return === "approved"}
          onChange={(e) => handleInputChange(e, "auto_return")}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">
          Auto-Retorno al éxito
        </label>
      </div>
    </div>
  </div>
);

export default PaymentConfigForm;