
<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { useI18n } from 'vue-i18n'
import DownloadButtons from '../components/DownloadButtons.vue'
import NavigationBar from '../components/NavigationBar.vue'
import { canonicalUrl } from "../seo";

const { t } = useI18n({
  inheritLocale: true
})

useHead({
  title: "Just Bread - domowe pieczenie chleba",
  meta: [
    { name: "description", content: "Just Bread to aplikacja z przepisami, kalkulatorem hydracji i wskazówkami do domowego pieczenia chleba." },
    { property: "og:title", content: "Just Bread - domowe pieczenie chleba" },
    { property: "og:description", content: "Przepisy i narzędzia, które prowadzą krok po kroku przez domowe pieczenie chleba." },
    { property: "og:type", content: "website" },
  ],
  link: [{ rel: "canonical", href: canonicalUrl("/") }],
});

</script>

<template>
  <main class="flex flex-col bg-whtite_gray">
    <div class=" flex flex-col justify-between items-center content-center sm:flex-row ">
      <div class="sm:ml-32 ">
        <img class="object-scale-down" src="../assets/Logo_Just_Bread.svg" alt="Just Bread" width="238" height="104" />
        <h1 class="mb-4 text-xl whitespace-pre-line">{{ t('welcome') }}</h1>
        <download-buttons></download-buttons>
      </div>
      <img class="object-scale-down max-h-96 my-8 sm:max-h-full" src="../assets/home_1.png" :alt="t('home_screen_alt')" width="440" height="700" fetchpriority="high" />
    </div>

    <img class="object-scale-down" src="../assets/home_2.png" :alt="t('sourdough_bread_alt')" width="1360" height="440" loading="lazy" />

    <div class="flex flex-col w-full justify-center sm:flex-row">
      <div class="flex flex-col m-16 mt-8 mb-0 justify-center">
        <div class="flex flex-col bg-gray p-12 rounded-3xl justify-center items-center">
          <img class="object-scale-down" src="../assets/home_phone_1.png" :alt="t('recipes_screen_alt')" width="330" height="670" loading="lazy" />
          <p class="mt-8 text-center text-xl font-semibold">{{ t('phone_screen_1_description') }}</p>
        </div>
        <img class="object-scale-down my-4" src="../assets/home_3.png" :alt="t('bread_preparation_alt')" width="440" height="700" loading="lazy" />

        <div class="flex flex-col w-full p-4 bg-gold rounded-3xl">
          <div class="flex items-center">
            <img class="object-scale-down m-2 w-12 h-12" src="../assets/logo_white.svg" alt="" width="48" height="48" loading="lazy" />
            <div class="flex mr-4 my-2 w-full justify-between text-lg font-semibold text-gray_dark">
              <p class="">JUSTBREAD</p>
              <p>{{ t('modal1_text3') }}</p>
            </div>
          </div>
          <p class="ml-2 text-2xl font-semibold">{{ t('modal1_text1') }}</p>
          <p class="ml-2 my-2 text-lg">{{ t('modal1_text2') }}</p>
        </div>
        <p class="my-12 w-full whitespace-pre-wrap text-2xl">{{ t('modal2_text') }}</p>
      </div>

      <div class="flex flex-col mt-8 mb-0 ">
        <h2 class="pb-8 font-semibold text-5xl whitespace-pre-wrap">{{ t('text_1') }}</h2>
        <p class="pt-0 text-2xl whitespace-pre-wrap">{{ t('text_2') }}</p>

        <img class="object-scale-down my-24" src="../assets/home_4.png" :alt="t('home_baking_alt')" width="555" height="350" loading="lazy" />

        <div class="flex w-full justify-center mb-8 sm:justify-end sm:mb-0">
          <div class="flex flex-col bg-gray p-12 rounded-3xl justify-center items-center">
            <img class="object-scale-down" src="../assets/home_phone_2.png" :alt="t('knowledge_screen_alt')" width="330" height="670" loading="lazy" />
            <p class="mt-8 text-center text-xl font-semibold">{{ t('phone_screen_2_description') }}</p>
          </div>
        </div>
      </div>
    </div>

    <section class="h-96 mb-8 bg-[url('./assets/home_5.avif')] bg-center bg-cover rounded-3xl" :aria-label="t('baking_section_alt')">
      <div class="flex flex-col w-full h-full justify-center items-center text-white">
        <p class="text-xl font-semibold">{{ t('modal7_text_1') }}</p>
        <p class="my-2 text-4xl font-semibold">{{ t('modal7_text_2') }}</p>
        <download-buttons></download-buttons>
      </div>
    </section>

    <div class="flex mb-8 justify-between w-full overflow-auto ">
      <div class="flex flex-col bg-gray m-2 p-8 rounded-3xl justify-center items-center">
        <img class="object-scale-down" src="../assets/home_phone_3.png" :alt="t('hydration_screen_alt')" width="330" height="670" loading="lazy" />
        <p class="mt-8 text-center text-xl font-semibold">{{ t('phone_screen_3_description') }}</p>
      </div>
      <div class="flex flex-col bg-gray m-2 p-8 rounded-3xl justify-center items-center">
        <img class="object-scale-down" src="../assets/home_phone_4.png" :alt="t('timer_screen_alt')" width="330" height="670" loading="lazy" />
        <p class="mt-8 text-center text-xl font-semibold">{{ t('phone_screen_4_description') }}</p>
      </div>
      <div class="flex flex-col bg-gray m-2 p-8 rounded-3xl justify-center items-center">
        <img class="object-scale-down" src="../assets/home_phone_5.png" :alt="t('healthy_recipe_screen_alt')" width="330" height="670" loading="lazy" />
        <p class="mt-8 text-center text-xl font-semibold">{{ t('phone_screen_5_description') }}</p>
      </div>
    </div>

    <div class="flex justify-center text-center">
      <p class="text-5xl my-8 font-semibold text-gold whitespace-pre-wrap "> {{ t('modal3_text') }}</p>
    </div>

    <div class="flex flex-col my-8 justify-center text-center sm:flex-row">

      <img class="object-scale-down" src="../assets/home_6.png" :alt="t('homemade_bakes_alt')" width="555" height="416" loading="lazy" />

      <div class="flex flex-col ml-4 bg-gold p-8 px-16 rounded-3xl justify-center">
        <p class="text-3xl font-semibold">{{ t('modal4_text_1') }} </p>
        <p class="text-lg">{{ t('modal4_text_2') }} </p>

        <p class="text-3xl mt-6 font-semibold">{{ t('modal4_text_3') }} </p>
        <p class="text-lg">{{ t('modal4_text_4') }} </p>

        <p class="text-3xl mt-6 font-semibold">{{ t('modal4_text_5') }}</p>
        <p class="text-lg"> {{ t('modal4_text_6') }}</p>
      </div>

    </div>
    <div class="flex w-full mb-8 justify-center bg-gray rounded-3xl">
      <p class="m-6 text-2xl whitespace-pre-line text-center"> {{ t('modal5_text') }}</p>
    </div>

    <div class="flex flex-col w-full justify-center sm:flex-row">

      <div class="flex flex-col justify-center items-center w-full text-center">
        <p class="w-full text-4xl whitespace-pre-wrap font-semibold">{{ t('modal6_text_1') }}</p>
        <p class="mt-12 text-3xl">{{ t('modal6_text_2') }}</p>
        <p class="mb-8 text-3xl">{{ t('modal6_text_3') }}</p>
        <download-buttons class="pb-8"></download-buttons>
      </div>
      <div class="flex flex-col bg-gray p-12  rounded-3xl justify-center items-center">
        <img class="object-scale-down" src="../assets/home_phone_6.png" :alt="t('app_home_screen_alt')" width="330" height="670" loading="lazy" />
        <p class="mt-8 text-center text-xl font-semibold">{{ t('phone_screen_6_description') }}</p>
      </div>
    </div>

    <div class="flex justify-between w-full overflow-auto scale-75 sm:scale-100 sm:my-8">
      <img class="mx-2" src="../assets/home_7.png" :alt="t('recipe_image_alt')" width="325" height="325" loading="lazy" />
      <img class="mr-2" src="../assets/home_8.png" :alt="t('recipe_image_alt')" width="325" height="325" loading="lazy" />
      <img class="mr-2" src="../assets/home_9.png" :alt="t('recipe_image_alt')" width="325" height="325" loading="lazy" />
      <img class="mr-2" src="../assets/home_10.png" :alt="t('recipe_image_alt')" width="325" height="325" loading="lazy" />
    </div>

    <navigation-bar></navigation-bar>

  </main>



</template>

<style scoped>

</style>

<i18n lang="yaml">
en:
  home_screen_alt: Just Bread app screen showing home-baking recipes
  sourdough_bread_alt: Homemade sourdough bread
  recipes_screen_alt: App screen showing a list of tried-and-tested recipes
  bread_preparation_alt: Preparing homemade bread
  home_baking_alt: Baking bread at home
  knowledge_screen_alt: The app's bread-baking guide
  baking_section_alt: Baking bread with Just Bread
  hydration_screen_alt: Hydration calculator in the Just Bread app
  timer_screen_alt: Baking timer in the Just Bread app
  healthy_recipe_screen_alt: Wholesome bread recipe in the Just Bread app
  homemade_bakes_alt: Homemade bakes made with Just Bread
  app_home_screen_alt: Just Bread app home screen
  recipe_image_alt: A recipe from the Just Bread app
  welcome: |
    Healthy, delicious bread
    at home
  phone_screen_1_description: Carefully selected, tried-and-tested recipes
  phone_screen_2_description: A guide to bread baking
  phone_screen_3_description: Simple hydration calculator
  phone_screen_4_description: Timer with notifications
  phone_screen_5_description: Simple recipes for wholesome baking
  phone_screen_6_description: The app's home screen
  modal1_text1: Easy as pie!
  modal1_text2: Take warm rolls straight from the oven.
  modal1_text3: Delicious!
  text_1: |
    Baking bread at home doesn't have to be difficult,
    even if you're just starting out!
  text_2: |
    The Just Bread app guides you
    through the whole process, step by step.
  modal2_text: |
    Baking is our passion. With Just Bread,
    you can make delicious pizza, sourdough bread
    and sweet treats.
  modal3_text: |
    More than 2,000 downloads
    on iOS and Android
  modal4_text_1: 75% of users
  modal4_text_2: are based abroad
  modal4_text_3: 42,000 interactions
  modal4_text_4: with the app on iOS
  modal4_text_5: 7 recipes
  modal4_text_6: currently available in the app
  modal5_text: |
    Just Bread ranked among the top 100 apps
    in the Food category on the App Store
  modal6_text_1: |
    Just Bread is an app for everyone
    who loves homemade baking.
  modal6_text_2: Rated 5/5 on the App Store
  modal6_text_3: Rated 4.5/5 on Google Play
  modal7_text_1: Hungry? What are you waiting for?
  modal7_text_2: Start baking with Just Bread!

pl:
  home_screen_alt: Ekran aplikacji Just Bread z przepisami na domowe pieczywo
  sourdough_bread_alt: Domowy chleb na zakwasie
  recipes_screen_alt: Ekran aplikacji z listą sprawdzonych przepisów
  bread_preparation_alt: Przygotowywanie domowego pieczywa
  home_baking_alt: Wypiekanie chleba w domu
  knowledge_screen_alt: Baza wiedzy o pieczeniu chleba w aplikacji
  baking_section_alt: Pieczenie chleba z Just Bread
  hydration_screen_alt: Kalkulator hydratacji w aplikacji Just Bread
  timer_screen_alt: Minutnik do pieczenia w aplikacji Just Bread
  healthy_recipe_screen_alt: Przepis na zdrowe pieczywo w aplikacji Just Bread
  homemade_bakes_alt: Domowe wypieki przygotowane z Just Bread
  app_home_screen_alt: Ekran główny aplikacji Just Bread
  recipe_image_alt: Przepis z aplikacji Just Bread
  welcome: |
    Zdrowy i pyszny chleb
    w Twoim domu
  phone_screen_1_description: Wybrane i sprawdzone przepisy
  phone_screen_2_description: Baza wiedzy o chlebie
  phone_screen_3_description: Prosty kalkulator hydratacji
  phone_screen_4_description: Minutnik w formie powiadomień
  phone_screen_5_description: Przejrzyste, łatwe i zdrowe przepisy
  phone_screen_6_description: Ekran główny aplikacji
  modal1_text1: Proste jak bułka z masłem!
  modal1_text2: Wyjmij ciepłe bułeczki z piekarnika.
  modal1_text3: Mniam!
  text_1: |
    Pieczenie domowego chleba
    nie musi być trudne!
    Nawet jeśli jesteś
    początkującym piekarzem!
  text_2: |
    Aplikacja Just Bread poprowadzi
    Cię krok po kroku przez cały proces.
  modal2_text: |
    Pieczenie to nasza pasja. Z Just Bread
    przygotujesz pyszną pizzę, chleb na zakwasie
    oraz słodkie przekąski.
  modal3_text: |
    Ponad 2000 pobrań aplikacji
    na iOS i Androida
  modal4_text_1: 75% użytkowników
  modal4_text_2: to użytkownicy z zagranicy
  modal4_text_3: 42 000 interakcji
  modal4_text_4: z aplikacją na iOS
  modal4_text_5: 7 przepisów
  modal4_text_6: dostępnych obecnie w aplikacji
  modal5_text: |
    Just Bread trafił do pierwszej setki aplikacji
    w kategorii Jedzenie i napoje w App Store!
  modal6_text_1: |
    Just Bread to aplikacja stworzona
    dla wszystkich miłośników
    domowych wypieków.
  modal6_text_2: Ocena 5/5 w App Store
  modal6_text_3: Ocena 4,5/5 w Google Play
  modal7_text_1: Masz apetyt? Na co czekasz?
  modal7_text_2: Zacznij piec z Just Bread!
</i18n>