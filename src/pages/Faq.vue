
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
  <main class="faq-page">
    <header class="faq-hero">
      <div aria-hidden="true" class="hero-grain" />
      <div class="faq-wrap hero-layout">
        <div class="hero-copy">
          <p class="hero-eyebrow"><span aria-hidden="true">✳</span>{{ t("eyebrow") }}</p>
          <h1>{{ t("title") }}</h1>
          <p class="hero-intro">{{ t("intro") }}</p>
        </div>
        <div class="hero-mark" aria-hidden="true">
          <span class="mark-ring mark-ring-outer" />
          <span class="mark-ring mark-ring-inner" />
          <span class="question-mark">?</span>
          <span class="mark-caption">{{ t("art_caption") }}</span>
        </div>
      </div>
    </header>

    <section class="faq-wrap faq-content" aria-labelledby="faq-heading">
      <div class="section-intro">
        <div>
          <p class="section-eyebrow"><span aria-hidden="true" />{{ t("section_eyebrow") }}</p>
          <h2 id="faq-heading">{{ t("heading") }}</h2>
        </div>
        <p class="section-note">{{ t("section_intro") }}</p>
      </div>

      <div class="faq-list">
        <article v-for="(item, index) in ['app', 'languages', 'recipes', 'recipe_help', 'app_help']" :key="item" class="faq-item">
          <span class="faq-number">{{ `0${index + 1}` }}</span>
          <div class="faq-answer">
            <h3>{{ t(`${item}_question`) }}</h3>
            <p>{{ t(`${item}_answer`) }}<a v-if="item.endsWith('help')" href="mailto:justbreadapp@gmail.com">justbreadapp@gmail.com<span aria-hidden="true">↗</span></a></p>
          </div>
          <span class="faq-spark" aria-hidden="true">✳</span>
        </article>
      </div>

      <section class="contact-panel" aria-labelledby="contact-heading">
        <div class="contact-copy">
          <p class="panel-eyebrow">{{ t("contact_eyebrow") }}</p>
          <h2 id="contact-heading">{{ t("contact_heading") }}</h2>
          <p>{{ t("contact_text") }}</p>
        </div>
        <a href="mailto:justbreadapp@gmail.com">justbreadapp@gmail.com<span aria-hidden="true">↗</span></a>
      </section>
    </section>
    <NavigationBar />
  </main>
</template>

<style scoped>
.faq-page {
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

.faq-wrap {
  width: min(100% - 3rem, 1040px);
  margin-inline: auto;
}

.faq-hero {
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
  mask-image: linear-gradient(90deg, #000 0%, transparent 85%);
}

.hero-layout {
  display: grid;
  min-height: 390px;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 2rem;
  padding-block: 4rem;
}

.hero-copy {
  position: relative;
  z-index: 1;
  max-width: 630px;
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

.hero-eyebrow > span:first-child {
  font-size: 1.1rem;
}

.eyebrow-divider {
  color: rgb(43 33 24 / 55%);
}

.hero-copy h1,
.section-intro h2,
.faq-answer h3,
.contact-panel h2 {
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 400;
  letter-spacing: -0.045em;
}

.hero-copy h1 {
  max-width: 680px;
  margin: 1.25rem 0 0;
  font-size: clamp(3.2rem, 6.5vw, 5.7rem);
  line-height: 1;
}

.hero-intro {
  max-width: 490px;
  margin: 1.3rem 0 0;
  color: #3b2a10;
  font-size: 1.05rem;
  line-height: 1.75;
}

.hero-mark {
  position: relative;
  display: grid;
  aspect-ratio: 1;
  width: min(100%, 330px);
  place-items: center;
  justify-self: end;
  animation: rise-in 800ms 120ms both;
}

.hero-mark::before {
  position: absolute;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 30%, #4a3a2b, #2b2118 70%);
  content: "";
}

.mark-ring {
  position: absolute;
  border: 1px solid rgb(43 33 24 / 30%);
  border-radius: 50%;
}

.mark-ring-outer {
  inset: 2%;
}

.mark-ring-inner {
  inset: 12%;
  border-style: dashed;
  opacity: 0.6;
}

.question-mark {
  position: relative;
  z-index: 1;
  color: var(--gold);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(8rem, 16vw, 13rem);
  line-height: 1;
  text-shadow: 0 12px 30px rgb(0 0 0 / 35%);
  transform: rotate(-8deg);
}

.mark-caption {
  position: absolute;
  right: 0;
  bottom: 1%;
  color: #3b2a10;
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.2em;
}

.faq-content {
  padding-block: 4.5rem 5.5rem;
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

.section-eyebrow > span {
  width: 1.7rem;
  height: 1px;
  background: currentColor;
}

.section-intro h2 {
  margin: 0.65rem 0 0;
  font-size: clamp(2.4rem, 4vw, 3.4rem);
  line-height: 1.08;
}

.section-note {
  max-width: 400px;
  margin: 0 0 0.3rem;
  color: var(--muted);
  line-height: 1.75;
}

.faq-list {
  border-top: 1px solid var(--line);
}

.faq-item {
  position: relative;
  display: grid;
  grid-template-columns: 3rem 1fr auto;
  gap: 1.3rem;
  padding: 1.65rem 0 1.8rem;
  border-bottom: 1px solid var(--line);
  animation: rise-in 500ms both;
}

.faq-item:nth-child(2) {
  animation-delay: 50ms;
}

.faq-item:nth-child(3) {
  animation-delay: 100ms;
}

.faq-item:nth-child(4) {
  animation-delay: 150ms;
}

.faq-item:nth-child(5) {
  animation-delay: 200ms;
}

.faq-number {
  padding-top: 0.3rem;
  color: #8a7a66;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.15em;
}

.faq-answer h3 {
  margin: 0;
  font-size: clamp(1.35rem, 2.5vw, 1.8rem);
  line-height: 1.25;
}

.faq-answer p {
  max-width: 700px;
  margin: 0.55rem 0 0;
  color: var(--muted);
  font-size: 0.97rem;
  line-height: 1.7;
}

.faq-answer a,
.contact-panel > a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--brown);
  font-weight: 700;
  text-decoration-color: #d9a93a;
  text-underline-offset: 4px;
}

.faq-answer a {
  margin-left: 0.35rem;
  text-decoration: underline;
}

.faq-answer a span,
.contact-panel > a span {
  transition: transform 180ms ease;
}

.faq-answer a:hover span,
.contact-panel > a:hover span {
  transform: translate(2px, -2px);
}

.faq-answer a:focus-visible,
.contact-panel > a:focus-visible {
  outline: 2px solid var(--brown);
  outline-offset: 4px;
}

.faq-spark {
  align-self: center;
  color: var(--brown);
  font-size: 1rem;
  transition: transform 250ms ease;
}

.faq-item:hover .faq-spark {
  transform: rotate(45deg);
}

.contact-panel {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 3rem;
  padding: 2.25rem;
  background: var(--butter);
}

.contact-panel h2 {
  margin: 0.6rem 0 0;
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  line-height: 1.08;
}

.contact-copy > p:last-child {
  margin: 0.6rem 0 0;
  color: var(--muted);
  line-height: 1.65;
}

.contact-panel > a {
  flex: 0 0 auto;
  font-size: 0.92rem;
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

@media (max-width: 700px) {
  .faq-wrap {
    width: min(100% - 2.5rem, 560px);
  }

  .hero-layout {
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 0;
    padding-block: 3.5rem 1.2rem;
  }

  .hero-copy h1 {
    font-size: clamp(3rem, 11vw, 4.8rem);
  }

  .hero-mark {
    width: min(56%, 230px);
    margin: -0.2rem auto 0;
    justify-self: center;
  }

  .faq-content {
    padding-block: 3.5rem 4rem;
  }

  .section-intro {
    display: block;
    margin-bottom: 1.4rem;
  }

  .section-note {
    margin-top: 0.8rem;
  }

  .faq-item {
    grid-template-columns: 2rem 1fr auto;
    gap: 0.8rem;
    padding-block: 1.35rem;
  }

  .contact-panel {
    align-items: flex-start;
    flex-direction: column;
    gap: 1.2rem;
    margin-top: 2rem;
    padding: 1.6rem;
  }
}

@media (max-width: 420px) {
  .faq-wrap {
    width: min(100% - 2rem, 560px);
  }

  .faq-item {
    grid-template-columns: 1.7rem 1fr;
  }

  .faq-spark {
    display: none;
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
  eyebrow: Just Bread / Help desk
  title: Frequently asked questions
  art_caption: GOOD TO KNOW · 05
  section_eyebrow: A few things, clarified
  intro: A little help for the moments when you’re wondering what comes next.
  heading: FAQ
  section_intro: Quick answers about the app, the recipes, and getting a good loaf into the oven.
  app_question: Where can I download the app?
  app_answer: The app is available on the Apple App Store and Google Play.
  languages_question: What languages are supported?
  languages_answer: Currently supported languages are Polish and English.
  recipes_question: Will there be more recipes in the future?
  recipes_answer: Yes, future releases will include more recipes.
  recipe_help_question: A recipe is unclear. Where can I find help?
  recipe_help_answer: Please email us at
  app_help_question: The app is not working. What should I do?
  app_help_answer: Please email us with the details at
  contact_eyebrow: Still curious?
  contact_heading: Need more help?
  contact_text: Feel free to contact us.
pl:
  eyebrow: Just Bread / Pomoc
  title: Najczęściej zadawane pytania
  art_caption: WARTO WIEDZIEĆ · 05
  section_eyebrow: Kilka rzeczy wyjaśnionych
  intro: Kilka podpowiedzi na momenty, gdy zastanawiasz się, co dalej.
  heading: FAQ
  section_intro: Krótkie odpowiedzi o aplikacji, przepisach i tym, jak upiec dobry bochenek.
  app_question: Gdzie mogę pobrać aplikację?
  app_answer: Aplikację znajdziesz w sklepach Apple App Store i Google Play.
  languages_question: Jakie języki obsługuje aplikacja?
  languages_answer: Obecnie aplikacja jest dostępna w języku polskim i angielskim.
  recipes_question: Czy pojawią się kolejne przepisy?
  recipes_answer: Tak, w przyszłych aktualizacjach dodamy nowe przepisy.
  recipe_help_question: Nie rozumiem przepisu. Gdzie mogę uzyskać pomoc?
  recipe_help_answer: Napisz do nas na adres
  app_help_question: Aplikacja nie działa. Co mogę zrobić?
  app_help_answer: Opisz problem i napisz do nas na adres
  contact_eyebrow: Nadal masz pytania?
  contact_heading: Potrzebujesz pomocy?
  contact_text: Skontaktuj się z nami.
</i18n>