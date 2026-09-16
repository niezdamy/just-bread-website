<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  inheritLocale: true
})

</script>

<template>
  <div class="flex flex-wrap justify-center bg-white font-semibold">
    <router-link to="/">
      <p class="m-4 sm:m-8" :class="$route.path == '/' ? 'font-bold' : 'font-semibold'"> {{ t('home') }}</p>
    </router-link>
    <router-link to="/pizza-calculator">
      <p class="m-4 sm:m-8" :class="$route.path == '/pizza-calculator' ? 'font-bold' : 'font-semibold'"> {{ t('pizzaCalculator') }}</p>
    </router-link>
    <router-link to="/faq">
      <p class="m-4 sm:m-8" :class="$route.path == '/faq' ? 'font-bold' : 'font-semibold'"> {{ t('faq') }}</p>
    </router-link>
    <router-link to="/contact">
      <p class="m-4 sm:m-8" :class="$route.path == '/contact' ? 'font-bold' : 'font-semibold'"> {{ t('contact') }}</p>
    </router-link>
    <router-link to="/privacy">
      <p class="m-4 sm:m-8" :class="$route.path == '/privacy' ? 'font-bold' : 'font-semibold'">{{ t('privacyPolicy') }}
      </p>
    </router-link>
    <a href="https://www.instagram.com/justbreadapp/"> <img class="m-4 sm:m-8" src="../assets/instagram.svg" /> </a>
  </div>
</template>

<i18n lang="yaml">
  en:
    home: Home
    pizzaCalculator: Pizza calculator
    faq: FAQ
    contact: Contact
    privacyPolicy: Privacy Policy

  pl:
    home: Strona Główna
    pizzaCalculator: Kalkulator pizzy
    faq: FAQ
    contact: Kontakt
    privacyPolicy: Polityka Prywatności
</i18n>
