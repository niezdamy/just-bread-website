<script setup lang="ts">
import { useHead } from "@unhead/vue";
import NavigationBar from "../components/NavigationBar.vue";
import { canonicalUrl } from "../seo";

useHead({
  title: "Hydratacja ciasta – co to jest i jak ją dobrać? | Just Bread",
  meta: [{ name: "description", content: "Dowiedz się, czym jest hydratacja ciasta, jak ją obliczyć i jakie wartości sprawdzają się w chlebie, pizzy, focacci i wypiekach na zakwasie." }],
  link: [{ rel: "canonical", href: canonicalUrl("/hydratacja-ciasta") }],
});
</script>

<template>
  <main class="min-h-screen bg-whtite_gray text-gray_dark">
    <header class="bg-gold px-6 py-14 text-center sm:py-20">
      <p class="text-sm font-semibold uppercase tracking-widest">Just Bread</p>
      <h1 class="mx-auto mt-3 max-w-3xl text-3xl font-semibold sm:text-4xl">Hydratacja ciasta – co to jest?</h1>
      <p class="mx-auto mt-4 max-w-2xl text-lg">Prosty wskaźnik, który pomaga przewidzieć konsystencję ciasta i dobrać ilość wody do wypieku.</p>
    </header>

    <article class="mx-auto max-w-3xl space-y-10 px-6 py-12 sm:py-16">
      <section>
        <h2 class="text-2xl font-semibold">Czym jest hydratacja ciasta?</h2>
        <p class="mt-4">Hydratacja określa, ile wody przypada na 100 g mąki. Ciasto o hydratacji 70% zawiera 70 g wody na każde 100 g mąki. To procent piekarski: mąka zawsze stanowi 100%, a woda jest liczona względem jej masy.</p>
        <p class="mt-4">Przy 500 g mąki i hydratacji 70% potrzebujesz 350 g wody. Wyższa wartość zwykle daje bardziej miękki, otwarty miękisz, ale ciasto staje się luźniejsze i wymaga lepszej techniki składania oraz formowania.</p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold">Jak obliczyć hydratację?</h2>
        <p class="mt-4">Podziel masę całej wody przez masę całej mąki, a następnie pomnóż wynik przez 100. Do obu wartości wlicz składniki znajdujące się w zakwasie.</p>
        <p class="mt-4 border-l-4 border-gold pl-5 font-semibold">hydratacja = (cała woda / cała mąka) x 100%</p>
        <p class="mt-4">Przykładowo, 100 g zakwasu o hydratacji 100% zawiera 50 g mąki i 50 g wody. Te ilości należy doliczyć do całej receptury, aby końcowy wynik był poprawny.</p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold">Najpopularniejsze hydratacje wypieków</h2>
        <div class="mt-5 overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead class="border-b-2 border-gray_dark">
              <tr>
                <th class="py-3 pr-5 font-semibold">Wypiek</th>
                <th class="py-3 pr-5 font-semibold">Typowy zakres</th>
                <th class="py-3 font-semibold">Charakterystyka</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr><td class="py-4 pr-5 font-semibold">Bułki i proste ciasto drożdżowe</td><td class="py-4 pr-5">55-65%</td><td class="py-4">Stabilne, łatwe do wyrabiania i formowania.</td></tr>
              <tr><td class="py-4 pr-5 font-semibold">Pizza</td><td class="py-4 pr-5">60-70%</td><td class="py-4">Elastyczne ciasto, wygodne do rozciągania.</td></tr>
              <tr><td class="py-4 pr-5 font-semibold">Chleb drożdżowy</td><td class="py-4 pr-5">65-75%</td><td class="py-4">Dobry punkt wyjścia do codziennego chleba.</td></tr>
              <tr><td class="py-4 pr-5 font-semibold">Chleb na zakwasie</td><td class="py-4 pr-5">70-80%</td><td class="py-4">Bardziej otwarty miękisz; wymaga składania ciasta.</td></tr>
              <tr><td class="py-4 pr-5 font-semibold">Focaccia i ciabatta</td><td class="py-4 pr-5">75-90%</td><td class="py-4">Bardzo wilgotne ciasto z dużymi pęcherzami powietrza.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-semibold">Od czego zacząć?</h2>
        <p class="mt-4">Jeśli dopiero zaczynasz, wybierz hydratację 65% dla wypieków drożdżowych albo 70% dla chleba na zakwasie. Zmieniaj ją małymi krokami, po 2–3 punkty procentowe. Rodzaj i świeżość mąki oraz sposób prowadzenia ciasta wpływają na to, ile wody rzeczywiście wchłonie.</p>
      </section>

      <aside class="border-l-4 border-gold bg-gray px-6 py-5">
        <h2 class="text-xl font-semibold">Oblicz składniki</h2>
        <p class="mt-2">Kalkulator hydratacji uwzględnia wodę i mąkę zawarte w zakwasie, a następnie podaje dokładne ilości składników do dodania.</p>
        <router-link class="mt-4 inline-block font-semibold underline" to="/hydration-calculator">Przejdź do kalkulatora hydratacji</router-link>
      </aside>
    </article>
    <NavigationBar />
  </main>
</template>