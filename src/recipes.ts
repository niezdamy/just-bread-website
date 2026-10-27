import recipeData from "./data/recipes.json";

export const recipes = recipeData;
export type Recipe = (typeof recipes)[number];
export type RecipeLanguage = "pl" | "en";

const recipeImages = import.meta.glob<string>(
  "./assets/recipes/*.jpeg",
  { eager: true, import: "default", query: "?url" },
);

export function getRecipeImage(path: string) {
  const image = recipeImages[`./${path}`];

  if (!image) {
    throw new Error(`Recipe image not found: ${path}`);
  }

  return image;
}

function normalize(value: string) {
  return value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filterRecipes(
  search: string,
  language: RecipeLanguage,
  category = "",
) {
  const query = normalize(search.trim());
  const selectedCategory = normalize(category);

  return recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "" ||
      normalize(recipe.category[language]) === selectedCategory;
    const searchableContent = [
      recipe.title[language],
      recipe.category[language],
      recipe.difficulty[language],
      recipe.totalTime[language],
      ...recipe.ingredients.map((ingredient) => ingredient.name[language]),
    ]
      .map(normalize)
      .join(" ");

    return matchesCategory && (query === "" || searchableContent.includes(query));
  });
}
