import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";
import App from "./App.vue";

function mountApp(locale: "en" | "pl" = "pl") {
  window.localStorage.clear();
  const i18n = createI18n({
    legacy: false,
    locale,
    messages: { en: {}, pl: {} },
  });

  return mount(App, {
    global: {
      plugins: [i18n],
      stubs: {
        "router-view": true,
        RouterLink: {
          props: ["to"],
          template: '<a :href="to"><slot /></a>',
        },
      },
    },
  });
}

describe("analytics consent", () => {
  it("offers clear consent choices and stores a decline", async () => {
    const wrapper = mountApp();
    const consent = wrapper.get('[role="region"][aria-describedby="analytics-consent-description"]');

    expect(consent.text()).toContain("Ty decydujesz o danych");
    expect(consent.text()).toContain("Odrzuć analitykę");
    expect(consent.text()).toContain("Zezwól na analitykę");

    await consent.get("button").trigger("click");

    expect(window.localStorage.getItem("just-bread-analytics-consent")).toBe("denied");
    expect(wrapper.find('[role="region"]').exists()).toBe(false);
    wrapper.unmount();
  });

  it("renders the consent choices in English", () => {
    const wrapper = mountApp("en");

    expect(wrapper.text()).toContain("Your choice, your data");
    expect(wrapper.text()).toContain("Decline analytics");
    expect(wrapper.text()).toContain("Allow analytics");
    wrapper.unmount();
  });
});
