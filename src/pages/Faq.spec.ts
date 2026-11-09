import { mount } from "@vue/test-utils";
import { createHead } from "@unhead/vue/client";
import { describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";
import Faq from "./Faq.vue";

function mountFaq(locale: "en" | "pl" = "pl") {
  const i18n = createI18n({
    legacy: false,
    locale,
    messages: { en: {}, pl: {} },
  });

  return mount(Faq, {
    global: {
      plugins: [i18n, createHead()],
      stubs: { NavigationBar: true },
    },
  });
}

describe("Faq", () => {
  it("renders the Polish questions and contact option", () => {
    const wrapper = mountFaq();

    expect(wrapper.get("h1").text()).toBe("Najczęściej zadawane pytania");
    expect(wrapper.findAll(".faq-item")).toHaveLength(5);
    expect(wrapper.text()).toContain("Gdzie mogę pobrać aplikację?");
    expect(wrapper.findAll('a[href="mailto:justbreadapp@gmail.com"]')).toHaveLength(3);
  });

  it("renders localized English FAQ content", () => {
    const wrapper = mountFaq("en");

    expect(wrapper.get("h1").text()).toBe("Frequently asked questions");
    expect(wrapper.text()).toContain("Where can I download the app?");
    expect(wrapper.text()).toContain("Need more help?");
  });
});
