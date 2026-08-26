
<script setup lang="ts">
import { captureEvent } from "../analytics";
</script>

<template>
  <div class="flex">
    <a
      class="mt-2"
      href="https://apps.apple.com/pl/app/just-bread/id1537955145?l=pl"
      @click="captureEvent('download_store_clicked', { store: 'apple' })"
    >
      <img class="mr-2" src="../assets/app_store_download.svg" alt="Pobierz z App Store" />
    </a>
    <a
      href="https://play.google.com/store/apps/details?id=app.JustBread&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
      @click="captureEvent('download_store_clicked', { store: 'google_play' })"
    >
      <img
        class="h-14"
        alt="Get it on Google Play"
        src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
      />
    </a>
  </div>
</template>
