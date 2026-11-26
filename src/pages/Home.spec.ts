import { mount } from "@vue/test-utils";
import { createHead } from "@unhead/vue/client";
import { describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";
import Home from "./Home.vue";

function mountHome(locale: "en" | "pl" = "pl") {
  const i18n = createI18n({
    legacy: false,
    locale,
    messages: { en: {}, pl: {} },
  });

  return mount(Home, {
    global: {
      plugins: [i18n, createHead()],
      stubs: {
        DownloadButtons: true,
        NavigationBar: true,
        RouterLink: {
          props: ["to"],
          template: '<a :href="to"><slot /></a>',
        },
      },
    },
  });
}

describe("Home", () => {
  it("links to the recipe list and pizza calculator with descriptive Polish copy", () => {
    const wrapper = mountHome();

    expect(wrapper.get('a[href="/recipes"]').text()).toContain("Zobacz listę przepisów");
    expect(wrapper.get('a[href="/pizza-calculator"]').text()).toContain("Otwórz kalkulator pizzy");
    expect(wrapper.text()).toContain("Kalkulator ciasta na pizzę neapolitańską");
  });

  it("localizes the recipe and pizza links in English", () => {
    const wrapper = mountHome("en");

    expect(wrapper.get('a[href="/recipes"]').text()).toContain("Browse all recipes");
    expect(wrapper.get('a[href="/pizza-calculator"]').text()).toContain("Open the pizza calculator");
  });
});
