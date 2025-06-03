import RECIPES from './recipes';

const extractUniqueIngredients = () => {
  const allIngredientNames = new Set();

  RECIPES.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      // Usamos ingredient.name ahora
      allIngredientNames.add(ingredient.name.trim().toLowerCase()); // Normalizar a minúsculas
    });
  });

  // Convertimos el Set a un array y lo ordenamos alfabéticamente
  return Array.from(allIngredientNames).sort();
};

const ALL_INGREDIENTS = extractUniqueIngredients();

export default ALL_INGREDIENTS;