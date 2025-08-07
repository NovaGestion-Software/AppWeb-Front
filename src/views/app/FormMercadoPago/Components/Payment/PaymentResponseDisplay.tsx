import React from "react";

type PaymentResponseDisplayProps = {
  response: any;
  paymentMethod: "online" | "qr" | "pos";
};

const PaymentResponseDisplay: React.FC<PaymentResponseDisplayProps> = ({
  response,
  paymentMethod,
}) => (
  <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
    <p className="font-bold">Respuesta:</p>
    <pre className="text-xs mt-2 overflow-auto">
      {JSON.stringify(response, null, 2)}
    </pre>
    {paymentMethod === "qr" && response.qr_data && (
      <div className="mt-4">
        <p className="font-medium">Código QR:</p>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${response.qr_data}`}
          alt="Código QR de pago"
          className="mt-2 mx-auto"
        />
        <p className="mt-2 text-sm">
          Escanea este código con la app de Mercado Pago
        </p>
      </div>
    )}
    {paymentMethod === "online" && response.init_point && (
      <a
        href={response.init_point}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Ir al Checkout de Pago
      </a>
    )}
  </div>
);

export default PaymentResponseDisplay;