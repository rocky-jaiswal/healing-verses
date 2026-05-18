import { defineComponent, ref, watch, nextTick, type PropType } from "vue";
import type { Verse } from "../types/verse";
import { useFavourites } from "../composables/useFavourites";
import { useVerse } from "../composables/useVerse";

export const VerseCard = defineComponent({
  name: "VerseCard",
  props: {
    verse: { type: Object as PropType<Verse>, required: true },
    counter: { type: String, required: true },
    hasPrev: Boolean,
    hasNext: Boolean,
  },
  emits: ["prev", "next", "openFavourites"],
  setup(props, { emit }) {
    const { isFavourite, toggle, favouriteVerses } = useFavourites();
    const { goToIndex, total, currentIndex } = useVerse();

    const isEditing = ref(false);
    const inputValue = ref("");
    const jumpInputRef = ref<HTMLInputElement | null>(null);

    watch(isEditing, (val) => {
      if (val) nextTick(() => jumpInputRef.value?.focus());
    });

    const startEditing = () => {
      inputValue.value = String(currentIndex.value + 1);
      isEditing.value = true;
    };

    const commitJump = () => {
      const n = parseInt(inputValue.value);
      if (!isNaN(n) && n >= 1 && n <= total) goToIndex(n - 1);
      isEditing.value = false;
    };

    return () => (
      <article class="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm space-y-6">
        {/* Navigation */}
        <div class="flex items-center justify-between">
          <button
            class="p-2 rounded-full hover:bg-bg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={!props.hasPrev}
            onClick={() => emit("prev")}
            aria-label="Previous verse"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {isEditing.value ? (
            <input
              ref={jumpInputRef}
              class="w-16 text-center text-xs uppercase tracking-widest text-muted font-medium bg-transparent border-b border-muted outline-none"
              type="number"
              min="1"
              max={total}
              value={inputValue.value}
              onInput={(e) => (inputValue.value = (e.target as HTMLInputElement).value)}
              onKeydown={(e: KeyboardEvent) => {
                if (e.key === "Enter") commitJump();
                if (e.key === "Escape") isEditing.value = false;
              }}
              onBlur={commitJump}
            />
          ) : (
            <button
              class="text-xs uppercase tracking-widest text-muted font-medium hover:text-fg transition-colors"
              onClick={startEditing}
              title="Tap to jump to a verse"
            >
              {props.counter}
            </button>
          )}

          <button
            class="p-2 rounded-full hover:bg-bg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={!props.hasNext}
            onClick={() => emit("next")}
            aria-label="Next verse"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Reference */}
        <h2 class="font-display text-xl text-center text-taupe font-semibold">
          {props.verse.reference}
        </h2>

        <hr class="border-card-border" />

        {/* Verse text */}
        <blockquote class="font-scripture text-xl text-center leading-relaxed text-fg px-2">
          &ldquo;{props.verse.text}&rdquo;
        </blockquote>

        <hr class="border-card-border" />

        {/* Save / Favourites */}
        <div class="flex items-center justify-between">
          <button
            class="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            onClick={() => toggle(props.verse.reference)}
            aria-label={isFavourite(props.verse.reference) ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavourite(props.verse.reference) ? (
              <svg class="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg class="w-5 h-5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            )}
            <span class="text-sm text-muted">
              {isFavourite(props.verse.reference) ? "In favorites" : "Add to favorites"}
            </span>
          </button>

          {favouriteVerses.value.length > 0 && (
            <button
              class="text-sm text-muted hover:text-fg transition-colors"
              onClick={() => emit("openFavourites")}
            >
              Favorites ({favouriteVerses.value.length}) →
            </button>
          )}
        </div>
      </article>
    );
  },
});
