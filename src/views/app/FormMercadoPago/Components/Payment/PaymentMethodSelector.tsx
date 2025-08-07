import React from "react";

type PaymentMethodSelectorProps = {
  paymentMethod:  "qr" | "pos";
  setPaymentMethod: (method:  "qr" | "pos") => void;
};

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethod,
  setPaymentMethod,
}) => (
  <div className="border-b pb-4">
    <h2 className="text-lg font-semibold mb-3">Método de Pago</h2>
    <div className="flex space-x-4">
      {([ "qr", "pos"] as const).map((method) => (
        <button
          key={method}
          type="button"
          onClick={() => setPaymentMethod(method)}
          className={`px-4 py-2 rounded-md ${
            paymentMethod === method
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {method === "qr" && "QR Presencial"}
          {method === "pos" && "POS Físico"}
        </button>
      ))}
    </div>
  </div>
);

export default PaymentMethodSelector;