import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App";
import { router } from "./router";
import "./styles/index.css";

const pinia = createPinia();

pinia.use(({ store }) => {
  const key = `store:${store.$id}`;
  const fromLS = localStorage.getItem(key);
  if (fromLS) {
    store.$patch(JSON.parse(fromLS));
  }
  store.$subscribe((_mutation, state) => {
    localStorage.setItem(key, JSON.stringify(state));
  });
});

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
