<script setup lang="ts">
import { computed, ref } from "vue";
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import NavigationBar from "../components/NavigationBar.vue";
import { canonicalUrl } from "../seo";

const { t } = useI18n({ inheritLocale: true });
const pageUrl = canonicalUrl("/pizza-calculator");

useHead({
  title: "Kalkulator ciasta na pizzę neapolitańską | Just Bread",
  meta: [
    { name: "description", content: "Kalkulator ciasta na pizzę neapolitańską: oblicz ilość mąki, wody, soli i drożdży dla wybranej liczby pizz, masy kulek oraz hydratacji." },
    { property: "og:title", content: "Kalkulator ciasta na pizzę neapolitańską | Just Bread" },
    { property: "og:description", content: "Oblicz składniki ciasta na pizzę neapolitańską i poznaj prosty plan fermentacji." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: pageUrl },
    { name: "twitter:card", content: "summary" },
  ],
  link: [{ rel: "canonical", href: pageUrl }],
  script: [{
    type: "application/ld+json",
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Kalkulator ciasta na pizzę neapolitańską",
      description: "Kalkulator ilości mąki, wody, soli i drożdży do ciasta na pizzę neapolitańską.",
      url: pageUrl,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: "pl",
    }),
  }, {
    type: "application/ld+json",
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Jaką hydratację wybrać do pizzy neapolitańskiej?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zacznij od 65%. Taka wartość daje ciasto wygodne do pracy ręcznej i jednocześnie sprzyja lekkiemu rantowi. Dopasuj ją do mąki, czasu fermentacji i własnej wprawy w formowaniu.",
          },
        },
        {
          "@type": "Question",
          name: "Jakie drożdże wybrać?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Wybierz drożdże, które masz w domu. Kalkulator dostosowuje ich ilość do drożdży świeżych lub suszonych, ale czas i temperatura fermentacji nadal wymagają dopasowania do warunków.",
          },
        },
        {
          "@type": "Question",
          name: "Czy fermentacja 18–24 godziny jest obowiązkowa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nie. To prosty punkt wyjścia dla fermentacji w lodówce. Dostosuj czas do temperatury w pomieszczeniu i lodówce oraz do siły użytej mąki.",
          },
        },
      ],
    }),
  }],
});

const portions = ref(4);
const doughBallWeight = ref(250);
const hydration = ref(65);
const yeastType = ref<"fresh" | "dry">("fresh");

const yeastPercentage = computed(() => yeastType.value === "fresh" ? 0.1 : 0.04);
const flour = computed(() => {
  const denominator = 1 + hydration.value / 100 + 0.03 + yeastPercentage.value / 100;
  return (portions.value * doughBallWeight.value) / denominator;
});
const water = computed(() => flour.value * hydration.value / 100);
const salt = computed(() => flour.value * 0.03);
const yeast = computed(() => flour.value * yeastPercentage.value / 100);

function formatWeight(value: number) {
  return value < 10 ? value.toFixed(1) : Math.round(value).toString();
}

function resetCalculator() {
  portions.value = 4;
  doughBallWeight.value = 250;
  hydration.value = 65;
  yeastType.value = "fresh";
}
</script>

<template>
  <main class="min-h-screen bg-whtite_gray text-gray_dark">
    <header class="bg-gold px-6 py-12 text-center sm:py-16">
      <p class="text-sm font-semibold uppercase tracking-widest">Just Bread</p>
      <h1 class="mt-3 text-3xl font-semibold sm:text-4xl">{{ t("title") }}</h1>
      <p class="mx-auto mt-4 max-w-xl text-lg">{{ t("subtitle") }}</p>
    </header>

    <section class="mx-auto grid max-w-5xl gap-8 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
      <form class="border border-gray-300 bg-white p-6 sm:p-8" @submit.prevent>
        <h2 class="text-2xl font-semibold">{{ t("settings") }}</h2>

        <div class="mt-7 grid gap-6 sm:grid-cols-2">
          <label class="block">
            <span class="font-semibold">{{ t("portions") }}</span>
            <input v-model.number="portions" class="mt-2 block w-full border border-gray-400 bg-white px-3 py-3" type="number" min="1" max="20" />
          </label>
          <label class="block">
            <span class="font-semibold">{{ t("ball_weight") }}</span>
            <span class="float-right text-sm">{{ doughBallWeight }} g</span>
            <input v-model.number="doughBallWeight" class="mt-4 block w-full accent-gold" type="range" min="180" max="320" step="5" />
          </label>
        </div>

        <label class="mt-7 block">
          <span class="font-semibold">{{ t("hydration") }}</span>
          <span class="float-right text-sm">{{ hydration }}%</span>
          <input v-model.number="hydration" class="mt-4 block w-full accent-gold" type="range" min="55" max="75" step="1" />
          <span class="mt-2 block text-sm text-gray-600">{{ t("hydration_hint") }}</span>
        </label>

        <fieldset class="mt-7">
          <legend class="font-semibold">{{ t("yeast") }}</legend>
          <div class="mt-3 grid grid-cols-2 gap-3">
            <label class="cursor-pointer border border-gray-400 p-3 text-center has-[:checked]:border-gray_dark has-[:checked]:bg-gray_dark has-[:checked]:text-white">
              <input v-model="yeastType" class="sr-only" type="radio" value="fresh" />
              {{ t("fresh_yeast") }}
            </label>
            <label class="cursor-pointer border border-gray-400 p-3 text-center has-[:checked]:border-gray_dark has-[:checked]:bg-gray_dark has-[:checked]:text-white">
              <input v-model="yeastType" class="sr-only" type="radio" value="dry" />
              {{ t("dry_yeast") }}
            </label>
          </div>
        </fieldset>

        <button class="mt-8 border border-gray_dark px-5 py-3 font-semibold" type="button" @click="resetCalculator">
          {{ t("reset") }}
        </button>
      </form>

      <section class="bg-gray p-6 sm:p-8" aria-live="polite" aria-labelledby="recipe-title">
        <p class="text-sm font-semibold uppercase tracking-widest">{{ t("neapolitan") }}</p>
        <h2 id="recipe-title" class="mt-2 text-2xl font-semibold">{{ t("recipe") }}</h2>
        <p class="mt-2">{{ t("recipe_for", { count: portions, weight: doughBallWeight }) }}</p>

        <dl class="mt-7 divide-y divide-gray-400 border-y border-gray-400">
          <div class="flex items-center justify-between py-4"><dt>{{ t("flour") }}</dt><dd class="text-xl font-semibold">{{ formatWeight(flour) }} g</dd></div>
          <div class="flex items-center justify-between py-4"><dt>{{ t("water") }}</dt><dd class="text-xl font-semibold">{{ formatWeight(water) }} g</dd></div>
          <div class="flex items-center justify-between py-4"><dt>{{ t("salt") }}</dt><dd class="text-xl font-semibold">{{ formatWeight(salt) }} g</dd></div>
          <div class="flex items-center justify-between py-4"><dt>{{ t("yeast_amount", { type: t(yeastType === 'fresh' ? 'fresh_yeast' : 'dry_yeast') }) }}</dt><dd class="text-xl font-semibold">{{ formatWeight(yeast) }} g</dd></div>
        </dl>

        <aside class="mt-8 border-l-4 border-gold pl-4">
          <h3 class="font-semibold">{{ t("tip_title") }}</h3>
          <p class="mt-1 text-sm">{{ t("tip") }}</p>
        </aside>
      </section>
    </section>

    <article class="mx-auto max-w-3xl space-y-10 px-6 pb-12 sm:pb-16">
      <section aria-labelledby="how-it-works-heading">
        <h2 id="how-it-works-heading" class="text-2xl font-semibold">{{ t("how_it_works_title") }}</h2>
        <p class="mt-4">{{ t("how_it_works_text") }}</p>
        <p class="mt-4">{{ t("method_text") }}</p>
      </section>

      <section aria-labelledby="starting-point-heading">
        <h2 id="starting-point-heading" class="text-2xl font-semibold">{{ t("starting_point_title") }}</h2>
        <p class="mt-4">{{ t("starting_point_text") }}</p>
      </section>

      <section aria-labelledby="pizza-faq-heading">
        <h2 id="pizza-faq-heading" class="text-2xl font-semibold">{{ t("faq_title") }}</h2>
        <div class="mt-5 divide-y divide-gray-300 border-y border-gray-300">
          <section v-for="item in ['hydration', 'yeast', 'fermentation']" :key="item" class="py-5">
            <h3 class="font-semibold">{{ t(`faq_${item}_question`) }}</h3>
            <p class="mt-2">{{ t(`faq_${item}_answer`) }}</p>
          </section>
        </div>
      </section>

      <aside class="border-l-4 border-gold bg-gray px-6 py-5">
        <h2 class="text-xl font-semibold">{{ t("hydration_guide_title") }}</h2>
        <p class="mt-2">{{ t("hydration_guide_text") }}</p>
        <router-link class="mt-4 inline-block font-semibold underline" to="/hydration-guide">{{ t("hydration_guide_link") }}</router-link>
      </aside>
    </article>
    <NavigationBar />
  </main>
</template>

<i18n lang="yaml">
en:
  title: Neapolitan pizza calculator
  subtitle: Calculate the ingredients for a light, airy pizza dough.
  settings: Dough settings
  portions: Number of pizzas
  ball_weight: Dough ball weight
  hydration: Hydration
  hydration_hint: 65% is a balanced starting point for hand stretching.
  yeast: Yeast type
  fresh_yeast: Fresh yeast
  dry_yeast: Dry yeast
  reset: Reset settings
  neapolitan: Neapolitan pizza
  recipe: Your ingredients
  recipe_for: "Makes {count} dough balls, {weight} g each"
  flour: Type 00 flour
  water: Water
  salt: Salt
  yeast_amount: "{type}"
  tip_title: A simple fermentation schedule
  tip: Let the dough rest at room temperature for 2 hours, then refrigerate it for 18–24 hours. Take it out 1–2 hours before baking.
  how_it_works_title: How the calculator works
  how_it_works_text: Enter the number and weight of dough balls, then choose hydration and yeast type. The calculator uses the total dough weight to calculate the flour, water, salt, and yeast.
  method_text: The default formula uses 3% salt and 65% hydration, calculated against the flour weight. Fresh yeast is set to 0.1% of flour weight; dry yeast is set to 0.04%.
  starting_point_title: A practical starting point for pizza dough
  starting_point_text: 65% hydration is a balanced place to start when stretching dough by hand. If your flour and technique can handle wetter dough, increase hydration gradually by 1–2 percentage points.
  faq_title: Pizza dough calculator FAQ
  faq_hydration_question: What hydration should I use for Neapolitan-style pizza?
  faq_hydration_answer: Start at 65%. This produces dough that is manageable by hand while still giving a light crust. Adapt the value to your flour, fermentation, and shaping experience.
  faq_yeast_question: Which yeast should I choose?
  faq_yeast_answer: Select the yeast you have at home. The calculator adjusts its amount for fresh or dry yeast, but fermentation time and temperature still need to match your conditions.
  faq_fermentation_question: Is the 18–24 hour schedule mandatory?
  faq_fermentation_answer: No. It is a simple cold-fermentation starting point. Adjust it for room temperature, refrigerator temperature, and the strength of your flour.
  hydration_guide_title: Learn about dough hydration
  hydration_guide_text: Understand how the water-to-flour ratio changes dough consistency and choose a value suited to your bake.
  hydration_guide_link: Read the hydration guide
pl:
  title: Kalkulator pizzy neapolitańskiej
  subtitle: Oblicz ilości składników na lekkie i puszyste ciasto do pizzy.
  settings: Ustawienia ciasta
  portions: Liczba porcji
  ball_weight: Masa porcji ciasta
  hydration: Hydratacja
  hydration_hint: 65% to dobry punkt wyjścia do ręcznego rozciągania ciasta.
  yeast: Rodzaj drożdży
  fresh_yeast: Drożdże świeże
  dry_yeast: Drożdże suszone
  reset: Przywróć ustawienia
  neapolitan: Pizza neapolitańska
  recipe: Twoje składniki
  recipe_for: "Liczba porcji: {count} × {weight} g"
  flour: Mąka typu 00
  water: Woda
  salt: Sól
  yeast_amount: "{type}"
  tip_title: Prosty plan fermentacji
  tip: Zostaw ciasto na 2 godziny w temperaturze pokojowej, a następnie włóż je do lodówki na 18–24 godziny. Wyjmij je 1–2 godziny przed pieczeniem.
  how_it_works_title: Jak działa kalkulator ciasta na pizzę?
  how_it_works_text: Podaj liczbę i masę kulek ciasta, a następnie wybierz hydratację oraz rodzaj drożdży. Kalkulator wykorzystuje całkowitą masę ciasta, aby obliczyć ilość mąki, wody, soli i drożdży.
  method_text: Domyślna formuła zakłada 3% soli i 65% hydratacji liczonych względem masy mąki. Ilość świeżych drożdży wynosi 0,1% masy mąki, a suszonych 0,04%.
  starting_point_title: Od czego zacząć przy cieście na pizzę?
  starting_point_text: Hydratacja 65% to zrównoważony punkt wyjścia do ręcznego rozciągania ciasta. Jeśli mąka i technika pozwalają na bardziej wilgotne ciasto, zwiększaj hydratację stopniowo, o 1–2 punkty procentowe.
  faq_title: Pytania o kalkulator ciasta na pizzę
  faq_hydration_question: Jaką hydratację wybrać do pizzy neapolitańskiej?
  faq_hydration_answer: Zacznij od 65%. Taka wartość daje ciasto wygodne do pracy ręcznej i jednocześnie sprzyja lekkiemu rantowi. Dopasuj ją do mąki, czasu fermentacji i własnej wprawy w formowaniu.
  faq_yeast_question: Jakie drożdże wybrać?
  faq_yeast_answer: Wybierz drożdże, które masz w domu. Kalkulator dostosowuje ich ilość do drożdży świeżych lub suszonych, ale czas i temperatura fermentacji nadal wymagają dopasowania do warunków.
  faq_fermentation_question: Czy fermentacja 18–24 godziny jest obowiązkowa?
  faq_fermentation_answer: Nie. To prosty punkt wyjścia dla fermentacji w lodówce. Dostosuj czas do temperatury w pomieszczeniu i lodówce oraz do siły użytej mąki.
  hydration_guide_title: Dowiedz się więcej o hydratacji ciasta
  hydration_guide_text: Poznaj wpływ proporcji wody do mąki na konsystencję ciasta i dobierz wartość odpowiednią do wypieku.
  hydration_guide_link: Przeczytaj poradnik o hydratacji
</i18n>