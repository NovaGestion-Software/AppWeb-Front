/**
 * ui-messages.slice.ts
 * Slice global para manejar la cola de mensajes/notifications (UiMessage).
 * - Mantiene una cola FIFO.
 * - No asume renderer (toast, modal, etc.); la UI decide cómo consumirla.
 */

import type { StateCreator } from "zustand";
import type { UiMessage } from "@/types/ui-messages";

export interface UiMessagesSlice {
  /** Cola global de mensajes (FIFO) */
  queue: UiMessage[];

  /** Encola un mensaje al final */
  pushMessage: (m: UiMessage) => void;

  /** Desencola y retorna el primer mensaje (o undefined si vacío) */
  shiftMessage: () => UiMessage | undefined;

  /** Elimina un mensaje por id (útil para cancelaciones o autocierre) */
  removeMessageById: (id: string) => void;

  /** Reemplaza la cola por una nueva (uso puntual) */
  setQueue: (next: UiMessage[]) => void;

  /** Limpia la cola completa */
  clearQueue: () => void;
}

/**
 * Factory del slice UiMessages.
 * - Desacoplado del tipo raíz usando StateCreator<any,…>.
 */
export const createUiMessagesSlice: StateCreator<any, [], [], UiMessagesSlice> = (set, get) => ({
  queue: [],

  pushMessage: (m) => set({ queue: [...get().queue, m] }),

  shiftMessage: () => {
    const q = get().queue;
    if (q.length === 0) return undefined;
    const [head, ...rest] = q;
    set({ queue: rest });
    return head;
  },

  removeMessageById: (id) => {
    const q: UiMessage[] = get().queue;
    const next = q.filter((m: UiMessage) => m.id !== id);
    if (next.length !== q.length) set({ queue: next });
  },

  setQueue: (next) => set({ queue: next }),

  clearQueue: () => set({ queue: [] }),
});
