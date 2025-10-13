import { useCallback } from "react";
import { useAppStore } from "@/Store/store";
import type { UiAction, UiMessage, UiMessageKind } from "@/types/ui-messages";

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export type NotifyOptions = {
  title?: string;
  autoCloseMs?: number;
  payload?: Record<string, unknown>;
};
type ConfirmOptions = {
  title?: string;
  cancel?: boolean;          
  confirmLabel?: string;      
  cancelLabel?: string;       
};

function isConfirmOptions(x: unknown): x is ConfirmOptions {
  return typeof x === "object" && x !== null;
}

type NotifyFn = (text: string, opts?: NotifyOptions) => void;

function buildMessage(kind: UiMessageKind, text: string, opts?: NotifyOptions): UiMessage {
  return {
    id: makeId(),
    kind,
    text,
    ...(opts?.title ? { title: opts.title } : {}),
    ...(typeof opts?.autoCloseMs === "number" ? { autoCloseMs: opts.autoCloseMs } : {}),
    ...(opts?.payload ? { payload: opts.payload } : {}),
  };
}

// Bus de confirmaciones (mapa id -> resolver) en módulo (no dentro del hook)
const confirmResolvers = new Map<string, (value: boolean) => void>();

export function useNotifier() {
  const pushMessage = useAppStore(s => s.pushMessage);

  // Notificaciones simples
  const notify = useCallback(
    (kind: UiMessageKind, text: string, opts?: NotifyOptions) => {
      const msg = buildMessage(kind, text, opts);
      pushMessage(msg);
    },
    [pushMessage]
  );

  const notifySuccess: NotifyFn = useCallback(
    (text, opts) => notify("success", text, { autoCloseMs: 2200, ...(opts ?? {}) }),
    [notify]
  );
  const notifyInfo: NotifyFn = useCallback(
    (text, opts) => notify("info", text, { autoCloseMs: 2500, ...(opts ?? {}) }),
    [notify]
  );
  const notifyWarn: NotifyFn = useCallback(
    (text, opts) => notify("warning", text, { autoCloseMs: 3200, ...(opts ?? {}) }),
    [notify]
  );
  const notifyError: NotifyFn = useCallback(
    (text, opts) => notify("error", text, { autoCloseMs: 3600, ...(opts ?? {}) }),
    [notify]
  );




const confirm = useCallback(
  (text: string, optsOrTitle?: string | ConfirmOptions): Promise<boolean> => {
    const opts: ConfirmOptions = typeof optsOrTitle === "string"
      ? { title: optsOrTitle }
      : (isConfirmOptions(optsOrTitle) ? optsOrTitle : {});

    const {
      title = "Confirmar acción",
      cancel = true,
      confirmLabel = "Aceptar",
      cancelLabel = "Cancelar",
    } = opts;

    return new Promise((resolve) => {
      const id = makeId();
      confirmResolvers.set(id, resolve);

      const actions: UiAction[] = [];
      if (cancel) actions.push({ id: "cancel", label: cancelLabel });
      actions.push({ id: "confirm", label: confirmLabel, primary: true });

      pushMessage({
        id,
        kind: "confirm",
        title,
        text,
        actions,
      });
    });
  },
  [pushMessage]
);


  // Lo usa el Host para cerrar la promesa cuando el usuario elige
  const resolveConfirm = useCallback((id: string, value: boolean) => {
    const resolver = confirmResolvers.get(id);
    if (resolver) {
      resolver(value);
      confirmResolvers.delete(id);
    }
  }, []);

  return {
    notify,
    notifySuccess,
    notifyInfo,
    notifyWarn,
    notifyError,
    confirm,
    resolveConfirm, 
  };
}
