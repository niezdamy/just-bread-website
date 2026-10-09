
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { captureEvent } from "../analytics";

const { t } = useI18n({ inheritLocale: true });
</script>

<template>
  <div class="flex">
    <a
      class="mt-2"
      href="https://apps.apple.com/pl/app/just-bread/id1537955145?l=pl"
      @click="captureEvent('download_store_clicked', { store: 'apple' })"
    >
      <img class="mr-2" src="../assets/app_store_download.svg" :alt="t('apple_badge_alt')" />
    </a>
    <a
      href="https://play.google.com/store/apps/details?id=app.JustBread&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
      @click="captureEvent('download_store_clicked', { store: 'google_play' })"
    >
      <img
        class="h-14"
        :alt="t('google_badge_alt')"
        src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
      />
    </a>
  </div>
</template>

<i18n lang="yaml">
en:
  apple_badge_alt: Download on the App Store
  google_badge_alt: Get it on Google Play
pl:
  apple_badge_alt: Pobierz z App Store
  google_badge_alt: Pobierz z Google Play
</i18n>
