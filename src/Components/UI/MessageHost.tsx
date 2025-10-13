// src/components/Ui/MessageHost.tsx
import { useEffect, useState } from "react";
import type { UiMessage } from "@/types/ui-messages";
import { MessageModal } from "./MessageModal";
import { useNotifier } from "@/Hooks/useNotifier";
import { useAppStore } from "@/Store/store";

export function MessageHost() {
  const queue = useAppStore(s => s.queue);
  const shiftMessage = useAppStore(s => s.shiftMessage);
  const [current, setCurrent] = useState<UiMessage | null>(queue[0] ?? null);
  const { resolveConfirm } = useNotifier();

  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
    }
  }, [queue, current]);

  const handleClose = (actionId?: string) => {
    if (current?.kind === "confirm") {
      // true si el usuario presionó el botón de confirmar
      resolveConfirm(current.id, actionId === "confirm");
    }
    shiftMessage();
    setCurrent(null);
  };

  if (!current) return null;
  return <MessageModal message={current} onClose={handleClose} />;
}
