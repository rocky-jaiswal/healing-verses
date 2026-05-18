import { defineComponent, type PropType } from "vue";
import type { Verse } from "../types/verse";

export const VerseCard = defineComponent({
  name: "VerseCard",
  props: {
    verse: { type: Object as PropType<Verse>, required: true },
    counter: { type: String, required: true },
    hasPrev: Boolean,
    hasNext: Boolean,
  },
  emits: ["prev", "next"],
  setup(props, { emit }) {

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <span class="text-xs uppercase tracking-widest text-muted font-medium">
            {props.counter}
          </span>

          <button
            class="p-2 rounded-full hover:bg-bg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={!props.hasNext}
            onClick={() => emit("next")}
            aria-label="Next verse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
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


      </article>
    );
  },
});
