<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import NavigationBar from "../components/NavigationBar.vue";

const { t } = useI18n({ inheritLocale: true });

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
    <NavigationBar />
  </main>
</template>

<i18n lang="yaml">
en:
  title: Neapolitan pizza calculator
  subtitle: Calculate the proportions for a light, airy pizza dough.
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
  recipe_for: "For {count} dough balls of {weight} g each"
  flour: Flour type 00
  water: Water
  salt: Salt
  yeast_amount: "{type}"
  tip_title: A simple timing guide
  tip: Let the dough rest at room temperature for 2 hours, then refrigerate it for 18-24 hours. Remove it 1-2 hours before baking.
pl:
  title: Kalkulator pizzy neapolitańskiej
  subtitle: Oblicz proporcje na lekkie i puszyste ciasto do pizzy.
  settings: Ustawienia ciasta
  portions: Liczba pizz
  ball_weight: Waga kulki ciasta
  hydration: Hydratacja
  hydration_hint: 65% to dobry punkt wyjścia do ręcznego formowania ciasta.
  yeast: Rodzaj drożdży
  fresh_yeast: Drożdże świeże
  dry_yeast: Drożdże suszone
  reset: Przywróć ustawienia
  neapolitan: Pizza neapolitańska
  recipe: Twoje składniki
  recipe_for: "Na {count} kulki ciasta po {weight} g"
  flour: Mąka typu 00
  water: Woda
  salt: Sól
  yeast_amount: "{type}"
  tip_title: Prosty plan fermentacji
  tip: Zostaw ciasto na 2 godziny w temperaturze pokojowej, a następnie włóż je do lodówki na 18-24 godziny. Wyjmij 1-2 godziny przed pieczeniem.
</i18n>