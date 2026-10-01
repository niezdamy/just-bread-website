import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";
import HydrationCalculator from "./HydrationCalculator.vue";

function mountCalculator() {
  const i18n = createI18n({
    legacy: false,
    locale: "pl",
    messages: { pl: {} },
  });

  return mount(HydrationCalculator, {
    global: {
      plugins: [i18n],
      stubs: { NavigationBar: true },
    },
  });
}

describe("HydrationCalculator", () => {
  it("deducts the flour and water contained in a 100% hydration starter", () => {
    const wrapper = mountCalculator();
    const ingredientAmounts = wrapper.findAll("dd").map((element) => element.text());

    expect(ingredientAmounts).toEqual(["400 g", "275 g", "200 g", "10 g"]);
    expect(wrapper.text()).toContain("Zakwas zawiera 100 g mąki i 100 g wody");
  });

  it("calculates a yeasted dough without including sourdough starter", async () => {
    const wrapper = mountCalculator();

    await wrapper.get('input[value="yeast"]').setValue();

    const ingredientAmounts = wrapper.findAll("dd").map((element) => element.text());
    expect(ingredientAmounts).toEqual(["500 g", "325 g", "10 g"]);
    expect(wrapper.findAll("dd")).toHaveLength(3);
    expect(wrapper.text()).not.toContain("Dojrzały zakwas");
  });
});