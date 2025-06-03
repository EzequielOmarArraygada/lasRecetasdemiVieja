import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RECIPES from '../data/recipes';
// REMOVIDO: import RecipeGridTile from '../components/RecipeGridTile';

function RecipesOverviewScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Obtener los parámetros de la ruta
  const categoryId = route.params?.categoryId;
  const searchText = route.params?.searchText;
  const selectedIngredients = route.params?.selectedIngredients; 

  // Filtrar las recetas en función de los parámetros recibidos
  const displayedRecipes = RECIPES.filter(recipe => {
    let matchesCategory = true;
    let matchesSearch = true;
    let matchesIngredients = true; // Nueva bandera para el filtro de ingredientes

    // 1. Filtrar por categoría (si se proporciona)
    if (categoryId) {
      matchesCategory = recipe.categoryIds.includes(categoryId);
    }

    // 2. Filtrar por texto de búsqueda (si se proporciona)
    if (searchText) {
      matchesSearch = recipe.name.toLowerCase().includes(searchText.toLowerCase());
    }

    // 3. Filtrar por ingredientes seleccionados y cantidades (si se proporcionan)
    if (selectedIngredients && Object.keys(selectedIngredients).length > 0) {
      // Iterar sobre CADA ingrediente que el USUARIO ha seleccionado
      for (const selectedIngNameNormalized in selectedIngredients) {
        const selectedIngDetails = selectedIngredients[selectedIngNameNormalized]; // { quantity: number|null, unit: string }

        // Verificar si la receta actual tiene SUFICIENTE de este ingrediente
        const recipeHasSufficientIngredient = recipe.ingredients.some(recipeIng => {
          const normalizedRecipeIngName = recipeIng.name.trim().toLowerCase();
          const recipeIngQuantity = recipeIng.quantity; 
          
          // El nombre del ingrediente de la receta debe coincidir con el seleccionado
          if (normalizedRecipeIngName === selectedIngNameNormalized) {
            // Si el usuario especificó una cantidad para este ingrediente (quantity > 0)
            if (selectedIngDetails.quantity !== null && selectedIngDetails.quantity > 0) {
              // Convertir la cantidad de la receta a número, tratando null (ej: "al gusto") como 0 para la comparación.
              const actualRecipeQuantity = recipeIngQuantity !== null ? Number(recipeIngQuantity) : 0;
              
              // Si la receta tiene MENOS cantidad de la requerida por el usuario, no cumple.
              if (actualRecipeQuantity < selectedIngDetails.quantity) {
                return false; // Esta receta no tiene suficiente de este ingrediente
              }
            }
            // Si el usuario no especificó una cantidad (quantity es null o 0),
            // o si la receta tiene suficiente cantidad, entonces este ingrediente de la receta es válido.
            return true;
          }
          return false; // El nombre del ingrediente de la receta no coincide
        });

        // Si ALGÚN ingrediente seleccionado por el usuario no está lo suficientemente presente en la receta,
        // entonces esta receta NO coincide con el filtro de ingredientes general.
        if (!recipeHasSufficientIngredient) {
          matchesIngredients = false;
          break; 
        }
      }
    }

    // Una receta debe cumplir con TODAS las condiciones (categoría, búsqueda, ingredientes)
    return matchesCategory && matchesSearch && matchesIngredients;
  });

  // Determinar el título de la pantalla
  useLayoutEffect(() => {
    let currentScreenTitle = 'Todas las Recetas';

    if (route.params?.screenTitle) { 
      currentScreenTitle = route.params.screenTitle;
    } else if (categoryId) { 
      const categoryTitle = route.params.categoryTitle;
      currentScreenTitle = categoryTitle;
    } else if (searchText) { 
      currentScreenTitle = `Resultados para "${searchText}"`;
    } else if (selectedIngredients && Object.keys(selectedIngredients).length > 0) { 
      currentScreenTitle = 'Recetas con tus Ingredientes';
    }

    navigation.setOptions({
      title: currentScreenTitle,
    });
  }, [navigation, categoryId, searchText, selectedIngredients, route.params?.screenTitle, route.params?.categoryTitle]);


  // Función para renderizar cada ítem de receta
  function renderRecipeItem(itemData) {
    function pressRecipeHandler() {
      navigation.navigate('RecipeDetail', {
        recipeId: itemData.item.id,
      });
    }

    // Renderizado directo del ítem de receta
    return (
      <View style={styles.recipeItem}>
        <Pressable
          android_ripple={{ color: '#ccc' }}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={pressRecipeHandler}
        >
          <View style={styles.innerContainer}>
            {/* Mostrar la imagen de la receta */}
            {itemData.item.imageUrl && (
              <Image source={{ uri: itemData.item.imageUrl }} style={styles.image} />
            )}
            {/* Mostrar el nombre de la receta */}
            <Text style={styles.title}>{itemData.item.name}</Text>
            {/* Mostrar duración y complejidad */}
            <View style={styles.details}>
              <Text style={styles.detailText}>{itemData.item.duration}m</Text>
              <Text style={styles.detailText}>{itemData.item.complexity.toUpperCase()}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }

  // Si no hay recetas para mostrar
  if (displayedRecipes.length === 0) {
    let emptyMessage = 'No hay recetas disponibles.';
    if (selectedIngredients && Object.keys(selectedIngredients).length > 0) {
        emptyMessage = 'No se encontraron recetas con los ingredientes seleccionados.';
    } else if (searchText) {
        emptyMessage = `No se encontraron recetas con "${searchText}".`;
    } else if (categoryId) {
        emptyMessage = `No hay recetas para esta categoría.`;
    }
    
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedRecipes}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipeItem}
      />
    </View>
  );
}

export default RecipesOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyListText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  // --- ESTILOS PARA EL RENDERIZADO DIRECTO DE RECETAS ---
  recipeItem: {
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // Para que la sombra se vea en iOS
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.7, // Efecto de presión
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%', // La imagen ocupa todo el ancho del contenedor
    height: 200, // Altura fija para la imagen
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
});