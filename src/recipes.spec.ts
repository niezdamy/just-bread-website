import { describe, expect, it } from "vitest";
import { filterRecipes, getRecipeImage, getRecipeImageSrcSet, recipes } from "./recipes";

describe("recipe collection", () => {
  it("includes all recipes from the mobile app export", () => {
    expect(recipes).toHaveLength(9);
  });

  it("finds recipes by Polish titles without requiring diacritics", () => {
    expect(filterRecipes("zytni", "pl").length).toBeGreaterThan(0);
  });

  it("finds recipes by ingredient in English", () => {
    expect(filterRecipes("banana", "en").length).toBeGreaterThan(0);
  });

  it("combines text search with category selection", () => {
    const results = filterRecipes("water", "en", "Sourdough");

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((recipe) => recipe.category.en === "Sourdough")).toBe(true);
  });

  it("provides matching responsive AVIF and JPEG variants for every recipe photo", () => {
    const imagePaths = recipes.flatMap((recipe) => [recipe.image, ...recipe.images]);

    for (const imagePath of new Set(imagePaths)) {
      const avifSet = getRecipeImageSrcSet(imagePath, "avif");
      const jpegSet = getRecipeImageSrcSet(imagePath);
      const widths = (srcSet: string) =>
        srcSet.split(", ").map((candidate) => candidate.split(" ").at(-1));

      expect(getRecipeImage(imagePath)).toContain(".jpg");
      expect(avifSet).toContain(".avif");
      expect(avifSet).toMatch(/\d+w/);
      expect(widths(avifSet)).toEqual(widths(jpegSet));
    }
  });
});
