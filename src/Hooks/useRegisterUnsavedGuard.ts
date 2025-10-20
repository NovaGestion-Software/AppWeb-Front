// src/hooks/useRegisterUnsavedGuard.ts
import { useUnsavedGuardStore } from "@/Store/unsavedGuard.store";
import { useEffect, useId } from "react";

type Options = {
  when: boolean;
  onDiscard?: () => void | Promise<void>;
};

/**
 * Registra esta vista como "con cambios sin guardar".
 * No crea blockers: sólo anota en la store global.
 */
export function useRegisterUnsavedGuard({ when, onDiscard }: Options) {
  const id = useId();
  const register = useUnsavedGuardStore((s) => s.register);
  const unregister = useUnsavedGuardStore((s) => s.unregister);

  useEffect(() => {
    if (when) register(id, onDiscard);
    else unregister(id);
    return () => unregister(id);
  }, [when, onDiscard, id, register, unregister]);
}
