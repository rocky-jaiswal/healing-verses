import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    activeKeys: new Set<string>(),
  }),
  getters: {
    isLoading: (state) => state.activeKeys.size > 0,
    count: (state) => state.activeKeys.size,
  },
  actions: {
    start(key: string) {
      this.activeKeys.add(key);
    },
    stop(key: string) {
      this.activeKeys.delete(key);
    },
    hasKey(key: string): boolean {
      return this.activeKeys.has(key);
    },
    clear() {
      this.activeKeys.clear();
    },
  },
});
