<script setup lang="ts">
import { computed } from "vue";
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import NavigationBar from "../components/NavigationBar.vue";
import { canonicalUrl } from "../seo";
import { getRecipeImage, recipes } from "../recipes";

const props = defineProps<{ recipeId: number }>();
const { locale, t } = useI18n({ inheritLocale: true });
const language = computed(() => locale.value === "en" ? "en" : "pl");
const recipe = computed(() => recipes.find((item) => item.id === props.recipeId));

useHead(() => ({
  title: recipe.value
    ? `${recipe.value.title[language.value].trim()} | Just Bread`
    : `${t("not_found")} | Just Bread`,
  meta: [{
    name: "description",
    content: recipe.value
      ? `${recipe.value.title[language.value].trim()} — ${recipe.value.category[language.value]}. ${t("meta_description")}`
      : t("not_found_description"),
  }],
  link: [{ rel: "canonical", href: canonicalUrl(`/recipes/${props.recipeId}`) }],
}));
</script>

<template>
  <main class="min-h-screen bg-whtite_gray text-[#2b2118]">
    <section v-if="recipe" class="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <RouterLink to="/recipes" class="inline-flex items-center gap-2 font-semibold text-[#80571f] hover:underline">
        <span aria-hidden="true">←</span>{{ t("back_to_recipes") }}
      </RouterLink>

      <article class="mt-6 overflow-hidden rounded-3xl border border-[#eee7dd] bg-white shadow-[0_12px_40px_rgba(50,35,20,0.08)]">
        <header class="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div class="relative min-h-64 bg-gray sm:min-h-96">
            <img
              :src="getRecipeImage(recipe.image)"
              :alt="recipe.title[language].trim()"
              class="absolute inset-0 h-full w-full object-cover"
              fetchpriority="high"
            />
          </div>
          <div class="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <p class="text-sm font-semibold uppercase tracking-[0.16em] text-[#9b6a27]">{{ recipe.category[language] }}</p>
            <h1 class="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">{{ recipe.title[language].trim() }}</h1>
            <div class="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div class="rounded-2xl bg-[#faf6f0] p-4">
                <p class="text-xs font-semibold uppercase tracking-wide text-gray_dark">{{ t("total_time") }}</p>
                <p class="mt-1 font-semibold">{{ recipe.totalTime[language] }}</p>
              </div>
              <div class="rounded-2xl bg-[#faf6f0] p-4">
                <p class="text-xs font-semibold uppercase tracking-wide text-gray_dark">{{ t("difficulty") }}</p>
                <p class="mt-1 font-semibold">{{ recipe.difficulty[language] }}</p>
              </div>
              <div class="rounded-2xl bg-[#faf6f0] p-4">
                <p class="text-xs font-semibold uppercase tracking-wide text-gray_dark">{{ t("rating") }}</p>
                <p class="mt-1 font-semibold">★ {{ recipe.rating }}/5</p>
              </div>
            </div>
            <a
              v-if="recipe.videoUrl"
              :href="recipe.videoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-3 font-semibold text-[#302313] transition hover:bg-[#f2a900]"
            >{{ t("watch_video") }} <span aria-hidden="true">↗</span></a>
          </div>
        </header>

        <div class="grid gap-10 border-t border-[#eee7dd] p-6 sm:p-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14 lg:p-12">
          <section aria-labelledby="ingredients-heading">
            <h2 id="ingredients-heading" class="text-2xl font-semibold">{{ t("ingredients") }}</h2>
            <ul class="mt-5 divide-y divide-[#eee7dd]">
              <li v-for="ingredient in recipe.ingredients" :key="`${ingredient.name[language]}-${ingredient.amount}`" class="flex gap-3 py-3">
                <span class="min-w-16 font-semibold text-[#80571f]">{{ ingredient.amount }} {{ ingredient.unit[language] }}</span>
                <span>{{ ingredient.name[language] }}</span>
              </li>
            </ul>
          </section>

          <section aria-labelledby="method-heading">
            <h2 id="method-heading" class="text-2xl font-semibold">{{ t("method") }}</h2>
            <ol class="mt-5 space-y-6">
              <li v-for="(step, index) in recipe.steps" :key="step.id" class="relative flex gap-4">
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold font-semibold text-[#302313]">{{ index + 1 }}</span>
                <div class="min-w-0 border-b border-[#eee7dd] pb-6">
                  <h3 class="text-lg font-semibold">{{ step.title[language] }}</h3>
                  <p class="mt-2 inline-flex rounded-full bg-[#faf2e4] px-3 py-1 text-sm font-semibold text-[#80571f]">
                    {{ step.waitTime[language] ? `${t("waiting_time")}: ${step.waitTime[language]}` : t("no_wait") }}
                  </p>
                  <p class="mt-3 whitespace-pre-line leading-relaxed text-[#51473e]">{{ step.text[language] }}</p>
                </div>
              </li>
            </ol>
          </section>
        </div>

        <section v-if="recipe.images.length" class="border-t border-[#eee7dd] px-6 py-8 sm:px-10 lg:px-12" :aria-label="t('gallery')">
          <h2 class="text-2xl font-semibold">{{ t("gallery") }}</h2>
          <div class="mt-5 flex snap-x gap-4 overflow-x-auto pb-3">
            <img
              v-for="(image, index) in recipe.images"
              :key="image"
              :src="getRecipeImage(image)"
              :alt="`${recipe.title[language].trim()} — ${t('photo')} ${index + 1}`"
              class="h-48 w-64 shrink-0 snap-start rounded-2xl object-cover sm:h-56 sm:w-80"
              loading="lazy"
            />
          </div>
        </section>

        <p v-if="recipe.author" class="border-t border-[#eee7dd] px-6 py-5 text-sm text-gray_dark sm:px-10 lg:px-12">
          {{ t("author") }}: {{ recipe.author }}
        </p>
      </article>

      <RouterLink to="/recipes" class="mt-8 inline-flex items-center gap-2 font-semibold text-[#80571f] hover:underline">
        <span aria-hidden="true">←</span>{{ t("back_to_recipes") }}
      </RouterLink>
    </section>

    <section v-else class="mx-auto max-w-3xl px-6 py-24 text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.16em] text-[#9b6a27]">Just Bread</p>
      <h1 class="mt-3 text-3xl font-semibold">{{ t("not_found") }}</h1>
      <p class="mt-3 text-gray_dark">{{ t("not_found_description") }}</p>
      <RouterLink to="/recipes" class="mt-6 inline-flex rounded-full bg-gold px-5 py-3 font-semibold">{{ t("back_to_recipes") }}</RouterLink>
    </section>

    <NavigationBar />
  </main>
</template>

<i18n lang="yaml">
en:
  back_to_recipes: All recipes
  total_time: Total time
  difficulty: Difficulty
  rating: Rating
  watch_video: Watch the recipe video
  ingredients: Ingredients
  method: Method
  waiting_time: Waiting time
  no_wait: No waiting required
  gallery: Recipe photos
  photo: photo
  author: Recipe by
  not_found: Recipe not found
  not_found_description: This recipe may have moved. Browse the full recipe collection to find something to bake.
  meta_description: Complete ingredients and step-by-step instructions.
pl:
  back_to_recipes: Wszystkie przepisy
  total_time: Łączny czas
  difficulty: Poziom trudności
  rating: Ocena
  watch_video: Zobacz film z przepisem
  ingredients: Składniki
  method: Przygotowanie
  waiting_time: Czas oczekiwania
  no_wait: Bez oczekiwania
  gallery: Zdjęcia przepisu
  photo: zdjęcie
  author: Przepis
  not_found: Nie znaleziono przepisu
  not_found_description: Ten przepis mógł zostać przeniesiony. Zobacz wszystkie przepisy i wybierz coś do upieczenia.
  meta_description: Kompletna lista składników i instrukcja krok po kroku.
</i18n>
