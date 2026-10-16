<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import NavigationBar from "../components/NavigationBar.vue";
import { canonicalUrl } from "../seo";

const { t } = useI18n({ inheritLocale: true });
const pageUrl = canonicalUrl("/hydration-calculator");

useHead({
  title: "Kalkulator hydratacji ciasta chlebowego | Just Bread",
  meta: [
    { name: "description", content: "Kalkulator hydratacji ciasta chlebowego na zakwasie i drożdżach. Oblicz ilość mąki, wody, zakwasu i soli z uwzględnieniem hydratacji zakwasu." },
    { property: "og:title", content: "Kalkulator hydratacji ciasta chlebowego | Just Bread" },
    { property: "og:description", content: "Oblicz składniki ciasta na zakwasie lub drożdżach, z uwzględnieniem wody i mąki z zakwasu." },
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
      name: "Kalkulator hydratacji ciasta chlebowego",
      description: "Kalkulator składników ciasta chlebowego na zakwasie i drożdżach.",
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
          name: "Jak oblicza się hydratację?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Podziel całkowitą ilość wody przez całkowitą ilość mąki i pomnóż wynik przez 100. Przy wypieku na zakwasie uwzględnij wodę i mąkę znajdujące się w zakwasie.",
          },
        },
        {
          "@type": "Question",
          name: "Dlaczego kalkulator odejmuje mąkę i wodę z zakwasu?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zakwas składa się z mąki i wody. Jego skład jest już częścią całej receptury, więc odjęcie tych ilości zapobiega podwójnemu dodaniu składników.",
          },
        },
        {
          "@type": "Question",
          name: "Jaką hydratację wybrać?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zacznij od około 65% dla ciasta drożdżowego lub 70% dla ciasta na zakwasie, a potem zmieniaj wartość małymi krokami zależnie od mąki, techniki i oczekiwanego efektu.",
          },
        },
      ],
    }),
  }],
});

const bakeType = ref<"sourdough" | "yeast">("sourdough");
const flour = ref(500);
const hydration = ref(75);
const sourdoughPercentage = ref(20);
const sourdoughHydration = ref(100);
const saltPercentage = ref(2);
const showSourdoughSettings = ref(false);

watch(bakeType, (type) => {
  hydration.value = type === "sourdough" ? 75 : 65;
});

const sourdoughAmount = computed(() => flour.value * sourdoughPercentage.value / 100);
const sourdoughFlour = computed(() => sourdoughAmount.value / (1 + sourdoughHydration.value / 100));
const sourdoughWater = computed(() => sourdoughAmount.value - sourdoughFlour.value);
const totalWater = computed(() => flour.value * hydration.value / 100);
const addedFlour = computed(() => Math.max(0, flour.value - sourdoughFlour.value));
const addedWater = computed(() => Math.max(0, totalWater.value - sourdoughWater.value));
const salt = computed(() => flour.value * saltPercentage.value / 100);

function formatWeight(value: number | string) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0.0";
  }

  return numericValue < 10 ? numericValue.toFixed(1) : Math.round(numericValue).toString();
}

function resetCalculator() {
  bakeType.value = "sourdough";
  flour.value = 500;
  hydration.value = 75;
  sourdoughPercentage.value = 20;
  sourdoughHydration.value = 100;
  saltPercentage.value = 2;
  showSourdoughSettings.value = false;
}
</script>

<template>
  <main class="min-h-screen bg-whtite_gray text-gray_dark">
    <header class="bg-gold px-6 py-12 text-center sm:py-16">
      <p class="text-sm font-semibold uppercase tracking-widest">Just Bread</p>
      <h1 class="mt-3 text-3xl font-semibold sm:text-4xl">{{ t("title") }}</h1>
      <p class="mx-auto mt-4 max-w-xl text-lg">{{ t("subtitle") }}</p>
    </header>

    <section class="mx-auto grid max-w-5xl gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-16">
      <form class="min-w-0 border border-gray-300 bg-white p-6 sm:p-8" @submit.prevent>
        <h2 class="text-2xl font-semibold">{{ t("settings") }}</h2>

        <fieldset class="mt-7">
          <legend class="font-semibold">{{ t("bake_type") }}</legend>
          <div class="mt-3 grid grid-cols-2 gap-3">
            <label class="cursor-pointer border border-gray-400 p-3 text-center has-[:checked]:border-gray_dark has-[:checked]:bg-gray_dark has-[:checked]:text-white">
              <input v-model="bakeType" class="sr-only" type="radio" value="sourdough" />
              {{ t("sourdough") }}
            </label>
            <label class="cursor-pointer border border-gray-400 p-3 text-center has-[:checked]:border-gray_dark has-[:checked]:bg-gray_dark has-[:checked]:text-white">
              <input v-model="bakeType" class="sr-only" type="radio" value="yeast" />
              {{ t("yeast") }}
            </label>
          </div>
        </fieldset>

        <label class="mt-7 block">
          <span class="font-semibold">{{ t("flour") }}</span>
          <input v-model.number="flour" class="mt-2 block w-full border border-gray-400 bg-white px-3 py-3" data-testid="flour-amount" type="number" min="100" max="5000" step="10" />
        </label>

        <label class="mt-7 block">
          <span class="font-semibold">{{ t("hydration") }}</span>
          <span class="float-right inline-block min-w-[4ch] text-right tabular-nums text-sm">{{ hydration }}%</span>
          <input v-model.number="hydration" class="mt-4 block w-full accent-gold" type="range" :min="bakeType === 'sourdough' ? 60 : 50" :max="bakeType === 'sourdough' ? 100 : 80" step="1" />
        </label>

        <template v-if="bakeType === 'sourdough'">
          <label class="mt-7 block">
            <span class="font-semibold">{{ t("sourdough_percentage") }}</span>
            <span class="float-right inline-block min-w-[4ch] text-right tabular-nums text-sm">{{ sourdoughPercentage }}%</span>
            <input v-model.number="sourdoughPercentage" class="mt-4 block w-full accent-gold" data-testid="sourdough-percentage" type="range" min="0" max="50" step="1" />
          </label>
        </template>

        <label class="mt-7 block">
          <span class="font-semibold">{{ t("salt") }}</span>
          <span class="float-right inline-block min-w-[4ch] text-right tabular-nums text-sm">{{ saltPercentage }}%</span>
          <input v-model.number="saltPercentage" class="mt-4 block w-full accent-gold" type="range" min="1" max="3" step="0.1" />
        </label>

        <div class="mt-8 flex flex-wrap gap-3">
          <button class="border border-gray_dark px-5 py-3 font-semibold" type="button" @click="resetCalculator">
            {{ t("reset") }}
          </button>
          <button v-if="bakeType === 'sourdough'" class="border border-gray_dark px-5 py-3 font-semibold" data-testid="sourdough-settings-toggle" type="button" :aria-expanded="showSourdoughSettings" @click="showSourdoughSettings = !showSourdoughSettings">
            {{ t("sourdough_settings") }}
          </button>
        </div>

        <section v-if="bakeType === 'sourdough' && showSourdoughSettings" class="mt-4 border border-gray-300 p-4" data-testid="sourdough-settings-panel">
          <label class="block">
            <span class="font-semibold">{{ t("sourdough_hydration") }}</span>
            <span class="float-right inline-block min-w-[4ch] text-right tabular-nums text-sm">{{ sourdoughHydration }}%</span>
            <input v-model.number="sourdoughHydration" class="mt-4 block w-full accent-gold" type="range" min="50" max="150" step="5" />
            <span class="mt-2 block text-sm text-gray-600">{{ t("sourdough_ratio", { flour: formatWeight(sourdoughFlour), water: formatWeight(sourdoughWater) }) }}</span>
          </label>
        </section>
      </form>

      <section class="min-w-0 bg-gray p-6 sm:p-8" aria-live="polite" aria-labelledby="recipe-title">
        <p class="text-sm font-semibold uppercase tracking-widest">{{ t(bakeType) }}</p>
        <h2 id="recipe-title" class="mt-2 text-2xl font-semibold">{{ t("ingredients") }}</h2>
        <p class="mt-2">{{ t("recipe_for", { flour: formatWeight(flour), hydration }) }}</p>

        <dl class="mt-7 divide-y divide-gray-400 border-y border-gray-400">
          <div class="flex items-center justify-between py-4"><dt>{{ t("flour_to_add") }}</dt><dd class="min-w-[6ch] shrink-0 text-right text-xl font-semibold tabular-nums">{{ formatWeight(bakeType === "sourdough" ? addedFlour : flour) }} g</dd></div>
          <div class="flex items-center justify-between py-4"><dt>{{ t("water_to_add") }}</dt><dd class="min-w-[6ch] shrink-0 text-right text-xl font-semibold tabular-nums">{{ formatWeight(bakeType === "sourdough" ? addedWater : totalWater) }} g</dd></div>
          <div v-if="bakeType === 'sourdough'" class="flex items-center justify-between py-4"><dt>{{ t("sourdough_amount") }}</dt><dd class="min-w-[6ch] shrink-0 text-right text-xl font-semibold tabular-nums">{{ formatWeight(sourdoughAmount) }} g</dd></div>
          <div class="flex items-center justify-between py-4"><dt>{{ t("salt") }}</dt><dd class="min-w-[6ch] shrink-0 text-right text-xl font-semibold tabular-nums">{{ formatWeight(salt) }} g</dd></div>
        </dl>

        <aside v-if="bakeType === 'sourdough'" class="mt-8 border-l-4 border-gold pl-4">
          <h3 class="font-semibold">{{ t("sourdough_note_title") }}</h3>
          <p class="mt-1 text-sm">{{ t("sourdough_note", { flour: formatWeight(sourdoughFlour), water: formatWeight(sourdoughWater) }) }}</p>
        </aside>

        <aside class="mt-8 border-l-4 border-gray_dark pl-4">
          <h3 class="font-semibold">{{ t("guide_title") }}</h3>
          <p class="mt-1 text-sm">{{ t("guide_summary") }}</p>
          <router-link class="mt-3 inline-block font-semibold underline" to="/hydratacja-ciasta">{{ t("guide_link") }}</router-link>
        </aside>
      </section>
    </section>
    <article class="mx-auto max-w-3xl space-y-10 px-6 pb-12 sm:pb-16">
      <section aria-labelledby="calculator-method-heading">
        <h2 id="calculator-method-heading" class="text-2xl font-semibold">{{ t("method_title") }}</h2>
        <p class="mt-4">{{ t("method_text") }}</p>
      </section>

      <section aria-labelledby="hydration-calculator-faq-heading">
        <h2 id="hydration-calculator-faq-heading" class="text-2xl font-semibold">{{ t("faq_title") }}</h2>
        <div class="mt-5 divide-y divide-gray-300 border-y border-gray-300">
          <section v-for="item in ['formula', 'starter', 'percentage']" :key="item" class="py-5">
            <h3 class="font-semibold">{{ t(`faq_${item}_question`) }}</h3>
            <p class="mt-2">{{ t(`faq_${item}_answer`) }}</p>
          </section>
        </div>
      </section>
    </article>
    <NavigationBar />
  </main>
</template>

<i18n lang="yaml">
en:
  title: Bread hydration calculator
  subtitle: Set the hydration for yeasted or sourdough bread and get the exact ingredient weights.
  settings: Dough settings
  bake_type: Bread type
  sourdough: Sourdough bread
  yeast: Yeasted bread
  flour: Total flour (g)
  hydration: Final dough hydration
  sourdough_hint: Higher hydration helps create a more open crumb.
  yeast_hint: Start at 65% for an easy-to-handle dough.
  sourdough_settings: Starter parameters
  sourdough_hydration: Sourdough hydration
  sourdough_percentage: Starter amount
  sourdough_amount_hint: "This is {amount} g of starter."
  sourdough_ratio: "In this starter: {flour} g flour and {water} g water."
  salt: Salt
  reset: Reset settings
  ingredients: Your ingredients
  recipe_for: "For {flour} g of flour at {hydration}% hydration"
  flour_to_add: Flour to add
  water_to_add: Water to add
  sourdough_amount: Ripe sourdough starter
  sourdough_note_title: Included in the starter
  sourdough_note: "The starter contains {flour} g flour and {water} g water. These amounts are already deducted above."
  guide_title: What is dough hydration?
  guide_summary: Learn how hydration affects dough and find typical ranges for bread, pizza and sourdough baking.
  guide_link: Read the hydration guide
  method_title: How the hydration calculator works
  method_text: Hydration is the ratio of all water to all flour, expressed as a percentage. For sourdough dough, this calculator includes the flour and water already contained in the starter before showing the ingredients to add.
  faq_title: Hydration calculator FAQ
  faq_formula_question: How is hydration calculated?
  faq_formula_answer: Divide the total water by the total flour and multiply by 100. Include the water and flour in the starter when you bake with sourdough.
  faq_starter_question: Why does the calculator subtract flour and water from the starter?
  faq_starter_answer: Starter is made from flour and water. Its contribution is already part of the total recipe, so subtracting it prevents adding the same ingredients twice.
  faq_percentage_question: What hydration percentage should I choose?
  faq_percentage_answer: Start around 65% for yeasted dough or 70% for sourdough, then adjust in small steps based on flour, technique, and the result you want.
pl:
  title: Kalkulator hydratacji chleba
  subtitle: Ustaw hydratację wypieku na zakwasie lub drożdżach i poznaj dokładne ilości składników.
  settings: Ustawienia ciasta
  bake_type: Rodzaj wypieku
  sourdough: Wypiek na zakwasie
  yeast: Wypiek na drożdżach
  flour: Całkowita ilość mąki (g)
  hydration: Hydratacja ciasta
  sourdough_hint: Wyższa hydratacja pomaga uzyskać bardziej otwarty miękisz.
  yeast_hint: Zacznij od 65%, aby ciasto było łatwe w obróbce.
  sourdough_settings: Parametry zakwasu
  sourdough_hydration: Hydratacja zakwasu
  sourdough_percentage: Ilość zakwasu
  sourdough_amount_hint: "To odpowiada {amount} g zakwasu."
  sourdough_ratio: "W tym zakwasie: {flour} g mąki i {water} g wody."
  salt: Sól
  reset: Przywróć ustawienia
  ingredients: Twoje składniki
  recipe_for: "Na {flour} g mąki i {hydration}% hydratacji"
  flour_to_add: Mąka do dodania
  water_to_add: Woda do dodania
  sourdough_amount: Dojrzały zakwas
  sourdough_note_title: Skład zakwasu
  sourdough_note: "Zakwas zawiera {flour} g mąki i {water} g wody. Te ilości zostały już odjęte powyżej."
  guide_title: Czym jest hydratacja ciasta?
  guide_summary: Dowiedz się, jak hydratacja wpływa na ciasto i poznaj typowe wartości dla chleba, pizzy oraz wypieków na zakwasie.
  guide_link: Przeczytaj poradnik o hydratacji
  method_title: Jak działa kalkulator hydratacji?
  method_text: Hydratacja to stosunek całej wody do całej mąki, wyrażony w procentach. W cieście na zakwasie kalkulator uwzględnia mąkę i wodę zawarte już w zakwasie, zanim pokaże składniki do dodania.
  faq_title: Pytania o kalkulator hydratacji
  faq_formula_question: Jak oblicza się hydratację?
  faq_formula_answer: Podziel całkowitą ilość wody przez całkowitą ilość mąki i pomnóż wynik przez 100. Przy wypieku na zakwasie uwzględnij wodę i mąkę znajdujące się w zakwasie.
  faq_starter_question: Dlaczego kalkulator odejmuje mąkę i wodę z zakwasu?
  faq_starter_answer: Zakwas składa się z mąki i wody. Jego skład jest już częścią całej receptury, więc odjęcie tych ilości zapobiega podwójnemu dodaniu składników.
  faq_percentage_question: Jaką hydratację wybrać?
  faq_percentage_answer: Zacznij od około 65% dla ciasta drożdżowego lub 70% dla ciasta na zakwasie, a potem zmieniaj wartość małymi krokami zależnie od mąki, techniki i oczekiwanego efektu.
</i18n>