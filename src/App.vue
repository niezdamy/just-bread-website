<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import { getAnalyticsConsent, setAnalyticsConsent, type AnalyticsConsent } from "./analytics";

const { t } = useI18n();

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
    <h2 id="analytics-consent-title" class="text-lg font-semibold">{{ t('consent_title') }}</h2>
    <p class="mt-2 text-sm">
      {{ t('consent_description') }}
    </p>
    <div class="mt-4 flex flex-wrap gap-3">
      <button
        type="button"
        class="border border-gray-700 px-4 py-2 text-sm font-semibold"
        @click="handleConsent('denied')"
      >
        {{ t('consent_deny') }}
      </button>
      <button
        type="button"
        class="bg-gold px-4 py-2 text-sm font-semibold text-gray_dark"
        @click="handleConsent('granted')"
      >
        {{ t('consent_accept') }}
      </button>
    </div>
    <router-link to="/privacy" class="mt-3 inline-block text-sm underline">{{ t('consent_privacy_link') }}</router-link>
  </section>
</template>

<i18n lang="yaml">
  en:
    consent_title: Site Analytics
    consent_description: We use PostHog to understand site traffic and improve the app. Consent is voluntary.
    consent_deny: Decline
    consent_accept: Accept
    consent_privacy_link: Privacy Policy
  pl:
    consent_title: Analityka strony
    consent_description: Używamy PostHog, aby rozumieć ruch na stronie i ulepszać aplikację. Zgoda jest dobrowolna.
    consent_deny: Odrzuć
    consent_accept: Akceptuję
    consent_privacy_link: Polityka prywatności
</i18n>
