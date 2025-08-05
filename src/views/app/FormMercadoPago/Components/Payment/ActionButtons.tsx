import React from "react";

type ActionButtonsProps = {
  isLoading: boolean;
  fillRandomData: () => void;
  handleSubmit: (e: React.FormEvent) => void;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isLoading,
  fillRandomData,
  handleSubmit,
}) => (
  <div className="flex justify-between items-center">
    <button
      type="button"
      onClick={fillRandomData}
      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
    >
      Llenar Datos Aleatorios
    </button>

    <div className="flex items-center space-x-4">
      <button
        type="button"
        disabled={isLoading}
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isLoading ? "Procesando..." : "Crear Pago"}
      </button>
    </div>
  </div>
);

export default ActionButtons;