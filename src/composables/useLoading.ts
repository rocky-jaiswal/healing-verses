import { computed } from "vue";
import { useLoadingStore } from "../stores/loading";

export function useLoading() {
  const store = useLoadingStore();

  const isLoading = computed(() => store.isLoading);
  const isLoadingKey = (key: string) => store.hasKey(key);
  const startLoading = (key: string = "default") => store.start(key);
  const stopLoading = (key: string = "default") => store.stop(key);

  const withLoading = async <T>(
    keyOrFn: string | (() => Promise<T>),
    fn?: () => Promise<T>
  ): Promise<T> => {
    let key: string;
    let callback: () => Promise<T>;
    if (typeof keyOrFn === "function") {
      key = "default";
      callback = keyOrFn;
    } else {
      key = keyOrFn;
      callback = fn!;
    }
    startLoading(key);
    try {
      return await callback();
    } finally {
      stopLoading(key);
    }
  };

  return { isLoading, isLoadingKey, startLoading, stopLoading, withLoading };
}
