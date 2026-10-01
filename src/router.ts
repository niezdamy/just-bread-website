import HomePage from "./pages/Home.vue";
import FaqPage from "./pages/Faq.vue";
import PrivacyPage from "./pages/Privacy.vue";
import ContactPage from "./pages/Contact.vue";
import PizzaCalculatorPage from "./pages/PizzaCalculator.vue";
import HydrationCalculatorPage from "./pages/HydrationCalculator.vue";

export const routes = [
  { path: "/", component: HomePage },
  { path: "/pizza-calculator", component: PizzaCalculatorPage },
  { path: "/hydration-calculator", component: HydrationCalculatorPage },
  { path: "/faq", component: FaqPage },
  { path: "/privacy", component: PrivacyPage },
  { path: "/contact", component: ContactPage },
];

