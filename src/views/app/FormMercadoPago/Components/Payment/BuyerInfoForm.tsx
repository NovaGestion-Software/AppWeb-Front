import React from "react";

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

type BuyerInfoFormProps = {
  payer: Payer;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => void;
};

const BuyerInfoForm: React.FC<BuyerInfoFormProps> = ({
  payer,
  handleInputChange,
}) => (
  <div className="border-b pb-4">
    <h2 className="text-lg font-semibold mb-3">Información del Comprador</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email*
        </label>
        <input
          type="email"
          value={payer.email}
          onChange={(e) => handleInputChange(e, "payer.email")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de Documento
        </label>
        <select
          value={payer.identification_type || ""}
          onChange={(e) => handleInputChange(e, "payer.identification_type")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Seleccionar</option>
          <option value="DNI">DNI</option>
          <option value="CI">CI</option>
          <option value="LE">LE</option>
          <option value="LC">LC</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Número de Documento
        </label>
        <input
          type="text"
          value={payer.identification_number || ""}
          onChange={(e) => handleInputChange(e, "payer.identification_number")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>

    <h3 className="text-md font-medium mt-4 mb-2">Dirección (Opcional)</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Código Postal
        </label>
        <input
          type="text"
          value={payer.address?.zip_code || ""}
          onChange={(e) => handleInputChange(e, "payer.address.zip_code")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Calle
        </label>
        <input
          type="text"
          value={payer.address?.street_name || ""}
          onChange={(e) => handleInputChange(e, "payer.address.street_name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Número
        </label>
        <input
          type="text"
          value={payer.address?.street_number || ""}
          onChange={(e) => handleInputChange(e, "payer.address.street_number")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
);

export default BuyerInfoForm;