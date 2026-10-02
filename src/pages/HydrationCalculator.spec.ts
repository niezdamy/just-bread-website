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
  it("deducts the flour and water contained in the default 20% starter", () => {
    const wrapper = mountCalculator();
    const ingredientAmounts = wrapper.findAll("dd").map((element) => element.text());

    expect(ingredientAmounts).toEqual(["450 g", "325 g", "100 g", "10 g"]);
    expect(wrapper.text()).toContain("Zakwas zawiera 50 g mąki i 50 g wody");
    expect(wrapper.find('[data-testid="sourdough-settings-panel"]').exists()).toBe(false);
  });

  it("recalculates the added ingredients after changing the starter percentage", async () => {
    const wrapper = mountCalculator();

    await wrapper.get('[data-testid="sourdough-percentage"]').setValue(30);

    expect(wrapper.findAll("dd").map((element) => element.text())).toEqual(["425 g", "300 g", "150 g", "10 g"]);
  });

  it("keeps rendering when a numeric input is cleared", async () => {
    const wrapper = mountCalculator();

    await wrapper.get('[data-testid="flour-amount"]').setValue("");
    expect(wrapper.findAll("dd").map((element) => element.text())).toEqual(["0.0 g", "0.0 g", "0.0 g", "0.0 g"]);
  });

  it("shows starter hydration controls from the parameters button", async () => {
    const wrapper = mountCalculator();

    await wrapper.get('[data-testid="sourdough-settings-toggle"]').trigger("click");

    expect(wrapper.get('[data-testid="sourdough-settings-toggle"]').attributes("aria-expanded")).toBe("true");
    expect(wrapper.get('[data-testid="sourdough-settings-panel"]').text()).toContain("Hydratacja zakwasu");
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