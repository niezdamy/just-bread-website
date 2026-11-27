import { mount } from "@vue/test-utils";
import { createHead } from "@unhead/vue/client";
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
      plugins: [i18n, createHead()],
      stubs: {
        NavigationBar: true,
        RouterLink: true,
      },
    },
  });
}

describe("PizzaCalculator", () => {
  it("keeps rendering zero ingredient amounts when the portions field is cleared", async () => {
    const wrapper = mountCalculator();

    await wrapper.get('input[type="number"]').setValue("");

    expect(wrapper.findAll("dd").map((element) => element.text())).toEqual(["0.0 g", "0.0 g", "0.0 g", "0.0 g"]);
  });

  it("uses the Roman tonda profile and includes olive oil", async () => {
    const wrapper = mountCalculator();

    await wrapper.get("#pizza-type").setValue("roman");

    expect(wrapper.findAll('input[type="range"]')[1].element).toHaveProperty("value", "58");
    expect(wrapper.findAll("dd").map((element) => element.text())).toEqual([
      "615 g",
      "357 g",
      "15 g",
      "12 g",
      "0.6 g",
    ]);
    expect(wrapper.get('[role="tooltip"]').text()).toContain("chrupiący");
  });
});