import { create } from "zustand";

type DiscardCb = () => void | Promise<void>;

type GuardState = {
  guards: Map<string, DiscardCb | undefined>;
  register: (id: string, onDiscard?: DiscardCb) => void;
  unregister: (id: string) => void;
  hasGuards: () => boolean;
  runDiscards: () => Promise<void>;
};

export const useUnsavedGuardStore = create<GuardState>((set, get) => ({
  guards: new Map(),
  register: (id, onDiscard) =>
    set((state) => {
      const next = new Map(state.guards);
      next.set(id, onDiscard);
      return { guards: next };
    }),
  unregister: (id) =>
    set((state) => {
      const next = new Map(state.guards);
      next.delete(id);
      return { guards: next };
    }),
  hasGuards: () => get().guards.size > 0,
  runDiscards: async () => {
    const callbacks = Array.from(get().guards.values()).filter(Boolean) as DiscardCb[];
    for (const cb of callbacks) await Promise.resolve(cb());
  },
}));
