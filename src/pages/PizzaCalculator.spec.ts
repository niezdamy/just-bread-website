import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";
import PizzaCalculator from "./PizzaCalculator.vue";

function mountCalculator() {
  const i18n = createI18n({
    legacy: false,
    locale: "pl",
    messages: { pl: {} },
  });

  return mount(PizzaCalculator, {
    global: {
      plugins: [i18n],
      stubs: { NavigationBar: true },
    },
  });
}

describe("PizzaCalculator", () => {
  it("keeps rendering zero ingredient amounts when the portions field is cleared", async () => {
    const wrapper = mountCalculator();

    await wrapper.get('input[type="number"]').setValue("");

    expect(wrapper.findAll("dd").map((element) => element.text())).toEqual(["0.0 g", "0.0 g", "0.0 g", "0.0 g"]);
  });
});