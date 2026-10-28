import { flushPromises, mount } from "@vue/test-utils";
import { createHead } from "@unhead/vue/client";
import { describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";
import RecipeDetail from "./RecipeDetail.vue";

function mountRecipeDetail() {
  const i18n = createI18n({
    legacy: false,
    locale: "pl",
    messages: { pl: {} },
  });

  return mount(RecipeDetail, {
    props: { recipeId: 5 },
    global: {
      plugins: [i18n, createHead()],
      stubs: {
        NavigationBar: true,
        RouterLink: true,
      },
    },
  });
}

describe("RecipeDetail", () => {
  it("opens a full-size photo preview and closes it with Escape", async () => {
    const wrapper = mountRecipeDetail();
    const photoButton = wrapper.get('button[aria-label="Powiększ zdjęcie 1"]');

    await photoButton.trigger("click");
    await flushPromises();

    expect(wrapper.get('[role="dialog"]').attributes("aria-modal")).toBe("true");
    expect(wrapper.get('[role="dialog"] img').attributes("alt")).toContain("zdjęcie 1");

    const tabEvent = new KeyboardEvent("keydown", { key: "Tab", cancelable: true });
    window.dispatchEvent(tabEvent);
    expect(tabEvent.defaultPrevented).toBe(true);

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the photo preview when its backdrop is clicked", async () => {
    const wrapper = mountRecipeDetail();

    await wrapper.get('button[aria-label="Powiększ zdjęcie 1"]').trigger("click");
    await wrapper.get('[role="dialog"]').trigger("click");

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it("closes the photo preview from the visible close button", async () => {
    const wrapper = mountRecipeDetail();

    await wrapper.get('button[aria-label="Powiększ zdjęcie 1"]').trigger("click");
    const closeButton = wrapper.get('[role="dialog"] button[aria-label="Zamknij podgląd zdjęcia"]');
    expect(closeButton.find("svg").exists()).toBe(true);

    await closeButton.trigger("click");

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });
});
