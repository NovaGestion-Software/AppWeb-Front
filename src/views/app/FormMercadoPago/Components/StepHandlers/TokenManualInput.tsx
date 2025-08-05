import { useState } from "react";
import { useMercadoPagoStore } from "../../Store/MercadoPagoStore";
import Switch from "../Payment/Switch";

type Props = {
  manualMode: boolean;
  setManualMode: (value: boolean) => void;
};

export default function TokenManualInput({ manualMode, setManualMode }: Props) {
  const { setToken } = useMercadoPagoStore();
  const [manualToken, setManualToken] = useState("");
  const [manualUserId, setManualUserId] = useState("");

  const handleSetManualToken = () => {
    if (!manualToken || !manualUserId) {
      alert("Completa ambos campos");
      return;
    }

    setToken(manualToken, manualUserId);
  };

  return (
    <div className="text-sm space-y-2">
      <Switch
        showQR={manualMode}
        onChange={setManualMode}
        label1="Automático"
        label2="Manual"
      />

      {manualMode && (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Token"
            className="border px-2 py-1 w-full rounded"
            value={manualToken}
            onChange={(e) => setManualToken(e.target.value)}
          />
          <input
            type="text"
            placeholder="User ID"
            className="border px-2 py-1 w-full rounded"
            value={manualUserId}
            onChange={(e) => setManualUserId(e.target.value)}
          />
          <button
            onClick={handleSetManualToken}
            className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
          >
            Usar token
          </button>
        </div>
      )}
    </div>
  );
}
