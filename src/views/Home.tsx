import { defineComponent, ref, onMounted, onUnmounted, Transition } from "vue";
import { useVerse } from "../composables/useVerse";
import { useFavourites } from "../composables/useFavourites";
import { VerseCard } from "../components/VerseCard";

export default defineComponent({
  name: "Home",
  setup() {
    const { currentVerse, currentIndex, hasPrev, hasNext, counter, goToPrev, goToNext, goToReference, direction } =
      useVerse();
    const { favouriteVerses } = useFavourites();

    const showFavourites = ref(false);

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "Escape") {
        showFavourites.value = false;
      }
    };

    onMounted(() => window.addEventListener("keydown", onKeydown));
    onUnmounted(() => window.removeEventListener("keydown", onKeydown));

    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) goToNext();
        else goToPrev();
      }
    };

    const transitionName = () => (direction.value < 0 ? "slide-right" : "slide-left");

    const jumpToFavourite = (reference: string) => {
      goToReference(reference);
      showFavourites.value = false;
    };

    return () => (
      <div onTouchstart={onTouchStart} onTouchend={onTouchEnd}>
        <Transition name={transitionName()} mode="out-in">
          <VerseCard
            key={currentIndex.value}
            verse={currentVerse.value}
            counter={counter.value}
            hasPrev={hasPrev.value}
            hasNext={hasNext.value}
            onPrev={goToPrev}
            onNext={goToNext}
            onOpenFavourites={() => (showFavourites.value = true)}
          />
        </Transition>

        {/* Favourites panel */}
        {showFavourites.value && (
          <div class="fixed inset-0 z-50 bg-bg overflow-y-auto">
            <div class="max-w-lg mx-auto px-4 py-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="font-display text-2xl font-semibold text-taupe">Saved Verses</h2>
                <button
                  class="p-2 rounded-full hover:bg-card-bg transition-colors"
                  onClick={() => (showFavourites.value = false)}
                  aria-label="Close"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {favouriteVerses.value.length === 0 ? (
                <p class="text-center text-muted mt-16">No saved verses yet.</p>
              ) : (
                <div class="space-y-3">
                  {favouriteVerses.value.map((verse) => (
                    <button
                      key={verse.reference}
                      class="w-full text-left rounded-xl border border-card-border bg-card-bg p-4 hover:opacity-80 transition-opacity"
                      onClick={() => jumpToFavourite(verse.reference)}
                    >
                      <p class="font-display font-semibold text-taupe text-sm">{verse.reference}</p>
                      <p class="text-sm text-muted mt-1 line-clamp-2">{verse.text}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
});
