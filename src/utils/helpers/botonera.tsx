import { ExcelExportConfig } from "@/types";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { FaStoreAlt } from "react-icons/fa";
type BotonSucursalConfig = {
  setVisible: (val: boolean) => void;
  conTexto?: boolean;
  disabled?: boolean;
  iconSize?: number;
};

export function getBotonSucursal({
  setVisible,
  conTexto = true,
  disabled = false,
  iconSize = 12,
}: BotonSucursalConfig): BotoneraConfig {
  return {
    type: "simple",
    text: conTexto ? "Sucursales" : undefined,
    icon: <FaStoreAlt size={iconSize} />,
    onClick: () => setVisible(true),
    color: "blue",
    disabled,
    addClassName:
      "h-6 rounded-md text-xxs  v1440:h-8 v1536:h-8 v1536:px-6 v1536:text-sm",
  };
}


export function crearExportConfig(
  nombreArchivo: string,
  nombreHoja: string,
  data: any[],
  headers?: string[]
): ExcelExportConfig {
  return {
    fileName: nombreArchivo,
    sheets: [
      {
        name: nombreHoja,
        data,
        headers, 
      },
    ],
  };
}