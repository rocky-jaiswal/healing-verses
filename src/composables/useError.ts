import { computed } from "vue";
import { useErrorStore, type AppError } from "../stores/errors";

export type { AppError };

export function useError() {
  const store = useErrorStore();

  const errors = computed(() => store.list);
  const hasErrors = computed(() => store.list.length > 0);

  const push = (message: string, status?: number): void => {
    store.push(message, status);
  };

  const remove = (id: number): void => {
    store.remove(id);
  };

  const clear = (): void => {
    store.clear();
  };

  return { errors, hasErrors, push, remove, clear };
}
