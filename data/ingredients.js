

const extractUniqueIngredientsWithUnits = (recipesData) => {
  const ingredientMap = new Map();

  if (!Array.isArray(recipesData)) {
    console.error('Error: recipesData no es un array en extractUniqueIngredientsWithUnits.');
    return [];
  }

  recipesData.forEach(recipe => {
    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
      recipe.ingredients.forEach(ingredient => {
        // Aseguramos que ingredient.name sea siempre una cadena, por si viene null/undefined
        const ingredientName = (ingredient.name != null) ? String(ingredient.name).trim() : '';
        const normalizedName = ingredientName.toLowerCase();
        const originalName = ingredientName; // Ya es una cadena

        // Aseguramos que ingredient.unit sea siempre una cadena, por si viene null/undefined
        const unit = (ingredient.unit != null) ? String(ingredient.unit).trim().toLowerCase() : 'cantidad';

        if (!ingredientMap.has(normalizedName)) {
          ingredientMap.set(normalizedName, {
            name: originalName,
            defaultUnit: unit
          });
        } else {
          // Si ya existe, preferimos una unidad real si la que tenemos es 'cantidad'
          const existing = ingredientMap.get(normalizedName);
          if (existing.defaultUnit === 'cantidad' && unit !== 'cantidad' && unit !== 'al gusto' && unit !== 'opcional') {
            ingredientMap.set(normalizedName, {
              name: originalName,
              defaultUnit: unit
            });
          }
        }
      });
    }
  });

  // Convertimos el Map a un array de objetos y lo ordenamos por nombre.
  // Aseguramos que a.name y b.name sean cadenas antes de comparar.
  const sortedIngredients = Array.from(ingredientMap.values()).sort((a, b) => {
    return (a.name ?? '').localeCompare(b.name ?? '');
  });

  return sortedIngredients;
};

export default extractUniqueIngredientsWithUnits;