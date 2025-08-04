type SwitchProps = {
  showQR: boolean;
  onChange: (showQR: boolean) => void;
  label1?: string;
  label2?: string;
};

export default function Switch({
  showQR,
  onChange,
  label1 = "Label 1",
  label2 = "Label 2",
}: SwitchProps) {
  return (
    <div className="flex items-center justify-center mb-6">
      <span
        className={`mr-3 font-medium ${
          !showQR ? "text-blue-600" : "text-gray-500"
        }`}
      >
        {label1}
      </span>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={showQR}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>

      <span
        className={`ml-3 font-medium ${
          showQR ? "text-blue-600" : "text-gray-500"
        }`}
      >
        {label2}
      </span>
    </div>
  );
}
