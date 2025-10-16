// src/guards/UnsavedChangesGate.tsx
import { useNotifier } from "@/Hooks/useNotifier";
import { useUnsavedGuardStore } from "@/Store/unsavedGuard.store";
import { useEffect, useRef } from "react";
import { useBlocker } from "react-router-dom";

export function UnsavedChangesGate() {
  const hasGuards = useUnsavedGuardStore((s) => s.hasGuards)();
  const runDiscards = useUnsavedGuardStore((s) => s.runDiscards);
  const blocker = useBlocker(hasGuards);
  const { confirm } = useNotifier();
  const promptingRef = useRef(false);

  // Bloqueo de navegación interna (único blocker de toda la app)
  useEffect(() => {
    if (blocker.state !== "blocked") return;
    if (promptingRef.current) return;
    promptingRef.current = true;

    let alive = true;
    (async () => {
      const ok = await confirm(
        "Hay cambios sin guardar. ¿Deseás descartar los cambios y salir?",
        { title: "Descartar cambios", cancel: true, confirmLabel: "Descartar", cancelLabel: "Cancelar" }
      ).catch(() => false);

      if (!alive) return;
      promptingRef.current = false;

      if (ok) {
        await runDiscards();   // ejecutar callbacks (limpieza/rollback)
        blocker.proceed();     // y recién ahí navegar
      } else {
        blocker.reset();
      }
    })();

    return () => {
      alive = false;
      promptingRef.current = false;
    };
  }, [blocker, confirm, runDiscards]);

  // Bloqueo de cierre/refresh del navegador
  useEffect(() => {
    if (!hasGuards) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [hasGuards]);

  return null; // no renderiza UI
}
