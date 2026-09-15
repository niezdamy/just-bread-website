
<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import NavigationBar from "../components/NavigationBar.vue";
import { canonicalUrl } from "../seo";

const { t } = useI18n({ inheritLocale: true });

useHead({
  title: "FAQ | Just Bread",
  meta: [{ name: "description", content: "Odpowiedzi na najczęstsze pytania o aplikację Just Bread i domowe pieczenie chleba." }],
  link: [{ rel: "canonical", href: canonicalUrl("/faq") }],
});
</script>

<template>
  <main class="min-h-screen bg-whtite_gray text-gray_dark">
    <header class="bg-gold px-6 py-14 text-center text-gray_dark sm:py-20">
      <p class="text-sm font-semibold uppercase tracking-widest">Just Bread</p>
      <h1 class="mt-3 text-3xl font-semibold sm:text-4xl">{{ t("title") }}</h1>
    </header>
    <section class="mx-auto max-w-3xl px-6 py-12 sm:py-16" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="text-2xl font-semibold text-gray_dark">{{ t("heading") }}</h2>
      <div class="mt-8 divide-y divide-gray-300 border-y border-gray-300">
        <article v-for="item in ['app', 'languages', 'recipes', 'recipe_help', 'app_help']" :key="item" class="py-6">
          <h3 class="font-semibold text-gray_dark">{{ t(`${item}_question`) }}</h3>
          <p class="mt-2">{{ t(`${item}_answer`) }}<a v-if="item.endsWith('help')" class="ml-1 font-semibold text-gray_dark underline" href="mailto:justbreadapp@gmail.com">justbreadapp@gmail.com</a></p>
        </article>
      </div>
      <section class="mt-12 border-l-4 border-gold pl-5" aria-labelledby="contact-heading">
        <h2 id="contact-heading" class="text-xl font-semibold text-gray_dark">{{ t("contact_heading") }}</h2>
        <p class="mt-2">{{ t("contact_text") }}</p>
        <a class="mt-3 inline-block font-semibold text-gray_dark underline" href="mailto:justbreadapp@gmail.com">justbreadapp@gmail.com</a>
      </section>
    </section>
    <NavigationBar />
  </main>
</template>

<i18n lang="yaml">
en:
  title: Frequently asked questions
  heading: FAQ
  app_question: Where can I find the app?
  app_answer: The app is available in the Apple App Store and Google Play.
  languages_question: What languages are supported?
  languages_answer: Currently supported languages are Polish and English.
  recipes_question: Will there be more recipes in the future?
  recipes_answer: Yes, future releases will include more recipes.
  recipe_help_question: A recipe is unclear. Where can I find help?
  recipe_help_answer: Please email us at
  app_help_question: The app is not working. What should I do?
  app_help_answer: Please email us with the details at
  contact_heading: Need more help?
  contact_text: Feel free to contact us.
pl:
  title: Najczesciej zadawane pytania
  heading: FAQ
  app_question: Gdzie znajde aplikacje?
  app_answer: Aplikacja jest dostepna w Apple App Store i Google Play.
  languages_question: Jakie jezyki sa obslugiwane?
  languages_answer: Obecnie aplikacja obsluguje jezyk polski i angielski.
  recipes_question: Czy w przyszlosci pojawia sie kolejne przepisy?
  recipes_answer: Tak, w kolejnych wersjach pojawia sie nowe przepisy.
  recipe_help_question: Przepis jest niejasny. Gdzie moge znalezc pomoc?
  recipe_help_answer: Napisz do nas na adres
  app_help_question: Aplikacja nie dziala. Co powinienem zrobic?
  app_help_answer: Napisz do nas ze szczegolami na adres
  contact_heading: Potrzebujesz wiecej pomocy?
  contact_text: Skontaktuj sie z nami.
</i18n>