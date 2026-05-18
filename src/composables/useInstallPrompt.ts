import { ref } from "vue";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null);
const dismissed = ref(!!localStorage.getItem("healing-verses-install-dismissed"));
const isInstalled = ref(
  window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as any).standalone === true
);

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt.value = e as BeforeInstallPromptEvent;
});

window.addEventListener("appinstalled", () => {
  isInstalled.value = true;
  deferredPrompt.value = null;
});

export function useInstallPrompt() {
  const canShow = () =>
    !isInstalled.value && !dismissed.value && deferredPrompt.value != null;

  const install = async () => {
    const prompt = deferredPrompt.value;
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") {
      isInstalled.value = true;
    }
    deferredPrompt.value = null;
  };

  const dismiss = () => {
    dismissed.value = true;
    localStorage.setItem("healing-verses-install-dismissed", "1");
  };

  return { canShow, install, dismiss, isInstalled };
}
