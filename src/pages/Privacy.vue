
<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import { getAnalyticsConsent, setAnalyticsConsent, type AnalyticsConsent } from "../analytics";
import NavigationBar from "../components/NavigationBar.vue";
import { canonicalUrl } from "../seo";

const { t } = useI18n({ inheritLocale: true });
const analyticsConsent = ref<AnalyticsConsent | null>(getAnalyticsConsent());

useHead({
  title: "Polityka prywatności | Just Bread",
  meta: [{ name: "description", content: "Polityka prywatności aplikacji i strony internetowej Just Bread." }],
  link: [{ rel: "canonical", href: canonicalUrl("/privacy") }],
});

function updateAnalyticsConsent(value: AnalyticsConsent) {
  setAnalyticsConsent(value);
  analyticsConsent.value = value;
}

function onConsentChanged(event: Event) {
  analyticsConsent.value = (event as CustomEvent<AnalyticsConsent>).detail;
}

onMounted(() => window.addEventListener("analytics-consent-changed", onConsentChanged));
onBeforeUnmount(() => window.removeEventListener("analytics-consent-changed", onConsentChanged));
</script>

<template>
  <main class="min-h-screen bg-whtite_gray text-gray_dark">
    <header class="bg-gold px-6 py-14 text-center text-gray_dark sm:py-20">
      <p class="text-sm font-semibold uppercase tracking-widest">Just Bread</p>
      <h1 class="mt-3 text-3xl font-semibold sm:text-4xl">{{ t("title") }}</h1>
    </header>
    <article class="mx-auto max-w-3xl space-y-9 px-6 py-12 sm:py-16">
      <p>{{ t("intro_1") }}</p>
      <p>{{ t("intro_2") }}</p>
      <p>{{ t("intro_3") }}</p>
      <p>{{ t("intro_4") }}</p>
      <section v-for="section in ['controller', 'scope', 'mobile_app', 'website', 'purpose', 'legal_basis', 'analytics', 'cookies', 'providers', 'retention', 'deletion', 'rights', 'security', 'links', 'changes']" :key="section">
        <h2 class="text-xl font-semibold text-gray_dark">{{ t(`${section}_title`) }}</h2>
        <p class="mt-3">{{ t(`${section}_text`) }}</p>
        <ul v-if="section === 'providers'" class="mt-3 list-disc space-y-1 pl-6">
          <li>{{ t("provider_1") }}</li><li>{{ t("provider_2") }}</li><li>{{ t("provider_3") }}</li><li>{{ t("provider_4") }}</li>
        </ul>
        <p v-if="section === 'providers'" class="mt-3">{{ t("providers_more") }}</p>
        <p v-if="section === 'changes'" class="mt-3 font-semibold">{{ t("effective") }}</p>
      </section>
      <section>
        <h2 class="text-xl font-semibold text-gray_dark">{{ t("contact_title") }}</h2>
        <p class="mt-3">{{ t("contact_text") }} <a class="font-semibold underline" href="mailto:justbreadapp@gmail.com">justbreadapp@gmail.com</a>.</p>
      </section>
      <section class="border-t border-gray-300 pt-8" aria-labelledby="analytics-heading">
        <h2 id="analytics-heading" class="text-xl font-semibold text-gray_dark">{{ t("analytics_title") }}</h2>
        <p class="mt-3">{{ t("analytics_description") }}</p>
        <div class="mt-4 flex flex-wrap gap-3">
          <button type="button" class="border border-gray-700 px-4 py-2 text-sm font-semibold" @click="updateAnalyticsConsent('denied')">{{ t("analytics_disable") }}</button>
          <button type="button" class="bg-gold px-4 py-2 text-sm font-semibold text-gray_dark" @click="updateAnalyticsConsent('granted')">{{ t("analytics_enable") }}</button>
        </div>
        <p v-if="analyticsConsent" class="mt-3 text-sm">{{ analyticsConsent === "granted" ? t("analytics_status_enabled") : t("analytics_status_disabled") }}</p>
      </section>
    </article>
    <NavigationBar />
  </main>
</template>

<i18n lang="yaml">
en:
  title: Privacy Policy
  intro_1: This Privacy Policy describes how personal data is processed when you use the Just Bread mobile application and this website.
  intro_2: We respect your privacy. Analytics are optional and are activated only after you give your consent.
  intro_3: We do not sell personal data or use it for advertising or profiling.
  intro_4: This policy is the privacy policy for the Just Bread mobile application and is also available on this website.
  controller_title: Data Controller
  controller_text: The controller of your personal data is Oskar Poprawski. For privacy-related matters, use the contact details below.
  scope_title: Scope
  scope_text: This policy covers the Just Bread mobile application distributed through Apple App Store and Google Play, and the Just Bread website. It does not cover third-party websites or services linked from the app or website.
  mobile_app_title: Mobile Application
  mobile_app_text: Just Bread does not require or provide user accounts. The app does not collect names, email addresses, contacts, precise location, payment information, photographs, data from the camera or microphone, or health data. If you consent to analytics in the app, PostHog may process technical device and usage data, such as app screens viewed, interactions, app version, device and operating-system information, approximate location inferred from your IP address, and timestamps.
  website_title: Website
  website_text: The website stores your analytics preference in local storage. If you consent to analytics, PostHog and Google Analytics may process technical and usage data, including pages viewed, page URL, app-store link clicks, browser and device information, approximate location inferred from IP address, and timestamps.
  purpose_title: Purposes of Processing
  purpose_text: We use analytics to understand how visitors use the website, measure visits and app-store link clicks, diagnose technical issues, and improve the website and application.
  legal_basis_title: Legal Basis
  legal_basis_text: The legal basis for optional analytics is your consent under Article 6(1)(a) GDPR. You may withdraw consent at any time using the controls below. Withdrawal does not affect the lawfulness of processing before it was withdrawn.
  analytics_title: Website Analytics and Consent
  analytics_text: PostHog and Google Analytics are activated on the website only after consent. Without consent, analytics is not initialized in the app or on the website. When consent is withdrawn, the app or website opts out of further analytics collection. App functionality is not conditional on granting analytics consent.
  cookies_title: Cookies
  cookies_text: We use local storage to remember your analytics choice. When enabled, PostHog and Google Analytics may use cookies or similar technologies to provide analytics. You can change your choice at any time below or clear your browser storage.
  providers_title: Service Providers
  providers_text: "We use the following service providers:"
  provider_1: PostHog, Inc. - website analytics.
  provider_2: Google LLC - Google Analytics website analytics.
  provider_3: PostHog data is sent to its EU service endpoint.
  provider_4: The providers process data to deliver analytics, subject to their applicable data-processing terms.
  providers_more: We do not share analytics data with other parties for their own marketing purposes.
  retention_title: Data Retention
  retention_text: We retain analytics data only for as long as necessary for the stated purposes or as required by law. Your consent preference remains on your device or in your browser until you change it, uninstall the app, or clear the relevant app or browser storage.
  deletion_title: Deletion of Data
  deletion_text: Just Bread does not provide user accounts, so account deletion is not applicable. To request deletion of analytics data associated with you, contact us using the email address below. We may ask for information needed to locate the relevant data and will process the request in accordance with applicable law.
  rights_title: Your Rights
  rights_text: Subject to applicable law, you may request access to, rectification or erasure of your data, restriction of processing, data portability, or object to processing. You may also lodge a complaint with the relevant data protection authority.
  security_title: Security
  security_text: We use reasonable technical and organizational measures to protect personal data. No method of transmission or storage is completely secure, so absolute security cannot be guaranteed.
  links_title: Links to Other Sites
  links_text: The service may contain links to third-party sites. We strongly advise reviewing their privacy policies. We have no control over and assume no responsibility for the content, privacy policies, or practices of third-party sites or services.
  changes_title: Changes to This Privacy Policy
  changes_text: We may update this policy when our processing practices or legal requirements change. The current version will always be published on this page.
  effective: Last updated 2026-09-08.
  contact_title: Contact Us
  contact_text: For questions or suggestions about this Privacy Policy, contact us at
  analytics_description: This control applies to analytics on this website. In the mobile app, you can change the equivalent setting in the app. With consent, PostHog and Google Analytics measure page views and clicks on app-store links.
  analytics_disable: Disable analytics
  analytics_enable: Enable analytics
  analytics_status_enabled: Analytics is enabled.
  analytics_status_disabled: Analytics is disabled.
pl:
  title: Polityka prywatności
  intro_1: Ta polityka opisuje, w jaki sposób przetwarzamy dane osobowe podczas korzystania z aplikacji mobilnej i strony internetowej Just Bread.
  intro_2: Szanujemy Twoją prywatność. Analityka jest opcjonalna i uruchamia się wyłącznie po wyrażeniu zgody.
  intro_3: Nie sprzedajemy danych osobowych ani nie wykorzystujemy ich do celów reklamowych lub profilowania.
  intro_4: Niniejsza polityka dotyczy aplikacji mobilnej Just Bread i jest również dostępna na tej stronie.
  controller_title: Administrator danych
  controller_text: Administratorem Twoich danych osobowych jest Oskar Poprawski. W sprawach dotyczących prywatności skontaktuj się z nami, korzystając z danych podanych poniżej.
  scope_title: Zakres
  scope_text: Polityka obejmuje aplikację mobilną Just Bread dystrybuowaną w sklepach Apple App Store i Google Play oraz stronę internetową Just Bread. Nie obejmuje stron ani usług podmiotów trzecich, do których prowadzą linki z aplikacji lub strony.
  mobile_app_title: Aplikacja mobilna
  mobile_app_text: Just Bread nie wymaga założenia konta i nie oferuje kont użytkowników. Aplikacja nie zbiera imion i nazwisk, adresów e-mail, kontaktów, precyzyjnej lokalizacji, danych płatniczych, zdjęć, danych z aparatu ani mikrofonu czy danych o stanie zdrowia. Jeśli wyrazisz zgodę na analitykę w aplikacji, PostHog może przetwarzać dane techniczne urządzenia i informacje o korzystaniu z aplikacji, takie jak wyświetlane ekrany, interakcje, wersja aplikacji, informacje o urządzeniu i systemie operacyjnym, przybliżona lokalizacja ustalana na podstawie adresu IP oraz znaczniki czasu.
  website_title: Strona internetowa
  website_text: Strona zapisuje Twój wybór dotyczący analityki w pamięci lokalnej przeglądarki. Po wyrażeniu zgody PostHog i Google Analytics mogą przetwarzać dane techniczne i informacje o korzystaniu ze strony, w tym odwiedzane podstrony, adresy URL, kliknięcia w linki do sklepów z aplikacjami, informacje o przeglądarce i urządzeniu, przybliżoną lokalizację ustalaną na podstawie adresu IP oraz znaczniki czasu.
  purpose_title: Cele przetwarzania
  purpose_text: Wykorzystujemy dane analityczne, aby lepiej rozumieć, jak użytkownicy korzystają ze strony, mierzyć liczbę odwiedzin i kliknięć w linki do sklepów, diagnozować problemy techniczne oraz ulepszać stronę i aplikację.
  legal_basis_title: Podstawa prawna
  legal_basis_text: Podstawą prawną opcjonalnej analityki jest Twoja zgoda zgodnie z art. 6 ust. 1 lit. a RODO. Możesz ją wycofać w dowolnym momencie za pomocą poniższych przycisków. Wycofanie zgody nie wpływa na zgodność z prawem przetwarzania, którego dokonano przed jej wycofaniem.
  analytics_title: Analityka strony i zgoda
  analytics_text: PostHog i Google Analytics uruchamiają się na stronie dopiero po wyrażeniu zgody. Bez zgody analityka nie jest uruchamiana ani w aplikacji, ani na stronie. Po wycofaniu zgody aplikacja lub strona przestaje gromadzić kolejne dane analityczne. Działanie aplikacji nie zależy od wyrażenia zgody na analitykę.
  cookies_title: Pliki cookie
  cookies_text: Korzystamy z pamięci lokalnej przeglądarki, aby zapamiętać Twój wybór dotyczący analityki. Po wyrażeniu zgody PostHog i Google Analytics mogą używać plików cookie lub podobnych technologii do celów analitycznych. Możesz zmienić swój wybór poniżej lub wyczyścić dane przeglądarki.
  providers_title: Zewnętrzni dostawcy usług
  providers_text: "Korzystamy z usług następujących dostawców:"
  provider_1: PostHog, Inc. – analityka strony internetowej.
  provider_2: Google LLC – usługa Google Analytics do analityki strony internetowej.
  provider_3: Dane PostHog są przesyłane do europejskiego punktu dostępowego tej usługi.
  provider_4: Dostawcy przetwarzają dane w celu świadczenia usług analitycznych, zgodnie z obowiązującymi ich warunkami przetwarzania danych.
  providers_more: Nie udostępniamy danych analitycznych innym podmiotom na potrzeby ich własnych działań marketingowych.
  retention_title: Okres przechowywania danych
  retention_text: Przechowujemy dane analityczne tylko tak długo, jak jest to konieczne do realizacji wskazanych celów lub wymagane przez prawo. Informacja o Twojej zgodzie pozostaje na urządzeniu lub w przeglądarce do czasu zmiany wyboru, odinstalowania aplikacji albo wyczyszczenia odpowiednich danych aplikacji lub przeglądarki.
  deletion_title: Usuwanie danych
  deletion_text: Just Bread nie oferuje kont użytkowników, dlatego usuwanie konta nie ma zastosowania. Aby zażądać usunięcia dotyczących Ciebie danych analitycznych, skontaktuj się z nami pod adresem e-mail podanym poniżej. Możemy poprosić o informacje potrzebne do odnalezienia tych danych. Zrealizujemy żądanie zgodnie z obowiązującymi przepisami.
  rights_title: Twoje prawa
  rights_text: Z zastrzeżeniem obowiązujących przepisów możesz zażądać dostępu do swoich danych, ich sprostowania lub usunięcia, ograniczenia przetwarzania albo przeniesienia. Możesz również wnieść sprzeciw wobec przetwarzania i złożyć skargę do właściwego organu ochrony danych osobowych.
  security_title: Bezpieczeństwo
  security_text: Stosujemy odpowiednie środki techniczne i organizacyjne, aby chronić dane osobowe. Żadna metoda przesyłania ani przechowywania danych nie jest jednak w pełni bezpieczna, dlatego nie możemy zagwarantować całkowitego bezpieczeństwa.
  links_title: Linki do innych stron
  links_text: Usługa może zawierać linki do stron podmiotów trzecich. Zalecamy zapoznanie się z ich politykami prywatności. Nie mamy kontroli nad treściami tych stron, ich politykami prywatności ani stosowanymi przez nie praktykami, dlatego nie ponosimy za nie odpowiedzialności.
  changes_title: Zmiany w polityce prywatności
  changes_text: Możemy aktualizować tę politykę w przypadku zmian w sposobie przetwarzania danych lub w przepisach prawa. Aktualna wersja będzie zawsze dostępna na tej stronie.
  effective: Ostatnia aktualizacja: 8 września 2026 r.
  contact_title: Kontakt
  contact_text: Jeśli masz pytania lub sugestie dotyczące polityki prywatności, napisz do nas na adres
  analytics_description: To ustawienie dotyczy analityki na tej stronie. Analogiczne ustawienie możesz zmienić w aplikacji mobilnej. Za Twoją zgodą PostHog i Google Analytics mierzą liczbę odsłon podstron oraz kliknięć w linki do sklepów z aplikacjami.
  analytics_disable: Wyłącz analitykę
  analytics_enable: Włącz analitykę
  analytics_status_enabled: Analityka jest włączona.
  analytics_status_disabled: Analityka jest wyłączona.
</i18n>