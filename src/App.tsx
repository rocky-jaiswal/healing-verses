import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { useTheme } from "./composables/useTheme";
import { useInstallPrompt } from "./composables/useInstallPrompt";
import { AppHeader } from "./components/AppHeader";
import { ErrorBanner } from "./components/ErrorBanner";

export default defineComponent({
  name: "App",
  setup() {
    const { theme } = useTheme();
    const { canShow, install, dismiss } = useInstallPrompt();

    return () => (
      <div
        class={theme.value === "dark" ? "dark min-h-screen" : "min-h-screen"}
        data-theme={theme.value}
      >
        <div class="max-w-lg mx-auto px-4 py-6">
          <AppHeader />

          {canShow() && (
            <div class="mt-4 rounded-xl border border-card-border bg-card-bg p-4 flex items-center gap-3 shadow-sm">
              <div class="flex-1">
                <p class="text-sm font-medium text-fg">Install on your phone</p>
                <p class="text-xs text-muted mt-0.5">
                  Add to home screen for the best experience
                </p>
              </div>
              <button
                class="px-3 py-1.5 text-xs font-medium rounded-lg bg-green text-card-bg hover:opacity-90 transition-opacity"
                onClick={install}
              >
                Install
              </button>
              <button
                class="p-1 text-muted hover:text-fg transition-colors"
                onClick={dismiss}
                aria-label="Dismiss"
              >
                <svg
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}

          <ErrorBanner />

          <main class="mt-6">
            <RouterView />
          </main>

          <footer class="mt-12 text-center text-xs text-muted">
            Healing Verses &middot; Meditate on God&rsquo;s Word
          </footer>
        </div>
      </div>
    );
  },
});
