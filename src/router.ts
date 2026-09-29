import HomePage from "./pages/Home.vue";
import FaqPage from "./pages/Faq.vue";
import PrivacyPage from "./pages/Privacy.vue";
import ContactPage from "./pages/Contact.vue";
import PizzaCalculatorPage from "./pages/PizzaCalculator.vue";

export const routes = [
  { path: "/", component: HomePage },
  { path: "/pizza-calculator", component: PizzaCalculatorPage },
  { path: "/faq", component: FaqPage },
  { path: "/privacy", component: PrivacyPage },
  { path: "/contact", component: ContactPage },
];

