<script setup lang="ts">
import { computed, ref } from "vue";
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import NavigationBar from "../components/NavigationBar.vue";
import { canonicalUrl } from "../seo";
import { filterRecipes, getRecipeImage, getRecipeImageSrcSet, recipes } from "../recipes";

const { locale, t } = useI18n({ inheritLocale: true });
const search = ref("");
const selectedCategory = ref("");
const language = computed(() => locale.value === "en" ? "en" : "pl");
const categories = computed(() => [
  ...new Set(recipes.map((recipe) => recipe.category[language.value])),
]);
const visibleRecipes = computed(() =>
  filterRecipes(search.value, language.value, selectedCategory.value),
);

useHead({
  title: "Przepisy na domowe pieczywo | Just Bread",
  meta: [
    {
      name: "description",
      content: "Odkryj przepisy na domowe pieczywo, pizzę i zakwas. Wyszukuj i piecz krok po kroku z Just Bread.",
    },
  ],
  link: [{ rel: "canonical", href: canonicalUrl("/recipes") }],
});
</script>

<template>
  <main class="min-h-screen bg-whtite_gray text-[#2b2118]">
    <header class="relative isolate overflow-hidden bg-[#2b2118] px-6 py-16 text-white sm:py-24">
      <picture>
        <source
          type="image/avif"
          :srcset="getRecipeImageSrcSet('assets/recipes/daily-wheat-bread-02.jpeg', 'avif')"
          sizes="100vw"
        />
        <img
          :src="getRecipeImage('assets/recipes/daily-wheat-bread-02.jpeg')"
          :srcset="getRecipeImageSrcSet('assets/recipes/daily-wheat-bread-02.jpeg', 'jpg')"
          sizes="100vw"
          alt=""
          class="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
        />
      </picture>
      <div class="absolute inset-0 -z-10 bg-gradient-to-r from-[#21180f]/95 via-[#21180f]/75 to-[#21180f]/20" />
      <div class="mx-auto max-w-6xl">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{{ t("eyebrow") }}</p>
        <h1 class="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
          {{ t("title") }}
        </h1>
        <p class="mt-5 max-w-2xl text-lg text-white/85 sm:text-xl">{{ t("lead") }}</p>
        <p class="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm text-white/90">
          <span aria-hidden="true">✦</span>
          {{ t("recipe_count", { count: recipes.length }) }}
        </p>
      </div>
    </header>

    <section class="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14" aria-labelledby="recipe-list-heading">
      <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-[#9b6a27]">{{ t("collection") }}</p>
          <h2 id="recipe-list-heading" class="mt-2 text-3xl font-semibold sm:text-4xl">{{ t("heading") }}</h2>
        </div>
        <label class="relative block w-full sm:max-w-sm">
          <span class="sr-only">{{ t("search_label") }}</span>
          <span aria-hidden="true" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray_dark">⌕</span>
          <input
            v-model="search"
            type="search"
            class="w-full rounded-2xl border border-[#e8dfd1] bg-white py-3.5 pl-12 pr-4 text-base outline-none transition placeholder:text-[#93877b] focus:border-[#b98232] focus:ring-2 focus:ring-gold/30"
            :placeholder="t('search_placeholder')"
          />
        </label>
      </div>

      <div class="mt-7 flex gap-2 overflow-x-auto pb-2" :aria-label="t('filter_categories')">
        <button
          type="button"
          class="shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition"
          :class="selectedCategory === '' ? 'border-[#2b2118] bg-[#2b2118] text-white' : 'border-[#e8dfd1] bg-white text-[#5d5146] hover:border-[#b98232]'"
          @click="selectedCategory = ''"
        >{{ t("all_categories") }}</button>
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          class="shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition"
          :class="selectedCategory === category ? 'border-[#2b2118] bg-[#2b2118] text-white' : 'border-[#e8dfd1] bg-white text-[#5d5146] hover:border-[#b98232]'"
          @click="selectedCategory = selectedCategory === category ? '' : category"
        >{{ category }}</button>
      </div>

      <p class="mt-5 text-sm text-gray_dark" aria-live="polite">
        {{ t("results", { count: visibleRecipes.length }) }}
      </p>

      <div v-if="visibleRecipes.length" class="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="recipe in visibleRecipes"
          :key="recipe.id"
          :to="`/recipes/${recipe.id}`"
          class="group overflow-hidden rounded-3xl border border-[#eee7dd] bg-white shadow-[0_8px_28px_rgba(50,35,20,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(50,35,20,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b6a27]"
        >
          <div class="relative aspect-[4/3] overflow-hidden bg-gray">
            <picture>
              <source
                type="image/avif"
                :srcset="getRecipeImageSrcSet(recipe.image, 'avif')"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <img
                :src="getRecipeImage(recipe.image)"
                :srcset="getRecipeImageSrcSet(recipe.image, 'jpg')"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                :alt="recipe.title[language]"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </picture>
            <span class="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#735322]">
              {{ recipe.category[language] }}
            </span>
          </div>
          <div class="p-5 sm:p-6">
            <h3 class="text-xl font-semibold leading-snug group-hover:text-[#8b5c1c]">{{ recipe.title[language].trim() }}</h3>
            <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray_dark">
              <span class="inline-flex items-center gap-1.5"><span aria-hidden="true">◷</span>{{ recipe.totalTime[language] }}</span>
              <span class="inline-flex items-center gap-1.5"><span aria-hidden="true">✦</span>{{ recipe.difficulty[language] }}</span>
              <span class="inline-flex items-center gap-1.5"><span aria-hidden="true">★</span>{{ recipe.rating }}/5</span>
            </div>
            <span class="mt-5 inline-flex items-center gap-2 font-semibold text-[#8b5c1c]">
              {{ t("view_recipe") }} <span aria-hidden="true" class="transition group-hover:translate-x-1">→</span>
            </span>
          </div>
        </RouterLink>
      </div>

      <div v-else class="mt-5 rounded-3xl border border-dashed border-[#d8cbbb] bg-white px-6 py-14 text-center">
        <p class="text-xl font-semibold">{{ t("empty_title") }}</p>
        <p class="mt-2 text-gray_dark">{{ t("empty_description") }}</p>
        <button
          type="button"
          class="mt-5 font-semibold text-[#8b5c1c] underline underline-offset-4"
          @click="search = ''; selectedCategory = ''"
        >{{ t("clear_filters") }}</button>
      </div>
    </section>

    <NavigationBar />
  </main>
</template>

<i18n lang="yaml">
en:
  eyebrow: Just Bread · recipe collection
  title: A little more joy in every bake.
  lead: Find your next loaf, pizza or sourdough starter and follow each recipe one step at a time.
  recipe_count: "{count} carefully prepared recipes"
  collection: From our kitchen
  heading: Find a recipe
  search_label: Search recipes
  search_placeholder: Search by name or ingredient…
  filter_categories: Filter by recipe category
  all_categories: All recipes
  results: "{count} recipes"
  view_recipe: View recipe
  empty_title: No recipes found
  empty_description: Try another name, ingredient or category.
  clear_filters: Clear filters
pl:
  eyebrow: Just Bread · kolekcja przepisów
  title: Więcej radości w każdym wypieku.
  lead: Znajdź swój kolejny chleb, pizzę lub zakwas i przejdź przez każdy przepis krok po kroku.
  recipe_count: "{count} sprawdzonych przepisów"
  collection: Z naszej kuchni
  heading: Znajdź przepis
  search_label: Szukaj przepisów
  search_placeholder: Szukaj po nazwie lub składniku…
  filter_categories: Filtruj według kategorii przepisu
  all_categories: Wszystkie przepisy
  results: "Przepisów: {count}"
  view_recipe: Zobacz przepis
  empty_title: Nie znaleziono przepisów
  empty_description: Spróbuj wpisać inną nazwę, składnik lub kategorię.
  clear_filters: Wyczyść filtry
</i18n>
