
<script setup lang="ts">
import { useHead } from "@unhead/vue";

import NavigationBar from "../components/NavigationBar.vue";
import { canonicalUrl } from "../seo";

useHead({
  title: "Kontakt | Just Bread",
  meta: [{ name: "description", content: "Skontaktuj się z zespołem aplikacji Just Bread." }],
  link: [{ rel: "canonical", href: canonicalUrl("/contact") }],
});
</script>

<template>
  <main class="min-h-screen bg-whtite_gray text-gray_dark">
    <header class="bg-gold px-6 py-14 text-center text-gray_dark sm:py-20">
      <p class="text-sm font-semibold uppercase tracking-widest">Just Bread</p>
      <h1 class="mt-3 text-3xl font-semibold sm:text-4xl">Kontakt</h1>
    </header>
    <section class="mx-auto max-w-3xl px-6 py-12 sm:py-16" aria-labelledby="contact-heading">
      <h2 id="contact-heading" class="text-2xl font-semibold">Napisz do nas</h2>
      <p class="mt-4">Masz pytanie o aplikację, przepis lub potrzebujesz pomocy? Skontaktuj się z nami e-mailem.</p>
      <a class="mt-6 inline-block font-semibold underline" href="mailto:justbreadapp@gmail.com">justbreadapp@gmail.com</a>
    </section>
    <NavigationBar />
  </main>
</template>