import React from "react";

type ActionButtonsProps = {
  fillRandomData: () => void;
  handleSubmit: (e: React.FormEvent) => void;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({
  fillRandomData,
}) => (
  <div className="flex justify-between items-center">
    <button
      type="button"
      onClick={fillRandomData}
      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
    >
      Llenar Datos Aleatorios
    </button>


  </div>
);

export default ActionButtons;