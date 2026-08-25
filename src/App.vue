<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import { getAnalyticsConsent, setAnalyticsConsent, type AnalyticsConsent } from "./analytics";

const consent = ref(getAnalyticsConsent());
const showConsentBanner = computed(() => consent.value === null);

function handleConsent(value: "granted" | "denied") {
  setAnalyticsConsent(value);
  consent.value = value;
}

function onConsentChanged(event: Event) {
  consent.value = (event as CustomEvent<AnalyticsConsent>).detail;
}

onMounted(() => {
  window.addEventListener("analytics-consent-changed", onConsentChanged);
});

onUnmounted(() => {
  window.removeEventListener("analytics-consent-changed", onConsentChanged);
});
</script>

<template>
  <router-view class="max-w-1440 overflow-auto"></router-view>
  <section
    v-if="showConsentBanner"
    class="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl border border-gray-200 bg-white p-5 shadow-lg sm:inset-x-auto sm:right-6"
    aria-labelledby="analytics-consent-title"
  >
    <h2 id="analytics-consent-title" class="text-lg font-semibold">Analityka strony</h2>
    <p class="mt-2 text-sm">
      Używamy PostHog, aby rozumieć ruch na stronie i ulepszać aplikację. Zgoda jest dobrowolna.
    </p>
    <div class="mt-4 flex flex-wrap gap-3">
      <button
        type="button"
        class="border border-gray-700 px-4 py-2 text-sm font-semibold"
        @click="handleConsent('denied')"
      >
        Odrzuć
      </button>
      <button
        type="button"
        class="bg-gold px-4 py-2 text-sm font-semibold text-gray_dark"
        @click="handleConsent('granted')"
      >
        Akceptuję
      </button>
    </div>
    <router-link to="/privacy" class="mt-3 inline-block text-sm underline">Polityka prywatności</router-link>
  </section>
</template>
