
const extractUniqueIngredientsWithUnits = (recipesData) => {
  const ingredientMap = new Map();

  if (!Array.isArray(recipesData)) {
    console.error('Error: recipesData no es un array en extractUniqueIngredientsWithUnits.');
    return [];
  }

  recipesData.forEach(recipe => {
    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
      recipe.ingredients.forEach(ingredient => {
        // Añadir una verificación para 'ingredient.name'
        const normalizedName = ingredient.name ? ingredient.name.trim().toLowerCase() : '';
        const originalName = ingredient.name ? ingredient.name.trim() : 'Unknown Ingredient'; // Fallback por si no hay nombre
        const unit = ingredient.unit ? ingredient.unit.trim().toLowerCase() : 'cantidad';

        if (normalizedName) { // Solo añadir si existe un nombre normalizado válido
          if (!ingredientMap.has(normalizedName)) {
            ingredientMap.set(normalizedName, {
              name: originalName,
              defaultUnit: unit
            });
          } else {
            const existing = ingredientMap.get(normalizedName);
            if (existing.defaultUnit === 'cantidad' && unit !== 'cantidad' && unit !== 'al gusto' && unit !== 'opcional') {
              ingredientMap.set(normalizedName, {
                name: originalName,
                defaultUnit: unit
              });
            }
          }
        }
      });
    }
  });

  const sortedIngredients = Array.from(ingredientMap.values()).sort((a, b) => {
    // Verificación defensiva: asegúrate de que 'name' exista antes de llamar a localeCompare
    const nameA = a.name || ''; // Si a.name es undefined/null, usa un string vacío
    const nameB = b.name || ''; // Si b.name es undefined/null, usa un string vacío
    return nameA.localeCompare(nameB);
  });

  return sortedIngredients;
};

// Exportamos la función.
export default extractUniqueIngredientsWithUnits;