<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";

import NavigationBar from "../components/NavigationBar.vue";
import { canonicalUrl } from "../seo";

const { t } = useI18n({ inheritLocale: true });

useHead(() => ({
  title: `${t("meta_title")} | Just Bread`,
  meta: [{ name: "description", content: t("meta_description") }],
  link: [{ rel: "canonical", href: canonicalUrl("/contact") }],
}));
</script>

<template>
  <main class="min-h-screen bg-whtite_gray text-[#2b2118]">
    <header class="relative isolate overflow-hidden bg-[#2b2118] px-6 py-16 text-white sm:py-24">
      <div aria-hidden="true" class="absolute -right-20 -top-32 -z-10 h-80 w-80 rounded-full border-[48px] border-gold/15 sm:right-[10%] sm:top-[-12rem] sm:h-[30rem] sm:w-[30rem] sm:border-[72px]" />
      <div class="mx-auto max-w-6xl">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{{ t("eyebrow") }}</p>
        <h1 class="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">{{ t("title") }}</h1>
        <p class="mt-5 max-w-2xl text-lg text-white/80 sm:text-xl">{{ t("lead") }}</p>
      </div>
    </header>

    <section class="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16" aria-labelledby="contact-options-heading">
      <div class="max-w-2xl">
        <p class="text-sm font-semibold uppercase tracking-[0.16em] text-[#9b6a27]">{{ t("section_eyebrow") }}</p>
        <h2 id="contact-options-heading" class="mt-2 text-3xl font-semibold sm:text-4xl">{{ t("section_title") }}</h2>
        <p class="mt-4 text-[#62574d]">{{ t("section_text") }}</p>
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-3">
        <a
          v-for="topic in ['app', 'recipes', 'feedback']"
          :key="topic"
          :href="`mailto:justbreadapp@gmail.com?subject=${encodeURIComponent(t(`${topic}_subject`))}`"
          class="group rounded-3xl border border-[#eee7dd] bg-white p-6 shadow-[0_8px_28px_rgba(50,35,20,0.05)] transition duration-200 hover:-translate-y-1 hover:border-[#e2c58f] hover:shadow-[0_16px_36px_rgba(50,35,20,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b6a27]"
        >
          <span aria-hidden="true" class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff4d8] text-xl text-[#80571f]">
            {{ topic === "app" ? "✳" : topic === "recipes" ? "◌" : "♡" }}
          </span>
          <h3 class="mt-5 text-xl font-semibold">{{ t(`${topic}_title`) }}</h3>
          <p class="mt-2 min-h-12 text-[#62574d]">{{ t(`${topic}_text`) }}</p>
          <span class="mt-5 inline-flex items-center gap-2 font-semibold text-[#80571f] group-hover:underline">
            {{ t("email_action") }}
            <span aria-hidden="true">→</span>
          </span>
        </a>
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <section class="rounded-3xl bg-[#fff2d1] p-6 sm:p-8" aria-labelledby="email-heading">
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-[#80571f]">{{ t("email_eyebrow") }}</p>
          <h2 id="email-heading" class="mt-2 text-2xl font-semibold">{{ t("email_title") }}</h2>
          <p class="mt-2 text-[#62574d]">{{ t("email_text") }}</p>
          <a
            class="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-[#2b2118] px-6 py-3 font-semibold text-white transition hover:bg-[#493727] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80571f]"
            href="mailto:justbreadapp@gmail.com"
          >{{ t("email_button") }}</a>
        </section>

        <section class="rounded-3xl border border-[#eee7dd] bg-white p-6 sm:p-8" aria-labelledby="other-ways-heading">
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-[#9b6a27]">{{ t("other_ways_eyebrow") }}</p>
          <h2 id="other-ways-heading" class="mt-2 text-2xl font-semibold">{{ t("other_ways_title") }}</h2>
          <p class="mt-2 text-[#62574d]">{{ t("other_ways_text") }}</p>
          <div class="mt-5 flex flex-wrap gap-x-5 gap-y-3">
            <RouterLink class="font-semibold text-[#80571f] underline decoration-[#d7b77d] underline-offset-4 hover:text-[#5d3d15]" to="/faq">
              {{ t("faq_link") }}
            </RouterLink>
            <a
              class="font-semibold text-[#80571f] underline decoration-[#d7b77d] underline-offset-4 hover:text-[#5d3d15]"
              href="https://www.instagram.com/justbreadapp/"
              target="_blank"
              rel="noopener noreferrer"
            >{{ t("instagram_link") }}</a>
          </div>
        </section>
      </div>
    </section>

    <NavigationBar />
  </main>
</template>

<i18n lang="yaml">
en:
  meta_title: Contact
  meta_description: Get in touch with the Just Bread team about the app, recipes, or your baking ideas.
  eyebrow: A little note goes a long way
  title: Let's talk bread.
  lead: A question, a recipe idea, or something not quite working? Pick a topic and drop us a line.
  section_eyebrow: Get in touch
  section_title: What can we help with?
  section_text: Choose a topic to start an email with a subject already filled in. It makes it easier for us to get your message to the right place.
  app_title: App support
  app_text: Something not working as expected? Tell us what happened and which device you use.
  app_subject: Just Bread app support
  recipes_title: Recipes & baking
  recipes_text: Ask about a recipe, share a baking question, or tell us how it turned out.
  recipes_subject: A question about recipes and baking
  feedback_title: Ideas & feedback
  feedback_text: Have an idea for the app or website? We would love to hear it.
  feedback_subject: Just Bread feedback
  email_action: Write to us
  email_eyebrow: Prefer a direct email?
  email_title: Your inbox, your choice.
  email_text: You can also reach us directly at this address. No form, no fuss.
  email_button: Email Just Bread
  other_ways_eyebrow: Before you write
  other_ways_title: Maybe we have answered already?
  other_ways_text: Find quick answers in the FAQ or follow along on Instagram.
  faq_link: Browse the FAQ
  instagram_link: Find us on Instagram
pl:
  meta_title: Kontakt
  meta_description: Skontaktuj się z zespołem Just Bread w sprawie aplikacji, przepisów lub domowego pieczenia.
  eyebrow: Miło, że tu jesteś
  title: Porozmawiajmy o pieczeniu.
  lead: Masz pytanie, pomysł na przepis albo coś nie działa tak, jak powinno? Wybierz temat i napisz do nas.
  section_eyebrow: Jesteśmy do Twojej dyspozycji
  section_title: W czym możemy pomóc?
  section_text: Wybierz temat, a otworzymy wiadomość z uzupełnionym tytułem. Dzięki temu łatwiej nam będzie zająć się Twoją sprawą.
  app_title: Pomoc z aplikacją
  app_text: Coś nie działa? Napisz, co się stało i z jakiego urządzenia korzystasz.
  app_subject: Pomoc z aplikacją Just Bread
  recipes_title: Przepisy i pieczenie
  recipes_text: Zapytaj o przepis, podziel się wątpliwością lub opowiedz, jak wyszedł wypiek.
  recipes_subject: Pytanie o przepisy i pieczenie
  feedback_title: Pomysły i opinie
  feedback_text: Masz pomysł na rozwój aplikacji lub strony? Chętnie go poznamy.
  feedback_subject: Opinia o Just Bread
  email_action: Napisz do nas
  email_eyebrow: Wolisz zwykłego e-maila?
  email_title: Bez formularza, bez komplikacji.
  email_text: Możesz też napisać bezpośrednio na nasz adres.
  email_button: Napisz e-mail
  other_ways_eyebrow: Zanim napiszesz
  other_ways_title: Może już znamy odpowiedź?
  other_ways_text: Zajrzyj do FAQ albo obserwuj nas na Instagramie.
  faq_link: Przejdź do FAQ
  instagram_link: Znajdź nas na Instagramie
</i18n>
