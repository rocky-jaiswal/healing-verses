import { reactive } from "vue";

const STORAGE_KEY = "healing-verses-favourites";

function load(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as number[]);
  } catch {
    // ignore corrupt data
  }
  return new Set();
}

function save(ids: Set<number>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

const favourites = reactive(load());

export function useFavourites() {
  const isFavourite = (id: number) => favourites.has(id);

  const toggle = (id: number) => {
    if (favourites.has(id)) {
      favourites.delete(id);
    } else {
      favourites.add(id);
    }
    save(favourites);
  };

  const count = () => favourites.size;

  return { isFavourite, toggle, count };
}
