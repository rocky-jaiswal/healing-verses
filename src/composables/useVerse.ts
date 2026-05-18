import { ref, computed } from "vue";
import versesData from "../verses.json";
import type { VerseCollection } from "../types/verse";

const collection = versesData as VerseCollection;

const currentIndex = ref(0);
const direction = ref(0);

export function useVerse() {
  const total = collection.verses.length;
  const currentVerse = computed(() => collection.verses[currentIndex.value]);
  const hasPrev = computed(() => true);
  const hasNext = computed(() => true);
  const counter = computed(() => `${currentIndex.value + 1} / ${total}`);

  const goToPrev = () => {
    direction.value = -1;
    currentIndex.value = currentIndex.value === 0 ? total - 1 : currentIndex.value - 1;
  };

  const goToNext = () => {
    direction.value = 1;
    currentIndex.value = currentIndex.value === total - 1 ? 0 : currentIndex.value + 1;
  };

  const goToIndex = (idx: number) => {
    if (idx >= 0 && idx < total) {
      direction.value = idx > currentIndex.value ? 1 : -1;
      currentIndex.value = idx;
    }
  };

  const goToReference = (reference: string) => {
    const idx = collection.verses.findIndex((v) => v.reference === reference);
    if (idx !== -1) goToIndex(idx);
  };

  return {
    currentVerse,
    currentIndex,
    hasPrev,
    hasNext,
    counter,
    total,
    goToPrev,
    goToNext,
    goToIndex,
    goToReference,
    direction,
    collectionMeta: collection.meta,
  };
}
