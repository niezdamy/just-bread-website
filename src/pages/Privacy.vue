
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

import { getAnalyticsConsent, setAnalyticsConsent, type AnalyticsConsent } from "../analytics";
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  inheritLocale: true
})

const analyticsConsent = ref<AnalyticsConsent | null>(getAnalyticsConsent());

function updateAnalyticsConsent(value: AnalyticsConsent) {
  setAnalyticsConsent(value);
  analyticsConsent.value = value;
}

const onConsentChanged = (event: Event) => {
  analyticsConsent.value = (event as CustomEvent<AnalyticsConsent>).detail;
};

onMounted(() => window.addEventListener("analytics-consent-changed", onConsentChanged));
onBeforeUnmount(() => window.removeEventListener("analytics-consent-changed", onConsentChanged));
</script>

<template>
  <h1>Privacy policy page 🥖</h1>
  <h2>Translated: {{ t('title') }} </h2>
  <section class="m-8 max-w-2xl">
    <p class="mt-3">
      {{ t('analytics_description') }}
    </p>
    <div class="mt-4 flex flex-wrap gap-3">
      <button
        type="button"
        class="border border-gray-700 px-4 py-2 text-sm font-semibold"
        @click="updateAnalyticsConsent('denied')"
      >
        {{ t('analytics_disable') }}
      </button>
      <button
        type="button"
        class="bg-gold px-4 py-2 text-sm font-semibold text-gray_dark"
        @click="updateAnalyticsConsent('granted')"
      >
        {{ t('analytics_enable') }}
      </button>
    </div>
    <p v-if="analyticsConsent" class="mt-3 text-sm">
      {{ analyticsConsent === 'granted' ? t('analytics_status_enabled') : t('analytics_status_disabled') }}
    </p>
  </section>

</template>

<style scoped>

</style>

<i18n lang="yaml">
    en:
      title: Privacy policy page
      analytics_description: With your consent, we use PostHog to measure page views and clicks on app store links. Data is used solely for traffic analysis and site improvement.
      analytics_disable: Disable analytics
      analytics_enable: Enable analytics
      analytics_status_enabled: Analytics is enabled.
      analytics_status_disabled: Analytics is disabled.
    pl:
      title: Polityka prywatności
      analytics_description: Za Twoją zgodą używamy PostHog do pomiaru odsłon podstron i kliknięć w odnośniki do sklepów z aplikacjami. Dane służą wyłącznie do analizy ruchu i ulepszania strony.
      analytics_disable: Wyłącz analitykę
      analytics_enable: Włącz analitykę
      analytics_status_enabled: Analityka jest włączona.
      analytics_status_disabled: Analityka jest wyłączona.
</i18n>