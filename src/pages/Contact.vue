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
  <main class="contact-page">
    <header class="contact-hero">
      <div aria-hidden="true" class="hero-grain" />
      <div class="contact-wrap hero-layout">
        <div class="hero-copy">
          <p class="hero-eyebrow"><span aria-hidden="true">✳</span>{{ t("eyebrow") }}</p>
          <h1>{{ t("title") }}</h1>
          <p class="hero-lead">{{ t("lead") }}</p>
        </div>

        <div class="hero-art" aria-hidden="true">
          <div class="art-orbit art-orbit-outer" />
          <div class="art-orbit art-orbit-inner" />
          <svg class="bread-illustration" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="160" cy="252" rx="112" ry="22" fill="#120c07" fill-opacity=".4" />
            <path d="M55 211c-14-17-20-42-13-70 13-53 62-94 121-98 59-4 108 31 119 83 11 50-16 87-56 99-43 13-142 12-171-14Z" fill="#E39A2D" />
            <path d="M55 211c-14-17-20-42-13-70 13-53 62-94 121-98 59-4 108 31 119 83 11 50-16 87-56 99-43 13-142 12-171-14Z" stroke="#F0BE75" stroke-width="5" />
            <path d="M83 171c6-26 20-47 43-63M126 190c9-30 27-54 52-73M173 197c10-25 27-45 48-59" stroke="#F6D6A0" stroke-width="11" stroke-linecap="round" />
            <path d="M83 171c6-26 20-47 43-63M126 190c9-30 27-54 52-73M173 197c10-25 27-45 48-59" stroke="#B96A36" stroke-opacity=".48" stroke-width="2" stroke-linecap="round" />
            <path d="M64 237c47 17 130 19 183 3" stroke="#E8C99A" stroke-opacity=".8" stroke-width="3" stroke-linecap="round" />
          </svg>
          <span class="art-spark art-spark-one">✳</span>
          <span class="art-spark art-spark-two">✳</span>
          <span class="art-caption">JUST BREAD <span>·</span> 01</span>
        </div>
      </div>
    </header>

    <section class="contact-wrap contact-content" aria-labelledby="contact-options-heading">
      <div class="section-intro">
        <div>
          <p class="section-eyebrow"><span aria-hidden="true" />{{ t("section_eyebrow") }}</p>
          <h2 id="contact-options-heading">{{ t("section_title") }}</h2>
        </div>
        <p class="section-description">{{ t("section_text") }}</p>
      </div>

      <div class="topic-grid">
        <a
          v-for="(topic, index) in ['app', 'recipes', 'feedback']"
          :key="topic"
          :href="`mailto:justbreadapp@gmail.com?subject=${encodeURIComponent(t(`${topic}_subject`))}`"
          class="topic-card"
        >
          <span class="topic-number">{{ `0${index + 1}` }}</span>
          <span aria-hidden="true" class="topic-symbol">{{ topic === "app" ? "✳" : topic === "recipes" ? "◌" : "♡" }}</span>
          <h3>{{ t(`${topic}_title`) }}</h3>
          <p>{{ t(`${topic}_text`) }}</p>
          <span class="topic-action">
            {{ t("email_action") }}
            <span aria-hidden="true">↗</span>
          </span>
        </a>
      </div>

      <div class="contact-bottom">
        <section class="email-panel" aria-labelledby="email-heading">
          <div class="email-copy">
            <p class="panel-eyebrow">{{ t("email_eyebrow") }}</p>
            <h2 id="email-heading">{{ t("email_title") }}</h2>
            <p class="panel-description">{{ t("email_text") }}</p>
          </div>
          <a
            class="email-button"
            href="mailto:justbreadapp@gmail.com"
          >{{ t("email_button") }}<span aria-hidden="true">↗</span></a>
        </section>

        <section class="elsewhere-panel" aria-labelledby="other-ways-heading">
          <p class="panel-eyebrow">{{ t("other_ways_eyebrow") }}</p>
          <h2 id="other-ways-heading">{{ t("other_ways_title") }}</h2>
          <p class="panel-description">{{ t("other_ways_text") }}</p>
          <div class="elsewhere-links">
            <RouterLink to="/faq">
              {{ t("faq_link") }}
            </RouterLink>
            <a
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

<style scoped>
.contact-page {
  --gold: #ffb300;
  --ink: #2b2118;
  --paper: #fbf6ea;
  --surface: #fffdf8;
  --muted: #62574d;
  --brown: #80571f;
  --butter: #fff2d1;
  --line: #eadfc8;
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
}

.contact-wrap {
  width: min(100% - 3rem, 1140px);
  margin-inline: auto;
}

.contact-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: var(--gold);
  color: var(--ink);
}

.hero-grain {
  position: absolute;
  z-index: -1;
  inset: 0;
  opacity: 0.13;
  background-image: radial-gradient(#2b2118 0.65px, transparent 0.65px);
  background-size: 7px 7px;
  mask-image: linear-gradient(90deg, #000 0%, transparent 76%);
}

.hero-layout {
  display: grid;
  min-height: 470px;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 2rem;
  padding-block: 4.5rem 4rem;
}

.hero-copy {
  position: relative;
  z-index: 1;
  max-width: 640px;
  animation: rise-in 650ms both;
}

.hero-eyebrow,
.section-eyebrow,
.panel-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  line-height: 1.5;
  text-transform: uppercase;
}

.hero-eyebrow {
  color: var(--ink);
}

.hero-eyebrow span {
  font-size: 1.1rem;
}

.hero-copy h1,
.section-intro h2,
.topic-card h3,
.email-panel h2,
.elsewhere-panel h2 {
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 400;
  letter-spacing: -0.045em;
}

.hero-copy h1 {
  max-width: 680px;
  margin: 1.25rem 0 0;
  font-size: clamp(3.6rem, 7vw, 6.5rem);
  line-height: 0.98;
}

.hero-lead {
  max-width: 510px;
  margin: 1.5rem 0 0;
  color: #3b2a10;
  font-size: 1.08rem;
  line-height: 1.75;
}

.hero-art {
  position: relative;
  display: grid;
  aspect-ratio: 1;
  width: min(100%, 410px);
  place-items: center;
  justify-self: end;
  animation: rise-in 800ms 120ms both;
}

.hero-art::before {
  position: absolute;
  width: 68%;
  height: 68%;
  border-radius: 50%;
  background: radial-gradient(circle at 36% 32%, #4a3a2b, #2b2118 68%);
  content: "";
}

.art-orbit {
  position: absolute;
  border: 1px solid rgb(43 33 24 / 30%);
  border-radius: 50%;
}

.art-orbit-outer {
  inset: 2%;
}

.art-orbit-inner {
  inset: 12%;
  border-style: dashed;
  opacity: 0.55;
}

.bread-illustration {
  position: relative;
  z-index: 1;
  width: 84%;
  filter: drop-shadow(0 20px 14px rgb(26 18 11 / 30%));
  transform: rotate(-8deg);
  transition: transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.hero-art:hover .bread-illustration {
  transform: rotate(-3deg) translateY(-5px);
}

.art-spark {
  position: absolute;
  z-index: 2;
  color: var(--ink);
}

.art-spark-one {
  top: 13%;
  right: 16%;
  font-size: 1.25rem;
}

.art-spark-two {
  bottom: 22%;
  left: 8%;
  font-size: 0.85rem;
}

.art-caption {
  position: absolute;
  right: 0;
  bottom: 3%;
  color: var(--ink);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.2em;
}

.art-caption span {
  padding-inline: 0.3rem;
  color: var(--ink);
}

.contact-content {
  padding-block: 5.25rem 5.75rem;
}

.section-intro {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 3rem;
  margin-bottom: 2rem;
}

.section-eyebrow,
.panel-eyebrow {
  color: var(--brown);
}

.section-eyebrow span {
  width: 1.7rem;
  height: 1px;
  background: currentColor;
}

.section-intro h2 {
  margin: 0.7rem 0 0;
  font-size: clamp(2.4rem, 4vw, 3.5rem);
  line-height: 1.08;
}

.section-description {
  max-width: 445px;
  margin: 0 0 0.3rem;
  color: var(--muted);
  line-height: 1.75;
}

.topic-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.topic-card {
  position: relative;
  display: flex;
  min-height: 280px;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  padding: 1.55rem 1.6rem 1.45rem;
  border: 1px solid var(--line);
  border-radius: 3px;
  background: var(--surface);
  color: var(--ink);
  text-decoration: none;
  transition: border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;
}

.topic-card::after {
  position: absolute;
  right: -2.25rem;
  bottom: -3.1rem;
  width: 8rem;
  height: 8rem;
  border: 1px solid var(--line);
  border-radius: 50%;
  content: "";
  transition: transform 350ms ease;
}

.topic-card:hover {
  z-index: 1;
  transform: translateY(-4px);
  border-color: #d9a93a;
  box-shadow: 0 16px 35px rgb(128 87 31 / 16%);
}

.topic-card:hover::after {
  transform: scale(1.25);
}

.topic-card:focus-visible,
.email-button:focus-visible,
.elsewhere-links a:focus-visible {
  outline: 2px solid var(--brown);
  outline-offset: 4px;
}

.topic-number {
  color: #8a7a66;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
}

.topic-symbol {
  display: grid;
  width: 2.6rem;
  height: 2.6rem;
  margin-top: 1.4rem;
  border-radius: 50%;
  background: var(--butter);
  color: var(--brown);
  font-size: 1.25rem;
  place-items: center;
}

.topic-card h3 {
  margin: 1rem 0 0;
  font-size: 1.48rem;
  line-height: 1.15;
}

.topic-card > p {
  margin: 0.55rem 0 1.25rem;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.65;
}

.topic-action {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: auto;
  color: var(--brown);
  font-size: 0.86rem;
  font-weight: 700;
}

.topic-action span {
  font-size: 1.1rem;
  transition: transform 180ms ease;
}

.topic-card:hover .topic-action span {
  transform: translate(2px, -2px);
}

.contact-bottom {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 1rem;
  margin-top: 1rem;
}

.email-panel,
.elsewhere-panel {
  min-height: 240px;
  padding: 2rem;
}

.email-panel {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  background: var(--butter);
}

.email-copy {
  max-width: 420px;
}

.email-panel h2,
.elsewhere-panel h2 {
  margin: 0.7rem 0 0;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  line-height: 1.08;
}

.panel-description {
  margin: 0.7rem 0 0;
  color: var(--muted);
  font-size: 0.91rem;
  line-height: 1.65;
}

.email-button {
  display: inline-flex;
  min-height: 3rem;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 1.1rem;
  padding: 0.8rem 1.1rem;
  background: var(--ink);
  color: var(--gold);
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 180ms ease, transform 180ms ease;
}

.email-button:hover {
  transform: translateY(-2px);
  background: #46362a;
}

.elsewhere-panel {
  border: 1px solid var(--line);
  background: var(--surface);
}

.elsewhere-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.4rem;
  margin-top: 1.1rem;
}

.elsewhere-links a {
  color: var(--brown);
  font-size: 0.86rem;
  font-weight: 700;
  text-decoration-color: #d9a93a;
  text-underline-offset: 4px;
}

.elsewhere-links a:hover {
  color: var(--ink);
  text-decoration-thickness: 2px;
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 760px) {
  .contact-wrap {
    width: min(100% - 2.5rem, 560px);
  }

  .hero-layout {
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 0;
    padding-block: 4rem 1.5rem;
  }

  .hero-copy h1 {
    font-size: clamp(3.35rem, 12vw, 5rem);
  }

  .hero-art {
    width: min(72%, 300px);
    margin: -0.3rem auto 0;
    justify-self: center;
  }

  .contact-content {
    padding-block: 3.5rem 4rem;
  }

  .section-intro {
    display: block;
    margin-bottom: 1.5rem;
  }

  .section-description {
    margin-top: 1rem;
  }

  .topic-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .topic-card {
    min-height: 245px;
  }

  .contact-bottom {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin-top: 0.75rem;
  }
}

@media (max-width: 480px) {
  .contact-wrap {
    width: min(100% - 2rem, 560px);
  }

  .hero-layout {
    padding-top: 3.5rem;
  }

  .hero-lead {
    font-size: 1rem;
  }

  .email-panel {
    align-items: flex-start;
    flex-direction: column;
    gap: 1.4rem;
    padding: 1.5rem;
  }

  .elsewhere-panel {
    padding: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>

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
