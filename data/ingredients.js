
const extractUniqueIngredientsWithUnits = (recipesData) => { // AHORA RECIBE LA DATA DE RECETAS COMO ARGUMENTO
  const ingredientMap = new Map(); // Usaremos un Map para almacenar {nombre_normalizado: {name: originalName, defaultUnit: unit}}

  // Verifica que recipesData sea un array antes de iterar
  if (!Array.isArray(recipesData)) {
    console.error('Error: recipesData no es un array en extractUniqueIngredientsWithUnits.');
    return [];
  }

  recipesData.forEach(recipe => { // Itera sobre la data que recibe
    // Asegura que recipe.ingredients sea un array
    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
      recipe.ingredients.forEach(ingredient => {
        const normalizedName = ingredient.name.trim().toLowerCase();
        const originalName = ingredient.name.trim(); // Mantener el nombre original para mostrar
        const unit = ingredient.unit ? ingredient.unit.trim().toLowerCase() : 'cantidad'; // Usar 'cantidad' si no hay unidad

        if (!ingredientMap.has(normalizedName)) {
          // Si el ingrediente no se ha añadido todavía, lo añadimos con su primera unidad
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

  // Convertimos el Map a un array de objetos y lo ordenamos por nombre
  const sortedIngredients = Array.from(ingredientMap.values()).sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return sortedIngredients;
};

// Exportamos la función, no la constante pre-calculada.
export default extractUniqueIngredientsWithUnits;