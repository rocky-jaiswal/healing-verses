import { defineComponent, onMounted, onUnmounted, Transition } from "vue";
import { useVerse } from "../composables/useVerse";
import { VerseCard } from "../components/VerseCard";

export default defineComponent({
  name: "Home",
  setup() {
    const { currentVerse, currentIndex, hasPrev, hasNext, counter, goToPrev, goToNext, direction } =
      useVerse();

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
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

    const transitionName = () => {
      if (direction.value < 0) return "slide-right";
      return "slide-left";
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
          />
        </Transition>
      </div>
    );
  },
});
