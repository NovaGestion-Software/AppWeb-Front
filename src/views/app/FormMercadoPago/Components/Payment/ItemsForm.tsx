import React from "react";

type Item = {
  title: string;
  unit_price: number;
  quantity: number;
  description?: string;
  picture_url?: string;
};

type ItemsFormProps = {
  items: Item[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string,
    isItem: boolean,
    index: number
  ) => void;
  addItem: () => void;
  removeItem: (index: number) => void;
};

const ItemsForm: React.FC<ItemsFormProps> = ({
  items,
  handleInputChange,
  addItem,
  removeItem,
}) => (
  <div className="border-b pb-4">
    <h2 className="text-lg font-semibold mb-3">Productos/Servicios</h2>
    {items.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-md"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            value={item.title}
            onChange={(e) => handleInputChange(e, "title", true, index)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precio Unitario
          </label>
          <input
            type="number"
            value={item.unit_price}
            onChange={(e) => handleInputChange(e, "unit_price", true, index)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cantidad
          </label>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleInputChange(e, "quantity", true, index)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="1"
            required
          />
        </div>
        <div className="flex items-end">
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Eliminar
            </button>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Descripción (opcional)
          </label>
          <input
            type="text"
            value={item.description || ""}
            onChange={(e) => handleInputChange(e, "description", true, index)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            URL de imagen (opcional)
          </label>
          <input
            type="url"
            value={item.picture_url || ""}
            onChange={(e) => handleInputChange(e, "picture_url", true, index)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    ))}
    <button
      type="button"
      onClick={addItem}
      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
    >
      + Agregar Producto
    </button>
  </div>
);

export default ItemsForm;