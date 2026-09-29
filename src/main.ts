import { createI18n } from "vue-i18n";
import { ViteSSG } from "vite-ssg";

import "./style.css";
import App from "./App.vue";

import en from "./locales/en.json";
import pl from "./locales/pl.json";

import { capturePageView, initializeAnalytics } from "./analytics";
import { routes } from "./router";

const i18n = createI18n({
  legacy: false,
  locale: "pl",
  messages: {
    en,
    pl,
  },
});

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  ({ app, router }) => {
    app.use(i18n);

    if (!import.meta.env.SSR) {
      initializeAnalytics();
      router.afterEach((to) => {
        capturePageView(to.fullPath);
      });
    }
  },
);
