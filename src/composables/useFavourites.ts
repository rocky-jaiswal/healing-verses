import { reactive, computed } from "vue";
import versesData from "../verses.json";
import type { VerseCollection } from "../types/verse";

const collection = versesData as VerseCollection;
const STORAGE_KEY = "healing-verses-favourites";

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {
    // ignore corrupt data
  }
  return new Set();
}

function persist(refs: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...refs]));
}

const favourites = reactive(load());

export function useFavourites() {
  const isFavourite = (reference: string) => favourites.has(reference);

  const toggle = (reference: string) => {
    if (favourites.has(reference)) {
      favourites.delete(reference);
    } else {
      favourites.add(reference);
    }
    persist(favourites);
  };

  const favouriteVerses = computed(() =>
    collection.verses.filter((v) => favourites.has(v.reference))
  );

  return { isFavourite, toggle, favouriteVerses };
}
