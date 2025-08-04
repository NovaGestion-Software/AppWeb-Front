// components/QRModal.tsx
import QRCode from "react-qr-code";
import Switch from "./Switch";
import { useState } from "react";
import Spinner from "../Spinner";

interface QRModalProps {
  qrData: string;
}

function QRDisplay({ qrData }: QRModalProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Escaneá para pagar
      </h2>
      <div className="flex justify-center bg-white p-4">
        <QRCode value={qrData} size={256} />
      </div>
    </div>
  );
}

export default function QRPago({ qrData }: { qrData: string }) {
  const [showQr, setShowQr] = useState<boolean>(true);
  return (
    <div className="flex-col items-center justify-center">
      <Switch
        showQR={showQr}
        onChange={setShowQr}
        label1="Ocultar QR"
        label2="Mostrar QR"
      />
      {showQr ? <QRDisplay qrData={qrData} /> : <div className="w-full flex items-center  justify-center"> <Spinner /></div> }
    </div>
  );
}
