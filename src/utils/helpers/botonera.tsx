import { ExcelExportConfig } from "@/types";
import { BotoneraConfig } from "@/types/ButtonConfig";
import { ReactNode } from "react";
import { FaStoreAlt } from "react-icons/fa";
type BotonSucursalConfig = {
  setVisible: (val: boolean) => void;
  conTexto?: boolean;
  disabled?: boolean;
  iconSize?: string | number;
};

export function getBotonSucursal({
  setVisible,
  conTexto = true,
  disabled = false,
  iconSize = "text-[0.75rem] v1440:text-base v1536:text-lg v1920:text-xl",
}: BotonSucursalConfig): BotoneraConfig {
  let icon: ReactNode;

  if (typeof iconSize === "string") {
    icon = <FaStoreAlt className={iconSize} />;
  } else {
    icon = <FaStoreAlt size={iconSize} />;
  }

  return {
    type: "simple",
    text: conTexto ? "Sucursales" : undefined,
    icon,
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