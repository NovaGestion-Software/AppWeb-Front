import { ReactNode } from "react";

export type SimpleBotonera = {
  type: "simple";
  text?: string;
  icon?: ReactNode;
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
  addClassName?: string;
};

export type CustomBotonera = {
  type: "custom";
  button: ReactNode;
};

export type BotoneraConfig = SimpleBotonera | CustomBotonera;
