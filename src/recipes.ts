import recipeData from "./data/recipes.json";

export const recipes = recipeData;
export type Recipe = (typeof recipes)[number];
export type RecipeLanguage = "pl" | "en";

const recipeImages = import.meta.glob<string>(
  "./assets/recipes/optimized/*.{avif,jpg}",
  { eager: true, import: "default", query: "?url" },
);

type RecipeImageFormat = "avif" | "jpg";

function getRecipeImageVariants(path: string, format: RecipeImageFormat) {
  const filename = path.split("/").pop();
  const stem = filename?.replace(/\.[^.]+$/, "");

  if (!stem) {
    throw new Error(`Invalid recipe image path: ${path}`);
  }

  const prefix = `./assets/recipes/optimized/${stem}-`;
  const variants = Object.entries(recipeImages)
    .filter(([imagePath]) => imagePath.startsWith(prefix) && imagePath.endsWith(`.${format}`))
    .map(([imagePath, image]) => {
      const width = Number(imagePath.slice(prefix.length, -format.length - 1));
      return { image, width };
    })
    .sort((left, right) => left.width - right.width);

  if (variants.length === 0) {
    throw new Error(`Recipe image not found: ${path} (${format})`);
  }

  return variants;
}

export function getRecipeImage(path: string) {
  const variants = getRecipeImageVariants(path, "jpg");
  return variants[variants.length - 1].image;
}

export function getRecipeImageSrcSet(path: string, format: RecipeImageFormat = "jpg") {
  return getRecipeImageVariants(path, format)
    .map(({ image, width }) => `${image} ${width}w`)
    .join(", ");
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
