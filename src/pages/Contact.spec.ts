import { mount } from "@vue/test-utils";
import { createHead } from "@unhead/vue/client";
import { describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";
import Contact from "./Contact.vue";

function mountContact(locale: "en" | "pl" = "pl") {
  const i18n = createI18n({
    legacy: false,
    locale,
    messages: { en: {}, pl: {} },
  });

  return mount(Contact, {
    global: {
      plugins: [i18n, createHead()],
      stubs: {
        NavigationBar: true,
        RouterLink: {
          props: ["to"],
          template: '<a :href="to"><slot /></a>',
        },
      },
    },
  });
}

describe("Contact", () => {
  it("offers localized email links with a prefilled subject and alternative help", () => {
    const wrapper = mountContact();

    expect(wrapper.text()).toContain("Porozmawiajmy o pieczeniu.");
    expect(wrapper.find('a[href="mailto:justbreadapp@gmail.com?subject=Pomoc%20z%20aplikacj%C4%85%20Just%20Bread"]').exists()).toBe(true);
    expect(wrapper.find('a[href="mailto:justbreadapp@gmail.com?subject=Pytanie%20o%20przepisy%20i%20pieczenie"]').exists()).toBe(true);
    expect(wrapper.find('a[href="mailto:justbreadapp@gmail.com"]').exists()).toBe(true);
    expect(wrapper.find('a[href="/faq"]').exists()).toBe(true);
    expect(wrapper.get('a[href="https://www.instagram.com/justbreadapp/"]').attributes("rel")).toBe("noopener noreferrer");
    expect(wrapper.find("form").exists()).toBe(false);
  });

  it("renders the English contact content when the site locale is English", () => {
    const wrapper = mountContact("en");

    expect(wrapper.text()).toContain("Let's talk bread.");
    expect(wrapper.find('a[href="mailto:justbreadapp@gmail.com?subject=Just%20Bread%20app%20support"]').exists()).toBe(true);
    expect(wrapper.text()).toContain("Browse the FAQ");
  });
});
