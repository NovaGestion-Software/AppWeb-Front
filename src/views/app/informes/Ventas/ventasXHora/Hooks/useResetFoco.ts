import { useEffect } from "react";

type Props = {
  foco: boolean;
  setFoco: (valor: boolean) => void;
  delay?: number;
};

export function useFocoReset({ foco, setFoco, delay = 500 }: Props) {
  useEffect(() => {
    if (foco) {
      const timer = setTimeout(() => setFoco(false), delay);
      return () => clearTimeout(timer);
    }
  }, [foco, delay]);
}
