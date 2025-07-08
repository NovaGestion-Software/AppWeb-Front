import { ExcelExportConfig } from "@/types";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { FaStoreAlt } from "react-icons/fa";
type BotonSucursalConfig = {
  setVisible: (val: boolean) => void;
  conTexto?: boolean;
  disabled?: boolean;
  iconSize?: string;
};

export function getBotonSucursal({
  setVisible,
  conTexto = true,
  disabled = false,
  iconSize = "text-[0.75rem] v1440:text-base v1536:text-lg v1920:text-xl",
}: BotonSucursalConfig): BotoneraConfig {
  return {
    type: "simple",
    text: conTexto ? "Sucursales" : undefined,
    icon: <FaStoreAlt className={iconSize}  />,
    onClick: () => setVisible(true),
    color: "blue",
    disabled,
    addClassName:
      "h-6 rounded-md text-xxs  v1440:h-8 v1536:h-9 v1536:px-6 v1536:text-sm v1920:h-9",
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