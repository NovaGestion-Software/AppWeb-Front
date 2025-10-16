import { useEffect, useRef, useState } from "react";
import type { UiMessage } from "@/types/ui-messages";

interface Props {
  message: UiMessage;
  onClose: (actionId?: string) => void;
}

export function MessageModal({ message, onClose }: Props) {
  const [visible, setVisible] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  // Utilidad: resuelve la acción por defecto para Enter
  // Regla: si hay "cancel" → Enter = cancel; si no, Enter = primary; si no, primera acción; si no hay acciones → undefined.
  const getEnterActionId = () => {
    const actions = message.actions ?? [];
    const cancel = actions.find(a => a.id === "cancel");
    if (cancel) return "cancel";
    const primary = actions.find(a => a.primary);
    if (primary) return primary.id;
    if (actions.length > 0) return actions[0].id;
    return undefined;
  };

  // Cierre centralizado con animación
  const handleAction = (actionId?: string) => {
    setVisible(false);
    setTimeout(() => onClose(actionId), 140);
  };

  // Cierre automático y click afuera
  useEffect(() => {
    let t: any;
    if (!message.actions?.length && message.autoCloseMs) {
      t = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onClose(), 180);
      }, message.autoCloseMs);
    }

    const handleClickOutside = (ev: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(ev.target as Node)) {
        if (!message.actions?.length) {
          clearTimeout(t);
          handleAction();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [message, onClose]);

  // Atajos de teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!visible) return;

      // ENTER → cancelar si existe; si no, aceptar (primary/primera)
      if (e.key === "Enter") {
        const enterId = getEnterActionId();
        if (enterId) {
          e.preventDefault();
          handleAction(enterId);
        }
      }

      // ESCAPE → cerrar (si existe cancel, notificar "cancel"; si no, solo cerrar)
      if (e.key === "Escape") {
        e.preventDefault();
        const hasCancel = message.actions?.some(a => a.id === "cancel");
        handleAction(hasCancel ? "cancel" : undefined);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, message.actions]);

  // Bloquear scroll de fondo
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] grid place-items-center bg-black/30 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={message.title ? "message-modal-title" : undefined}
    >
      <div
        ref={modalRef}
        className={`w-[min(92vw,460px)] rounded-2xl bg-white p-5 shadow-lg transition-all duration-200 ${
          visible ? "scale-100 translate-y-0" : "scale-95 -translate-y-1.5"
        }`}
      >
        {message.title && (
          <h2 id="message-modal-title" className="text-lg font-semibold mb-1">
            {message.title}
          </h2>
        )}
        <p className="text-sm text-gray-700">{message.text}</p>

        {!!message.actions?.length && (
          <div className="mt-4 flex justify-end gap-2">
            {message.actions.map(a => (
              <button
                key={a.id}
                onClick={() => handleAction(a.id)}
                className={`px-3 py-1.5 rounded ${
                  a.primary ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
                // Foco inicial: si no hay cancel, enfocar primary; si no hay primary, enfocar primera
                autoFocus={
                  (() => {
                    const actions = message.actions!;
                    const hasCancel = actions.some(x => x.id === "cancel");
                    if (!hasCancel && a.primary) return true;
                    if (!hasCancel && !actions.some(x => x.primary) && actions[0]?.id === a.id)
                      return true;
                    return false;
                  })()
                }
              >
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
