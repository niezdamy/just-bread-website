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
    class="consent-card"
    role="region"
    aria-labelledby="analytics-consent-title"
    aria-describedby="analytics-consent-description"
  >
    <div class="consent-heading">
      <span class="consent-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 3.5 19 6v5.3c0 4.5-2.9 7.7-7 9.2-4.1-1.5-7-4.7-7-9.2V6l7-2.5Z" stroke="currentColor" stroke-width="1.5" />
          <path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <div>
        <p class="consent-eyebrow">{{ t('consent_eyebrow') }}</p>
        <h2 id="analytics-consent-title">{{ t('consent_title') }}</h2>
      </div>
    </div>
    <p id="analytics-consent-description" class="consent-description">
      {{ t('consent_description') }}
    </p>
    <div class="consent-actions">
      <button
        type="button"
        class="consent-button consent-decline"
        @click="handleConsent('denied')"
      >
        {{ t('consent_deny') }}
      </button>
      <button
        type="button"
        class="consent-button consent-accept"
        @click="handleConsent('granted')"
      >
        {{ t('consent_accept') }}
      </button>
    </div>
    <router-link to="/privacy" class="consent-privacy">{{ t('consent_privacy_link') }}<span aria-hidden="true">↗</span></router-link>
  </section>
</template>

<style scoped>
.consent-card {
  position: fixed;
  z-index: 50;
  right: max(1.25rem, env(safe-area-inset-right));
  bottom: max(1.25rem, env(safe-area-inset-bottom));
  width: min(25rem, calc(100vw - 2.5rem));
  padding: 1.25rem;
  border: 1px solid #eadfc8;
  border-top: 4px solid #ffb300;
  background: #fffdf8;
  color: #2b2118;
  box-shadow: 0 18px 55px rgb(43 33 24 / 20%);
  animation: consent-arrive 380ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.consent-heading {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.consent-icon {
  display: grid;
  width: 2.65rem;
  height: 2.65rem;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #ffb300;
  color: #2b2118;
  place-items: center;
}

.consent-icon svg {
  width: 1.35rem;
  height: 1.35rem;
}

.consent-eyebrow {
  margin: 0;
  color: #80571f;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  line-height: 1.3;
  text-transform: uppercase;
}

.consent-heading h2 {
  margin: 0.2rem 0 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.45rem;
  font-weight: 400;
  letter-spacing: -0.035em;
  line-height: 1.2;
}

.consent-description {
  margin: 0.9rem 0 0;
  color: #62574d;
  font-size: 0.83rem;
  line-height: 1.6;
}

.consent-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  margin-top: 1rem;
}

.consent-button {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 0.8rem;
  border: 1px solid #2b2118;
  border-radius: 0;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease, transform 160ms ease;
}

.consent-decline {
  background: transparent;
  color: #2b2118;
}

.consent-accept {
  background: transparent;
  color: #2b2118;
}

.consent-button:hover {
  transform: translateY(-1px);
}

.consent-decline:hover {
  background: #ffb300;
}

.consent-accept:hover {
  background: #ffb300;
}

.consent-button:focus-visible,
.consent-privacy:focus-visible {
  outline: 2px solid #80571f;
  outline-offset: 3px;
}

.consent-privacy {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.85rem;
  color: #2b2118;
  font-size: 0.77rem;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: #d9a93a;
  text-underline-offset: 3px;
}

@keyframes consent-arrive {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 420px) {
  .consent-card {
    right: max(0.75rem, env(safe-area-inset-right));
    bottom: max(0.75rem, env(safe-area-inset-bottom));
    width: calc(100vw - 1.5rem);
    padding: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .consent-card,
  .consent-button {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>

<i18n lang="yaml">
  en:
    consent_eyebrow: Your privacy
    consent_title: Your choice, your data
    consent_description: Your consent lets us use PostHog and Google Analytics to understand site visits. You can decline and still use the website.
    consent_deny: Decline analytics
    consent_accept: Allow analytics
    consent_privacy_link: Privacy Policy
  pl:
    consent_eyebrow: Twoja prywatność
    consent_title: Ty decydujesz o danych
    consent_description: Zgoda pozwala nam używać PostHog i Google Analytics do analizy ruchu. Możesz odmówić i nadal korzystać ze strony.
    consent_deny: Odrzuć analitykę
    consent_accept: Zezwól na analitykę
    consent_privacy_link: Polityka prywatności
</i18n>
