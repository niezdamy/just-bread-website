import { describe, expect, it } from "vitest";
import { filterRecipes, recipes } from "./recipes";

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
});
